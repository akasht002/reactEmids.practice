import {
    ServiceRequestFiltersList
} from './actions'

const defaultState = {
    ServiceCategory: [],
    ServiceType: [],
    ServiceStatus: [],
    ServiceAreaList: [],
    FilterDataCount: ''
};

const ServiceRequestFilterState = (state = defaultState, action) => {
    switch (action.type) {

        case ServiceRequestFiltersList.getServiceCategoryListSuccess:
            return {
                ...state,
                ServiceCategory: action.data
            };
        case ServiceRequestFiltersList.formDirty:
            return {
                ...state,
                FilterDataCount: ''
            };
        case ServiceRequestFiltersList.getFilterDataCountSuccess:
            return {
                ...state,
                FilterDataCount: action.data
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
        case ServiceRequestFiltersList.getServiceAreaSuccess:
            return {
                ...state,
                ServiceAreaList: action.data.addresses
            };
        case ServiceRequestFiltersList.clearServiceCategory:
            return {
                ...state,
                ServiceType: action.data
            };
        case ServiceRequestFiltersList.clearServiceArea:
            return {
                ...state,
                ServiceAreaList: action.data
            };
        case ServiceRequestFiltersList.clearServiceRequestStatus:
            return {
                ...state,
                ServiceStatus: action.data
            };

        default:
            return state;
    }
}

export default ServiceRequestFilterState;
