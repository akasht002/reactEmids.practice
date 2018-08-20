import axios from 'axios';

export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";
export const authURL = "http://52.172.45.185:9005/";

export const Api = axios.create({
    baseURL: baseURL,
});

export const SETTING = {
    FILE_UPLOAD_SIZE : 2097152 
}

export const API = {
    sendEmailVerification: 'ServiceProviderOnBoarding/',
    sendTemporaryPasscode: 'ServiceProviderOnBoarding',
    verifyTemporaryPasscode: 'ServiceProviderOnBoarding/VerifyServiceProvider',
    setPassword: 'ServiceProviderOnBoarding/SetPassword',
    certification: 'ServiceProvider/',
    education: 'ServiceProvider/',
    WorkHistory:'ServiceProvider/',
    getSkills: 'ServiceProvider/Skill',
    addSkills: 'ServiceProvider/',
    getLanguages: 'ServiceProvider/Language',
    addLanguages: 'ServiceProvider/',
    SendResetPasswordLink: 'api/User/',
    getEmailIdByUserId: 'api/user/verifypasswordlink/',
    resetPassword: 'api/user',
    getPersonalDetail:'ServiceProvider/',
    updatePersonalDetail:'ServiceProvider/',
    getCity:'ServiceProviderLookUp/GetState',
    uploadImage:'ServiceProvider/Image',
    getImage:'ServiceProvider/Image/',
    getServiceOffered: 'ServiceProvider/',
    editServiceOffered: 'ServiceProvider/',
    addServiceOffered: 'ServiceProvider/',
    getServiceProviderID:'ServiceProviderOnBoarding/',
    getGender: 'ServiceProviderLookUp/gender'
}