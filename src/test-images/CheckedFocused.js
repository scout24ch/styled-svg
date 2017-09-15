import React from 'react'
import styled, { css } from 'styled-components'

const width = '14'
const height = '14'
const viewBox = '0 0 14 14'

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
    <defs
    >
      <circle
        id='s-baa78cd811-a'
        cx='7'
        cy='7'
        r='7'
      />
    </defs>,
    <g
      fill='none'
      fillRule='evenodd'
    >
      <use
        fill='#FFF'
        xlinkHref='#s-baa78cd811-a'
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
  ],
  viewBox
}

export default Object.assign(Image, {
  getDimensions,
  getDimensionsCss,
  defaultProps,
  displayName: 'CheckedFocused'
})
