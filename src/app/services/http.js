import axios from 'axios'
import { store } from '../redux/store'
import {getTimeZoneOffset} from '../utils/dateUtility';
import { Auth } from '@okta/okta-react';
import {loadData} from '../utils/storage'
import { isEmpty } from '../utils/validations'
import { createBrowserHistory } from 'history'
import { REFRESH_TOKEN } from '../constants/constants';

const history = createBrowserHistory();

export const baseURL = process.env.REACT_APP_API_URL
export const authURL = process.env.REACT_APP_AUTH_URL
export const serviceRequestURL = process.env.REACT_APP_SR_URL
export const messageURL = process.env.REACT_APP_MSG_URL
export const elasticSearchURL = process.env.REACT_APP_ES_URL;
export const thirdPartyURL = process.env.REACT_APP_TP_URL;
export const asyncURL = process.env.REACT_APP_MSG_URL;
export const careTeamURL = process.env.REACT_APP_CARETEAM_URL;
export const patientURL = process.env.REACT_APP_PATIENT_URL;
export const oktaURL = process.env.REACT_APP_OKTA_URL;
export const oktaIssuer = process.env.REACT_APP_OKTA_ISSUER;
export const oktaClientId = process.env.REACT_APP_OKTA_CLIENTID

const auth = new Auth({
    history,
    issuer: oktaIssuer,
    clientId: oktaClientId,
    redirectUri: window.location.origin + '/implicit/callback',
  });

axios.interceptors.request.use(    
    config => {
        let loc = auth.getAccessToken();
        let newToken;
        loc.then((res) => {
            newToken = loadData(res)
        })
        const token = newToken
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['offset'] = getTimeZoneOffset()
        }
        config.headers['Content-Type'] = 'application/json';
        return config;

    },
    error => {
        Promise.reject(error)
    });


axios.interceptors.response.use((response) => {
    return response
    }, function (error) {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            let loc = auth.getAccessToken();
            loc.then((res) => {
                if (res) {
                    localStorage.setItem(REFRESH_TOKEN, res);
                    getHeader(false)
                    return axios(originalRequest);
                }

            })
        }
        return Promise.reject(error);
     });


export const AuthLogin = (url, data) => {
    var bodyFormData = new FormData()
    bodyFormData.append('client_id', 'roclient')
    bodyFormData.append('client_secret', 'coreohomesecret')
    bodyFormData.append('grant_type', 'password')
    bodyFormData.append('username', data.username)
    bodyFormData.append('password', data.password)
    return axios
        .post(authURL + url, bodyFormData, {
            headers: { Authorization: 'Basic Og==' }
        })
        .then(response => {
            return response
        })
        .catch(error => handleError(error))
}

export const PatientGet = url => {
    return axios
        .get(patientURL + url, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const Post = (url, data) => {
    return axios
        .post(baseURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const Put = (url, data) => {
    return axios
        .put(baseURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const Get = (url, _baseUrl = baseURL) => {
    return axios.get(_baseUrl + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
};

export const Delete = url => {
    return axios
        .delete(baseURL + url, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const AsyncGet = (url) => {
    return axios.get(asyncURL + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
};

export const AsyncPutWithUrl = (url) => {
    return axios.put(asyncURL + url, {}, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
};

export const AsyncPost = (url, data) => {
    return axios.post(asyncURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
};

export const ServiceRequestGet = url => {
    return axios
        .get(serviceRequestURL + url, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const ServiceRequestPut = (url, data) => {
    return axios
        .put(serviceRequestURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const ServiceRequestPost = (url, data) => {
    return axios
        .post(serviceRequestURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const AuthPost = (url, data) => {
    return axios
        .post(authURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const AuthPut = (url, data) => {
    return axios
        .put(authURL + url, data)
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const AuthGet = url => {
    return axios
        .get(authURL + url, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const AuthDelete = url => {
    return axios
        .delete(authURL + url)
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const handleError = err => {
    throw err
}

export const MessageURLGet = (url, data) => {
    return axios
        .get(messageURL + url, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const getServiceProviderId = () => {
    return (
        store.getState().authState.userState.userData &&
        store.getState().authState.userState.userData.serviceProviderId
    )
}

export const elasticSearchPost = (url, data) => {
    return axios.post(elasticSearchURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}
export const getHeader = () => {
    let userState = store.getState().authState.userState;
    let token = isEmpty(localStorage.getItem(REFRESH_TOKEN)) ? userState && userState.userData && userState.userData.access_token : localStorage.getItem(REFRESH_TOKEN)
    let authHeader = token ? {
        Authorization: 'Bearer ' + token,
        offset: getTimeZoneOffset(),
        authType: 'oauth'
    } : {}
    return {
        headers: authHeader
    }
}


export const getUserInfo = () => {
    let userState = store && store.getState().authState.userState;
    return userState && userState.userData && userState.userData.userInfo;
}

export const ThirdPartyGet = url => {
    return axios
        .get(thirdPartyURL + url, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const ThirdPartyPost = (url, data) => {
    return axios
        .post(thirdPartyURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const ThirdPartyPut = (url, data) => {
    return axios
        .put(thirdPartyURL + url, data, getHeader())
        .then(resp => {
            return resp
        })
        .catch(error => {
            handleError(error)
        })
}

export const elasticSearchGet = (url) => {
    return axios.get(elasticSearchURL + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const AsyncPut = (url, data) => {
    return axios.put(messageURL + url, data, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
};

export const CareTeamGet = (url) => {
    return axios.get(careTeamURL + url, getHeader()).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
}

export const OktaGet = (url) => {
    return axios.get(oktaURL + url, {withCredentials: true}).then((resp) => {
        return resp;
    }).catch((error) => {
        handleError(error);
    })
};