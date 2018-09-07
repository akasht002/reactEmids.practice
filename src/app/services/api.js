import axios from 'axios';

<<<<<<< HEAD
export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";

//export const baseURLServiceRequest = "http://52.172.45.185:9007/api/";
export const baseURLServiceRequest = "http://localhost:56166/api/";
=======
// export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";
>>>>>>> 6c8ce2b34322e8fd55197b234d62cf349d5f5ea2

export const baseURLServiceRequest = "http://52.172.45.185:9007/api/";
//export const baseURLServiceRequest = "http://localhost:5615/api/";
export const baseURL = "http://localhost:63633/api/";
//export const baseURLServiceRequest = "http://localhost:5615/api/";
//export const authURL = "http://52.172.45.185:9005/";
export const authURL = "http://52.172.45.185:9005/";

export const messageURL = 'http://52.172.45.185:9002/api/'

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
    SendResetPasswordLink: 'User/',
    getEmailIdByUserId: 'user/verifypasswordlink/',
    resetPassword: 'user',
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
    getConversation: 'conversation/user/',
    getUnreadCount: 'Conversation/Unread/User/',
    getServiceProviders: 'Patient/FavouriteServiceProvider/',
    getServiceProviderRequests: 'ServiceRequest/ServiceRequests/ServiceProvider/',
    getServiceProviderVists: 'VisitProcessing/ServiceProviderVisit/',
    getServiceRequestStatus:'Servicerequest/LookUp/ServiceRequestStatus',
    getServiceVisitsCount : 'VisitProcessing/ServicerProvider/ServiceVisitCount/',
    getServiceVisitsHistoryById:'ServiceRequest/VisitSummary/',
    getProfilePercentage: 'ServiceProvider/ProgressIndicator/',
    getBlackOutDays: 'ServiceProvider/',
    addBlackOutDay: 'ServiceProvider/',
    getAvailableDays: 'ServiceProvider/',
    updateAvailabilityDays: 'ServiceProvider/',

}