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
  DEFAULT_SERVICE_CATEGORY
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
      searchKeyword: '',
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
      rowCount: nextProps.visitServiceTableList && nextProps.visitServiceTableList.length && nextProps.visitServiceTableList[0].dataCount,
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

  componentWillUnmount() {
    this.props.getServiceType(DEFAULT_SERVICE_CATEGORY)
  }

  getCountData = data => {
    return {
      fromDate: data.fromDate,
      toDate: data.toDate,
      sortName: 'ModifiedDate',
      status: [],
      sortOrder: SORT_ORDER.ASC,
      careTeamId: getUserInfo().careTeamId,
      serviceTypeIds: [],
      statusName: '',
      pageNumber: 0,
      pageSize: 0
    }
  }

  getFilterData = data => {
    return {
      fromDate: data.fromDate,
      toDate: data.toDate,
      status: !data.resetFilter ? data.state.serviceRequestStatus : [],
      careTeamId: getUserInfo().careTeamId,
      serviceTypeIds: !data.resetFilter ? (this.state.serviceCategoryId === '' ? [] : this.serviceTypeIds.length > 0 ? this.serviceTypeIds : this.getServicesTypeId()) : [],
      statusName: data.status,
      sortOrder: data.sortOrder,
      sortName: data.sortName,
      pageNumber: data.pageNumber ? data.pageNumber : 1,
      pageSize: parseInt(data.pageSize, 10),
      searchText: data.searchKeyword,
    }
  }

  getTable = e => {
    const { pageSize } = this.state;
    let rowMaxValue = pageSize;
    let dataCount = this.props.visitServiceCountList && this.props.visitServiceCountList.filter(obj => {
      return obj.statusName === e.target.value
    })
    if (pageSize >= (dataCount && dataCount.length > 0 && dataCount[0].totalCount)) {
      rowMaxValue = dataCount[0].totalCount;
    }
    this.IsSortIcon = false
    this.serviceTypeIds = []
    this.setState({
      status: e.target.value,
      pageSize: this.state.pageSize,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: ROW_MIN,
      rowMax: rowMaxValue,
      selectedOption: '',
      serviceRequestStatus: [],
      searchKeyword: '',
      searchOpen: false
    })
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    const data = this.getFilterData({
      state: this.state,
      status: e.target.value,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: e.target.value === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: e.target.value === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      resetFilter: true,
      searchKeyword: ''
    })
    this.props.getVisitServiceTableList(data)
    this.props.setActiveSubTab(e.target.value)
  }

  getHeaderBasedOnStatus = status => {
    switch (status) {
      case 'lowTask':
        return lowTaskServiceVisits;
      case 'cancelled':
        return cancelledServiceVisits;
      case 'overDue':
        return overDueServiceVisits;
      default:
        return allServiceVisits;
    }
  }

  handleServiceRequestStatus = (item, e) => {
    let serviceRequestStatus = this.state.serviceRequestStatus
    this.setState({
      isChecked: !this.state.isChecked
    })
    if (e.target.checked) {
      serviceRequestStatus.push(item.id)
    } else {
      let index = serviceRequestStatus.indexOf(item.id)
      if (index > -1) {
        serviceRequestStatus.splice(index, 1)
      }
    }
    this.setState({
      serviceRequestStatus: serviceRequestStatus
    })
  }

  handleserviceType = (item, e) => {
    let serviceType = this.serviceTypeIds
    if (e.target.checked) {
      serviceType.push(item.serviceTypeId)
    } else {
      let index = serviceType.indexOf(item.serviceTypeId)
      if (index > -1) {
        serviceType.splice(index, 1)
      }
    }
    this.serviceTypeIds = serviceType
  }

  applyFilter = () => {
    const data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      resetFilter: false,
      searchKeyword: this.state.searchKeyword
    })
    data.statusName = null;
    this.props.getVisitServiceTableList(data)
    this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      status: data.statusName
    })
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })

  }

  handleChangeServiceCategory = selectedOption => {
    this.setState({
      serviceCategoryId: selectedOption.value,
      selectedOption: selectedOption,
    })
    this.serviceTypeIds = []
    this.props.getServiceType(selectedOption.value)
  }

  applyReset = () => {
    this.setState({
      selectedOption: '',
      serviceRequestStatus: [],
      status: 'All',
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      filterOpen: false
    })
    this.serviceTypeIds = []
    this.props.clearServiceTypes()
    this.props.clearRequestStatus(this.props.serviceProviderVisitStatus)
    const data = this.getFilterData({
      state: this.state,
      status: 'All',
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      resetFilter: true,
      searchKeyword: this.state.searchKeyword
    })
    if (this.state.searchOpen === false) {
      this.props.getVisitServiceTableList(data)
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

  // impersinateIndividual = data => {
  //   this.props.getServiceRequestId(data.serviceRequestId);
  //   this.props.setTab('2')
  //   this.props.goToVisitServiceDetails();
  // }

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
    if (list.status.length > 0) {
      list.statusName = ''
    }
    this.props.getVisitServiceTableList(list);
    this.setState({
      pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue,
      status: list.statusName
    });
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen
    })
    this.setState({ searchKeyword: '' })
  }

  handleSearchkeyword = e => {
    this.setState({
      searchKeyword: e.target.value
    })
  }

  handleSearchkeywordPress = (event) => {
    if (event.charCode === 13) {
      const data = this.getFilterData({
        state: this.state,
        status: this.state.status,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        pageNumber: DEFAULT_PAGE_NUMBER,
        pageSize: this.state.pageSize,
        sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
        sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
        searchKeyword: this.state.searchKeyword
      })
      this.props.getVisitServiceTableList(data);
    }
  }

  handleSearchData = (e) => {
    e.preventDefault();
    this.setState({
      activePage: DEFAULT_PAGE_NUMBER,
    })
    const data = this.getFilterData({
      state: this.state,
      status: null,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      searchKeyword: this.state.searchKeyword
    })
    this.setState({
      status: data.statusName
    })
    this.props.getVisitServiceTableList(data);
    this.applyReset()
  }

  closeSearch = () => {
    const data = this.getFilterData({
      state: this.state,
      status: 'All',
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.props.activeSubTab === LOWTASK ? LOWTASK : this.state.sortName,
      sortOrder: this.props.activeSubTab === LOWTASK ? SORT_ORDER.ASC : this.state.sortOrder,
      searchKeyword: ""
    })
    this.props.getVisitServiceTableList(data);
    this.setState({
      searchOpen: !this.state.searchOpen,
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      status: 'All',
      searchKeyword: ''
    })
  }

  onSortedChange = (value) => {
    let sortOrders = value[0].desc ? 'desc' : SORT_ORDER.ASC
    this.IsSortIcon = true
    this.setState({ sortName: value[0].id, sortOrder: sortOrders })
    const data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchKeyword: this.state.searchKeyword,
      sortName: value[0].id,
      sortOrder: sortOrders
    })
    this.props.getVisitServiceTableList(data);
  }

  getServicesTypeId = () => {
    const typeId = this.props.serviceType && this.props.serviceType.map((data, index) => {
      return data.serviceTypeId
    })
    return typeId;
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
          {this.props.visitServiceRequestTableList && this.props.visitServiceRequestTableList.length > 0 ?
            <div>
              <RowPerPage
                pageSize={pageSize}
                pageSizeChange={this.pageSizeChange}
                pageSizeOption={PAGE_SIZE_OPTIONS}
              />
              <div className="-pagination rowPerPage-pagniation"><div class="-center"><span className="-pageInfo p-0">
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
              />
            </div>
            <CoreoPagination
              activePage={activePage}
              itemsCountPerPage={DEFAULT_PAGE_NUMBER}
              totalItemsCount={this.props.paginationCount}
              pageRangeDisplayed={2}
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
    // getServiceCategory: () => dispatch(getServiceCategory()),
    getVisitServiceCountList: data => dispatch(getVisitServiceCountList(data)),
    getVisitServiceTableList: data => dispatch(getVisitServiceTableList(data)),
    // getServiceRequestVisitStatus: () =>
    //   dispatch(getServiceRequestVisitStatus()),
    // getServiceType: data => dispatch(getServiceType(data)),
    // clearServiceTypes: () => dispatch(clearServiceTypes()),
    // clearRequestStatus: data =>
    //   dispatch(clearServiceProviderVisitStatuRequestStatus(data)),
    // // impersinateIndividual: data => dispatch(getPersonalDetailIndividual(data)),
    // getServiceProviderVisitStatus: () =>
    //   dispatch(getServiceProviderVisitStatus()),
    // getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    // goToVisitServiceDetails: () => dispatch(push(Path.visitServiceDetails)),
    // setTab: (data) => dispatch(setTab(data)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data))
  }
}

function mapStateToProps(state) {
  return {
    visitServiceCountList: state.dashboard.VisitServiceCountListState
      .visitServiceCountList,
    visitServiceTableList: state.dashboard.VisitServiceCountListState
      .visitServiceTableList,
    updatedServiceType: state.dashboard.VisitServiceCountListState
      .serviceType,
    serviceProviderVisitStatus: state.servicerequestState.requirementsState
      .serviceProviderVisitStatus,
    activeSubTab: state.dashboard.VisitServiceCountListState.activeSubTab
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceVisits)
)
