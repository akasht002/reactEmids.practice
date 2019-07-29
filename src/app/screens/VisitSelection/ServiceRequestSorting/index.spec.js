import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import Sorting from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('Sorting', () => {
    let props = {
      toggleclass: jest.fn(),
      onSortChange: jest.fn()
    }
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <Sorting
            {...props}
        />
    )
  });
    it('should return correct component', () => {
        wrapper.setProps({
          PostedDate: '24-07-2019',
          Newest: '24-07-2019',
          Oldest: '24-07-2019'
        })
        expect(wrapper.find('.SortDropDown').length).toEqual(1)
    })

    it('Check the events', () => {
      expect(wrapper.find('[data-toggle="dropdown"]').props().onClick({}));
      expect(wrapper.find('[test-posted="test-posted"]').props().onClick({}));
      expect(wrapper.find('[test-newest="test-newest"]').props().onClick({}));
      expect(wrapper.find('[test-oldest="test-oldest"]').props().onClick({}));
  });
});  