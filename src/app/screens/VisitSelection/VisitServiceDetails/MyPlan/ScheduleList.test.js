import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ScheduleList } from './ScheduleList';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    handleChangeSchedule: jest.fn(),
    handelEditShedule: jest.fn(),
    handelEditAssessment: jest.fn(),
    planScheduleId: 671,
    list: [
        { "planScheduleId": 671, "name": null, "categoryId": 0, "startDate": "11/27/2019 12:00:00 AM", "endDate": "11/27/2019 12:00:00 AM", "startTime": "10:30", "endTime": "12:00", "duration": null, "isRecurring": false, "description": null, "serviceProviderId": 0, "serviceTypes": [{ "serviceTypeId": 0, "serviceTypeDescription": "Assessment", "planVisitTypeDetailsId": 0, "planServiceTypeDetailsId": 0, "serviceTask": null }], "patientAddressId": 0, "patientId": 1022, "address": null, "schedulePattern": 31, "daily": null, "weekly": null, "monthly": null, "recurringDetails": null, "scheduleType": null, "scheduleTypeId": 114, "schedulePatternType": "One Time", "isAnyAvailableHiredCard": true, "isAnyAvailableScheduleVisit": true },
    ]
}

describe('ScheduleList', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <ScheduleList {...props} />
        )
    })

    it('should return ScheduleList', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return Test', () => {
        expect(wrapper.find('.Test').props().onChange({ target: { id: 1 } }))
    })

    it('should return TestBtn', () => {
        expect(wrapper.find('.TestBtn').props().onClick())
    })

    it('should return PlanTab', () => {
        wrapper.setProps({
            list: [{ "planScheduleId": 672, "name": null, "categoryId": 0, "startDate": "11/27/2019 12:00:00 AM", "endDate": "11/27/2019 12:00:00 AM", "startTime": "10:30", "endTime": "12:00", "duration": null, "isRecurring": false, "description": null, "serviceProviderId": 0, "serviceTypes": [{ "serviceTypeId": 0, "serviceTypeDescription": "Assessment", "planVisitTypeDetailsId": 0, "planServiceTypeDetailsId": 0, "serviceTask": null }], "patientAddressId": 0, "patientId": 1022, "address": null, "schedulePattern": 31, "daily": null, "weekly": null, "monthly": null, "recurringDetails": null, "scheduleType": null, "scheduleTypeId": 115, "schedulePatternType": "One Time", "isAnyAvailableHiredCard": true, "isAnyAvailableScheduleVisit": true }
            ]
        })
        expect(wrapper).toBeDefined();
    })
}); 	
