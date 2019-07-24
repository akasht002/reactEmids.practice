import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import {Dashboard,mapDispatchToProps, mapStateToProps} from './index'

jest.mock('../../utils/userUtility', () => ({
  getPatientData: () => ({
    userType: 'I'
  }),
  getUserInfo:()=>({
    serviceProviderTypeId :23
  })
}))

jest.mock('../ScreenCover/AsideScreenCover', () => ({
  AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('./serviceCalendar', () => ({
  ServiceCalendar: 'mockServiceCalendar'
}))

jest.mock('./serviceRequest', () => ({
  serviceRequest: 'mockserviceRequest'
}))

jest.mock('./MyServiceProviders', () => ({
  MyServiceProviders: 'mockMyServiceProviders'
}))

jest.mock('../../services/http', () => ({
  getUserInfo : () => ({
    isEntityServiceProvider:true
  }),
  getPatientData : () => ({
    firstName: "Name",
    lastName:'LName',
    imageData:{ image:'' },
    patientId:23
})
}))

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    userType : 0,
    isServiceVisitLoading: false,
    isServiceRequestLoading: false,
    isServiceProviderLoading: false,
    updateStandByMode: jest.fn(),
    getPersonalDetail: jest.fn(),
    getSpBusyInVisit: jest.fn(),
    clearSbMode: jest.fn(),
    getProfilePercentage: jest.fn(),
    getAboutUsContent:jest.fn(),
    getBuildVersion: jest.fn(),
    getUserInformation: jest.fn(),
    getMessageFallBackInterval: jest.fn(),
    createDataStore: jest.fn(),
    dashboardState: {
      dashboardState: {
        isServiceVisitLoading: false,
        isServiceRequestLoading: false,
        isServiceProviderLoading: false
      }
    },
    profileState:{
        PersonalDetailState: {
            personalDetail : [],
            spBusyInVisit:2,
            sbModeClicked:true
        }
    }
}

store = mockStore(defaultState)

describe('Dashboard', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <Dashboard dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the Dashboard Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).updateStandByMode();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getPersonalDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSpBusyInVisit();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearSbMode();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getProfilePercentage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAboutUsContent();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getBuildVersion();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getUserInformation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getMessageFallBackInterval();
        expect(dispatch.mock.calls[0][0]).toBeDefined();        
        mapDispatchToProps(dispatch).createDataStore();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })
  
    it('Check Dashboard Component contains ProfileHeaderWidget', () => {
      expect(shallowWrapper.find('.ProfileHeaderWidget').length).toEqual(1)
    })

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().clearInterval = true
      shallowWrapper.instance().componentWillUnmount()
   });

   it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().clearInterval = false
        shallowWrapper.instance().componentWillUnmount()
    });

   it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            profileState:{ standByMode :true },
            sbModeClicked:true,
            busyInVisit: { isServiceProviderInStandBy :true }
        }
        shallowWrapper.instance().CheckClickToggle = true
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
   }); 
   
   it('Check the componentWillReceiveProps function', () => {
    const nextProps = {
        profileState:{ standByMode :false },
        sbModeClicked:false,
        busyInVisit: { isServiceProviderInStandBy :false }
    }
    shallowWrapper.instance().CheckClickToggle = false
    shallowWrapper.instance().componentWillReceiveProps(nextProps)
  }); 

   it('Check the toggle function', () => {
    shallowWrapper.instance().toggle()
   });

   it('Check the onValueChange function', () => {
      shallowWrapper.instance().setState({
        isChecked : false
      })
      shallowWrapper.instance().onValueChange()
   });

   it('Check the onValueChange function', () => {
        shallowWrapper.instance().setState({
        isChecked : true
        })
        shallowWrapper.instance().onValueChange()
   });

   it('Check the onSuccessSpBusyInVisit function', () => {
        shallowWrapper.instance().CheckClickToggle = true
        shallowWrapper.instance().onSuccessSpBusyInVisit({isServiceProviderBusyInVisit :true})
   });

   it('Check the onSuccessSpBusyInVisit function', () => {
    shallowWrapper.instance().CheckClickToggle = true
    shallowWrapper.instance().onSuccessSpBusyInVisit({isServiceProviderBusyInVisit :false})
   });

   it('Check the onSuccessSpBusyInVisit function', () => {
    shallowWrapper.instance().CheckClickToggle = true
    shallowWrapper.instance().onSuccessSpBusyInVisit({isServiceProviderBusyInVisit :false,isServiceProviderInStandBy : true})
   });

   it('Check the standByTimer function', () => {
        shallowWrapper.instance().CheckClickToggle = true
        shallowWrapper.instance().standByTimer({serviceProviderStandByStartDateTime :'12/03/2019'})
   });

   it('Check the onClickYes function', () => {
        shallowWrapper.instance().onClickYes()
   });

   it('Check the checkEveryHourYes function', () => {
    shallowWrapper.instance().checkEveryHourYes()
   });

   it('Check the checkEveryHourNo function', () => {
       shallowWrapper.instance().clearInterval = true
       shallowWrapper.instance().checkEveryHourNo()
   });

});