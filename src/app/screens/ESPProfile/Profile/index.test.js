import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { Profile, mapDispatchToProps, mapStateToProps } from './index.js';


// jest.mock('../AuthCover', () => ({
//   AuthCover: 'mockAuthover'
// }))

Enzyme.configure({ adapter: new Adapter() })

let wrapper, store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    profileState:{ 
        serviceOfferedState: {
            serviceOfferedList:[{}]
        },
        LanguagesState : { 
            selectedLanguagesList :[{}],
        },
        progressIndicatorState : {
            profilePercentage:34,
        },
        PersonalDetailState:{
            personalDetail:{}
        }
    },
    asyncMessageState: {
        canCreateConversation:true
    },
    telehealthState: { 
        isInvitationCame : true,
        initiatorFirstName:'Test',
        initiatorLastName:"test"
    },
    personalDetail: {
        address:[],
    },
    getProfilePercentage: jest.fn(),
    navigateProfileHeader: jest.fn(),
    clearInvitaion: jest.fn(),
    joinVideoConference: jest.fn(),
    goToDashboard: jest.fn(),
    rejectConference: jest.fn(),
    goBack: jest.fn(),
    onLogout:jest.fn()

}

store = mockStore(defaultState);



describe("Profile Component", function () {
  let wrapper;

  beforeEach(() => {
    const props = defaultState;
    wrapper = shallow(
        <Profile  dispatch={dispatch} store={store} {...defaultState} />
    )    
    }); 

    it('Check the EntityPersonalDetail Details body', () => {
      wrapper.setState({
      })
      expect(wrapper).toBeDefined()
    }); 

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getProfilePercentage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).navigateProfileHeader();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearInvitaion();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).joinVideoConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToDashboard();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).rejectConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();        
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
    expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the validationPopUp function', () => {
        wrapper.instance().validationPopUp()
    })

    it('Check the stayOnProfile function', () => {
        wrapper.instance().stayOnProfile()
    })

    it('Check the goToDashboard function', () => {
        wrapper.instance().goToDashboard()
    })

    it('Check the navigateProfileHeader function', () => {
        wrapper.instance().navigateProfileHeader('messagesummary')
    })

    it('Check the navigateProfileHeader function', () => {
        wrapper.instance().navigateProfileHeader('contact')
    })

    it('Check the navigateProfileHeader function', () => {
        wrapper.instance().navigateProfileHeader('logout')
    })

    it('Check the navigateProfileHeader function', () => {
        wrapper.instance().navigateProfileHeader('')
    })
  
});