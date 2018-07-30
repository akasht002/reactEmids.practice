import axios from 'axios';

export const baseURL = "http://localhost:63633/api/";

export const Api = axios.create({
    baseURL: baseURL,
});

export const API = {
    sendEmailVerification: 'ServiceProviderOnBoarding/',
    sendTemporaryPasscode: 'ServiceProviderOnBoarding',
    verifyTemporaryPasscode: 'ServiceProviderOnBoarding/VerifyServiceProvider',
    setPassword: 'ServiceProviderOnBoarding/SetPassword',
    certification: 'ServiceProvider/',
    WorkHistory:'ServiceProvider/',
    education: 'ServiceProvider/',
    getLanguages: 'ServiceProvider/Language',
    addLanguages: 'ServiceProvider/'
}