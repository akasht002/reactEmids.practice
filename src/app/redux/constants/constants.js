export const VALID = 'Valid'


export const SERVICE_PROVIDER =  1
export const DEFAULT_SERVICE_STATUS = 30
export const DEFAULT_SERVICE_REQUIEST_STATUS = 36
export const SHOW_BTN_STATUS = [38,39]
export const MSG_SERVICE_PROVIDER = 183
export const MSG_TYPE = '/S'
export const SERVICE_PROVIDER_TYPE_ID = 1
export const PAGE_NO = 1
export const PAGE_SIZE = 2
export const SLASH = '/'
export const MORNING =  'Morning'
export const AFTERNOON =  'Afternoon'
export const EVENING =  'Evening'

export const STATUS  = 0
export const DEFAULT_SERVICE_REQUIEST_STATUS_DASHBOARD  = 0

export const Pagination = {
    pageSize: 10
};

export const RESPONSE_STATUS = {
    LINK_ACTIVE: 'Link Active',
    OK: 'OK',
    ALREADY_EXIST: 'Already Exist'
}
export const NO_STATE_ID = 0


export const SERVICE_VISIT_STATUS = [
    { id : 43,label: 'Start visit', iconImage: 'iconStartVisit' },
    { id : 44,label: 'In-progress', iconImage: 'iconVisitInProgressDashboard' },
    { id : 45,label: 'Visit Summary', iconImage: 'iconVisitSummary' },
    { id : 46,label: 'Cancelled', iconImage: 'iconCancelVisit' },
    { id : 90,label: 'Payment Pending', iconImage: 'iconPaymentPending' }
]

export const START_VISIT = 43

export const IN_PROGRESS = 44
 
export const VISIT_SUMMARY = 45

export const PAYMENT_PENDING = 90

export const SERVICE_REQUEST_STATUS = {
    all : {  
       "id":0,
       "keyValue":"All"
    },
    open: {  
       "id":35,
       "keyValue":"Open"
    },
    invited: {  
       "id":36,
       "keyValue":"Invited"
    },
    applied: {  
       "id":37,
       "keyValue":"Applied"
    },
    hired: {  
       "id":38,    
       "keyValue":"Hired"
    },
    notHired: {  
       "id":39,     
       "keyValue":"Not Hired"
    },
    indProgress:{  
       "id":40,     
       "keyValue":"InProgress"
    },
    completed: {  
       "id":41,    
       "keyValue":"Completed"
    },
    closed: {  
       "id":42,     
       "keyValue":"Closed"
    },
    cancelled: {  
       "id":47,    
       "keyValue":"Cancelled"
    },
    notInerested: {  
       "id":58,    
       "keyValue":"Not Interested"
    },
    pendingApproval:{  
       "id":106,    
       "keyValue":"Pending Approval"
    },
    declined: {  
       "id":107,     
       "keyValue":"Declined"
    }
  }

  export const SELECTED_POS_ERROR_MSG = 'Please select valid address details.';

 export const NEW_POS_ERROR_MSG = 'Please enter valid address details.'; 

 export const API_ERROR_CODE = {
    badRequest: 400
}

export const DEFAULT_PAGE_SIZE_ESP_LIST = 9

export const serviceRequestDetailsTab = {
    request: '1',
    myPlan: '2'
}