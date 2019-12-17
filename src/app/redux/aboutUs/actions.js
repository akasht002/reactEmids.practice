import { ThirdPartyGet } from '../../services/http';
import { API } from '../../services/api';
import { AboutUs } from './bridge'

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
        return ThirdPartyGet(API.getAboutUsContent )          
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
        return ThirdPartyGet(API.getBuildVersion)          
          .then(resp => {
            dispatch(getBuildVersionSuccess(resp.data[0]));
          })
          .catch(err => {
            console.log(err);
          })
      }
}