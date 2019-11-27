import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Details } from './Details';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    details: { "serviceRequestTypeDetails": [{ "serviceRequestTypeDetailsId": 4354, "serviceRequestId": 2754, "serviceTypeId": 8, "serviceTypeDescription": "Companionship and Errands", "serviceRequestTypeTaskDetails": [{ "serviceRequestTypeTaskDetailsId": 9475, "serviceTaskId": 20, "serviceTaskDescription": "Read favorite books", "serviceRequestTypeDetailsId": 4354 }, { "serviceRequestTypeTaskDetailsId": 9476, "serviceTaskId": 21, "serviceTaskDescription": "Play favorite games", "serviceRequestTypeDetailsId": 4354 }, { "serviceRequestTypeTaskDetailsId": 9477, "serviceTaskId": 22, "serviceTaskDescription": "Watch favorite TV", "serviceRequestTypeDetailsId": 4354 }] }], "visitInProgress": false, "hasVisitStarted": false, "requestApprovalStatus": false, "serviceRequestId": 2754, "serviceRequestDescription": "Today ?", "serviceCategoryId": 2, "patientId": 0, "patientFirstName": null, "patientLastName": null, "statusId": 35, "statusName": "Open", "isRecurring": false, "recurringPattern": 0, "image": null, "thumbnail": null, "recurringPatternDescription": "One Time", "startDate": "2019-11-28T00:00:00", "endDate": "2019-11-28T00:00:00", "occurence": 0, "specialCareConsideration": null, "paymentApproach": 0, "genderPreference": 0, "patientAddressId": 0, "minimumServiceProviderExperience": 0, "maximumServiceProviderExperience": 0, "serviceCategoryDescription": "Help at Home", "isActive": false, "serviceProviderId": 0, "providerFirstName": null, "providerLastName": null, "providerThumbnailByte": null, "providerThumbnail": null, "serviceTypeDescription": null, "serviceTypeId": 0, "serviceTaskDescription": null, "serviceTaskId": 0, "slotId": 0, "dayOfWeek": 0, "day": null, "slotDescription": null, "serviceTypes": null, "serviceRequestSlot": [{ "serviceRequestSlotId": 5947, "serviceRequestId": 2754, "dayOfWeek": 27, "day": "Thursday", "slotId": 21, "isActive": true, "rowversionId": "AAAAAACeRH4=", "slotDescription": "Morning" }], "gender": null, "serviceRequestStatus": null, "skills": null, "experience": 0, "age": 0, "hourlyRate": 0, "favourite": 0, "rating": 0, "serviceProviderImage": null, "serviceType": null, "scheduleType": null, "postedDate": "2019-11-26T15:30:16.03", "serviceProvider": null, "patient": { "patientId": 1022, "firstName": "Lori", "lastName": "whitfoot", "image": "/9==", "patientAddresses": [{ "patientId": 1022, "patientAddressId": 531, "streetAddress": "Washington Ave Extension", "city": "Albany", "stateName": "New York", "stateId": 0, "zipCode": "12205", "isPrimaryAddress": true, "addressId": 0, "state": null, "zip": 0, "street": null, "isActive": false, "addressTypeId": 1, "lat": 0.0, "lon": 0.0, "googleApiUrl": null }], "mpi": null, "phoneNumber": "9902040950", "coreoHomeUserId": 118 }, "hiredDate": null, "numberOfApplicants": 0, "patientAddress": null, "patientImage": null, "status": null, "requestDate": "0001-01-01T00:00:00", "approvalStatus": null, "authorizationRequired": false, "types": null, "phoneNumber": null, "dataCount": 0, "date": "0001-01-01T00:00:00", "changed": 0, "serviceRequestNumber": "S8XZ8D8", "serviceProviderType": null },
    daysType: [
        { id: 24, keyName: null, keyValue: "Monday" },
        { id: 25, keyName: null, keyValue: "Tuesday" },
        { id: 26, keyName: null, keyValue: "Wednesday" },
        { id: 27, keyName: null, keyValue: "Thursday" },
        { id: 28, keyName: null, keyValue: "Friday" },
        { id: 29, keyName: null, keyValue: "Saturday" },
        { id: 30, keyName: null, keyValue: "Sunday" }
    ],
    recurringPattern: jest.fn()
}

describe('Details ', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Details {...props} />
        )
    })

    it('should return Details ', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return Details ', () => {
        wrapper.instance().recurringPattern()
    })

    it('should return Details ', () => {
        wrapper.setProps({
            details: { "serviceRequestTypeDetails": [{ "serviceRequestTypeDetailsId": 4354, "serviceRequestId": 2754, "serviceTypeId": 8, "serviceTypeDescription": "Companionship and Errands", "serviceRequestTypeTaskDetails": [{ "serviceRequestTypeTaskDetailsId": 9475, "serviceTaskId": 20, "serviceTaskDescription": "Read favorite books", "serviceRequestTypeDetailsId": 4354 }, { "serviceRequestTypeTaskDetailsId": 9476, "serviceTaskId": 21, "serviceTaskDescription": "Play favorite games", "serviceRequestTypeDetailsId": 4354 }, { "serviceRequestTypeTaskDetailsId": 9477, "serviceTaskId": 22, "serviceTaskDescription": "Watch favorite TV", "serviceRequestTypeDetailsId": 4354 }] }], "visitInProgress": false, "hasVisitStarted": false, "requestApprovalStatus": false, "serviceRequestId": 2754, "serviceRequestDescription": "Today ?", "serviceCategoryId": 2, "patientId": 0, "patientFirstName": null, "patientLastName": null, "statusId": 35, "statusName": "Open", "isRecurring": false, "recurringPattern": 0, "image": null, "thumbnail": null, "recurringPatternDescription": "Recurring", "startDate": "2019-11-28T00:00:00", "endDate": "2019-11-28T00:00:00", "occurence": 10, "specialCareConsideration": null, "paymentApproach": 0, "genderPreference": 0, "patientAddressId": 0, "minimumServiceProviderExperience": 0, "maximumServiceProviderExperience": 0, "serviceCategoryDescription": "Help at Home", "isActive": false, "serviceProviderId": 0, "providerFirstName": null, "providerLastName": null, "providerThumbnailByte": null, "providerThumbnail": null, "serviceTypeDescription": null, "serviceTypeId": 0, "serviceTaskDescription": null, "serviceTaskId": 0, "slotId": 0, "dayOfWeek": 0, "day": null, "slotDescription": null, "serviceTypes": null, "serviceRequestSlot": [{ "serviceRequestSlotId": 5947, "serviceRequestId": 2754, "dayOfWeek": 27, "day": "Thursday", "slotId": 21, "isActive": true, "rowversionId": "AAAAAACeRH4=", "slotDescription": "Afternoon" }], "gender": null, "serviceRequestStatus": null, "skills": null, "experience": 0, "age": 0, "hourlyRate": 0, "favourite": 0, "rating": 0, "serviceProviderImage": null, "serviceType": null, "scheduleType": null, "postedDate": "2019-11-26T15:30:16.03", "serviceProvider": null, "patient": { "patientId": 1022, "firstName": "Lori", "lastName": "whitfoot", "image": "/9==", "patientAddresses": [], "mpi": null, "phoneNumber": "9902040950", "coreoHomeUserId": 118 }, "hiredDate": null, "numberOfApplicants": 0, "patientAddress": null, "patientImage": null, "status": null, "requestDate": "0001-01-01T00:00:00", "approvalStatus": null, "authorizationRequired": false, "types": null, "phoneNumber": null, "dataCount": 0, "date": "0001-01-01T00:00:00", "changed": 0, "serviceRequestNumber": "S8XZ8D8", "serviceProviderType": null },
        })
        expect(wrapper).toBeDefined();
    })

    it('should return Details ', () => {
        wrapper.setProps({
            details: { "serviceRequestTypeDetails": [{ "serviceRequestTypeDetailsId": 4354, "serviceRequestId": 2754, "serviceTypeId": 8, "serviceTypeDescription": "Companionship and Errands", "serviceRequestTypeTaskDetails": [{ "serviceRequestTypeTaskDetailsId": 9475, "serviceTaskId": 20, "serviceTaskDescription": "Read favorite books", "serviceRequestTypeDetailsId": 4354 }, { "serviceRequestTypeTaskDetailsId": 9476, "serviceTaskId": 21, "serviceTaskDescription": "Play favorite games", "serviceRequestTypeDetailsId": 4354 }, { "serviceRequestTypeTaskDetailsId": 9477, "serviceTaskId": 22, "serviceTaskDescription": "Watch favorite TV", "serviceRequestTypeDetailsId": 4354 }] }], "visitInProgress": false, "hasVisitStarted": false, "requestApprovalStatus": false, "serviceRequestId": 2754, "serviceRequestDescription": "Today ?", "serviceCategoryId": 2, "patientId": 0, "patientFirstName": null, "patientLastName": null, "statusId": 35, "statusName": "Open", "isRecurring": false, "recurringPattern": 0, "image": null, "thumbnail": null, "recurringPatternDescription": "One Time", "startDate": "2019-11-28T00:00:00", "endDate": "2019-11-28T00:00:00", "occurence": 0, "specialCareConsideration": null, "paymentApproach": 0, "genderPreference": 0, "patientAddressId": 0, "minimumServiceProviderExperience": 0, "maximumServiceProviderExperience": 0, "serviceCategoryDescription": "Help at Home", "isActive": false, "serviceProviderId": 0, "providerFirstName": null, "providerLastName": null, "providerThumbnailByte": null, "providerThumbnail": null, "serviceTypeDescription": null, "serviceTypeId": 0, "serviceTaskDescription": null, "serviceTaskId": 0, "slotId": 0, "dayOfWeek": 0, "day": null, "slotDescription": null, "serviceTypes": null, "serviceRequestSlot": [{ "serviceRequestSlotId": 5947, "serviceRequestId": 2754, "dayOfWeek": 27, "day": "Thursday", "slotId": 21, "isActive": true, "rowversionId": "AAAAAACeRH4=", "slotDescription": "Evening" }], "gender": null, "serviceRequestStatus": null, "skills": null, "experience": 0, "age": 0, "hourlyRate": 0, "favourite": 0, "rating": 0, "serviceProviderImage": null, "serviceType": null, "scheduleType": null, "postedDate": "2019-11-26T15:30:16.03", "serviceProvider": null, "patient": { "patientId": 1022, "firstName": "Lori", "lastName": "whitfoot", "image": "/9==", "patientAddresses": [{ "patientId": 1022, "patientAddressId": 531, "streetAddress": "Washington Ave Extension", "city": "Albany", "stateName": "New York", "stateId": 0, "zipCode": "12205", "isPrimaryAddress": true, "addressId": 0, "state": null, "zip": 0, "street": null, "isActive": false, "addressTypeId": null, "lat": 0.0, "lon": 0.0, "googleApiUrl": null }], "mpi": null, "phoneNumber": "9902040950", "coreoHomeUserId": 118 }, "hiredDate": null, "numberOfApplicants": 0, "patientAddress": null, "patientImage": null, "status": null, "requestDate": "0001-01-01T00:00:00", "approvalStatus": null, "authorizationRequired": false, "types": null, "phoneNumber": null, "dataCount": 0, "date": "0001-01-01T00:00:00", "changed": 0, "serviceRequestNumber": "S8XZ8D8", "serviceProviderType": null },
        })
        expect(wrapper).toBeDefined();
    })

    it('should return Details ', () => {
        wrapper.setProps({
            details: {occurence : 0}
        })
        expect(wrapper).toBeDefined();
    })
}); 	
