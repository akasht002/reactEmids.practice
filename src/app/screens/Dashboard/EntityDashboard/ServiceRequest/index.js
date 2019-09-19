import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ROW_MIN,
  PAGE_RANGE,
  SERVICE_REQUEST_DETAILS_TAB,
  ENTITY_DASHBOARD_STATUS,
  NO_RECORDS_FOUND,
  SCHEDULE_TYPE
} from '../../../../constants/constants'
import {
  getServiceRequestCountList,
  getServiceRequestTableList,
  setActiveSubTab,
  getScheduleType,
  getServiceRequestStatus,
  clearRequestStatus,
  clearScheduleType
} from '../../../../redux/dashboard/EntityDashboard/ServiceRequest/actions'
import { push } from '../../../../redux/navigation/actions';
import { Path } from '../../../../routes';
import { getUserInfo } from '../../../../utils/userUtility';
import { Grid } from '../Components/Grid/Grid'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'
import { allServiceRequests, openServiceRequests, cancelledServiceRequests } from './gridHeader'
import { StatCard } from '../Components/StatCard'
import {
  getServiceRequestId,
  setActiveTab
} from '../../../../redux/visitSelection/VisitServiceDetails/actions'
import { setPatient } from "../../../../redux/patientProfile/actions";
import { setActiveStatusForAllTab } from '../../../../redux/dashboard/EntityDashboard/Individuals/actions'
import { getServiceCategory } from "../../../../redux/visitSelection/ServiceRequestFilters/actions";
import {  
  getServiceType,
  clearServiceTypes
} from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import Filter from '../Components/Filters'
import { filterTabs } from './filterTabs';
import Search from '../Components/Search';
import { RowPerPage } from '../../../../components';
import { pushSpliceHandler } from '../../../../utils/stringHelper';

export class ServiceRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.activeSubTab,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      filterOpen: false,
      serviceRequestStatus: [],
      serviceTypes: [],
      serviceRequestId: '',
      activePage: DEFAULT_PAGE_NUMBER,
      pageNumber: DEFAULT_PAGE_NUMBER,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      selectedCheckbox: [],
      searchOpen: false,
      searchKeyword: 'default',
      resetFilter: true,
      sortName: '',
      sortOrder: '',
      serviceCategoryId: '',
      scheduleType: 'both',
      isChecked: false
    }
    this.selectedCheckbox = []
    this.serviceTypeIds = []
    this.gridHeader = allServiceRequests
    this.filterTabs = filterTabs
    this.filterApplied = false
  }

  async componentDidMount() {
    const count = this.getCountData(this.state)
    this.setState({ status: this.props.activeSubTab })
    const list = this.getFilterData({
      status: this.props.activeSubTab,
    })
    await this.props.getServiceRequestCountList(count, this.filterApplied)
    await this.props.getServiceRequestTableList(list)
    this.props.getServiceCategory()
    this.props.getServiceRequestStatus()
    this.props.getScheduleType()
  }

  static getDerivedStateFromProps(props) {
    return {
      fromDate: props.fromDate,
      toDate: props.toDate,
      rowCount: props.paginationCount
    }
  }

  getCountData = data => {
    return {
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": this.filterApplied ? ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.all : this.state.status,
      "searchText": data.searchKeyword ? data.searchKeyword : this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "isRecurring": this.state.scheduleType,
      "serviceTypeIds": this.serviceTypeIds,
      "status": this.state.serviceRequestStatus
    }
  }

  getFilterData = data => {
    return {
      "pageNumber": data.pageNumber ? data.pageNumber : this.state.pageNumber,
      "pageSize": data.pageSize ? data.pageSize : this.state.pageSize,
      "sortColumn": this.state.sortName,
      "sortOrder": this.state.sortOrder,
      "fromDate": data.fromDate ? data.fromDate : this.state.fromDate,
      "toDate": data.toDate ? data.toDate : this.state.toDate,
      "tab": data.status ? data.status : this.state.status,
      "searchText": data.searchKeyword ? data.searchKeyword : this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "isRecurring": this.state.scheduleType,
      "serviceTypeIds": this.serviceTypeIds,
      "status": this.state.serviceRequestStatus
    }
  }

  getTable = async e => {
    const { pageSize } = this.state;
    let rowMaxValue = pageSize;
    await this.setState({
      status: e.target.value,
      pageSize: this.state.pageSize,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: ROW_MIN,
      rowMax: rowMaxValue,
      searchOpen: false,
      selectedOption: '',
      serviceRequestStatus: [],
      selectedOptionState: null,
      scheduleType: 'both',
      searchKeyword: 'default'
    })
    this.serviceTypeIds = []
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    this.filterTabs = this.getFilterTabBasedOnStatus(this.state.status)
    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)
    this.props.clearServiceTypes()
    this.props.clearRequestStatus(this.props.serviceStatus)
    this.props.clearScheduleType(this.props.scheduleType)
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    let data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    count.tab = ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.all
    await this.props.getServiceRequestCountList(count, this.filterApplied)
    await this.props.getServiceRequestTableList(data)
  }

  async componentDidUpdate(prevProps, prevState) {
    const { pageSize, rowCount } = this.state;
    let rowMaxValue = pageSize;
    const newDataCount = this.props.paginationCount;
    if (prevState.rowCount !== rowCount) {
      if (rowMaxValue >= newDataCount) {
        rowMaxValue = newDataCount;
      }
      this.setState({
        rowMax: rowMaxValue
      })
    }

    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)

    const count = this.getCountData(this.props)
    const list = this.getFilterData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })

    if (
      prevProps.fromDate !== this.props.fromDate ||
      prevProps.toDate !== this.props.toDate
    ) {
      await this.props.getServiceRequestCountList(count)
      await this.props.getServiceRequestTableList(list)
      await this.setState({
        rowMin: DEFAULT_PAGE_NUMBER,
        activePage: DEFAULT_PAGE_NUMBER})
    }
  }

  pageNumberChange = pageNumber => {
    const { pageSize, rowCount } = this.state
    let pageValue = pageNumber - 1
    let rowMinValue = (pageSize * pageValue) + 1
    let rowMaxValue = (pageSize * pageNumber)
    if (rowMaxValue >= rowCount) {
      rowMaxValue = rowCount
    }
    const list = this.getFilterData({
      pageNumber: pageNumber,
      pageSize: pageSize
    })
    this.props.getServiceRequestTableList(list)
    this.setState({
      activePage: pageNumber,
      pageNumber: pageNumber,
      rowMin: rowMinValue,
      rowMax: rowMaxValue
    })
  }

  pageSizeChange = async (pageSize) => {
    const { rowCount } = this.state;
    let rowMinValue = DEFAULT_PAGE_NUMBER;
    let rowMaxValue = pageSize;
    if (rowMaxValue >= rowCount) {
      rowMaxValue = rowCount;
    }
    const list = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: pageSize
    });
    await this.props.getServiceRequestTableList(list)
    await this.setState({ pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue });
  }

  getHeaderBasedOnStatus = status => {
    switch (status) {
      case ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.open:
        return openServiceRequests;
      case ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.cancelled:
        return cancelledServiceRequests;
      default:
        return allServiceRequests;
    }
  }

  impersinateServiceRequest = data => {
    this.props.getServiceRequestId(data.serviceRequestId);
    this.props.setPatient(data.patientId)
    this.props.setActiveTab(SERVICE_REQUEST_DETAILS_TAB.request)
    this.props.goToVisitServiceDetails();
  }

  handleChangeServiceCategory = selectedOption => {
    this.setState({
      serviceCategoryId: selectedOption.value,
      selectedOption: selectedOption,
    })
    this.serviceTypeIds = []
    this.props.clearServiceTypes()
    this.props.getServiceType(selectedOption.value)
  }

  handleScheduleType = async (item, e) => {
    let {scheduleType} = this.state
    scheduleType = (item.id === SCHEDULE_TYPE.recurring.id ) ? 
    SCHEDULE_TYPE.recurring.value : SCHEDULE_TYPE.oneTime.value
    await this.setState({
       scheduleType
    })
  }

  handleServiceType = item => {
    this.serviceTypeIds = pushSpliceHandler(this.serviceTypeIds, item.serviceTypeId)
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  handleServiceRequestStatus = item => {
    this.setState({
      serviceRequestStatus: pushSpliceHandler(this.state.serviceRequestStatus, item.id)
    })
  }

  applyFilter = async () => {
    this.filterApplied = (this.state.status === ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.all)
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    let data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    await this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
    })
    await this.props.getServiceRequestCountList(count, this.filterApplied)
    await this.props.getServiceRequestTableList(data)
  }

  applyReset = async () => {
    await this.setState({
      selectedOption: '',
      serviceRequestStatus: [],
      scheduleType: 'both',
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      selectedOptionState: null,
      filterOpen: false
    })
    this.serviceTypeIds = []
    this.props.clearServiceTypes()
    this.props.clearRequestStatus(this.props.serviceStatus)
    this.props.clearScheduleType(this.props.scheduleType)
    let data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getServiceRequestCountList(count)
    await this.props.getServiceRequestTableList(data)
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen,
      searchKeyword: ''
    })
  }

  handleSearchData = async (e) => {
    this.filterApplied = (this.state.status === ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.all)
    e.preventDefault();
    await this.setState({
      activePage: DEFAULT_PAGE_NUMBER,
    })
    const data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
  await this.props.getServiceRequestCountList(count, this.filterApplied)
   await this.props.getServiceRequestTableList(data)
  }

  handleSearchkeyword = e => {
    this.setState({
      searchKeyword: e.target.value
    })
  }

  closeSearch = async () => {
    const data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
      searchKeyword: 'default'
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      searchKeyword: 'default'
    })
    if(this.state.searchKeyword !== '') {
    await this.props.getServiceRequestCountList(count)
    await this.props.getServiceRequestTableList(data)
    }
    await this.setState({
      searchOpen: !this.state.searchOpen,
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      searchKeyword: 'default'
    })
  }

  getFilterTabBasedOnStatus = status => {
    switch (status) {
      case ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.all:
        return filterTabs;
      default:
        return filterTabs.filter(item => (item.id !== '8' && item.id !== '9'));
    }
  }

  render() {
    const { pageSize, activePage, rowMin, rowMax, rowCount, status } = this.state

    return (
      <div className="parent-fullblock">
        <div className="dashboard-tab-content">
          <div className="tab-filter-card">
            <StatCard
              countList={this.props.visitServiceRequestCountList}
              getTable={this.getTable}
              status={status}
            />
          </div>
          <div className="search-view-top">
          <div className="search-block-right">
          <Search
              toggleSearch={this.toggleSearch}
              searchOpen={this.state.searchOpen}
              searchKeyword={this.state.searchKeyword}
              handleSearchkeyword={this.handleSearchkeyword}
              handleSearchData={this.handleSearchData}
              closeSearch={this.closeSearch}
            />
          <span
              className='primaryColor profile-header-filter'
              onClick={this.toggleFilter}
            >
              Filters
          </span>
          </div>
          {this.props.paginationCount && this.props.paginationCount > 0 ?
            <div className="table-search-block">
              <RowPerPage
                pageSize={pageSize}
                pageSizeChange={this.pageSizeChange}
                pageSizeOption={PAGE_SIZE_OPTIONS}
                isEnabled={true}
                rowMin={rowMin}
                rowMax={rowMax}
                rowCount={rowCount}
              />
            </div> : ''
          }
          </div>
          <div className="tab-table-view">
            <div className="full-block-tableview">
              <Grid
                data={this.props.visitServiceRequestTableList}
                header={this.gridHeader}
                impersinate={this.impersinateServiceRequest}
                noRecordsFound={NO_RECORDS_FOUND}
              />
            </div>
            <CoreoPagination
              activePage={activePage}
              itemsCountPerPage={pageSize}
              totalItemsCount={pageSize > this.props.paginationCount ? 0 : this.props.paginationCount}
              pageRangeDisplayed={PAGE_RANGE}
              onChange={this.pageNumberChange}
            />
          </div>
          <Filter
            isOpen={this.state.filterOpen}
            toggle={this.toggleFilter}
            serviceRequestStatusList={this.props.serviceStatus}
            handleServiceRequestStatus={this.handleServiceRequestStatus}
            serviceCategory={this.props.serviceCategory}
            getServiceType={this.props.getServiceType}
            handleChangeServiceCategory={this.handleChangeServiceCategory}
            selectedOption={this.state.selectedOption}
            serviceType={this.props.serviceType}
            handleServiceType  ={(item, e) => {
              this.handleServiceType  (item, e)
            }}
            applyFilter={this.applyFilter}
            applyReset={this.applyReset}
            scheduleType={this.props.scheduleType}
            handleScheduleType={this.handleScheduleType}
            stateDetail={this.props.statesType}
            selectedOptionState={this.state.selectedOptionState}
            status={this.state.status}
            filterTabs={this.filterTabs}
        />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceRequestCountList: (data, filterApplied) =>
      dispatch(getServiceRequestCountList(data, filterApplied)),
    getServiceRequestTableList: data =>
      dispatch(getServiceRequestTableList(data)),
    goToVisitServiceDetails: () => dispatch(push(Path.visitServiceDetails)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    setPatient: data => dispatch(setPatient(data)),
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data)),
    getServiceType: (data) => dispatch(getServiceType(data)),
    clearServiceTypes: (data) => dispatch(clearServiceTypes(data)),
    getServiceCategory: () => dispatch(getServiceCategory()),
    getScheduleType: () => dispatch(getScheduleType()),
    getServiceRequestStatus: () => dispatch(getServiceRequestStatus()),
    clearRequestStatus: data => dispatch(clearRequestStatus(data)),
    clearScheduleType: data => dispatch(clearScheduleType(data))
  }
}

function mapStateToProps(state) {
  return {
    visitServiceRequestCountList: state.dashboardState
      .VisitServiceRequestState.visitServiceRequestCountList,
    visitServiceRequestTableList: state.dashboardState
      .VisitServiceRequestState.visitServiceRequestTableList,
    paginationCount: state.dashboardState.VisitServiceRequestState
      .paginationCount,
    activeSubTab: state.dashboardState.VisitServiceRequestState.activeSubTab,
    serviceStatus: state.dashboardState.VisitServiceRequestState.serviceRequestStatusList,
    serviceCategory: state.visitSelectionState.ServiceRequestFilterState.ServiceCategory,
    scheduleType: state.dashboardState.VisitServiceRequestState.scheduleType,
    serviceType: state.visitHistoryState.vistServiceHistoryState.typeList
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceRequest)
)
