import { combineReducers } from 'redux';
import CertificationState from './Certification/reducer';
import EducationState from './Education/reducer';

export const profileState = combineReducers({
    CertificationState,
    EducationState
});
