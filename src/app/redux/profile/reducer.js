import { combineReducers } from 'redux';
import CertificationState from './Certification/reducer';
import EducationState from './Education/reducer';
import SkillsState from './Skills/reducer';
import LanguagesState from './Languages/reducer';
import WorkHistoryState from './WorkHistory/reducer';
import serviceOfferedState from './ServiceOffered/reducer';

export const profileState = combineReducers({
    CertificationState,
    EducationState,
    LanguagesState,
    WorkHistoryState,
    SkillsState,
    serviceOfferedState
});
