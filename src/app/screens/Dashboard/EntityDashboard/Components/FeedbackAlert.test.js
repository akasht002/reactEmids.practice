import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeedbackAlert from './FeedbackAlert';

jest.mock('react-table', () => ({
    ReactTable: 'mockReactTable'
}));

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../components', () => ({
    CoreoPagination: 'mockCoreoPagination'
}))

jest.mock('react-js-pagination', () => ({
    Pagination: 'mockPagination'
}));

jest.mock('../../../../constants/constants', () => ({
    DATE_FORMAT: 'mockDATE_FORMAT'
}));

Enzyme.configure({ adapter: new Adapter() })

describe('FeedbackAlert', () => {
    let wrapper;
    let Data = [{ "serviceRequestVisitId": 2807, "serviceRequestId": 762, "serviceCategory": "Activities of Daily Living", "serviceTypeDescription": null, "serviceTypeId": 0, "visitDate": "4/1/2019 12:00:00 AM", "serviceTypes": ["Continence", "Transferring"], "pageCount": 1 }]
    beforeEach(() => {
        wrapper = shallow(
            <FeedbackAlert
                feedbackServiceVisits={Data}
                isLoaded={true}
            />
        )
    })

    it('should return FeedbackAlert', () => {
        expect(wrapper.find('.tableview-feedbackalert').length).toEqual(1);
    })
}); 	
