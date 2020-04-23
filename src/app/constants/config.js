//OIDC auth config for implicit mode
export const AUTH_CONFIG_IMPLICIT = {
    clientId : "js",
    authority :  process.env.REACT_APP_AUTH_URL,
    redirectUri : process.env.REACT_APP_UI_URL + "loginCallBack",
    reponseType : "id_token token",
    scope : "openid profile api1",
    postLogoutRedirectUri : process.env.REACT_APP_UI_URL,
    loadUserInfo : false
};

export const PUBLIC_KEY = 
      '-----BEGIN PUBLIC KEY-----' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs6VZoO8w4s09nZrcBI9o' +
      'znr683qOdjfhA2zryRVtx1Q2SmX0y3LGZws8Oq4+3jBPXmzvckkjoQ5UvEtko70y' +
      'JH4NBolCMlpn5LH3olglGcu+UhORZbrk7dLyy5yy2FxVcziHJoMr5BkZw7MGPdkE' +
      'KYcSWkMoCY3s7K8Y2sr1Yp3mvVTHE0PC7gOTiaVMiMVx5+vlC76MdrwjLLeOJdPX' +
      'ExYkLCg/L2bwpuPDqFVHUFgqkKF7gtCeb/YvWGpVh3gd+fFHzyfn7w+7MbxqcQwQ' +
      '+BMQ6CCTZlwW3HFWJPpbxmo0iV+cmUr6N+/HYKJ5ibKpgrhUSZtY4dPj/CbDZryw' +
      'gwIDAQAB' +
      '-----END PUBLIC KEY-----';

export const STRIPE_KEY = "pk_test_n70bkOns9PqUMG4go5E77356"

export const OKTA_ISSUER = 'https://navvis.oktapreview.com/oauth2/default';

export const OKTA_CLIENTID = '0oapkgs7l7D0elBoS0h7';

export const TeleHealthSettings = {
    maxVideoCallHourInMs: 7200000,
    sessionInactiveInMs: 1800000
    // maxVideoCallHourInMs: 600000,
    // sessionInactiveInMs: 300000
}

export const SLIDER_TIME = 10000;

export const DEMO = 'false'

export const SETTING = {
    FILE_UPLOAD_SIZE: 2097152,
    CROP_DEFAULT: {
        aspect: 1,
        width: 50,
        x: 10,
        y: 10,
    },
    RESIZE_IMAGE: 150
}

export const ServiceCategorySettings ={
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1680,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: false,
              variableWidth: true,
              speed: 500,
              dots: false
            }
        },
        {
          breakpoint: 1536,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            variableWidth: true,
            speed: 500,
            dots: false
          }
      },
        {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              variableWidth: true,
              speed: 500,
              dots: false
            }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            variableWidth: true,
            speed: 500,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            variableWidth: true,
            speed: 500,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            variableWidth: true,
            speed: 500,
            dots: false
          }
        }
      ]
};

 export const  Locationsettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
}; 