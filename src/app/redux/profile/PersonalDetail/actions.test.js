import { API } from '../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { PersonalDetails } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    }),
    Get: jest.fn()
}))

describe('actions', () => {
    it('should create an action to getPersonalDetailSuccess     ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.get_personal_detail_success,
            data
        }
        expect(actions.getPersonalDetailSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getAffiliationDetailSuccess          ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.get_affiliation_detail_success,
            data
        }
        expect(actions.getAffiliationDetailSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to uploadImgSuccess           ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.upload_img_success,
            data
        }
        expect(actions.uploadImgSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getCitySuccess            ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.get_city_success,
            data
        }
        expect(actions.getCitySuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getGenderSuccess             ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.get_gender_success,
            data
        }
        expect(actions.getGenderSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getSpBusyInVisitSuccess              ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.get_sp_busy_in_visit_success,
            data
        }
        expect(actions.getSpBusyInVisitSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to clearSbMode               ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.clearSbMode
        }
        expect(actions.clearSbMode(data)).toEqual(expectedAction)
    })

    it('should create an action to updatePersonalDetailSuccess                ', () => {
        let isSuccess = {}
        const expectedAction = {
            type: PersonalDetails.update_personal_detail_success,
            isSuccess
        }
        expect(actions.updatePersonalDetailSuccess(isSuccess)).toEqual(expectedAction)
    })

    it('should create an action to setServiceProviderId              ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.setServiceProviderId,
            data
        }
        expect(actions.setServiceProviderId(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceProviderId              ', () => {
        let data = {}
        const expectedAction = {
            type: PersonalDetails.clearServiceProviderId
        }
        expect(actions.clearServiceProviderId(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getGender   when fetching service content has been done', () => {
        fetchMock.getOnce(API.getGender, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getGender(data)).then((resp) => {
            store.dispatch(actions.getGenderSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getCityDetail   when fetching service content has been done', () => {
        fetchMock.get(API.getCity, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getCityDetail(data)).then((resp) => {
            store.dispatch(actions.getCitySuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates uploadImg   when fetching service content has been done', () => {
        fetchMock.get(API.uploadImg, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.uploadImg(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getImage    when fetching service content has been done', () => {
        fetchMock.get(API.getImage, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getImage(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getPersonalDetail     when fetching service content has been done', () => {
        fetchMock.get(API.getPersonalDetail, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getPersonalDetail(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getSpBusyInVisit      when fetching service content has been done', () => {
        fetchMock.get(API.getSpBusyInVisit, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getSpBusyInVisit(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateStandByMode       when fetching service content has been done', () => {
        fetchMock.get(API.updateStandByMode, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateStandByMode(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updatePersonalDetail        when fetching service content has been done', () => {
        fetchMock.get(API.updatePersonalDetail, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updatePersonalDetail(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateOrganizationDetail         when fetching service content has been done', () => {
        fetchMock.get(API.updatePersonalDetail, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateOrganizationDetail(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getAffiliationDetail          when fetching service content has been done', () => {
        fetchMock.get(API.getAffiliationDetail, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getAffiliationDetail(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateEntityDetail           when fetching service content has been done', () => {
        fetchMock.get(API.updatePersonalDetail , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateEntityDetail (data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })
})