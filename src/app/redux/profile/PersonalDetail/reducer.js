import { PersonalDetails } from './actions'

const defaultState = {
  personalDetail: [],
  updatePersonalDetailSuccess: false,
  cityDetail: [],
  imageData: ''
}

const PersonalDetailState = (state = defaultState, action) => {
  switch (action.type) {
    case PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS:
      return {
        ...state,
        personalDetail: action.data
      }

    case PersonalDetails.UPDATE_PERSONAL_DETAIL_SUCCESS:
      return {
        ...state,
        updatePersonalDetailSuccess: action.isSuccess
      }

    case PersonalDetails.GET_CITY_SUCCESS:
      return {
        ...state,
        cityDetail: action.data
      }

    case PersonalDetails.UPLOAD_IMG_SUCCESS:
      return {
        ...state,
        imageData: action.data
      }

    default:
      return state
  }
}

export default PersonalDetailState
