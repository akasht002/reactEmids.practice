import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { PlanType } from './PlanType'


Enzyme.configure({ adapter: new Adapter() })

const defaultState = {
    options: [{
        id:23,
        name:'',
        value:''
    }],
    isIndividualScheduleEdit :true,
    isAssessmentEdit: true,
    handleChangePlanType:jest.fn()
}

describe("PlanType", function () {
    it('Check the PlanType Details body', () => {
        expect(PlanType(defaultState)).toBeDefined()
    });
});