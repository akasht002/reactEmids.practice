export const ACTIVE = "active";
export const VISITED = "visited";
//OIDC auth config for implicit mode
export const AUTH_CONFIG_IMPLICIT = {
    clientId : "js",
    authority :  "http://52.172.45.185:9005",
    redirectUri : "http://52.172.45.185:9009/#/loginCallBack/#",
    reponseType : "id_token token",
    scope : "openid profile api1",
    postLogoutRedirectUri : "http://52.172.45.185:9009/#/",
    loadUserInfo : false
};
