import React from 'react';
import Enzyme, { shallow, configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import VisitServiceList from './index.js';


jest.dontMock('../VisitServiceList');

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
    visitServiceList:[{}],
    getVisitServiceList: jest.fn(),
  }
  const initialProps = {
    getVisitServiceList: jest.fn(),   
  };
  
  const enzymeWrapper = mount(<MemoryRouter>
                            <VisitServiceList dispatch={dispatch}  store={store} {...initialProps}/> 
                          </MemoryRouter>)

  return {
    props,
    enzymeWrapper
  }
}


beforeEach(() => {
 
}); 


describe("VisitServiceList", function () {  

  it('Check VisitServiceList Component contains ServiceRequestBoard', () => { 
    const { enzymeWrapper, props } = setup()
    expect(enzymeWrapper.find('.ServiceRequestBoard').length).toBeGreaterThan(0);
  })

  
});