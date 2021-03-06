import { combineReducers } from 'redux';
import PerformTasksState from './PerformTasks/reducer';
import FeedbackState from './Feedback/reducer';
import SummaryState from './Summary/reducer';
import PaymentsState from './Payments/reducer';
import AssessmentState from './Assessment/reducer'
export const VisitServiceProcessingState = combineReducers({
    PerformTasksState,
    FeedbackState,
    SummaryState,
    PaymentsState,
    AssessmentState
});
