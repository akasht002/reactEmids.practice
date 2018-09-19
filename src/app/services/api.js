import axios from 'axios';

export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";

export const baseURLServiceRequest = "http://52.172.45.185:9008/api/";
//export const baseURLServiceRequest = "http://localhost:5615/api/";

//export const baseURLServiceRequest = "http://localhost:5615/api/";
//export const authURL = "http://52.172.45.185:9005/";
export const authURL = "http://localhost:5000/";

export const messageURL = 'http://52.172.45.185:9002/api/'

export const Api = axios.create({
    baseURL: baseURL,
});

export const SETTING = {
    FILE_UPLOAD_SIZE: 2097152
}

export const API = {
    sendEmailVerification: 'ServiceProviderOnBoarding/',
    sendTemporaryPasscode: 'ServiceProviderOnBoarding',
    verifyTemporaryPasscode: 'ServiceProviderOnBoarding/VerifyServiceProvider',
    setPassword: 'ServiceProviderOnBoarding/SetPassword',
    certification: 'ServiceProvider/',
    education: 'ServiceProvider/',
    WorkHistory: 'ServiceProvider/',
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
    getPersonalDetail: 'ServiceProvider/',
    updatePersonalDetail: 'ServiceProvider/',
    getCity: 'ServiceProviderLookUp/GetState',
    uploadImage: 'ServiceProvider/Image',
    getImage: 'ServiceProvider/Image/',
    getServiceOffered: 'ServiceProvider/',
    editServiceOffered: 'ServiceProvider/',
    addServiceOffered: 'ServiceProvider/',
    getServiceProviderID: 'ServiceProviderOnBoarding/',
    getGender: 'ServiceProviderLookUp/gender',
    getSummaryDetails: 'VisitProcessing/ServiceRequestVisitSummaryDetails/',
    saveSummaryDetails: 'VisitProcessing/SubmitBillingForVisit/',
    getVisitHistoryList: 'ServiceRequest/ServiceRequests/ServiceProvider/',
    getServiceProviders: 'Patient/FavouriteServiceProvider/',
    getServiceProviderRequests: 'ServiceRequest/ServiceRequests/ServiceProvider/',
    getServiceProviderVists: 'VisitProcessing/ServiceProviderVisit/',
    getServiceRequestStatus: 'Servicerequest/LookUp/ServiceRequestStatus',
    getServiceVisitsCount: 'VisitProcessing/ServicerProvider/ServiceVisitCount/',
    getServiceVisitsHistoryById: 'ServiceRequest/VisitSummary/',
    getProfilePercentage: 'ServiceProvider/ProgressIndicator/',
    getBlackOutDays: 'ServiceProvider/',
    addBlackOutDay: 'ServiceProvider/',
    getAvailableDays: 'ServiceProvider/',
    updateAvailabilityDays: 'ServiceProvider/',
    getTimeoutMilliseconds: 'ServiceProviderLookup/AutoLogout',
    getLoginInfo: 'connect/userinfo',
    getEulaContent: 'api/user/config/EulaContent',
    updateEula: 'api/User/Eula',
    getServiceCategory: 'ServiceRequest/ServiceCategory',
    getServiceType: 'ServiceRequest/ServiceType/',
    PostSearchServiceRequest:'Search/PostSearchServiceRequest',
    getPatientServiceRequests:'ServiceRequest/ServiceProvider/',
    getServiceareaList:'ServiceProvider/',
    generateToken: 'VideoConferencing/',
    createRoomId: 'VideoConferencing',
    getLinkedParticipants: 'GetParticipants/',
    joinVideoConference: 'VideoConferencing/JoinConference/',
    leaveVideoConference: 'VideoConferencing/LeaveConference/',
    getParticipantByConferenceId:'VideoConferencing/GetParticipantByConferenceId/',
    getAllParticipants: 'VideoConferencing/GetAllParticipants/',
    addParticipants: 'VideoConferencing/AddParticipant',
    getConversationSummary: 'conversation/user/',
    getConversation: 'conversation/',
    createNewConversation: 'conversation',
    saveTitle: 'conversation/title',
    sendMessage: 'conversation/message',
    addParticipant: 'conversation/participant/add',
    removeParticipant: 'conversation/participant/remove',
    getUnreadCount: 'Conversation/Unread/User/',
    updateReadStatus: 'Conversation/UpdateRead/',
    leaveConversation: 'Conversation/leave/',
    getContext: 'Conversation/ServiceProvider/Context/',
    getParticipantsByContext: 'conversation/ParticipantByContext/',
    getDashboardMessageCount: 'Conversation/Dashboard/ConversationCount/',
    getConversationImage: 'Conversation/Message/',
    canCreateMessage: 'Conversation/CanServiceProviderCreate/',

}


