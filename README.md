# styled-svg
Generates styled-components out of SVG files

## Usage
### npm scripts usage
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
Then run `npm run svg` at any time to generate Components

### JS usage
Install the dependency
```bash
npm i --save-dev styled-svg
```

JS example
```js
const convert = require('styled-svg')
const files = [
  'path/to/file/a.svg',
  'path/to/file/b.svg',
  'path/to/file/c.svg'
]
convert(files)
```

### Command line usage
Install the package with yarn
```bash
npm i -g styled-svg
```

Run it in any directory
```bash
styled-svg **/*.svg
```
