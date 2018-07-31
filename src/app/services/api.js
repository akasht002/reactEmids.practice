import axios from 'axios';

export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";

export const Api = axios.create({
    baseURL: baseURL,
});

export const API = {
    sendEmailVerification: 'ServiceProviderOnBoarding/',
    sendTemporaryPasscode: 'ServiceProviderOnBoarding',
    verifyTemporaryPasscode: 'ServiceProviderOnBoarding/VerifyServiceProvider',
    setPassword: 'ServiceProviderOnBoarding/SetPassword',
    certification: 'ServiceProvider/',
    getSkills: 'ServiceProvider/Skill',
    addSkills: 'ServiceProvider/',
    education: 'ServiceProvider/',
    getLanguages: 'ServiceProvider/Language',
    addLanguages: 'ServiceProvider/'
}