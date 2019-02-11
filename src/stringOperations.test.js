const { camelCase, pascalCase } = require('./stringOperations')
const assert = require('assert')

describe('stringOperations', () => {
  describe('camelCase()', () => {
    it('should return an empty string from empty string', () => {
      assert.strictEqual(camelCase(''), '')
    })
    it('should trim padded strings', () => {
      assert.strictEqual(camelCase('    test    '), 'test')
    })
    it('should camelize spaced strings', () => {
      assert.strictEqual(camelCase('this is spaced'), 'thisIsSpaced')
    })
    it('should camelize dashed strings', () => {
      assert.strictEqual(camelCase('this-is-dashed'), 'thisIsDashed')
    })
    it('should camelize coloned strings', () => {
      assert.strictEqual(camelCase('this:is:coloned'), 'thisIsColoned')
    })
    it('should be able to handle combinations', () => {
      assert.strictEqual(camelCase('    this-is a:wildCombination    '), 'thisIsAWildCombination')
    })
  })

  describe('pascalCase()', () => {
    it('should return an empty string from empty string', () => {
      assert.strictEqual(pascalCase(''), '')
    })
    it('should trim padded strings', () => {
      assert.strictEqual(pascalCase('    Test    '), 'Test')
    })
    it('should pascalize spaced strings', () => {
      assert.strictEqual(pascalCase('this is spaced'), 'ThisIsSpaced')
    })
    it('should pascalize dashed strings', () => {
      assert.strictEqual(pascalCase('this-is-dashed'), 'ThisIsDashed')
    })
    it('should pascalize coloned strings', () => {
      assert.strictEqual(pascalCase('this:is:coloned'), 'ThisIsColoned')
    })
    it('should be able to handle combinations', () => {
      assert.strictEqual(pascalCase('    this-is a:wildCombination    '), 'ThisIsAWildCombination')
    })
  })
})
