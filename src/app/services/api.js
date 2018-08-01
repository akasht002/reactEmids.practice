import axios from 'axios';
import { getPersonalDetail } from '../redux/profile/PersonalDetail/actions';

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
    education: 'ServiceProvider/',
    WorkHistory:'ServiceProvider/',
    getSkills: 'ServiceProvider/Skill',
    addSkills: 'ServiceProvider/',
    getLanguages: 'ServiceProvider/Language',
    addLanguages: 'ServiceProvider/',
    getPersonalDetail:'ServiceProvider/',
    updatePersonalDetail:'ServiceProvider/',
}