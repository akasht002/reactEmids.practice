import { combineReducers } from 'redux';
import CertificationState from './Certification/reducer';
import EducationState from './Education/reducer';
import SkillsState from './Skills/reducer';
import LanguagesState from './Languages/reducer';

export const profileState = combineReducers({
    CertificationState,
    EducationState,
    SkillsState,
    LanguagesState
});
