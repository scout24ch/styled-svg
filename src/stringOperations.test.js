const { camelCase, pascalCase } = require('./stringOperations')
const assert = require('assert')

describe('stringOperations', () => {
  describe('camelCase()', () => {
    it('should return an empty string from empty string', () => {
      assert.equal(camelCase(''), '')
    })
    it('should trim padded strings', () => {
      assert.equal(camelCase('    test    '), 'test')
    })
    it('should camelize spaced strings', () => {
      assert.equal(camelCase('this is spaced'), 'thisIsSpaced')
    })
    it('should camelize dashed strings', () => {
      assert.equal(camelCase('this-is-dashed'), 'thisIsDashed')
    })
    it('should camelize coloned strings', () => {
      assert.equal(camelCase('this:is:coloned'), 'thisIsColoned')
    })
    it('should be able to handle combinations', () => {
      assert.equal(camelCase('    this-is a:wildCombination    '), 'thisIsAWildCombination')
    })
  })

  describe('pascalCase()', () => {
    it('should return an empty string from empty string', () => {
      assert.equal(pascalCase(''), '')
    })
    it('should trim padded strings', () => {
      assert.equal(pascalCase('    Test    '), 'Test')
    })
    it('should pascalize spaced strings', () => {
      assert.equal(pascalCase('this is spaced'), 'ThisIsSpaced')
    })
    it('should pascalize dashed strings', () => {
      assert.equal(pascalCase('this-is-dashed'), 'ThisIsDashed')
    })
    it('should pascalize coloned strings', () => {
      assert.equal(pascalCase('this:is:coloned'), 'ThisIsColoned')
    })
    it('should be able to handle combinations', () => {
      assert.equal(pascalCase('    this-is a:wildCombination    '), 'ThisIsAWildCombination')
    })
  })
})
