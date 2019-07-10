import { css } from 'styled-components'

// somehow sizes is ending up in markup, even if it is not a valid svg attribute
// until we have a better solution, just render it empty, instead to '[Object object]'
export const sanitizeSizes = sizes =>
  Object.defineProperty(sizes, 'toString', {
    value: () => '',
    enumerable: false
  })

export function createHelpers (width, height) {
  const getDimensions = (size, sizes) => {
    if (
      size &&
      typeof size.width === 'number' &&
      typeof size.height === 'number'
    ) {
      return size
    }

    return size && sizes[size] ? sizes[size] : { width, height }
  }

  const getCss = (size, sizes, fillColor, fillColorRule, noStyles) => {
    if (noStyles) {
      return ''
    }

    const dimensions = getDimensions(size, sizes)
    const fillRule =
      fillColor && fillColorRule
        ? `${fillColorRule}{ fill: ${fillColor}; }`
        : ''

    return css`
      width: ${dimensions.width}px;
      height: ${dimensions.height}px;
      ${fillRule}
    `
  }

  const propsToCss = ({ size, sizes, fillColor, fillColorRule, noStyles }) =>
    getCss(size, sizes, fillColor, fillColorRule, noStyles)

  return { getDimensions, getCss, propsToCss }
}
