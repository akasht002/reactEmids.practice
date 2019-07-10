import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { VisitServiceProcessing } from './index.js';

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    history: {
        push: jest.fn()
    }
}

store = mockStore(defaultState);

describe("VisitServiceProcessing", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <VisitServiceProcessing dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VisitServiceProcessing form body', () => {
        expect(shallowWrapper.find('[test-VisitServiceProcessing="test-VisitServiceProcessing"]').length).toEqual(1);
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
    });

});