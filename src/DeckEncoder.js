const Base32 = require('./Base32')
const VarInt = require('./VarInt')
const Card = require('./Card')
const Faction = require('./Faction')

class DeckEncoder {
  static decode (code) {
    const result = []

    let bytes = null
    try {
      bytes = Base32.decode(code)
    } catch (e) {
      throw new TypeError('Invalid deck code')
    }

    const firstByte = bytes.shift()
    const format = firstByte >> 4
    const version = firstByte & 0xF

    if (format !== DeckEncoder.FORMAT) {
      throw new TypeError('The provided code does not match the required format.')
    }
    if (version > DeckEncoder.MAX_KNOWN_VERSION) {
      throw new TypeError('The provided code requires a higher version of this library; please update.')
    }

    // first encoded cards are grouped by 3, 2, 1 pieces
    DeckEncoder.GROUPS.forEach(i => {
      const numGroupOfs = VarInt.pop(bytes)

      for (let j = 0; j < numGroupOfs; j++) {
        const numOfsInThisGroup = VarInt.pop(bytes)
        const set = VarInt.pop(bytes)
        const faction = VarInt.pop(bytes)

        for (let k = 0; k < numOfsInThisGroup; k++) {
          const card = VarInt.pop(bytes)

          const setString = set.toString().padStart(2, '0')
          const factionString = Faction.fromID(faction).shortCode
          const cardString = card.toString().padStart(3, '0')

          result.push(Card.from(setString, factionString, cardString, i))
        }
      }
    })

    while (bytes.length > 0) {
      const fourPlusCount = VarInt.pop(bytes)
      const fourPlusSet = VarInt.pop(bytes)
      const fourPlusFaction = VarInt.pop(bytes)
      const fourPlusNumber = VarInt.pop(bytes)

      const fourPlusSetString = fourPlusSet.toString().padStart(2, '0')
      const fourPlusFactionString = Faction.fromID(fourPlusFaction).shortCode
      const fourPlusNumberString = fourPlusNumber.toString().padStart(3, '0')

      result.push(Card.from(fourPlusSetString, fourPlusFactionString, fourPlusNumberString, fourPlusCount))
    }

    return result
  }

  static encode (cards) {
    if (!this.isValidDeck(cards)) {
      throw new TypeError('The deck provided contains invalid card codes')
    }

    const grouped = DeckEncoder.GROUPS.map(i => this.groupByFactionAndSetSorted(cards.filter(c => c.count === i)))
    return Base32.encode([
      DeckEncoder.FORMAT << 4 | cards.reduce((p, c) => Math.max(p, c.version), 0) & 0xF,
      ...grouped.map(group => this.encodeGroup(group)).reduce((prev, curr) => [...prev, ...curr], []),
      ...this.encodeNofs(cards.filter(c => c.count > DeckEncoder.GROUPS[0]))
    ])
  }

  static encodeNofs (nOfs) {
    return nOfs
      .sort((a, b) => a.code.localeCompare(b.code))
      .reduce((prev, card) => [
        ...prev,
        ...VarInt.get(card.count),
        ...VarInt.get(card.set),
        ...VarInt.get(card.faction.id),
        ...VarInt.get(card.id)
      ], [])
  }

  static encodeGroup (group) {
    return group.reduce(
      (prev, list) => [
        ...prev,
        ...VarInt.get(list.length),
        ...VarInt.get(list[0].set),
        ...VarInt.get(list[0].faction.id),
        ...list.map(card => VarInt.get(card.id)).reduce((prev, curr) => [...prev, ...curr], [])
      ],
      VarInt.get(group.length)
    )
  }

  static isValidDeck (cards) {
    return cards.every(card => (
      card.code.length === 7 &&
      !isNaN(card.id) &&
      !isNaN(card.count) &&
      card.faction &&
      card.count > 0
    ))
  }

  static groupByFactionAndSetSorted (cards) {
    const result = []

    while (cards.length > 0) {
      const set = []

      const first = cards.shift()
      set.push(first)

      for (let i = cards.length - 1; i >= 0; i--) {
        const compare = cards[i]
        if (first.set === compare.set && first.faction.id === compare.faction.id) {
          set.push(compare)
          cards.splice(i, 1)
        }
      }

      result.push(set)
    }

    return result.sort((a, b) => a.length - b.length).map(group => group.sort((a, b) => a.code.localeCompare(b.code)))
  }
}

DeckEncoder.MAX_KNOWN_VERSION = 5
DeckEncoder.FORMAT = 1
DeckEncoder.INITIAL_VERSION = 1
DeckEncoder.GROUPS = [3, 2, 1]

module.exports = DeckEncoder
