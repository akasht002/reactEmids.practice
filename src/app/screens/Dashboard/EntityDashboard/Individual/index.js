import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getIndividualsCountList,
  getIndividualsList,
  setActiveSubTab,
  getIndividualsFeedbackList,
  savePaginationNumber,
  setActiveStatusForAllTab
} from '../../../../redux/dashboard/EntityDashboard/Individuals/actions'
import { getLength } from '../../../../utils/validations'
// import { getPersonalDetailIndividual, impersinateCareTeamIndividual } from '../../../../redux/auth/user/actions'
// import { onCreateNewConversation } from '../../../../redux/asyncMessages/actions'
// import { createVideoConference, setContext } from '../../../../redux/telehealth/actions'
import {
  USERTYPES,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ROW_MIN,
  PAGE_SIZE_OPTIONS,
  NO_RECORDS_FOUND,
  CONTACT_NOT_FOUND,
  PHONE_NUMBER_TEXT,
  OTHER, OTHERS,
  ENTITY_DASHBOARD_STATUS,
  KEYPRESS_ENTER,
  DATE_FORMAT,
  CARETEAM_STATUS,
  SORT_ORDER,
  PAGE_RANGE
} from '../../../../constants/constants'
import Search from '../Components/Search';
import RowPerPage from '../Components/RowPerPage';
import { getUserInfo } from '../../../../utils/userUtility';
import { getInitializeFilterData } from './utility';
import { formatPhoneNumber } from '../../../../utils/formatName';
// import './style.css';
// import FeedbackAlert from "../Components/FeedbackAlert";
// import {
//   getVisitServiceHistoryByIdDetail,
// } from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import { StatCard } from '../Components/StatCard'
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility'
import { Grid } from '../Components/Grid/Grid'
import { allIndividuals, feedbackIndividuals, visitIndividuals } from './GridHeader'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'

export class Individuals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.activeSubTab,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      filterOpen: false,
      serviceArea: '',
      clinicalConditions: [],
      genderId: 0,
      cohorts: [],
      ageRange: {
        minimumAge: 0,
        maximumAge: 50,
        isChanged: false
      },
      attributedProviders: [],
      memberContractId: 0,
      data: [],
      activePage: this.props.savedPageNumber,
      pageNumber: this.props.savedPageNumber,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      phoneNumberModal: false,
      phoneNumber: '',
      stateId: '',
      stateName: '',
      coverageArea: 0,
      city: '',
      street: '',
      zip: '',
      sortName: '',
      sortOrder: '',
      searchOpen: false,
      searchKeyword: 'default',
      feedbackAlertModal: false,
      feedbackServiceVisits: [],
      pageNumberFeedback: DEFAULT_PAGE_NUMBER,
      pageSizeFeedback: DEFAULT_PAGE_SIZE,
      activePageFeedback: DEFAULT_PAGE_NUMBER
    }
    this.dataSet = []
    this.countValue = 0
    this.sortName = 'ModifiedDate'
    this.sortOrder = 'asc'
    this.IsSortIcon = false
    this.gridHeader = allIndividuals
  }

  componentDidMount() {
    const count = this.getCountData(this.state)
    this.setState({ status: this.props.activeSubTab })
    const list = this.getFilterData({
      state: this.state,
      status: this.props.activeSubTab,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      sortName: this.getSortNameAndOrderBasedOnStatus(this.props.activeSubTab).sortName,
      sortOrder: this.getSortNameAndOrderBasedOnStatus(this.props.activeSubTab).sortOrder,
      searchKeyword: this.state.searchKeyword
    })
    this.props.getIndividualsCountList(count)
    this.props.getIndividualsList(list)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fromDate: nextProps.fromDate,
      toDate: nextProps.toDate,
      rowCount: nextProps.paginationCount,
    })

    const count = this.getCountData(nextProps)
    const list = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: nextProps.fromDate,
      toDate: nextProps.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE,
      sortName: caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback) ? CARETEAM_STATUS.FEEDBACK : this.state.sortName,
      sortOrder: caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback) ? SORT_ORDER.DESC : this.state.sortOrder,
      searchKeyword: this.state.searchKeyword,
      resetFilter: false
    })
    if (
      nextProps.fromDate !== this.props.fromDate ||
      nextProps.toDate !== this.props.toDate
    ) {
      this.props.getIndividualsCountList(count)
      this.props.getIndividualsList(list)
      this.setState({
        rowMin: DEFAULT_PAGE_NUMBER,
        activePage: DEFAULT_PAGE_NUMBER,
        rowMax: DEFAULT_PAGE_SIZE
      })
    }
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

  // goToPg = (data) => {
  //   const model = {
  //     patientId: data.individualId,
  //     pageNumber: this.state.pageNumberFeedback,
  //     pageSize: DEFAULT_PAGE_SIZE,
  //     fromDate: this.props.fromDate,
  //     toDate: this.props.toDate
  //   }
  //   this.props.getIndividualsFeedbackList(model);
  //   if (caseInsensitiveComparer(this.state.status, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback)) {
  //     this.setState({
  //       feedbackAlertModal: !this.state.feedbackAlertModal,
  //       feedbackServiceVisits: this.props.individualsFeedbackList,
  //       patientId: data.individualId
  //     })
  //   }
  //   else {
  //     this.props.impersinateCareTeamIndividual(data)
  //   }
  // }


  getCountData = data => {
    return {
      "clinicalCondition": this.state.clinicalConditions,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": this.state.status,
      "gender": 0,
      "minimumAge": 0,
      "maximumAge": 50,
      "searchText": "default",
      "serviceProviderId": getUserInfo().serviceProviderId
    }
  }

  getFilterData = data => {
    return {
      "clinicalCondition": [
      ],
      "pageNumber": data.pageNumber,
      "pageSize": data.pageSize,
      "sortColumn": data.sortName,
      "sortOrder": data.sortOrder,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": data.status,
      "gender": 0,
      "minimumAge": this.state.ageRange.minimumAge,
      "maximumAge": this.state.ageRange.maximumAge,
      "searchText": this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId
    }
  }

  getTable = async e => {
    const { pageSize } = this.state;
    let rowMaxValue = pageSize;
    let sortName = this.getSortNameAndOrderBasedOnStatus(e.target.value).sortName;
    let sortOrder = this.getSortNameAndOrderBasedOnStatus(e.target.value).sortOrder;
    let dataCount = this.props.individualsCountList && this.props.individualsCountList.filter(obj => {
      return obj.statusName === e.target.value
    })
    if (pageSize >= (dataCount && dataCount.length > 0 && dataCount[0].totalCount)) {
      rowMaxValue = dataCount[0].totalCount;
    }
    this.IsSortIcon = false
    await this.setState({
      status: e.target.value,
      pageSize: this.state.pageSize,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: ROW_MIN,
      rowMax: rowMaxValue,
      resetFilter: true,
      searchOpen: false,
      searchKeyword: 'default',
      attributedProviders: [],
      clinicalConditions: [],
      cohorts: [],
      memberContractId: 0,
      serviceArea: '',
      genderId: 0,
      ageRange: {
        ...this.state.ageRange,
        minimumAge: 0,
        maximumAge: 50,
        isChanged: false
      },
      pageNumber: DEFAULT_PAGE_NUMBER,
      street: '',
      city: '',
      stateName: '',
      stateId: '',
      zip: '',
      coverageArea: 0,
      filterOpen: false,
      selectedOptionState: null
    })
    let data = this.getFilterData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      status: this.state.status,
      sortName: sortName,
      sortOrder: sortOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    await this.props.getIndividualsCountList(count)
    await this.props.getIndividualsList(data)
  }

  getHeaderBasedOnStatus = status => {
    if (status === 'Feedback') {
      return feedbackIndividuals
    }
    else if (status === 'Visit') {
      return visitIndividuals
    }
    else {
      return allIndividuals
    }
  }

  pageNumberChange = (pageNumber) => {
    this.props.savePaginationNumber(pageNumber)
    const { pageSize, rowCount } = this.state;
    let pageValue = pageNumber - 1;
    let rowMinValue = (pageSize * pageValue) + 1;
    let rowMaxValue = (pageSize * pageNumber);
    if (rowMaxValue >= rowCount) {
      rowMaxValue = rowCount
    }
    let data = this.getFilterData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      status: this.state.status,
      sortName: this.getSortNameAndOrderBasedOnStatus(this.state.status).sortName,
      sortOrder: this.getSortNameAndOrderBasedOnStatus(this.state.status).sortOrder,
      pageNumber: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE
    })
    this.props.getIndividualsList(data)
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
    let data = this.getFilterData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      status: this.state.status,
      sortName: this.getSortNameAndOrderBasedOnStatus(this.state.status).sortName,
      sortOrder: this.getSortNameAndOrderBasedOnStatus(this.state.status).sortOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: pageSize
    })
    this.props.getIndividualsList(data)
    this.setState({ pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue });
  }

  toggleFeedbaclAlert = () => {
    this.setState({
      feedbackAlertModal: !this.state.feedbackAlertModal,
      activePageFeedback: DEFAULT_PAGE_NUMBER
    })
  }

  goToPgVisitSummary = (data) => {
    this.props.getVisitServiceHistoryByIdDetail(data.serviceRequestVisitId)
  }

  getSortNameAndOrderBasedOnStatus = (status) => {
    switch (status) {
      case ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback:
        return {
          sortName: 'feedback',
          sortOrder: 'desc'
        }
      default:
        return {
          sortName: '',
          sortOrder: ''
        }
    }
  }

  pageNumberChangeFeedback = (pageNumber) => {
    this.setState({ activePageFeedback: pageNumber })
    const model = {
      patientId: this.state.patientId,
      pageNumber: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    }
    this.props.getIndividualsFeedbackList(model);
  }

  render() {
    const { pageSize, activePage, rowMin, rowMax, rowCount, status } = this.state;
    return (
      <div className="parent-fullblock">
        <div className="dashboard-tab-content">
          <div className="tab-filter-card">
            <StatCard
              countList={this.props.individualsCountList}
              getTable={this.getTable}
              status={status}
            />
          </div>
          {this.props.individualsList && this.props.individualsList.length > 0 ?
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
                data={this.props.individualsList}
                header={this.gridHeader}
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

export function mapDispatchToProps(dispatch) {
  return {
    getIndividualsCountList: data => dispatch(getIndividualsCountList(data)),
    getIndividualsList: data => dispatch(getIndividualsList(data)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    savePaginationNumber: (data) => dispatch(savePaginationNumber(data)),
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data))
  }
}

export function mapStateToProps(state) {
  return {
    individualsCountList: state.dashboardState.individualsListState
      .individualsCountList,
    individualsList: state.dashboardState.individualsListState
      .individualsList,
    paginationCount: state.dashboardState.individualsListState
      .paginationCount,
    //     states: state.entityDashboard.individualsListState.states,
    //     isLoaded: state.entityDashboard.individualsListState.isLoaded,
    activeSubTab: state.dashboardState.individualsListState.activeSubTab,
    //     individualsFeedbackList: state.entityDashboard.individualsListState.individualsFeedbackList,
    //     isLoadingFeedbackList: state.entityDashboard.individualsListState.isLoadingFeedbackList,
    savedPageNumber: state.dashboardState.individualsListState.savedPaginationNumber
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Individuals)
)
