import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ShowIndicator,generateIndicator,splitSlots,serviceCalendar,ServiceCalendarList  }  from './CalendarList'

describe("CalendarList", function () {    
    
    it('Check the ShowIndicator Details body', () => {
        let count = 1;
        expect(ShowIndicator(count)).toBeDefined()
    }); 

    it('Check the ShowIndicator Details body', () => {
        let count = 2;
        expect(ShowIndicator(count)).toBeDefined()
    }); 

    it('Check the ShowIndicator Details body', () => {
        let count = 3;
        expect(ShowIndicator(count)).toBeDefined()
    }); 

    it('Check the generateIndicator Details body', () => {
        let count = 3;
        expect(generateIndicator(count)).toBeDefined()
    });
    
    
    it('Check the ServiceCalendarList Details body', () => {
        let Servicelist = [{
            Servicelist:[]
        }];
        expect(ServiceCalendarList(Servicelist)).toBeDefined()
    }); 

    it('Check the splitSlots Details body', () => {
        expect(splitSlots({},{},{},{})).toBeDefined()
    }); 

    it('Check the serviceCalendar Details body', () => {
        expect(serviceCalendar({},[{}],{},{})).toBeDefined()
    }); 

    it('Check the ServiceCalendarList  Details body', () => {
        expect(ServiceCalendarList({
            Servicelist:[],
            togglePersonalDetails:jest.fn(),
            handleClick:jest.fn()
        })).toBeDefined()
    }); 
});