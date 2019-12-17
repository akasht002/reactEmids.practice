import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {Tabs} from './Tabs';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    toggleTabs: jest.fn(),
    filterTabs:
        [
            {
                id: '1',
                name: 'Gender'
            }
        ],
    activeTab: '1'
};

store = mockStore(defaultState);

describe("Tabs", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Tabs dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Tabs contains FilterMiddleContent', () => {
        expect(shallowWrapper.find('.FilterMiddleContent').length).toEqual(1);
    });

    it('Check the events', () => {
        shallowWrapper.setProps({
            activeTab: '2'
        })
        expect(shallowWrapper.find('[test-span="test.span"]').props().onClick())
    })
})