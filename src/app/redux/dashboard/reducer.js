import { combineReducers } from 'redux';
import dashboardState from './Dashboard/reducer'
import individualsListState from './EntityDashboard/Individuals/reducer'
import VisitServiceProviderState from './EntityDashboard/ServiceProvider/reducer'
import VisitServiceRequestState from './EntityDashboard/ServiceRequest/reducer'
import VisitServiceCountListState from './EntityDashboard/ServiceVisits/reducer'

export const DashboardState = combineReducers({
    dashboardState,
    individualsListState,
    VisitServiceProviderState,
    VisitServiceRequestState,
    VisitServiceCountListState
});
