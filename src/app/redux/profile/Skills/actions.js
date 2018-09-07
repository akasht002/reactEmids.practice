import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';

export const Skills = {
    getSkillsSuccess: 'get_skills_success/skills',
    getSelectedSkillsDetails: 'get_selected_skills_details/skills'
};

export const getSkillsSuccess = (data) => {
    return {
        type: Skills.getSkillsSuccess,
        data
    }
}

export const getSelectedSkillsDetails = (data) => {
    return {
        type: Skills.getSelectedSkillsDetails,
        data
    }
}

export function getSkills() {
    return (dispatch) => {
        dispatch(startLoading());
        Get(API.getSkills).then((resp) => {
            dispatch(getSkillsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addSkills(data) {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        let skills = data ? data.split(/\s*,\s*/).map((val) => {
            return {
                id: Number.parseInt(val,0),
                name: ""
            }
        }) : [];
        let modal = {
            serviceProviderId: serviceProviderId,
            skills: skills

        };
        dispatch(startLoading());
        Post(API.addSkills + serviceProviderId + '/Skill', modal).then((resp) => {
            dispatch(getSelectedSkills());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSelectedSkills() {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        Get(API.addSkills + serviceProviderId + '/Skills').then((resp) => {
            dispatch(getSelectedSkillsDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};