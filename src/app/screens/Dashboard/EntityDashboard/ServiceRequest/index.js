import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ROW_MIN,
  PAGE_RANGE,
  NO_RECORDS_FOUND,
  DEFAULT_SERVICE_CATEGORY,
  YEAR_MONTH_DAY,
  serviceRequestDetailsTab
} from '../../../../constants/constants'
import {
  getServiceRequestCountList,
  getServiceRequestTableList,
  getServiceRequestDetails,
  setActiveSubTab
} from '../../../../redux/dashboard/EntityDashboard/ServiceRequest/actions'
import { getPersonalDetailIndividual } from '../../../../redux/auth/user/actions'
import { push } from '../../../../redux/navigation/actions';
import { Path } from '../../../../routes';
import { getUserInfo } from '../../../../utils/userUtility';
import moment from 'moment';
import { REVIEW } from './constants';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility'
import { Grid } from '../Components/Grid/Grid'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'
import RowPerPage from '../Components/RowPerPage';
import { allServiceRequests, openServiceRequests, cancelledServiceRequests } from './GridHeader'
import { StatCard } from '../Components/StatCard'
import {
  getServiceRequestId,
  setActiveTab
} from '../../../../redux/visitSelection/VisitServiceDetails/actions'
import { setPatient } from "../../../../redux/patientProfile/actions";
import { setActiveStatusForAllTab } from '../../../../redux/dashboard/EntityDashboard/Individuals/actions'

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
      scheduleId: 0,
      isChecked: false,
      isActive: false,
      modal: false,
      icdModal: false,
      patientId: '',
      serviceRequestId: '',
      tabName: '',
      activePage: DEFAULT_PAGE_NUMBER,
      pageNumber: DEFAULT_PAGE_NUMBER,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      selectedIcd: '',
      approvalServiceRequestId: '',
      stateId: '',
      stateName: '',
      coverageArea: 0,
      city: '',
      street: '',
      zip: '',
      selectedCheckbox: [],
      isAuthorization: false,
      searchOpen: false,
      searchKeyword: 'default',
      resetFilter: true,
      sortName: '',
      sortOrder: '',
      serviceCategoryId: ''
    }
    this.data = 1
    this.selectedCheckbox = []
    this.authorizationNumber = ''
    this.authorizationNumbernew = ''
    this.serviceTypeIds = []
    this.gridHeader = allServiceRequests
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
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      searchKeyword: this.state.searchKeyword
    })
    await this.props.getServiceRequestCountList(count)
    await this.props.getServiceRequestTableList(list)
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
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      searchKeyword: this.state.searchKeyword,
      resetFilter: false
    })
    if (
      nextProps.fromDate !== this.props.fromDate ||
      nextProps.toDate !== this.props.toDate
    ) {
      await this.props.getServiceRequestCountList(count)
      await this.props.getServiceRequestTableList(list)
    }
  }

  getCountData = data => {
    return {
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": this.state.status,
      "searchText": "default",
      "serviceProviderId": getUserInfo().serviceProviderId,
      "isRecurring": 'both',
      "serviceTypeIds": this.serviceTypeIds
    }
  }

  getFilterData = data => {
    return {
      "pageNumber": data.pageNumber,
      "pageSize": data.pageSize,
      "sortColumn": this.state.sortName,
      "sortOrder": this.state.sortOrder,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": data.status,
      "searchText": this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "isRecurring": 'both',
      "serviceTypeIds": this.serviceTypeIds
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
      scheduleId: 0,
      street: '',
      city: '',
      state: '',
      zip: '',
      coverageArea: 0,
      selectedOptionState: null
    })
    this.serviceTypeIds = []
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    let data = this.getFilterData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      status: this.state.status,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    await this.props.getServiceRequestCountList(count)
    await this.props.getServiceRequestTableList(data)
  }

  componentDidUpdate(prevProps, prevState) {
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
      pageSize: pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      searchKeyword: this.state.searchKeyword
    })
    this.props.getServiceRequestTableList(list)
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
      pageSize: pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      searchKeyword: this.state.searchKeyword
    });
    this.props.getServiceRequestTableList(list)
    this.setState({ pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue });
  }

  getHeaderBasedOnStatus = status => {
    switch (status) {
      case 'open':
        return openServiceRequests;
      case 'cancelled':
        return cancelledServiceRequests;
      default:
        return allServiceRequests;
    }
  }

  impersinateServiceRequest = data => {
    this.props.getServiceRequestId(data.serviceRequestId);
    this.props.setPatient(data.patientId)
    this.props.setActiveTab(serviceRequestDetailsTab.request)
    this.props.goToVisitServiceDetails();
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
          {this.props.paginationCount && this.props.paginationCount > 0 ?
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
                data={this.props.visitServiceRequestTableList}
                header={this.gridHeader}
                impersinate={this.impersinateServiceRequest}
              />
            </div>
            <CoreoPagination
              activePage={activePage}
              itemsCountPerPage={DEFAULT_PAGE_SIZE}
              totalItemsCount={pageSize > this.props.paginationCount ? 0 : this.props.paginationCount}
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
    getServiceRequestCountList: data =>
      dispatch(getServiceRequestCountList(data)),
    getServiceRequestTableList: data =>
      dispatch(getServiceRequestTableList(data)),
    getServiceRequestDetails: data => dispatch(getServiceRequestDetails(data)),
    goToVisitServiceDetails: () => dispatch(push(Path.visitServiceDetails)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    setPatient: data => dispatch(setPatient(data)),
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data))
  }
}

function mapStateToProps(state) {
  return {
    visitServiceRequestCountList: state.dashboardState
      .VisitServiceRequestState.visitServiceRequestCountList,
    visitServiceRequestTableList: state.dashboardState
      .VisitServiceRequestState.visitServiceRequestTableList,
    serviceRequestStatusList: state.dashboardState.VisitServiceRequestState
      .serviceRequestStatusList,
    scheduleType: state.dashboardState.VisitServiceRequestState.scheduleType,
    requestDetails: state.dashboardState.VisitServiceRequestState
      .requestDetails,
    diagnosisCode: state.dashboardState.VisitServiceRequestState
      .diagnosisCode,
    paginationCount: state.dashboardState.VisitServiceRequestState
      .paginationCount,
    activeSubTab: state.dashboardState.VisitServiceRequestState.activeSubTab
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceRequest)
)
