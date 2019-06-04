import { ServiceArea } from './bridge'

const defaultState = {
  ServiceAreaList: [],
  ServiceAreaFieldDetails:{},
  addServiceAreaSuccess:false,
  posInvalidAddressErrorMessage: '',
  showModalOnPOS: false
}

const ServiceAreaState = (state = defaultState, action) => {
  switch (action.type) {
    case ServiceArea.getServiceAreaSuccess:
      return {
        ...state,
        ServiceAreaList: action.data
      }
      case ServiceArea.getServiceAreaFieldDetails:
      console.log({
        ...state,
        ServiceAreaFieldDetails: action.data
      })
        return {
          ...state,
          ServiceAreaFieldDetails: action.data
        }

      case ServiceArea.addServiceAreaSuccess:
      return {
        ...state,
        addServiceAreaSuccess: action.isSuccess,
        ServiceAreaFieldDetails: {
          street: '',
          state_id: '',
          city: '',
          zip: ''
        }
      }
      case ServiceArea.setPointOfServiceErrorMessage:
      return{
        ...state,
        posInvalidAddressErrorMessage: action.data,
        showModalOnPOS: true,
      }
    case ServiceArea.clearPOSErrorMessage:
      return{
        ...state,
        posInvalidAddressErrorMessage: '',
        showModalOnPOS: false,
      }
    default:
      return state
  }
}
export default ServiceAreaState




