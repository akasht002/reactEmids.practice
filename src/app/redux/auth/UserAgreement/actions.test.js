import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//  import moxios from 'moxios';
import moxios from 'moxios';
import expect from 'expect'
import UserAgreement from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({})

describe("Test user agreement actions", () => {
    it('should create an action to get user information', () => {
        const data = {};
        const expectedAction = [{
            type: UserAgreement.getUserInfoSuccess,
            data
        }    
    ]
        expect(UserAgreement.getUserInfoSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to get eula content', () => {
        const data = {};
        const expectedAction = [{
            type: UserAgreement.getEulaContentSuccess,
            data
        }    
    ]
        expect(UserAgreement.getEulaContentSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to update eula', () => {
        const data = {};
        const expectedAction = [{
            type: UserAgreement.updateEulaSuccess,
            data
        }    
    ]
        expect(UserAgreement.updateEulaSuccess(data)).toEqual(expectedAction)
    })
});
