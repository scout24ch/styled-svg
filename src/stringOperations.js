const lowercaseWords = /(?:^\w|[A-Z]|\b\w)/g
const wordSeparators = /[\s-:]+/g

const camelCase = str => str
  .replace(lowercaseWords, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
  .replace(wordSeparators, '')

const pascalCase = str => {
  const camel = camelCase(str)
  return camel[0].toUpperCase() + camel.slice(1)
}

module.exports = {
  camelCase,
  pascalCase
}
