import { getDataValueArray, getValueOfArray} from '../../../utils/validations'
import { getUserInfo } from '../../../services/http'

export const ACTION_MODEL = {
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA'
}

export const getModal = (data, action) => {
  let states = data.selectedState && data.selectedState.value
  ? getDataValueArray(data.selectedState.value, '-')
  : getValueOfArray(data.selectedState, '-')
  switch (action) {
    case ACTION_MODEL.ADD_DATA:
      return {
        "addressId": data.addressId,
        "serviceProviderId": getUserInfo().serviceProviderId,
        "addressTypeId": 0,
        "streetAddress": data.street,
        "city": data.city,
        "stateId":states[0] ? parseInt(states[0],10):0 ,
        "stateName": states[1] ? states[1]:'' ,
        "zipCode": data.zip,
        "isActive": true,
        "rowversionId": [],
        "coverageArea": data.coverageArea,
        "lat": 0,
        "lon": 0,
        "addressExternalId": 0
      }
    case ACTION_MODEL.UPDATE_DATA:
      return {
        coreoHomeUserId: getUserInfo().userId,
        addressId: data.addressTypeId ? data.addressTypeId : 0,
        stateName: states[1],
        city: data.city,
        zip: data.zip ? data.zip : 0,
        street: data.street,
        coverageArea: data.coverageArea,
        isActive: true,
        addressTypeId: data.addressType,
        stateId: states ? states[0] : 0
      }
    default:
      return ''
  }
}
