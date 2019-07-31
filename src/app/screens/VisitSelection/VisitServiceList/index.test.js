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

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
  visitServiceList: [],
  ServiceCategory: [],
  ServiceStatus: [],
  visitSelectionState: {
    VisitServiceListState: {
      visitServiceList: [],
      serviceRequestCount: 0,
      status: 0,
      isLoading: false
    },
    ServiceRequestFilterState: {
      ServiceCategory: [],
      ServiceStatus: [],
      ServiceType: [],
      ServiceAreaList: [],
      FilterDataCount: 23,
      SearchDataCount: 50,
      isDashboardFilteredStatus: true,
      status: 'Open'
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
      imageData: 'adas/asdasd'
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
  getSearchDataCount: jest.fn()
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
    shallowWrapper.instance().componentDidMount();
  });

  it('Check the componentWillUnmount', () => {
    shallowWrapper.instance().componentWillUnmount();
  });

  it('Check the handleClick', () => {
    shallowWrapper.instance().handleClick(1);
  });

  it('Check the renderStatusClassName', () => {
    shallowWrapper.instance().renderStatusClassName('Open');
    shallowWrapper.instance().renderStatusClassName('Applied');
    shallowWrapper.instance().renderStatusClassName('Invited');
    shallowWrapper.instance().renderStatusClassName('Hired');
    shallowWrapper.instance().renderStatusClassName('Not Hired');
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

  // it('Check the applyFilter', () => {
  //   shallowWrapper.instance().applyFilter();
  // });

  it('Check the applyReset', () => {
    shallowWrapper.instance().applyReset();
  });

  it('Check the handleChangeServiceCategory', () => {
    shallowWrapper.instance().handleChangeServiceCategory('');
  });

  it('Check the handleserviceType', () => {
    shallowWrapper.instance().handleserviceType('', { target: { checked: true } });
  });

  it('Check the handleAllServiceStatus', () => {
    shallowWrapper.instance().handleAllServiceStatus('', { target: { checked: true } });
  });

  it('Check the handleChangeserviceStatus', () => {
    shallowWrapper.instance().handleChangeserviceStatus('', { target: { checked: true } });
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

  // it('Check the handleSearchData', () => {
  //   shallowWrapper.instance().handleSearchData('preventDefault()');
  // });

  it('Check the closeSearch', () => {
    shallowWrapper.instance().closeSearch();
  });

  it('Check the ProfileHeaderTitle form body', () => {
    expect(wrapper.find('.ProfileHeaderTitle').length).toEqual(1);
  });

  it('Check mapStateToProps', () => {
    expect(mapStateToProps(defaultState)).toBeDefined();
});

it('Check mapDispatchToProps actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getVisitServiceList({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceRequestId({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).goToServiceRequestDetailsPage();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceCategory();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).ServiceRequestStatus();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceType({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getFilter({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getSort({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceArea({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).clearServiceCategory([]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).clearServiceArea([]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).clearServiceRequestStatus([]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).clearServiceType({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setPatient({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).goToPatientProfile();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getServiceRequestCount();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getFilterDataCount({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).formDirty();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).formDirtyVisitList();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).checkAllServiceRequestStatus(true, []);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).clearVisitServiceList();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).setDefaultFilteredStatus();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).keywordSearchServiceRequest({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getSearchDataCount([]);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    mapDispatchToProps(dispatch).getSearchDataCountSuccess();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
});
});