import reducer from './reducer'
import {ResetPassword} from './bridge';

describe('Auth - ResetPassword reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                userId: null,
                emailId: '',
                token: '',
                patientId: null,
                resetPasswordSuccess: false,
                resetPasswordError: false,
                getEmailIdSuccess: false,
                getEmailIdError: false,
                resetPasswordStatus: false,
                resetPasswordLinkStatus: ''
            }
        )
    })
    
    it('Should handle the set_password_success/ResetPassword',()=>{
        let data = {}
        let previousData = {userId:'G'}
        expect(reducer([],{
            type: ResetPassword.resetPasswordSuccess,
            data,
            previousData:previousData
        })).toEqual({"resetPasswordError": false, "resetPasswordSuccess": true, "userId": {}})
    })

    it('Should handle the set_password_error/ResetPassword',()=>{
        let data = {}
        expect(reducer([],{
            type: ResetPassword.resetPasswordError,
            data:data
        })).toEqual({"resetPasswordError": true, "resetPasswordStatus": false, "resetPasswordSuccess": false})
    })

    it('Should handle the get_email_id_success/ResetPassword',()=>{
        let data = {
            email: 'test@test.com',
            token:"token",
            userId:'userId',
            patientId:'patientId',
            result:'result'
        }
        expect(reducer([],{
            type: ResetPassword.getEmailIdSuccess,
            data:data
        })).toEqual({"emailId": "test@test.com", "getEmailIdError": false, "getEmailIdSuccess": true, "patientId": "patientId", "resetPasswordLinkStatus": "result", "token": "token", "userId": "userId"})
    })

    it('Should handle the get_email_id_error/ResetPassword',()=>{
        let data = {}
        expect(reducer([],{
            type: ResetPassword.getEmailIdError,
            data
        })).toEqual( {"emailId": "", "getEmailIdError": true, "getEmailIdSuccess": false, "resetPasswordLinkStatus": undefined, "token": "", "userId": null})
    })

    it('Should handle the form_dirty/ResetPassword',()=>{
        let data = {}
        expect(reducer([],{
            type: ResetPassword.formDirty,
            data
        })).toEqual({ resetPasswordStatus: false } )
    })

});