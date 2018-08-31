import axios from 'axios';
import { store } from '../redux/store';

export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";
export const authURL = "http://52.172.45.185:9005/";
export const serviceRequestURL = "http://52.172.45.185:9007/api/";

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
    let authHeder = token ? {
        Authorization: 'Bearer ' + token
    } : {}
    return {
        headers: authHeder
    }
}
