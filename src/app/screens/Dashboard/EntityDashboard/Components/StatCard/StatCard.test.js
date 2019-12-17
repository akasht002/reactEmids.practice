import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {StatCard} from './StatCard';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    toggleTabs: jest.fn(),
    countList:
        [
            {
                statusName: 'All',
                subtext: 'with individuals',
                label:'individuals',
                totalCount: 34
            }
        ],
        status : 'All',
        getTable: jest.fn()
};

store = mockStore(defaultState);

describe("StatCard", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <StatCard dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the StatCard contains filter-card-content', () => {
        expect(shallowWrapper.find('.filter-card-content').length).toEqual(1);
    });

    it('Check the events', () => {
        shallowWrapper.setProps({
            countList:
            [
                {
                    statusName: 'All',
                    subtext: 'Individuals',
                    label:'individuals',
                    totalCount: 34
                }
            ]
        })
        expect(shallowWrapper.find('.card-filter-input').props().onClick())
    })
})