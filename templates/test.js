import React from 'react'
import TestRenderer from 'react-test-renderer'
import Image from '##FILENAME##'

const sizes = {
  small: { width: 18, height: 18 },
  medium: { width: 24, height: 24 },
  large: { width: 36, height: 36 },
  extralarge: { width: 48, height: 48 }
}

describe('##NAME##.svg generated styled component', () => {
  let renderer
  beforeEach(() => {
    renderer = TestRenderer.create(<Image />)
  })

  it('sets the correct display name', () => {
    expect(Image.displayName).toEqual('##NAME##')
  })
  it('renders a <svg> tag without crashing', () => {
    expect(renderer.root.findAllByType('svg').length).toBe(1)
  })

  it('renders correctly according to snapshot', () => {
    expect(renderer.toJSON()).toMatchSnapshot()
  })

  it('has dimensions greater than zero', () => {
    const dimensions = Image.getDimensions()
    expect(dimensions.width).not.toBe('0')
    expect(parseInt(dimensions.width, 10)).toBeGreaterThan(0)
    expect(dimensions.height).not.toBe('0')
    expect(parseInt(dimensions.height, 10)).toBeGreaterThan(0)
  })

  it('works with dimension types of number', () => {
    const size = sizes.medium
    const dimensions = Image.getDimensions(size)
    expect(dimensions).toEqual(size)
  })
  it('works with dimension types of string', () => {
    const dimensions = Image.getDimensions('small', sizes)
    expect(dimensions).toEqual(sizes.small)
  })
  it('returns an empty string if noStyles param is set', () => {
    expect(Image.getCss(undefined, undefined, undefined, undefined, true)).toEqual('')
  })
  it('returns styles with getCss method', () => {
    const fillColor = '#ff0000'
    const fillRule = '&&& path, &&& use, &&& g'
    expect(Image.getCss('medium', sizes, fillColor, fillRule)).toEqual([ '\n    width: ', String(sizes.medium.width), 'px;\n    height: ', String(sizes.medium.height), 'px;\n    ', `${fillRule}{ fill: ${fillColor}; }`, '\n  ' ])
  })
})
