import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter  } from 'react-router-dom' 
import sinon from 'sinon';

import {ResetPasswordSuccess, mapDispatchToProps, mapStateToProps} from './index';

jest.mock('../../../components', () => ({
    LoginCover : 'mockLoginCover'
}))

Enzyme.configure({ adapter: new Adapter() })

let wrapper, store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  isLoading: true,
  userName:'',
  match:{
    params : {
        uid: 234,
        token: 'dfdf',
        userType:'I'
    }
  },
  loadingState: { isLoading :true },
  authState: {
      resetPasswordState: {
        resetPasswordSuccess: true,
        resetPasswordLinkStatus: true,
        resetPasswordStatus: true,
      },
      forgetPasswordState : { emailId :''}
  },
  resetPasswordSuccess: true,
  resetPasswordLinkStatus: true,
  resetPasswordStatus: true,
  onLogin: jest.fn()
};

store = mockStore(defaultState);



describe("ResetPasswordSuccess Component", function () {
  let wrapper;

  beforeEach(() => {
    const props = defaultState;
    wrapper = shallow(
        <ResetPasswordSuccess  dispatch={dispatch} store={store} {...defaultState} />
    )
   
    }); 

    it('Check the ResetPasswordSuccess Details body', () => {
      wrapper.setState({
      })
      expect(wrapper).toBeDefined()
    }); 
  
    it('Check the onClickButtonLogin value', () => {
      wrapper.instance().onClickButtonLogin()
    })
    it('should test initial state', () => {
      const initialState = defaultState
      expect(mapStateToProps(initialState)).toBeDefined();
    }); 

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogin();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  

});