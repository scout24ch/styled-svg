import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const width = '##WIDTH##'
const height = '##HEIGHT##'
const viewBox = '##VIEWBOX##'

const sizes = '##SIZES##'

const getDimensions = size => size && sizes[size]
  ? sizes[size]
  : { width, height }

const getCss = (size, fillColor, fillColorRule) => {
  const dimensions = getDimensions(size)
  return css`
    width: ${dimensions.width}px;
    height: ${dimensions.height}px;
    ${fillColor && fillColorRule
      ? `${fillColorRule}{ fill: ${fillColor}; }`
      : ``
    }
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
    ##SVG##
  </Fragment>
)

const defaultProps = {
  children,
  viewBox,
  fillColor: null,
  fillColorRule: '&&& path, &&& use, &&& g'
}

const propTypes = {
  fillColor: PropTypes.string,
  fillColorRule: PropTypes.string,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Object.assign(Image, {
  getDimensions,
  getCss,
  defaultProps,
  propTypes,
  displayName: '##NAME##'
})
