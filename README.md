# styled-svg
Generates styled-components out of SVG files

## Usage
### npm scripts
Create a npm script in your package.json
```js
{
  //...
  "scripts": {
    "svg": "styled-svg src/**/*.svg"
  },
  //...
}
```
Then run `yarn svg` or `npm run svg` at any time to generate Components

### JS
Install the dependency
```bash
yarn add --dev styled-svg
```
JS example
```js
const convert = require('@s24/styled-svg')
const files = [
  'path/to/file/a.svg',
  'path/to/file/b.svg',
  'path/to/file/c.svg'
]
convert(files)
```

### Command line
Install the package
```bash
yarn add --global styled-svg
```
Run it in any directory
```bash
styled-svg **/*.svg
```
