import {
    Certification
} from './actions'

const defaultState = {
    certificationList: [],
    certificationFieldDetails: [],
    addCertificationSuccess: false
};

const CertificationState = (state = defaultState, action) => {
    switch (action.type) {

        case Certification.getCertificationSuccess:
            return {
                ...state,
                certificationList: action.data
            };

        case Certification.getCertificationFieldDetails:
            return {
                ...state,
                certificationFieldDetails: action.data
            };

        case Certification.addCertificationSuccess:
            return {
                ...state,
                addCertificationSuccess: action.isSuccess
            };

        default:
            return state;
    }
}

export default CertificationState;
