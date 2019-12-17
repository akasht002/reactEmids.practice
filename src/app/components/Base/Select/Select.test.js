import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import {SelectBox} from './index';

Enzyme.configure({ adapter: new Adapter() })

const SelectPlan = [
  { label: "Plan One", value: 1, },
  { label: "Plan Two", value: 2, },
  { label: "Plan Three", value: 3, },
  { label: "Plan Four", value: 4, },
  { label: "Plan Five", value: 5, },
  { label: "Plan Six", value: 6, },
  { label: "Plan Seven", value: 7, },
  { label: "Plan Eight", value: 8, },
  { label: "Plan Nine", value: 9, },
];

describe('SelectBox', () => {
  it('should return correct component', () => {
    const wrapper = shallow(
      <SelectBox options={SelectPlan} id='1' placeholder='Select' value='John Doe'></SelectBox>,
    )
    expect(wrapper).toBeDefined();
  })
});



