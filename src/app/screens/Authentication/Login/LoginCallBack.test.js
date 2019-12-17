import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { LoginCallBack ,mapDispatchToProps } from './LoginCallBack';

jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../components', () => ({
    CoreoWizScreen: 'mockCoreoWizScreen'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
   onboardingState : {
            setPasswordState: {
                setPasswordStatus:true
            }
        },
        onLoginSuccess:jest.fn()

}

store = mockStore(defaultState);

describe("LoginCallBack", function () {
    let wrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = shallow(
            <LoginCallBack   dispatch={dispatch} store={store} {...defaultState} />
        )
        wrapper.setState({
            showModalOnCancel: false,
            firstName: '',
            lastName: '',
            contactNumber: ''
        })
    });   

    it('Check the LoginCallBack  Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });    
   
    it('Check mapDispatchToProps onLoginSuccess', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onLoginSuccess();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check mapDispatchToProps onLoginFail', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onLoginFail();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

});