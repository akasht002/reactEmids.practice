import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ServiceCalendar } from './serviceCalendar'

jest.mock('./ServiceInfo', () => ({
  ServiceCalendarList: () => ({
    userType: 'I'
  }),
  ShowIndicator: () => ({
    userType: 'I'
  })
}))

jest.mock('../../services/http', () => ({
  getUserInfo: () => ({
    isEntityServiceProvider: true
  })
}))

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
  userType: 0,
  authState: {
    userState: {
      userData: { userInfo: '2' },
      impersinated: '',

    }
  },
  dashboardState: {
    dashboardState: {
      isServiceVisitLoading: false,
      isServiceRequestLoading: false,
      isServiceProviderLoading: false,
      serviceVistCount: [{ visitDate: '2012-03-12' }],
      patientVisit: [],
      startDate: '2012-03-12',
      serviceVisitDate: '2012-03-12',
    }
  },
  isStandByModeOn: {
        isServiceProviderInStandBy: false
  },
  serviceVistCount: [{
    visitDate: '2019-05-27'
  }],
  serviceProviderList:[],
  getServiceProviderVists: jest.fn(),
  getServiceVisitCount: jest.fn(),
  getEntityServiceProviderList: jest.fn(),
  getServiceRequestId: jest.fn(),
  setPatient: jest.fn(),
  goToPatientProfile: jest.fn(),
  createNewConversation: jest.fn(),
  createVideoConference: jest.fn(),
  goToServiceRequestDetailsPage: jest.fn(),
  setESP: jest.fn(),
  goToESPProfile: jest.fn(),
  getEntityServiceProviderListSearch: jest.fn(),
  setServiceVisitDate: jest.fn(),
  saveContextData: jest.fn(),
  formDirty: jest.fn(),
  formDirtyFeedback: jest.fn(),
  formDirtyPerformTask: jest.fn(),
  getPerformTasksList: jest.fn(),
  getServiceVisitId: jest.fn(),
  getSummaryDetails: jest.fn(),
  getSavedSignature: jest.fn(),
  getVisitServiceHistoryByIdDetail: jest.fn(),
  formDirtySummaryDetails: jest.fn(),
  setEntityServiceProvider: jest.fn(),
  createDataStore: jest.fn()
}

store = mockStore(defaultState)

describe('Dashboard - Service Calendar', function () {
  let shallowWrapper;
  beforeEach(() => {
    shallowWrapper = shallow(
      <ServiceCalendar dispatch={dispatch} store={store} {...defaultState} />
    )
  })

  it('Check serviceCalendar Component contains ProfileCardBody', () => {
    expect(shallowWrapper.find('.ProfileCardBody').length).toEqual(1)
  })

  it('Check the componentDidMount function', () => {
    shallowWrapper.instance().componentDidMount()
  });

  it('Check the updateWindowDimensions function', () => {
    shallowWrapper.instance().updateWindowDimensions()
  });

  it('Check the componentWillUnmount function', () => {
    shallowWrapper.instance().componentWillUnmount()
  });

  it('Check the getYear function', () => {
    let selectMonth = '11'
    shallowWrapper.instance().getYear(selectMonth)
  });

  it('Check the MonthChange function', () => {
    let e = {
      value: '11'
    }
    shallowWrapper.instance().MonthChange(e)
  });

  it('Check the clickNextWeek function', () => {
    shallowWrapper.setState({
      width: '1290'
    })
    shallowWrapper.instance().clickNextWeek()
    shallowWrapper.setState({
      width: '1280'
    })
    shallowWrapper.instance().clickNextWeek()
  });

  it('Check the clickPrevWeek function', () => {
    shallowWrapper.setState({
      width: '1290'
    })
    shallowWrapper.instance().clickPrevWeek()
    shallowWrapper.setState({
      width: '1280'
    })
    shallowWrapper.instance().clickPrevWeek()
  });

  it('Check the todayDate function', () => {
    shallowWrapper.instance().todayDate()
  });

  it('Check the handleDayChange function', () => {
    let e = {
      target: {
        getAttribute() { }
      }
    }
    shallowWrapper.instance().handleDayChange(e)
  });

  it('Check the clickShowMore function', () => {
    shallowWrapper.instance().clickShowMore()
  });

  it('Check the optionChanged function', () => {
    shallowWrapper.instance().optionChanged({})
  });

  it('Check the SelectOnBlur function', () => {
    shallowWrapper.instance().SelectOnBlur({})
  });

  it('Check the optionClicked function', () => {
    shallowWrapper.instance().optionClicked({})
  });

  it('Check the handleClick function', () => {
    shallowWrapper.instance().handleClick(12123)
  });

  it('Check the showServiceProviderList function', () => {
    let data = {
      target: {
        value: '27-05-2019'
      }
    }
    shallowWrapper.instance().showServiceProviderList(data)
  });

  it('Check the navigateProfileHeader function', () => {
    let link = {
      Conversation: 'Conversation',
      PhoneCall: 'Phone Call',
      default: 'default'
    }
    shallowWrapper.instance().navigateProfileHeader(link.Conversation)
    shallowWrapper.instance().navigateProfileHeader(link.PhoneCall)
    shallowWrapper.instance().navigateProfileHeader(link.default)
  });

  it('Check the onClickConversation function', () => {
    let item = {
      serviceProvider: {
        serviceProviderId: 1232
      }
    }
    shallowWrapper.instance().onClickConversation(item)
    shallowWrapper.instance().onClickConversation()
  });

  it('Check the onClickVideoConference function', () => {
    let item = {
      serviceProvider: {
        serviceProviderId: 1232
      }
    }
    shallowWrapper.instance().onClickVideoConference(item)
    shallowWrapper.instance().onClickVideoConference()
  });

  it('Check the goToServiceVisits function :=> SCHEDULED_VISIT_ID', () => {
    let  data  = { visitStatusId: 43,
                   serviceRequestVisitId:34,
                   serviceRequestId:34
                  }
    shallowWrapper.instance().goToServiceVisits(data)
  });

  it('Check the goToServiceVisits function :=> IN_PROGRESS', () => {
    let  data  = { visitStatusId: 44,
                   serviceRequestVisitId:34,
                   serviceRequestId:34
                  }
    shallowWrapper.instance().goToServiceVisits(data)
  });


  it('Check the goToServiceVisits function :=> PAYMENT_PENDING', () => {
    let  data  = { visitStatusId: 45,
                   serviceRequestVisitId:34,
                   serviceRequestId:34
                  }
    shallowWrapper.instance().goToServiceVisits(data)
  });


  it('Check the goToServiceVisits function :=> VISIT_SUMMARY', () => {
    let  data  = { visitStatusId: 90,
                   serviceRequestVisitId:34,
                   serviceRequestId:34
                  }
    shallowWrapper.instance().goToServiceVisits(data)
  });

  it('Check the goToServiceVisits function :=> default', () => {
    let  data  = { visitStatusId: 0,
                   serviceRequestVisitId:34,
                   serviceRequestId:34
                  }
    shallowWrapper.instance().goToServiceVisits(data)
  });

})