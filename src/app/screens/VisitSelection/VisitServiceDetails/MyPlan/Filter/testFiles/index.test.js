import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import { Filter } from '../index'

jest.mock('../../../../../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: 2
    })
}))

jest.mock('../../../../../../utils/userUtility', () => ({
    isEntityUser: () => ({})
}))


Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    isOpen: true,
    applyReset: jest.fn(),
    applyFilter: jest.fn(),
    isEntityUser: jest.fn(),
    ServiceCategory: [{
        serviceCategoryDescription: "Activities of Daily Living",
        serviceCategoryId: 1
    }],
    visitDate: {
        startVisitDateForWeb: "09/04/2019",
        endVisitDateForWeb: "09/04/2019"
    }
}

describe("Filter", function () {
    let wrapper;

    wrapper = shallow(
        <Filter dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Filter Details body', () => {
        expect(wrapper).toBeDefined()
    });

    it('Check the toggle function', () => {
        wrapper.instance().toggle("2")
    });

    it('Check the resetToDefaultTab  function', () => {
        wrapper.instance().resetToDefaultTab()
    });

    it('should return btn-outline-primary', () => {
        expect(wrapper.find('.btn-outline-primary').props().onClick())
    })

    it('should return btn-primary', () => {
        expect(wrapper.find('.btn-primary').props().onClick())
    })

});