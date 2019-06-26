import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { ResetPassword, mapDispatchToProps, mapStateToProps } from './index.js';


jest.dontMock('../ResetPassword');

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  isLoading: true,
  url: ""
};

store = mockStore(defaultState);

const props = {
  isLoading: true,
  match: { url: "sdffffffffffg" },
  getEmailId: jest.fn(),
  formDirty: jest.fn(),
  onClickReset: jest.fn(),
  url: "",
  preventDefault: jest.fn(),
  loadingState: {
    isLoading: false
  },
  authState: {
    resetPasswordState: {
      emailId: 'aa@bb.com',
      resetPasswordSuccess: false,
      resetPasswordLinkStatus: false,
      resetPasswordStatus: false
    }
  }
}

describe("ResetPassword", function () {
  let enzymeWrapper;
  let e = {
    preventDefault() {}
  }
  beforeEach(() => {
     enzymeWrapper = shallow(
      <ResetPassword dispatch={dispatch} store={store} {...props}
        match={{ params: { uid: 1 }, path: "", url: "" }} />)
  })

  it('Check ResetPassword Component contains resetPassword body div', () => {
    enzymeWrapper.setProps({
      resetPasswordSuccess: true,
      resetPasswordStatus: true
    })
    expect(enzymeWrapper.find('[test-reset-body="test-reset-body"]').length).toEqual(1);
  })

  it('Check ResetPassword Component contains resetPassword body div', () => {
    enzymeWrapper.setProps({
      resetPasswordLinkStatus: 'Link Expired'
    })
    expect(enzymeWrapper.find('[test-reset-noBody="test-reset-noBody"]').length).toEqual(1);
  })

  it('Check the password field', () => {
    let mockFn = jest.fn();
    enzymeWrapper.instance().textChange = mockFn;
    expect(enzymeWrapper.find('[name="newPass"]').props().onBlur(''));
    expect(enzymeWrapper.find('[name="newPass"]').props().onCopy(e));
    expect(enzymeWrapper.find('[name="newPass"]').props().onPaste(e));
    expect(props.onClickReset.mock.calls.length).toBe(0)
  });

  it('Check the confirm password field', () => {
    expect(enzymeWrapper.find('[name="confirmPass"]').props().onBlur(''));
    expect(enzymeWrapper.find('[name="confirmPass"]').props().onCopy(e));
    expect(enzymeWrapper.find('[name="confirmPass"]').props().onPaste(e));
    expect(props.onClickReset.mock.calls.length).toBe(0)
  });

  it('Check the password value', () => {
    const input = enzymeWrapper.find('[name="newPass"]')
    input.simulate("change", { target: { name: 'newPass', value: 'Emids@123' } });
    expect(props.onClickReset.mock.calls.length).toBe(0)

    const button = enzymeWrapper.find('[label="Reset My Password"]');
    button.simulate("click")
  })

  it('Check the confirm password value', () => {
    const input = enzymeWrapper.find('[name="confirmPass"]')
    input.simulate("change", { target: { name: 'confirmPass', value: 'Emids@123' } });
    expect(props.onClickReset.mock.calls.length).toBe(0)

    const button = enzymeWrapper.find('[label="Reset My Password"]');
    button.simulate("click")
  })

  it('Check onClickButtonReset method called once', () => {
    enzymeWrapper.setState({ isFieldDirty: false })
    expect(props.onClickReset.mock.calls.length).toBe(0)
  });

  it('Check the onClickButtonReset  function', () => {
    enzymeWrapper.setState({
      passwordMatch: true,
      confirmPass: 'addada',
      passwordCombination: true,
      pass: 'sadff'
    })
    enzymeWrapper.instance().onClickButtonReset()
    enzymeWrapper.setState({
      passwordMatch: false,
      confirmPass: 'addada',
      passwordCombination: true,
      pass: 'sadff'
    })
    enzymeWrapper.instance().onClickButtonReset()
  });

  
  it('Check the validatePassword function', () => {
    enzymeWrapper.setState({
      pass: 'Emids@123',
      confirmPass: 'Emids@123'
    })
    enzymeWrapper.instance().validatePassword()
    enzymeWrapper.setState({
      pass: 'Emids@123',
      confirmPass: 'Emids@321'
    })
    enzymeWrapper.instance().validatePassword()
  });

  it('Check the onChangeNewPassword function', () => {
    let e = {
      target: {
        value: 'dzczc'
      }
    }
    enzymeWrapper.instance().onChangeNewPassword(e)
  });

  
  it('Check the onChangeConfirmPassword function', () => {
    let e = {
      target: {
        value: 'dzczc'
      }
    }
    enzymeWrapper.instance().onChangeConfirmPassword(e)
  });

  it('should test mapStateToProps state', () => {
    expect(mapStateToProps(props)).toBeDefined();
  });

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onClickReset({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getEmailId();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});