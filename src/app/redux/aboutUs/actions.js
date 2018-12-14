import { ThirdPartyGet } from '../../services/http';
import { API } from '../../services/api';

export const AboutUs = {
    getAboutUsContentSuccess: 'getAboutUsContentSuccess/AboutUs',
    getBuildVersionSuccess: 'getBuildVersionSuccess/AboutUs'
};

export const getAboutUsContentSuccess = (data) => {
    return {
        type: AboutUs.getAboutUsContentSuccess,
        data
    }
}

export const getBuildVersionSuccess = (data) => {
    return {
        type: AboutUs.getBuildVersionSuccess,
        data
    }
}

export function getAboutUsContent() { 
    return (dispatch) => {
        ThirdPartyGet(API.getAboutUsContent )          
          .then(resp => {
            dispatch(getAboutUsContentSuccess(resp.data[0]));
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export function getBuildVersion() { 
    return (dispatch) => {
        ThirdPartyGet(API.getBuildVersion)          
          .then(resp => {
            dispatch(getBuildVersionSuccess(resp.data[0]));
          })
          .catch(err => {
            console.log(err);
          })
      }
}