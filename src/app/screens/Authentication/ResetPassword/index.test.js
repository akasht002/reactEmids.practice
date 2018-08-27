import React from 'react';
import Enzyme, { shallow, configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { ResetPassword,mapDispatchToProps,mapStateToProps } from './index.js';


jest.dontMock('../ResetPassword');

Enzyme.configure({ adapter: new Adapter() })

let wrapper,store,wrapperShallow;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  isLoading:true,
  url:""
};

store = mockStore(defaultState);

function setup() {
  const props = {
    isLoading:true,
    match:{url:"sdffffffffffg"},
    getEmailId: jest.fn(),
    formDirty: jest.fn(),
    onClickReset:jest.fn()
  }
  const initialProps = {
    getEmailId: jest.fn(),
    formDirty: jest.fn(),
    onClickReset:jest.fn(),
    url:""
  };
  
  const enzymeWrapper = mount(<MemoryRouter>
                            <ResetPassword dispatch={dispatch}  store={store} {...initialProps} 
                            match={{params: {uid: 1},path: "", url: ""}}/> 
                          </MemoryRouter>)

  return {
    props,
    enzymeWrapper
  }
}


beforeEach(() => {
 
}); 


describe("ResetPassword", function () {  

  it('Check ResetPassword Component contains resetPassword body div', () => { 
    const { enzymeWrapper} = setup()
    expect(enzymeWrapper.find('.resetPassword-body').length).toEqual(1);
  })

  it('Check ResetPassword Component contains login body div', () => { 
    const { enzymeWrapper} = setup()
    expect(enzymeWrapper.find('.login-body').length).toEqual(1);
  })

  it('Check the password field', () => {  
    let mockFn = jest.fn(); 
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.instance().textChange = mockFn;
    expect(enzymeWrapper.find('[name="newPass"]').props().onBlur(''));
    expect(props.onClickReset.mock.calls.length).toBe(0)
  });

  it('Check the confirm password field', () => { 
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.find('[name="confirmPass"]').props().onBlur(''));
    expect(props.onClickReset.mock.calls.length).toBe(0)
  });

  it('Check the password value', () => {   
    const { enzymeWrapper, props } = setup()
    const input = enzymeWrapper.find('[name="newPass"]')
    input.simulate("change", { target: { name: 'newPass', value: 'Emids@123'}});  
    expect(props.onClickReset.mock.calls.length).toBe(0)
    
    const button = enzymeWrapper.find('[label="Reset My Password"]');
    button.simulate("click")
 })

 it('Check the confirm password value', () => {   
    const { enzymeWrapper, props } = setup()
    const input = enzymeWrapper.find('[name="confirmPass"]')
    input.simulate("change", { target: { name: 'confirmPass', value: 'Emids@123'}});  
    expect(props.onClickReset.mock.calls.length).toBe(0)
    
    const button = enzymeWrapper.find('[label="Reset My Password"]');
    button.simulate("click")
 })

 it('Check onClickButtonReset method called once',()=>{
    const { enzymeWrapper, props } = setup()
    enzymeWrapper.setState({isFieldDirty: false})
     expect(props.onClickReset.mock.calls.length).toBe(0)  
   });
});