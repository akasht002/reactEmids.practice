import _ from 'lodash'
import { getUserInfo } from '../../../services/http'
import { getDataValueArray } from '../../../utils/validations'
export const PERSONAL_DETAIL = {
  UPDATE_PERSONAL_DETAIL: 'UPDATE_PERSONAL_DETAIL',
  UPDATE_ORGANIZATION_DETAIL: 'UPDATE_ORGANIZATION_DETAIL'
}

export const getModal = (data, action) => {
  let states = getDataValueArray(
    data.selectedState.value ? data.selectedState.value : data.selectedState,
    '-'
  )
  
  let organization = _.split(data.organization, '-')
  console.log(data.selectedState)
  console.log(states)
  switch (action) {
    case PERSONAL_DETAIL.UPDATE_PERSONAL_DETAIL:
    let gender = getDataValueArray(
      data.selectedGender.value ? data.selectedGender.value : data.selectedGender,
      '-'
    )
    return {
        serviceProviderId: localStorage.getItem('serviceProviderID')
          ? localStorage.getItem('serviceProviderID')
          : 1,
        serviceProviderTypeId: 1,
        individual: {
          firstName: data.firstName,
          middleName: 'M',
          lastName: data.lastName,
          age: data.age ? data.age : 0,
          gender: {
            genderId: gender ? gender[0] : 0,
            name: gender ? gender[1] : ''
          },
          yearOfExperience: data.yearOfExperience ? data.yearOfExperience : 0,
          affiliation: {
            affiliationId: data.organization ? organization[0] : '1'
          }
        },
        entity: {
          organization: data.organization ? organization[1] : 'AOM'
        },
        description: data.description,
        hourlyRate: data.hourlyRate ? data.hourlyRate : 0,
        addresses: [
          {
            addressId: 1,
            serviceProviderId: 1,
            addressTypeId: 2,
            streetAddress: data.streetAddress,
            city: data.city,
            state: {
              id: states[0],
              name: states[1]?states[1]:''
            },
            zipCode: data.zipCode ? data.zipCode : 0,
            isActive: true
          }
        ],
        phoneNumber: data.phoneNumber,
        isActive: true
      }
    case PERSONAL_DETAIL.UPDATE_ORGANIZATION_DETAIL:
    console.log('getUserInfo', getUserInfo());
      return {
        serviceProviderId: getUserInfo().serviceProviderId,
        serviceProviderTypeId: 2,
        individual: {
          firstName: '',
          middleName: '',
          lastName: '',
          age: '',
          gender: {
            genderId: 0,
            name: ''
          },
          yearOfExperience: data.yearOfExperience ? data.yearOfExperience : 0,
          affiliation: {
            affiliationId: data.organization ? organization[0] : 0,
            name: ''
          }
        },
        entity: {
          organization: data.organizationName ? data.organizationName : '',
          entityId: 0,
          hourlyRate: ''
        },
        description: data.description,
        hourlyRate: data.hourlyRate ? data.hourlyRate : 0,
        addresses: [
          {
            addressId: 1,
            serviceProviderId: getUserInfo().serviceProviderID,
            addressTypeId: 2,
            streetAddress: data.streetAddress,
            city: data.city,
            state: {
              id: states[0],
              name: states[1]
            },
            zipCode: data.zipCode ? data.zipCode : 0,
            isActive: true,
            rowversionId: ''
          }
        ],
        phoneNumber: data.phoneNumber,
        isActive: true,
        rowversionId: ''
      }
    default:
      return {}
  }
}
