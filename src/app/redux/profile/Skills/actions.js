import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

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
        axios.get(baseURL + API.getSkills).then((resp) => {
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
                id: Number.parseInt(val),
                name: ""
            }
        }) : [];
        let modal = {
            serviceProviderId: serviceProviderId,
            skills: skills

        };
        dispatch(startLoading());
        axios.post(baseURL + API.addSkills + serviceProviderId + '/Skill', modal).then((resp) => {
            dispatch(getSelectedSkills());
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
        axios.get(baseURL + API.addSkills + serviceProviderId + '/Skills').then((resp) => {
            dispatch(getSelectedSkillsDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};