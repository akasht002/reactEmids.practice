import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const WorkHistory = {
    getEducationSuccess: 'get_education_success/education',
    addEducationSuccess: 'add_education_success/education',
    getEducationFieldDetails: 'get_education_field_details/education'
};