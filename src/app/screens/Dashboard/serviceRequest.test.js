import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ServiceRequest,mapDispatchToProps, mapStateToProps } from './serviceRequest'



Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    dashboardState : { 
        dashboardState : {
        conversationDetail:[],
        isServiceRequestLoading:true,
        patientServiceRequest:[{serviceRequestId:89}],
        serviceStatusLookUp:[{label :'',name:''}],                                                                                                                                                                                                                                                                        
    }
    },
    serviceStatusLookUp:[{label :'',name:''}],
    getPatientServiceRequestDetail: jest.fn(),
    getServiceStatusDetail:jest.fn(),
    getServiceRequestId: jest.fn(),
    goToServiceRequestDetailsPage: jest.fn(),
    goToPatientProfile:jest.fn(),
    setPatient:jest.fn(),
    setServiceRequestStatus: jest.fn(),
    ServiceRequestStatus: jest.fn(), 
}

describe('ServiceRequest', function () {
    let shallowWrapper;
      beforeEach(() => {      
        shallowWrapper = shallow(
          <ServiceRequest dispatch={dispatch} store={store} {...defaultState} />
      )
      })
  
      it('Check the ServiceRequest Details body', () => {
          expect(shallowWrapper).toBeDefined()
      });
  
      it('should test initial state', () => {
          const initialState = defaultState
          expect(mapStateToProps(initialState)).toBeDefined();
      }); 
  
      it('Check mapDispatchToProps', () => {
          const dispatch = jest.fn();
          mapDispatchToProps(dispatch).getPatientServiceRequestDetail();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).getServiceStatusDetail();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).getServiceRequestId();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).goToServiceRequestDetailsPage();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).goToServiceRequestDetailsPage();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).setPatient();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).setServiceRequestStatus();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).ServiceRequestStatus();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
          mapDispatchToProps(dispatch).goToPatientProfile();
      })

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {}
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    }); 

    it('Check the clickShowMore function', () => {
        shallowWrapper.instance.toggleName = 'Show more'
        shallowWrapper.instance().clickShowMore()
    }); 

    it('Check the clickShowMore function', () => {
        shallowWrapper.instance.toggleName = 'Show'
        shallowWrapper.instance().clickShowMore()
    }); 

    it('Check the optionChanged function', () => {
        shallowWrapper.instance().optionChanged({})
    }); 

    it('Check the handleClick function', () => {
        shallowWrapper.instance().handleClick(54)
    }); 

    it('Check the menuRenderer function', () => {
        shallowWrapper.instance().menuRenderer(54)
    }); 
})