import reducer from './reducer';
import {VerifyUserID} from './bridge';

describe("VerifyUserID reducer test case",()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                isEmailExist: false,
                isEmailNotExist: false,
                setIsAlreadyOnboarded: false,
                serviceProviderDetails: {
                    serviceProviderId: '',
                    memberId: '',
                    emailId: '',
                    fullName: '',
                    mobileNumber: '',
                    passcode: ''
                }
            }
        )
    })

    it('Should handle the onSetUserDetailsCompletion',()=>{
        const data =  {
            emailId : "test@mailinator.com"
        }
        expect(reducer([],{
            type: VerifyUserID.onSetUserDetailsCompletion,
            data
        })).toBeDefined()
    })

    it('Should handle the userEmailExist',()=>{
        expect(reducer([],{
            type: VerifyUserID.userEmailExist
        })).toBeDefined()
    })

    it('Should handle the userEmailNotExist',()=>{
        expect(reducer([],{
            type: VerifyUserID.userEmailNotExist
        })).toBeDefined()
    })

    it('Should handle the userEmailNotExist',()=>{
        expect(reducer([],{
            type: VerifyUserID.userEmailNotExist
        })).toBeDefined()
    })

    it('Should handle the cancelClick',()=>{
        expect(reducer([],{
            type: VerifyUserID.cancelClick
        })).toBeDefined()
    })

    it('Should handle the setIsAlreadyOnboarded',()=>{
        const data =  {
            isExist : true
        }
        expect(reducer([],{
            type: VerifyUserID.setIsAlreadyOnboarded,
            data
        })).toBeDefined()
    })

    it('Should handle the setUserId',()=>{
        const data =  {
            emailId : true
        }
        expect(reducer([],{
            type: VerifyUserID.setUserId,
            data
        })).toBeDefined()
    })

    it('Should handle the formDirty',()=>{       
        expect(reducer([],{
            type: VerifyUserID.formDirty
        })).toBeDefined()
    })

    it('Should handle the clearState',()=>{       
        expect(reducer([],{
            type: VerifyUserID.clearState
        })).toBeDefined()
    })

    it('Should handle the default case',()=>{
        expect(reducer(undefined,{
            type: ''
        })).toBeDefined()
    })
});