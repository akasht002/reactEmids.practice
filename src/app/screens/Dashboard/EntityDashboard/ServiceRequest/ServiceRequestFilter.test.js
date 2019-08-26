import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { ServiceRequestFilter } from './ServiceRequestFilter';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    getServiceCategory: jest.fn(),
    visitServiceRequestTableList: [],
    serviceCategory: [{"serviceCategoryId":1,"serviceCategoryDescription":"Activities of Daily Living","serviceTypeTaskViewModel":[{"serviceTypeId":1,"serviceTypeName":"Ambulation and Mobility","serviceTask":[{"serviceTaskId":1,"serviceTaskDescription":"Locate transfer devices","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":1},{"serviceTaskId":2,"serviceTaskDescription":"Assist with transfer(s)","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":1}]},{"serviceTypeId":2,"serviceTypeName":"Bathing","serviceTask":[{"serviceTaskId":3,"serviceTaskDescription":"Prepare water and towels","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":2},{"serviceTaskId":4,"serviceTaskDescription":"Gather clean clothes","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":2},{"serviceTaskId":5,"serviceTaskDescription":"Clean and dry surfaces","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":2}]},{"serviceTypeId":3,"serviceTypeName":"Continence","serviceTask":[{"serviceTaskId":6,"serviceTaskDescription":"Discuss concerns","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":3},{"serviceTaskId":7,"serviceTaskDescription":"Gather recommendations","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":3}]},{"serviceTypeId":4,"serviceTypeName":"Eating","serviceTask":[{"serviceTaskId":8,"serviceTaskDescription":"Prepare each meal","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":4},{"serviceTaskId":9,"serviceTaskDescription":"Assist with feeding","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":4},{"serviceTaskId":10,"serviceTaskDescription":"Clean surfaces","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":4}]},{"serviceTypeId":5,"serviceTypeName":"Getting Dressed","serviceTask":[{"serviceTaskId":11,"serviceTaskDescription":"Prepare clothes","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":5},{"serviceTaskId":12,"serviceTaskDescription":"Help with dressing","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":5},{"serviceTaskId":13,"serviceTaskDescription":"Assist with transfer(s)","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":5}]},{"serviceTypeId":6,"serviceTypeName":"Toileting","serviceTask":[{"serviceTaskId":14,"serviceTaskDescription":"Assist with transfer","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":6},{"serviceTaskId":15,"serviceTaskDescription":"Confirm completion","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":6},{"serviceTaskId":16,"serviceTaskDescription":"Clean surfaces","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":6}]},{"serviceTypeId":7,"serviceTypeName":"Transferring","serviceTask":[{"serviceTaskId":17,"serviceTaskDescription":"Prepare safe environment","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":7},{"serviceTaskId":18,"serviceTaskDescription":"Clear pathway","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":7},{"serviceTaskId":19,"serviceTaskDescription":"Complete transfer(s)","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":7}]}]},{"serviceCategoryId":2,"serviceCategoryDescription":"Help at Home","serviceTypeTaskViewModel":[{"serviceTypeId":8,"serviceTypeName":"Companionship and Errands","serviceTask":[{"serviceTaskId":20,"serviceTaskDescription":"Read favorite books","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":8},{"serviceTaskId":21,"serviceTaskDescription":"Play favorite games","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":8},{"serviceTaskId":22,"serviceTaskDescription":"Watch favorite TV","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":8}]},{"serviceTypeId":9,"serviceTypeName":"Food Prep","serviceTask":[{"serviceTaskId":23,"serviceTaskDescription":"Review meal plan","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":9},{"serviceTaskId":24,"serviceTaskDescription":"Prepare each meal","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":9},{"serviceTaskId":25,"serviceTaskDescription":"Clean surfaces ","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":9},{"serviceTaskId":26,"serviceTaskDescription":"Manage expiring food","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":9}]},{"serviceTypeId":10,"serviceTypeName":"House Keeping","serviceTask":[{"serviceTaskId":27,"serviceTaskDescription":"Gather and empty trash","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":10},{"serviceTaskId":28,"serviceTaskDescription":"Clear and clean surfaces","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":10},{"serviceTaskId":29,"serviceTaskDescription":"Vacuum floors","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":10}]},{"serviceTypeId":11,"serviceTypeName":"Laundry","serviceTask":[{"serviceTaskId":30,"serviceTaskDescription":"Gather clothes","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":11},{"serviceTaskId":31,"serviceTaskDescription":"Wash and fold clothes","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":11},{"serviceTaskId":32,"serviceTaskDescription":"Store clothes","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":11}]},{"serviceTypeId":12,"serviceTypeName":"Shopping","serviceTask":[{"serviceTaskId":33,"serviceTaskDescription":"Prepare shopping list","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":12},{"serviceTaskId":34,"serviceTaskDescription":"Transport to store","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":12},{"serviceTaskId":35,"serviceTaskDescription":"Shop with client","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":12},{"serviceTaskId":36,"serviceTaskDescription":"Store each item","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":12}]},{"serviceTypeId":13,"serviceTypeName":"Using Home Appliances","serviceTask":[{"serviceTaskId":37,"serviceTaskDescription":"Discuss concerns","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":13},{"serviceTaskId":38,"serviceTaskDescription":"Train use of devices","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":13},{"serviceTaskId":39,"serviceTaskDescription":"Report any issues","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":13}]}]},{"serviceCategoryId":3,"serviceCategoryDescription":"Groceries and Nutrition","serviceTypeTaskViewModel":[{"serviceTypeId":14,"serviceTypeName":"Grocery Delivery","serviceTask":[{"serviceTaskId":47,"serviceTaskDescription":"Generate grocery order","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":14},{"serviceTaskId":56,"serviceTaskDescription":"Deliver grocery order","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":14}]},{"serviceTypeId":15,"serviceTypeName":"Meal Delivery","serviceTask":[{"serviceTaskId":48,"serviceTaskDescription":"Generate food order","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":15},{"serviceTaskId":57,"serviceTaskDescription":"Deliver food order","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":15}]}]},{"serviceCategoryId":4,"serviceCategoryDescription":"Transportation","serviceTypeTaskViewModel":[{"serviceTypeId":16,"serviceTypeName":"General Transportation","serviceTask":[{"serviceTaskId":49,"serviceTaskDescription":"Identify request route","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":16},{"serviceTaskId":58,"serviceTaskDescription":"Complete requested route","serviceRequestTypeDetailsId":0,"isDefault":true,"serviceTypeId":16}]}]}],
    serviceType: [],
    serviceRequestStatusList: [],
    status: 'NeedApproval'
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceRequestFilter dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("ServiceRequest", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <ServiceRequestFilter dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceRequestFilter section', () => {
        expect(wrapper.find('.CTFilter').length).toEqual(1);
    });

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            status: 'Cancelled'
        }
        shallowWrapper.setState({
            activeTab: '1'
        })
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    
    it('Check the componentWillReceiveProps function false', () => {
        const nextProps = {
            status: 'Pending'
        }
        shallowWrapper.setState({
            activeTab: '1'
        })
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the toggle function true', () => {
        const data = '2'
        shallowWrapper.setState({
            activeTab: '1'
        })
        shallowWrapper.instance().toggle(data)
    });

    it('Check the toggle function false', () => {
        const data = '1'
        shallowWrapper.setState({
            activeTab: '1'
        })
        shallowWrapper.instance().toggle(data)
    });

    it('Check the isStatusInArray function', () => {
        const positiveData = ['Cancelled']
        const negativeData = ['Test']
        shallowWrapper.instance().isStatusInArray(positiveData);
        shallowWrapper.instance().isStatusInArray(negativeData);
    });

    it('Check the handlechangeArea function', () => {
        shallowWrapper.instance().handlechangeArea(1, {target: { value: 1 }})
    });

})