import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';

import { ServiceArea } from './index'

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    ServiceAreaList: [],
    cityDetail: [{
        name: '',
        id: 1
    }],
    profileStateL: {
        ServiceAreaState: {
            progressIndicatorState: 0,
            ServiceAreaList: [],
            addServiceAreaSuccess: false
        },
        PersonalDetailState: {
            personalDetail: [],
            updatePersonalDetailSuccess: false,
            cityDetail: [],
            genderDetail: [],
            imageData: '',
            patientId: null,
            userId: null,
            userType: '',
            isUser: false
        },
    },
    userState: {
        isUser: false
    },
    getServiceArea: jest.fn(),
    addServiceArea: jest.fn(),
    editServiceArea: jest.fn(),
    updateServiceArea: jest.fn(),
    deletePointService: jest.fn(),
    getCityDetail: jest.fn(),
    clearPOSErrorMessage: jest.fn(),
    ServiceAreaFieldDetails: {
        addressTypeId: 1,
        street: 'dasd',
        stateName: 'dvfx',
        stateId: '21',
        city: 'sdf',
        zip: 345455
    }
}


store = mockStore(defaultState);

// const setUp = (props = {}) => {
//     const wrapper = mount(
//         <Provider store={store}>
//             <MemoryRouter>
//                 <ServiceArea dispatch={dispatch} store={store} {...props} />
//             </MemoryRouter>
//         </Provider>
//     )
//     return wrapper;
// };

describe("ServiceArea", function () {
    let wrapper, shallowWrapper;
    beforeEach(() => {
        // const props = defaultState;
        // wrapper = setUp(props)
        shallowWrapper = shallow(
            <ServiceArea dispatch={dispatch} store={store} {...defaultState} />
        )
    });
    it('Check the ServiceArea body', () => {
        expect(shallowWrapper.find('.SPCertificate').length).toEqual(1);
    });

    it('Check the reset function', () => {
        shallowWrapper.instance().reset()
    });

    it('Check the toggleServiceArea function', () => {
        shallowWrapper.instance().toggleServiceArea()
    });

    it('Check the componentWillReceiveProps  function', () => {
        const nextProps = {
            ServiceAreaFieldDetails: {
                addressTypeId: 1,
                street: 'dasd',
                stateName: 'dvfx',
                stateId: '21',
                city: 'sdf',
                zip: 345455
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the addServiceArea  function', () => {
        shallowWrapper.setState({
            street: '',
            city: '',
            selectedState: {
                value: ''
            },
            zip: '',
            zipInvalid: false
        })
        shallowWrapper.instance().addServiceArea()
        shallowWrapper.setState({
            street: 'sdc',
            city: 'czz',
            selectedState: {
                value: 'xzc'
            },
            zip: 'zczx',
            zipInvalid: true
        })
        shallowWrapper.instance().addServiceArea()
    });

    it('Check the showModalOnDelete  function', () => { 
        const e = {
            target:{id:1}
        }       
        shallowWrapper.instance().showModalOnDelete(e)
    });

    it('Check the editServiceArea  function', () => {
        const e = {
            target:{id:1}
        }
        shallowWrapper.instance().editServiceArea(e)
    });

    it('Check the updateServiceArea  function', () => {
        shallowWrapper.instance().updateServiceArea()
    });

    it('Check the deletePointService  function', () => {
        shallowWrapper.instance().deletePointService()
    });

    it('Check the textChangeValue function', () => {
        const e = {
            target:{value:1}
        }
        shallowWrapper.instance().textChangeValue(e)
    });

    it('Check the rangeChangeValue function', () => {
        const e = {
            target:{value:1}
        }
        shallowWrapper.instance().rangeChangeValue(e)
    });

    it('Check the onClickHandleIncr function', () => {
        shallowWrapper.instance().onClickHandleIncr()
    });

    it('Check the onClickHandleDecr function', () => {
        shallowWrapper.instance().onClickHandleDecr()
    });

    it('Check the checkFieldsOnEdit function', () => {
        shallowWrapper.instance().checkFieldsOnEdit('')
        shallowWrapper.instance().checkFieldsOnEdit('sad')
    });
});