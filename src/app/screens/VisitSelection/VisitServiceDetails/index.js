import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TabContent } from 'reactstrap'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import { Scrollbars, ProfileModalPopup, Calendar, CoreoTimePicker, ModalPopup, AlertPopup, Preloader } from '../../../components';
import {
  getServiceRequestList,
  getVisitServiceDetails,
  getSchedulesList,
  getVisitList,
  getVisitStatus,
  getServiceVisitDetails,
  updateServiceVisit,
  assignESP,
  getEntityServiceProviderListSearch, selectESP, clearESPList, getEntityServiceProviderList,
  cancelHiredServiceProvider,
  acceptservicerequest,
  updateHireStatusForServiceRequest,
  getDays,
  getfirstlastvisitdate,
  saveScheduleType,
  setAddNewScheduledClicked,
  setActiveTab,
  resetServiceDetails,
  editIndividualEditPopup
} from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { getIndividualSchedulesDetails, getAssessmentDetailsById, clearESPListSchedule } from '../../../redux/schedule/actions';
import {
  getServiceCategory,
  getServiceType,
  ServiceRequestStatus,
  clearServiceType,
  clearServiceCategory
} from "../../../redux/visitSelection/ServiceRequestFilters/actions";
import {
  goToAssessmentVisitProcessing
} from "../../../redux/dashboard/Dashboard/actions";
import { Path } from '../../../routes';
import { push, goBack } from '../../../redux/navigation/actions';
import { TabHeader } from './Components/TabHeader';
import { RequestTab } from './ServiceRequest/RequestTab';
import { PlanTab } from './MyPlan/PlanTab';
import { PatientProfileTab } from './PatientProfile/PatientProfileTab';
import {
  PAGE_NO,
  VISIT_STATUS,
  DEFAULT_PAGE_SIZE,
  VISIT_TYPE,
  SERVICE_REQUEST_DETAILS_TAB,
  USERTYPES,
  CONTACT_NOT_FOUND,
  PHONE_NUMBER_TEXT,
  SERVICE_REQ_STATUS
} from '../../../constants/constants';
import './VisitServiceDetails.css';
import { formattedDateMoment, formattedDateChange, formateStateDateValue, checkEmpty } from "../../../utils/validations";
import { getHourMin, getUtcTimeDiffInHHMMformat, getHHMMformat, timeDropDownFormat, defaultEndTime, defaultStartTime, getDiffTime } from '../../../utils/dateUtility'
import moment from 'moment';
import { AssignServiceProvider } from '../VisitServiceDetails/Components/AssignServiceProvider';
import Search from '../VisitServiceList/Search';
import { getUserInfo } from '../../../services/http';
import {
  getVisitServiceHistoryByIdDetail,
  getAssessmentQuestionsList
} from '../../../redux/visitHistory/VisitServiceDetails/actions'
import {
  getPerformTasksList,
  formDirtyPerformTask,
  getServiceVisitId
} from '../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions'
import { formDirty } from '../../../redux/visitHistory/VisitServiceDetails/actions'
import { formDirtyFeedback } from '../../../redux/visitSelection/VisitServiceProcessing/Feedback/actions'
import { getSummaryDetails, getSavedSignature, formDirtySummaryDetails } from '../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { isEntityUser } from '../../../utils/userUtility';
import { validate } from './validate'
import { allEqual } from '../../../utils/arrayUtility';
import { formatPhoneNumber } from '../../../utils/formatName';
import { onCreateNewConversation } from '../../../redux/asyncMessages/actions';
import { saveContextData, createDataStore } from '../../../redux/telehealth/actions';
export class VisitServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab,
      activePage: 1,
      filterOpen: false,
      serviceStatus: [],
      serviceTypes: [],
      startDate: null,
      endDate: null,
      editModal: false,
      startDateEdit: null,
      startTime: null,
      timeDuration: null,
      pageNumber: PAGE_NO,
      pageSize: 9,
      pageNumberESP: PAGE_NO,
      pageSizeESP: 9,
      rowPageSize: 10,
      tooltipOpen: false,
      standByModeAlertMsg: false,
      isRejectAlertPopupOpen: false,
      isAcceptAlertPopupOpen: false,
      isCancelAlertPopupOpen: false,
      isEngageAlertPopupOpen: false,
      entityServiceProviders: [],
      phoneNumberModal: false,
      phoneNumber: '',
      conversationsModal: false,
      conversationErrMsg: ''
    }
    this.selectedSchedules = [];
    this.espId = '';
    this.filterApplied = false
  }

  componentDidMount() {
    let data = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize
    }

    if (this.props.ServiceRequestId) {
      this.props.getVisitServiceDetails(this.props.ServiceRequestId);
      this.props.getServiceRequestList(this.props.patientId);
      this.props.getEntityServiceProviderList(data, this.props.serviceVisitDetails.serviceProviderId);
      this.props.getSchedulesList(this.props.patientId);
      this.props.getDays();
    }
    else {
      if (this.props.ServiceRequestId === 0) {
        this.props.getSchedulesList(this.props.patientId)
      } else {
        this.props.history.push(Path.visitServiceList)
      }
    }
    this.props.getServiceCategory();
    this.props.ServiceRequestStatus();
    this.props.getVisitStatus();
    this.getVisitFirstAndLastDate();
  }

  componentWillUnmount() {
    this.props.resetServiceDetails()
  }

  componentDidUpdate() {
    if (this.props.isEditIndividualEditPopup) {
      this.setState({
        startDateEdit: this.props.serviceVisitDetails.visitDate,
        startTime: moment(this.props.serviceVisitDetails.startTime, 'h:mm a'),
        endTime: moment(this.props.serviceVisitDetails.endTime, 'h:mm a')
      })
      this.props.editIndividualEditPopup(false)
    }
  }

  getVisitFirstAndLastDate = () => {
    let getISPVisitDate = {
      serviceRequestId: isEntityUser ? 0 : this.props.ServiceRequestId,
      patientId: this.props.patientId,
      serviceProviderId: getUserInfo().serviceProviderId
    }
    !this.props.isEntityDashboard && this.props.getfirstlastvisitdate(getISPVisitDate)
    this.setState({
      startDate: this.props.visitDate && this.props.visitDate.startVisitDateForWeb,
      endDate: this.props.visitDate && this.props.visitDate.endVisitDateForWeb
    })
  }

  toggleToolTip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  getVisitList = () => {
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    const data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: [],
      serviceTypes: [],
      pageNumber: PAGE_NO,
      pageSize: this.state.rowPageSize,
      startDate: null,
      endDate: null,
      patientId: this.props.patientId,
      entityServiceProviders: this.state.entityServiceProviders
    }
    this.props.getVisitList(data);
  }

  toggle = (tab) => {
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab, activePage: 1 })
    }
    if (tab === SERVICE_REQUEST_DETAILS_TAB.myPlan) {
      this.getVisitList()
    }
  }

  handelDetails = (serviceRequestId) => {
    this.props.getVisitServiceDetails(serviceRequestId);
  }

  handelReject = (serviceRequestId) => {
    this.setState({ isRejectAlertPopupOpen: true, serviceRequestId: serviceRequestId })
  }

  reject = () => {
    let model = {
      serviceRequestId: this.state.serviceRequestId,
      patientId: this.props.patientId,
      cancelledDescription: 'Cancelled'
    }
    this.props.cancelHiredServiceProvider(model)
  }

  handelCancel = (serviceRequestId) => {
    this.setState({ isCancelAlertPopupOpen: true, serviceRequestId: serviceRequestId })
  }

  handelAccept = (serviceRequestId) => {
    this.setState({ isAcceptAlertPopupOpen: true, serviceRequestId: serviceRequestId })
  }

  handelEngage = (serviceRequestId) => {
    this.setState({ isEngageAlertPopupOpen: true, serviceRequestId: serviceRequestId })
  }

  accept = () => {
    let model = {
      serviceRequestId: this.state.serviceRequestId,
    }
    this.props.acceptservicerequest(model)
  }

  engage = () => {
    let model = {
      serviceRequestId: this.state.serviceRequestId,
    }
    this.props.updateHireStatusForServiceRequest(model)
  }

  addSchedule = () => {
    this.props.goToAddSchedule();
    this.props.setAddNewScheduledClicked(true);
    this.props.setActiveTab(SERVICE_REQUEST_DETAILS_TAB.myPlan)
  }

  getModalData = (pageNumber, pageSize, isReset = false) => {
    let data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: isReset ? [] : this.state.serviceStatus,
      serviceTypes: isReset ? [] : this.state.serviceTypes,
      pageNumber: pageNumber,
      pageSize: pageSize,
      startDate: this.filterApplied ? this.state.startDate : null,
      endDate: this.filterApplied ? this.state.endDate : null,
      entityServiceProviders: isReset ? [] : this.state.entityServiceProviders,
      patientId: this.props.patientId
    }
    this.props.getVisitList(data);
  }

  handleChangeSchedule = (e) => {
    this.setState({ activePage: 1 })
    if (e.target.checked) {
      this.selectedSchedules.push(parseInt(e.target.id, 0))
    }
    else {
      this.selectedSchedules.splice(this.selectedSchedules.findIndex(function (item) {
        return item === parseInt(e.target.id, 0);
      }), 1);
    }

    const data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: [],
      serviceTypes: [],
      pageNumber: PAGE_NO,
      pageSize: this.state.rowPageSize,
      startDate: this.filterApplied ? this.state.startDate : null,
      endDate: this.filterApplied ? this.state.endDate : null,
      patientId: this.props.patientId,
      entityServiceProviders: this.state.entityServiceProviders
    }
    this.props.getVisitList(data);
  }

  pageNumberChange = (pageNumber) => {
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    this.setState({ activePage: pageNumber })
    this.getModalData(pageNumber, this.state.rowPageSize)
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  handleChangeServiceCategory = (selectedOption) => {
    this.setState({
      ServiceCategoryId: selectedOption.label,
      selectedOption: selectedOption,
    });
    this.props.getServiceType(selectedOption)
    this.setState({ serviceTypes: [] })
  }

  handleserviceType = (item, e) => {
    let serviceType = this.state.serviceTypes
    if (e.target.checked) {
      serviceType.push(item.serviceTypeId)
    }
    else {
      serviceType.splice(serviceType.findIndex(function (item, index) {
        return true;
      }), 1);
    }
    this.setState({
      serviceTypes: serviceType
    })
  }

  handleEsp = (item, e) => {
    let entityServiceProviders = this.state.entityServiceProviders
    if (e.target.checked) {
      entityServiceProviders.push(item)
    } else {
      let index = entityServiceProviders.indexOf(item);
      if (index > -1) {
        entityServiceProviders.splice(index, 1);
      }
    }
    this.setState({ entityServiceProviders: entityServiceProviders });
  }

  dateChanged = (date) => {
    const formattedDate = formattedDateMoment(date);
    this.setState({
      startDate: formattedDate
    });
  }

  dateChangedRaw = (event) => {
    const formattedDate = formattedDateChange(event);
    this.setState({
      startDate: formattedDate
    });
  }

  todateChanged = (date) => {
    const formattedDate = formattedDateMoment(date);
    this.setState({
      endDate: formattedDate
    });
  }

  todateChangedRaw = (event) => {
    const formattedDate = formattedDateChange(event);
    this.setState({
      endDate: formattedDate
    });
  }

  handleChangeserviceStatus = (item, e) => {
    let service = this.state.serviceStatus
    if (e.target.checked) {
      service.push(item.id)
    } else {
      let index = service.indexOf(item.id);
      if (index > -1) {
        service.splice(index, 1);
      }
    }
    this.isStatusChanged = true;
    this.setState({
      serviceStatus: service,
    });
  }

  applyFilter = () => {
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: PAGE_NO,
      filterApplied: true,
      rowPageSize: DEFAULT_PAGE_SIZE
    })
    this.filterApplied = true
    this.getModalData(PAGE_NO, DEFAULT_PAGE_SIZE, false, true)
  }

  applyReset = () => {
    this.setState({
      filterOpen: false,
      serviceStatus: [],
      serviceTypes: [],
      startDate: null,
      endDate: null,
      rowPageSize: DEFAULT_PAGE_SIZE,
      activePage: PAGE_NO,
      entityServiceProviders: [],
      selectedOption: '',
      pageNumberESP: PAGE_NO,
      filterApplied: false
    })
    this.filterApplied = false
    let data = {
      pageNumber: PAGE_NO,
      pageSize: DEFAULT_PAGE_SIZE
    }
    this.getModalData(PAGE_NO, DEFAULT_PAGE_SIZE, true);
    this.props.clearESPList();
    this.props.getVisitStatus();
    this.props.clearServiceCategory(this.props.ServiceType);
    this.props.clearServiceType([]);
    this.props.getEntityServiceProviderList(data);
  }

  toggleEditModal = async (visitId, espId) => {
    this.espId = parseInt(espId, 10)
    let data = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize
    }
    await this.setState({ editModal: !this.state.editModal, visitId: visitId })
    await this.props.getServiceVisitDetails(visitId)
    await this.props.getEntityServiceProviderList(data, this.espId);
  }


  dateChangedEdit = (date) => {
    const formattedDate = formattedDateMoment(date);
    this.setState({
      startDateEdit: formattedDate
    });

  }

  dateChangedRawEdit = (event) => {
    const formattedDate = formattedDateChange(event);
    this.setState({
      startDateEdit: formattedDate
    });
  }

  handleChangeDuration = (event) => {
    this.formatedStartTime = getHourMin(event)
    this.setState({ timeDuration: event });
  }

  handleChangeSelectedSp = (selectedOptionState) => {
    let selectedValue = '';
    let valueData = parseInt(selectedOptionState, 10);
    this.props.entityServiceProvidersList.map((item => {
      return item.serviceProviderId === valueData ? selectedValue = item.firstName : ''
    }))

    this.setState({
      selectedServiceProviderId: selectedOptionState,
      selectedServiceProviderLabel: selectedValue
    });
  }


  handleAssignServiceProvider = (id) => {
    this.espId = parseInt(id, 0);
    this.props.selectESP(id)
  }

  handleChangeEndTime = (event) => {
    this.formatedEndTime = getHourMin(event)
    this.setState({ endTime: event });
  }

  handleChangeStartTime = (event) => {
    this.formatedStartTime = getHourMin(event)
    this.setState({ startTime: event });
  }

  onSubmitAssignServiceProvider = async (data) => {
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    await this.props.assignESP(data)
    await this.getModalData(this.state.activePage, this.state.rowPageSize)
  }

  toggleSearch = () => {
    if (this.state.searchOpen) {
      this.props.clearESPList()
      let data = {
        pageNumber: this.state.pageNumberESP,
        pageSize: this.state.pageSizeESP
      }
      this.props.getEntityServiceProviderList(data, this.props.serviceVisitDetails.serviceProviderId);
    }
    this.setState({
      searchOpen: !this.state.searchOpen,
      searchKeyword: '',
      pageNumberESP: 1,
      pageSizeESP: 9
    })
  }

  handleSearchkeyword = e => {
    this.setState({
      searchKeyword: e.target.value
    })
  }

  handleSearchData = (e) => {
    e.preventDefault();
    let data = {
      searchKeyword: this.state.searchKeyword,
      pageNumber: this.state.pageNumberESP,
      pageSize: this.state.pageSizeESP
    }
    this.props.getEntityServiceProviderListSearch(data)
  }

  clickShowMore = () => {
    this.setState({ pageNumberESP: this.state.pageNumberESP + 1 }, () => {
      let data = {
        pageNumber: this.state.pageNumberESP,
        pageSize: this.state.pageSizeESP
      }
      this.props.getEntityServiceProviderList(data, this.props.serviceVisitDetails.serviceProviderId)
    })
  }

  rowPageChange = (pageSize) => {
    this.setState({ rowPageSize: pageSize, activePage: 1 })
    this.getModalData(PAGE_NO, pageSize)
  }


  visitProcessing = (data, scheduleTypeId) => {
    let isAssessmentVisit = scheduleTypeId === VISIT_TYPE.assessment;
    let startOrStop = true;
    this.props.isStandByModeOn && this.props.isStandByModeOn.isServiceProviderInStandBy ?
      this.setState({ standByModeAlertMsg: true })
      :
      this.props.getPerformTasksList(data, startOrStop, isAssessmentVisit)
    this.props.formDirty();
    this.props.formDirtyFeedback();
    this.props.formDirtyPerformTask();
  }

  visitProcessingSummary = data => {
    this.props.getServiceVisitId(data, true);
    this.props.getSummaryDetails(data);
    this.props.getSavedSignature(data);
    this.props.formDirtySummaryDetails();
    this.props.formDirty();
    this.props.formDirtyFeedback();
  }

  visitSummary = (data, espId, scheduleTypeId) => {
    const model = {
      serviceProviderId: parseInt(espId, 10),
      visitId: data
    }
    this.props.getVisitServiceHistoryByIdDetail(data)
    if (scheduleTypeId === VISIT_TYPE.assessment) {
      this.props.getAssessmentQuestionsList(model)
    }
  }

  close = () => {
    this.setState({ isEngageAlertPopupOpen: false })
  }

  gotoAssessmentVisit = (data) => {
    this.props.goToAssessmentVisitProcessing({ ...data, serviceRequestVisitId: 0 })
  }

  navigateToparticularPageBasedonId = visitList => {
    this.props.saveScheduleType(visitList.scheduleTypeId)
    let visitId = visitList.servicePlanVisitId ? visitList.servicePlanVisitId : visitList.serviceRequestVisitId
    switch (visitList.visitStatusId) {
      case VISIT_STATUS.startVisit.id:
        return this.visitProcessing(visitId, visitList.scheduleTypeId)
      case VISIT_STATUS.inProgress.id:
        return this.visitProcessing(visitId, visitList.scheduleTypeId)
      case VISIT_STATUS.completed.id:
        return this.visitSummary(visitId, visitList.assignedServiceProviderId, visitList.scheduleTypeId)
      case VISIT_STATUS.paymentPending.id:
        return this.visitProcessingSummary(visitId)
      default:
        return ''
    }
  }

  handelEditShedule = (scheduleId) => {
    this.props.clearESPListSchedule()
    this.props.getIndividualSchedulesDetails(scheduleId)
    this.props.setActiveTab(SERVICE_REQUEST_DETAILS_TAB.myPlan)
  }

  handelEditAssessment = (assessmentId) => {
    this.props.clearESPListSchedule()
    this.props.getAssessmentDetailsById(assessmentId)
    this.props.setActiveTab(SERVICE_REQUEST_DETAILS_TAB.myPlan)
  }

  goBackToParticularPage = () => {
    if (this.props.isAddNewScheduleClicked) {
      this.props.goToVisitList()
    } else {
      this.props.goBack();
    }
  }

  validate = (data) => {
    let value = []
    data.map((d) => {
      let txt = d.isState ? this.state[d.key] : this[d.key]
      switch (d.validation) {
        case 'required':
          value.push(checkEmpty(txt))
          break;
        default:
      }
    })
    return allEqual(value);
  }

  updateServiceVisits = async () => {
    this.setState({ onVisitEdit: true })
    let saveVisitEdit = this.validate(validate.editVisit)

    let model = {
      serviceProviderId: this.espId ? this.espId : 0,
      servicePlanVisitId: this.state.visitId,
      planScheduleId: this.props.serviceVisitDetails.planScheduleId,
      visitDate: this.state.startDateEdit,
      startTime: this.formatedStartTime ? this.formatedStartTime : getHHMMformat(this.state.startTime),
      endTime: this.formatedEndTime ? this.formatedEndTime : getHHMMformat(this.state.endTime),
      duration: getUtcTimeDiffInHHMMformat(this.state.startTime, this.state.endTime)
    }
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    if (!saveVisitEdit) {
      await this.props.updateServiceVisit(model)
      await this.getModalData(this.state.activePage, this.state.rowPageSize)
      await this.setState({ editModal: false, onVisitEdit: false })
    }
  }

  showPhoneNumber = (phoneNumber) => {
    this.setState({
      phoneNumber: formatPhoneNumber(phoneNumber),
      phoneNumberModal: !this.state.phoneNumberModal
    })
  };

  showPhoneNumber = () => {
    if (this.props.VisitServiceDetails.statusId !== VISIT_STATUS.hired.id) {
      this.setState({
        conversationsModal: true,
        conversationErrMsg: 'You will be able to view a Phone Number once you are hired.'
      })
    } else {
      let data = this.props.VisitServiceDetails;
      let phoneNumber = data.patient ? data.patient.phoneNumber : ''
      this.setState({ phoneNumber: phoneNumber, phoneNumberModal: !this.state.phoneNumberModal })
    }
  };

  onClickConversation = () => {
    if (this.props.VisitServiceDetails.statusId !== VISIT_STATUS.hired.id) {
      this.setState({
        conversationsModal: true,
        conversationErrMsg: 'You will be able to initiate a conversation once you are hired.'
      })
    } else {
      let item = this.props.VisitServiceDetails;
      let selectedParticipants = [{
        userId: item.patient.coreoHomeUserId,
        participantType: USERTYPES.PATIENT,
        participantId: item.patient.patientId
      }];
      let data = {
        participantList: selectedParticipants,
        title: '',
        context: item.patient.patientId
      };
      this.props.createNewConversation(data);
    }
  };

  onClickVideoConference = () => {
    if (this.props.VisitServiceDetails.statusId !== VISIT_STATUS.hired.id) {
      this.setState({
        conversationsModal: true,
        conversationErrMsg: 'You will be able to initiate a video call once you are hired.'
      })
    } else {
      let item = this.props.VisitServiceDetails;
      let selectedParticipants = [{
        userId: item.patient.coreoHomeUserId,
        participantType: USERTYPES.PATIENT,
        participantId: item.patient.patientId,
        firstName: item.patient.firstName,
        lastName: item.patient.lastName,
        thumbNail: item.patient.imageString
      }];
      this.props.saveContextData(item.patient.patientId);
      this.props.createDataStore(selectedParticipants);
    }
  };

  render() {
    let modalContent =
      <div className="row">
        <div className="col-md-12 mb-2">
          <div className="full-block-scheduleDate">
            <div className="col-md-12  p-0 date-blockview">
              <Calendar
                startDate={this.state.startDateEdit && formateStateDateValue(this.state.startDateEdit)}
                onDateChange={this.dateChangedEdit}
                onDateChangeRaw={this.dateChangedRawEdit}
                mandatory={false}
                minDate={moment()}
                value={this.state.startDateEdit}
                className={"form-control datePicker"}
                label="Start Date"
              />
              {!this.state.startDateEdit && this.state.onVisitEdit &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please select Start Date
                            </span>}
              <div className="form-group2block">
                <div className="col-md-6 col-lg-6 pd-left-0">
                  <CoreoTimePicker
                    startTime={moment(this.state.startTime, 'h:mm a')}
                    handleChange={this.handleChangeStartTime}
                    value={this.state.startTime}
                    label="Start Time"
                    minTime={defaultStartTime()}
                    maxTime={this.state.endTime ? timeDropDownFormat(this.state.endTime) : defaultEndTime()}
                  />
                  {!this.state.startTime && this.state.onVisitEdit &&
                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                      Please select Start Time
                            </span>}
                </div>
                <div className="col-md-6 col-lg-6 pd-right-0">
                  <CoreoTimePicker
                    startTime={moment(this.state.endTime, 'h:mm a')}
                    handleChange={this.handleChangeEndTime}
                    value={this.state.endTime}
                    disabled={this.state.startTime ? false : true}
                    label="End Time"
                    minTime={timeDropDownFormat(this.state.startTime)}
                    maxTime={defaultEndTime()}
                  />
                  {!this.state.endTime && this.state.onVisitEdit &&
                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                      Please select End Time
                            </span>}
                </div>
                <div className="form-group">
                  <h4>Duration</h4>
                  <h5>{getDiffTime(this.state.startTime, this.state.endTime)} Hour(s)</h5>
                </div>
              </div>
              <div className="top-search-blocksp">
                <h2 class="ServicesTitle">Assign Service Provider</h2>
                <div className="search-block_SP">
                  <Search
                    toggleSearch={this.toggleSearch}
                    searchOpen={this.state.searchOpen}
                    searchKeyword={this.state.searchKeyword}
                    handleSearchkeyword={this.handleSearchkeyword}
                    handleSearchData={this.handleSearchData}
                    closeSearch={this.toggleSearch}
                  />
                </div>
              </div>
              {this.props.isLoadingESPList && <Preloader />}
              <AssignServiceProvider
                entityServiceProvidersList={this.props.entityServiceProvidersList}
                handleAssignServiceProvider={this.handleAssignServiceProvider}
                isLoadingESPList={this.props.isLoadingESPList}
                showPhoneNumber={this.showPhoneNumber}
              />
              {!this.props.disableShowmore &&
                <ul className="show-more-assignSP">
                  <li
                    class="list-group-item ProfileShowMore"
                    onClick={this.clickShowMore}
                    disabled={this.props.disableShowmore}
                  >
                    Show more
                                <i class="ProfileIconShowMore"></i>
                  </li>
                </ul>}

            </div>
          </div>
        </div>
      </div>

    let tabdata = [
      {
        id: '1',
        label: 'Request'
      },
      {
        id: '2',
        label: 'My Plan'
      },
      {
        id: '3',
        label: 'My Patient'
      }
    ]

    let header = [
      {
        id: '1',
        label: 'Date'
      },
      {
        id: '2',
        label: 'Start Time'
      },
      {
        id: '3',
        label: 'Duration(H)'
      },
      {
        id: '4',
        label: 'Services Types'
      },
      {
        id: '5',
        label: 'Service Provider'
      },
    ]
    let updatedHeader = !isEntityUser() ? header.slice(0, 4) : header;
    let isDisabledAddSchedule = this.props.scheduleList && this.props.scheduleList.length > 0 ? this.props.scheduleList[0].isAnyAvailableHiredCard : (this.props.VisitServiceDetails.statusId === SERVICE_REQ_STATUS.HIRED || this.props.VisitServiceDetails.statusId === SERVICE_REQ_STATUS.CLOSED) ? true : false;
    let updatedTabdata = this.props.ServiceRequestId === 0 ?
      tabdata.slice(1, tabdata.length) :
      isDisabledAddSchedule ? tabdata : tabdata.slice(0, 2);

    return (
      <Fragment>
        <AsideScreenCover>
          <Scrollbars speed={2}
            smoothScrolling
            horizontal={false}
            className='ProfileContentWidget update-height-content'>
            <div class="tab_view">
              <TabHeader
                list={updatedTabdata}
                toggle={this.toggle}
                activeTab={this.state.activeTab}
                goBack={() => this.goBackToParticularPage()}
              />
              <TabContent activeTab={this.state.activeTab}>
                {
                  this.props.ServiceRequestId !== 0 &&
                  <RequestTab
                    visitServiceList={this.props.visitServiceList}
                    VisitServiceDetails={this.props.VisitServiceDetails}
                    daysType={this.props.daysType}
                    handelDetails={this.handelDetails}
                    handelReject={this.handelReject}
                    handelAccept={this.handelAccept}
                    handelCancel={this.handelCancel}
                    handelEngage={this.handelEngage}
                  />
                }
                <PlanTab
                  isDisabledAddSchedule={isDisabledAddSchedule}
                  rowPageSize={this.state.rowPageSize}
                  rowPageChange={this.rowPageChange}
                  scheduleList={this.props.scheduleList}
                  addSchedule={this.addSchedule}
                  handleChangeSchedule={this.handleChangeSchedule}
                  visitList={this.props.visitList}
                  header={updatedHeader}
                  espList={this.props.entityServiceProvidersList}
                  pageCount={this.props.visitListCount}
                  pageNumberChange={this.pageNumberChange}
                  activePage={this.state.activePage}
                  isOpen={this.state.filterOpen}
                  toggle={this.toggleFilter}
                  applyFilter={this.applyFilter}
                  applyReset={this.applyReset}
                  startDate={this.state.startDate}
                  dateChanged={this.dateChanged}
                  dateChangedRaw={this.dateChangedRaw}
                  todateChanged={this.todateChanged}
                  todateChangedRaw={this.todateChangedRaw}
                  endDate={this.state.endDate}
                  isValid={this.state.isValid}
                  ServiceCategory={this.props.ServiceCategory}
                  handleChangeServiceCategory={this.handleChangeServiceCategory}
                  ServiceCategoryId={this.state.ServiceCategoryId}
                  selectedOption={this.state.selectedOption}
                  ServiceType={this.props.ServiceType}
                  handleserviceType={this.handleserviceType}
                  ServiceStatus={this.props.visitStatusList}
                  handleChangeserviceStatus={this.handleChangeserviceStatus}
                  checked={this.state.isChecked}
                  toggleEditModal={this.toggleEditModal}
                  onSubmit={this.onSubmitAssignServiceProvider}
                  entityServiceProvidersList={this.props.entityServiceProvidersList}
                  tooltipOpen={this.state.tooltipOpen}
                  toggleToolTip={this.toggleToolTip}
                  handelEditShedule={this.handelEditShedule}
                  navigateToparticularPageBasedonId={this.navigateToparticularPageBasedonId}
                  handelEditAssessment={this.handelEditAssessment}
                  handleEsp={this.handleEsp}
                  clickShowMore={this.clickShowMore}
                  disableShowmore={this.props.disableShowmore}
                  visitDate={this.props.visitDate}
                />
                <PatientProfileTab
                  showPhoneNumber={this.showPhoneNumber}
                  onClickConversation={this.onClickConversation}
                  onClickVideoConference={this.onClickVideoConference}
                />
              </TabContent>
            </div>
            <ProfileModalPopup
              isOpen={this.state.editModal}
              toggle={this.toggleEditModal}
              ModalBody={modalContent}
              className="modal-lg asyncModal CertificationModal my-plan-editmodel"
              modalTitle={'Edit Visit'}
              disabled={this.state.disabledSaveBtn}
              centered={true}
              onClick={this.updateServiceVisits}
              discardBtn={true}
              discardbuttonLabel={'Cancel'}
              onDiscard={() => this.setState({ editModal: !this.state.editModal })}
            />
            <ModalPopup
              isOpen={this.state.standByModeAlertMsg}
              ModalBody={<span> Please turn off the stand-by mode to start the visit. </span>}
              btn1='OK'
              className='modal-sm'
              headerFooter='d-none'
              footer='d-none'
              centered='centered'
              onConfirm={() =>
                this.setState({
                  standByModeAlertMsg: false
                })}
            />

            <AlertPopup
              message='Are you sure you want to reject the request?'
              OkButtonTitle={'Yes'}
              CancelButtonTitle={'No'}
              isCancel={true}
              isOpen={this.state.isRejectAlertPopupOpen}
              closePopup={() => this.setState({ isRejectAlertPopupOpen: false })}
              onAcceptClick={() => this.reject()}
            />
            <AlertPopup
              message='Are you sure you want to accept the request?'
              OkButtonTitle={'Yes'}
              CancelButtonTitle={'No'}
              isCancel={true}
              isOpen={this.state.isAcceptAlertPopupOpen}
              closePopup={() => this.setState({ isAcceptAlertPopupOpen: false })}
              onAcceptClick={() => this.accept()}
            />
            <AlertPopup
              message='Are you sure you want to cancel the request?'
              OkButtonTitle={'Yes'}
              CancelButtonTitle={'No'}
              isCancel={true}
              isOpen={this.state.isCancelAlertPopupOpen}
              closePopup={() => this.setState({ isCancelAlertPopupOpen: false })}
              onAcceptClick={() => this.reject()}
            />
            <AlertPopup
              message='Are you sure you want to engage the request?'
              OkButtonTitle={'Yes'}
              CancelButtonTitle={'No'}
              isCancel={true}
              isOpen={this.state.isEngageAlertPopupOpen}
              closePopup={() => this.setState({ isEngageAlertPopupOpen: false })}
              onAcceptClick={() => this.engage()}
            />
            <AlertPopup
              isOpen={this.state.conversationsModal}
              message={this.state.conversationErrMsg}
              onAcceptClick={() =>
                this.setState({
                  conversationsModal: false
                })}
              okButtonAlignment='float-center'
            />
            <AlertPopup
              message={<span> {this.state.phoneNumber
                === null
                ? CONTACT_NOT_FOUND
                : `${PHONE_NUMBER_TEXT}
                ${formatPhoneNumber(this.state.phoneNumber)}`} </span>}
              isOpen={this.state.phoneNumberModal}
              onAcceptClick={() =>
                this.setState({
                  phoneNumberModal: false
                })}
              okButtonAlignment='float-center'
            />
          </Scrollbars>
        </AsideScreenCover>

      </Fragment>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getServiceRequestList: (data) => dispatch(getServiceRequestList(data)),
    getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
    goBack: () => dispatch(goBack()),
    getSchedulesList: (data) => dispatch(getSchedulesList(data)),
    goToAddSchedule: () => dispatch(push(Path.schedule)),
    getVisitList: (data) => dispatch(getVisitList(data)),
    getEntityServiceProviderList: (data, selectedESPId) => dispatch(getEntityServiceProviderList(data, selectedESPId)),
    getServiceCategory: () => dispatch(getServiceCategory()),
    getServiceType: (data) => dispatch(getServiceType(data)),
    ServiceRequestStatus: () => dispatch(ServiceRequestStatus()),
    getVisitStatus: () => dispatch(getVisitStatus()),
    getServiceVisitDetails: (data) => dispatch(getServiceVisitDetails(data)),
    updateServiceVisit: (data) => dispatch(updateServiceVisit(data)),
    assignESP: (data) => dispatch(assignESP(data)),
    selectESP: (data) => dispatch(selectESP(data)),
    clearESPList: () => dispatch(clearESPList()),
    getEntityServiceProviderListSearch: (data) => dispatch(getEntityServiceProviderListSearch(data)),
    getIndividualSchedulesDetails: (data) => dispatch(getIndividualSchedulesDetails(data)),
    getVisitServiceHistoryByIdDetail: (data) => dispatch(getVisitServiceHistoryByIdDetail(data)),
    getPerformTasksList: (data, startOrStop, isAssessmentVisit) => dispatch(getPerformTasksList(data, startOrStop, isAssessmentVisit)),
    formDirty: () => dispatch(formDirty()),
    formDirtyFeedback: () => dispatch(formDirtyFeedback()),
    formDirtyPerformTask: () => dispatch(formDirtyPerformTask()),
    getServiceVisitId: (data) => dispatch(getServiceVisitId(data)),
    getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
    getSavedSignature: (data) => dispatch(getSavedSignature(data)),
    formDirtySummaryDetails: () => dispatch(formDirtySummaryDetails()),
    getAssessmentDetailsById: (data) => dispatch(getAssessmentDetailsById(data)),
    cancelHiredServiceProvider: (data) => dispatch(cancelHiredServiceProvider(data)),
    acceptservicerequest: (data) => dispatch(acceptservicerequest(data)),
    updateHireStatusForServiceRequest: (data) => dispatch(updateHireStatusForServiceRequest(data)),
    getDays: () => dispatch(getDays()),
    clearESPListSchedule: () => dispatch(clearESPListSchedule()),
    clearServiceType: (data) => dispatch(clearServiceType(data)),
    clearServiceCategory: (data) => dispatch(clearServiceCategory(data)),
    getfirstlastvisitdate: (data) => dispatch(getfirstlastvisitdate(data)),
    goToAssessmentVisitProcessing: (data) => dispatch(goToAssessmentVisitProcessing(data)),
    saveScheduleType: (data) => dispatch(saveScheduleType(data)),
    getAssessmentQuestionsList: data => dispatch(getAssessmentQuestionsList(data)),
    goToVisitList: () => dispatch(push(Path.visitServiceList)),
    setAddNewScheduledClicked: data => dispatch(setAddNewScheduledClicked(data)),
    setActiveTab: data => dispatch(setActiveTab(data)),
    createNewConversation: (data) => dispatch(onCreateNewConversation(data)),
    saveContextData: (data) => dispatch(saveContextData(data)),
    createDataStore: (data) => dispatch(createDataStore(data)),
    resetServiceDetails: () => dispatch(resetServiceDetails()),
    editIndividualEditPopup: (data) => dispatch(editIndividualEditPopup(data))
  }
}

export function mapStateToProps(state) {
  const VisitServiceDetailsState = state.visitSelectionState.VisitServiceDetailsState;
  return {
    visitServiceList: VisitServiceDetailsState.visitserviceList,
    ServiceRequestId: VisitServiceDetailsState.ServiceRequestId,
    VisitServiceDetails: VisitServiceDetailsState.VisitServiceDetails,
    scheduleList: VisitServiceDetailsState.scheduleList,
    visitList: VisitServiceDetailsState.visitList,
    visitListCount: VisitServiceDetailsState.visitListCount,
    entityServiceProvidersList: VisitServiceDetailsState.entityServiceProvidersList,
    ServiceCategory: state.visitSelectionState.ServiceRequestFilterState.ServiceCategory,
    ServiceType: state.visitSelectionState.ServiceRequestFilterState.ServiceType,
    visitStatusList: state.visitSelectionState.VisitServiceDetailsState.visitStatus,
    patientId: state.patientProfileState.patientId,
    serviceVisitDetails: VisitServiceDetailsState.serviceVisitDetails,
    isLoading: VisitServiceDetailsState.isLoading,
    disableShowmore: VisitServiceDetailsState.disableShowmore,
    isStandByModeOn: state.profileState.PersonalDetailState.spBusyInVisit,
    activeTab: VisitServiceDetailsState.activeTab,
    daysType: VisitServiceDetailsState.daysType,
    visitDate: VisitServiceDetailsState.visitDate,
    isAddNewScheduleClicked: VisitServiceDetailsState.isAddNewScheduleClicked,
    isEntityDashboard: VisitServiceDetailsState.isEntityDashboard,
    isLoadingESPList: VisitServiceDetailsState.isLoadingESPList,
    isEditIndividualEditPopup: VisitServiceDetailsState.editIndividualEditPopup
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails)
)