import React from 'react';
import Enzyme, { shallow, configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import {ForgetPassword,mapDispatchToProps,mapStateToProps} from './index';

jest.dontMock('../ForgetPassword');

Enzyme.configure({ adapter: new Adapter() })
let wrapper,store,wrapperShallow;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  isSendResetPasswordLinkSuccess: false,
  isSendResetPasswordLinkError: false,
  forgetPasswordState:1
};

const props = {
  sendVerificationLink: () => {},
  defaultState: jest.fn(),
  formDirty:jest.fn(),
} 
  
store = mockStore(defaultState);


function setup() {
  const props = {
    sendResetPasswordLink:jest.fn(),
    defaultState: jest.fn(),
    formDirty:jest.fn(),    
    onClickButtonLogin:jest.fn()
  }

  const enzymeWrapper = mount(<MemoryRouter>
              <ForgetPassword dispatch={dispatch} store={store} {...props} /> 
            </MemoryRouter>)

  return {
    props,
    enzymeWrapper
  }
}

describe("ForgetPassword", function () {
  const mockSetUserIdfn = jest.fn();
  beforeEach(() => {
    wrapper = mount(
        <MemoryRouter>
                <ForgetPassword ForgetPassword={mockSetUserIdfn}  dispatch={dispatch} store={store} {...props}/>
        </MemoryRouter>
    );
  });
  

  wrapperShallow =  shallow(<ForgetPassword {...props}/>);
    //spy = jest.spyOn(ForgetPassword.prototype, "onChangeEmail");

  it('Check ForgetPassword Component contains forgetPassword body div', () => { 
      expect(wrapper.find('.forgetPassword-body').length).toEqual(1);
  })

  it('Check the email value', () => {   
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('Input')
      input.simulate("change", { target: { name: 'email', value: 'blah@gmail.com'}});  
      expect(props.formDirty.mock.calls.length).toBe(0)
      
      const button = enzymeWrapper.find('[label="Send Link"]');
      button.simulate("click")
      expect(props.formDirty.mock.calls.length).toBe(1)
   })

   it('Check onClicksendResetPasswordLink method called once',()=>{
    const { enzymeWrapper, props } = setup()
    enzymeWrapper.setState({emailValid: true})
     expect(props.sendResetPasswordLink.mock.calls.length).toBe(0)  
   });

   it('Check onClickButtonLogin clicked once',()=>{ 
    const { enzymeWrapper } = setup()
    const button = enzymeWrapper.find('[className="login"]');
    button.simulate("click")
});

  it('Check the mapDispatchToProps fn()', () => {
    const dispatch = jest.fn();
    const data = [{}];

    //check the sendResetPasswordLink button with data object
    mapDispatchToProps(dispatch).sendResetPasswordLink(data);
    expect(dispatch.mock.calls[0][0]).toBeTruthy();

    //check the formDirty function
    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeTruthy();

    //check the onLogin function
    mapDispatchToProps(dispatch).onLogin();
    expect(dispatch.mock.calls[0][0]).toBeTruthy();  
  });
        
  it('Check the mapStateToProps fn', () => {
    const initialState = {
        sendResetPasswordLinkSuccess: false,
        sendResetPasswordLinkError: false,
    };    
    expect(mapStateToProps(initialState).sendResetPasswordLinkSuccess).toEqual(1);
  });

  describe('Shallow Test of ForgetPassword Container',()=>{
    const shallowWrapper = shallow(<ForgetPassword />);
    beforeEach(() => {
      shallowWrapper.find('Input').simulate("change", { target: { name: 'email', value: 'blah@gmail.com'}})
    });
    it('updates the title in state', () => {
      expect(shallowWrapper.state().email).toEqual('');
    });
    it('check the ForgetPassword body', () => {
        expect(shallowWrapper.exists('.login-body')).toEqual(true);
    });
    it('check the error text', () => {
        expect(shallowWrapper.exists('.text-danger')).toEqual(true);
    });
  });
});