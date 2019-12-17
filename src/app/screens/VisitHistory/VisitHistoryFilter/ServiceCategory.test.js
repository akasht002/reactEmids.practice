import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ServiceCategory  from './ServiceCategory'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    id:"",
    searchable:true,
    placeholder:'',
    className:'',
    onClickSave :jest.fn(),
    options:[]
}

describe("ServiceCategory", function () {
    let wrapper;

    wrapper = shallow(
        <ServiceCategory dispatch={dispatch} store={store} {...defaultState} />
    )  

    it('Check the ServiceCategory Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });

    
});