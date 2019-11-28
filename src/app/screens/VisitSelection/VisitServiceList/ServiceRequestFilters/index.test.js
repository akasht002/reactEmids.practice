import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter  from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('Filter ', () => {
    let props = {
        ServiceCategory: [{"serviceCategoryId":1,"serviceCategoryDescription":"Activities of Daily Living"},{"serviceCategoryId":2,"serviceCategoryDescription":"Help at Home"},{"serviceCategoryId":3,"serviceCategoryDescription":"Groceries and Nutrition"},{"serviceCategoryId":4,"serviceCategoryDescription":"Transportation"}],
        isOpen: false,
        applyReset: jest.fn(),
        applyFilter: jest.fn(),
        toggle: jest.fn()
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Filter  {...props} />
        )
    })

    it('should return Filter ', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return toggle', () => {
        wrapper.instance().setState({
            activeTab: '2'
        })
        wrapper.instance().toggle('1');
    })

    it('should return activeTab1', () => {
        wrapper.instance().setState({
            activeTab: '1'
        })
        expect(wrapper.find('.active').props().onClick())
    })

    it('should return activeTab2', () => {
        wrapper.instance().setState({
            activeTab: '2'
        })
        expect(wrapper.find('.active').props().onClick())
    })

    it('should return activeTab3', () => {
        wrapper.instance().setState({
            activeTab: '3'
        })
        expect(wrapper.find('.active').props().onClick())
    })

    it('should return activeTab4', () => {
        wrapper.instance().setState({
            activeTab: '4'
        })
        expect(wrapper.find('.active').props().onClick())
    })

    it('should return btn-outline-primary', () => {
        expect(wrapper.find('.btn-outline-primary').props().onClick())
    })

    it('should return btn-primary', () => {
        expect(wrapper.find('.btn-primary').props().onClick())
    })
}); 	
