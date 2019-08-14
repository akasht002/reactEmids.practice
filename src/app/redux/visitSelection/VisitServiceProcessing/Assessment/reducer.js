import { QuestionsList } from './bridge'
import { SERVICE_STATES } from '../../../../constants/constants'

const defaultState = {
    questionsList: {},
    requestDetails:{},
    isLoading: false,
    startedTime: '',
    planDetails: {},
    taskPercentage: 0
};

const AssessmentState = (state = defaultState, action) => {
    switch (action.type) {

        case QuestionsList.getQuestionsListSuccess:
            return {
                ...state,
                questionsList: action.data
            };

        case QuestionsList.saveStartedTime:
            return {
                ...state,
                startedTime: action.data
            };

        case QuestionsList.formDirtyFeedback:
            return {
                ...state,
                questionsList: {}
            };

        case QuestionsList.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case QuestionsList.endLoading:
            return {
                ...state,
                isLoading: false
            };
        
        case QuestionsList.saveTaskPercentage:
            return {
                ...state,
                taskPercentage: action.data
            };

        case QuestionsList.setServiceVisitPlanDetail:
            let visitStatus1 = SERVICE_STATES.YET_TO_START
            if (action.data.visitStatusId === 44) {
                visitStatus1 = SERVICE_STATES.IN_PROGRESS
            } else if (action.data.visitStatusId === 45) {
                visitStatus1 = SERVICE_STATES.COMPLETED
            } else if (action.data.visitStatusId === 90) {
                visitStatus1 = SERVICE_STATES.PAYMENT_PENDING
            }
            return {
                ...state,
                requestDetails: { ...action.data, visitStatus:visitStatus1 }
            };    

        case QuestionsList.getServiceRequestVisitDetialsSuccess:
            let visitStatus = SERVICE_STATES.YET_TO_START
            if (action.data.visitStatusId === 44) {
                visitStatus = SERVICE_STATES.IN_PROGRESS
            } else if (action.data.visitStatusId === 45) {
                visitStatus = SERVICE_STATES.COMPLETED
            } else if (action.data.visitStatusId === 90) {
                visitStatus = SERVICE_STATES.PAYMENT_PENDING
            }
            return {
                ...state,
                planDetails: { ...action.data, visitStatus }
            };    
        default:
            return state;
    }
}

export default AssessmentState;
