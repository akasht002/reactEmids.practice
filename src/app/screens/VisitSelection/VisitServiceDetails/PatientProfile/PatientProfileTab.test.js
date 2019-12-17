import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PatientProfileTab } from './PatientProfileTab';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    showPhoneNumber: jest.fn(),
    onClickConversation: jest.fn(),
    onClickVideoConference: jest.fn()
}

describe('PatientProfileTab', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <PatientProfileTab {...props} />
        )
    })

    it('should return ScheduleList', () => {
        expect(wrapper).toBeDefined();
    })
}); 	
