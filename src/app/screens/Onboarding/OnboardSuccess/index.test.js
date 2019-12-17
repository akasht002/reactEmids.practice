import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { OnboardSuccess, mapDispatchToProps, mapStateToProps } from './index';

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
    onLogin: jest.fn()
}
store = mockStore(props)

describe('OnboardSuccess Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<OnboardSuccess {...props} store={store} />)
    })

    it('Check onboardSuccess Component contains test-onboardSuccess', () => {
        expect(wrapper.find('[test-onboardSuccess="test-onboardSuccess"]').length).toEqual(1);
    })

    it('should test initial state', () => {
        expect(mapStateToProps(props)).toBeDefined();
    });

    it('Check the onLoginPress  function', () => {
        wrapper.instance().onLoginPress()
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onLogin();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});