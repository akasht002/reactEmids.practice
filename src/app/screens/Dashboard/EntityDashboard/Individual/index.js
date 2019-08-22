import React, { Component } from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import moment from 'moment'
import { SelectField, Select, Item } from '@zendeskgarden/react-select'
import { ModalPopup, Preloader, ProfileModalPopup } from '../../../../components'
import Pagination from 'react-js-pagination'
// import Filter from './Filters'
// import {
//   getServiceArea,
//   getGender,
//   getSkill,
//   getClinicalCondition,
//   clearClinicalCondition,
//   clearGenderType
// } from '../../../../redux/serviceproviders/Search/Filters/actions'
import {
  getIndividualsCountList,
  getIndividualsList,
  getAttributedProviders,
  getAllCohorts,
  getAllContracts,
  resetFilter,
  getStates,
  clearStates,
  setActiveSubTab,
  getIndividualsFeedbackList,
  savePaginationNumber
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
  CARETEAM_DASHBOARD_TAB,
  KEYPRESS_ENTER,
  DATE_FORMAT,
  CARETEAM_STATUS,
  SORT_ORDER
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
import Filter from './Filters'

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

  componentWillUnmount() {
    // this.props.clearState()
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
    // this.props.getServiceArea()
    // this.props.getGender()
    // this.props.getSkill()
    // this.props.getClinicalCondition()
    // this.props.getAttributedProviders()
    // this.props.getAllCohorts()
    // this.props.getAllContracts()
    // this.props.getStates()
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
      sortName: caseInsensitiveComparer(this.props.activeSubTab, CARETEAM_DASHBOARD_TAB.individuals.statCard.feedback) ? CARETEAM_STATUS.FEEDBACK : this.state.sortName,
      sortOrder: caseInsensitiveComparer(this.props.activeSubTab, CARETEAM_DASHBOARD_TAB.individuals.statCard.feedback) ? SORT_ORDER.DESC : this.state.sortOrder,
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
  //   if (caseInsensitiveComparer(this.state.status, CARETEAM_DASHBOARD_TAB.individuals.statCard.feedback)) {
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

  // getFilterData = data => {
  //   let filteredData;

  //   if (!data.resetFilter) {
  //     filteredData = {
  //       memberContractId: data.state.memberContractId,
  //       cohorts: data.state.cohorts,
  //       attributeProviders: data.state.attributedProviders,
  //       clinicalConditions: data.state.clinicalConditions,
  //       minimumAge: (data.state.ageRange.isChanged
  //         ? data.state.ageRange.minimumAge
  //         : 0),
  //       maximumAge: (data.state.ageRange.isChanged
  //         ? data.state.ageRange.maximumAge
  //         : 0),
  //       gender: data.state.genderId,
  //       streetAddress: data.state.street,
  //       city: data.state.city,
  //       stateName: data.state.stateName,
  //       zip: (data.state.zip === '' ? 0 : data.state.zip),
  //       range: data.state.coverageArea
  //     }
  //   } else {
  //     filteredData = {
  //       memberContractId: 0,
  //       cohorts: [],
  //       attributeProviders: [],
  //       clinicalConditions: [],
  //       minimumAge: 0,
  //       maximumAge: 0,
  //       gender: 0,
  //       streetAddress: '',
  //       city: '',
  //       stateName: '',
  //       zip: 0,
  //       range: 0,

  //     }
  //   }
  //   return {
  //     ...filteredData,
  //     contracts: [],
  //     rating: 0,
  //     fromDate: moment(data.fromDate).format(DATE_FORMAT),
  //     toDate: moment(data.toDate).format(DATE_FORMAT),
  //     careTeamId: getUserInfo().careTeamId,
  //     statusName: data.status,
  //     pageNumber: data.pageNumber ? data.pageNumber : 1,
  //     pageSize: data.pageSize,
  //     sortName: data.sortName,
  //     sortOrder: data.sortOrder,
  //     lat: 0,
  //     lon: 0,
  //     searchText: data.searchKeyword
  //   }
  // }

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
      "tab": data.status && data.status.toLowerCase(),
      "gender": 0,
      "minimumAge": this.state.ageRange.minimumAge,
      "maximumAge": this.state.ageRange.maximumAge,
      "searchText": this.state.searchKeyword,
      "serviceProviderId": getUserInfo().serviceProviderId
    }
    // return {
    //   "clinicalCondition": this.state.clinicalConditions,
    //   "pageNumber": data.pageNumber,
    //   "pageSize": data.pageSize,
    //   "sortColumn": data.sortName,
    //   "sortOrder": data.sortOrder,
    //   "fromDate": data.fromDate,
    //   "toDate": data.toDate,
    //   "tab": data.status && data.status.toLowerCase(),
    //   "gender": this.state.genderId,
    //   "minimumAge": this.state.ageRange.minimumAge,
    //   "maximumAge": this.state.ageRange.maximumAge,
    //   "searchText": data.searchKeyword,
    //   "serviceProviderId": getUserInfo().serviceProviderId
    // }
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
    // this.props.resetFilter(
    //   this.props.attributedProviders,
    //   this.props.cohorts,
    //   this.props.contracts
    // )
    // this.props.clearClinicalCondition(this.props.clinicalConditionList)
    // this.props.clearGenderType(this.props.genderType)
    let data = this.getFilterData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      status: this.state.status,
      sortName: sortName,
      sortOrder: sortOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: 1
    })
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

  handleCohorts = (item, e) => {
    let cohorts = this.state.cohorts
    if (e.target.checked) {
      cohorts.push(item.id)
    } else {
      let index = cohorts.indexOf(item.id)
      if (index > -1) {
        cohorts.splice(index, 1)
      }
    }
    this.setState({
      cohorts: cohorts,
      isChecked: !this.state.isChecked
    })
  }

  handleAttributedProviders = (value) => {
    this.setState({ attributedProviders: value });
  }

  handleClinicalConditions = (item, e) => {
    let clinicalConditions = this.state.clinicalConditions
    this.setState({
      isChecked: !this.state.isChecked
    })
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

  handleGenderType = data => {
    this.setState({
      genderLabel: data.name,
      genderId: data.id
    })
  }

  handleContracts = data => {
    this.setState({
      membershipName: data.membershipName,
      memberContractId: data.membershipId
    })
  }

  handleState = selectedOptionState => {
    this.setState({
      stateName: selectedOptionState.label,
      stateId: selectedOptionState.value,
      selectedOptionState: selectedOptionState
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

  handleServiceArea = item => {
    var serviceAreaObj = {
      lat: item.lat,
      lon: item.lon
    }
    this.setState({
      pointOfservice: serviceAreaObj
    })
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }
  applyReset = () => {
    this.setState({
      attributedProviders: [],
      clinicalConditions: [],
      cohorts: [],
      memberContractId: 0,
      serviceArea: '',
      genderId: 0,
      ageRange: {
        ...this.state.ageRange,
        minimumAge: 0,
        maximumAge: 120,
        isChanged: false
      },
      status: 'All',
      resetFilter: true,
      pageNumber: DEFAULT_PAGE_NUMBER,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      rowMax: DEFAULT_PAGE_SIZE,
      street: '',
      city: '',
      stateName: '',
      stateId: '',
      zip: '',
      coverageArea: 0,
      filterOpen: false,
      selectedOptionState: null
    })
    this.props.resetFilter(
      this.props.attributedProviders,
      this.props.cohorts,
      this.props.contracts
    )
    this.props.clearClinicalCondition(this.props.clinicalConditionList)
    this.props.clearGenderType(this.props.genderType)
    let data = getInitializeFilterData({
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      status: 'All'
    })
    if (this.state.searchOpen === false) {
      this.props.getIndividualsList(data)
    }
  }

  closeFIlter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen,
      resetFilter: true
    })
  }

  applyFilter = () => {
    let data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      resetFilter: false,
      searchKeyword: this.state.searchKeyword
    })
    data.statusName = null;
    this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: DEFAULT_PAGE_NUMBER,
      rowMin: DEFAULT_PAGE_NUMBER,
      status: data.statusName,
      resetFilter: false
    })
    this.props.getIndividualsList(data)
  }

  onClickConversation = (e, item) => {
    let selectedParticipants = [
      {
        userId: item.coreoHomeUserId,
        participantType: USERTYPES.PATIENT,
        participantId: item.individualId
      }
    ]
    let data = {
      participantList: selectedParticipants,
      title: '',
      context: item.individualId
    }
    this.props.createNewConversation(data)
  }

  onClickVideoConference = (e, item) => {
    let selectedParticipants = [
      {
        userId: item.coreoHomeUserId,
        participantType: USERTYPES.PATIENT,
        participantId: item.individualId,
        firstName: item.individualName,
        lastName: '',
        thumbNail: item.thumbNail
      }
    ]
    this.props.setContext(item.individualId)
    this.props.createDataStore(selectedParticipants)
  }

  // applyReset = () => {
  //   this.setState({
  //     attributedProviders: [],
  //     clinicalConditions: [],
  //     cohorts: [],
  //     memberContractId: 0,
  //     serviceArea: '',
  //     genderId: 0,
  //     ageRange: {
  //       ...this.state.ageRange,
  //       minimumAge: 0,
  //       maximumAge: 120,
  //       isChanged: false
  //     },
  //     status: 'All',
  //     resetFilter: true,
  //     pageNumber: DEFAULT_PAGE_NUMBER,
  //     activePage: DEFAULT_PAGE_NUMBER,
  //     rowMin: DEFAULT_PAGE_NUMBER,
  //     rowMax: DEFAULT_PAGE_SIZE,
  //     street: '',
  //     city: '',
  //     stateName: '',
  //     stateId: '',
  //     zip: '',
  //     coverageArea: 0,
  //     filterOpen: false,
  //     selectedOptionState: null
  //   })
  //   this.props.resetFilter(
  //     this.props.attributedProviders,
  //     this.props.cohorts,
  //     this.props.contracts
  //   )
  //   this.props.clearClinicalCondition(this.props.clinicalConditionList)
  //   this.props.clearGenderType(this.props.genderType)
  //   let data = getInitializeFilterData({
  //     fromDate: this.state.fromDate,
  //     toDate: this.state.toDate,
  //     status: 'All',
  //     sortName: this.state.sortName,
  //     sortOrder: this.state.sortOrder,
  //   })
  //   this.props.getIndividualsList(data)
  // }

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
      pageSize: 1
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

  onClickHandleIncr = () => {
    if (this.state.coverageArea !== 0) {
      this.countValue = this.state.coverageArea
    } else {
      this.countValue = 0
    }
    if (this.countValue >= 0) {
      this.countValue = this.countValue + 1
    }
    this.setState({
      coverageArea: this.countValue
    })
  }

  onClickHandleDecr = () => {
    if (this.state.coverageArea !== 0) {
      this.countValue = this.state.coverageArea
    } else {
      this.countValue = 0
    }
    if (this.countValue > 0) {
      this.countValue = this.countValue - 1
    }
    this.setState({
      coverageArea: this.countValue
    })
  }

  handleStreet = e => {
    this.setState({ street: e.target.value })
  }

  handleCity = e => {
    this.setState({ city: e.target.value })
  }

  handleZip = e => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
    if (onlyNums.length <= 5) {
      this.setState({
        zip: onlyNums
      })
    }
  }

  onSortedChange = (value) => {
    let sortOrders = value[0].desc ? 'desc' : 'asc'
    this.setState({ sortName: value[0].id, sortOrder: sortOrders })
    this.IsSortIcon = true
    const data = this.getFilterData({
      state: this.state,
      status: this.state.status,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      sortName: value[0].id,
      sortOrder: value[0].desc ? 'desc' : 'asc',
      searchKeyword: this.state.searchKeyword
    })
    this.props.getIndividualsList(data)
  }

  showPhoneNumber = data => {
    this.setState({
      phoneNumber: data.phoneNumber,
      phoneNumberModal: !this.state.phoneNumberModal
    })
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen,
      searchKeyword: ''
    })
  }

  handleSearchkeyword = e => {
    this.setState({
      searchKeyword: e.target.value
    })
  }

  handleSearchkeywordPress = (event) => {
    if (event.charCode === KEYPRESS_ENTER) {
      const data = this.getFilterData({
        state: this.state,
        status: this.state.status,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        pageNumber: DEFAULT_PAGE_NUMBER,
        pageSize: this.state.pageSize,
        sortName: this.state.sortName,
        sortOrder: this.state.sortOrder,
        searchKeyword: this.state.searchKeyword
      })
      this.props.getIndividualsList(data)
      this.applyReset()
    }
  }

  handleSearchData = (e) => {
    e.preventDefault();
    this.setState({
      activePage: DEFAULT_PAGE_NUMBER,
    })
    const data = this.getFilterData({
      state: this.state,
      status: '',
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      searchKeyword: this.state.searchKeyword
    })
    data.statusName = null
    this.setState({
      status: data.statusName
    })
    this.props.getIndividualsList(data)
  }

  closeSearch = () => {
    const data = this.getFilterData({
      state: this.state,
      status: 'All',
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: this.state.pageSize,
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      searchKeyword: ""
    })
    this.props.getIndividualsList(data)
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
      case CARETEAM_DASHBOARD_TAB.individuals.statCard.feedback:
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
          {/* <Filter
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
          attributeProviders={this.props.attributedProviders}
          cohorts={this.props.cohorts}
          handleContracts={this.handleContracts}
          handleCohorts={this.handleCohorts}
          attributedProviders={this.props.attributedProviders}
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
          selectedAttributedProviders={this.state.attributedProviders}
        /> */}
          <div className="tab-table-view">
            <div className="full-block-tableview">
              <Grid
                data={this.props.individualsList}
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
    getIndividualsCountList: data => dispatch(getIndividualsCountList(data)),
    getIndividualsList: data => dispatch(getIndividualsList(data)),
    //     // getServiceArea: () => dispatch(getServiceArea()),
    //     // getGender: () => dispatch(getGender()),
    //     // getSkill: () => dispatch(getSkill()),
    //     // getClinicalCondition: () => dispatch(getClinicalCondition()),
    //     getAttributedProviders: () => dispatch(getAttributedProviders()),
    //     getAllCohorts: () => dispatch(getAllCohorts()),
    //     getAllContracts: () => dispatch(getAllContracts()),
    //     // clearClinicalCondition: data => dispatch(clearClinicalCondition(data)),
    //     // clearGenderType: data => dispatch(clearGenderType(data)),
    //     resetFilter: (attributedProviders, cohorts, contracts) =>
    //       dispatch(resetFilter(attributedProviders, cohorts, contracts)),
    //     getStates: () => dispatch(getStates()),
    //     clearState: () => dispatch(clearStates()),
    setActiveSubTab: (data) => dispatch(setActiveSubTab(data)),
    //     getIndividualsFeedbackList: (data) => dispatch(getIndividualsFeedbackList(data)),
    savePaginationNumber: (data) => dispatch(savePaginationNumber(data))
  }
}

function mapStateToProps(state) {
  return {
    individualsCountList: state.dashboardState.individualsListState
      .individualsCountList,
    individualsList: state.dashboardState.individualsListState
      .individualsList,
    //     individualsVisitList: state.entityDashboard.individualsListState
    //       .individualsVisitList,
    //     attributedProviders: state.entityDashboard.individualsListState
    //       .attributedProviders,
    //     cohorts: state.entityDashboard.individualsListState.cohorts,
    //     contracts: state.entityDashboard.individualsListState.contracts,
    //     // serviceAreaList: state.spSearchState.FilterState.getServiceArea,
    //     // genderType: state.spSearchState.FilterState.genderType,
    //     // skillType: state.spSearchState.FilterState.skillType,
    //     // clinicalConditionList: state.spSearchState.FilterState.clincalCondition,
    //     // loggedInUser: state.authState.userState.userData.userInfo,
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
