import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { EntityDashboard, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    dashboardState: {
        individualsListState: {
            activeStatus: 'fwf',
            activeSubTab: 1,
            fromDate: '11/12/2019',
            toDate: '11/12/2019'
        }
    },
    getAboutUsContent: jest.fn(),
    setActiveTab: jest.fn(),
    getBuildVersion: jest.fn(),
    getMessageFallBackInterval: jest.fn(),
    createDataStore: jest.fn(),
    setFromDate: jest.fn(),
    setToDate: jest.fn(),
};

store = mockStore(defaultState);

describe("EntityDashboard", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <EntityDashboard dispatch={dispatch} store={store} {...defaultState} />
        )
    });
    it('Check the EntityDashboard contains ProfileHeaderWidget', () => {
        expect(shallowWrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the toggle function', () => {
        shallowWrapper.instance().toggle()
    });

    it('Check the toggleTabs function', () => {
        shallowWrapper.setState({
            activeTab: 1
        })
        shallowWrapper.instance().toggleTabs(1)
        shallowWrapper.instance().toggleTabs(2)
    })

    it('Check the toggleSearch function', () => {
        shallowWrapper.instance().toggleSearch()
    })

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    })

    it('Check the fromDateChanged function', () => {
        let date = '11/12/2019'
        shallowWrapper.instance().fromDateChanged(date)
    })

    it('Check the toDateChanged function', () => {
        let date = '11/12/2019'
        shallowWrapper.instance().toDateChanged(date)
    })

    it('Check the todaysDate function', () => {
        shallowWrapper.instance().todaysDate()
    })

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).setActiveTab({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getBuildVersion();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAboutUsContent();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getMessageFallBackInterval();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createDataStore({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setFromDate({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setToDate({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
})