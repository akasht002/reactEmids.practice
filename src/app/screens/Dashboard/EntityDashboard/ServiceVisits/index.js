import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
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
  serviceRequestDetailsTab
} from '../../../../constants/constants'
import {
  getVisitServiceCountList,
  getVisitServiceTableList,
  setActiveSubTab
} from '../../../../redux/dashboard/EntityDashboard/ServiceVisits/actions'
// import {
//   getServiceCategory,
//   getServiceRequestVisitStatus,
//   getServiceProviderVisitStatus,
//   clearServiceProviderVisitStatuRequestStatus
// } from '../../../../redux/servicerequest/Requirements/actions'
// import { getPersonalDetailIndividual } from '../../../../redux/auth/user/actions'
// import {
//   getServiceRequestId,
//   setTab
// } from '../../../../redux/visitSelection/VisitServiceDetails/actions'
import { Path } from '../../../../routes';
import { push } from '../../../../redux/navigation/actions';
import { getUserInfo } from '../../../../utils/userUtility';
// import {
//   getServiceType,
//   clearServiceTypes
// } from '../../../../redux/serviceproviders/Search/Filters/actions'
import { Grid } from '../Components/Grid/Grid'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'
import RowPerPage from '../Components/RowPerPage';
import { allServiceVisits, cancelledServiceVisits, lowTaskServiceVisits, overDueServiceVisits } from './GridHeader'
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
export class ServiceVisits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'All',
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      filterOpen: false,
      isChecked: false,
      serviceTypeIds: [],
      serviceRequestStatus: [],
      serviceCategoryId: '',
      serviceTypes: [],
      activePage: DEFAULT_PAGE_NUMBER,
      pageNumber: DEFAULT_PAGE_NUMBER,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      searchOpen: false,
      sortName: 'ModifiedDate',
      sortOrder: 'desc',
      searchKeyword: 'default',
      resetFilter: true
    }
    this.serviceTypeIds = []
    this.IsSortIcon = false
    this.gridHeader = allServiceVisits
  }

  async componentDidMount() {
    const count = this.getCountData(this.state)
    this.setState({ status: this.props.activeSubTab })
    const list = this.getFilterData({
      state: this.state,
      status: this.props.activeSubTab,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      searchKeyword: this.state.searchKeyword
    })
    await this.props.getVisitServiceCountList(count)
    await this.props.getVisitServiceTableList(list)
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageSize, rowCount } = this.state;
    let rowMaxValue = pageSize;
    const newDataCount = this.props.visitServiceTableList && this.props.visitServiceTableList.length > 0 && this.props.visitServiceTableList[0].dataCount;
    if (prevState.rowCount !== rowCount) {
      if (rowMaxValue >= newDataCount) {
        rowMaxValue = newDataCount;
      }
      this.setState({
        rowMax: rowMaxValue
      })
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      fromDate: nextProps.fromDate,
      toDate: nextProps.toDate,
      rowCount: nextProps.paginationCount
    })
    const count = this.getCountData(nextProps)
    const list = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: nextProps.fromDate,
      toDate: nextProps.toDate,
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      sortName: nextProps.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: nextProps.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      resetFilter: false,
      searchKeyword: this.state.searchKeyword
    })
    if (
      nextProps.fromDate !== this.props.fromDate ||
      nextProps.toDate !== this.props.toDate
    ) {
      await this.props.getVisitServiceCountList(count)
      await this.props.getVisitServiceTableList(list)
    }
  }

  getCountData = data => {
    return {
      fromDate: data.fromDate,
      toDate: data.toDate,
      serviceProviderId: getUserInfo().serviceProviderId,
      serviceTypeIds: this.serviceTypeIds,
      visitStatus: this.state.serviceRequestStatus,
      searchText: this.state.searchKeyword,
      tab: this.state.status.toLowerCase()
    }
  }

  getFilterData = data => {
    return {
      "pageNumber": data.pageNumber,
      "pageSize": data.pageSize,
      "sortColumn": data.sortName,
      "sortOrder": data.sortOrder,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": data.status && data.status.toLowerCase(),
      "searchText": this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "serviceTypeIds": this.serviceTypeIds,
      "visitStatus": this.state.serviceRequestStatus
    }
  }

  getTable = async e => {
    const { pageSize } = this.state;
    let rowMaxValue = pageSize;
    this.serviceTypeIds = []
    await this.setState({
      status: e.target.value,
      pageSize: this.state.pageSize,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: ROW_MIN,
      rowMax: rowMaxValue,
      selectedOption: '',
      serviceRequestStatus: [],
      searchOpen: false
    })
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)
    const data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.state.status === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.state.status === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      resetFilter: true,
    })
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    await this.props.getVisitServiceCountList(count)
    await this.props.getVisitServiceTableList(data)
  }

  getHeaderBasedOnStatus = status => {
    switch (status) {
      case 'LowTaskCompletions':
        return lowTaskServiceVisits;
      case 'Cancelled':
        return cancelledServiceVisits;
      case 'Overdue':
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
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: pageNumber,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      pageSize: pageSize,
      searchKeyword: this.state.searchKeyword
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
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      pageSize: pageSize,
      searchKeyword: this.state.searchKeyword
    });
    this.props.getVisitServiceTableList(list);
    this.setState({
      pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue
    });
  }

  impersinateServiceVisit = data => {
    if (this.state.status === 'LowTaskCompletions') {
      this.props.getServiceRequestId(data.serviceRequestId)
      this.props.getVisitServiceHistoryByIdDetail(data.servicePlanVisitId)
    } else {
      this.props.getServiceRequestId(data.serviceRequestId);
      this.props.setPatient(data.patientId)
      this.props.setActiveTab(serviceRequestDetailsTab.myPlan)
      this.props.goToVisitServiceDetails();
    }
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
          {this.props.paginationCount > 0 ?
          <div className="table-search-block">
              <RowPerPage
                pageSize={pageSize}
                pageSizeChange={this.pageSizeChange}
                pageSizeOption={PAGE_SIZE_OPTIONS}
              />
              <div className="-pagination rowPerPage-pagniation pagination-block"><div class="-center"><span className="-pageInfo p-0">
                {"Showing "}
                <span className="-rowMin">{rowMin}</span>
                {" - "}
                <span className="-rowMax">{rowMax}</span>
                {" of "}
                <span className="-rowCount">{rowCount}</span>
                {" results"}
              </span></div></div></div> : ''
          }
          <div className="tab-table-view">
            <div className="full-block-tableview">
              <Grid
                data={this.props.visitServiceTableList}
                header={this.gridHeader}
                impersinate={this.impersinateServiceVisit}
              />
            </div>
            <CoreoPagination
              activePage={activePage}
              itemsCountPerPage={DEFAULT_PAGE_SIZE}
              totalItemsCount={this.props.paginationCount}
              pageRangeDisplayed={PAGE_RANGE}
              onChange={this.pageNumberChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceCountList: data => dispatch(getVisitServiceCountList(data)),
    getVisitServiceTableList: data => dispatch(getVisitServiceTableList(data)),
    goToVisitServiceDetails: () => dispatch(push(Path.visitServiceDetails)),
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    setPatient: data => dispatch(setPatient(data)),
    getVisitServiceHistoryByIdDetail: data =>
    dispatch(getVisitServiceHistoryByIdDetail(data))
  }
}

function mapStateToProps(state) {
  return {
    visitServiceCountList: state.dashboardState.VisitServiceCountListState
      .visitServiceCountList,
    visitServiceTableList: state.dashboardState.VisitServiceCountListState
      .visitServiceTableList,
    updatedServiceType: state.dashboardState.VisitServiceCountListState
      .serviceType,
    activeSubTab: state.dashboardState.VisitServiceCountListState.activeSubTab,
    paginationCount: state.dashboardState.VisitServiceCountListState.paginationCount
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceVisits)
)
