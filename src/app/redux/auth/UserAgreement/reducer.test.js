import { userAgreementState } from './reducer'
import {
    UserAgreement
} from './actions'

const defaultState = {
    isEulaUpdated: false,
    eulaContent: '',
    emailId: ''
}

describe("UserAgreement Reducers", () => {

    it('Should return the initial state', () => {
        expect(userAgreementState(undefined, {})).toEqual(
            defaultState
        )
    });

    it('should handle the getUserInfoSuccess ', () => {
        expect(
            userAgreementState([], {
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
            userAgreementState([], {
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
            userAgreementState([], {
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