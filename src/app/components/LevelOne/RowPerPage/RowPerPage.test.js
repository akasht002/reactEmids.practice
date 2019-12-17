import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RowPerPage } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('RowPerPage', () => {
    let wrapper;
    let props = {
        pageSizeChange: jest.fn()
    }
    beforeEach(() => {
        wrapper = shallow(
            <RowPerPage
                pageSize={100}
                pageSizeChange={'rowPageChange'}
                pageSizeOption={[10, 20, 50, 100]}
                isEnabled={true}
                {...props}
            />
        )
    })

    it('should return select-wrap-dahboard', () => {
        expect(wrapper.find('.select-wrap-dahboard').length).toEqual(1);
    })

    it('should return test-select="test-select"', () => {
        expect(wrapper.find('[test-select="test-select"]').props().onChange({ target: { value: 10 } }))
    })
}); 	
