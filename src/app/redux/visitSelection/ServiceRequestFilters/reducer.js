import {
    ServiceRequestFiltersList
} from './actions'

const defaultState = {
    ServiceCategory: [],
    ServiceType:[],
    ServiceStatus:[]
};

const ServiceRequestFilterState = (state = defaultState, action) => {
    switch (action.type) {

        case ServiceRequestFiltersList.getServiceCategoryListSuccess:
            return {
                ...state,
                ServiceCategory: action.data
            };
        case ServiceRequestFiltersList.getServiceTypeSuccess:
            return {
                ...state,
                ServiceType: action.data
            };
        case ServiceRequestFiltersList.getServiceRequestStatusSuccess:
            return {
                ...state,
                ServiceStatus: action.data
            };

        default:
            return state;
    }
}

export default ServiceRequestFilterState;
