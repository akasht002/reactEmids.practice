import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import IconCard from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('IconCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <IconCard
        type={'text'}
        profile={[{ name: 'test', desc: 'desc', selected: false, imageClass: 'test' }]}
        index={1}>
      </IconCard>
    )
  })
  it('should return correct component', () => {
    expect(wrapper).toBeDefined();
  })

  it('should return correct component', () => {
    wrapper.setProps({
      profile: [{ name: 'test', desc: 'desc', selected: true, imageClass: 'test' }]
    })
    expect(wrapper).toBeDefined();
  })
});

