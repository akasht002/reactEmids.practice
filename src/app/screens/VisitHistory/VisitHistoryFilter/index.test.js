import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { VisitFilter } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    serviceCategory: [{serviceCategoryId: 1, serviceCategoryDescription: 'TEST'}],
    AllPatientForserviceProviders:  [{ patientId: '1', isChecked: false, imageString: '', firstName: 'TEST', lastName: 'TEST' }],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    applyReset:jest.fn(),
    applyFilter:jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <VisitFilter dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("VisitFilter", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <VisitFilter dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the VisitFilter form body', () => {
        expect(wrapper.find('.FilterWidget').length).toEqual(1);
    });

     it('Check the toggle true', () => {
        shallowWrapper.instance().toggle('2342432');
    });

     it('Check the toggle false', () => {
        shallowWrapper.instance().toggle('1');
        shallowWrapper.instance().toggle('2');
        shallowWrapper.instance().toggle('3');
    });

     it('Check the dateFromChanged true', () => {
        shallowWrapper.instance().dateFromChanged('04-23-2019');
    });

     it('Check the dateFromChanged false', () => {
        shallowWrapper.instance().dateFromChanged('');
    });

     it('Check the dateToChanged true', () => {
        shallowWrapper.instance().dateToChanged('04-23-2019');
    });

     it('Check the dateToChanged false', () => {
        shallowWrapper.instance().dateToChanged('');
    });

     it('Check the getServiceProvider', () => {
        const data = [{ serviceProviderId: '1', isChecked: false, image: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().getServiceProvider(data);
    });

     it('Check the getAllPatientForServiceProvider', () => {
        const data = [{ patientId: '1', isChecked: false, imageString: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().getAllPatientForServiceProvider(data);
    });

     it('Check the onCheckServiceProvider', () => {
        const data = [{ serviceProviderId: '1', isChecked: false, image: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().onCheckServiceProvider(data, true);
    });

     it('Check the onCheckPatientForServiceProvider', () => {
        const data = [{ serviceProviderId: '1', isChecked: false, image: '', firstName: 'TEST', lastName: 'TEST' }]
        shallowWrapper.instance().onCheckPatientForServiceProvider(data, true);
    });

     it('Check the dateChangedRaw', () => {
        shallowWrapper.instance().dateChangedRaw({ target: { value: "456566556565" },preventDefault:jest.fn() });
    });

     it('Check the dateChangedRawEndDate', () => {
        shallowWrapper.instance().dateChangedRawEndDate({ target: { value: "456566556565" },preventDefault:jest.fn() });
    });

    it('Check the events', () => {
        shallowWrapper.setState({
            searchData:{
                endDate:null
            }
        })
        expect(shallowWrapper.find('[test-Reset="test-Reset"]').props().onClick())
        expect(shallowWrapper.find('[test-Apply="test-Apply"]').props().onClick())
        expect(shallowWrapper.find('[test-dob1="test-dob1"]').props().onBlur())
        expect(shallowWrapper.find('[test-dob="test-dob"]').props().onBlur())
        // expect(shallowWrapper.find('[test-stopButton="test-stopButton"]').props().onClick())
    });

    it('Check the events', () => {
        shallowWrapper.setState({
            searchData:{
                endDate:""
            }
        })
        expect(shallowWrapper.find('[test-dob1="test-dob1"]').props().onBlur())
    })

 }); 