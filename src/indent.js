const { camelCase } = require('./stringOperations')

const tagWithAttributes = /(<\/?)([^ ]*) ?([^/]*)(\/?>)/
const doubleQuotes = /"/g
const leadingSpaces = /^( *)/
const attributesAndValues = /[^=]*="[^"]*"/g
const closingRootTag = /(\n\s{4}\/>)|(^\s{4}<\/)/

const indentLine = indentLevel => str => ' '.repeat(indentLevel) + str
const getStyleAttribute = str => {
  const trimmedStr = str.trim()
  const props = trimmedStr.substring('style="'.length, trimmedStr.length - 1).split(';')
  return [
    'style={{',
    ...props.map(prop => {
      const [key, val] = prop.split(':')
      return indentLine(2)(`${camelCase(key)}: '${val}',`)
    }),
    '}}'
  ]
}

module.exports = svg => svg
  .split('\n')
  .reduce((buffer, line, lineIndex) => {
    const matches = line.match(tagWithAttributes)
    if (!matches) { return buffer }
    const closingTag = matches[1] === '</'
    const tag = matches[2]
    const attrsStr = matches[3]
    const autoclosingTag = matches[4] === '/>'
    const indentLevel = line.match(leadingSpaces)[1].length
    const indentParentLine = indentLine(indentLevel + 2)
    const indentChildLine = indentLine(indentLevel + 2 + 2)
    const attributes = (attrsStr.match(attributesAndValues) || [])
      .map(str => {
        const [key, val] = str
          .trim()
          .replace(doubleQuotes, '\'')
          .split('=')
        if (key === 'class') { return null }
        if (key === 'style') {
          return getStyleAttribute(str)
            .map(indentChildLine)
            .join('\n')
        }
        return indentChildLine(`${camelCase(key)}=${val}`)
      })
      .filter(line => line)
      .join('\n')

    if (tag === 'svg') { return buffer }

    return buffer.concat((closingTag
      ? ([indentParentLine(`</${tag}>`)])
      : ([
        indentParentLine(`<${tag}`),
        attributes,
        indentParentLine(autoclosingTag ? '/>' : '>')
      ]))
      .filter(line => line)
      .join('\n'))
  }, [])
  .map((line, i, buffer) => {
    if (buffer[i + 1] && line.match(closingRootTag)) {
      return line + ','
    }
    return line
  })
  .join('\n')
  .trim()
