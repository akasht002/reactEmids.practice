import { API } from '../../../services/api';
import { Get,getUserInfo } from '../../../services/http';
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
        Get(API.getPatientServiceRequests+`${serviceProviderId}/${data.sortByOrder}/${data.sortByColumn}/${Reqdata.status}?/${Reqdata.fromDate}/${Reqdata.toDate}`).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};