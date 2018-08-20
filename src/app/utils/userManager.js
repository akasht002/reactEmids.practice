import { createUserManager } from 'redux-oidc';
import { AUTH_CONFIG_IMPLICIT } from '../constants/config';

//Implicit Mode
const userManagerConfigImplicitMode = {
  client_id: AUTH_CONFIG_IMPLICIT.clientId,  //"js",
  authority: AUTH_CONFIG_IMPLICIT.authority, //"http://10.11.111.67:5000",
  redirect_uri: AUTH_CONFIG_IMPLICIT.redirectUri, //"http://localhost:3000/#/loginCallBack/#",
  response_type: AUTH_CONFIG_IMPLICIT.reponseType, // "id_token token",
  scope: AUTH_CONFIG_IMPLICIT.scope, //"openid profile api1",
  post_logout_redirect_uri: AUTH_CONFIG_IMPLICIT.postLogoutRedirectUri, //"http://localhost:3000",
  loadUserInfo: AUTH_CONFIG_IMPLICIT.loadUserInfo //false
};

const userManager = createUserManager(userManagerConfigImplicitMode);

export default userManager;



//****************Config Sample for Auth Code Model****************************//
// const userManagerConfigAuthCode = {
//   client_id: "authorizationCodeClient2",
//   redirect_uri: "http://localhost:3000/#/loginCallBack",
//   authority: 'http://localhost:5000',
//   response_type: "code",
//   scope:"api1",
//   audience : "EmidsNavvis/resources",
//   post_logout_redirect_uri : "http://localhost:3000/",
//   grantType : 'authorization_code',
//   clientSecret : 'mysecret'
// };
//**************************************************************************//
