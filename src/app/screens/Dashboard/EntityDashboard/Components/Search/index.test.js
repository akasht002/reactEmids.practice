import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import Search from './index'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    id: "",
    searchOpen: true,
    placeholder: '',
    className: '',
    handleSearchkeyword: jest.fn(),
    handleSearchData: jest.fn(),
    closeSearch: jest.fn(),
    toggleSearch: jest.fn()
}

describe("Search", function () {
    let wrapper;

    wrapper = shallow(
        <Search dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the Search Details body', () => {
        expect(wrapper).toBeDefined()
    });

    it('Check the Search Details body', () => {
        expect(wrapper.find('.form-block').props().onSubmit());
    });

    it('Check the Search Details body', () => {
        expect(wrapper.find('.form-control').props().onChange());
    });

    it('Check the Search Details body', () => {
        expect(wrapper.find('.btn-primary').props().onClick());
    });

    it('Check the Search Details body', () => {
        expect(wrapper.find('.close-btn').props().onClick());
    });

    it('Check the Search Details body', () => {
        expect(wrapper.find('.profile-icon-search').props().onClick());
    });
})