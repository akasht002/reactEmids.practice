import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RowPerPage from './RowPerPage';

Enzyme.configure({ adapter: new Adapter() })

describe('RowPerPage', () => {
    let props = {
        pageSizeChange: jest.fn()
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <RowPerPage
                pageSize={100}
                pageSizeChange={'rowPageChange'}
                pageSizeOption={[10, 20, 50, 100]}
                {...props}
            />
        )
    })

    it('should return select-wrap-dahboard', () => {
        expect(wrapper.find('.select-wrap-dahboard').length).toEqual(1);
    })

    it('should return onChange', () => {
        expect(wrapper.find('.test').props().onChange())
    })
}); 	
