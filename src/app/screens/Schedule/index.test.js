import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { Schedule, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    serviceCategoryList: [],
    serviceTypeList: [],
    patientAddressList: [
        {
            "patientId": 1022,
            "addressId": 483,
            "stateName": "Missouri",
            "state": null,
            "city": "St. Louis ",
            "zip": 63141,
            "street": "482",
            "isPrimaryAddress": true,
            "isActive": true,
            "addressTypeId": null,
            "stateId": 25,
            "rowVersionId": null,
            "latitude": 38.4810944,
            "longitude": -100.461548
        }],
    stateList: [],
    posErrorMessage: '',
    isPosAddressValid: '',
    entityServiceProvidersList: [],
    recurringPatternList: [],
    daysList: [],
    disableShowmore: false,
    individualSchedulesDetails: {},
    isIndividualScheduleEdit: true,
    isAssessmentEdit: true,
    assessmentDetails: {},
    userType: 0,
    patientId: 1022,
    authState: {
        userState: {
            userData: { userInfo: '2' }
        }
    },
    scheduleState: {
        serviceCategoryList: [],
        serviceTypeList: [],
        patientAddressList: [{}],
        stateList: [],
        posErrorMessage: '',
        isPosAddressValid: '',
        entityServiceProvidersList: [],
        recurringPatternList: [],
        daysList: [],
        disableShowmore: false,
        individualSchedulesDetails: {
            weekly:{
                days:[]
            }
        },
        isIndividualScheduleEdit: true,
        isAssessmentEdit: true,
        assessmentDetails: {}
    },
    patientProfileState: {
        patientId: 1022
    },
    history: {
        push: jest.fn()
    },
    push: jest.fn(),
    getServiceCategory: jest.fn(),
    getServiceType: jest.fn(),
    getPatientAddress: jest.fn(),
    getStates: jest.fn(),
    setSelectedPos: jest.fn(),
    getValidPatientAddressSuccess: jest.fn(),
    getValidPatientAddress: jest.fn(),
    getEntityServiceProviderList: jest.fn(),
    getRecurringPattern: jest.fn(),
    getDays: jest.fn(),
    createSchedule: jest.fn(),
    editSchedule: jest.fn(),
    goToServicedetails: jest.fn(),
    getEntityServiceProviderListSearch: jest.fn(),
    selectESP: jest.fn(),
    clearESPListSchedule: jest.fn(),
    selectOrClearAllServiceType: jest.fn(),
    createOrEditAssessment: jest.fn(),
    clearServiceDetails:jest.fn(),
    isScheduleEdit: jest.fn(),
    assessmentEdit: jest.fn(),
    setAddNewScheduledClicked:jest.fn()
}

store = mockStore(defaultState)

describe('ServiceRequestDetail', function () {
    let shallowWrapper;
    beforeEach(() => {
        shallowWrapper = shallow(
            <Schedule dispatch={dispatch} store={store} {...defaultState} />
        )
    })

    it('Check the componentDidMount', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('Check the componentWillUnmount', () => {
        shallowWrapper.instance().componentWillUnmount();
    });   

    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({patientId:false})
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the selectForAssessment', () => {
        shallowWrapper.instance().selectForAssessment();
    });

    it('Check the selectNew', () => {
        shallowWrapper.instance().selectNew();
    });

    it('Check the handleChangePlanType', () => {
        shallowWrapper.instance().handleChangePlanType(2);
    });

    it('Check the handleServiceCategory', () => {
        shallowWrapper.setState({
            checkedServiceCategoryId: 2,
            serviceTypeSelected: false
        })
        shallowWrapper.instance().handleChangePlanType(2);
    });

    it('Check the handleServiceType', () => {
        const data = {
            selected: true
        }
        shallowWrapper.instance().handleServiceType(data, { target: { value: 123 } });
    });

    it('Check the selectAllTypes true', () => {
        shallowWrapper.instance().selectAllTypes(true);
    });

    it('Check the selectAllTypes false', () => {
        shallowWrapper.instance().selectAllTypes(false);
    });

    it('Check the handlePOSAddress val', () => {
        shallowWrapper.instance().handlePOSAddress({ target: { value: 123 } });
    });

    it('Check the handlePOSAddress zero', () => {
        shallowWrapper.instance().handlePOSAddress({ target: { value: '0' } });
    });

    it('Check the handlePatientAddress', () => {
        const data = {
            isPrimaryAddress: true,
            patientAddressId: 'addressId',
            selectedPOS: 'addressId',
            street: 'street',
            city: 'city',
            zip: 'zip',
            statelabel: 'stateName',
            selectedOptionState: 'stateId',
            addressType: 'addressTypeId',
            latitude: 'latitude',
            longitude: 'longitude',
            state: 'stateId',
            isDefaultAddress: true
        }
        shallowWrapper.setState({
            patientAddressId: data.addressId,
            selectedPOS: data.addressId,
            street: data.street,
            city: data.city,
            zip: data.zip,
            statelabel: data.stateName,
            selectedOptionState: data.stateId,
            addressType: data.addressTypeId,
            latitude: data.latitude,
            longitude: data.longitude,
            state: data.stateId,
            isDefaultAddress: true
        })
        shallowWrapper.instance().handlePatientAddress(data);
    });

    it('Check the handelNewAddress', () => {
        shallowWrapper.instance().handelNewAddress({ target: { value: '0' } });
    });

    it('Check the statehandleChange', () => {
        shallowWrapper.instance().statehandleChange();
    });

    it('Check the handleAssignServiceProvider', () => {
        shallowWrapper.instance().handleAssignServiceProvider(111);
    });

    it('Check the handleAdditionInfo', () => {
        shallowWrapper.instance().handleAdditionInfo({ target: { value: '0' } });
    });

    it('Check the handleChangeScheduleType', () => {
        shallowWrapper.instance().handleChangeScheduleType(true);
    });

    it('Check the dateChanged', () => {
        shallowWrapper.instance().dateChanged("09/04/2019");
    });

    it('Check the dateChangedRaw', () => {
        shallowWrapper.instance().dateChangedRaw("09/04/2019");
    });

    it('Check the todateChanged', () => {
        shallowWrapper.instance().todateChanged("09/04/2019");
    });

    it('Check the todateChangedRaw', () => {
        shallowWrapper.instance().todateChangedRaw("09/04/2019");
    });

    it('Check the handleChangeStartTime', () => {
        shallowWrapper.instance().handleChangeStartTime("09/04/2019");
    });

    it('Check the handleChangeEndTime', () => {
        shallowWrapper.instance().handleChangeEndTime("09/04/2019");
    });

    it('Check the handleSelectDailyOptionField', () => {
        shallowWrapper.instance().handleSelectDailyOptionField(1);
    });

    it('Check the handleSelectWeeklyOptionField', () => {
        shallowWrapper.instance().handleSelectDailyOptionField(2);
    });

    it('Check the handleChangeDailyDayOccurence', () => {
        shallowWrapper.instance().handleChangeDailyDayOccurence(1);
    });

    it('Check the handleChangeWeeklyDayOccurence     ', () => {
        shallowWrapper.instance().handleChangeWeeklyDayOccurence(2);
    });

    it('Check the handleChangeDaysSelection  ', () => {
        shallowWrapper.instance().handleChangeDaysSelection({ target: { checked: true } });
    });

    it('Check the handleChangeMonthlySelectionFirst   ', () => {
        shallowWrapper.instance().handleChangeMonthlySelectionFirst(222);
    });

    it('Check the handleChangeMonthlySelectionSecond    ', () => {
        shallowWrapper.instance().handleChangeMonthlySelectionSecond(222);
    });

    it('Check the handleChangeMonthlyDay    ', () => {
        shallowWrapper.instance().handleChangeMonthlyDay(222);
    });

    it('Check the handleChangeMonthlyMonths     ', () => {
        shallowWrapper.instance().handleChangeMonthlyMonths(222);
    });

    it('Check the handleChangeSelectedWeeks      ', () => {
        shallowWrapper.instance().handleChangeSelectedWeeks(222);
    });

    it('Check the handleChangeSelectedDays      ', () => {
        shallowWrapper.instance().handleChangeSelectedDays(222);
    });

    it('Check the handleChangeMonthlyMonthsSecond       ', () => {
        shallowWrapper.instance().handleChangeMonthlyMonthsSecond(222);
    });

    it('Check the toggleSearch        ', () => {
        shallowWrapper.instance().toggleSearch(222);
    });

    it('Check the handleSearchkeyword   ', () => {
        shallowWrapper.instance().handleSearchkeyword({ target: { checked: true } });
    });

    it('Check the handleSearchData   ', () => {
        shallowWrapper.instance().handleSearchData();
    });

    it('Check the validate    ', () => {
        shallowWrapper.instance().validate();
    });

    it('Check the checkValidAddress     ', () => {
        shallowWrapper.instance().checkValidAddress();
    });

    it('Check the saveAssessment     ', () => {
        shallowWrapper.instance().saveAssessment();
    });

    it('Check the savePlan      ', () => {
        shallowWrapper.instance().savePlan();
    });

    it('Check the clickShowMore       ', () => {
        shallowWrapper.instance().clickShowMore();
    });

    it('Check the onClickCancel        ', () => {
        shallowWrapper.instance().onClickCancel();
    });


    it('Check the goToServicedetails        ', () => {
        shallowWrapper.instance().goToServicedetails();
    });    

    it('Check the showPhoneNumber        ', () => {
        shallowWrapper.instance().showPhoneNumber();
    });


    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getServiceCategory({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getServiceType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getPatientAddress({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getStates({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setSelectedPos({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getValidPatientAddressSuccess({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getValidPatientAddress({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getEntityServiceProviderList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getRecurringPattern({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getDays({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).createSchedule({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).editSchedule({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getEntityServiceProviderListSearch({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).selectESP({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).clearESPListSchedule({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).selectOrClearAllServiceType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).createOrEditAssessment({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).isScheduleEdit({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).assessmentEdit({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check mapStateToProps', () => {
        const initialState = {
            scheduleState: {
                serviceCategoryList: [],
                serviceTypeList: [],
                patientAddressList: [],
                stateList: [],
                posErrorMessage: '',
                isPosAddressValid: '',
                entityServiceProvidersList: [],
                recurringPatternList: [],
                daysList: [],
                disableShowmore: false,
                individualSchedulesDetails: {},
                isIndividualScheduleEdit: true,
                isAssessmentEdit: true,
                assessmentDetails: {}
            },
            patientProfileState: {
                patientId: ''
            },
            authState: {
                userState: {
                    userData: {
                        userInfo: {}
                    }
                }
            }
        };
        expect(mapStateToProps(initialState)).toBeDefined();
    });
})