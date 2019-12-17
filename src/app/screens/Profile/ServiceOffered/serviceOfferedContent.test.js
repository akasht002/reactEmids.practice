import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';
import {ServiceOfferedContent} from './serviceOfferedContent';

Enzyme.configure({ adapter: new Adapter() })

Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    name : [{serviceCategoryId:23,serviceTypeModel:[{}]}],
    type:[],
    isOpen:true,
    checkboxCount:2,
    toggleCollapse: jest.fn(),
    handleClick: jest.fn()
}

 store = mockStore(defaultState);

describe('Details', () => {
    let wrapper;
   
    beforeEach(() => {
        wrapper = shallow(
            <ServiceOfferedContent dispatch={dispatch} store={store} {...defaultState} />
        )
        
    })

    it('should return ServiceOfferedContent', () => {
        expect(wrapper).toBeDefined()
    })
  
}); 	
