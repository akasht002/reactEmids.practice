import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { QuickMenu, mapStateToProps, mapDispatchToProps } from './QuickMenu';

jest.mock('../../utils/userUtility', () => ({
    getUserInfo: () => ({
        serviceProviderId: 13
    }),
    isEntityServiceProvider:()=> true
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
        profileState:{
            PersonalDetailState:
            {
                spBusyInVisit:{
                    isServiceProviderInStandBy:true
                }
            }
        }, 
        isStandByModeOn:{
            isServiceProviderInStandBy:true
        },       
        getServiceProviderVists: jest.fn(),
        getServiceVisitCount: jest.fn(),
        getEntityServiceProviderList: jest.fn(),
        updateEntityServiceVisit: jest.fn(),
        getEntityServiceProviderListSearch: jest.fn(),
        setServiceVisitDate: jest.fn(),
        goToServiceVisitProcessing: jest.fn(),
        saveContextData: jest.fn(),
        createNewConversation: jest.fn(),
        createDataStore: jest.fn(),
        goToAssessmentVisitProcessing: jest.fn(),
        saveScheduleType: jest.fn()

}


describe("QuickMenu Processing - QuickMenu", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <QuickMenu dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the QuickMenu', () => {
        expect(shallowWrapper).toBeDefined();
    });

    it('Check the onClickVideoConference section', () => {
        shallowWrapper.instance().onClickVideoConference({
            coreoHomeUserId:243,
            patientId:234,
            patientFirstName:'',
            patientLastName:'',
            patientImage:''
        })
    });

    it('Check the onClickVideoConference section', () => {
        shallowWrapper.instance().onClickVideoConference()
    });

    it('Check the onClickConversation section', () => {
        shallowWrapper.instance().onClickConversation({
            coreoHomeUserId:243,
            patientId:234,
            patientFirstName:'',
            patientLastName:'',
            patientImage:''
        })
    });

    it('Check the onClickConversation section', () => {
        shallowWrapper.instance().onClickConversation()
    });

    it('Check the handlePhoneNumber section', () => {
        shallowWrapper.instance().handlePhoneNumber({phoneNumber:3425345345345})
    });

    it('Check the goToServiceVisits section', () => {
        shallowWrapper.instance().goToServiceVisits({
            visitTypeId:34,
            visitStatusId :43,            
        })
    });

    it('Check the goToServiceVisits section', () => {
        shallowWrapper.instance().goToServiceVisits({
            visitTypeId:34,
            visitStatusId :4453,            
        })
    });

    it('Check the onClickServiceVisitAction section', () => {
        shallowWrapper.instance().onClickServiceVisitAction({
            visitDate:"24/12/2019",
            visitStatusId :43,            
        })
    });

    it('Check the getOptions section', () => {
        shallowWrapper.instance().getOptions({
            conversations:{visitStatusId:43,isPaymentModeEnabled:true},
            visitStatusId :4453,            
        })
    });

    it('Check the closeStandByModeAlertPopup section', () => {
        shallowWrapper.instance().closeStandByModeAlertPopup()
    });


    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getServiceProviderVists({},234,true);
        mapDispatchToProps(dispatch).getServiceVisitCount({});
        mapDispatchToProps(dispatch).getEntityServiceProviderList({});
        mapDispatchToProps(dispatch).updateEntityServiceVisit({});
        mapDispatchToProps(dispatch).getEntityServiceProviderListSearch({});
        mapDispatchToProps(dispatch).setServiceVisitDate({});
        mapDispatchToProps(dispatch).goToServiceVisitProcessing({});
        mapDispatchToProps(dispatch).saveContextData({});
        mapDispatchToProps(dispatch).createNewConversation({});
        mapDispatchToProps(dispatch).createDataStore({});
        mapDispatchToProps(dispatch).goToAssessmentVisitProcessing({});
        mapDispatchToProps(dispatch).saveScheduleType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })
})