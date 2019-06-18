import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { VisitList } from './VisitList';

Enzyme.configure({ adapter: new Adapter() })

describe('visitHistoryList', () => {
    let props = {
        visitHistoryList: [{
            serviceTypes: [{ serviceTypeId: 100 }],
            serviceTypeId: 100,
            visitDate: '',
            slotDescription: 'Morning',
            billedTotalDuration: '1000',
            serviceRequestVisitNumber: 1000,
            serviceCategory: [],
            totalTask: 10,
            totalTaskCompleted: 8,
            patientImage: '',
            patientFirstName: 'Test',
            patientLastName: 'Test',
            serviceRequestVisitId: 155
        }],
        handelPatientProfile: jest.fn(),
        handleClicks: jest.fn()
    }
    it('should return correct component', () => {
        const wrapper = mount(
            <VisitList
                {...props}
            />
        )
        expect(wrapper.find('.mainProfileCard').length).toEqual(1)
    })

    it('Check the visitHistoryList empty', () => {
        const wrapper = mount(
            <VisitList
                {...props}
            />
        )
        wrapper.setProps({
            visitHistoryList: []
        })
    });

});  