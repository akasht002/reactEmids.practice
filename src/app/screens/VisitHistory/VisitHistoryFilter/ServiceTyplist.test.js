import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ServiceTypeList from './ServiceTyplist'


Enzyme.configure({ adapter: new Adapter() })

const defaultState = {
    serviceType: [{
        isChecked:true,
        serviceTypeDescription:'',
        name:'',
        
    }],
    planType:114,
    selectedType:false,
    isIndividualScheduleEdit :true,
    isAssessmentEdit: true,
    handleserviceType:jest.fn()
}

describe("ServiceTypeList", function () {
    it('Check the ServiceTypeList Details body', () => {
        expect(ServiceTypeList(defaultState)).toBeDefined()
    });
});