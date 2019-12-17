import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Conversation,mapStateToProps,mapDispatchToProps } from './index';

jest.mock('./MessageContent', () => ({
    MessageContent: 'mockMessageContent'
}))

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('./ParticipantContent', () => ({
    ParticipantContent: 'mockParticipantContent'
}))


// jest.mock('../../../../utils/userUtility', () => ({
//     getUserInfo: () => ({
//         careTeamId: 12
//     })
// }))


Enzyme.configure({ adapter: new Adapter() })

let wrapper, store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    title:[],
    loggedInUser:{userType:'I'},
    userType:'I',  
    visitServiceTableList: [],
    conversation : { participantList:[{}] },
    firstName:'',
    asyncMessageState: {
        conversation: [],
        isLoading: false,
        currentConversation: [],
        removeParticipantConcurrencyExist: false
    },
    authState: {
        userState: {
            userData: {
                userInfo: {userType:'I'}
            }
        }
    },
    match: {
        params: {
            id: 12
        }
    },
    currentConversation: {
        title: 'sdcfs'
    }, 
    closeProfileOptions: jest.fn(),
    getConversations: jest.fn(),	
    onSaveTitle: jest.fn(),	
    sendMessage: jest.fn(),	
    leaveConversation: jest.fn(),	
    pushConversation: jest.fn(),	
    updateUnreadCount: jest.fn(),
    openedAsyncPage: jest.fn(),
    setRemoveParticipantConcurrency: jest.fn(),
    joinGroup: jest.fn(),
    removeFromGroup: jest.fn(),
    goToSummary: jest.fn(),
    push: jest.fn(),
    onConfirmRemoveParticipant:jest.fn()
};

store = mockStore(defaultState);


describe("Conversation", function () {
    let shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        let scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
        shallowWrapper = shallow(
            <Conversation dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Conversation component contains MessageCardWidget', () => {
        expect(shallowWrapper.find('.container-fluid SPContentWidget MessageCardWidget').length).toEqual(0);
    });

    it('Check the toggleParticipantList function', () => {
        shallowWrapper.instance().toggleParticipantList()
     });

     it('Check the componentDidMount function', () => {
        shallowWrapper.instance().componentDidMount()
     });

     it('Check the componentDidMount function', () => {
        shallowWrapper.setProps({
            currentConversation: {conversationId:23}
            },
            {
                loggedInUser:{userType:'I'}
            })
        shallowWrapper.instance().componentDidMount()
     });

     it('Check the onChangeTitle function', () => {
        shallowWrapper.instance().onChangeTitle({target:{value:''}})
     });

     it('Check the onToggleEditTitle function', () => {
        shallowWrapper.instance().onToggleEditTitle({target:{value:''}})
     });

     it('Check the onSubmitChangeTitle function', () => {
        shallowWrapper.instance().onSubmitChangeTitle()
     });

     it('Check the displayWarningPopup function', () => {
        shallowWrapper.instance().displayWarningPopup()
     });

     it('Check the closePreview function', () => {
        shallowWrapper.instance().closePreview()
     });

     it('Check the onImageUpload function', () => {
        shallowWrapper.instance().onImageUpload()
     });

     it('Check the onClickSendMessage function', () => {
        shallowWrapper.instance().onClickSendMessage('')
     });

     it('Check the leaveConversation function', () => {
        shallowWrapper.instance().leaveConversation()
     });

     it('Check the leaveConversation function', () => {
        shallowWrapper.instance().leaveConversation()
     });

     it('Check the onChangeMessage function', () => {
        shallowWrapper.instance().onChangeMessage({target:{value:''}})
     });

     it('Check the closeOption function', () => {
        shallowWrapper.instance().closeOption()
     });

     it('Check the setIsDirty function', () => {
        shallowWrapper.instance().setIsDirty(true,'')
     });

     it('Check the setDisplayGreyedOut  function', () => {
        shallowWrapper.instance().setDisplayGreyedOut ()
     });

     it('Check the isDirtydisplayWarningPopup function', () => {
        shallowWrapper.instance().isDirtydisplayWarningPopup()
     });

     it('Check the gotoParticipantView function', () => {
        shallowWrapper.instance().gotoParticipantView()
     });

     it('Check the gotoParticipantView function', () => {
        shallowWrapper.instance().gotoParticipantView()
     });

     it('Check the gotoParticipantView function', () => {
         shallowWrapper.instance().setState({isMessageContentIsDirty:true})
        shallowWrapper.instance().gotoParticipantView()
     });

     it('Check the onInvalidImageSelection function', () => {
       shallowWrapper.instance().onInvalidImageSelection()
    });

    it('Check the onConfirmInvalidImageSelection function', () => {
        shallowWrapper.instance().onConfirmInvalidImageSelection()
     });

     it('Check the onCilckRemoveParticipant function', () => {
        shallowWrapper.instance().onCilckRemoveParticipant()
     });

     it('Check the onCancelRemoveParticipant function', () => {
        shallowWrapper.instance().onCancelRemoveParticipant()
     });

     it('Check the onConfirmRemoveParticipant function', () => {
        shallowWrapper.instance().onConfirmRemoveParticipant()
     });

     it('Check the onCancelTitleWarning function', () => {
        shallowWrapper.instance().onCancelTitleWarning()
     });

     it('Check the onConfirmRemoveParticipant function', () => {
        shallowWrapper.instance().onConfirmRemoveParticipant()
     });

     it('Check the toggle function', () => {
        shallowWrapper.instance().toggle()
     });

     it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
     });


     it('Check maptoprops', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getConversations(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).onSaveTitle(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).sendMessage(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).leaveConversation(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).pushConversation(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateUnreadCount(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).openedAsyncPage(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setRemoveParticipantConcurrency(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).joinGroup(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).removeFromGroup(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

   
})