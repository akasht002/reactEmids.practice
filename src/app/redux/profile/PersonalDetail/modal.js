import _ from 'lodash'
export const PERSONAL_DETAIL = {
    UPDATE_PERSONAL_DETAIL: 'UPDATE_PERSONAL_DETAIL'
}

export const getModal = (data, action) => {
    switch (action) {
        case PERSONAL_DETAIL.UPDATE_PERSONAL_DETAIL:
            let states = _.split(data.state_id, '-')
            let gender = _.split(data.genderName, '-')
            let organization = _.split(data.organization, '-')
            return {
                serviceProviderId: 1,
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
        default:
            return {}
    }
}