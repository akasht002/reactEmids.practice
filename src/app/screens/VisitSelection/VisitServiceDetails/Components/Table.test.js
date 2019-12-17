import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Table, renderServiceTypeImages, getServiceTypeImageBasedOnId, renderStatusBasedOnVisitStatus } from './Table';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderTypeId: 1,
        isEntityServiceProvider: false
    }),
    isEntityServiceProvider: () => ({})
}))

jest.mock('../../../../utils/userUtility', () => ({
    isEntityUser: () => ({

    }),
}))

let props = {
    navigateToparticularPageBasedonId: jest.fn(),
    handelViewSchedule: jest.fn(),
    visitList: [{
        "serviceRequestVisitId": 15616, "duration": null, "patientId": 0, "serviceRequestId": 2491, "scheduleType": null, "scheduleTypeId": 0, "serviceProviderId": 28,
        "serviceTypes": [{ "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }, { "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }, { "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }, { "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }]
        , "startDate": null, "startTime": "12:00", "visitDate": "11/4/2019", "visitStatusId": 43, "visitStatusName": "Scheduled", "originalTotalDuration": null, "billedTotalDuration": "00:00:00", "isPaymentModeEnabled": true
    }]
}

describe('Table', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Table
                header={[
                    {
                        id: '1',
                        label: 'Date'
                    },
                    {
                        id: '2',
                        label: 'Start Time'
                    },
                    {
                        id: '3',
                        label: 'Duration(H)'
                    },
                    {
                        id: '4',
                        label: 'Services Types'
                    }
                ]}
                rowPageSize={10}
                totalResult={100}
                {...props}
            />
        )
    })

    it('should return table-responsive', () => {
        expect(wrapper.find('.table-responsive').length).toEqual(1);
    })

    it('should return renderServiceTypeImages', () => {
        let visitList = [{
            "serviceTypes": [
                { "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }, 
                { "serviceTypeId": 1, "serviceTypeDescription": "Assessment", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 },
                { "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }, 
                { "serviceTypeId": 1, "serviceTypeDescription": "Ambulation and Mobility", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }]
        }]

        renderServiceTypeImages(visitList)
    })

    it('should return getServiceTypeImageBasedOnId ', () => {
        getServiceTypeImageBasedOnId(1)
    })

    
    it('should return renderStatusBasedOnVisitStatus 1 ', () => {
        renderStatusBasedOnVisitStatus (43, true)
        renderStatusBasedOnVisitStatus (44, true)
        renderStatusBasedOnVisitStatus (45, true)
        renderStatusBasedOnVisitStatus (90, true)
        renderStatusBasedOnVisitStatus (46, true)
        renderStatusBasedOnVisitStatus ()
    })

    it('should return renderEntityStatusBasedOnVisitStatus  1 ', () => {
        renderStatusBasedOnVisitStatus (43, true)
        renderStatusBasedOnVisitStatus (44, true)
        renderStatusBasedOnVisitStatus (45, true)
        renderStatusBasedOnVisitStatus (90, true)
        renderStatusBasedOnVisitStatus (46, true)
        renderStatusBasedOnVisitStatus ()
    })
}); 	
