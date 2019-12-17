import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { Header }  from './Header'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    header:"",
    searchable:true,
    placeholder:'',
    className:'',
    onClickSave :jest.fn(),
    data:[{
        
    }]
}

describe("Header", function () {
    let wrapper;
    it("Header Body",()=>{
        expect(Header(defaultState)).toBeDefined();
    });
});