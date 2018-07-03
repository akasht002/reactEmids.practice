import axios from 'axios';
//export const baseURL = "http://health.mocklab.io";
export const baseURL = "http://localhost:5614/";

export const Api = axios.create({
    baseURL:baseURL,
});

export const API = {
    GetPlan: 'api/Patient/GetPlan',
    SearchPatient: 'api/Patient/',
    sendEmailVerification: 'api/'
}