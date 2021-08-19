const assert = require('assert')
const { Faction } = require('../')

describe('Faction', () => {
  it('should get correct faction from code', () => {
    assert.deepStrictEqual(Faction.fromCode('DE'), new Faction('DE', 0))
  })

  it('should get correct faction from id', () => {
    assert.deepStrictEqual(Faction.fromID(6), new Faction('BW', 6))
  })

  it('should get correct faction version for DE', () => {
    assert.strictEqual(Faction.getVersion('DE'), 1)
  })

  it('should get correct faction version for BW', () => {
    assert.strictEqual(Faction.getVersion('BW'), 2)
  })

  it('should get correct faction version for SH', () => {
    assert.strictEqual(Faction.getVersion('SH'), 3)
  })

  it('should get correct faction version for BC', () => {
    assert.strictEqual(Faction.getVersion('BC'), 4)
  })
})
