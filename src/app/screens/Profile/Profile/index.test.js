import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { Profile, mapDispatchToProps, mapStateToProps} from './index.js';

 jest.mock('../../../services/http', () => ({
    getUserInfo : () => ( {
        serviceProviderTypeId  :1,
        isEntityServiceProvider :true
    })
}))


 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    profilePercentage: [],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    personalDetail:{
        serviceProviderTypeId:1
    },
    profileState:{
        progressIndicatorState : {
            profilePercentage:67, 
        },
        serviceOfferedState:{serviceOfferedList:[{}]},
        LanguagesState:{selectedLanguagesList:[{}]},
        PersonalDetailState:{personalDetail:{},isUser:true},

    },
    asyncMessageState:{
        canCreateConversation:true
    },
    loadingState:{isLoading:true},
    telehealthState:{ isInvitationCame : true,initiatorFirstName:true,initiatorLastName:''},
    serviceProviderTypeId:1,
    getProfilePercentage: jest.fn(),
    navigateProfileHeader: jest.fn(),
    clearInvitaion: jest.fn(),
    joinVideoConference: jest.fn(),
    goToDashboard: jest.fn(),
    rejectConference: jest.fn(),
    goBack: jest.fn(),
    clearServiceProviderId: jest.fn(),
    getPersonalDetail: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Profile dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("Profile", function () {
    let wrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = shallow(
            <Profile dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Profile Details body', () => {
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
          mapDispatchToProps(dispatch).clearServiceProviderId();
          expect(dispatch.mock.calls[0][0]).toBeDefined();                
          mapDispatchToProps(dispatch).getPersonalDetail();
          expect(dispatch.mock.calls[0][0]).toBeDefined();
      });
  
      it('should test mapStateToProps state', () => {
            expect(mapStateToProps(defaultState)).toBeDefined();
      });

      it('Check the getPersonalDetail function', () => {
          wrapper.setProps({
            personalDetail : { serviceProviderTypeId :1,serviceProviderType : "Individual" }
          })
          wrapper.instance().getPersonalDetail()
      })

      it('Check the getPersonalDetail function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getPersonalDetail()
      })


      it('Check the getAvailability function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getAvailability()
      })

      it('Check the getServiceOffered function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getServiceOffered()
      })

      it('Check the getServiceArea function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getServiceArea()
      })


      it('Check the getSkills function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getSkills()
      })

      it('Check the getLanguages function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getLanguages()
      })

      it('Check the getCertification function', () => {
        wrapper.setProps({
          personalDetail : { serviceProviderTypeId :1,serviceProviderType : "EntityServiceProvider" }
        })
        wrapper.instance().getCertification()
      })


      it('Check the validationPopUp function', () => {
        wrapper.setProps({
            isUser :true
        })
        wrapper.instance().validationPopUp()
      })

      it('Check the validationPopUp function', () => {
        wrapper.setProps({
            isUser :false,
            serviceOfferedList:[],
            LanguagesList:[]
        })
        wrapper.instance().validationPopUp()
      })

      it('Check the validationPopUp function', () => {       
        wrapper.instance().validationPopUp()
      })


      it('Check the stayOnProfile function', () => {       
        wrapper.instance().stayOnProfile()
      })

      it('Check the componentWillUnmount function', () => {       
        wrapper.instance().componentWillUnmount()
      })

      it('Check the goToDashboard function', () => {       
        wrapper.instance().goToDashboard()
      })

      it('Check the getEducation function', () => {
        wrapper.setProps({
            personalDetail :{serviceProviderTypeId :1}
        })
        wrapper.instance().getEducation()
      })

      it('Check the navigateProfileHeader function', () => {       
        wrapper.instance().navigateProfileHeader('visitNotification')
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