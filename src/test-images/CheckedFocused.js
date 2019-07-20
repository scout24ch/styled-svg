import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createHelpers, sanitizeSizes } from 'styled-svg'

const width = '14'
const height = '14'
const viewBox = '0 0 14 14'

const sizes = sanitizeSizes({
  small: { width: 18, height: 18 },
  medium: { width: 24, height: 24 },
  large: { width: 36, height: 36 }
})

const { getDimensions, getCss, propsToCss } = createHelpers(width, height)

const Image = styled.svg`
  ${propsToCss}
`

const children = (
  <Fragment>
    <defs key='key-0'>
      <circle id='s-c19cde862f-a' cx='7' cy='7' r='7' />
    </defs>
    <g fill='none' fillRule='evenodd' key='key-1'>
      <use fill='#FFF' xlinkHref='#s-c19cde862f-a' />
      <circle cx='7' cy='7' r='6.5' stroke='#FF7500' />
      <circle cx='7' cy='7' r='7.5' stroke='#FFF' />
      <circle cx='7' cy='7' r='3' fill='#FF7500' />
    </g>
  </Fragment>
)

const defaultProps = {
  children,
  viewBox,
  fillColor: null,
  fillColorRule: '&&& path, &&& use, &&& g',
  sizes,
  size: null
}

const propTypes = {
  fillColor: PropTypes.string,
  fillColorRule: PropTypes.string,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    })
  ]),
  sizes: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  })
}

export default Object.assign(Image, {
  getDimensions,
  getCss,
  defaultProps,
  propTypes,
  displayName: 'CheckedFocused'
})
