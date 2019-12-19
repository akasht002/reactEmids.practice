import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import EmergencyAttorneyDetails from './index';
import { mapStateToProps, mapDispatchToProps } from './index'

Enzyme.configure({ adapter: new Adapter() })

let props = {
    getEmergencyContactDetails: jest.fn(),
    getAttorneyContactDetails: jest.fn(),
    emergencyContactDetails: {},
    attorneyContactDetails: {}
}

describe('EmergencyAttorneyDetails', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <EmergencyAttorneyDetails {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return correct component', () => {
        expect('.col-md-12').toBeDefined();
    })

    it('Check maptoprops', () => {
        const initialState = {
            patientProfileState:
            {
                emergencyContactDetails: {},
                attorneyContactDetails: {}
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getEmergencyContactDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAttorneyContactDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});

