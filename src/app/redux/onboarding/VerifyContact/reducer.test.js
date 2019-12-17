import reducer from './reducer';
import {VerifyContact} from './bridge';

describe("VerifyContact reducer test case",()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {"isOnboardSucess": false, "isPasscodeExpired": false, "isPasscodeMatch": false, "isPasscodeNotMatch": false, "isPasscodeSent": false, "isVerifiedPasscode": false, "loading": true, "serviceProviderDetails": {"emailId": "", "fullName": "", "memberId": "", "mobileNumber": "", "passcode": "", "serviceProviderId": "", "token": "", "userType": ""}}
        )
    })

    it('Should handle the onSetUserDetailsCompletion',()=>{
        const data =  {
            emailId : "test@mailinator.com"
        }
        expect(reducer([],{
            type: VerifyContact.onSetUserDetailsCompletion,
            data
        })).toBeDefined()
    })

    it('Should handle the loadingStart',()=>{
        expect(reducer([],{
            type: VerifyContact.loadingStart
        })).toBeDefined()
    })

    it('Should handle the loadingEnd',()=>{
        expect(reducer([],{
            type: VerifyContact.loadingEnd
        })).toBeDefined()
    })

    it('Should handle the formDirty',()=>{
        expect(reducer([],{
            type: VerifyContact.formDirty
        })).toBeDefined()
    })

    it('Should handle the cancelClick',()=>{
        expect(reducer([],{
            type: VerifyContact.cancelClick
        })).toBeDefined()
    })

    it('Should handle the clearState',()=>{
        expect(reducer([],{
            type: VerifyContact.clearState
        })).toBeDefined()
    })

    it('Should handle the passcodeSentSuccess',()=>{
        expect(reducer([],{
            type: VerifyContact.passcodeSentSuccess
        })).toBeDefined()
    })

    it('Should handle the temporaryPasscodeExpired',()=>{
        let data = {
            isExpired:''
        }
        expect(reducer([],{
            type: VerifyContact.temporaryPasscodeExpired,
            data
        })).toBeDefined()
    })

    it('Should handle the setUserId',()=>{
        let data = {
            emailId:''
        }
        expect(reducer([],{
            type: VerifyContact.setUserId,
            data
        })).toBeDefined()
    })

    it('Should handle the setPasscodeMatch',()=>{
        let data = {
            isSuccess:''
        }
        expect(reducer([],{
            type: VerifyContact.setPasscodeMatch,
            data
        })).toBeDefined()
    })

    it('Should handle the setPasscodeNotMatch',()=>{
        let data = {
            isSuccess:''
        }
        expect(reducer([],{
            type: VerifyContact.setPasscodeNotMatch,
            data
        })).toBeDefined()
    })

    it('Should handle the passcodeVerifySuccess',()=>{
        let data = {
            isVerifiedPasscode:''
        }
        expect(reducer([],{
            type: VerifyContact.passcodeVerifySuccess,
            data
        })).toBeDefined()
    })
});