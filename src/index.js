const fs = require('fs')
const mkdirp = require('mkdirp-promise')
const path = require('path')
const {promisify} = require('util')
const indent = require('./indent')
const optimize = require('./optimize')
const { pascalCase } = require('./stringOperations')

const readFile = promisify(fs.readFile)
const _writeFile = promisify(fs.writeFile)
const writeFile = async (filePath, content, options) => {
  if (options.dryRun) {
    console.log('\n')
    console.log(filePath)
    console.log(content)
  } else {
    await mkdirp(path.dirname(filePath))
    await _writeFile(filePath, content)
  }
}

const endsWithSvg = /\.svg$/i
const viewBoxAttribute = /viewBox="([\s-\d.]+)"/i
const whitespace = /\s+/

const join = (...args) => path.normalize(path.join(...args))

const convertFile = async (filePath, templates, options) => {
  let viewBox = [0, 0, 0, 0]

  // Determine names
  const displayName = pascalCase(path.basename(filePath).replace(endsWithSvg, ''))
  const componentFilename = displayName + '.js'
  const testFilename = displayName + '.test.js'

  // Resolve paths
  const testDir = options.testDir || './'
  const outputDir = options.outputDir || path.dirname(filePath)
  const outputTestDir = join(outputDir, testDir)
  const importRelativePath = path.relative(outputTestDir, outputDir).replace(path.sep, '/') || '.'

  // Load file content
  const origContent = await readFile(filePath, {encoding: 'utf8'})

  // Get cleanedup viewBox
  let tempViewBox = origContent.match(viewBoxAttribute)
  if (tempViewBox && tempViewBox[1].trim()) {
    tempViewBox = tempViewBox[1].trim().split(whitespace)
    if (tempViewBox.length === 4) {
      viewBox = tempViewBox.map(number => Math.round(parseFloat(number || 0)))
    }
  }

  // Run SVG Optimizers
  const content = await optimize(origContent)

  // React formatted SVG
  const formattedContent = indent(content.trim())

  // Output Component and Test file
  await Promise.all([
    writeFile(
      join(outputDir, componentFilename),
      templates.component
        .replace("'{{SVG}}'", formattedContent)
        .replace('{{WIDTH}}', viewBox[2])
        .replace('{{HEIGHT}}', viewBox[3])
        .replace('{{VIEWBOX}}', viewBox.join(' '))
        .replace('{{NAME}}', displayName)
        .replace(' // eslint-disable-line no-unused-vars', ''),
      options
    ),
    writeFile(
      join(outputTestDir, testFilename),
      templates.test
        .replace('{{FILENAME}}', `${importRelativePath}/${componentFilename}`)
        .replace('{{NAME}}', displayName),
      options
    )
  ])

  console.log('Converted',
    filePath.replace(process.cwd(), '.'), ' => ', path.join(outputDir.replace(process.cwd(), '.'), displayName))
}

module.exports = async (files, options) => {
  // Load templates
  const templatesDir = options.templatesDir || join(__dirname, '..', 'templates')
  const templates = {
    component: await readFile(join(templatesDir, 'component.js'), {encoding: 'utf8'}),
    test: await readFile(join(templatesDir, 'enzyme.js'), {encoding: 'utf8'})
  }

  // Clean output directories
  if (options.clean) {
    const del = require('del')
    if (options.outputDir) {
      await del([
        join(options.outputDir, '*.js')
      ])
    }
    if (options.testDir) {
      await del([
        join(options.testDir, '*.test.js')
      ])
    }
  }

  // Convert files
  Promise.all(files.map(file => convertFile(file, templates, options)))
}
