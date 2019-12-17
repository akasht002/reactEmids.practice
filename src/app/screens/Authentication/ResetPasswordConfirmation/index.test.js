import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { ResetPasswordConfirmation, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../components', () => ({
    LoginCover: 'mockLoginCover'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const props = {
    isLoading: true,
    emailId: '',
    redirect: jest.fn(),
    loadingState: {
        isLoading: true
    },
    authState: {
        forgetPasswordState: {
            emailId: 'aa@bb.com'
        }
    }
}

store = mockStore(props);

describe("ResetPasswordConfirmation", function () {
    let enzymeWrapper;
    beforeEach(() => {
        enzymeWrapper = shallow(
            <ResetPasswordConfirmation dispatch={dispatch} store={store} {...props} />
        )
    })

    it('Check the reset pasword cover', () => {
        expect(enzymeWrapper.find('[test-restConfirm-body="test-restConfirm-body"]').length).toEqual(1);
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).redirect({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(props)).toBeDefined();
    });

    it('Check the resendEmail function', () => {
        enzymeWrapper.instance().resendEmail()
    });
});