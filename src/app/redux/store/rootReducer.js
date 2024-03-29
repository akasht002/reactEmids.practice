import { combineReducers } from 'redux';
import deviceInfo from '../device/reducer';
import navigationState from '../navigation/reducer'
import { onboardingState } from '../onboarding/reducer';
import { profileState } from '../profile/reducer';
import { visitSelectionState } from '../visitSelection/reducer';
import { authState } from '../auth/reducer';
import loadingState from '../loading/reducer';
import wizardState from '../wizard/reducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';
import authUser from '../auth/login/reducer'
import { visitHistoryState } from '../visitHistory/reducer'
import { DashboardState } from '../dashboard/reducer';
import asyncMessageState from '../asyncMessages/reducer';
import telehealthState from '../telehealth/reducer';
import aboutUsState from '../aboutUs/reducer';
import patientProfileState from '../patientProfile/reducer';
import {visitNotificationState} from '../visitProcessingNotification/reducer';
import scheduleState from '../schedule/reducer';
import ClinicalConditionState from '../patientProfile/ClinicalCondition/reducer'

export default combineReducers({
    authState,
    form: reduxFormReducer,
    navigationState,
    deviceInfo,
    onboardingState,
    profileState,
    visitSelectionState,
    wizardState,
    loadingState,
    oidc: oidcReducer,
    authUser,
    visitHistoryState,
    dashboardState:DashboardState,
    telehealthState,
    asyncMessageState,
    aboutUsState,
    patientProfileState,
    visitNotificationState,
    scheduleState,
    patientClinicalConditionState : ClinicalConditionState,
});