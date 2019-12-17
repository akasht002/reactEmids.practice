import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { SetPassword, mapDispatchToProps, mapStateToProps } from './index';

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
    onSetPassword: jest.fn(),
    getEulaContent: jest.fn(),
    getUserData: jest.fn(),
    onboardingState: {
        verifyContactState: {
            serviceProviderDetails: {
                userType: 's'
            }
        },
        setPasswordState: {
            loading: false,
            userEmail: ''
        }
    },
    authState: {
        userAgreementState: {
            eulaContent: ''
        }
    },
    match: {
        params: {
            type: 'EU'
        }
    },
    userType : 'EU'
}
store = mockStore(props)

describe('SetPassword Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SetPassword {...props} store={store} />)
    })

    it('Check VerifyUserID Component contains test-setPassword', () => {
        wrapper.setProps({
            isPasscodeMatch: false,
            isPasscodeNotMatch: true,
            isPasscodeExpired: true,
            userType: 'PG'
        })
        expect(wrapper.find('[test-setPassword="test-setPassword"]').length).toEqual(1);
    })

    it('contains event', () => {
        let e = {
            target: {
                value: ''
            },
            preventDefault() {}
        }
        expect(wrapper.find('[id="newPass"]').props().textChange(e));
        expect(wrapper.find('[id="newPass"]').props().onCopy(e));
        expect(wrapper.find('[id="newPass"]').props().onPaste(e));
        expect(wrapper.find('[id="rePass"]').props().textChange(e));
        expect(wrapper.find('[id="rePass"]').props().onPaste(e));
        expect(wrapper.find('[id="rePass"]').props().onCopy(e));
        expect(wrapper.find('[id="defaultCheck1"]').props().onChange(e));
        expect(wrapper.find('.primaryColor').props().onClick());
        expect(wrapper.find('.modal-sm').props().onConfirm());
        expect(wrapper.find('.modal-sm').props().onCancel());
        expect(wrapper.find('.modal-lg').props().onClick());
    });

    it('Check the validatePassword function', () => {
        wrapper.setState({
            password: 'Emids@123',
            confirmPassword: 'Emids@123'
        })
        wrapper.instance().validatePassword()
        wrapper.setState({
            password: 'Emids@123',
            confirmPassword: 'Emids@321'
        })
        wrapper.instance().validatePassword()
        wrapper.setState({
            password: ''
        })
        wrapper.instance().validatePassword()
        wrapper.setState({
            password: 'asdasd'
        })
        wrapper.instance().validatePassword()
    });

    it('Check the onClickButtonSubmit function', () => {
        wrapper.instance().onClickButtonSubmit()
    });

    it('Check the onClickCancel function', () => {
        wrapper.instance().onClickCancel()
    });

    it('should test initial state', () => {
        expect(mapStateToProps(props)).toBeDefined();
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onClickCancel();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).onSetPassword({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getUserData();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getEulaContent();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});