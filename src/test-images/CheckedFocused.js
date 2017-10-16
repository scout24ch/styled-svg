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
      key='key-1'
    >
      <circle
        id='s-c19cde862f-a'
        cx='7'
        cy='7'
        r='7'
        key='s-c19cde862f-a'
      />
    </defs>,
    <g
      fill='none'
      fillRule='evenodd'
      key='key-4'
    >
      <use
        fill='#FFF'
        xlinkHref='#s-c19cde862f-a'
        key='key-5'
      />
      <circle
        cx='7'
        cy='7'
        r='6.5'
        stroke='#FF7500'
        key='key-6'
      />
      <circle
        cx='7'
        cy='7'
        r='7.5'
        stroke='#FFF'
        key='key-7'
      />
      <circle
        cx='7'
        cy='7'
        r='3'
        fill='#FF7500'
        key='key-8'
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
