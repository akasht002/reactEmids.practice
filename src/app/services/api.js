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
    getServiceRequestDetails: 'ServiceRequest/GetDetailsByserviceProviderAndRequestId/',
    getServiceRequestSchedule: 'VisitProcessing/ServiceRequestVisit/',
    getServiceRequestPerformTasks: 'VisitProcessing/ServiceRequestVisitDetails/',
    getQuestionsList: 'VisitProcessing/ServiceRequestVisitFeedback/49',
    savePerformedTask: 'VisitProcessing/ServiceRequestVisitUpdate/',
    saveAnswers: 'VisitProcessing/ServiceRequestVisitFeedbackResponse',
    startOrStopService: 'VisitProcessing/ServiceRequestVisit',
    SendResetPasswordLink: 'api/User/',
    getEmailIdByUserId: 'api/user/verifypasswordlink/',
    resetPassword: 'api/user',
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
    getServiceProviderVisits: 'VisitProcessing/ServiceProviderVisit/',
    getServiceRequestStatus: 'Servicerequest/LookUp/ServiceRequestStatus',
    getServiceVisitsCount: 'VisitProcessing/ServicerProvider/ServiceVisitCount/',
    getServiceVisitsHistoryById: 'VisitProcessing/ServiceRequestVisitSummaryDetails/',
    getServicePlanVisitSummaryDetails:'servicevisit/serviceplanvisitsummarydetails/',
    // getServiceVisitsHistoryById: 'ServiceRequest/VisitSummary/',
    updateAssessmentVisitStartEndTime:'servicevisit/updatevisitstartendtime',
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
    getServiceareaList: 'ServiceProvider/GetServiceProviderServiceAreaView/',
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
    cancelServiceRequestByServiceProvider: 'ServiceRequest/CancelHiredServiceProvider',
    getAboutUsContent: 'Common/LookupConfig/AboutUsWeb',
    getConverstionCountByUserId: 'Conversation/Count/',
    getAffiliationDetail:'ServiceProviderLookUp/Affiliation',
    updateStandByMode:'ServiceProvider/UpdateStandByMode/',
    getUserRoles: "User/GetUserRoles",
    getEntityServiceProviderList:'EntityServiceProvider/',
    assignServiceVisit:'ServiceRequest/AssignServiceVisit',
    getServiceArea:'ServiceProvider/GetServiceProviderServiceAreaView/',
    addServiceArea:'ServiceProvider/ServiceProviderServiceArea',
    editServiceArea: 'ServiceProvider/GetServiceProviderServiceArea/',
    deletServiceArea:'ServiceProvider/InActiveServiceProviderServiceArea/',
    getServiceRequestEligibilityStatus: 'BenefitProcess/CheckEligibility',
    claimsSubmission: 'BenefitProcess/ClaimsSubmission',
    captureAmount:'Account/CardCaputreAmount',
    servicerequest: 'ServiceRequest/',
    getFilteredVisitHistory: 'VisitProcessing/ServiceProviderVisit',
    getConversationMessage: 'Conversation/ConversationMessage/',
    getPatientProfilePercentage: 'Patient/get-patient-progress/',
    getPatientPersonalDetail: 'Patient/',
    getPatientImage: 'Patient/Image/',
    getPatientAddress: 'Patient/',
    getPatientConnections: 'ManageConnections/',
    getPatientLanguages: 'PatientLanguage/',
    getPatientClinicalCondition: 'Patient/get-patient-clinical-conditions/',
    getSpBusyInVisit: 'ServiceProvider/IsServiceProviderBusyInVisit/',
    getHistoryListCount: 'ServiceRequest/GetServiceProviderVisitHistoryCount/',
    getRatingAndFeedback: 'VisitProcessing/get-service-request-visit-feedback-details/',
    getVisitFeedback: 'VisitProcessing/get-service-request-visit-feedback-details/',
    getServiceRequestCount: 'ServiceRequest/ServiceProvider/RequestCount/',
    getAllPatientForServiceProviders: 'ServiceRequest/GetPatientForServiceProvider/',
    getServiceRequestCountOfFilters: 'Search/NumberOfServiceRequestsFilter',
    rejectConference: 'VideoConferencing/RejectConference',
    getVisitNotification: 'ServiceProvider/GetAllNotifications/',
    getVisitNotificationCount: 'ServiceProvider/GetAllNotificationsCount/',
    getEntityUserData: 'ServiceProviderOnBoarding/',
    setPasswordEntityUser: 'ServiceProviderOnBoarding/SetEntityPassword',
    getNotificationSettings: 'NotificationSetting/get-notification-settings/',
    updateNotificationSettings: 'NotificationSetting/insert-notification-settings/',
    saveSignature: 'VisitProcessing/ServiceRequestVisit/UploadSignature',
    getSavedSignature: 'VisitProcessing/ServiceRequestVisit/GetCustomerSignature/',
    cancelInvitedServiceProvider:'ServiceRequest/CancelInvitedServiceProvider',
    cancelAppliedServiceProvider:'ServiceRequest/UpdateServiceRequestResponse/',
    cancelHiredServiceProvider:'ServiceRequest/CancelHiredServiceProvider',
    getPersonalDetailGuardian: 'CoreoHomeUser/GuardianProfile/',
    getImageGuardian: 'CoreoHomeUser/Image/',
    canInitiateConversation: 'Conversation/CanInitiate/',
    getBuildVersion: 'Common/LookupConfig/BuildVersionSP',
    visitProcessingUpdateBilledDuration:'VisitProcessing/UpdateBilledDuration',
    getUnreadConversationsByUserId: 'Conversation/GetUnreadMessages/',
    getLatestMessages: 'Conversation/GetNewPostedMessage/',
    getMessageFallBackInterval: 'Common/LookupConfig/MessageFallBackInterval',
    keywordSearchServiceRequest: 'Search/SearchServiceRequestWithQ/',
    getAssessmentQuestionsByEntityServiceProviderId:'assessment/get-assessment-visit/',
    visitProcessingAssessmentSave:'assessment/assessment-visit/assessment',
    getNewServiceRequestList: 'plan/servicerequestdetails/',
    GetServiceCategoryTypeTask: 'Common/GetServiceCategoryTypeTask',
    getPatientAddressList: 'Patient/',
    getState: 'ServiceProviderLookUp/GetState',
    getValidPatientAddress: 'ServiceRequest/Patient/PosValidation',
    createOrEditSchedule: 'plan',
    getSchedulesList: 'plan/',
    getVisitList: 'plan/visitdetails',
    getVisitListCount: 'plan/visitdetailscount',
    getVisitStatus : 'Servicerequest/LookUp/VisitStatus',
    hireServiceProvider: 'ServiceRequest/Hire',
    updateServiceVisit: 'servicevisit',
    getServiceVisitDetails: 'servicevisit/getvsitdetails/',
    assignESP: 'servicevisit/assignservicevisit',
    searchESP: 'EntityServiceProvider/',
    getEspVisitList : 'plan/GetVisitDetailsForEsp',
    getEspVisitListCount: 'plan/getvisitdetailsforespcount',
    getServiceRequestPerformTasksForEsp: 'plan/servicerequestvisitdetails/',
    startOrStopServiceForEsp: 'servicevisit/updatevisitstartendtime',
    getSummaryDetailsForEsp: 'servicevisit/serviceplanvisitsummarydetails/',
    savePerformedTaskForEsp: 'servicevisit/Serviceplantaskupdate',
    saveAnswersForEsp: 'feedback/planserviceprovidervisitfeedbackresponse',
    getSavedSignatureForEsp: 'servicevisit/servicerequestvisit/getcustomersignature/', 
    visitProcessingUpdateBilledDurationForEsp:'servicevisit/updatebilledduration',
    saveSignatureForEsp: 'servicevisit/serviceplanVisit/uploadsignature',
    saveSummaryDetailsForEsp: 'servicevisit/submitbillingforvisit',
    createOrEditAssessment:'assessment/create-assessment',
    getAssessmentByAssessmentId:'assessment/get-assessment/',
    getIndividualSchedulesDetails: 'plan/',
    getIspVisitList : 'plan/serviceprovider/filtered-servicerequestvisit',
    getIspVisitListCount: 'plan/serviceprovider/totalFiltered-servicerequestvisit-count',
    getVisitFeedbackForEntity: 'feedback/serviceprovider/feedbackdetails/',
    getIndividualsCount: 'entityuser/individual/totalcount',
    getIndividualsList: 'entityuser/individual/list',
    getVisitServiceProviderCount: 'EntityUser/ServiceProvider/totalcount',
    getVisitServiceProviderTable: 'EntityUser/ServiceProvider/List',
    getVisitServiceRequestTable: 'entityuser/servicerequest/list',
    getVisitServiceRequestCount: 'entityuser/servicerequest/totalcount',
    acceptservicerequest: 'servicerequest/acceptservicerequest',
    getVisitServiceCount: 'entityuser/servicevisit/totalcount',
    getVisitServiceTable: 'entityuser/servicevisit/list'
}