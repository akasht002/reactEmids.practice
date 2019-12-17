
import expect from 'expect';
import { serviceCalendar,ShowIndicator,splitSlots,onClickServiceCalendarItems,ServiceCalendarInfo,calendarData,
    ServiceCalendarDefault,ServiceRequestDefault,ServiceProviderRequestDetails,getPartcipitantHeader,MyConversionDefault,MyConversionDetail } from './ServiceInfo'
import { SERVICE_VISIT } from './constant'


jest.mock('../../utils/userUtility', () => ({
    isEntityServiceProvider: () => ({
      userType: 'I'
    }),
    getUserInfo:()=>({
      serviceProviderTypeId :23
    })
  }))
  

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


    it('ShowIndicator', () => {
        let props = {
            count:1
        }
        expect(ShowIndicator(props)).toBeDefined()
    })

    it('ShowIndicator', () => {
        let props = {
            count:2
        }
        expect(ShowIndicator(props)).toBeDefined()
    })

    it('ShowIndicator', () => {
        let props = {
            count:3
        }
        expect(ShowIndicator(props)).toBeDefined()
    })

    it('ShowIndicator', () => {
        let props = {
            count:0
        }
        expect(ShowIndicator(props)).toBeDefined()
    })

    it('splitSlots', () => {
        let data = [{
            slotDescription:'data'
        }]
        expect(splitSlots({},data,'data',()=>{},{})).toBeDefined()
    })

    it('splitSlots', () => {
        let data = [{
            slotDescription:'data1'
        }]
        expect(splitSlots({},data,'data',()=>{},{})).toBeDefined()
    })

    it('onClickServiceCalendarItems', () => {
        expect(onClickServiceCalendarItems({
            goToServiceVisits: ()=>{}
        },{visitDate:'23/03/2019',visitStatusId:2})).toBeDefined()
    })

    it('serviceCalendar ', () => {
        let data = [{
            visitStatusId: 34
        }]
        expect(serviceCalendar({},data,()=>{},{
            handlePhoneNumber: () =>{},
            onClickConversation: () =>{},
            onClickVideoConference:()=>{}
        })).toBeDefined()
    })


    it('ServiceCalendarInfo', () => {
        let data ={ Servicelist: [{
            slotDescription: '',
            serviceCategory:[],
            patientImage:null
        }] }
        expect(ServiceCalendarInfo(data)).toBeDefined()
    })

    it('calendarData', () => {
        let data ={ Servicelist: [{
            slotDescription: '',
            serviceCategory:[],
            patientImage:null
        }] }
        expect(calendarData(data)).toBeDefined()
    })

    it('ServiceCalendarDefault', () => {
        let data ={ 
            togglePersonalDetails:() => {},
            Servicelist:[{}],
            handleClick:() => {}
        }
        expect(ServiceCalendarDefault(data)).toBeDefined()
    })

    
    it('ServiceRequestDefault ', () => {
        let data ={ 
            togglePersonalDetails:() => {},
            Servicelist:[{}],
            handleClick:() => {}
        }
        expect(ServiceRequestDefault(data)).toBeDefined()
    })

    it('ServiceProviderRequestDetails ', () => {
        let data ={ 
            togglePersonalDetails:() => {},
            serviceRequest:[{
                statusId :34,
                image :'',
                patientLastName:'',
                serviceRequestId:34
            }],
            handleClick:() => {}
        }
        expect(ServiceProviderRequestDetails(data)).toBeDefined()
    })

    it('ServiceProviderRequestDetails ', () => {
        let data ={ 
            togglePersonalDetails:() => {},
            serviceRequest:[{
                statusId :38,
                image :'',
                patientLastName:'',
                serviceRequestId:34
            }],
            handleClick:() => {}
        }
        expect(ServiceProviderRequestDetails(data)).toBeDefined()
    })


    it('getPartcipitantHeader ', () => {
        let data = [{firstName :'',lastName :''}]
        expect(getPartcipitantHeader(data)).toBeDefined()
    })

    it('getPartcipitantHeader ', () => {
        let data = []
        expect(getPartcipitantHeader(data)).toBeDefined()
    })

    it('MyConversionDefault ', () => {
        let data = []
        expect(MyConversionDefault()).toBeDefined()
    })

    it('MyConversionDetail', () => {
        let data = {
            conversation: [{conversationId :23,participantList:[],title:''}],
            getUnreadMsgCounts:[{}]
        }
        expect(MyConversionDetail(data)).toBeDefined()
    })
});


