import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { StatCard } from '../Components/StatCard'
import {
  getVisitServiceProviderCountList,
  getVisitServiceProviderTableList,
  setActiveSubTab,
  getPointofServicedata,
  getFeedbackAlertDetails,
  savePaginationNumber
} from '../../../../redux/dashboard/EntityDashboard/ServiceProvider/actions'
import { setActiveStatusForAllTab, getGender, clearGenderType } from '../../../../redux/dashboard/EntityDashboard/Individuals/actions'
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  ROW_MIN,
  PAGE_SIZE_OPTIONS,
  NO_RECORDS_FOUND,
  ENTITY_DASHBOARD_STATUS,
  SORT_ORDER,
  PAGE_RANGE,
  DATE_FORMATS
} from '../../../../constants/constants'
import { createVideoConference } from '../../../../redux/telehealth/actions'
import { Path } from '../../../../routes';
import { push } from '../../../../redux/navigation/actions';
import { getUserInfo } from '../../../../utils/userUtility';
import {
  getVisitServiceHistoryByIdDetail,
} from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import { SORT_NAME } from './constants'
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility'
import { Grid } from '../Components/Grid/Grid'
import { CoreoPagination } from '../../../../components/LevelOne/CoreoPagination'
import { allServiceProivders, visitServiceProviders, feedbackServiceProviders, lowRatingServiceProivders, lowTaskServiceProivders } from './gridHeader'
import moment from 'moment'
import { setESP } from '../../../../redux/patientProfile/actions';
import { ProfileModalPopup, RowPerPage } from '../../../../components'
import FeedbackAlert from "../Components/FeedbackAlert/FeedbackAlert";
import Filter from '../Components/Filters'
import { filterTabs } from './filterTabs';
import Search from '../Components/Search';
 
export class ServiceProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.activeSubTab,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      serviceTypes: [],
      serviceCategoryIds: 0,
      category: '',
      serviceArea: '',
      maxExperience: 50,
      minExperience: 0,
      skillTypes: [],
      skillId: [],
      genderId: 0,
      activePage: this.props.savedPageNumber,
      pageNumber: this.props.savedPageNumber,
      itemsCountPerPage: DEFAULT_PAGE_SIZE,
      pageRangeDisplayed: DEFAULT_PAGE_SIZE,
      pageSize: DEFAULT_PAGE_SIZE,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      rating: 0,
      rowCount: 0,
      searchOpen: false,
      searchKeyword: 'default',
      resetFilter: true,
      feedbackAlertModal: false,
      pageNumberFeedback: DEFAULT_PAGE_NUMBER,
      pageSizeFeedback: DEFAULT_PAGE_SIZE,
      activePageFeedback: DEFAULT_PAGE_NUMBER,
      filterOpen: false
    }
    this.serviceTypes = []
    this.serviceTypeId = []
    this.gridHeader = allServiceProivders
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
    this.props.getVisitServiceProviderCountList(count)
    this.props.getVisitServiceProviderTableList(list)
    this.props.getGender()
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
      state: this.state,
      status: this.state.status,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE,
      searchKeyword: this.state.searchKeyword,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      resetFilter: false
    })
    if (
      prevProps.fromDate !== this.props.fromDate ||
      prevProps.toDate !== this.props.toDate
    ) {
      await this.props.getVisitServiceProviderCountList(count)
      await this.props.getVisitServiceProviderTableList(list)
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      fromDate: props.fromDate,
      toDate: props.toDate,
      rowCount: props.paginationCount,
      rowMax: state.pageSize > props.paginationCount ? props.paginationCount : state.pageSize
    }
  }

  getCountData = data => {
    return {
      "gender": this.state.genderId,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": this.state.status,
      "rating": this.state.rating,
      "minimumExperience": this.state.minExperience,
      "maximumExperience": this.state.maxExperience,
      "searchText": this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId
    }
  }

  pageNumberChangeFeedback = (pageNumber) => {
    this.setState({ activePageFeedback: pageNumber })
    const model = {
      serviceProviderId: this.state.serviceProviderId,
      pageNumber: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    }
    this.props.getFeedbackAlertDetails(model);
  }

  getFilterData = data => {
    return {
      "pageNumber": data.pageNumber,
      "pageSize": data.pageSize,
      "sortColumn": data.sortName,
      "sortOrder": data.sortOrder,
      "fromDate": data.fromDate,
      "toDate": data.toDate,
      "tab": data.status,
      "gender": this.state.genderId,
      "minimumExperience": this.state.minExperience,
      "maximumExperience": this.state.maxExperience,
      "searchText": this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId,
      "rating": this.state.rating
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
      resetFilter: true,
      searchOpen: false,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      serviceCategoryIds: [],
      serviceArea: '',
      maxExperience: 50,
      minExperience: 0,
      skillTypes: [],
      skillId: [],
      genderId: 0,
      rating: 0,
    })
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
      sortName: sortName,
      sortOrder: sortOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE
    })
    await this.props.getVisitServiceProviderCountList(count)
    await this.props.getVisitServiceProviderTableList(data)

  }

  getHeaderBasedOnStatus = status => {
    switch (status) {
      case ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.feedBack:
        return feedbackServiceProviders;
      case ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.visit:
        return visitServiceProviders;
      case ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.lowRating:
        return lowRatingServiceProivders;
      case ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.lowTaskCompletions:
        return lowTaskServiceProivders;
      default:
        return allServiceProivders;
    }
  }

  getSortNameAndOrderBasedOnStatus = (status) => {
    switch (status) {
      case ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.low_rating:
        return {
          sortName: SORT_NAME.RATING,
          sortOrder: SORT_ORDER.ASC
        }
      case ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.feedBack_alerts:
        return {
          sortName: SORT_NAME.FEEDBACK,
          sortOrder: SORT_ORDER.DESC
        }
      default:
        return {
          sortName: '',
          sortOrder: ''
        }
    }
  }

  pageNumberChange = pageNumber => {
    this.props.savePaginationNumber(pageNumber)
    const { pageSize, rowCount, status } = this.state
    let sortName = this.getSortNameAndOrderBasedOnStatus(status).sortName;
    let sortOrder = this.getSortNameAndOrderBasedOnStatus(status).sortOrder;
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
      sortName: sortName,
      sortOrder: sortOrder,
      searchKeyword: this.state.searchKeyword,
      resetFilter: this.state.resetFilter
    })
    this.props.getVisitServiceProviderTableList(list)
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
      sortName: this.getSortNameAndOrderBasedOnStatus(this.state.status).sortName,
      sortOrder: this.getSortNameAndOrderBasedOnStatus(this.state.status).sortOrder,
      searchKeyword: this.state.searchKeyword
    });
    this.props.getVisitServiceProviderTableList(list);
    this.setState({ pageSize: pageSize, activePage: DEFAULT_PAGE_NUMBER, pageNumber: DEFAULT_PAGE_NUMBER, rowMin: rowMinValue, rowMax: rowMaxValue });
  }

  toggleFeedbackAlert = () => {
    this.setState({
      feedbackAlertModal: !this.state.feedbackAlertModal,
      activePageFeedback: DEFAULT_PAGE_NUMBER
    })
  }

  goToSpVisitSummary = (data) => {
    this.props.getVisitServiceHistoryByIdDetail(data.servicePlanVisitId)
  }

  impersinateServiceProvider = data => {
    const model = {
      serviceProviderId: data.serviceProviderId,
      pageNumber: this.state.pageNumberFeedback,
      pageSize: DEFAULT_PAGE_SIZE,
      fromDate: moment(this.props.fromDate).format(DATE_FORMATS.yyyy_mm_dd),
      toDate: moment(this.props.toDate).format(DATE_FORMATS.yyyy_mm_dd)
    }
    this.props.getFeedbackAlertDetails(model)
    if (caseInsensitiveComparer(this.state.status, ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.feedBack)) {
      this.setState({
        feedbackAlertModal: !this.state.feedbackAlertModal,
        serviceProviderId: data.serviceProviderId
      })
    }
    else {
      this.props.setESP(data.serviceProviderId)
      this.props.goToESPProfile()
    }
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  handleGenderType = data => {
    this.setState({
      genderLabel: data.name,
      genderId: data.id
    })
  }

  onChangeExperinceSlider = data => {
    this.setState({
      minExperience: data.min,
      maxExperience: data.max,
      isExperienceChanged: true
    })
  }

  handleSelectedRating = item => {
    this.setState({
      rating: parseInt(item.target.value, 10)
    })
  }

  applyFilter = async () => {
    let data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      searchKeyword: this.state.searchKeyword,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder
    })
    await this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getVisitServiceProviderCountList(count, true)
    await this.props.getVisitServiceProviderTableList(data);
  }

  applyReset = async () => {
    await this.setState({
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      maxExperience: 50,
      minExperience: 0,
      genderId: 0,
      rating: 0,
      status: this.state.status,
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      filterOpen: false
    })
    this.serviceTypeId = []
    await this.props.clearGenderType(this.props.genderType)
    let data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      searchKeyword: this.state.searchKeyword,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getVisitServiceProviderCountList(count)
    await this.props.getVisitServiceProviderTableList(data)
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen,
      searchKeyword: ''
    })
  }

  handleSearchData = async (e) => {
    e.preventDefault();
    await this.setState({
      activePage: DEFAULT_PAGE_NUMBER,
    })
    const data = this.getFilterData({
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getVisitServiceProviderCountList(count)
    await this.props.getVisitServiceProviderTableList(data)
  }

  handleSearchkeyword = e => {
    this.setState({
      searchKeyword: e.target.value
    })
  }

  closeSearch = async () => {
    await this.setState({
      searchOpen: !this.state.searchOpen,
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      searchKeyword: 'default'
    })
    const data = this.getFilterData({
      state: this.state,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      status: this.state.status
    })
    let count = this.getCountData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    })
    await this.props.getVisitServiceProviderCountList(count)
    await this.props.getVisitServiceProviderTableList(data)
  }

  render() {
    const { pageSize, activePage, rowMin, rowMax, rowCount, status } = this.state

    const FeedbackAlertContent = (
      <FeedbackAlert
        feedbackServiceVisits={this.props.feedbackServiceVisits}
        goToVisitSummary={this.goToSpVisitSummary}
        pageCount={this.props.feedbackServiceVisits.length > 0 && this.props.feedbackServiceVisits[0].pageCount}
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
              countList={this.props.visitServiceProviderCountList}
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
                impersinate={this.impersinateServiceProvider}
                noRecordsFound={NO_RECORDS_FOUND}
              />
            </div>
            <CoreoPagination
              activePage={activePage}
              itemsCountPerPage={DEFAULT_PAGE_SIZE}
              totalItemsCount={this.props.paginationCount}
              pageRangeDisplayed={PAGE_RANGE}
              onChange={this.pageNumberChange}
            />
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
              serviceCategory={this.props.serviceCategory}
              serviceCategoryId={this.state.serviceCategoryId}
              handleChangeServiceCategory={this.handleChangeServiceCategory}
              selectedOption={this.state.selectedOption}
              genderType={this.props.genderType}
              handleGenderType={this.handleGenderType}
              genderPreference={this.state.genderPreference}
              onChangeSlider={this.onChangeSlider}
              minValue={this.state.minimumExperience}
              maxValue={this.state.maximumExperience}
              onChangeExperinceSlider={this.onChangeExperinceSlider}
              handleSelectedRating={this.handleSelectedRating}
              checked={this.state.isChecked}
              rating={this.state.rating}
              genderId={this.state.genderId}
              minExperience={this.state.minExperience}
              maxExperience={this.state.maxExperience}
              filterTabs={filterTabs}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceProviderCountList: (data, isFilterApplied) =>
      dispatch(getVisitServiceProviderCountList(data, isFilterApplied)),
    getVisitServiceProviderTableList: data =>
      dispatch(getVisitServiceProviderTableList(data)),
    createVideoConference: data => dispatch(createVideoConference(data)),
    goToSpProfile: () => dispatch(push(Path.SpProfile)),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    getPointofServicedata: (data) => dispatch(getPointofServicedata(data)),
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    getFeedbackAlertDetails: data => dispatch(getFeedbackAlertDetails(data)),
    savePaginationNumber: (data) => dispatch(savePaginationNumber(data)),
    setActiveStatusForAllTab: data => dispatch(setActiveStatusForAllTab(data)),
    goToESPProfile: () => dispatch(push(Path.ESPProfile)),
    setESP: data => dispatch(setESP(data)),
    getGender: () => dispatch(getGender()),
    clearGenderType: data => dispatch(clearGenderType(data)),
  }
}

function mapStateToProps(state) {
  let VisitServiceProviderState = state.dashboardState && state.dashboardState.VisitServiceProviderState
  return {
    visitServiceProviderCountList: VisitServiceProviderState.visitServiceProviderCountList,
    visitServiceTableList: VisitServiceProviderState
      .visitServiceProviderTableList,
    loggedInUser: state.authState.userState.userData.userInfo,
    paginationCount: VisitServiceProviderState
      .paginationCount,
    activeSubTab: VisitServiceProviderState.activeSubTab,
    feedbackServiceVisits: VisitServiceProviderState
      .feedbackServiceVisits,
    isLoadingFeedbackList: VisitServiceProviderState
      .isLoadingFeedbackList,
    savedPageNumber: VisitServiceProviderState.savedPaginationNumber,
    genderType: state.dashboardState.individualsListState.genderType
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceProvider)
)
