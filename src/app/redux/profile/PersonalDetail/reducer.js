import { PersonalDetails } from './actions'

const defaultState = {
  personalDetail: [],
  updatePersonalDetailSuccess: false,
  cityDetail: [],
  imageData: '',
  genderList:[],
  affiliationList:[]
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

    default:
      return state
  }
}

export default PersonalDetailState
