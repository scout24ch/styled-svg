const fs = require('fs-extra')
const path = require('path')

const indent = require('./indent')
const optimize = require('./optimize')
const serializeSizes = require('./serializeSizes')
const { pascalCase } = require('./stringOperations')

const writeOut = async (filePath, content, options) => {
  if (options.dryRun) {
    console.log('\n')
    console.log(filePath)
    console.log(content)
  } else {
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, content)
  }
}

const endsWithSvg = /\.svg$/i
const viewBoxAttribute = /viewBox="([\s-\d.]+)"/i
const whitespace = /\s+/

const join = (...args) => path.normalize(path.join(...args))

const convertFile = async (filePath, templates, options) => {
  let viewBox = [0, 0, 0, 0]

  // determine names
  const displayName = pascalCase(path.basename(filePath).replace(endsWithSvg, ''))
  const componentFilename = displayName + '.js'
  const testFilename = displayName + '.test.js'

  // resolve paths
  const testDir = options.testDir || './'
  const outputDir = options.outputDir || path.dirname(filePath)
  const outputTestDir = join(outputDir, testDir)
  const importRelativePath = path.relative(outputTestDir, outputDir).replace(path.sep, '/') || '.'

  // load file content
  const origContent = await fs.readFile(filePath, 'utf8')

  // get clean up viewBox
  let tempViewBox = origContent.match(viewBoxAttribute)
  let foundViewbox = false
  if (tempViewBox && tempViewBox[1].trim()) {
    tempViewBox = tempViewBox[1].trim().split(whitespace)
    if (tempViewBox.length === 4) {
      viewBox = tempViewBox.map(number => Math.round(parseFloat(number || 0)))
      foundViewbox = true
    }
  }

  // exit if viewbox was missing
  if (!foundViewbox) {
    console.error(
      'Skipped',
      filePath.replace(process.cwd(), '.'),
      'viewBox attribute missing or malformated'
    )
    return
  }

  // run SVG optimizers
  const content = await optimize(origContent)

  // react formatted SVG
  const formattedContent = indent(content.trim())

  // handle size alias options
  const sizes = serializeSizes(options)

  // output component and test file
  await Promise.all([
    writeOut(
      join(outputDir, componentFilename),
      templates.component
        .replace('##SVG##', formattedContent)
        .replace('##WIDTH##', viewBox[2])
        .replace('##HEIGHT##', viewBox[3])
        .replace('##VIEWBOX##', viewBox.join(' '))
        .replace('##NAME##', displayName)
        .replace('\'##SIZES##\'', sizes),
      options
    ),
    !options.skipTests ? writeOut(
      join(outputTestDir, testFilename),
      templates.test
        .replace('##FILENAME##', `${importRelativePath}/${componentFilename}`)
        .replace('##NAME##', displayName),
      options
    ) : Promise.resolve()
  ])

  console.log('Converted',
    filePath.replace(process.cwd(), '.'),
    ' => ',
    path.join(outputDir.replace(process.cwd(), '.'), displayName)
  )
}

module.exports = async (files, options) => {
  // load templates
  const templatesDir = options.templatesDir || join(__dirname, '..', 'templates')
  const templates = {
    component: await fs.readFile(join(templatesDir, 'component.js'), 'utf8'),
    test: await fs.readFile(join(templatesDir, 'enzyme.js'), 'utf8')
  }

  // clean output directories
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

  // convert files
  Promise.all(files.map(file => convertFile(file, templates, options)))
}
