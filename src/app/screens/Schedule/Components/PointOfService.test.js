import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { PointOfService } from './PointOfService'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    stateList:[{
        id:'',
        name:''
    }],
    selectedPOS :3,
    participant: {
        userId:34,
        isChecked:true,
        thumbNail:''
    },
    patientAddressList:[{
        addressId:2,
        addressTypeId:'',
        city:'',
        stateName:'',
        zip:''
    }],
    onClickSave :jest.fn(),
    handlePOSAddress:jest.fn()
}

describe("PointOfService", function () {
    let wrapper;

    wrapper = shallow(
        <PointOfService dispatch={dispatch} store={store} {...defaultState} />
    )  

    it('Check the PointOfService Details body', () => {
        wrapper.setState({
        })
        expect(wrapper).toBeDefined()
    });

    it('Check cancelScrollEvent', () => {
       wrapper.instance().cancelScrollEvent({stopImmediatePropagation:jest.fn(),preventDefault:jest.fn()})
    });

    it('Check startScrollEvent ', () => {
        wrapper.instance().startScrollEvent({returnValue :true})
     });

     it('Check scrollLock', () => {
        wrapper.instance().scrollLock()
     });

     it('Check scrollRelease', () => {
        wrapper.instance().scrollRelease()
     });
});