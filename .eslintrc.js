module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true
  },
  extends: [
    'standard',
    "standard-react"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
