import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { VisitList } from './VisitList';

Enzyme.configure({ adapter: new Adapter() })

describe('VisitList', () => {
    let props = {}
    let wrapper
    beforeEach(() => {
        wrapper = shallow(
          <VisitList
              {...props}
          />
      )
    });
    it('should return correct component', () => {
        expect(wrapper.find('[test-visitList="test-visitList"]').length).toEqual(1)
    })

});  