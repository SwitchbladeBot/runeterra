const fs = require('fs')
const assert = require('assert')
const { EOL } = require('os')
const { DeckEncoder, Card } = require('../')

describe('Encoding/Decoding', () => {
  it('should decode recommended decks', () => {
    const deckCodesTestData = fs.readFileSync('./test/deckCodesTestData.txt', { encoding: 'utf-8' })
    const codeBlocks = deckCodesTestData.split(EOL + EOL)
    const decks = codeBlocks.reduce((d, b) => {
      const [code, ...list] = b.split(EOL)
      d[code] = list.map(c => Card.fromCardString(c))
      return d
    }, {})

    const decoded = Object.keys(decks).map(k => DeckEncoder.decode(k)).reduce((d, deck) => {
      const code = DeckEncoder.encode(deck)
      d[code] = deck
      return d
    }, {})

    assert.deepStrictEqual(decks, decoded)
  })

  it('should decode small decks', () => {
    const deck = [Card.fromCardString('1:01DE002')]
    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode decks with bilgewater cards', () => {
    const deck = [
      Card.fromCardString('3:02BW010'),
      Card.fromCardString('2:02BW003'),
      Card.fromCardString('4:01DE002'),
      Card.fromCardString('5:01DE004')
    ]
    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode decks with mount targon cards', () => {
    const deck = [
      Card.fromCardString('3:03MT010'),
      Card.fromCardString('2:03MT003'),
      Card.fromCardString('4:01DE002'),
      Card.fromCardString('5:02BW004')
    ]
    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode decks with shurima cards', () => {
    const deck = [
      Card.fromCardString('3:04SH010'),
      Card.fromCardString('2:04SH003'),
      Card.fromCardString('4:02DE002'),
      Card.fromCardString('5:03BW004')
    ]
    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode large decks', () => {
    const deck = [
      Card.fromCardString('3:01DE002'),
      Card.fromCardString('3:01DE003'),
      Card.fromCardString('3:01DE004'),
      Card.fromCardString('3:01DE005'),
      Card.fromCardString('3:01DE006'),
      Card.fromCardString('3:01DE007'),
      Card.fromCardString('3:01DE008'),
      Card.fromCardString('3:01DE009'),
      Card.fromCardString('3:01DE010'),
      Card.fromCardString('3:01DE011'),
      Card.fromCardString('3:01DE012'),
      Card.fromCardString('3:01DE013'),
      Card.fromCardString('3:01DE014'),
      Card.fromCardString('3:01DE015'),
      Card.fromCardString('3:01DE016'),
      Card.fromCardString('3:01DE017'),
      Card.fromCardString('3:01DE018'),
      Card.fromCardString('3:01DE019'),
      Card.fromCardString('3:01DE020'),
      Card.fromCardString('3:01DE021')
    ]

    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode small decks with counts more than 3', () => {
    const deck = [Card.fromCardString('4:01DE002')]
    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode large decks with counts more than 3', () => {
    const deck = [
      Card.fromCardString('3:01DE002'),
      Card.fromCardString('3:01DE003'),
      Card.fromCardString('3:01DE004'),
      Card.fromCardString('3:01DE005'),
      Card.fromCardString('3:01DE012'),
      Card.fromCardString('3:01DE013'),
      Card.fromCardString('3:01DE014'),
      Card.fromCardString('3:01DE015'),
      Card.fromCardString('3:01DE016'),
      Card.fromCardString('3:01DE017'),
      Card.fromCardString('3:01DE018'),
      Card.fromCardString('3:01DE019'),
      Card.fromCardString('3:01DE020'),
      Card.fromCardString('3:01DE021'),
      Card.fromCardString('4:01DE006'),
      Card.fromCardString('5:01DE007'),
      Card.fromCardString('6:01DE008'),
      Card.fromCardString('7:01DE009'),
      Card.fromCardString('8:01DE010'),
      Card.fromCardString('9:01DE011')
    ]

    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode a deck with a single card 40 times', () => {
    const deck = [Card.fromCardString('40:01DE002')]
    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('should decode large decks with only counts more than 3', () => {
    const deck = [
      Card.fromCardString('4:01DE002'),
      Card.fromCardString('4:01DE003'),
      Card.fromCardString('4:01DE004'),
      Card.fromCardString('4:01DE005'),
      Card.fromCardString('4:01DE006'),
      Card.fromCardString('5:01DE007'),
      Card.fromCardString('6:01DE008'),
      Card.fromCardString('7:01DE009'),
      Card.fromCardString('8:01DE010'),
      Card.fromCardString('9:01DE011'),
      Card.fromCardString('4:01DE012'),
      Card.fromCardString('4:01DE013'),
      Card.fromCardString('4:01DE014'),
      Card.fromCardString('4:01DE015'),
      Card.fromCardString('4:01DE016'),
      Card.fromCardString('4:01DE017'),
      Card.fromCardString('4:01DE018'),
      Card.fromCardString('4:01DE019'),
      Card.fromCardString('4:01DE020'),
      Card.fromCardString('4:01DE021')
    ]

    const code = DeckEncoder.encode(deck)
    const decoded = DeckEncoder.decode(code)
    assert.deepStrictEqual(deck, decoded)
  })

  it('order should not matter v1', () => {
    const deck1 = [
      Card.fromCardString('1:01DE002'),
      Card.fromCardString('2:01DE003'),
      Card.fromCardString('3:02DE003')
    ]
    const deck2 = [
      Card.fromCardString('2:01DE003'),
      Card.fromCardString('3:02DE003'),
      Card.fromCardString('1:01DE002')
    ]

    const code1 = DeckEncoder.encode(deck1)
    const code2 = DeckEncoder.encode(deck2)
    assert.strictEqual(code1, code2)

    const deck3 = [
      Card.fromCardString('4:01DE002'),
      Card.fromCardString('2:01DE003'),
      Card.fromCardString('3:02DE003')
    ]
    const deck4 = [
      Card.fromCardString('2:01DE003'),
      Card.fromCardString('3:02DE003'),
      Card.fromCardString('4:01DE002')
    ]

    const code3 = DeckEncoder.encode(deck3)
    const code4 = DeckEncoder.encode(deck4)
    assert.strictEqual(code3, code4)
  })

  it('order should not matter v2', () => {
    const deck1 = [
      Card.fromCardString('4:01DE002'),
      Card.fromCardString('2:01DE003'),
      Card.fromCardString('3:02DE003'),
      Card.fromCardString('5:01DE004')
    ]
    const deck2 = [
      Card.fromCardString('5:01DE004'),
      Card.fromCardString('2:01DE003'),
      Card.fromCardString('3:02DE003'),
      Card.fromCardString('4:01DE002')
    ]

    const code1 = DeckEncoder.encode(deck1)
    const code2 = DeckEncoder.encode(deck2)
    assert.strictEqual(code1, code2)
  })

  it('should fail over bad codes', () => {
    let deck = [Card.fromCardString('1:01DE02')]
    try {
      DeckEncoder.encode(deck)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }

    deck = [Card.fromCardString('1:01XX002')]
    try {
      DeckEncoder.encode(deck)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }

    deck = [Card.fromCardString('0:01DE002')]
    try {
      DeckEncoder.encode(deck)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }
  })

  it('should fail over bad card counts', () => {
    let deck = [Card.fromCardString('0:01DE002')]
    try {
      DeckEncoder.encode(deck)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }

    deck = [Card.fromCardString('-1:01DE002')]
    try {
      DeckEncoder.encode(deck)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }
  })

  it('should fail over bad base32 inputs', () => {
    const badEncodingNotBase32 = 'I\'m no card code!'
    try {
      DeckEncoder.decode(badEncodingNotBase32)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }

    const badEncoding32 = 'ABCDEFG'
    try {
      DeckEncoder.decode(badEncoding32)
      assert.fail()
    } catch (e) {
      if (!(e instanceof TypeError)) assert.fail()
    }

    const badEncodingEmpty = ''
    try {
      DeckEncoder.decode(badEncodingEmpty)
      assert.fail()
    } catch (e) {}
  })
})
