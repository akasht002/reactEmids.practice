import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

 import { MobileLanding } from './index';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
}

 store = mockStore(defaultState);

 describe("Welcome - MobileLanding", function () {
    let shallowWrapper;

     beforeEach(() => {
        shallowWrapper = shallow(
            <MobileLanding dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the MobileLanding body', () => {
        expect(shallowWrapper.find('.full-block-view').length).toEqual(1);
    });
 }); 