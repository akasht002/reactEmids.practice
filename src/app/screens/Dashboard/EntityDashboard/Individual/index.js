import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getIndividualsCountList,
  getIndividualsList,
  setActiveSubTab,
  getIndividualsFeedbackList,
  savePaginationNumber,
  setActiveStatusForAllTab,
  getClinicalCondition,
  clearClinicalCondition,
  getGender,
  getAllContracts,
  clearGenderType,
  resetContracts
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
import { getUserInfo } from '../../../../utils/userUtility';
import { ProfileModalPopup, RowPerPage } from '../../../../components'
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
import Filter from '../Components/Filters'
import { filterTabs } from './filterTabs';
import Search from '../Components/Search'

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
        maximumAge: 120,
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
      filterOpen: false,
      searchOpen: false
    }
    this.gridHeader = allIndividuals
    this.filterApplied = false
  }

  componentDidMount() {
    const count = this.getCountData(this.state)
    this.setState({ status: this.props.activeSubTab })
    const list = this.getFilterData({
      status: this.props.activeSubTab
    })
    this.props.getIndividualsCountList(count, this.filterApplied)
    this.props.getIndividualsList(list)
    this.props.getGender()
    this.props.getClinicalCondition()
    this.props.getAllContracts()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      fromDate: props.fromDate,
      toDate: props.toDate,
      rowCount: props.paginationCount,
      rowMax: state.pageSize > props.paginationCount ? props.paginationCount : state.pageSize
    }
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
    await this.props.getIndividualsCountList(count)
    await this.props.getIndividualsList(data)
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
      pageSize: DEFAULT_PAGE_SIZE,
      sortName: caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback) ? CARETEAM_STATUS.FEEDBACK : this.state.sortName,
      sortOrder: caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback) ? SORT_ORDER.DESC : this.state.sortOrder,
    })
    if (
      prevProps.fromDate !== this.props.fromDate ||
      prevProps.toDate !== this.props.toDate
    ) {
      await this.props.getIndividualsCountList(count)
      await this.props.getIndividualsList(list)
      await this.setState({
        rowMin: DEFAULT_PAGE_NUMBER,
        activePage: DEFAULT_PAGE_NUMBER})
    }
  }

  getCountData = data => {
    return {
      "clinicalCondition": this.state.clinicalConditions,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": this.filterApplied ? ENTITY_DASHBOARD_STATUS.individuals.statCard.all : this.state.status,
      "gender": this.state.genderId,
      "minimumAge": this.state.ageRange.minimumAge,
      "maximumAge": this.state.ageRange.maximumAge,
      "searchText": data.searchKeyword ? data.searchKeyword : this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "contractId": this.state.memberContractId
    }
  }

  getFilterData = data => {
    return {
      "clinicalCondition": this.state.clinicalConditions,
      "pageNumber": data.pageNumber ? data.pageNumber : this.state.pageNumber,
      "pageSize": data.pageSize ? data.pageSize: this.state.pageSize,
      "sortColumn": data.sortName ? data.sortName : this.state.sortName,
      "sortOrder": data.sortOrder ? data.sortOrder : this.state.sortOrder,
      "fromDate": data.fromDate ? data.fromDate : this.state.fromDate,
      "toDate": data.toDate ? data.toDate : this.state.toDate,
      "tab": data.status ? data.status : this.state.status,
      "gender": this.state.genderId,
      "minimumAge": this.state.ageRange.minimumAge,
      "maximumAge": this.state.ageRange.maximumAge,
      "searchText": data.searchKeyword ? data.searchKeyword : this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "contractId": this.state.memberContractId
    }
  }

  getTable = async e => {
    let sortName = this.state.sortName;
    let sortOrder = this.state.sortOrder;
    this.IsSortIcon = false
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
        maximumAge: 120,
        isChanged: false
      },
      pageNumber: DEFAULT_PAGE_NUMBER,
      searchOpen: false
    })
    let data = this.getFilterData({
      sortName: sortName,
      sortOrder: sortOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    this.props.setActiveStatusForAllTab(this.state.status)
    this.props.setActiveSubTab(this.state.status)
    this.props.clearClinicalCondition(this.props.clinicalConditionList)
    let count = this.getCountData({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    })
    count.tab = ENTITY_DASHBOARD_STATUS.individuals.statCard.all
    this.gridHeader = this.getHeaderBasedOnStatus(this.state.status)
    await this.props.getIndividualsCountList(count, this.filterApplied)
    await this.props.getIndividualsList(data)
  }

  getHeaderBasedOnStatus = status => {
    if (caseInsensitiveComparer(status, ENTITY_DASHBOARD_STATUS.individuals.statCard.feedback)) {
      return feedbackIndividuals
    }
    else if (caseInsensitiveComparer(status, ENTITY_DASHBOARD_STATUS.individuals.statCard.visit)) {
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
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: pageSize
    })
    this.props.getIndividualsList(data)
    this.setState({ pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue });
  }

  toggleFeedbacAlert = () => {
    this.setState({
      feedbackAlertModal: !this.state.feedbackAlertModal,
      activePageFeedback: DEFAULT_PAGE_NUMBER
    })
  }

  goToPgVisitSummary = (data) => {
    this.props.getVisitServiceHistoryByIdDetail(data.serviceRequestVisitId)
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

  toggleFeedbackAlert = () => {
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

  handleContracts = async data => {
    await this.setState({
      membershipName: data.membershipName,
      memberContractId: data.membershipId
    })
  }

  handleClinicalConditions = (item, e) => {
    let clinicalConditions = this.state.clinicalConditions
    if (e.target.checked) {
      clinicalConditions.push(item.attributeId)
    } else {
      let index = clinicalConditions.indexOf(item.attributeId)
      if (index > -1) {
        clinicalConditions.splice(index, 1)
      }
    }
    this.setState({
      clinicalConditions: clinicalConditions
    })
  }

  onChangeSlider = data => {
    this.setState({
      ageRange: {
        ...this.state.ageRange,
        minimumAge: data.min,
        maximumAge: data.max,
        isChanged: true
      }
    })
  }

  handleGenderType = data => {
    this.setState({
      genderLabel: data.name,
      genderId: data.id
    })
  }

  applyFilter = async () => {
    this.filterApplied = (this.state.status === ENTITY_DASHBOARD_STATUS.individuals.statCard.all)
    let data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
    })
    await this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getIndividualsCountList(count, this.filterApplied)
    await this.props.getIndividualsList(data)
  }

  applyReset = async () => {
    await this.setState({
      attributedProviders: [],
      clinicalConditions: [],
      memberContractId: 0,
      genderId: 0,
      ageRange: {
        ...this.state.ageRange,
        minimumAge: 0,
        maximumAge: 120,
        isChanged: false
      },
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      filterOpen: false
    })
    await this.props.resetContracts(
      this.props.contracts
    )
    await this.props.clearClinicalCondition(this.props.clinicalConditionList)
    await this.props.clearGenderType(this.props.genderType)
    let data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getIndividualsCountList(count)
    await this.props.getIndividualsList(data)
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen,
      searchKeyword: ''
    })
  }

  handleSearchData = async (e) => {
    this.filterApplied = (this.state.status === ENTITY_DASHBOARD_STATUS.individuals.statCard.all)
    e.preventDefault();
    await this.setState({
      activePage: DEFAULT_PAGE_NUMBER,
    })
    const data = this.getFilterData({
      pageNumber: DEFAULT_PAGE_NUMBER,
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getIndividualsCountList(count, this.filterApplied)
    await this.props.getIndividualsList(data)
  }

  handleSearchkeyword = e => {
    this.setState({
      searchKeyword: e.target.value
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
          <span className='profile-header-filter'
              onClick={this.toggleFilter}
            >
              Filters
            </span>
          </div>
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
          </div>
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
          toggle={this.toggleFeedbackAlert}
          ModalBody={FeedbackAlertContent}
          className='modal-lg CTDashboardApprove feedback-alertmodl'
          buttonLabel='Close'
          modalTitle='Feedback Alerts'
          onClick={this.toggleFeedbackAlert}
        />
        <Filter
          isOpen={this.state.filterOpen}
          toggle={this.toggleFilter}
          applyFilter={this.applyFilter}
          applyReset={this.applyReset}
          handleserviceType={this.handleserviceType}
          genderType={this.props.genderType}
          handleGenderType={this.handleGenderType}
          genderPreference={this.state.genderPreference}
          onChangeSlider={this.onChangeSlider}
          clinicalConditionList={this.props.clinicalConditionList}
          handleClinicalConditions={this.handleClinicalConditions}
          checked={this.state.isChecked}
          contracts={this.props.contracts}
          handleContracts={this.handleContracts}
          ageRange={this.state.ageRange}
          genderId={this.state.genderId}
          memberContractId={this.state.memberContractId}
          filterTabs={filterTabs}
        />
      </div>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getIndividualsCountList: (data, filterApplied) => dispatch(getIndividualsCountList(data, filterApplied)),
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
    goToPatientProfile: () => dispatch(push(Path.patientProfile)),
    getClinicalCondition: () => dispatch(getClinicalCondition()),
    getAllContracts: () => dispatch(getAllContracts()),
    clearClinicalCondition: data => dispatch(clearClinicalCondition(data)),  
    getGender: () => dispatch(getGender()),
    clearGenderType: data => dispatch(clearGenderType(data)),
    resetContracts: data => dispatch(resetContracts(data))
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
    savedPageNumber: state.dashboardState.individualsListState.savedPaginationNumber,
    clinicalConditionList: state.dashboardState.individualsListState.clincalCondition,
    contracts: state.dashboardState.individualsListState.contracts,
    genderType: state.dashboardState.individualsListState.genderType
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Individuals)
)
