import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { VerifyContact, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../components', () => ({
    CoreoWizScreen: 'mockCoreoWizScreen'
}))

const mockStore = configureStore();
Enzyme.configure({ adapter: new Adapter() })
let store;
const props = {
    onClickCancel: jest.fn(),
    sendPassCode: jest.fn(),
    verifyPasscode: jest.fn(),
    getUserData: jest.fn(),
    formDirty: jest.fn(),
    getEntityUserData: jest.fn(),
    onboardingState: {
        verifyContactState: {
            loading: false,
            serviceProviderDetails: [],
            isPasscodeSent: false,
            isPasscodeNotMatch: false,
            isPasscodeMatch: false,
            isPasscodeExpired: false
        }
    },
    match: {
        params: {
            type: 'EU'
        }
    },
    serviceProviderDetails: {
        serviceProviderId: 12
    }
}
store = mockStore(props)

describe('VerifyContact Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<VerifyContact {...props} store={store} />)
    })

    it('Check VerifyUserID Component contains test-verifyContact', () => {
        wrapper.setProps({
            isPasscodeMatch: false,
            isPasscodeNotMatch: true,
            isPasscodeExpired: true
        })
        expect(wrapper.find('[test-verifyContact="test-verifyContact"]').length).toEqual(1);
    })

    it('Check the Input contains passcode', () => {
        let e = {
            target: {
                value: 'ad'
            }
        }
        expect(wrapper.find('#passcode').props().textChange(e));
    });

    it('Check the Input contains passcode', () => {
        expect(wrapper.find('.modal-sm').props().onConfirm());
        expect(wrapper.find('.modal-sm').props().onCancel());
    });

    it('Check the onClickSendPasscode function', () => {
        wrapper.instance().onClickSendPasscode()
    });

    it('Check the onClickReSendPasscode function', () => {
        wrapper.instance().onClickReSendPasscode()
    });

    it('Check the onClickButtonNext function', () => {
        wrapper.instance().onClickButtonNext()
    });

    it('Check the validatePasscode function', () => {
        wrapper.instance().validatePasscode()
    });

    it('Check the onClickButtonCancel function', () => {
        wrapper.instance().onClickButtonCancel()
    });

    it('Check the componentDidMount function', () => {
        wrapper.setProps({
            match: {
                params: {
                    type: 'PG'
                }
            }
        })
        wrapper.instance().componentDidMount()
    });

    it('Check the onChangePassword function', () => {
        let e = {
            target: {
                value: 'aa'
            }
        }
        wrapper.instance().onChangePassword(e)
    });

    it('Check the componentWillReceiveProps function', () => {
        let nextProps = {
            serviceProviderDetails: {
                mobileNumber: "9165648715"
            }
        }
        wrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check VerifyUserID Component contains test-forget-body', () => {
        wrapper.setProps({
            isPasscodeMatch: true,
        })
        expect(wrapper.find('[test-verifyContact="test-verifyContact"]').length).toEqual(1);
    })

    it('should test initial state', () => {
        expect(mapStateToProps(props)).toBeDefined();
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onClickCancel();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).sendPassCode({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).verifyPasscode({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getUserData();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).formDirty();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getEntityUserData();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});