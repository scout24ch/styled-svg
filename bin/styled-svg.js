#!/usr/bin/env node

'use strict'

process.title = 'styled-svg'

// setup CLI options and usage
const commandLineArgs = require('command-line-args')

const optionsDefinitions = [
  {
    name: 'input',
    alias: 'i',
    description: 'The input files to process.',
    type: String,
    multiple: true,
    defaultOption: true,
    defaultValue: ['**/*.svg'],
    typeLabel: '<files>'
  },
  {
    name: 'clean',
    description: 'Clears the output directory before generating.',
    type: Boolean
  },
  {
    name: 'dry-run',
    description: 'Outputs the changes to console instead of writing them',
    type: Boolean
  },
  {
    name: 'no-tests',
    description: 'Prevents test file generation',
    type: Boolean
  },
  {
    name: 'output-dir',
    description: 'The directory to output components to. This defaults to the directory of the svg.',
    type: String
  },
  {
    name: 'test-dir',
    description: 'The directory to output tests to. This is relative to the output directory',
    type: String
  },
  {
    name: 'templates-dir',
    description: 'The directory to use for templates. Defaults to internal templates',
    type: String
  },
  {
    name: 'size',
    multiple: true,
    description: 'Size prop values for the components, with their corresponding pixel values. Usefull for icons. Examples: "small:18x18" "medium:24x24" ',
    type: String
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Displays this usage guide.'
  }
]

const options = commandLineArgs(optionsDefinitions)

if (options.help || options._unknown) {
  const usage = require('command-line-usage')([
    {
      header: 'styled-svg',
      content: 'Generate styled-components from SVG files.'
    },
    {
      header: 'Options',
      optionList: optionsDefinitions
    }
  ])
  console.log(usage)
} else {
  // shim dashcase options to camelCase
  const normalizedOptions = Object.entries(options).reduce((opts, [key, value]) => {
    opts[key.replace(/-([a-z])/gi, g => g[1].toUpperCase())] = value
    return opts
  }, {})

  // execute on sources
  const globby = require('globby')
  const convert = require('../src/index')

  globby(normalizedOptions.input)
    .then(files => convert(files, normalizedOptions))
    .catch(err => {
      console.log(err.stack)
      process.exit(1)
    })
}
