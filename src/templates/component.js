import styled, { css } from 'styled-components'
import React from 'react' // eslint-disable-line no-unused-vars

const width = '{{WIDTH}}'
const height = '{{HEIGHT}}'
const viewBox = '{{VIEWBOX}}'

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

const defaultProps = {
  children: [
    '{{SVG}}'
  ],
  viewBox
}

export default Object.assign(Image, {
  getDimensions,
  getDimensionsCss,
  defaultProps,
  displayName: '{{NAME}}'
})
