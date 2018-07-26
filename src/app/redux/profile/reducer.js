import { combineReducers } from 'redux';
import CertificationState from './Certification/reducer';
import EducationState from './Education/reducer';
import LanguagesState from './Languages/reducer';

export const profileState = combineReducers({
    CertificationState,
    EducationState,
    LanguagesState
});
