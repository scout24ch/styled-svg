import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Image from './Warning.js'

describe('Warning.svg generated styled component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Image />)
  })

  it('renders a <svg> tag without crashing', () => {
    // expect(wrapper).toHaveTagName('svg')
    // TODO: until this issue is resolved we have to use mount and find() https://github.com/styled-components/styled-components/issues/1985
    expect(mount(<Image />).find('svg').length).toBe(1)
  })

  it('renders correctly according to snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('has dimensions greater than zero', () => {
    const dimensions = Image.getDimensions()
    expect(dimensions.width).not.toBe('0')
    expect(parseInt(dimensions.width, 10)).toBeGreaterThan(0)
    expect(dimensions.height).not.toBe('0')
    expect(parseInt(dimensions.height, 10)).toBeGreaterThan(0)
  })
})
