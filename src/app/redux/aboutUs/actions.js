import { AboutUsGet } from '../../services/http';
import { API } from '../../services/api';

export const AboutUs = {
    getAboutUsContentSuccess: 'getAboutUsContentSuccess/userAgreement',
};

export const getAboutUsContentSuccess = (data) => {
    return {
        type: AboutUs.getAboutUsContentSuccess,
        data
    }
}

export function getAboutUsContent() { 
    return (dispatch, getState) => {
        AboutUsGet(API.getAboutUsContent )          
          .then(resp => {
            dispatch(getAboutUsContentSuccess(resp.data[0]));
          })
          .catch(err => {
            console.log(err);
          })
      }
}