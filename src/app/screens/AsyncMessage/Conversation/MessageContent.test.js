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
    messageText:'SampleText',
    messagesEnd: jest.fn(),
    scrollIntoView:jest.fn(),
    loggedInUser: { userType:'I',patientId:34,userId:23},
    currentConversation: {conversationId:23},
    conversation: {conversationId:23,isActive:true,createdBy :'21/03/2019'},
    goToConversationSummary:jest.fn(),
    getConversationImageWithImageId: jest.fn(),
    clearConversationImageUrl:jest.fn(),
    updateReadStatus: jest.fn()
}

describe("ProfileType", function () {
    let shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        shallowWrapper = shallow(
            <MessageContent dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Conversation component contains MessageCardWidget', () => {
        expect(shallowWrapper.find('.table').length).toEqual(1);
    });
});