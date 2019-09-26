import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ROW_MIN,
  NO_RECORDS_FOUND,
  LOWTASK,
  SORT_ORDER,
  PAGE_RANGE,
  SERVICE_REQUEST_DETAILS_TAB,
  ENTITY_DASHBOARD_STATUS
} from '../../../../constants/constants'
import {
  getVisitServiceCountList,
  getVisitServiceTableList,
  setActiveSubTab,
  setImpersinated,
  setServiceRequestStatus,
  checkServiceType,
  setServiceType,
  setFilterApplied,
  checkServiceRequestStatus,
  setServiceCategory,
  resetFilter
} from '../../../../redux/dashboard/EntityDashboard/ServiceVisits/actions'
import { Path } from '../../../../routes';
import { push } from '../../../../redux/navigation/actions';
import { getUserInfo } from '../../../../utils/userUtility';
import { Grid } from '../Components/Grid/Grid'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'
import { allServiceVisits, cancelledServiceVisits, lowTaskServiceVisits, overDueServiceVisits } from './gridHeader'
import { StatCard } from '../Components/StatCard'
import { setActiveStatusForAllTab } from '../../../../redux/dashboard/EntityDashboard/Individuals/actions'
import {
  getServiceRequestId,
  setActiveTab
} from '../../../../redux/visitSelection/VisitServiceDetails/actions'
import { setPatient } from "../../../../redux/patientProfile/actions";
import {
  getVisitServiceHistoryByIdDetail,
} from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import Filter from '../Components/Filters'
import { filterTabs } from './filterTabs';
import {
  getServiceRequestStatus,
  clearRequestStatus
} from '../../../../redux/dashboard/EntityDashboard/ServiceRequest/actions'
import { getServiceCategory } from "../../../../redux/visitSelection/ServiceRequestFilters/actions";
import {  
  getServiceType,
  clearServiceTypes
} from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import Search from '../Components/Search';

import { RowPerPage } from '../../../../components';
import { pushSpliceHandler } from '../../../../utils/stringHelper';
export class ServiceVisits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'All',
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      serviceTypeIds: [],
      serviceRequestStatus: this.props.serviceRequestStatus,
      serviceTypes: [],
      activePage: DEFAULT_PAGE_NUMBER,
      pageNumber: DEFAULT_PAGE_NUMBER,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      sortName: '',
      sortOrder: '',
      searchKeyword: 'default',
      filterOpen: false
    }
    this.serviceTypeIds = this.props.serviceTypeIds
    this.gridHeader = allServiceVisits
    this.filterApplied = this.props.filterApplied
  }

  async componentDidMount() {
    const count = this.getCountData(this.state)
    await this.setState({ status: this.props.activeSubTab })
    const list = this.getFilterData({
      status: this.props.activeSubTab,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
    })
    this.props.getServiceCategory()
    this.props.getServiceRequestStatus()
    await this.props.getVisitServiceCountList(count, this.props.filterApplied, () =>  this.onSuccess(list))
    this.props.setImpersinated(false)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      fromDate: props.fromDate,
      toDate: props.toDate,
      rowCount: props.paginationCount,
      rowMax: state.pageSize > props.paginationCount ? props.paginationCount : state.pageSize
    }
  }

  async componentWillUnmount() {
    if(!this.props.isImpersinated) {
      await this.props.resetFilter()
      await this.props.clearServiceTypes()
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { pageSize, rowCount } = this.state;
    let rowMaxValue = pageSize;
    const newDataCount = this.props.paginationCount;
    if (prevState.rowCount !== rowCount) {
      if (rowMaxValue >= newDataCount) {
        rowMaxValue = newDataCount;
      }
      await this.setState({
        rowMax: rowMaxValue
      })
    }

    const count = this.getCountData(this.props)
    const list = this.getFilterData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    if (
      prevProps.fromDate !== this.props.fromDate ||
      prevProps.toDate !== this.props.toDate
    ) {
      await this.props.getVisitServiceCountList(count, false, () =>  this.onSuccess(list))
      await this.setState({
        rowMin: DEFAULT_PAGE_NUMBER,
        activePage: DEFAULT_PAGE_NUMBER})
    }
  }

  getCountData = data => {
    return {
      fromDate: data.fromDate,
      toDate: data.toDate,
      serviceProviderId: getUserInfo().serviceProviderId,
      serviceTypeIds: this.props.serviceTypeIds,
      visitStatus: this.props.serviceRequestStatus,
      searchText: data.searchKeyword ? data.searchKeyword : this.state.searchKeyword,
      tab: this.props.filterApplied ? ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.all : this.state.status
    }
  }

  getFilterData = data => {
    return {
      "pageNumber": data.pageNumber ? data.pageNumber : this.state.pageNumber,
      "pageSize": data.pageSize ? data.pageSize : this.state.pageSize,
      "sortColumn": data.sortName ? data.sortName : this.state.sortName,
      "sortOrder": data.sortOrder ? data.sortOrder : this.state.sortOrder,
      "fromDate": data.fromDate ? data.fromDate : this.state.fromDate,
      "toDate": data.toDate ? data.toDate : this.state.toDate,
      "tab": data.status ? data.status : this.state.status,
      "searchText": data.searchKeyword ? data.searchKeyword : this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "serviceTypeIds": this.props.serviceTypeIds,
      "visitStatus": this.props.serviceRequestStatus
    }
  }

  getTable = async e => {
    this.serviceTypeIds = []
    await this.setState({
      status: e.target.value,
      pageSize: this.state.pageSize,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: ROW_MIN,
      selectedOption: '',
      serviceRequestStatus: [],
      searchKeyword: 'default',
      searchOpen: false
    })
    this.serviceTypeIds = []
    this.props.resetFilter()
    this.props.clearServiceTypes()
    this.props.clearRequestStatus(this.props.serviceProviderVisitStatus)
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)
    const data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
      sortName: this.state.status === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.state.status === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
    })
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    count.tab = ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.all
    await this.props.getVisitServiceCountList(count, this.props.filterApplied, () =>  this.onSuccess(data))
  }

  onSuccess = (data) => {
     this.props.getVisitServiceTableList(data)
  }

  getHeaderBasedOnStatus = status => {
    switch (status) {
      case ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.lowTaskCompletions:
        return lowTaskServiceVisits;
      case ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.cancelled:
        return cancelledServiceVisits;
      case ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.overDue:
        return overDueServiceVisits;
      default:
        return allServiceVisits;
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
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      pageSize: pageSize
    })
    this.props.getVisitServiceTableList(list)
    this.setState({
      activePage: pageNumber,
      pageNumber: pageNumber,
      rowMin: rowMinValue,
      rowMax: rowMaxValue
    })
  }

  pageSizeChange = (pageSize) => {
    const { rowCount } = this.state;
    let rowMinValue = DEFAULT_PAGE_NUMBER;
    let rowMaxValue = pageSize;
    if (rowMaxValue >= rowCount) {
      rowMaxValue = rowCount;
    }
    const list = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      pageSize: pageSize
    });
    this.props.getVisitServiceTableList(list);
    this.setState({
      pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue
    });
  }

  impersinateServiceVisit = data => {
    this.props.setImpersinated(true)
    if (this.state.status === 'LowTaskCompletions') {
      this.props.getServiceRequestId(0)
      this.props.getVisitServiceHistoryByIdDetail(data.servicePlanVisitId)
    } else {
      this.props.getServiceRequestId(data.serviceRequestId);
      this.props.setPatient(data.patientId)
      this.props.setActiveTab(SERVICE_REQUEST_DETAILS_TAB.myPlan)
      this.props.goToVisitServiceDetails();
    }
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  handleServiceRequestStatus = (item, e) => {
    this.setState({
      isActive: !this.state.isActive
     })
    let serviceRequestStatus = pushSpliceHandler(this.props.serviceRequestStatus, item.id)
    this.props.checkServiceRequestStatus(this.props.serviceProviderVisitStatus, item.id, e.target.checked)
    this.props.setServiceRequestStatus(serviceRequestStatus)
  }

  
  handleChangeServiceCategory = selectedOption => {
    this.setState({
      serviceCategoryId: selectedOption.value,
      selectedOption: selectedOption,
    })
    this.serviceTypeIds = []
    this.props.setServiceCategory(selectedOption)
    this.props.setServiceType([])
    this.props.clearServiceTypes()
    this.props.getServiceType(selectedOption.value)
  }

  handleServiceType  = (item, e) => {
    let serviceTypeIds = pushSpliceHandler(this.props.serviceTypeIds, item.serviceTypeId)
    this.props.checkServiceType(this.props.serviceType, item.serviceTypeId, e.target.checked)
    this.props.setServiceType(serviceTypeIds)
  }

  applyFilter = async () => {
    let filterApplied = (this.state.status === ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.all)
    await this.props.setFilterApplied(filterApplied)
    let data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER
    })
    await this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER
    })
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    await this.props.getVisitServiceCountList(count, this.props.filterApplied, () =>  this.onSuccess(data))
  }

  applyReset = async () => {
    await this.setState({
      selectedOption: '',
      serviceRequestStatus: [],
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      filterOpen: false
    })
    this.serviceTypeIds = []
    this.props.resetFilter()
    this.props.clearServiceTypes()
    this.props.clearRequestStatus(this.props.serviceProviderVisitStatus)
    const data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getVisitServiceCountList(count, false, () =>  this.onSuccess(data))
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen,
      searchKeyword: ''
    })
  }

  handleSearchData = async (e) => {
    let filterApplied = (this.state.status === ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.all)
    this.props.setFilterApplied(filterApplied)
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
   await this.props.getVisitServiceCountList(count, this.props.filterApplied, () =>  this.onSuccess(data))
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
      await this.props.getVisitServiceCountList(count, false, () =>  this.onSuccess(data))
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

  render() {
    const { pageSize, activePage, rowMin, rowMax, rowCount, status } = this.state
    return (
      <div className="parent-fullblock">
        <div className="dashboard-tab-content">
          <div className="tab-filter-card">
            <StatCard
              countList={this.props.visitServiceCountList}
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
          {this.props.paginationCount > 0 ?
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
                data={this.props.visitServiceTableList}
                header={this.gridHeader}
                impersinate={this.impersinateServiceVisit}
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
            serviceRequestStatusList={this.props.serviceProviderVisitStatus}
            handleServiceRequestStatus={this.handleServiceRequestStatus}
            serviceCategory={this.props.serviceCategory}
            getServiceType={this.props.getServiceType}
            handleChangeServiceCategory={this.handleChangeServiceCategory}
            selectedOption={this.props.selectedOption}
            serviceType={this.props.serviceType}
            handleServiceType ={this.handleServiceType }
            applyFilter={this.applyFilter}
            addChecked={this.props.addChecked}
            applyReset={this.applyReset}
            status={this.state.status}
            filterTabs={filterTabs}
            isActive={this.state.isActive}
        />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceCountList: (data, filterApplied, onSuccess) => dispatch(getVisitServiceCountList(data, filterApplied, onSuccess)),
    getVisitServiceTableList: data => dispatch(getVisitServiceTableList(data)),
    goToVisitServiceDetails: () => dispatch(push(Path.visitServiceDetails)),
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    setPatient: data => dispatch(setPatient(data)),
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    getServiceRequestStatus: () => dispatch(getServiceRequestStatus()),
    clearRequestStatus: data => dispatch(clearRequestStatus(data)),
    getServiceType: (data) => dispatch(getServiceType(data)),
    clearServiceTypes: (data) => dispatch(clearServiceTypes(data)),
    getServiceCategory: () => dispatch(getServiceCategory()),
    setImpersinated: data => dispatch(setImpersinated(data)),
    setServiceCategory: data => dispatch(setServiceCategory(data)),
    checkServiceType: (data, id, checked) => dispatch(checkServiceType(data, id, checked)),
    setServiceType: data => dispatch(setServiceType(data)),
    setFilterApplied: data => dispatch(setFilterApplied(data)),
    checkServiceRequestStatus: (data, id, checked) => dispatch(checkServiceRequestStatus(data, id, checked)),
    setServiceRequestStatus: data => dispatch(setServiceRequestStatus(data)),
    resetFilter: () => dispatch(resetFilter()),
  }
}

function mapStateToProps(state) {
  return {
    visitServiceCountList: state.dashboardState.VisitServiceCountListState
      .visitServiceCountList,
    visitServiceTableList: state.dashboardState.VisitServiceCountListState
      .visitServiceTableList,
    activeSubTab: state.dashboardState.VisitServiceCountListState.activeSubTab,
    paginationCount: state.dashboardState.VisitServiceCountListState.paginationCount,
    serviceProviderVisitStatus: state.dashboardState.VisitServiceRequestState.serviceRequestStatusList,
    serviceCategory: state.visitSelectionState.ServiceRequestFilterState.ServiceCategory,
    serviceType: state.visitHistoryState.vistServiceHistoryState.typeList,
    isImpersinated: state.dashboardState.VisitServiceCountListState.isImpersinated,
    selectedOption: state.dashboardState.VisitServiceCountListState.selectedOption,
    serviceTypeIds: state.dashboardState.VisitServiceCountListState.serviceTypeIds,
    filterApplied: state.dashboardState.VisitServiceCountListState.filterApplied,
    serviceRequestStatus: state.dashboardState.VisitServiceCountListState.serviceRequestStatus
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceVisits)
)
