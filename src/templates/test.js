import React from 'react'
import { shallow } from 'enzyme'
import Image from '{{FILENAME}}'

const negativeNumberString = expect.stringMatching(/^-/)

describe('{{NAME}}.svg generated styled component', () => {
  it('renders a <svg> tag without crashing', () => {
    const wrapper = shallow(<Image />)
    expect(wrapper).toHaveTagName('svg')
  })

  it('has dimensions greater than zero', () => {
    const dimensions = Image.getDimensions()
    expect(dimensions.width).not.toBe('0')
    expect(dimensions.width).not.toEqual(negativeNumberString)
    expect(dimensions.height).not.toBe('0')
    expect(dimensions.height).not.toEqual(negativeNumberString)
  })
})
