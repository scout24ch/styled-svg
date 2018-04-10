#!/usr/bin/env node

'use strict'

process.title = 'styled-svg'

// Setup CLI options and usage
const commandLineArgs = require('command-line-args')

const optionsDefinitions = [
  {
    name: 'sources',
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
    description: 'The directory to use for templates',
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
  // Shim friendly options
  options.outputDir = options['output-dir']
  options.testDir = options['test-dir']
  options.templatesDir = options['templates-dir']
  options.dryRun = options['dry-run']

  // Execute on sources
  const globby = require('globby')
  const convert = require('..')

  globby(options.input)
    .then((files) => {
      convert(files, options)
    })
    .catch((err) => {
      console.log(err.stack)
      process.exit(1)
    })
}
