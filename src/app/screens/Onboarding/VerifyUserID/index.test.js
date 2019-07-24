import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { VerifyUserID, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../components', () => ({
    CoreoWizScreen: 'mockCoreoWizScreen'
}))

const mockStore = configureStore();
Enzyme.configure({ adapter: new Adapter() })
let store;
const props = {
  onClickCancel: jest.fn(),
  onClickNext: jest.fn(),
  sendVerificationLink: jest.fn(),
  setWorkflowDirty: jest.fn(),
  formDirty: jest.fn(),
  onboardingState: {
    verifyUserIDState: {
      loading: false,
      isEmailExist: false,
      isEmailNotExist: false,
      serviceProviderDetails: [],
      setIsAlreadyOnboarded: false
    }
  },
  serviceProviderDetails: {
    emailId: 'aa@bb.com'
  }
}
store = mockStore(props)

describe('VerifyUserID Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VerifyUserID {...props} store={store} />)
  })

  it('Check VerifyUserID Component contains test-verifyUserID', () => {
      wrapper.setProps({
        isEmailExist: true,
        isEmailNotExist: true,
        isAlreadyOnboarded: true
      })
    expect(wrapper.find('[test-verifyUserID="test-verifyUserID"]').length).toEqual(1);
  })

  it('Check the ModalPopup contains props', () => {
    expect(wrapper.find('.modal-sm').props().onConfirm());
    expect(wrapper.find('.modal-sm').props().onCancel());
  });

  it('Check the onChangeEmail  function', () => {
    let e= {
        target: {
            value: 'aa@bb.com'
        }
    }
    wrapper.instance().onChangeEmail(e)
    e.target.value = " "
    wrapper.instance().onChangeEmail(e)
    e.target.value = ""
    wrapper.instance().onChangeEmail(e)
  });

  it('Check the validateEmail function', () => {
    wrapper.setState({
        email: 'aa@bb.com'
    })
    wrapper.instance().validateEmail()
    wrapper.setState({
        email: 'adssada'
    })
    wrapper.instance().validateEmail()
  });

  it('Check the onClickSendVerificationLink function', () => {
    wrapper.setState({
        email: 'aa@bb.com'
    })
    wrapper.instance().onClickSendVerificationLink()
    wrapper.setState({
        email: 'adssada'
    })
    wrapper.instance().onClickSendVerificationLink()
  });

  it('Check the onClickButtonNext function', () => {
    wrapper.setProps({
        serviceProviderDetails: {
            email: 'aa@bb.com'
        }
    })
    wrapper.instance().onClickButtonNext()
  });

  it('Check the onClickButtonCancel function', () => {
    wrapper.instance().onClickButtonCancel()
  });

  it('should test initial state', () => {
    expect(mapStateToProps(props)).toBeDefined();
  });

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onClickCancel();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).onClickNext();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).sendVerificationLink();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setWorkflowDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});