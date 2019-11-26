import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RequestTab } from './RequestTab';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../../../utils/userUtility', () => ({
    isEntityUser: () => ({})
}))

let props = {
    handelDetails: jest.fn(),
    handelReject: jest.fn(),
    handelAccept: jest.fn(),
    handelCancel: jest.fn(),
    handelEngage: jest.fn(),
    VisitServiceDetails: { "serviceRequestTypeDetails": [{ "serviceRequestTypeDetailsId": 4342, "serviceRequestId": 2748, "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceRequestTypeTaskDetails": [{ "serviceRequestTypeTaskDetailsId": 9445, "serviceTaskId": 1, "serviceTaskDescription": "Locate transfer devices", "serviceRequestTypeDetailsId": 4342 }, { "serviceRequestTypeTaskDetailsId": 9446, "serviceTaskId": 2, "serviceTaskDescription": "Assist with transfer(s)", "serviceRequestTypeDetailsId": 4342 }] }], "visitInProgress": false, "hasVisitStarted": false, "requestApprovalStatus": true, "serviceRequestId": 2748, "serviceRequestDescription": "", "serviceCategoryId": 1, "patientId": 0, "patientFirstName": null, "patientLastName": null, "statusId": 38, "statusName": "Requested", "isRecurring": false, "recurringPattern": 0, "image": null, "thumbnail": null, "recurringPatternDescription": "One Time", "startDate": "2019-11-26T00:00:00", "endDate": "2019-11-26T00:00:00", "occurence": 0, "specialCareConsideration": null, "paymentApproach": 0, "genderPreference": 0, "patientAddressId": 0, "minimumServiceProviderExperience": 0, "maximumServiceProviderExperience": 0, "serviceCategoryDescription": "Activities of Daily Living", "isActive": false, "serviceProviderId": 11, "providerFirstName": null, "providerLastName": null, "providerThumbnailByte": null, "providerThumbnail": null, "serviceTypeDescription": null, "serviceTypeId": 0, "serviceTaskDescription": null, "serviceTaskId": 0, "slotId": 0, "dayOfWeek": 0, "day": null, "slotDescription": null, "serviceTypes": null, "serviceRequestSlot": [{ "serviceRequestSlotId": 5936, "serviceRequestId": 2748, "dayOfWeek": 25, "day": "Tuesday", "slotId": 22, "isActive": true, "rowversionId": "AAAAAACeLb0=", "slotDescription": "Afternoon" }], "gender": null, "serviceRequestStatus": null, "skills": null, "experience": 0, "age": 0, "hourlyRate": 0, "favourite": 0, "rating": 0, "serviceProviderImage": null, "serviceType": null, "scheduleType": null, "postedDate": "2019-11-26T13:23:49.557", "serviceProvider": null, "patient": { "patientId": 1022, "firstName": "Lori", "lastName": "whitfoot", "image": "/9j/4AAQSkZJRgABA", "patientAddresses": [{ "patientId": 1022, "patientAddressId": 531, "streetAddress": "Washington Ave Extension", "city": "Albany", "stateName": "New York", "stateId": 0, "zipCode": "12205", "isPrimaryAddress": true, "addressId": 0, "state": null, "zip": 0, "street": null, "isActive": false, "addressTypeId": null, "lat": 0.0, "lon": 0.0, "googleApiUrl": null }], "mpi": null, "phoneNumber": "9902040950", "coreoHomeUserId": 118 }, "hiredDate": "11/26/2019 7:53:49 AM", "numberOfApplicants": 0, "patientAddress": null, "patientImage": null, "status": null, "requestDate": "0001-01-01T00:00:00", "approvalStatus": null, "authorizationRequired": false, "types": null, "phoneNumber": null, "dataCount": 0, "date": "0001-01-01T00:00:00", "changed": 0, "serviceRequestNumber": "S3IK35A", "serviceProviderType": null }
}

describe('RequestTab', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <RequestTab {...props} />
        )
    })

    it('should return RequestTab', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return RequestTab', () => {
        wrapper.setProps({
            VisitServiceDetails: { "serviceRequestTypeDetails": [{ "serviceRequestTypeDetailsId": 4342, "serviceRequestId": 2748, "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceRequestTypeTaskDetails": [{ "serviceRequestTypeTaskDetailsId": 9445, "serviceTaskId": 1, "serviceTaskDescription": "Locate transfer devices", "serviceRequestTypeDetailsId": 4342 }, { "serviceRequestTypeTaskDetailsId": 9446, "serviceTaskId": 2, "serviceTaskDescription": "Assist with transfer(s)", "serviceRequestTypeDetailsId": 4342 }] }], "visitInProgress": false, "hasVisitStarted": false, "requestApprovalStatus": true, "serviceRequestId": 2748, "serviceRequestDescription": "", "serviceCategoryId": 1, "patientId": 0, "patientFirstName": null, "patientLastName": null, "statusId": 38, "statusName": "Open", "isRecurring": false, "recurringPattern": 0, "image": null, "thumbnail": null, "recurringPatternDescription": "One Time", "startDate": "2019-11-26T00:00:00", "endDate": "2019-11-26T00:00:00", "occurence": 0, "specialCareConsideration": null, "paymentApproach": 0, "genderPreference": 0, "patientAddressId": 0, "minimumServiceProviderExperience": 0, "maximumServiceProviderExperience": 0, "serviceCategoryDescription": "Activities of Daily Living", "isActive": false, "serviceProviderId": 11, "providerFirstName": null, "providerLastName": null, "providerThumbnailByte": null, "providerThumbnail": null, "serviceTypeDescription": null, "serviceTypeId": 0, "serviceTaskDescription": null, "serviceTaskId": 0, "slotId": 0, "dayOfWeek": 0, "day": null, "slotDescription": null, "serviceTypes": null, "serviceRequestSlot": [{ "serviceRequestSlotId": 5936, "serviceRequestId": 2748, "dayOfWeek": 25, "day": "Tuesday", "slotId": 22, "isActive": true, "rowversionId": "AAAAAACeLb0=", "slotDescription": "Afternoon" }], "gender": null, "serviceRequestStatus": null, "skills": null, "experience": 0, "age": 0, "hourlyRate": 0, "favourite": 0, "rating": 0, "serviceProviderImage": null, "serviceType": null, "scheduleType": null, "postedDate": "2019-11-26T13:23:49.557", "serviceProvider": null, "patient": { "patientId": 1022, "firstName": "Lori", "lastName": "whitfoot", "image": "/9j/4AA", "patientAddresses": [{ "patientId": 1022, "patientAddressId": 531, "streetAddress": "Washington Ave Extension", "city": "Albany", "stateName": "New York", "stateId": 0, "zipCode": "12205", "isPrimaryAddress": true, "addressId": 0, "state": null, "zip": 0, "street": null, "isActive": false, "addressTypeId": null, "lat": 0.0, "lon": 0.0, "googleApiUrl": null }], "mpi": null, "phoneNumber": "9902040950", "coreoHomeUserId": 118 }, "hiredDate": "11/26/2019 7:53:49 AM", "numberOfApplicants": 0, "patientAddress": null, "patientImage": null, "status": null, "requestDate": "0001-01-01T00:00:00", "approvalStatus": null, "authorizationRequired": false, "types": null, "phoneNumber": null, "dataCount": 0, "date": "0001-01-01T00:00:00", "changed": 0, "serviceRequestNumber": "S3IK35A", "serviceProviderType": null }
        })
        expect(wrapper).toBeDefined();
    })

    it('should return test-reject', () => {
        expect(wrapper.find('[test-reject="test-reject"]').props().onClick())
    })

    it('should return test-accept', () => {
        expect(wrapper.find('[test-accept="test-accept"]').props().onClick())
    })

    it('should return test-engage', () => {
        wrapper.setProps({
            VisitServiceDetails: { "serviceRequestTypeDetails": [{ "serviceRequestTypeDetailsId": 4342, "serviceRequestId": 2748, "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceRequestTypeTaskDetails": [{ "serviceRequestTypeTaskDetailsId": 9445, "serviceTaskId": 1, "serviceTaskDescription": "Locate transfer devices", "serviceRequestTypeDetailsId": 4342 }, { "serviceRequestTypeTaskDetailsId": 9446, "serviceTaskId": 2, "serviceTaskDescription": "Assist with transfer(s)", "serviceRequestTypeDetailsId": 4342 }] }], "visitInProgress": false, "hasVisitStarted": false, "requestApprovalStatus": true, "serviceRequestId": 2748, "serviceRequestDescription": "", "serviceCategoryId": 1, "patientId": 0, "patientFirstName": null, "patientLastName": null, "statusId": 38, "statusName": "Open", "isRecurring": false, "recurringPattern": 0, "image": null, "thumbnail": null, "recurringPatternDescription": "One Time", "startDate": "2019-11-26T00:00:00", "endDate": "2019-11-26T00:00:00", "occurence": 0, "specialCareConsideration": null, "paymentApproach": 0, "genderPreference": 0, "patientAddressId": 0, "minimumServiceProviderExperience": 0, "maximumServiceProviderExperience": 0, "serviceCategoryDescription": "Activities of Daily Living", "isActive": false, "serviceProviderId": 11, "providerFirstName": null, "providerLastName": null, "providerThumbnailByte": null, "providerThumbnail": null, "serviceTypeDescription": null, "serviceTypeId": 0, "serviceTaskDescription": null, "serviceTaskId": 0, "slotId": 0, "dayOfWeek": 0, "day": null, "slotDescription": null, "serviceTypes": null, "serviceRequestSlot": [{ "serviceRequestSlotId": 5936, "serviceRequestId": 2748, "dayOfWeek": 25, "day": "Tuesday", "slotId": 22, "isActive": true, "rowversionId": "AAAAAACeLb0=", "slotDescription": "Afternoon" }], "gender": null, "serviceRequestStatus": null, "skills": null, "experience": 0, "age": 0, "hourlyRate": 0, "favourite": 0, "rating": 0, "serviceProviderImage": null, "serviceType": null, "scheduleType": null, "postedDate": "2019-11-26T13:23:49.557", "serviceProvider": null, "patient": { "patientId": 1022, "firstName": "Lori", "lastName": "whitfoot", "image": "/9j/4AA", "patientAddresses": [{ "patientId": 1022, "patientAddressId": 531, "streetAddress": "Washington Ave Extension", "city": "Albany", "stateName": "New York", "stateId": 0, "zipCode": "12205", "isPrimaryAddress": true, "addressId": 0, "state": null, "zip": 0, "street": null, "isActive": false, "addressTypeId": null, "lat": 0.0, "lon": 0.0, "googleApiUrl": null }], "mpi": null, "phoneNumber": "9902040950", "coreoHomeUserId": 118 }, "hiredDate": "11/26/2019 7:53:49 AM", "numberOfApplicants": 0, "patientAddress": null, "patientImage": null, "status": null, "requestDate": "0001-01-01T00:00:00", "approvalStatus": null, "authorizationRequired": false, "types": null, "phoneNumber": null, "dataCount": 0, "date": "0001-01-01T00:00:00", "changed": 0, "serviceRequestNumber": "S3IK35A", "serviceProviderType": null }
        })
        expect(wrapper.find('[test-engage="test-engage"]').props().onClick())
    })

    it('should return VisitServiceDetails', () => {
        wrapper.setProps({
            VisitServiceDetails: []
        })
        expect(wrapper).toBeDefined();
    })
}); 	
