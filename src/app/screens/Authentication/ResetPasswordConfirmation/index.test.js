import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { ResetPasswordConfirmation, mapDispatchToProps, mapStateToProps } from './index.js';


// jest.mock('../AuthCover', () => ({
//   AuthCover: 'mockAuthover'
// }))

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
  redirect: jest.fn()
};

store = mockStore(defaultState);



describe("ResetPassword Component", function () {
  let wrapper;

  beforeEach(() => {
    const props = defaultState;
    wrapper = shallow(
        <ResetPasswordConfirmation  dispatch={dispatch} store={store} {...defaultState} />
    )
   
    }); 

    it('Check the ResetPassword Details body', () => {
      wrapper.setState({
      })
      expect(wrapper).toBeDefined()
    }); 
  
    it('Check the resendEmail  value', () => {
      wrapper.instance().resendEmail()
    })
    it('should test initial state', () => {
      const initialState = defaultState
      expect(mapStateToProps(initialState)).toBeDefined();
    }); 

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).redirect();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  

});