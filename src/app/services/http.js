import axios from 'axios';
import { store } from '../redux/store';

export const baseURL = process.env.REACT_APP_API_URL;
export const authURL = process.env.REACT_APP_AUTH_URL;
export const serviceRequestURL = process.env.REACT_APP_SR_URL;

export const AuthLogin = (url, data)=>{
    var bodyFormData = new FormData();
    bodyFormData.append('client_id', 'roclient');
    bodyFormData.append('client_secret', 'coreohomesecret');
    bodyFormData.append('grant_type', 'password');
    bodyFormData.append('username', data.username);
    bodyFormData.append('password', data.password);
    return axios.post(authURL + url, bodyFormData, { headers: {'Authorization': 'Basic Og==' }})
    .then((response) => {
		return response;
    })
    .catch((error) => handleError(error))
}

export const Post = (url, data) => {
    return axios.post(baseURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const Put = (url, data) => {
    return axios.put(baseURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const Get = (url) => {
    return axios.get(baseURL + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const Delete = (url) => {
    return axios.delete(baseURL + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const ServiceRequestGet = (url) => {
    return axios.get(serviceRequestURL + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const ServiceRequestPut = (url, data) => {
    return axios.put(serviceRequestURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const ServiceRequestPost = (url, data) => {
    return axios.post(serviceRequestURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const AuthPost = (url, data) => {
    return axios.post(authURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const AuthPut = (url, data) => {
    return axios.put(authURL + url, data).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const AuthGet = (url) => {
    return axios.get(authURL + url).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const AuthDelete = (url) => {
    return axios.delete(authURL + url).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const handleError = (err)=>  {
    throw err;
}

export const getHeader = ()=>  {
    let userState = store.getState().authState.userState;
    let token = userState && userState.authData && userState.authData.data && userState.authData.data.user_token;
    let authHeader = token ? {
        Authorization: 'Bearer ' + token
    } : {}
    return {
        headers: authHeader
    }
}

export const SERVICE_PROVIDER_ID = store && store.getState().authState.userState && store.getState().authState.userState.userData && JSON.parse(store.getState().authState.userState.userData) && JSON.parse(store.getState().authState.userState.userData).data.serviceData.serviceProviderID;
