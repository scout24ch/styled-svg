import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

const width = '14'
const height = '14'
const viewBox = '0 0 14 14'

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
  viewBox
}

export default Object.assign(Image, {
  getDimensions,
  getDimensionsCss,
  defaultProps,
  displayName: 'CheckedFocused'
})
