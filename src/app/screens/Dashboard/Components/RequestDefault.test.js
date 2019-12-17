import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ServiceRequestDefault }  from './RequestDefault'

describe("CalendarList", function () {    
    
    it('Check the ShowIndicator Details body', () => {
        let count = 1;
        expect(ServiceRequestDefault()).toBeDefined()
    }); 
});