import axios from 'axios';

export const baseURL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";

export const baseURLServiceRequest = "http://52.172.45.185:9008/api/";
//export const baseURLServiceRequest = "http://localhost:5615/api/";

//export const baseURLServiceRequest = "http://localhost:5615/api/";
//export const authURL = "http://52.172.45.185:9005/";
export const authURL = "http://localhost:5000/";

export const messageURL = 'https://chqa-vp-ui.coreoflowsandbox.com/api/';

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
    getServiceRequestList: 'Search/SearchServiceRequestbyId/',
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
    getVisitHistoryList: 'ServiceRequest/Visits/ServiceProvider/',
    getConversation: 'conversation/',
    getUnreadCount: 'Conversation/Unread/User/',
    getServiceProviders: 'Patient/FavouriteServiceProvider/',
    getServiceProviderRequests: 'ServiceRequest/ServiceRequests/ServiceProvider/',
    getServiceProviderVists: 'VisitProcessing/ServiceProviderVisit/',
    getServiceRequestStatus: 'Servicerequest/LookUp/ServiceRequestStatus',
    getServiceVisitsCount: 'VisitProcessing/ServicerProvider/ServiceVisitCount/',
    getServiceVisitsHistoryById: 'VisitProcessing/ServiceRequestVisitSummaryDetails/',
    // getServiceVisitsHistoryById: 'ServiceRequest/VisitSummary/',
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
    PostSearchServiceRequest: 'Search/PostSearchServiceRequest',
    getPatientServiceRequests: 'ServiceRequest/ServiceProvider/',
    getAllServiceProviders: 'ServiceRequest/GetAllServiceProviders',
    getSortedVisitHistory: "VisitProcessing/Visits/ServiceProviderSorting/",
    getPaymentCardList: 'Account/GetByStripeCustomer/',
    createCharge: 'Account/Pay',
    chargeByCustomerId: 'Account/PayByCustomerId',
    getServiceareaList: 'ServiceProvider/',
    generateToken: 'VideoConferencing/',
    createRoomId: 'VideoConferencing',
    getLinkedParticipants: 'GetParticipants/',
    joinVideoConference: 'VideoConferencing/JoinConference/',
    leaveVideoConference: 'VideoConferencing/LeaveConference/',
    getParticipantByConferenceId: 'VideoConferencing/GetParticipantByConferenceId/',
    getAllParticipants: 'VideoConferencing/GetAllParticipants/',
    addParticipants: 'VideoConferencing/AddParticipant',
    endConference: 'VideoConferencing/EndConference/',
    getConversationSummary: 'conversation/user/',
    createNewConversation: 'conversation',
    saveTitle: 'conversation/title',
    sendMessage: 'conversation/message',
    addParticipant: 'conversation/participant/add',
    removeParticipant: 'conversation/participant/remove',
    updateReadStatus: 'Conversation/UpdateRead/',
    leaveConversation: 'Conversation/leave/',
    getContext: 'Conversation/ServiceProvider/Context/',
    getParticipantsByContext: 'conversation/ParticipantByContext/',
    getDashboardMessageCount: 'Conversation/Dashboard/ConversationCount/',
    getConversationImage: 'Conversation/Message/',
    canCreateMessage: 'Conversation/CanServiceProviderCreate/',
    applyServiceRequestByServiceProvider: 'ServiceRequest/ServiceRequestResponse/',
    cancelServiceRequestByServiceProvider: 'ServiceRequest/Cancel',
    getAboutUsContent: 'Common/LookupConfig/AboutUsWeb',
    getConverstionCountByUserId: 'Conversation/Count/',
    getAffiliationDetail:'ServiceProviderLookUp/Affiliation',
    updateStandByMode:'api/ServiceProvider/UpdateStandByMode/',
    getUserRoles: "User/GetUserRoles",
    getEntityServiceProviderList: 'ServiceProvider/ByEntity/',
    assignServiceVisit: 'ServiceRequest/AssignServiceVisit',
    getServiceRequestEligibilityStatus: 'BenefitProcess/CheckEligibility',
    claimsSubmission: 'BenefitProcess/ClaimsSubmission',
    captureAmount:'Account/CardCaputreAmount',
    servicerequest: 'ServiceRequest/',
    getFilteredVisitHistory: 'VisitProcessing/ServiceProviderVisit'
}


