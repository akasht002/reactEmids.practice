import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ServiceProviderRequestDetails }  from './RequestList'

describe("ServiceProviderRequestDetails", function () {    
    
    it('Check the ServiceProviderRequestDetails Details body', () => {
        let props = {
            serviceRequest:[{
                statusId :43,
                image:"",
                serviceRequestTypeDetails:"sdf",
                recurringPattern :0,
                recurringPatternDescription:'',
                patientFirstName :"sdf"
            },
            {
                statusId :38,
                image:"",
                serviceRequestTypeDetails:"sdf",
                recurringPattern :2,
                recurringPatternDescription:'',
                patientFirstName :"sdf"
            }
        ],
        handleClick:jest.fn(),
        };
        expect(ServiceProviderRequestDetails(props)).toBeDefined()
    }); 
});