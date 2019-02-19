export const ACTIVE = "active";
export const VISITED = "visited";
export const DATE_FORMAT = "MM-DD-YYYY";
export const DATE_FORMAT_MONTH = 'DD MMM YYYY';
export const DATE_YEAR = "YYYY";
export const VISIT_SERVICE_STATUS_OPEN = "Open";
export const VISIT_SERVICE_STATUS_APPLIED = "Applied";
export const VISIT_SERVICE_STATUS_INVITED = "Invited";
export const VISIT_SERVICE_STATUS_HIRED = "Hired";
export const MORNING = "Morning";
export const AFTERNOON = "Afternoon";
export const EVENING = "Evening";
export const VISIT_SERVICE_STATUS_NOT_HIRED = "Not Hired";
export const VIEW_ALL_COUNT = 4

export const USER_LOCALSTORAGE = "CoreoSP";
export const PROFILE_SERVICE_PROVIDER_TYPE_ID = 1;
export const NOT_INTERESTED = 58
export const OPEN = 35
export const INVITED = 36
export const CANCELLED_NOT_HIRED_ARR = [47, 39, 42]
export const ORG_SERVICE_PROVIDER_TYPE_ID = 2;
export const HIRED_STATUS_ID = 38;
export const SHOW_IMAGES_SERVICE_REQUEST = [38, 40]
export const RECURRING_PATTERN = 'One Time'
export const ENTITY_USER = 2
export const MONTH_LENGTH = 12
export const MAX_MONTH_LIMIT = 9
export const IN_MAX_ARRAY = [1, 2, 3]
export const LAST_MONTH_ARRAY = [10, 11, 12]
export const START_MONTH = [0, 1, 2]
export const END_MONTH = [9, 10, 11]

export const COUNT_BASED_MONTH = { 9: 1, 10: 2, 11: 3 }
export const PAGE_NO = 1;
export const SERVICE_REQUEST_PAGE_SIZE = 15

export const RESPONSE_STATUS = {
    VALID: "Valid",
    INVALID: "Invalid",
    OTP_EXPIRED: "Otp Expired",
    OTP_MATCHED: "Otp Matched",
    OTP_NOT_MATCHED: "Otp Not Matched",
    LINK_ACTIVE: 'Link Active',
    OK: 'OK',
    ALREADY_EXIST: 'Already Exist',
    SUCCESS: 200,
    ONBOARDED: 'Onboarded',
    LINK_EXPIRED: "Link Expired"
}

export const STATUS = 0;
export const SAVEDCARDS = "1";
export const NEWCARDS = "2";
export const AUTHORIZEDCARD = "3";

export const USERTYPES = {
    PATIENT: 'I',
    GUARDIAN: 'G',
    SERVICE_PROVIDER: 'S',
    DESIGNATED_SERVICE_PROVIDER: 2,
    ENTITY_USER: 'EU',
    PATIENT_AND_GUARDIAN: "IG",
    CARETEAM: 'CT'
};

export const ImageFormats = {
    JPG: 'image/jpg',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif'
}

export const SERVICE_STATUS = {
    "CLOSED": "Closed",
    "INPROGRESS": "InProgress",
    "CANCELLED": "Cancelled",
    "COMPLETED": "Completed",
    "NOT INTERESTED": "Not Interested"
}

export const SERVICE_VISIT_STATUS = {
    COMPLETED: 'Completed',
    SCHEDULED: 'Scheduled',
    INPROGRESS: 'In Progress',
    PAYMENTPENDING: 'Payment Pending'
}


export const SCREENS = {
    PROFILE: 'Profile',
    DASHBOARD: 'Dashboard',
    SERVICE_REQUEST: 'Service_Request',
    MANAGE_CONNECTION: 'Manage_Connections',
    VISIT_PROCESSING: 'Visit_Processing',
    PAYMENT_PROCESSING: 'Payment_Processing',
    VISIT_HISTORY: 'Visit_History',
    SEARCH: 'Search',
    ASYNC_MESSAGE: 'Async_Messages',
    TELEHEALTH: 'Telehealth',
    GEO_MAP: 'Geo_Map',
    NOTIFICATIONS: 'Notifications'
}

export const PERMISSIONS = {
    CREATE: 'Create',
    READ: 'Read',
    UPDATE: 'Update',
    DELETE: 'Delete'
}

export const COMPLETED_TASK_STATUS_ID = 45
export const VISIT_STATUS_ID = 43
export const PAYMENT_PENDING_STATUS = 90
export const SERVICE_STATES = {
    YET_TO_START: "YET_TO_START",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    PAYMENT_PENDING: "PAYMENT_PENDING"
}
export const ELIBILITY_STATUS = {
    "authorizationRequired": "Coverage Copay Authorization Required",
    "amount": "Coverage Copay Authorization Amount",
    "benefitPercent": "Coverage Coinsurance Benefit Percentage",
    "coInAuthorizationRequired": "Coverage Coinsurance Authorization Required",
    "active": "Coverage Active"
}

export const Pagination = {
    pageSize: 10
};

export const DashboardConversationPagination = {
    pageNumber: 1,
    pageSize: 3
};


export const USER_TYPE = {
    SERVICE_PROVIDER_TYPE_ID: 2
}

export const SERVICE_PROVIDER_TYPES = {
    ENTITY_USER: 2
}

export const serviceTypesImage = {
    1: 'ADL Ambulation & Mobility.svg',
    2: 'ADL Bathing.svg',
    3: 'ADL Continence.svg',
    6: 'ADL Eating.svg',
    7: 'ADL Getting Dressed.svg',
    8: 'ADL Toileting.svg',
    9: 'ADL Transferring.svg',
    10: 'G&N Grocery Delivery.svg',
    11: 'G&N Meal Delivery.svg',
    12: 'HAH - Companionship & Errands.svg',
    13: 'HAH - Food Preparation.svg',
    14: 'HAH - Housekeeping.svg',
    16: 'HAH - Shopping.svg',
    17: 'HAH - Shopping.svg',
    15: 'HAH - Laundry.svg',
    18: 'Transportation - General Transportation.svg'
}

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_TIME = 200

export const SERVICE_REQUEST_STATUS = ["Open", "Invited", "Applied", "Hired", "Not Hired", "InProgress", "Closed", "Cancelled", "Completed", "Not Interested"];

export const DEFAULT_FROM_DATE = '1900-01-01';
export const DEFAULT_TO_DATE = '2100-01-01';
export const CONTACT_NOT_FOUND = 'Phone Number Not Found.'
export const PHONE_NUMBER_TEXT = 'Phone Number:'