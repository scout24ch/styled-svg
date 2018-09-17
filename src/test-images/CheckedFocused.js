import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const width = '14'
const height = '14'
const viewBox = '0 0 14 14'

const sizes = {
  small: { width: 18, height: 18 },
  medium: { width: 24, height: 24 },
  large: { width: 36, height: 36 }
}

const getDimensions = size => {
  if (size && typeof size.width === 'number' && typeof size.height === 'number') {
    return size
  }
  return size && sizes[size]
    ? sizes[size]
    : { width, height }
}

const getCss = (size, fillColor, fillColorRule) => {
  const dimensions = getDimensions(size)
  const fillRule = fillColor && fillColorRule ? `${fillColorRule}{ fill: ${fillColor}; }` : ''
  return css`
    width: ${dimensions.width}px;
    height: ${dimensions.height}px;
    ${fillRule}
  `
}

const Image = styled.svg`
  ${({noStyles, size, fillColor, fillColorRule}) => !noStyles
    ? getCss(size, fillColor, fillColorRule)
    : null
  }
`

const children = (
  <Fragment>
    <defs
      key='key-0'
    >
      <circle
        id='s-c19cde862f-a'
        cx='7'
        cy='7'
        r='7'
      />
    </defs>
    <g
      fill='none'
      fillRule='evenodd'
      key='key-1'
    >
      <use
        fill='#FFF'
        xlinkHref='#s-c19cde862f-a'
      />
      <circle
        cx='7'
        cy='7'
        r='6.5'
        stroke='#FF7500'
      />
      <circle
        cx='7'
        cy='7'
        r='7.5'
        stroke='#FFF'
      />
      <circle
        cx='7'
        cy='7'
        r='3'
        fill='#FF7500'
      />
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
  sizes: (props, name, componentName) => {
    const prop = props[name]
    if (typeof prop !== 'object') { return }
    for (let key in prop) {
      if (!prop[key] || typeof prop[key].width !== 'number' || typeof prop[key].height !== 'number') {
        return new Error(
          'Invalid prop `' + name + '` supplied to' + ' `' + componentName + '`. Validation failed.'
        )
      }
    }
  }
}

export default Object.assign(Image, {
  getDimensions,
  getCss,
  defaultProps,
  propTypes,
  displayName: 'CheckedFocused'
})
