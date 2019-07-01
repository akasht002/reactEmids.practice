import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { AsideScreenCover, mapDispatchToProps, mapStateToProps } from './AsideScreenCover';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../utils/userUtility', () => ({
    isEntityServiceProvider: () => ({
        getUserInfo: () => ({
            isEntityServiceProvider: true,
            serviceProviderTypeId: 'I'
        })
    })
}))

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true,
        serviceProviderTypeId: 'I'
    })
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    profileImgData: {
        image: ''
    },
    isFormDirty: true,
    roomId: 10,
    profileState: {
        progressIndicatorState: {
            profilePercentage: 10
        },
        PersonalDetailState: {
            imageData: '',
            personalDetail: [],
            serviceProviderTypeId: 2
        }
    },
    personalDetail: {
        serviceProviderTypeId: 2
    },
    authState: {
        userAgreementState: {
            isEulaUpdated: true,
            eulaContent: ''
        },
        userState: {
            isFormDirty: true
        }
    },
    match: {
        url: ''
    },
    aboutUsState: {
        aboutUsContent: '',
        buildVersion: 10
    },
    loadingState: {
        isLoading: true
    },
    asyncMessageState: {
        canCreateConversation: true,
        dashboardMessageCount: 100
    },

    telehealthState: {
        isInvitationCame: false,
        initiatorFirstName: 'TEST',
        initiatorLastName: 'TEST',
        roomId: 10,
        token: '',
        createData: true
    },
    createData: true,
    getUserInfo: jest.fn(),
    getImage: jest.fn(),
    onClickOk: jest.fn(),
    goToProfile: jest.fn(),
    getPersonalDetail: jest.fn(),
    navigateProfileHeader: jest.fn(),
    canServiceProviderCreateMessage: jest.fn(),
    onLogout: jest.fn(),
    clearRoom: jest.fn(),
    joinVideoConference: jest.fn(),
    rejectConference: jest.fn(),
    getDashboardMessageCount: jest.fn(),
    setMenuClicked: jest.fn(),
    setIsFormDirty: jest.fn(),
    createVideoConference: jest.fn(),
    createDataStore: jest.fn(),
    getProfilePercentage: jest.fn(),
    getUserMedia: jest.fn()
}

store = mockStore(defaultState);

describe("VisitSummary", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <AsideScreenCover dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the AsideScreenCover form body', () => {
        expect(shallowWrapper.find('.BrandNameWidget').length).toEqual(1);
    });

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            createData: false
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
    });

    it('Check the successCallbackOnDeviceStatus  function', () => {
        shallowWrapper.instance().successCallbackOnDeviceStatus(true, null, null);
        shallowWrapper.instance().successCallbackOnDeviceStatus(null, true, null);
        shallowWrapper.instance().successCallbackOnDeviceStatus(null, null, true);
    });

    it('Check the errorCallbackOnDeviceStatus   function', () => {
        shallowWrapper.instance().errorCallbackOnDeviceStatus(true, null, null);
        shallowWrapper.instance().errorCallbackOnDeviceStatus(null, true, null);
        shallowWrapper.instance().errorCallbackOnDeviceStatus(null, null, true);
    });

    it('Check the checkDeviceStatus    function', () => {
        shallowWrapper.instance().checkDeviceStatus(true, null, null);
        shallowWrapper.instance().checkDeviceStatus(null, true, null);
        shallowWrapper.instance().checkDeviceStatus(null, null, true);
    });

    it('Check the navigateProfileHeader  function', () => {
        shallowWrapper.instance().navigateProfileHeader('visitNotification');
        shallowWrapper.instance().navigateProfileHeader('messagesummary');
        shallowWrapper.instance().navigateProfileHeader('contact');
        shallowWrapper.instance().navigateProfileHeader('telehealth');
        shallowWrapper.instance().navigateProfileHeader('logout');
        shallowWrapper.instance().navigateProfileHeader('aboutUs');
        shallowWrapper.instance().navigateProfileHeader('profile');
    });

    it('Check the checkIsFormDirty true function', () => {
        shallowWrapper.setProps({ isFormDirty: false })
        shallowWrapper.instance().checkIsFormDirty('messagesummary');
        shallowWrapper.instance().checkIsFormDirty('logout');
        shallowWrapper.instance().checkIsFormDirty('profile');
    });

    it('Check the checkIsFormDirty false function', () => {
        shallowWrapper.setProps({ isFormDirty: false })
        shallowWrapper.instance().checkIsFormDirty('aboutUs');
    });

    it('Check the checkIsFormDirty true function', () => {
        shallowWrapper.setProps({ isFormDirty: true })
    });

    it('Check the goToProfile  false function', () => {
        shallowWrapper.setProps({ roomId: '' })
        shallowWrapper.instance().goToProfile();
    });

    it('Check the goToProfile  true function', () => {
        shallowWrapper.setProps({ roomId: 111 })
        shallowWrapper.instance().goToProfile();
    });

    it('Check the onErrorJoiningVideo function', () => {
        shallowWrapper.setState({ isInvitationCame: true })
        shallowWrapper.instance().onErrorJoiningVideo();
    });

    it('Check the onSuccessJoiningVideo  function', () => {
        shallowWrapper.setState({ isInvitationCame: true, isTelehealthMediaAvailable: true })
        shallowWrapper.instance().onSuccessJoiningVideo();
    });

    it('Check the checkVideoCompatibility     function', () => {
        shallowWrapper.instance().checkVideoCompatibility(true, null, null);
        shallowWrapper.instance().checkVideoCompatibility(null, true, null);
        shallowWrapper.instance().checkVideoCompatibility(null, null, true);
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getImage();
        mapDispatchToProps(dispatch).onClickOk();
        mapDispatchToProps(dispatch).goToProfile();
        mapDispatchToProps(dispatch).getPersonalDetail();
        mapDispatchToProps(dispatch).navigateProfileHeader();
        mapDispatchToProps(dispatch).canServiceProviderCreateMessage();
        mapDispatchToProps(dispatch).onLogout();
        mapDispatchToProps(dispatch).clearRoom();
        mapDispatchToProps(dispatch).joinVideoConference();
        mapDispatchToProps(dispatch).rejectConference();
        mapDispatchToProps(dispatch).getDashboardMessageCount();
        mapDispatchToProps(dispatch).setMenuClicked();
        mapDispatchToProps(dispatch).setIsFormDirty();
        mapDispatchToProps(dispatch).createVideoConference();
        mapDispatchToProps(dispatch).createDataStore();
        mapDispatchToProps(dispatch).getProfilePercentage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check mapStateToProps', () => {
        const initialState = {
            profileImgData: {
                image: ''
            },
            isFormDirty: true,
            roomId: 10,
            profileState: {
                progressIndicatorState: {
                    profilePercentage: 10
                },
                PersonalDetailState: {
                    imageData: '',
                    personalDetail: [],
                    serviceProviderTypeId: 2
                }
            },
            personalDetail: {
                serviceProviderTypeId: 2
            },
            authState: {
                userAgreementState: {
                    isEulaUpdated: true,
                    eulaContent: ''
                },
                userState: {
                    isFormDirty: true
                }
            },
            match: {
                url: ''
            },
            aboutUsState: {
                aboutUsContent: '',
                buildVersion: 10
            },
            loadingState: {
                isLoading: true
            },
            asyncMessageState: {
                canCreateConversation: true,
                dashboardMessageCount: 100
            },
        
            telehealthState: {
                isInvitationCame: false,
                initiatorFirstName: 'TEST',
                initiatorLastName: 'TEST',
                roomId: 10,
                token: '',
                createData: true
            },
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });


})