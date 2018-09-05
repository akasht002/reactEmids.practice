import _ from 'lodash'
import { SERVICE_PROVIDER_ID } from '../../../services/http';
export const PERSONAL_DETAIL = {
    UPDATE_PERSONAL_DETAIL: 'UPDATE_PERSONAL_DETAIL',
    UPDATE_ORGANIZATION_DETAIL: 'UPDATE_ORGANIZATION_DETAIL'
};

export const getModal = (data, action) => {
    let states = _.split(data.selectedState, "-");
    let gender = _.split(data.genderName, '-')
    let organization = _.split(data.organization, '-')
    switch (action) {
        case PERSONAL_DETAIL.UPDATE_PERSONAL_DETAIL:           
            return {
                serviceProviderId: localStorage.getItem('serviceProviderID'),
                serviceProviderTypeId: 1,
                individual: {
                    firstName: data.firstName,
                    middleName: 'M',
                    lastName: data.lastName,
                    age: data.age ? data.age : 0,
                    gender: {
                        id: gender[0],
                        name: gender[1]
                    },
                    yearOfExperience: data.yearOfExperience ? data.yearOfExperience : 0,
                    affiliation: {
                        affiliationId: data.organization ? organization[0] : 0
                    }
                },
                entity: {
                    organization: data.organization ? organization[1] : ''
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
                            name: states[1]
                        },
                        zipCode: data.zipCode ? data.zipCode : 0,
                        isActive: true
                    }
                ],
                phoneNumber: data.phoneNumber,
                isActive: true
            }
        case PERSONAL_DETAIL.UPDATE_ORGANIZATION_DETAIL:
            return {
                serviceProviderId: SERVICE_PROVIDER_ID,
                serviceProviderTypeId: 2,
                individual: {
                    firstName: '',
                    middleName: '',
                    lastName: data.lastName,
                    age: data.age ? data.age : 0,
                    gender: {
                        genderId: gender ? gender[0] : 0,
                        name: gender ? gender[1] : ""
                    },
                    yearOfExperience: data.yearOfExperience ? data.yearOfExperience : 0,
                    affiliation: {
                        affiliationId: data.organization ? organization[0] : 0,
                        name: ""
                    }
                },
                entity: {
                    organization: data.organizationName ? data.organizationName : "",
                    entityId: "",
                    hourlyRate: ""
                },
                description: data.description,
                hourlyRate: data.hourlyRate ? data.hourlyRate : 0,
                addresses: [
                    {
                        addressId: 1,
                        serviceProviderId: SERVICE_PROVIDER_ID,
                        addressTypeId: 2,
                        streetAddress: data.streetAddress,
                        city: data.city,
                        state: {
                            id: states[0],
                            name: states[1]
                        },
                        zipCode: data.zipCode ? data.zipCode : 0,
                        isActive: true,
                        rowversionId: ""
                    }
                ],
                phoneNumber: data.phoneNumber,
                isActive: true,
                rowversionId: ""
            }
        default:
            return {}
    }
}