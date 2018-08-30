import axios from 'axios';

export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";

//export const baseURLServiceRequest = "http://52.172.45.185:9007/api/";
export const baseURLServiceRequest = "http://localhost:5615/api/";

export const Api = axios.create({
    baseURL: baseURL,
});

export const SETTING = {
    FILE_UPLOAD_SIZE : 2097152 
}

export const API = {
    sendEmailVerification: 'ServiceProviderOnBoarding/',
    sendTemporaryPasscode: 'ServiceProviderOnBoarding',
    verifyTemporaryPasscode: 'ServiceProviderOnBoarding/VerifyServiceProvider',
    setPassword: 'ServiceProviderOnBoarding/SetPassword',
    certification: 'ServiceProvider/',
    education: 'ServiceProvider/',
    WorkHistory:'ServiceProvider/',
    getSkills: 'ServiceProvider/Skill',
    addSkills: 'ServiceProvider/',
    getLanguages: 'ServiceProvider/Language',
    addLanguages: 'ServiceProvider/',
    getServiceRequestList: 'ServiceRequest/ServiceRequests/ServiceProvider/',
    getServiceRequestDetails: 'ServiceRequest/ServiceRequestDetails/',
    getServiceRequestSchedule: 'VisitProcessing/ServiceRequestVisit/',
    getServiceRequestPerformTasks: 'VisitProcessing/ServiceRequestVisitDetails/',
    getQuestionsList: 'VisitProcessing/ServiceRequestVisitFeedback/49',
    savePerformedTask: 'VisitProcessing/ServiceRequestVisitUpdate/',
    saveAnswers: 'VisitProcessing/ServiceRequestVisitFeedbackResponse',
    startOrStopService: 'VisitProcessing/ServiceRequestVisit/',
    getPersonalDetail:'ServiceProvider/',
    updatePersonalDetail:'ServiceProvider/',
    getCity:'ServiceProviderLookUp/GetState',
    uploadImage:'ServiceProvider/Image',
    getImage:'ServiceProvider/Image/',
    getServiceOffered: 'ServiceProvider/',
    editServiceOffered: 'ServiceProvider/',
    addServiceOffered: 'ServiceProvider/',
    getServiceProviderID:'ServiceProviderOnBoarding/',
    getGender: 'ServiceProviderLookUp/gender',
    getSummaryDetails: 'VisitProcessing/ServiceRequestVisitSummaryDetails/',
    saveSummaryDetails: 'VisitProcessing/',
    getVisitHistoryList: 'ServiceRequest/ServiceRequests/ServiceProvider/',
}