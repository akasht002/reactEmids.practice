import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TabContent } from 'reactstrap'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import { Scrollbars, ProfileModalPopup, Calendar, CoreoTimePicker, Preloader, ModalPopup } from '../../../components';
import {
  getServiceRequestList,
  getVisitServiceDetails,
  getSchedulesList,
  getVisitList,
  getVisitStatus,
  getServiceVisitDetails,
  updateServiceVisit,
  assignESP,
  getEntityServiceProviderListSearch, selectESP, clearESPList, getEntityServiceProviderList
} from '../../../redux/visitSelection/VisitServiceDetails/actions';
import {
  getServiceCategory,
  getServiceType,
  ServiceRequestStatus
} from "../../../redux/visitSelection/ServiceRequestFilters/actions";
import { Path } from '../../../routes';
import { push, goBack } from '../../../redux/navigation/actions';
import { TabHeader } from './Components/TabHeader';
import { RequestTab } from './ServiceRequest/RequestTab';
import { PlanTab } from './MyPlan/PlanTab';
import { PatientProfileTab } from './PatientProfile/PatientProfileTab';
import {
  PAGE_NO,
  VISIT_STATUS
} from '../../../constants/constants';
import './styles.css';
import { formattedDateMoment, formattedDateChange, formateStateDateValue } from "../../../utils/validations";
import { getHourMin, getUtcTimeDiffInHHMMformat } from '../../../utils/dateUtility'
import moment from 'moment';
import { AssignServiceProvider } from '../VisitServiceDetails/Components/AssignServiceProvider';
import Search from '../VisitServiceList/Search';
import './customStyle.css'
import { getUserInfo } from '../../../services/http';
import {
  getVisitServiceHistoryByIdDetail,
  clearVisitServiceHistoryByIdDetail
} from '../../../redux/visitHistory/VisitServiceDetails/actions'
import {
  getPerformTasksList,
  formDirtyPerformTask,
  getServiceVisitId
} from '../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions'
import { formDirty } from '../../../redux/visitHistory/VisitServiceDetails/actions'
import { formDirtyFeedback } from '../../../redux/visitSelection/VisitServiceProcessing/Feedback/actions'
import { getSummaryDetails, getSavedSignature, formDirtySummaryDetails } from '../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import {isEntityUser} from '../../../utils/userUtility'
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
      standByModeAlertMsg: false
    }
    this.selectedSchedules = [];
    this.espId = '';
  }

  componentDidMount() {
    let data = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize
    }
    if (this.props.ServiceRequestId) {
      this.props.getVisitServiceDetails(this.props.ServiceRequestId);
      this.props.getServiceRequestList(this.props.ServiceRequestId);
      this.props.getEntityServiceProviderList(data);
      this.props.getSchedulesList(this.props.patientId)
    } 
    else {
      if(this.props.ServiceRequestId === 0) {
        this.props.getSchedulesList(this.props.patientId)
        this.getVisitList()
       }
    }
    this.props.getServiceCategory();
    this.props.ServiceRequestStatus();
    this.props.getVisitStatus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startDateEdit: nextProps.serviceVisitDetails.visitDate,
      startTime: nextProps.serviceVisitDetails.startTime,
      endTime: nextProps.serviceVisitDetails.endTime
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
      patientId: this.props.patientId
    }
    this.props.getVisitList(data);
  }

  toggle = (tab) => {
    this.selectedSchedules = this.props.scheduleList.map(data => data.planScheduleId);
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab, activePage: 1 })
    }
    if (tab === '2') {
      this.getVisitList()
    }
  }

  handelDetails = (serviceRequestId) => {
    this.props.getVisitServiceDetails(serviceRequestId);
  }

  addSchedule = () => {
    this.props.goToAddSchedule();
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
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      patientId: this.props.patientId
    }
    this.props.getVisitList(data);
  }

  pageNumberChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
    const data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: this.state.serviceStatus,
      serviceTypes: this.state.serviceTypes,
      pageNumber: pageNumber,
      pageSize: this.state.rowPageSize,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      patientId: this.props.patientId
    }
    this.props.getVisitList(data);
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
    this.setState({
      filterOpen: !this.state.filterOpen,
      activePage: 1,
      filterApplied: true,
      rowPageSize: 10
    })
    const data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: this.state.serviceStatus,
      serviceTypes: this.state.serviceTypes,
      pageNumber: PAGE_NO,
      pageSize: this.state.rowPageSize,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      patientId: this.props.patientId
    }
    this.props.getVisitList(data);
  }

  applyReset = () => {
    this.setState({
      filterOpen: false,
      serviceStatus: [],
      serviceTypes: [],
      startDate: null,
      endDate: null,
      rowPageSize: 10
    })
    const data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: [],
      serviceTypes: [],
      pageNumber: PAGE_NO,
      pageSize: 10,
      startDate: null,
      endDate: null,
      rowPageSize: 10,
      patientId: this.props.patientId
    }
    this.props.getVisitList(data);
  }

  toggleEditModal = (visitId) => {
    this.setState({ editModal: !this.state.editModal, visitId: visitId })
    this.props.getServiceVisitDetails(visitId)
    // if(this.state.editModal){
    //   this.props.clearESPList()
    // }
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

  updateServiceVisits = async () => {
    let model = {
      serviceProviderId: this.espId ? this.espId : 0,
      servicePlanVisitId: this.state.visitId,
      planScheduleId: this.props.serviceVisitDetails.planScheduleId,
      visitDate: this.state.startDateEdit,
      startTime: this.formatedStartTime ? this.formatedStartTime : getHourMin(this.state.startTime),
      duration: getUtcTimeDiffInHHMMformat(this.state.startTime, this.state.endTime),
      endTime: this.formatedEndTime ? this.formatedEndTime : getHourMin(this.state.endTime),
    }
    await this.props.updateServiceVisit(model)
    const data = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: [],
      serviceTypes: [],
      pageNumber: this.state.activePage,
      pageSize: this.state.rowPageSize,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      patientId: this.props.patientId
    }
    await this.props.getVisitList(data);
    await this.setState({ editModal: false })
  }

  onSubmitAssignServiceProvider = async (data) => {
    await this.props.assignESP(data)
    const model = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: [],
      serviceTypes: [],
      pageNumber: this.state.activePage,
      pageSize: this.state.rowPageSize,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      patientId: this.props.patientId
    }
    await this.props.getVisitList(model);
  }

  toggleSearch = () => {
    if (this.state.searchOpen) {
      this.props.clearESPList()
      let data = {
        pageNumber: this.state.pageNumberESP,
        pageSize: this.state.pageSizeESP
      }
      this.props.getEntityServiceProviderList(data);
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
      this.props.getEntityServiceProviderList(data)
    })
  }

  rowPageChange = (pageSize) => {
    this.setState({ rowPageSize: pageSize, activePage: 1 })
    const model = {
      planScheduleIds: this.selectedSchedules,
      visitStatuses: [],
      serviceTypes: [],
      pageNumber: this.state.activePage,
      pageSize: pageSize,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      patientId: this.props.patientId
    }
    this.props.getVisitList(model);
  }

  visitProcessing = data => {
    this.props.isStandByModeOn.isServiceProviderInStandBy ?
      this.setState({ standByModeAlertMsg: true })
      :
      this.props.getPerformTasksList(data, true)
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

  visitSummary = (data) => {
    this.props.getVisitServiceHistoryByIdDetail(data)
  }

  navigateToparticularPageBasedonId = visitList => {
    let visitId = visitList.servicePlanVisitId ? visitList.servicePlanVisitId : visitList.serviceRequestVisitId
    switch (visitList.visitStatusId) {
        case VISIT_STATUS.startVisit.id:
          return this.visitProcessing(visitId) 
        case VISIT_STATUS.inProgress.id:
          return this.visitProcessing(visitId) 
        case VISIT_STATUS.completed.id:
          return this.visitSummary(visitId)
        case VISIT_STATUS.paymentPending.id:
          return this.visitProcessingSummary(visitId)   
        default:
          return ''
    }
  }

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
              <div className="form-group2block">
                <div className="col-md-6 col-lg-6 pd-left-0">
                  <CoreoTimePicker
                    startTime={moment(this.state.startTime, 'h:mm a')}
                    handleChange={this.handleChangeStartTime}
                    value={this.state.startTime}
                    label="Start Time"
                    minTime={moment().hours(0).minutes(0)}
                    maxTime={moment().hours(23).minutes(30)}
                  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <CoreoTimePicker
                    startTime={moment(this.state.endTime, 'h:mm a')}
                    handleChange={this.handleChangeEndTime}
                    value={this.state.endTime}
                    disabled={this.state.startTime ? false : true}
                    label="End Time"
                    minTime={moment().hours(moment(this.state.startTime).format("hh")).minutes(moment(this.state.startTime).format("mm"))}
                    maxTime={moment().hours(23).minutes(30)}
                  />
                </div>
              </div>
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
              <AssignServiceProvider
                entityServiceProvidersList={this.props.entityServiceProvidersList}
                handleAssignServiceProvider={this.handleAssignServiceProvider}
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
        label: 'Requests'
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
    let updatedHeader = !isEntityUser() ? header.slice(0,4) : header;
    let updatedTabdata = this.props.ServiceRequestId === 0 ? tabdata.slice(1,tabdata.length) : tabdata
    return (
      <Fragment>
        <AsideScreenCover>
          <div className='ProfileHeaderWidget'>
            <div className='ProfileHeaderTitle'>
              <h5 className='primaryColor m-0'>View Request</h5>
            </div>
          </div>
          {this.props.isLoading && <Preloader />}
          <Scrollbars speed={2}
            smoothScrolling
            horizontal={false}
            className='ProfileContentWidget'>
            <div class="tab_view">
              <TabHeader
                list={updatedTabdata}
                toggle={this.toggle}
                activeTab={this.state.activeTab}
                goBack={() => this.props.goBack()}
              />
              <TabContent activeTab={this.state.activeTab}>
                {
                  this.props.ServiceRequestId !== 0 &&
                  <RequestTab
                  visitServiceList={this.props.visitServiceList}
                  VisitServiceDetails={this.props.VisitServiceDetails}
                  handelDetails={this.handelDetails}
                />
                }
                <PlanTab
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
                  navigateToparticularPageBasedonId={this.navigateToparticularPageBasedonId}
                />
                <PatientProfileTab />
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
          </Scrollbars>
        </AsideScreenCover>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceRequestList: (data) => dispatch(getServiceRequestList(data)),
    getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
    goBack: () => dispatch(goBack()),
    getSchedulesList: (data) => dispatch(getSchedulesList(data)),
    goToAddSchedule: () => dispatch(push(Path.schedule)),
    getVisitList: (data) => dispatch(getVisitList(data)),
    getEntityServiceProviderList: (data) => dispatch(getEntityServiceProviderList(data)),
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
    getVisitServiceHistoryByIdDetail: (data) => dispatch(getVisitServiceHistoryByIdDetail(data)),
    getPerformTasksList: data => dispatch(getPerformTasksList(data, true)),
    formDirty: () => dispatch(formDirty()),
    formDirtyFeedback: () => dispatch(formDirtyFeedback()),
    formDirtyPerformTask: () => dispatch(formDirtyPerformTask()),
    getServiceVisitId: (data) => dispatch(getServiceVisitId(data)),
    getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
    getSavedSignature: (data) => dispatch(getSavedSignature(data)),
    formDirtySummaryDetails: () => dispatch(formDirtySummaryDetails())
  }
}

function mapStateToProps(state) {
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
    activeTab: VisitServiceDetailsState.activeTab
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails)
)