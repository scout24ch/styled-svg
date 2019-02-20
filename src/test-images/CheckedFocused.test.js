import React from 'react'
import TestRenderer from 'react-test-renderer'
import Image from './CheckedFocused.js'

describe('CheckedFocused.svg generated styled component', () => {
  let renderer
  beforeEach(() => {
    renderer = TestRenderer.create(<Image />)
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
})
