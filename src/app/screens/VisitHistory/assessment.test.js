import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {Assessment} from './assessment'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    questionsList:[{
        answerTypeDescription:'ChoiceBased',
        selected:false,
        serviceTypeName:'',
        answers:[{
            answerName:2
        }],
        selectedAnswer :2
    },
    {
        answerTypeDescription:'OpenText',
        selected:false,
        answers:[{
            answerName:2
        }],
        serviceTypeName:''
    }],
    handleServiceType:jest.fn()
}

describe("ServiceTypes", function () {
    it('Check the ServiceTypes Details body', () => {
        expect(Assessment(defaultState)).toBeDefined()
    });
});