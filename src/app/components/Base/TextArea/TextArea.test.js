import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { TextArea } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('SelectBox', () => {
  it('should return correct component', () => {
    const wrapper = shallow(
      <TextArea id='1' placeholder='Write Some Thing' shrink={99} rows='5' className='textarea'></TextArea>,
    )
    expect(wrapper).toBeDefined();
  })
});





