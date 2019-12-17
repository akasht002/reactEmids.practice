import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('Search', () => {
    let props = {
        handleSearchData: jest.fn(),
        handleSearchkeyword: jest.fn(),
        toggleSearch: jest.fn(),
        closeSearch: jest.fn()
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Search {...props} />
        )
    })

    it('should return Search', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return ProfileIconSearch', () => {
        expect(wrapper.find('.ProfileIconSearch').props().onClick())
    })

    it('should return form-control', () => {
        expect(wrapper.find('.form-control').props().onChange())
    })
    
    it('should return btn-primary', () => {
        expect(wrapper.find('.btn-primary').props().onClick())
    })

    it('should return closeBtn', () => {
        expect(wrapper.find('.closeBtn').props().onClick())
    })

    it('should return test-onSubmit="test-onSubmit"', () => {
        expect(wrapper.find('[test-onSubmit="test-onSubmit"]').props().onSubmit())
    })
}); 	
