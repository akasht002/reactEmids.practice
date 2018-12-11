import { PersonalDetails } from './actions'

const defaultState = {
  personalDetail: [],
  updatePersonalDetailSuccess: false,
  cityDetail: [],
  imageData: '',
  genderList:[],
  affiliationList:[],
  spBusyInVisit: null,
  sbModeClicked: false,
  serviceProviderId: null,
  isUser: true,
  serviceProviderTypeId: 0,
  isEntityServiceProvider: false,
  entityId: null
}

const PersonalDetailState = (state = defaultState, action) => {
  switch (action.type) {
    case PersonalDetails.get_personal_detail_success:
      return {
        ...state,
        personalDetail: action.data
      }

      case PersonalDetails.get_gender_success:
      return {
        ...state,
        genderList: action.data
      }

      case PersonalDetails.get_affiliation_detail_success:
      return {
        ...state,
        affiliationList: action.data
      }

    case PersonalDetails.update_personal_detail_success:
      return {
        ...state,
        updatePersonalDetailSuccess: action.isSuccess
      }

    case PersonalDetails.get_city_success:
      return {
        ...state,
        cityDetail: action.data
      }

    case PersonalDetails.upload_img_success:
      return {
        ...state,
        imageData: action.data
      }
    case PersonalDetails.get_sp_busy_in_visit_success:
      return {
          ...state,
          spBusyInVisit: action.data,
          sbModeClicked: true
      }
    case PersonalDetails.clearSbMode:
      return {
          ...state,
          sbModeClicked: false
      }
      case PersonalDetails.setServiceProviderId:
      return {
          ...state,
          serviceProviderId: action.data.userId,
          isUser: false,
          isEntityServiceProvider: action.data.isEntityServiceProvider,
          serviceProviderTypeId: action.data.serviceProviderTypeId,
          entityId: action.data.entityId
      }
      case PersonalDetails.clearServiceProviderId:
      return {
          ...state,
          serviceProviderId: null,
          isUser: true,
          isEntityServiceProvider: false,
          serviceProviderTypeId: 0,
          entityId: null
      }
    default:
      return state
  }
}

export default PersonalDetailState
