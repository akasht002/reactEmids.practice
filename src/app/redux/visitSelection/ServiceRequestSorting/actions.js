import { API } from '../../../services/api';
import { elasticSearchGet,getUserInfo } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getVisitServiceListSuccess} from '../VisitServiceList/actions';

export function getSort(data) {
    return (dispatch) => {
      
        dispatch(startLoading());
        let serviceProviderId = getUserInfo().serviceProviderId;
     
         let Reqdata={
             status:0,
             fromDate:null,
             toDate:null
         }
         elasticSearchGet(API.getPatientServiceRequests+`${serviceProviderId}/${data.sortByOrder}/${data.sortByColumn}/${Reqdata.status}?fromDate=${Reqdata.fromDate}&toDate=${Reqdata.toDate}`).then((resp) => {
             dispatch(getVisitServiceListSuccess(resp.data))
             dispatch(endLoading());
         }).catch((err) => {
             dispatch(endLoading());
         })
 

    }
};