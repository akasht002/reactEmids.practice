import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {Body }  from './Body'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    header:"",
    searchable:true,
    placeholder:'',
    className:'',
    onClickSave :jest.fn(),
    data:[{
        mpi: 'MPI',
        name: 'Individuals',
        gender: 'Gender',
        age: 'Age',
        contracts: 'Contracts',
        attributedProviders: 'Attributed Provider',
        cohorts: 'Cohort',
        button: 'Face Sheet',
        icon: 'Action',
        className: 'all-individuals-tableblock'
    }]
}

describe("Body", function () {
    let wrapper;
    it("Grid Body",()=>{
        expect(Body(defaultState)).toBeDefined();
    });
});