const fs = require('fs')
const path = require('path')
const indent = require('./indent')
const optimize = require('./optimize')
const { pascalCase } = require('./stringOperations')

const endsWithSvg = /\.svg$/i
const viewBoxAttribute = /viewBox="([\s-\d.]+)"/i
const whitespace = /\s+/

const readTemplate = name => fs.readFileSync(path.join(
  __dirname, '..', 'templates', name + '.js'
), 'utf8')

const templates = {
  component: readTemplate('component'),
  test: readTemplate('enzyme')
}

const convertFile = (filename, templates) => {
  const origContent = fs.readFileSync(filename, 'utf8')
  const fileDir = path.dirname(filename)
  const displayName = pascalCase(path.basename(filename).replace(endsWithSvg, ''))
  const componentFilename = displayName + '.js'
  const testFilename = displayName + '.test.js'
  const importPath = './' + componentFilename
  const outputFile = path.join(fileDir, componentFilename)

  let viewBox = [0, 0, 0, 0]
  return optimize(origContent)
    .then(content => content.trim())
    .then(content => {
      let tempViewBox = origContent.match(viewBoxAttribute)
      if (tempViewBox && tempViewBox[1]) {
        tempViewBox = tempViewBox[1].trim().split(whitespace)
        if (tempViewBox.length !== 4) { return content }
        viewBox = tempViewBox.map(number => Math.round(parseFloat(number || 0)))
      }
      return content
    })
    .then(indent)
    .then(content => {
      fs.writeFileSync(outputFile,
        templates.component
          .replace('\'{{SVG}}\'', content)
          .replace('{{WIDTH}}', viewBox[2])
          .replace('{{HEIGHT}}', viewBox[3])
          .replace('{{VIEWBOX}}', viewBox.join(' '))
          .replace('{{NAME}}', displayName)
          .replace(' // eslint-disable-line no-unused-vars', '')
      )
      fs.writeFileSync(path.join(fileDir, testFilename),
        templates.test
          .replace('{{FILENAME}}', importPath)
          .replace('{{NAME}}', displayName)
      )
      console.log('Converted', fileDir.replace(process.cwd(), '.') + path.sep + displayName)
    })
}

module.exports = files => files.reduce(
  (promise, file) => promise.then(
    () => convertFile(file, templates)
  ),
  Promise.resolve()
)
.catch(err => {
  console.log(err.stack)
  process.exit(1)
})
