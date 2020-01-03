import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Login ,mapDispatchToProps,mapStateToProps } from './index';

jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

jest.mock('../../../components', () => ({
    CoreoWizScreen: 'mockCoreoWizScreen'
}))

jest.mock('../../../components', () => ({
    Scrollbars: 'mockScrollbars'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
   onboardingState : {
            setPasswordState: {
                setPasswordStatus:true
            }
        },
    onLogin:jest.fn()

}

store = mockStore(defaultState);

describe("Login", function () {
    let wrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = shallow(
            <Login  dispatch={dispatch} store={store} {...defaultState} />
        )
        wrapper.setState({
            showModalOnCancel: false,
            firstName: '',
            lastName: '',
            contactNumber: ''
        })
    });   

    it('Check the Login  Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });

    it('Check the onBtnPress function', () => {
        wrapper.instance().onBtnPress()
    });

    it('Check maptoprops', () => {
        const initialState = defaultState;
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps onClickCancel', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onLogin();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

});