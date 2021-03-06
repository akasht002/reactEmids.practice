import _ from 'lodash'
import { getUserInfo } from '../../../services/http'
import { getDataValueArray, getValueOfArray } from '../../../utils/validations'
import { removeHyphenInPhoneNumber } from '../../../utils/formatName'
import {
  PROFILE_SERVICE_PROVIDER_TYPE_ID,
  ORG_SERVICE_PROVIDER_TYPE_ID
} from '../../../constants/constants'

export const PERSONAL_DETAIL = {
  UPDATE_PERSONAL_DETAIL: 'UPDATE_PERSONAL_DETAIL',
  UPDATE_ORGANIZATION_DETAIL: 'UPDATE_ORGANIZATION_DETAIL',
  UPDATE_ENTITY_DETAIL: 'UPDATE_ENTITY_DETAIL'
}

export const getModal = (data, action) => {
  let affiliation = data.selectedAffiliation && data.selectedAffiliation.value
    ? getDataValueArray(data.selectedAffiliation.value, '-')
    : getValueOfArray(data.selectedAffiliation, '-')
  let dataList = _.filter(data.affiliationList, { 'name': affiliation[1]?affiliation[1]:affiliation[0] });  
  let states = data.selectedState && data.selectedState.value
    ? getDataValueArray(data.selectedState.value, '-')
    : getValueOfArray(data.selectedState, '-')
  let organization = _.split(data.organization, '-')
  switch (action) {
    case PERSONAL_DETAIL.UPDATE_PERSONAL_DETAIL:
      let gender = getDataValueArray(
        data.selectedGender.value
          ? data.selectedGender.value
          : data.selectedGender,
        '-'
      )
      return {
        serviceProviderId: getUserInfo().serviceProviderId,
        serviceProviderTypeId: PROFILE_SERVICE_PROVIDER_TYPE_ID,
        individual: {
          firstName: data.firstName,
          middleName: '',
          lastName: data.lastName,
          age: data.age ? data.age : 0,
          gender: {
            genderId: gender ? gender[0] : 0,
            name: gender ? gender[1] : ''
          },
          yearOfExperience: data.yearOfExperience ? data.yearOfExperience : 0,
          affiliation: {
            affiliationId: dataList.length>0?dataList[0].affiliationId:0,
            name:  dataList.length>0?dataList[0].name:''
          }
        },
        entity: null,
        description: data.description.length>0?data.description:'-',
        hourlyRate: data.hourlyRate ? data.hourlyRate : 0,
        addresses: [
          {
            addressId: data.addressId,
            serviceProviderId: getUserInfo().serviceProviderId,
            addressTypeId: data.addressTypeId,
            streetAddress: data.streetAddress,
            city: data.city,
            state: {
              id: states[0],
              name: states[1] ? states[1] : ''
            },
            zipCode: data.zipCode ? data.zipCode : 0,
            isActive: true
          }
        ],
        phoneNumber: removeHyphenInPhoneNumber(data.phoneNumber),
        isActive: true
      }
    case PERSONAL_DETAIL.UPDATE_ORGANIZATION_DETAIL:
      return {
        serviceProviderId: getUserInfo().serviceProviderId,
        serviceProviderTypeId: ORG_SERVICE_PROVIDER_TYPE_ID,
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
          websiteUrl: data.url,
          hourlyRate: '',
          yearsOfExperience: data.yearsOfExperience ? parseInt(data.yearsOfExperience, 10) : 0
        },
        description: data.description,
        hourlyRate: data.hourlyRate ? data.hourlyRate : 0,
        addresses: [
          {
            addressId: data.addressId,
            serviceProviderId: getUserInfo().serviceProviderId,
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
        phoneNumber: removeHyphenInPhoneNumber(data.phoneNumber),
        isActive: true,
        rowversionId: ''
      }
    case PERSONAL_DETAIL.UPDATE_ENTITY_DETAIL:
      let genderData = getDataValueArray(
        data.selectedGender.value
          ? data.selectedGender.value
          : data.selectedGender,
        '-'
      )
      return {
        serviceProviderId: getUserInfo().serviceProviderId,
        serviceProviderTypeId: PROFILE_SERVICE_PROVIDER_TYPE_ID,
        individual: {
          firstName: data.firstName,
          middleName: '',
          lastName: data.lastName,
          age: data.age ? data.age : 0,
          gender: {
            genderId: genderData ? genderData[0] : 0,
            name: genderData ? genderData[1] : ''
          },
          yearOfExperience: data.yearOfExperience ? data.yearOfExperience : 0,
          affiliation: {
            affiliationId: data.organization ? organization[0] : '1'
          }
        },
        entity: {
          entityId: 1,
          name: '',
          phoneNumber: data.phoneNumber,
          assignedBy: data.assigned_by,
          websiteUrl: data.url,
          logoByte: null,
          logo: '',
          hourlyRate: data.hourlyRate ? data.hourlyRate : 0
        },
        description: data.description,
        hourlyRate: data.hourlyRate ? data.hourlyRate : 0,
        addresses: [
          {
            addressId: data.addressId,
            serviceProviderId: getUserInfo().serviceProviderId,
            addressTypeId: data.addressTypeId,
            streetAddress: data.streetAddress,
            city: data.city,
            state: {
              id: states[0],
              name: states[1] ? states[1] : ''
            },
            zipCode: data.zipCode ? data.zipCode : 0,
            isActive: true
          }
        ],
        phoneNumber: removeHyphenInPhoneNumber(data.phoneNumber),
        isActive: true,
        rowversionId: ''
      }
    default:
      return {}
  }
}
