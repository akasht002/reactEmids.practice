import React from 'react';
import { getUserInfo } from '../../../utils/userUtility';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';

import { Profile,mapDispatchToProps, mapStateToProps} from './index';

jest.mock('../MyConnections', () => ({
    MyConnections: 'mockMyConnections'
  }))

jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../components', () => ({
    CoreoWizHeader: 'mockCoreoWizHeader'
}))

jest.mock('../../../utils/userUtility', () => ({
    getPatientData : () => ({
        firstName: "Name",
        lastName:'LName',
        imageData:{ image:'' },
        patientId:23,
        userType:'I'
    }),
    getUserInfo : () => ({
      firstName: "Name",
      lastName:'LName',
      imageData:{ image:'' },
      patientId:23,
      userType:'I'
  })
  }))
Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    patientProfileState:{
        patientId:34,
        userType:'I'
    },
    patientId:34,
    user:'',
    users: [],
    oidc:{
        user:''
    },
    userType:'',
    profileState:{        
        progressIndicatorState:0,
        PersonalDetailState:{
            personalDetail: [],
            updatePersonalDetailSuccess: false,
            cityDetail: [],
            genderDetail: [],
            imageData: '',
            patientId: null,
            userId: null,
            userType: '',
            isUser: false
        }
    },
    authState:{
        userState:{
            individualList:[],
            userData:{
                userInfo:{
                    userType:''
                }
            }
        },
        userAgreementState:
        {
            isEulaUpdated:''
        }
    },
    telehealthState:{
        isInvitationCame:false
    },
    loadingState:{
        isLoading:false
    },  
    impersinatelehealthStatetedData: {
        userType:''
    } ,
    userState:{
        personalDetail: [],
        updatePersonalDetailSuccess: false,
        cityDetail: [],
        genderDetail: [],
        imageData: '',
        patientId: null,
        userId: null,
        userType: '',
        isUser: false,
        impersinatedData:{
            userType:''
        }
    },
    clearInvitaion: jest.fn(),
    joinVideoConference: jest.fn(),
    goBack: jest.fn(),
    goToDashboard: jest.fn(),
    clearState: jest.fn(),

}


store = mockStore(defaultState);

describe("Profile", function () {
    let shallowWrapper;
    beforeEach(() => {
        const props = defaultState;
        shallowWrapper = shallow(
            <Profile dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the table body', () => {
        expect(shallowWrapper.find('.container-fluid p-0').length).toEqual(0);
    });
    

    it('Check the navigateProfileHeader -visitNotification  function', () => {
        shallowWrapper.instance().navigateProfileHeader('visitNotification')
    });

    it('Check the navigateProfileHeader -conversationsummary  function', () => {
        shallowWrapper.instance().navigateProfileHeader('conversationsummary')
    });    

    it('Check the navigateProfileHeader - logout  function', () => {
        shallowWrapper.instance().navigateProfileHeader('logout')
    });

    it('Check the navigateProfileHeader - other  function', () => {
        shallowWrapper.instance().navigateProfileHeader('other')
    }); 
    
    it('Check the navigateProfileHeader - contact  function', () => {
        shallowWrapper.instance().navigateProfileHeader('contact')
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).clearInvitaion();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).joinVideoConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToDashboard();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearState();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })

});