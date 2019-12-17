import React from 'react';
import Enzyme, { shallow, configure, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers } from 'redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { ForgetPassword, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../components', () => ({
  LoginCover: 'mockLoginCover'
}))

const mockStore = configureStore();
Enzyme.configure({ adapter: new Adapter() })
let store;
const props = {
  sendResetPasswordLink: jest.fn(),
  formDirty: jest.fn(),
  onLogin: jest.fn(),
  isSendResetPasswordLinkSuccess: true,
  isLoading: true,
  isSendResetPasswordLinkError: false,
  authState: {
    forgetPasswordState: {
      sendResetPasswordLinkSuccess: false,
      sendResetPasswordLinkError: false
    }
  },
  loadingState: {
    isLoading: false
  }
}
store = mockStore(props)

describe('ForgetPassword Component', () => {
  let wrapper;
  const onClicksendResetPasswordLink = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ForgetPassword onClick={onClicksendResetPasswordLink} {...props} store={store} />)
  })

  it('Check ForgetPassword Component contains test-forget-body', () => {
    wrapper.setProps({
      isSendResetPasswordLinkSuccess: false,
      isSendResetPasswordLinkError: true
    })
    expect(wrapper.find('[test-forget-body="test-forget-body"]').length).toEqual(1);
  })

  it('Check the email value', () => {
    const input = wrapper.find('[name="emailId"]')

    input.simulate("change", { target: { name: 'email', value: 'blah@gmail.com' } });
    expect(props.formDirty.mock.calls.length).toBe(0)

    const button = wrapper.find('[label="Send Link"]');
    button.simulate("click")
    expect(props.formDirty.mock.calls.length).toBe(1)
  })

  it('should test initial state', () => {
    expect(mapStateToProps(props)).toBeDefined();
  });

  it('Check the onClicksendResetPasswordLink  function', () => {
    wrapper.setState({
      email: 'blah@gmail.com'
    })
    wrapper.instance().onClicksendResetPasswordLink()
  });

  it('Check the onChangeEmail  function', () => {
    let e = {
      target: {
        value: 'sadads'
      }
    }
    wrapper.instance().onChangeEmail(e)
  });

  it('Check the onClickButtonLogin  function', () => {
    wrapper.instance().onClickButtonLogin()
  });

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).sendResetPasswordLink({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).onLogin();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});