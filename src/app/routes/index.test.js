import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {AppStackRoot,Loading,LoginCallBack}  from './index'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    id:"",
    searchable:true,
    placeholder:'',
    className:'',
    onClickSave :jest.fn(),
    options:[]
}

describe("AppStackRoot", function () {
    let wrapper;

    wrapper = shallow(
        <AppStackRoot dispatch={dispatch} store={store} {...defaultState} />
    )  

    it('Check the AppStackRoot Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });

    it('Check the AppStackRoot Details body', () => {
        wrapper.instance().startPage({},{})
    });

    it('Check the Loading Details body', () => {
       expect(Loading({error:true})).toEqual('Oh nooess!')
    });

    it('Check the Loading Details body', () => {
        expect(Loading({})).toBeDefined()
     });

     it('Check the LoginCallBack Details body', () => {
        expect(LoginCallBack(false)).toBeDefined()
     });
    
});