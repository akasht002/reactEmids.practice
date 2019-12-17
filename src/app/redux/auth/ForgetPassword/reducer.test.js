import reducer from './reducer';

describe("Auth - ForgotPassword reducer test case",()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                sendResetPasswordLinkSuccess: false,
                sendResetPasswordLinkError: false,
                emailId: ''
            }
        )
    })

    it('Should handle the send_verification_link_success/forgetPassword',()=>{
        const data =  {
            emailId : "test@mailinator.com"
        }
        expect(reducer([],{
            type: 'send_verification_link_success/forgetPassword',
            emailId: data.emailId
        })).toEqual({"emailId": data.emailId, "sendResetPasswordLinkError": false, "sendResetPasswordLinkSuccess": true})
    })

    it('Should handle the send_verification_link_error/forgetPassword',()=>{
        expect(reducer([],{
            type: 'send_verification_link_error/forgetPassword'
        })).toEqual({sendResetPasswordLinkSuccess: false,sendResetPasswordLinkError: true})
    })

    it('Should handle the form_dirty/forgetPassword',()=>{
        expect(reducer([],{
            type: 'form_dirty/forgetPassword',
        })).toEqual({emailId: '',sendResetPasswordLinkSuccess: false,sendResetPasswordLinkError: false})
    })
});