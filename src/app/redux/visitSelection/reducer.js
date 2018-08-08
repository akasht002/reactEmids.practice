import { combineReducers } from 'redux';
import VisitServiceListState from './VisitServiceList/reducer';
import VisitServiceDetailsState from './VisitServiceDetails/reducer';
export const visitSelectionState = combineReducers({
    VisitServiceListState,
    VisitServiceDetailsState
});
