import React from 'react'
import Enzyme,{ mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai';
import Sorting from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('ServiceRequest Sorting index.js test', () => {
  it('renders three <Sorting /> components', () => {
    const wrapper = mount(<Sorting />);
    expect(wrapper.find('.ProfileSelectSorting')).to.have.lengthOf(3);
  });
})
