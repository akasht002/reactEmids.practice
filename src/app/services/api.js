import axios from 'axios';

// export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";

export const baseURL = "http://localhost:5615/api/";

export const Api = axios.create({
    baseURL: baseURL,
});

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
    getServiceRequestList: 'ServiceRequest/ServiceRequests/',
    getServiceRequestDetails: 'ServiceRequest/ServiceRequestDetails/',
    getServiceRequestSchedule: 'VisitProcessing/ServiceRequestVisit/',

}