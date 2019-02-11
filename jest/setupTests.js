import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import 'jest-styled-components'
import 'jsdom-global/register'

Enzyme.configure({ adapter: new Adapter() })
