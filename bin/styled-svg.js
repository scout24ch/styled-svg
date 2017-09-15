#!/usr/bin/env node
const glob = require('glob')
const path = require('path')

const convert = require('..')

const pattern = path.join(process.cwd(), (process.argv[2] || '**/*.svg'))

glob(pattern, (err, files) => {
  if (err) {
    console.log(err.stack)
    process.exit(1)
  }
  convert(files)
})
