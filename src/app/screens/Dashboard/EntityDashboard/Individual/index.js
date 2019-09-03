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
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ROW_MIN,
  PAGE_SIZE_OPTIONS,
  NO_RECORDS_FOUND,
  ENTITY_DASHBOARD_STATUS,
  CARETEAM_STATUS,
  SORT_ORDER,
  PAGE_RANGE,
  SERVICE_REQUEST_DETAILS_TAB
} from '../../../../constants/constants'
import RowPerPage from '../Components/RowPerPage';
import { getUserInfo } from '../../../../utils/userUtility';
import { ProfileModalPopup } from '../../../../components'
import { StatCard } from '../Components/StatCard'
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility'
import { Grid } from '../Components/Grid/Grid'
import { allIndividuals, feedbackIndividuals, visitIndividuals } from './gridHeader'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'
import {
  getServiceRequestId,
  setActiveTab
} from '../../../../redux/visitSelection/VisitServiceDetails/actions'
import { Path } from '../../../../routes';
import { push } from '../../../../redux/navigation/actions';
import { setPatient } from "../../../../redux/patientProfile/actions";
import FeedbackAlert from "../Components/FeedbackAlert/FeedbackAlert";
import {
  getVisitServiceHistoryByIdDetail,
} from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import Filter from './Filters'

export class Individuals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.activeSubTab,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      clinicalConditions: [],
      genderId: 0,
      cohorts: [],
      ageRange: {
        minimumAge: 0,
        maximumAge: 50,
        isChanged: false
      },
      memberContractId: 0,
      data: [],
      activePage: this.props.savedPageNumber,
      pageNumber: this.props.savedPageNumber,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      sortName: '',
      sortOrder: '',
      searchKeyword: 'default',
      feedbackAlertModal: false,
      feedbackServiceVisits: [],
      pageNumberFeedback: DEFAULT_PAGE_NUMBER,
      pageSizeFeedback: DEFAULT_PAGE_SIZE,
      activePageFeedback: DEFAULT_PAGE_NUMBER,
      filterOpen: false
    }
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

  static getDerivedStateFromProps(props, state) {
    return {
      fromDate: props.fromDate,
      toDate: props.toDate,
      rowCount: props.paginationCount,
      rowMax: state.pageSize > props.paginationCount ? props.paginationCount : state.pageSize
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

    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)

    const count = this.getCountData(this.props)
    const list = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE,
      sortName: caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback) ? CARETEAM_STATUS.FEEDBACK : this.state.sortName,
      sortOrder: caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback) ? SORT_ORDER.DESC : this.state.sortOrder,
      searchKeyword: this.state.searchKeyword,
      resetFilter: false
    })
    if (
      prevProps.fromDate !== this.props.fromDate ||
      prevProps.toDate !== this.props.toDate
    ) {
      this.props.getIndividualsCountList(count)
      this.props.getIndividualsList(list)
    }
  }

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
    let sortName = this.getSortNameAndOrderBasedOnStatus(e.target.value).sortName;
    let sortOrder = this.getSortNameAndOrderBasedOnStatus(e.target.value).sortOrder;
    await this.setState({
      status: e.target.value,
      pageSize: this.state.pageSize,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: ROW_MIN,
      searchKeyword: 'default',
      clinicalConditions: [],
      cohorts: [],
      memberContractId: 0,
      genderId: 0,
      ageRange: {
        ...this.state.ageRange,
        minimumAge: 0,
        maximumAge: 50,
        isChanged: false
      },
      pageNumber: DEFAULT_PAGE_NUMBER,
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
          sortName: '',
          sortOrder: ''
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

  impersinateIndividual = data => {
    switch (true) {
      case caseInsensitiveComparer(this.state.status, ENTITY_DASHBOARD_STATUS.individuals.statCard.visit):
        this.props.getServiceRequestId(0);
        this.props.setPatient(data.patientId)
        this.props.setActiveTab(SERVICE_REQUEST_DETAILS_TAB.myPlan)
        this.props.goToVisitServiceDetails();
        break;
      case caseInsensitiveComparer(this.state.status, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback):
        const model = {
          patientId: data.patientId,
          pageNumber: this.state.pageNumberFeedback,
          pageSize: DEFAULT_PAGE_SIZE,
          fromDate: this.props.fromDate,
          toDate: this.props.toDate,
          serviceProviderId: getUserInfo().serviceProviderId
        }
        this.props.getIndividualsFeedbackList(model);
        this.setState({
          feedbackAlertModal: !this.state.feedbackAlertModal,
          feedbackServiceVisits: this.props.individualsFeedbackList,
          patientId: data.individualId
        })
        break;
      default:
        this.props.getServiceRequestId(0);
        this.props.setPatient(data.patientId)
        this.props.goToPatientProfile()
        break;
    }
  }

  toggleFeedbaclAlert = () => {
    this.setState({
      feedbackAlertModal: !this.state.feedbackAlertModal,
      activePageFeedback: DEFAULT_PAGE_NUMBER
    })
  }

  goToPgVisitSummary = (data) => {
    this.props.getVisitServiceHistoryByIdDetail(data.servicePlanVisitId)
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  render() {
    const { pageSize, activePage, rowMin, rowMax, rowCount, status } = this.state;

    const FeedbackAlertContent = (
      <FeedbackAlert
        feedbackServiceVisits={this.props.individualsFeedbackList}
        goToVisitSummary={this.goToPgVisitSummary}
        pageCount={this.props.individualsFeedbackList.length > 0 && this.props.individualsFeedbackList[0].pageCount}
        pageNumberChangeFeedback={this.pageNumberChangeFeedback}
        activePageFeedback={this.state.activePageFeedback}
        isLoaded={this.props.isLoadingFeedbackList}
      />
    )

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
          <span
              className='primaryColor ProfileHeaderFilter'
              onClick={this.toggleFilter}
            >
              Filters
            </span>
          {this.props.individualsList && this.props.individualsList.length > 0 ?
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
          <div className="tab-table-view">
            <div className="full-block-tableview">
              <Grid
                data={this.props.individualsList}
                header={this.gridHeader}
                noRecordsFound={NO_RECORDS_FOUND}
                impersinate={this.impersinateIndividual}
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
        <ProfileModalPopup
          isOpen={this.state.feedbackAlertModal}
          toggle={this.toggleFeedbaclAlert}
          ModalBody={FeedbackAlertContent}
          className='modal-lg CTDashboardApprove feedback-alertmodl'
          buttonLabel='Close'
          modalTitle='Feedback Alerts'
          onClick={this.toggleFeedbaclAlert}
        />
        <Filter
          isOpen={this.state.filterOpen}
          toggle={this.toggleFilter}
          closeFIlter={this.closeFIlter}
          applyFilter={this.applyFilter}
          applyReset={this.applyReset}
          serviceType={this.props.serviceType}
          handleserviceType={this.handleserviceType}
          genderType={this.props.genderType}
          handleGenderType={this.handleGenderType}
          genderPreference={this.state.genderPreference}
          onChangeSlider={this.onChangeSlider}
          serviceAreaList={this.props.serviceAreaList}
          handleServiceArea={this.handleServiceArea}
          serviceArea={this.props.serviceArea}
          clinicalConditionList={this.props.clinicalConditionList}
          handleClinicalConditions={this.handleClinicalConditions}
          checked={this.state.isChecked}
          contracts={this.props.contracts}
          cohorts={this.props.cohorts}
          handleContracts={this.handleContracts}
          handleCohorts={this.handleCohorts}
          handleAttributedProviders={this.handleAttributedProviders}
          ageRange={this.state.ageRange}
          genderId={this.state.genderId}
          handleState={this.handleState}
          stateDetail={this.props.states}
          selectedOptionState={this.state.selectedOptionState}
          stateId={this.state.stateId}
          onClickHandleIncr={this.onClickHandleIncr}
          onClickHandleDecr={this.onClickHandleDecr}
          coverageArea={this.state.coverageArea}
          handleStreet={this.handleStreet}
          handleCity={this.handleCity}
          handleZip={this.handleZip}
          zip={this.state.zip}
          city={this.state.city}
          street={this.state.street}
          memberContractId={this.state.memberContractId}
        />
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
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    goToVisitServiceDetails: () => dispatch(push(Path.visitServiceDetails)),
    setPatient: data => dispatch(setPatient(data)),
    getIndividualsFeedbackList: (data) => dispatch(getIndividualsFeedbackList(data)),
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    goToPatientProfile: () => dispatch(push(Path.patientProfile))  
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
    activeSubTab: state.dashboardState.individualsListState.activeSubTab,
    individualsFeedbackList: state.dashboardState.individualsListState.individualsFeedbackList,
    isLoadingFeedbackList: state.dashboardState.individualsListState.isLoadingFeedbackList,
    savedPageNumber: state.dashboardState.individualsListState.savedPaginationNumber
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Individuals)
)
