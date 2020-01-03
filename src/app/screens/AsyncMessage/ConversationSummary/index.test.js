import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { ConversationSummary,mapDispatchToProps, mapStateToProps } from './index.js';

 jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        serviceProviderTypeId: 'I'
    }),
    isEntityServiceProvider : () => ({

    })
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    conversation: [],
    authState: {
        userState: {
            userData: {
                userInfo: {
                    loggedInUser : {
                        serviceProviderId:23
                    }
                }
            }
        }
    },
    loggedInUser : {
        serviceProviderId:23
    },
    fetchConversationSummary: jest.fn(),
    createNewConversation: jest.fn(),
    gotoConversation: jest.fn(),
    getUnreadMsgCounts: jest.fn(),
    canServiceProviderCreateMessage: jest.fn(),
    getConversationCount: jest.fn(),
    openedAsyncPage: jest.fn(),
    clearCurrentOpenConversation: jest.fn(),
    setActivePageNumber: jest.fn(),
    onClearParticipantContainer:true,
    onSetDisplayParticipantModal:jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ConversationSummary dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("ConversationSummary", function () {
    let shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        shallowWrapper = shallow(
            <ConversationSummary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the ConversationSummary form body', () => {
        expect(shallowWrapper).toBeDefined()
    });

    
    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchConversationSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createNewConversation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).gotoConversation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getUnreadMsgCounts();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).canServiceProviderCreateMessage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getConversationCount();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).openedAsyncPage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getConversationCount();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).openedAsyncPage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();     
        mapDispatchToProps(dispatch).clearCurrentOpenConversation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActivePageNumber();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
   });

   it('Check the onClickConversation function', () => {
    shallowWrapper.instance().onClickConversation({},{})
   });

   it('Check the onClickConversation function', () => {
     shallowWrapper.instance().onClickConversation({},{})
   });

   it('Check the onSetDisplayParticipantModal function', () => {
    shallowWrapper.setProps({canCreateConversation:true})
    shallowWrapper.instance().onSetDisplayParticipantModal()
   });

   it('Check the onSetDisplayParticipantModal function', () => {
    shallowWrapper.setProps({canCreateConversation:false})
    shallowWrapper.instance().onSetDisplayParticipantModal()
   });

   it('Check the onCreateConversation function', () => {
    shallowWrapper.instance().onCreateConversation()
   });

   it('Check the gotoParticipantView function', () => {
    shallowWrapper.instance().gotoParticipantView()
   });

   it('Check the toggle function', () => {
    shallowWrapper.instance().toggle()
   });

   it('Check the onConfirmCreateConversationPermission  function', () => {
    shallowWrapper.instance().onConfirmCreateConversationPermission ()
   });

   it('Check the handlePageChange function', () => {
    shallowWrapper.instance().handlePageChange(23)
   });




 }); 