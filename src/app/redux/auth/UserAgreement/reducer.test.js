import reducer from './reducer'
import { UserAgreement } from './bridge'

const defaultState = {
    isEulaUpdated: false,
    eulaContent: '',
    emailId: ''
}

describe("UserAgreement Reducers", () => {

    it('Should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            defaultState
        )
    });

    it('should handle the getUserInfoSuccess ', () => {
        expect(
            reducer([], {
                type: UserAgreement.getUserInfoSuccess,
                isEulaUpdated: false,
                eulaContent: '',
                emailId: ''
            })
        ).toEqual(
            {
                isEulaUpdated: true,
                emailId: 'simon@emids.com'
            }
        )
    });

    it('should handle the getEulaContentSuccess ', () => {
        expect(
            reducer([], {
                type: UserAgreement.getEulaContentSuccess,
                isEulaUpdated: false,
                eulaContent: '',
                emailId: ''
            })
        ).toEqual(
            {
                eulaContent: 'please click on ok to proceed'
            }
        )
    });

    it('should handle the updateEulaSuccess ', () => {
        expect(
            reducer([], {
                type: UserAgreement.updateEulaSuccess,
                isEulaUpdated: false,
                eulaContent: '',
                emailId: ''
            })
        ).toEqual(
            {
                isEulaUpdated: false
            }
        )
    });
});