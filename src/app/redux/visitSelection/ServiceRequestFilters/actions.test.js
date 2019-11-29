import * as actions from './actions';
import { ServiceRequestFiltersList  } from './bridge'
import { API } from '../../../services/api'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { START_VISIT, IN_PROGRESS,VISIT_SUMMARY, PAYMENT_PENDING } from '../../constants/constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/userUtility', () => ({
    getPatientData: () => ({
        patientId: 'G'
    }),
    getUserInfo : () => ( {
        serviceProviderId :234,
        coreoHomeUserId :34
    })
}))

describe('actions', () => {
    it('should create an action to clearServiceRequestStatus', () => {
      let data = {}
      const expectedAction = {
        type: ServiceRequestFiltersList.clearServiceRequestStatus,
        data
      }
      expect(actions.clearServiceRequestStatus(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceCategory', () => {
        let data = {}
        const expectedAction = {
          type: ServiceRequestFiltersList.clearServiceCategory,
          data
        }
        expect(actions.clearServiceCategory(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceType', () => {
        let data = {}
        const expectedAction = {
          type: ServiceRequestFiltersList.clearServiceType,
          data
        }
        expect(actions.clearServiceType(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceArea', () => {
        let data = {}
        const expectedAction = {
          type: ServiceRequestFiltersList.clearServiceArea,
          data
        }
        expect(actions.clearServiceArea(data)).toEqual(expectedAction)
    })
});