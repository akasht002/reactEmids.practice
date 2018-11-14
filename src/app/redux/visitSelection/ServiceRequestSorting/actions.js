import { API } from '../../../services/api';
import { ServiceRequestGet,getUserInfo } from '../../../services/http';
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
         ServiceRequestGet(API.getPatientServiceRequests+`${serviceProviderId}/${data.sortByOrder}/${data.sortByColumn}/${Reqdata.status}/${data.pageNumber}/${data.PageSize}?fromDate=null&toDate=null`).then((resp) => {
             dispatch(getVisitServiceListSuccess(resp.data))
             dispatch(endLoading());
         }).catch((err) => {
             dispatch(endLoading());
         })
 

    }
};