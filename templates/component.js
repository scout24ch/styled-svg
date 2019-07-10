import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createHelpers, sanitizeSizes } from 'styled-svg'

const width = '##WIDTH##'
const height = '##HEIGHT##'
const viewBox = '##VIEWBOX##'

const sizes = sanitizeSizes('##SIZES##')

const { getDimensions, getCss, propsToCss } = createHelpers(width, height)

const Image = styled.svg`${propsToCss}`

const children = (
  <Fragment>
##SVG##
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
  displayName: '##NAME##'
})
