import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import Search  from './index'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    id:"",
    searchOpen:true,
    placeholder:'',
    className:'',
    toggleSearch :jest.fn(),
    handleSearchkeyword:jest.fn(),
    closeSearch:jest.fn()
}

describe("Search", function () {
    let wrapper;

    wrapper = shallow(
        <Search dispatch={dispatch} store={store} {...defaultState} />
    )  

    it('Check the Search Details body', () => {
        expect(wrapper).toBeDefined()
    });

    
});