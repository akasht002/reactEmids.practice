import * as actions from './actions';
import { IndividualsList } from './bridge';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../../services/api';
import {
    Loading
} from '../../../loading/actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('Actions', () => {
    it('should create an action to setActiveTab', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.setActiveTab,
            data
        }
        expect(actions.setActiveTab(data)).toEqual(expectedAction)
    })

    it('should create an action to setActiveSubTab', () => {
        const data = true
        const expectedAction = {
            type: IndividualsList.setActiveSubTab,
            data
        }
        expect(actions.setActiveSubTab(data)).toEqual(expectedAction)
    })

    it('should create an action to clearStates', () => {
        const data = ''
        const expectedAction = {
            type: IndividualsList.clearState
        }
        expect(actions.clearStates(data)).toEqual(expectedAction)
    })

    it('should create an action to getIndividualsCountListSuccess', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.getIndividualsCountListSuccess,
            data
        }
        expect(actions.getIndividualsCountListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getIndividualsListSuccess', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.getIndividualsListSuccess,
            data
        }
        expect(actions.getIndividualsListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to updateLoader', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.isLoading,
            data
        }
        expect(actions.updateLoader(data)).toEqual(expectedAction)
    })

    it('should create an action to getIndividualsVisitListSuccess', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.getIndividualsVisitListSuccess,
            data
        }
        expect(actions.getIndividualsVisitListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to setPaginationRowCountSuccess', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.setPaginationRowCountSuccess,
            data
        }
        expect(actions.setPaginationRowCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getIndividualsFeedbackListSuccess', () => {
        const data = 'Finish docs'
        const expectedAction = {
            type: IndividualsList.getIndividualsFeedbackListSuccess,
            data
        }
        expect(actions.getIndividualsFeedbackListSuccess(data)).toEqual(expectedAction)
    })
})

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('getIndividualsCountListSuccess', () => {
        const data = { offset: '' }
        fetchMock.getOnce(API.getIndividualsCount, {
            body: { IndividualCount: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": "loading_start/loading" }, { "type": "loading_end/loading" }]

        const store = mockStore({ IndividualCount: '' })

        return store.dispatch(actions.getIndividualsCountList(data)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getIndividualsListSuccess', () => {
        const data = { offset: '', attributeProviders: '' }
        fetchMock.getOnce(API.getIndividualsList, {
            body: { IndividualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": Loading.loadingStart }, { "data": true, "type": "isLoading/individual" }, { "type": Loading.loadingEnd }]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getIndividualsList(data)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getIndividualsVisitListSuccess', () => {
        const data = {}
        fetchMock.getOnce(API.getIndividualsList, {
            body: { individualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": "loading_start/loading" }, { "type": "loading_end/loading" }]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getIndividualsVisitList(data)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getIndividualsVisitListSuccess', () => {
        fetchMock.getOnce(API.getIndividualsList, {
            body: { individualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": "loading_start/loading" }, { "type": "loading_end/loading" }]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getIndividualsVisitList()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getAllCohortsSuccess', () => {
        fetchMock.getOnce(API.getAllCohorts, {
            body: { individualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": "loading_start/loading" }, { "type": "loading_end/loading" }]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getAllCohorts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('getAllContractsSuccess', () => {
        fetchMock.getOnce(API.getAllContracts, {
            body: { individualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": "loading_start/loading" }, { "type": "loading_end/loading" }]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getAllContracts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getStatesSuccess', () => {
        fetchMock.getOnce(API.getAllContracts, {
            body: { individualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{ "type": "loading_start/loading" }, { "data": [{ "id": 1, "name": "Alabama" }, { "id": 2, "name": "Alaska" }, { "id": 3, "name": "Arizona" }, { "id": 4, "name": "Arkansas" }, { "id": 5, "name": "California" }, { "id": 6, "name": "Colorado" }, { "id": 7, "name": "Connecticut" }, { "id": 8, "name": "Delaware" }, { "id": 9, "name": "Florida" }, { "id": 10, "name": "Georgia" }, { "id": 11, "name": "Hawaii" }, { "id": 12, "name": "Idaho" }, { "id": 13, "name": "Illinois" }, { "id": 14, "name": "Indiana" }, { "id": 15, "name": "Iowa" }, { "id": 16, "name": "Kansas" }, { "id": 17, "name": "Kentucky" }, { "id": 18, "name": "Louisiana" }, { "id": 19, "name": "Maine" }, { "id": 20, "name": "Maryland" }, { "id": 21, "name": "Massachusetts" }, { "id": 22, "name": "Michigan" }, { "id": 23, "name": "Minnesota" }, { "id": 24, "name": "Mississippi" }, { "id": 25, "name": "Missouri" }, { "id": 26, "name": "Montana" }, { "id": 27, "name": "Nebraska" }, { "id": 28, "name": "Nevada" }, { "id": 29, "name": "New Hampshire" }, { "id": 30, "name": "New Jersey " }, { "id": 31, "name": "New Mexico" }, { "id": 32, "name": "New York" }, { "id": 0, "name": "No State" }, { "id": 33, "name": "North Carolina" }, { "id": 34, "name": "North Dakota " }, { "id": 35, "name": "Ohio" }, { "id": 36, "name": "Oklahoma" }, { "id": 37, "name": "Oregon" }, { "id": 38, "name": "Pennsylvania" }, { "id": 39, "name": "Rhode Island" }, { "id": 40, "name": "South Carolina" }, { "id": 41, "name": "South Dakota" }, { "id": 42, "name": "Tennessee" }, { "id": 43, "name": "Texas" }, { "id": 44, "name": "Utah" }, { "id": 45, "name": "Vermont" }, { "id": 46, "name": "Virginia" }, { "id": 47, "name": "Washington" }, { "id": 48, "name": "West Virginia" }, { "id": 49, "name": "Wisconsin" }, { "id": 50, "name": "Wyoming" }], "type": "get_states_success/individual" }, { "type": "loading_end/loading" }]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getStates()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getIndividualsFeedbackListSuccess', () => {
        const data = {
            patientId: 100,
            pageNumber: 1,
            pageSize: 1
        }
        fetchMock.getOnce(API.getindividualsFeedbackList, {
            body: { individualsList: 'content' },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [{"type": "startLoadingFeedbackList/individual"}, {"type": "endLoadingFeedbackList/individual"}]

        const store = mockStore({ IndividualsList: '' })

        return store.dispatch(actions.getIndividualsFeedbackList(data)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


})
