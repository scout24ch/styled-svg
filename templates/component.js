import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

const width = '##WIDTH##'
const height = '##HEIGHT##'
const viewBox = '##VIEWBOX##'

const sizes = '##SIZES##'

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
    ##SVG##
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
  displayName: '##NAME##'
})
