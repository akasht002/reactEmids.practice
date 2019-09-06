export const ACTIVE = "active";
export const VISITED = "visited";
export const DATE_FORMAT = "MM-DD-YYYY";
export const DATE_FORMAT_MONTH = 'DD MMM YYYY';
export const DATE_YEAR = "YYYY";
export const VISIT_SERVICE_STATUS_OPEN = "Open";
export const VISIT_SERVICE_STATUS_APPLIED = "Applied";
export const VISIT_SERVICE_STATUS_INVITED = "Invited";
export const VISIT_SERVICE_STATUS_HIRED = "Engaged";
export const MORNING = "Morning";
export const AFTERNOON = "Afternoon";
export const EVENING = "Evening";
export const VISIT_SERVICE_STATUS_NOT_HIRED = "Not Hired";
export const VIEW_ALL_COUNT = 5

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
export const LAST_MONTH_ARRAY = [13]
export const START_MONTH = [0, 1, 2]
export const END_MONTH = [9, 10, 11]

export const COUNT_BASED_MONTH = { 9: 1, 10: 2, 11: 3 }
export const PAGE_NO = 1;
export const DEFAULT_PAGE_SIZE_ESP_LIST = 9
export const SERVICE_REQUEST_PAGE_SIZE = 10


export const VISIT_TYPE = {
    assessment: 114,
    scheduled: 115
}

export const SERVICE_REQUEST = {
    hiredId: 38
}

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
    PAYMENTPENDING: 'Payment Pending',
    CANCELLED: 'Cancelled'
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
    4: 'ADL Eating.svg',
    5: 'ADL Getting Dressed.svg',
    6: 'ADL Toileting.svg',
    7: 'ADL Transferring.svg',
    8: 'HAH - Companionship & Errands.svg',
    9: 'HAH - Food Preparation.svg',
    10: 'HAH - Housekeeping.svg',
    11: 'HAH - Laundry.svg',
    12: 'HAH - Shopping.svg',
    13: 'HAH - Help at Home.svg',
    14: 'G&N Grocery Delivery.svg',
    15: 'G&N Meal Delivery.svg',
    16: 'Transportation - General Transportation.svg',
    // 17: 'HAH - Shopping.svg',
}

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_TIME = 200

export const SERVICE_REQ_STATUS = {
    OPEN: 35,
    INVITED: 36,
    APPLIED: 37,
    HIRED: 38,
    NOT_HIRED: 39,
    IN_PROGRESS: 40,
    COMPLETED: 41,
    CLOSED: 42,
    PROGRESS: 43,
    CANCELLED: 47,
    NOT_INTERESTED: 58,
    PENDING_APPROVAL: 106,
    DECLINED: 107
}

export const ERROR_MSG = {
    timeErrMessage: 'Updated time cannot be greater than Maximum adjustable time.',
    emptyErrMessage: 'Time field(s) cannot be empty.'
}
export const SERVICE_REQUEST_STATUS = ["Open", "Invited", "Applied", "Hired", "Not Hired", "InProgress", "Closed", "Cancelled", "Completed", "Not Interested"];

export const DEFAULT_FROM_DATE = '1900-01-01';
export const DEFAULT_TO_DATE = '2100-01-01';
export const CONTACT_NOT_FOUND = 'Phone Number Not Found.'
export const PHONE_NUMBER_TEXT = 'Phone Number:'

export const DEFAULT_VISIT_START_TIME = "0001-01-01T00:00:00"

export const NO_PARTICIPANTS_FOUND = 'No additional participants can be added to this conversation.';

export const NO_PARTICIPANTS_FOUND_CONFERENCE = 'No additional participants can be added to this conference.';

export const NO_RESULT_FOUND = 'No result found';

export const CONVERSATION_SUMMARY = 'conversationSummary';

export const PAYMENT_ALREADY_DONE = 'Payment Already Done';

export const DEFAULT_SEARCH_COUNT = '';

export const STANDBY_MODE_MSG = 'Please turn off the stand-by mode to start the visit.';

export const DD_FORMAT = 'DD'
export const M_FORMAT = "M"
export const MM_FORMAT = "M"
export const MMM_FORMAT = 'MMM'
export const YYYY_MM_DD_FORMAT = 'YYYY-MM-DD'
export const MMMDD_FORMAT = "MMM DD";


export const QUESTION_TYPE = {
    ChoiceBased: 'ChoiceBased',
    OpenText: 'OpenText'
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export const serviceCategoriesImage = {
    1: 'ADL_1.jpg',
    3: 'Food Delivery_1.jpg',
    2: 'Housekeeping_1.jpg',
    4: 'Transportation_1.jpg',
}

export const DATE_FORMATS = {
    monDD: "MMM DD",
    hhMinSession: "hh:mm A",
    yyyy_mm_dd: 'YYYY-MM-DD',
    mm: "MM",
    mmm: "MMM",
    yyyy: 'YYYY',
    month: 'month',
    days: 'days',
    dd: 'DD',
    timeh_mm_a: 'h:mm a',
    m_d_yy: 'M/D/YY',
    hh_mm: 'HH:mm',
    hhMinSec: "HH:mm:ss",
    hh_mm_a: 'hh:mm a',
    visitFormat:'ddd, DD MMM'
}


export const RECURRING_PATTERN_OPTIONS = {
    daily: 17,
    weekly: 18,
    monthly: 19
}

export const SCHEDULE_TYPE_OPTIONS = {
    assessment: 1,
    standard: 2
}

export const DEFAULT_CATEGORY_IMAGE = {
    ADL: 'ADL_1.jpg'
}

export const VISIT_STATUS = {
    all: {
        "id": 0,
        "keyValue": "All"
    },
    open: {
        "id": 35,
        "keyValue": "Open"
    },
    invited: {
        "id": 36,
        "keyValue": "Invited"
    },
    applied: {
        "id": 37,
        "keyValue": "Applied"
    },
    hired: {
        "id": 38,
        "keyValue": "Hired"
    },
    requested: {
        "id": 38,
        "keyValue": "Requested"
    },
    engaged: {
        "id": 38,
        "keyValue": "Engaged"
    },
    notHired: {
        "id": 39,
        "keyValue": "Not Hired"
    },
    inProgress: {
        "id": 44,
        "keyValue": "In-progress"
    },
    completed: {
        "id": 45,
        "keyValue": "Visit Summary"
    },
    closed: {
        "id": 42,
        "keyValue": "Closed"
    },
    cancelled: {
        "id": 46,
        "keyValue": "Cancelled"
    },
    notInerested: {
        "id": 58,
        "keyValue": "Not Interested"
    },
    pendingApproval: {
        "id": 106,
        "keyValue": "Pending Approval"
    },
    declined: {
        "id": 107,
        "keyValue": "Declined"
    },
    startVisit: {
        "id": 43,
        "keyValue": "Start Visit"
    },
    paymentPending: {
        "id": 90,
        "keyValue": "Payment Pending"
    }
}

export const DEFAULT_ADDRESS_ID = 1

export const LATITUDE = 0.0

export const LONGITUDE = 0.0


export const serviceRequestDetailsTab = {
    request: '1',
    myPlan: '2'
}

export const SERVICE_CATEGORY = {
    adl: {
        "id": 1,
        "keyValue": "Activities of Daily Living"
    },
    helpAtHome: {
        "id": 2,
        "keyValue": "Help at Home"
    },
    groceriesAndNutrition: {
        "id": 3,
        "keyValue": "Groceries and Nutrition"
    },
    transportation: {
        "id": 4,
        "keyValue": "Transportation"
    }
}


