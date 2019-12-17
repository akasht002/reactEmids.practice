import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { PrivateRoute, mapStateToProps, mapDispatchToProps } from './privateRouter';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    permission : {},
    location :"",
    access_token:"sdfsdfsf",
    authState:{
        userState:{
            userData:{
                access_token:"sdfsdfsf"
            }
        }
    },
    component:'',
    checkUserData:jest.fn()
}

store = mockStore(defaultState);

describe("PrivateRoute ", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <PrivateRoute dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the PrivateRoute', () => {
        expect(shallowWrapper).toBeDefined();
    });
    
    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the checkUserData', () => {
        shallowWrapper.instance().checkUserData();
    });

    it('Check the checkUserData', () => {
        shallowWrapper.setProps({
            access_token:false
        })
        shallowWrapper.instance().checkUserData();
    });


    it('Check the renderMethod', () => {
        shallowWrapper.instance().renderMethod();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).checkUserData({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});