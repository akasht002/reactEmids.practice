import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import Filter from './index';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    filterTabs:     [
        {
            id: '1',
            name: 'Gender'
        },
        {
            id: '2',
            name: 'Contract'
        },
        {
            id: '3',
            name: 'Age'
        },
        {
            id: '4',
            name: 'Clinical Conditions'
        }
    ],
    serviceCategory : [{
        serviceCategoryId: 1,
        serviceCategoryDescription: 'ambulation'
    }],
    handleServiceType: jest.fn(),
    applyReset: jest.fn(),
    applyFilter: jest.fn()
};

store = mockStore(defaultState);

describe("EntityDashboard", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Filter dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Filter contains entity-filter-block', () => {
        expect(shallowWrapper.find('.entity-filter-block').length).toEqual(1);
    });

    it('Check the toggle function', () => {
        shallowWrapper.setState({
            activeTab: 1
        })
        shallowWrapper.instance().toggle(1)
        shallowWrapper.instance().toggle(2)
    })

    it('Check the componentDidUpdate function', () => {
        let props = {
            filterTabs : []
        }
        shallowWrapper.instance().componentDidUpdate(props)
    })

    
    it('Check the events', () => {
        expect(shallowWrapper.find('[test-serviceTypeList="test-serviceTypeList"]').props().handleServiceType())
        expect(shallowWrapper.find('[test-applyReset="test-applyReset"]').props().onClick())
        expect(shallowWrapper.find('[test-applyFilter="test-applyFilter"]').props().onClick())
    })

})