import { combineReducers } from 'redux';
import dashboardState from './Dashboard/reducer'
import individualsListState from './EntityDashboard/Individuals/reducer'

export const DashboardState = combineReducers({
    dashboardState,
    individualsListState  
});
