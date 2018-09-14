import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

const width = '##WIDTH##'
const height = '##HEIGHT##'
const viewBox = '##VIEWBOX##'

const getDimensions = () => ({
  height,
  width
})

const getDimensionsCss = () => css`
  width: ${width}px;
  height: ${height}px;
`

const Image = styled.svg`
  ${({noStyles}) => !noStyles ? getDimensionsCss() : null}
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
