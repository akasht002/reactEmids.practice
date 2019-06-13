import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { ConversationSummary } from './index.js';

 jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        serviceProviderTypeId: 'I'
    })
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    conversation: [],
    // certificationFieldDetails: {
    //     authority: '',
    //     certificationName: '',
    //     licenceNumber: ''
    // },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    fetchConversationSummary: jest.fn(),
    createNewConversation: jest.fn(),
    gotoConversation: jest.fn(),
    getUnreadMsgCounts: jest.fn(),
    canServiceProviderCreateMessage: jest.fn(),
    getConversationCount: jest.fn(),
    openedAsyncPage: jest.fn(),
    clearCurrentOpenConversation: jest.fn(),
    setActivePageNumber: jest.fn()
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
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <ConversationSummary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the ConversationSummary form body', () => {
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     // it('Check the reset', () => {
    //     shallowWrapper.instance().reset();
    // });

     // it('Check the toggleCertification', () => {
    //     shallowWrapper.instance().toggleCertification();
    // });

     // it('Check the checkValidation true', () => {
    //     shallowWrapper.instance().checkValidation(true, 'VTU', 'BE', '123');
    // });

     // it('Check the checkValidation false', () => {
    //     shallowWrapper.instance().checkValidation(true, '', '', '');
    // });

     // it('Check the addCertification', () => {
    //     shallowWrapper.instance().addCertification();
    // });

     // it('Check the showModalOnDelete', () => {
    //     shallowWrapper.instance().showModalOnDelete({ target: { id: 1 } });
    // });

     // it('Check the editCertification', () => {
    //     shallowWrapper.instance().editCertification({ target: { id: 1 } });
    // });

     // it('Check the updateCertification', () => {
    //     shallowWrapper.instance().updateCertification();
    // });

     // it('Check the deleteCertification', () => {
    //     shallowWrapper.instance().deleteCertification();
    // });

     // it('Check the CertificationModal form body', () => {
    //     expect(wrapper.find('.CertificationModal').length).toEqual(1);
    // });

 }); 