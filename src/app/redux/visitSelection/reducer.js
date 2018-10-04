import { combineReducers } from 'redux';
import VisitServiceListState from './VisitServiceList/reducer';
import VisitServiceDetailsState from './VisitServiceDetails/reducer';
import { VisitServiceProcessingState } from '../visitSelection/VisitServiceProcessing/reducer';
import ServiceRequestFilterState  from '../visitSelection/ServiceRequestFilters/reducer';
export const visitSelectionState = combineReducers({
    VisitServiceListState,
    VisitServiceDetailsState,
    VisitServiceProcessingState,
    ServiceRequestFilterState
});
