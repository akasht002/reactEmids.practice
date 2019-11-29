import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { Grid }  from './Body'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    header:"",
    searchable:true,
    prototype:{},
    placeholder:'',
    className:'',
    onClickSave :jest.fn(),
    data:[{
        
    }]
}

describe("Grid", function () {
    let wrapper;

    wrapper = shallow(
        <Grid dispatch={dispatch} store={store} {...defaultState} />
    )  

    it('Check the PointOfService Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });
});