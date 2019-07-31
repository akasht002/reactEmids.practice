import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';

import  { isStatusInArray, isDisableInArray, ServiceStatus  }  from './ServiceRequestStatus';

Enzyme.configure({ adapter: new Adapter() })

describe("VisitSelection - ServiceRequestStatus", function () {
    

    it('isStatusInArray true',()=>{
        expect(isStatusInArray(40)).toEqual(true)
    })

    it('isStatusInArray false',()=>{
        expect(isStatusInArray(400)).toEqual(false)
    })

    
    it('isDisableInArray true',()=>{
        expect(isDisableInArray(39)).toEqual(true)
    })

    it('isDisableInArray false',()=>{
        expect(isDisableInArray(400)).toEqual(false)
    })

    it('ServiceStatus',()=>{
        let props = {
            status: {
                id: 56
            },
            postServiceRequest: jest.fn()
        }
        let shallowWrapper = shallow(
            <ServiceStatus {...props} />
        )
        expect(shallowWrapper.find('[test-serviceStatus="test-serviceStatus"]').length).toEqual(1);
        expect(shallowWrapper.find('[label="Not Interested"]').props().onClick());
        shallowWrapper.setProps({
            status: {
                id: 58
            }
        })
        expect(shallowWrapper.find('[label="Apply"]').props().onClick());
    })

});