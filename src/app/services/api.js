import axios from 'axios';

//export const baseURL = "http://10.11.111.52:9905/api/";

export const baseURL = "http://localhost:63633/api/";

export const Api = axios.create({
    baseURL:baseURL,
});

export const API = {
    sendEmailVerification: 'ServiceProviderOnBoarding/',
    sendTemporaryPasscode: 'ServiceProviderOnBoarding',
    verifyTemporaryPasscode: 'ServiceProviderOnBoarding/VerifyServiceProvider',
    setPassword: 'ServiceProviderOnBoarding/SetPassword',
    getCertification: 'ServiceProvider/Certification/ServiceProvider/',
    addCertification: 'ServiceProvider/Certification',
    deleteCertification: 'ServiceProvider/Certification/',
    editCertification: 'ServiceProvider/Certification/Certification/',
    updateCertification: 'ServiceProvider/Certification/'
}