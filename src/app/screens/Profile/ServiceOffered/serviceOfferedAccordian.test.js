import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';
import ServiceOfferedAccordian from './serviceOfferedAccordian';

Enzyme.configure({ adapter: new Adapter() })

Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    category: {isOpen:true,serviceCategoryId:23,serviceCategoryDescription:'',serviceTypeModel:[{}]},
    checkboxCount:2,
    toggleCollapse: jest.fn(),
    handleClick: jest.fn()
}

 store = mockStore(defaultState);

describe('Details', () => {
    let wrapper;
   
    beforeEach(() => {
        wrapper = shallow(
            <ServiceOfferedAccordian dispatch={dispatch} store={store} {...defaultState} />
        )
        
    })

    it('should return ServiceOfferedAccordian', () => {
        expect(wrapper).toBeDefined()
    })

    it('Check the toggleCollapse function', () => {
        wrapper.instance().toggleCollapse()
     })
}); 	
