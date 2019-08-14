import { QuestionsList } from './bridge'
import { getVisitStatus } from '../../../../utils/userUtility'

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
            return {
                ...state,
                requestDetails: { ...action.data, visitStatus: getVisitStatus(action.data.visitStatusId) }
            };    

        case QuestionsList.getServiceRequestVisitDetialsSuccess:          
            return {
                ...state,
                planDetails: { ...action.data, visitStatus: getVisitStatus(action.data.visitStatusId) }
            };    
        default:
            return state;
    }
}

export default AssessmentState;
