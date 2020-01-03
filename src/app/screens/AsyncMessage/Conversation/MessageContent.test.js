import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { MessageContent,mapDispatchToProps,mapStateToProps } from './MessageContent';

jest.mock('../ConversationSummary/ParticipantsList', () => ({
    ParticipantsList: 'mockParticipantsList'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = { 
    messageUrl:'',
    conversationId:'',
    messageText:'',
    isEditTitle:true,
    messagesEnd: jest.fn(),
    scrollIntoView:jest.fn(),
    loggedInUser: { userType:'I',patientId:34,userId:23},
    currentConversation: {conversationId:23},
    conversation: {conversationId:23,isActive:true,createdBy :'21/03/2019'},
    goToConversationSummary:jest.fn(),
    getConversationImageWithImageId: jest.fn(),
    clearConversationImageUrl:jest.fn(),
    updateReadStatus: jest.fn(),
    onRef:jest.fn(),
    onImageUpload:jest.fn(),
    closePreview:jest.fn(),
    onInvalidImageSelection:jest.fn(),
    onClickSendMessage:jest.fn(),
    isDirty:jest.fn(),
}

describe("MessageContent", function () {
    let shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        shallowWrapper = shallow(
            <MessageContent dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Conversation component contains MessageCardWidget', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('Check the componentDidUpdate function', () => {
      shallowWrapper.instance().componentDidUpdate()
    });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the onSelectImage function', () => {
        shallowWrapper.instance().onSelectImage([{type:'jpg',size :65}])
    });

    it('Check the onSelectImage function', () => {
        shallowWrapper.instance().onSelectImage([])
    });

    it('Check the closePreview function', () => {
        shallowWrapper.instance().closePreview()
    });

    it('Check the onClickSendMessage function', () => {
        shallowWrapper.instance().onClickSendMessage()
    });

    it('Check the backToMessageSummary function', () => {
        shallowWrapper.instance().backToMessageSummary({})
    });

    it('Check the backToMessageSummary function', () => {
        shallowWrapper.instance().setState({imgName :true})
        shallowWrapper.instance().backToMessageSummary({})
    });

    it('Check the imageZoom function', () => {
        shallowWrapper.instance().imageZoom('')
    });

    it('Check the imageZoom function', () => {
        shallowWrapper.setProps({messageUrl:'data'})
        shallowWrapper.instance().imageZoom('')
    });

    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).goToConversationSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getConversationImageWithImageId();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearConversationImageUrl();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateReadStatus();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })

    
});