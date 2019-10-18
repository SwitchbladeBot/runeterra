class Faction {
  constructor (code, id) {
    this.shortCode = code
    this.id = id
  }

  static fromCode (code) {
    return new this(code, this.FACTIONS.indexOf(code))
  }

  static fromID (id) {
    return new this(this.FACTIONS[id], id)
  }
}

Faction.FACTIONS = ['DE', 'FR', 'IO', 'NX', 'PZ', 'SI']

module.exports = Faction
