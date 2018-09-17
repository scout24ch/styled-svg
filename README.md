# styled-svg
Generate [styled-components 💅](https://www.styled-components.com/) from SVG files  
  
[![Build Status](https://travis-ci.org/Scout24-CH/styled-svg.svg?branch=master)](https://travis-ci.org/Scout24-CH/styled-svg)
[![Known Vulnerabilities](https://snyk.io/test/github/scout24-ch/styled-svg/badge.svg)](https://snyk.io/test/github/scout24-ch/styled-svg)

## What's this?
This utility generates React components, using the `styled.svg` function. Just drop the .svg somewhere in the project, run the tool and start using your svg files as [inline svg](http://caniuse.com/#feat=svg-html5) with all React and `styled-components` beauty. As a bonus, all svg files are optimized, using the awesome [svgo](https://github.com/svg/svgo) library.

### How it looks like

- warning.svg
- `npx styled-svg **/*.svg --size=small:18x18 --size=medium:24x24 --size=large:36x36`

<details>
<summary>
  Input and generated output example
</summary>
  
### Input
```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 44.1 (41455) - http://www.bohemiancoding.com/sketch -->
    <title>icon/flashmessage/warning</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Component-and-pattern-library" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Flashmessages" transform="translate(-112.000000, -860.000000)">
            <g id="Components" transform="translate(101.000000, 194.000000)">
                <g id="Alert-Warning" transform="translate(1.001009, 552.000000)">
                    <g id="Alert-warning-message-inpage" transform="translate(0.000000, 106.000000)">
                        <g id="icon/flashmessage/warning" transform="translate(10.010091, 8.000000)">
                            <path d="M7.225,1.095 L5.668,4.193 L0.193,15.143 C0.074,15.408 0,15.694 0,16 C0,17.105 0.895,18 2,18 L9,18 L16,18 C17.105,18 18,17.105 18,16 C18,15.694 17.926,15.408 17.803,15.149 L12.332,4.193 L10.775,1.095 C10.444,0.448 9.778,0 9,0 C8.223,0 7.557,0.448 7.225,1.095 Z" id="Fill-1" fill="#FFCF29"></path>
                            <path d="M9.00908174,12 C8.45652472,12 8.00807265,11.553 8.00807265,11 L8.00807265,5 C8.00807265,4.448 8.45652472,4 9.00908174,4 C9.56163875,4 10.0100908,4.448 10.0100908,5 L10.0100908,11 C10.0100908,11.553 9.56163875,12 9.00908174,12 M9.00908174,16 C8.74881937,16 8.48855701,15.89 8.29836529,15.71 C8.11818365,15.52 8.00807265,15.27 8.00807265,15 C8.00807265,14.73 8.11818365,14.48 8.29836529,14.29 C8.66873865,13.92 9.33941473,13.92 9.71979818,14.29 C9.89997982,14.48 10.0100908,14.74 10.0100908,15 C10.0100908,15.26 9.89997982,15.52 9.71979818,15.71 C9.52960646,15.89 9.2693441,16 9.00908174,16" id="Fill-1" fill="#333333"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
```

### Output
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
