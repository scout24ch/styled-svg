# styled-svg
Generate [styled-components 💅](https://www.styled-components.com/) from SVG files  
  
[![Build Status](https://travis-ci.org/Scout24-CH/styled-svg.svg?branch=master)](https://travis-ci.org/Scout24-CH/styled-svg)
[![Known Vulnerabilities](https://snyk.io/test/github/scout24-ch/styled-svg/badge.svg)](https://snyk.io/test/github/scout24-ch/styled-svg)

## What's this?
This utility generates React components, using the `styled.svg` function. Just drop the .svg somewhere in the project, run the tool and start using your svg files as [inline svg](http://caniuse.com/#feat=svg-html5) with all React and `styled-components` beauty. As a bonus, all svg files are optimized, using the awesome [svgo](https://github.com/svg/svgo) library.

### How it looks like
Expample input file `arrow-down.svg`
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
  <path fill="#0077D0" fill-rule="evenodd" d="M9.00010711,13.0001535 L3.26010711,6.67315352 C2.88910711,6.26415352 2.91810711,5.63115352 3.32710711,5.26015352 C3.73610711,4.88815352 4.36910711,4.91915352 4.74010711,5.32715352 L9.00010711,10.0131535 L13.2601071,5.32715352 C13.6311071,4.92015352 14.2641071,4.88915352 14.6731071,5.26015352 C15.0821071,5.63115352 15.1111071,6.26415352 14.7401071,6.67315352 L9.00010711,13.0001535 Z"/>
</svg>
```

<details>
<summary>
  Generated output file **ArrowDown.js**
</summary>

```jsx
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

const width = '18'
const height = '18'
const viewBox = '0 0 18 18'

const sizes = {
  small: { width: 18, height: 18 },
  medium: { width: 24, height: 24 },
  large: { width: 36, height: 36 }
}

const getDimensions = size => size && sizes[size]
  ? sizes[size]
  : { width, height }

const getDimensionsCss = size => size && sizes[size]
  ? css`
    width: ${sizes[size].width}px;
    height: ${sizes[size].height}px;
  `
  : css`
    width: ${width}px;
    height: ${height}px;
  `

const Image = styled.svg`
  ${({noStyles, size}) => !noStyles ? getDimensionsCss(size) : null}
`

const children = (
  <Fragment>
    <g
      fill='none'
      fillRule='evenodd'
      key='key-0'
    >
      <path
        fill='#FFCF29'
        d='M7.236 1.095L5.68 4.193.204 15.143A2 2 0 0 0 2.011 18h14a2 2 0 0 0 2-2c0-.306-.074-.592-.197-.851l-5.47-10.956-1.558-3.098A1.993 1.993 0 0 0 9.011 0c-.777 0-1.443.448-1.775 1.095z'
      />
      <path
        fill='#333'
        d='M9.02 12a1 1 0 0 1-1-1V5a1 1 0 0 1 2.001 0v6a1 1 0 0 1-1 1m0 4c-.261 0-.521-.11-.712-.29-.18-.19-.29-.44-.29-.71 0-.27.11-.52.29-.71.37-.37 1.042-.37 1.422 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29'
      />
    </g>
  </Fragment>
)

const defaultProps = {
  children,
  viewBox
}

export default Object.assign(Image, {
  getDimensions,
  getDimensionsCss,
  defaultProps,
  displayName: 'Warning'
})
```
</details>

### Usage of the generated component
```js
import React from 'react'
import ArrowDown from './ArrowDown'

const ComponentWithImage = props => (
  <div>
    {props.children}
    <ArrowDown />
  </div>
)

export default ComponentWithImage
```

### Overriding styles and changing colors
As the components are just regular styled-components, overriding styles is easy
```js
import React from 'react'
import ArrowDown from './ArrowDown'

const CustomizedArrowDown = ArrowDown.extend`
  width: 100%;
  border-radius: 3px;
  > path {
    fill: red;
  }
`
```

## Usage
### npm scripts usage (recommended)

Install the dependency
```bash
npm i --save-dev styled-svg
```

Create a npm script entry in your package.json
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
Install the package globally
```bash
npm i -g styled-svg
```

Run it in any directory
```bash
styled-svg **/*.svg
```

## Changelog
[CHANGELOG](CHANGELOG.md)


## Known issues / unimplemented features
- Improve test coverage
- Make it usable in JS with specifying svg strings directly, not only file paths
- Custom template support

## Licence 
[MIT](LICENSE.md)

## Credits
- Thanks [svg2react](https://www.npmjs.com/package/svg2react) for some inspiration how to handle
attributes
