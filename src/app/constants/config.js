//OIDC auth config for implicit mode
export const AUTH_CONFIG_IMPLICIT = {
    clientId : "js",
    authority :  "http://ch-oauth-api.coreoflowsandbox.com",
    redirectUri : "http://ch-oauth-api.coreoflowsandbox.com:9009/#/loginCallBack/#",
    reponseType : "id_token token",
    scope : "openid profile api1",
    postLogoutRedirectUri : "http://ch-oauth-api.coreoflowsandbox.com:9009/",
    loadUserInfo : false
};