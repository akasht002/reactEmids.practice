import { API } from '../../../../services/api'

import { endLoading } from '../../../loading/actions';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { VisitServiceProviderList } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/dateUtility', () => ({
  getTimeZoneOffset: () => ({

  })
}))



describe('actions', () => {
  it('should create an action to setActiveSubTab', () => {
    let data = {}
    const expectedAction = {
      type: VisitServiceProviderList.setActiveSubTab,
      data
    }
    expect(actions.setActiveSubTab(data)).toEqual(expectedAction)
  })

  it('should create an action to setActiveSubTab', () => {
    let data = {}
    const expectedAction = {
      type: VisitServiceProviderList.setActiveSubTab,
      data
    }
    expect(actions.setActiveSubTab(data)).toEqual(expectedAction)
  })


  it('should create an action to getServiceProviderCountListSuccess', () => {
    let data = {}
    const expectedAction = {
      type: VisitServiceProviderList.getVisitsServiceProviderCountListSuccess,
      data
    }
    expect(actions.getServiceProviderCountListSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to getServiceProviderTableListSuccess', () => {
    let data = {}
    const expectedAction = {
      type: VisitServiceProviderList.getVisitsServiceProviderTableListSuccess,
      data
    }
    expect(actions.getServiceProviderTableListSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to setPaginationRowCountSuccess', () => {
    let data = {}
    const expectedAction = {
      type: VisitServiceProviderList.setPaginationRowCountSuccess,
      data
    }
    expect(actions.setPaginationRowCountSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to getGeologicalPositionSuccess', () => {
    let data = {}
    const expectedAction = {
      type: VisitServiceProviderList.getGeologicalPositionSuccess,
      data
    }
    expect(actions.getGeologicalPositionSuccess(data)).toEqual(expectedAction)
  })


});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates getVisitServiceProviderTableList when fetching service content has been done', () => {
    fetchMock.get(API.getVisitServiceProviderTable, {
      body: { data: [] },
      headers: { 'content-type': 'application/json' },
      resp: { data: [{ name: '' }] }
    })
    const store = mockStore({})

    let data = {
      serviceCategoryIds: 0,
      allTypeIds: [],
      minHourlyRate: 23,
      maxHourlyRate: 3,
      skills: '',
      genderId: '',
      minExperience: 2,
      maxExperience: 2,
      StateName: { label: '' },
      ratings: '',
      agencies: '',
      tabFilter: '',
      pageNumber: ''
    }

    return store.dispatch(actions.getVisitServiceProviderTableList(data)).then((resp) => {
      store.dispatch(actions.getServiceProviderTableListSuccess(resp.data))
      expect(store.getActions()).toBeDefined()
    }).catch(err => {
      store.dispatch(endLoading())
    })
  })

  it('creates getPointofServicedata when fetching service content has been done', () => {
    fetchMock.post(API.getGeologicalPosition, {
      body: { data: [] },
      headers: { 'content-type': 'application/json' },
      resp: { data: [{ name: '' }] }
    })
    const store = mockStore({})

    let data = {
      StateName: { label: '' },
      City: '',
      Zip: '',
      StreetName: ''
    }

    return store.dispatch(actions.getPointofServicedata(data)).then((resp) => {
      store.dispatch(actions.getGeologicalPositionSuccess(resp.data))
      expect(store.getActions()).toBeDefined()
    }).catch(err => {
      store.dispatch(endLoading())
    })
  })

  it('creates getVisitServiceProviderCountList when fetching service content has been done', () => {
    fetchMock.get(API.getVisitServiceProviderCount, {
      body: { data: [] },
      headers: { 'content-type': 'application/json' },
      resp: { data: [{ name: '' }] }
    })
    const store = mockStore({})

    let data = {
      fromDate: '',
      toDate: '',
      careTeamId: 3,

    }

    return store.dispatch(actions.getVisitServiceProviderCountList(data)).then((resp) => {
      store.dispatch(actions.getServiceProviderCountListSuccess(resp.data))
      expect(store.getActions()).toBeDefined()
    }).catch(err => {
      store.dispatch(endLoading())
    })
  })

  it('creates getFeedbackAlertDetails when fetching service content has been done', () => {
    fetchMock.get(API.getVisitServiceProviderCount, {
      body: { data: {} },
      headers: { 'content-type': 'application/json' },
      resp: { data: { name: '' } }
    })
    const store = mockStore({})

    let data = [{
        pageCount: 22,
        serviceCategory: "Help at Home",
        serviceRequestId: 845,
        serviceRequestVisitId: 3023,
        serviceTypeDescription: null,
        serviceTypeId: 0,
        serviceTypes: ["Companionship and Errands"],
        visitDate: "4/28/2019 12:00:00 AM"
      }]

    return store.dispatch(actions.getFeedbackAlertDetails(data)).then((resp) => {
      store.dispatch(actions.getFeedbackAlertDetails(resp.data))
      expect(store.getActions()).toBeDefined()
    }).catch(err => {
      store.dispatch(endLoading())
    })
  })

});