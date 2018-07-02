import axios from 'axios';
const baseURL = "http://health.mocklab.io";

export const Api = axios.create({
    baseURL:baseURL,
});

export const API_USER = "/user/1";
export const API_LOGIN = "/user/1";