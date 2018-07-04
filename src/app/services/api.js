import axios from 'axios';
//export const baseURL = "http://health.mocklab.io";
export const baseURL = "http://www.mocky.io/v2/";

export const Api = axios.create({
    baseURL:baseURL,
});

export const API = {
    GetPlan: 'api/Patient/GetPlan',
    SearchPatient: 'api/Patient/',
    sendEmailVerification: '5b3b98df330000fe14599d6d/'
}