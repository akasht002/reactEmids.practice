//OIDC auth config for implicit mode
export const AUTH_CONFIG_IMPLICIT = {
    clientId : "js",
    authority : "http://localhost:5000",
    redirectUri : "http://localhost:3000/#/loginCallBack/#",
    reponseType : "id_token token",
    scope : "openid profile api1",
    postLogoutRedirectUri : "http://localhost:3000/",
    loadUserInfo : false
};

