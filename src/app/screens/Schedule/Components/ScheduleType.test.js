import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { ScheduleType } from './ScheduleType'


Enzyme.configure({ adapter: new Adapter() })

const defaultState = {
    daysList: [{
        id:23,
        name:'',
        keyValue:''
    }],
    options:[{
        id:23,
        booleanValue :true,
        value:''
    }],
    startDate:'',
    recurringPatternList:[{
        id:23,
        name:'',
        keyValue:''
    }],
    weekRecurring:[{
        id:23,
        value:''
    }],
    planType:114,
    selectedType:false,
    isIndividualScheduleEdit :true,
    isAssessmentEdit: true,
    handleChangeScheduleType:jest.fn()
}

describe("ScheduleType", function () {
    it('Check the ScheduleType Details body', () => {
        expect(ScheduleType(defaultState)).toBeDefined()
    });
});