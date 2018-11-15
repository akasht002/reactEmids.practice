import {
    VisitNotification
} from './actions'

const defaultState = {
    VisitNotification: [],
    dataCount: 0,
};

const VisitNotificationState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitNotification.getVisitNotificationSuccess:
            return {
                ...state,
                VisitNotification: action.data
            };
        case VisitNotification.getVisitNotificationCountSuccess:
            return {
                ...state,
                dataCount: action.data
            };
        default:
            return state;
    }
}

export default VisitNotificationState;
