import reducer from './reducer';
import {SetPassword} from './bridge';

describe("SetPassword reducer test case",()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                serviceProviderDetails: {
                    serviceProviderId: '',
                    memberId: '',
                    emailId: '',
                    fullName: '',
                    mobileNumber: '',
                    passcode: '',
                    token: '',
                    userType: ''
                }
            }
        )
    })

    it('Should handle the onSetUserDetailsCompletion',()=>{
        const data =  {
            emailId : "test@mailinator.com"
        }
        expect(reducer([],{
            type: SetPassword.onSetUserDetailsCompletion,
            data
        })).toBeDefined()
    })

    it('Should handle the cancelClick',()=>{
        expect(reducer([],{
            type: SetPassword.cancelClick
        })).toBeDefined()
    })

    it('Should handle the clearState',()=>{
        expect(reducer([],{
            type: SetPassword.clearState
        })).toBeDefined()
    })

    it('Should handle the clearOnboardingState',()=>{
        expect(reducer([],{
            type: SetPassword.clearOnboardingState
        })).toBeDefined()
    })

    it('Should handle the default case',()=>{
        expect(reducer(undefined,{
            type: ''
        })).toBeDefined()
    })
});