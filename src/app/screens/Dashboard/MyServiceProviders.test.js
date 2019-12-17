import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { MyServiceProviders,mapDispatchToProps, mapStateToProps } from './MyServiceProviders'



Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    dashboardState : { 
        dashboardState : { serviceProvider: [{}] }
    },
    serviceProvider: [{image :''}],
    getServiceProviderDetail:jest.fn()
}

describe('MyServiceProviders', function () {
    let shallowWrapper;
      beforeEach(() => {      
        shallowWrapper = shallow(
          <MyServiceProviders dispatch={dispatch} store={store} {...defaultState} />
      )
      })
  
      it('Check the MyServiceProviders Details body', () => {
          expect(shallowWrapper).toBeDefined()
      });
  
      it('should test initial state', () => {
          const initialState = defaultState
          expect(mapStateToProps(initialState)).toBeDefined();
      }); 
  
      it('Check mapDispatchToProps', () => {
          const dispatch = jest.fn();
          mapDispatchToProps(dispatch).getServiceProviderDetail();
          expect(dispatch.mock.calls[0][0]).toBeDefined();          
      })

    it('Check the optionChanged function', () => {
        const nextProps = {}
        shallowWrapper.instance().optionChanged(nextProps)
    }); 
});