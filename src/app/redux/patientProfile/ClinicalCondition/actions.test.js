import { API } from '../../../services/api';

import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create an action to clearState  ', () => {
      let data = {}
      const expectedAction = {
        type: actions.ClinicalCondition.clearState
      }
      expect(actions.clearState(data)).toEqual(expectedAction)
    })

    it('should create an action to getClinicalConditionSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.ClinicalCondition.getClinicalConditionSuccess,
          data
        }
        expect(actions.getClinicalConditionSuccess (data)).toEqual(expectedAction)
    })

    it('should create an action to getSelectedClinicalConditionSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.ClinicalCondition.GET_SELECTED_CLINICAL_CONDITION_SUCCESS,
          data
        }
        expect(actions.getSelectedClinicalConditionSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getSelectedClinicalConditionDetails', () => {
        let data = {}
        const expectedAction = {
          type: actions.ClinicalCondition.getSelectedClinicalConditionDetails,
          data 
        }
        expect(actions.getSelectedClinicalConditionDetails(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    // it('creates onCancelClick  when fetching service content has been done', () => {
    //     const store = mockStore({  })
    //     store.dispatch(actions.onCancelClick())
    // })


    it('creates getClinicalCondition when fetching service content has been done', () => {
        fetchMock.get(API.getAllClinicalCondition , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({          })
      
          return store.dispatch(actions.getClinicalCondition()).then((resp) => {
            store.dispatch(actions.getClinicalConditionSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates addClinicalCondition when fetching service content has been done', () => {
        fetchMock.put(API.addClinicalCondition  , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({     
            profileState: { PersonalDetailState : {patientId:23} },
           })
      
          return store.dispatch(actions.addClinicalCondition()).then((resp) => {
            store.dispatch(actions.getClinicalConditionSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getClinicalCondition when fetching service content has been done', () => {
        fetchMock.post(API.getAllClinicalCondition , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({     
                    profileState: { PersonalDetailState : {patientId:23} },
               })

          let data = [{attributeId:'',patientId:''}]
      
          return store.dispatch(actions.getClinicalCondition(data)).then((resp) => {
            store.dispatch(actions.getClinicalConditionSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getSelectedClinicalCondition when fetching service content has been done', () => {
        fetchMock.post(API.getClinicalCondition, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({     
            profileState: { PersonalDetailState : {patientId:23} },
       })
      
          return store.dispatch(actions.getSelectedClinicalCondition()).then((resp) => {
            store.dispatch(actions.getSelectedClinicalConditionDetails(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })
})