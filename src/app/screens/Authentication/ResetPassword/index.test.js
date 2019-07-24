import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { ResetPassword, mapDispatchToProps, mapStateToProps } from './index.js';


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
      }
  },
  resetPasswordSuccess: true,
  resetPasswordLinkStatus: true,
  resetPasswordStatus: true,
  onClickReset: jest.fn(),
  getEmailId: jest.fn(),
  formDirty: jest.fn(),
};

store = mockStore(defaultState);



describe("ResetPassword Component", function () {
  let wrapper;

  beforeEach(() => {
    const props = defaultState;
    wrapper = shallow(
        <ResetPassword  dispatch={dispatch} store={store} {...defaultState} />
    )
    wrapper.setState({
        showModalOnCancel: false,
        firstName: '',
        lastName: '',
        contactNumber: ''
    })
    }); 

    it('Check the ResetPassword Details body', () => {
      wrapper.setState({
      })
      expect(wrapper).toBeDefined()
    }); 
  
    it('Check the confirm password value', () => {
      const onClickReset = jest.fn()
      const input = wrapper.find('[name="confirmPass"]')
      input.simulate("change", { target: { name: 'confirmPass', value: 'Emids@123' } });
      expect(onClickReset.mock.calls.length).toBe(0)
  
      const button = wrapper.find('[label="Reset My Password"]');
      button.simulate("click")
    })
    it('should test initial state', () => {
      const initialState = defaultState
      expect(mapStateToProps(initialState)).toBeDefined();
    }); 

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onClickReset();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getEmailId();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  it('Check the onClickButtonReset Details body', () => {
    wrapper.setState({
      passwordMatch : true,
      passwordCombination :true,
      pass :'er',
      confirmPass:'jh'
    })
    wrapper.instance().onClickButtonReset()
  });

  it('Check the onClickButtonReset Details body', () => {
    wrapper.setState({
      passwordMatch : true,
      passwordCombination :true,
      pass :'',
      confirmPass:''
    })
    wrapper.instance().onClickButtonReset()
  });

  it('Check the onClickButtonReset Details body', () => {
    wrapper.setState({
      pass :'',
      confirmPass:''
    })
    wrapper.instance().onClickButtonReset()
  });

  

  it('Check the validatePassword Details body', () => {
    wrapper.setState({pass:'test',confirmPass:'test'})
    wrapper.instance().validatePassword()
  });

  it('Check the validatePassword Details body', () => {
    wrapper.setState({pass:'test',confirmPass:'test123'})
    wrapper.instance().validatePassword()
  });

  it('Check the validatePassword Details body', () => {
    wrapper.setState({pass:false})
    wrapper.instance().validatePassword()
  });

  it('Check the onChangeNewPassword Details body', () => {
    // wrapper.setState({pass:false})
    wrapper.instance().onChangeNewPassword({target:{value:true}})
  });

  it('Check the onChangeConfirmPassword Details body', () => {
    // wrapper.setState({pass:false})
    wrapper.instance().onChangeConfirmPassword({target:{value:true}})
  });

});