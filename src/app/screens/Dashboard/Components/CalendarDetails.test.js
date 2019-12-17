import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import { calenderDetails } from './CalendarDetails'


Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        serviceProviderId: 13
    })
}))

let store;
const dispatch = sinon.spy();

const defaultState = {
    handleClick: jest.fn(),
    togglePersonalDetails: jest.fn(),
    goToESPProfile: jest.fn(),
    goToPatientProfile: jest.fn(),

}

describe("calenderDetails", function () {
    

    it('Check the calenderDetails Details body', () => {
        expect(calenderDetails(defaultState,{
            patientFirstName :'',
            patientLastName:'',
            providerId:34,
            serviceRequestVisitId:45,
            patientId:'',
            visitDate:'',
            providerImage:'',
            patientImage:34,

        },{},23)).toBeDefined()
    });
});