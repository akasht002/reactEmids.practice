import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Item } from './Item';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    item: { "serviceRequestId": 2748, "serviceTypes": [{ "serviceTypeId": 1 }], "serviceProviderId": "11", "percentageMatch": 0.0, "patientId": 1022, "patientThumbNail": null, "patientImage": "data:image/png;base64,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", "serviceRequestStatus": "Requested", "recurring": "One Time", "statusId": 38, "patientAge": 0, "type": " Ambulation and Mobility", "typeId": "1", "skills": null, "pos": null, "startDate": "11/26/2019 12:00:00 AM", "endDate": "11/26/2019 12:00:00 AM", "patientFirstName": "Lori", "patientLastName": "whitfoot", "providerFirstName": null, "providerLastName": null, "serviceTypeDescription": null, "serviceCategoryDescription": ["Activities of Daily Living"], "patientGender": null, "createDate": "2019-11-26T13:23:49.557", "modifiedDate": "0001-01-01T00:00:00", "requestApprovalStatus": false },
    handelDetails: jest.fn(),
    serviceRequestId: 2748
}

describe('Item', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Item {...props} />
        )
    })

    it('should return Item', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return test-handelDetails="test-handelDetails"', () => {
        expect(wrapper.find('[test-handelDetails="test-handelDetails"]').props().onClick())
    })
}); 	
