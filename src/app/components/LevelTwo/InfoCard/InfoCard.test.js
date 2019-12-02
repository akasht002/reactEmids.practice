import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import InfoCard from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('InfoCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <InfoCard
        type={'text'}
        profile={[{ name: 'test', desc: 'desc', selected: false, imageClass: 'test' }]}
        index={1}>
      </InfoCard>
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

