import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { VisitServiceList, mapDispatchToProps, mapStateToProps } from './index.js';

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
  AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../services/http', () => ({
  getUserInfo: () => ({
    serviceProviderId: 100
  }),
  isEntityServiceProvider: () => ({})
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  visitServiceList: [{ "serviceRequestId": 2556, "serviceProviderId": "156", "percentageMatch": 0.0, "patientId": 1123, "patientThumbNail": null, "patientImage": "data:image/png;base64,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", "serviceRequestStatus": "Engaged", "recurring": "Daily", "statusId": 38, "patientAge": 0, "type": " Ambulation and Mobility, Bathing", "typeId": "1,2", "skills": null, "pos": null, "startDate": "11/14/2019 12:00:00 AM", "endDate": "12/16/2019 12:00:00 AM", "patientFirstName": "Amaya", "patientLastName": "Jiwe", "providerFirstName": null, "providerLastName": null, "serviceTypeDescription": null, "serviceCategoryDescription": ["Activities of Daily Living"], "patientGender": null, "createDate": "2019-11-14T12:18:16.483", "modifiedDate": "0001-01-01T00:00:00", "requestApprovalStatus": false }],
  ServiceCategory: [],
  ServiceStatus: [],
  visitSelectionState: {
    VisitServiceListState: {
      visitServiceList: [{ "serviceRequestId": 2556, "serviceProviderId": "156", "percentageMatch": 0.0, "patientId": 1123, "patientThumbNail": null, "patientImage": "data:image/png;base64,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", "serviceRequestStatus": "Engaged", "recurring": "Daily", "statusId": 38, "patientAge": 0, "type": " Ambulation and Mobility, Bathing", "typeId": "1,2", "skills": null, "pos": null, "startDate": "11/14/2019 12:00:00 AM", "endDate": "12/16/2019 12:00:00 AM", "patientFirstName": "Amaya", "patientLastName": "Jiwe", "providerFirstName": null, "providerLastName": null, "serviceTypeDescription": null, "serviceCategoryDescription": ["Activities of Daily Living"], "patientGender": null, "createDate": "2019-11-14T12:18:16.483", "modifiedDate": "0001-01-01T00:00:00", "requestApprovalStatus": false }],
      serviceRequestCount: 0,
      status: 0,
      isLoading: false
    },
    ServiceRequestFilterState: {
      ServiceCategory: []
    }
  },
  authState: {
    userState: {
      userData: {
        userInfo: {}
      }
    }
  },
  profileState: {
    PersonalDetailState: {
      imageData: 'weeeeeeeee'
    }
  },
  getVisitServiceList: jest.fn(),
  getServiceRequestId: jest.fn(),
  goToServiceRequestDetailsPage: jest.fn(),
  getServiceCategory: jest.fn(),
  ServiceRequestStatus: jest.fn(),
  getServiceType: jest.fn(),
  getFilter: jest.fn(),
  getSort: jest.fn(),
  getServiceArea: jest.fn(),
  clearServiceCategory: jest.fn(),
  clearServiceArea: jest.fn(),
  clearServiceRequestStatus: jest.fn(),
  clearServiceType: jest.fn(),
  setPatient: jest.fn(),
  goToPatientProfile: jest.fn(),
  getServiceRequestCount: jest.fn(),
  getFilterDataCount: jest.fn(),
  formDirty: jest.fn(),
  formDirtyVisitList: jest.fn(),
  checkAllServiceRequestStatus: jest.fn(),
  clearVisitServiceList: jest.fn(),
  setDefaultFilteredStatus: jest.fn(),
  keywordSearchServiceRequest: jest.fn(),
  getSearchDataCount: jest.fn(),
  resetData: jest.fn(),
  setActiveTab: jest.fn(),
  getSearchDataCountSuccess: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <VisitServiceList dispatch={dispatch} store={store} {...props} />
      </MemoryRouter>
    </Provider>
  )
  return wrapper;
};

describe("VisitServiceDetails", function () {
  let wrapper, shallowWrapper;

  beforeEach(() => {
    const props = defaultState;
    wrapper = setUp(props);
    shallowWrapper = shallow(
      <VisitServiceList dispatch={dispatch} store={store} {...defaultState} />
    )
  });

  it('Check the VisitServiceList form body', () => {
    shallowWrapper.setProps({
      visitServiceList: []
    })
    expect(shallowWrapper).toBeDefined();
  });

  it('Check the VisitServiceList form body', () => {
    expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
  });

  it('Check the toggle', () => {
    shallowWrapper.instance().toggle()
    expect(shallowWrapper.instance().state.isOpen).toEqual(true);
  });

  it('Check the toggleSearch', () => {
    shallowWrapper.instance().toggleSearch()
    expect(shallowWrapper.instance().state.searchOpen).toEqual(true);
    expect(shallowWrapper.instance().state.searchKeyword).toEqual('');
  });

  it('Check the componentDidMount', () => {
    shallowWrapper.setProps({
      isDashboardFilteredStatus: true,
      status: 'Open'
    })
    shallowWrapper.instance().componentDidMount();
  });

  it('Check the componentWillReceiveProps', () => {
    let nextProps = {
      ServiceStatus: [{ "id": 0, "keyName": null, "keyValue": "All" }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    }
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
  });

  it('Check the componentWillUnmount', () => {
    shallowWrapper.instance().componentWillUnmount();
  });

  it('Check the handleClick', () => {
    shallowWrapper.instance().handleClick(1);
  });

  it('Check the getStatus ', () => {
    shallowWrapper.setProps({
      ServiceStatus: [{ "id": 0, "keyName": null, "keyValue": "All", "isChecked": true }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    })
    shallowWrapper.instance().getStatus();
  });

  it('Check the applyFilter ', () => {
    shallowWrapper.instance().applyFilter();
  });

  it('Check the handleSortFilterChange  ', () => {
    shallowWrapper.setProps({
      isDashboardFilteredStatus: true,
      status: 'Open'
    })
    shallowWrapper.instance().handleSortFilterChange(1000);
  });

  it('Check the handleSortFilterChange  ', () => {
    shallowWrapper.setProps({
      isDashboardFilteredStatus: false,
      status: 'All'
    })
    shallowWrapper.instance().handleSortFilterChange(1000);
  });

  it('Check the renderStatusClassName', () => {
    shallowWrapper.instance().renderStatusClassName('Open');
    shallowWrapper.instance().renderStatusClassName('Applied');
    shallowWrapper.instance().renderStatusClassName('Invited');
    shallowWrapper.instance().renderStatusClassName('Engaged');
    shallowWrapper.instance().renderStatusClassName('Not Hired');
    shallowWrapper.instance().renderStatusClassName();
  });

  it('Check the toggleFilter', () => {
    shallowWrapper.instance().toggleFilter()
    expect(shallowWrapper.instance().state.filterOpen).toEqual(true);
  });

  it('Check the dateChanged', () => {
    shallowWrapper.instance().dateChanged('04-23-2019');
    expect(shallowWrapper.instance().state.startDate).toEqual('04-23-2019');
  });

  it('Check the dateChangedRaw', () => {
    shallowWrapper.instance().dateChangedRaw({ target: { value: 1 } });
  });

  it('Check the todateChanged', () => {
    shallowWrapper.instance().todateChanged('04-23-2019');
  });

  it('Check the todateChangedRaw', () => {
    shallowWrapper.instance().todateChangedRaw({ target: { value: 1 } });
  });

  it('Check the applyReset', () => {
    shallowWrapper.instance().applyReset();
  });

  it('Check the handleChangeServiceCategory', () => {
    shallowWrapper.instance().handleChangeServiceCategory('');
  });

  it('Check the handleserviceType', () => {
    shallowWrapper.instance().handleserviceType('', { target: { checked: true } });
  });

  it('Check the handleserviceType', () => {
    shallowWrapper.instance().setState({
      serviceType: [{ "serviceTypeId": 14, "serviceTypeDescription": "Grocery Delivery", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }, { "serviceTypeId": 15, "serviceTypeDescription": "Meal Delivery", "serviceTask": null, "taskCompleted": 0, "totalTask": 0 }]
    })
    shallowWrapper.instance().setState({
      serviceStatus: [{ "id": 0, "keyName": null, "keyValue": "All", "isChecked": true }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    })
    shallowWrapper.instance().handleserviceType('', { target: { checked: false } });
  });

  it('Check the handleAllServiceStatus', () => {
    shallowWrapper.setProps({
      ServiceStatus: [{ "id": 0, "keyName": null, "keyValue": "All" }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    })
    shallowWrapper.instance().handleAllServiceStatus('', { target: { checked: true } });
  });

  it('Check the handleAllServiceStatus', () => {
    shallowWrapper.setProps({
      ServiceStatus: [{ "id": 0, "keyName": null, "keyValue": "All" }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    })
    shallowWrapper.instance().handleAllServiceStatus('', { target: { checked: false } });
  });

  it('Check the handleChangeserviceStatus', () => {
    shallowWrapper.instance().setState({
      serviceStatus: [{ "id": 0, "keyName": null, "keyValue": "All", "isChecked": true }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    })
    shallowWrapper.instance().handleChangeserviceStatus('', { target: { checked: true } });
  });

  it('Check the handleChangeserviceStatus', () => {
    let serviceStatus = [{ "id": 0, "keyName": null, "keyValue": "All", "isChecked": true }, { "id": 35, "keyName": null, "keyValue": "Open" }, { "id": 38, "keyName": null, "keyValue": "Engaged" }, { "id": 39, "keyName": null, "keyValue": "Not Hired" }, { "id": 40, "keyName": null, "keyValue": "InProgress" }, { "id": 41, "keyName": null, "keyValue": "Completed" }, { "id": 42, "keyName": null, "keyValue": "Closed" }, { "id": 47, "keyName": null, "keyValue": "Cancelled" }, { "id": 58, "keyName": null, "keyValue": "Not Interested" }, { "id": 106, "keyName": null, "keyValue": "Pending Approval" }, { "id": 107, "keyName": null, "keyValue": "Declined" }]
    shallowWrapper.instance().setState({
      serviceStatus: serviceStatus
    })
    shallowWrapper.instance().handleChangeserviceStatus(serviceStatus, { target: { checked: false } });
  });

  it('Check the handleSearchData ', () => {
    let e = {
      preventDefault: () => {
      }
    }
    shallowWrapper.instance().handleSearchData(e);
  });

  it('Check the handleServiceArea', () => {
    shallowWrapper.instance().handleServiceArea('');
  });

  it('Check the handleSortPageChange', () => {
    shallowWrapper.instance().handleSortPageChange(10);
  });

  it('Check the handlePageChange', () => {
    shallowWrapper.instance().handlePageChange(10);
  });

  it('Check the handleSearchPageChange', () => {
    shallowWrapper.instance().handleSearchPageChange(10);
  });

  it('Check the selectedSort', () => {
    shallowWrapper.instance().selectedSort('');
  });

  it('Check the handleSearchkeyword', () => {
    shallowWrapper.instance().handleSearchkeyword({ target: { value: 10 } });
  });

  it('Check the closeSearch', () => {
    shallowWrapper.setProps({
      isDashboardFilteredStatus: false,
      status: 'All'
    })
    shallowWrapper.instance().closeSearch();
  });

  it('Check the closeSearch', () => {
    shallowWrapper.setProps({
      isDashboardFilteredStatus: true,
      status: 'Open'
    })
    shallowWrapper.instance().closeSearch();
  });

  it('Check the ProfileHeaderTitle form body', () => {
    expect(wrapper.find('.ProfileHeaderTitle').length).toEqual(1);
  });

  it('Check mapDispatchToProps actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getVisitServiceList({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getServiceRequestId({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).goToServiceRequestDetailsPage({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getServiceCategory({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).ServiceRequestStatus({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getServiceType({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getFilter({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getSort({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getServiceArea({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).clearServiceCategory([{ id: 1, name: 'test' }]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).clearServiceArea([{ id: 1, name: 'test' }]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).clearServiceRequestStatus([{ id: 1, name: 'test' }]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).clearServiceType([{ id: 1, name: 'test' }]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).setPatient({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).goToPatientProfile({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getServiceRequestCount({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getFilterDataCount({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).formDirtyVisitList();
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).checkAllServiceRequestStatus(true, [{ id: 1, name: 'test' }]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).clearVisitServiceList({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).setDefaultFilteredStatus({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).keywordSearchServiceRequest({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getSearchDataCount({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).getSearchDataCountSuccess();
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).setActiveTab(1);
    expect(dispatch.mock.calls[0][0]).toBeDefined();

    mapDispatchToProps(dispatch).resetData({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  it('Check mapStateToProps', () => {
    expect(mapStateToProps(defaultState)).toBeDefined();
  });
});