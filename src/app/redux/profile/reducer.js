import { combineReducers } from 'redux';
import CertificationState from './Certification/reducer';
import EducationState from './Education/reducer';
import SkillsState from './Skills/reducer';
import LanguagesState from './Languages/reducer';
import WorkHistoryState from './WorkHistory/reducer';
import PersonalDetailState from './PersonalDetail/reducer'
import serviceOfferedState from './ServiceOffered/reducer';
import AvailabilityState from './Availability/reducer';

export const profileState = combineReducers({
    CertificationState,
    EducationState,
    LanguagesState,
    WorkHistoryState,
    SkillsState,
    PersonalDetailState,
    serviceOfferedState,
    AvailabilityState
});
