import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

const width = '18'
const height = '18'
const viewBox = '0 0 18 18'

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
    <g
      fill='none'
      fillRule='evenodd'
      key='key-0'
    >
      <path
        fill='#FFCF29'
        d='M7.236 1.095L5.68 4.193.204 15.143A2 2 0 0 0 2.011 18h14a2 2 0 0 0 2-2c0-.306-.074-.592-.197-.851l-5.47-10.956-1.558-3.098A1.993 1.993 0 0 0 9.011 0c-.777 0-1.443.448-1.775 1.095z'
      />
      <path
        fill='#333'
        d='M9.02 12a1 1 0 0 1-1-1V5a1 1 0 0 1 2.001 0v6a1 1 0 0 1-1 1m0 4c-.261 0-.521-.11-.712-.29-.18-.19-.29-.44-.29-.71 0-.27.11-.52.29-.71.37-.37 1.042-.37 1.422 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29'
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
  displayName: 'Warning'
})
