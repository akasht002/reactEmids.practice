
import expect from 'expect';
import { serviceCalendar } from './ServiceInfo'
import { SERVICE_VISIT } from './constant'


describe('actions', () => {

    it('should create a serviceCalendar', () => {
        let newData  = [{
            serviceRequestId:23,
            servicecategories:[{serviceType:{},serviceCategoryDescription:''}],
            serviceProvider: { entityProviderId :23,entityProviderImage:'',entityProviderFirstName:''},
            visitStatusId:45,
            SERVICE_VISIT
        }];
        let props = {
            handleClick: jest.fn(),
            goToSpProfile: jest.fn(),
        }
        expect(serviceCalendar(newData,props)).toBeDefined()
    })


    it('Not create a serviceCalendar', () => {
        let newData  = [];
        let props = {
            handleClick: jest.fn(),
            goToSpProfile: jest.fn(),
        }
        expect(serviceCalendar(newData,props)).toBeDefined()
    })


});


