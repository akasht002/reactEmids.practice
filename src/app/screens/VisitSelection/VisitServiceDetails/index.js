import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Moment from 'react-moment'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { Scrollbars, ModalPopup, Preloader } from '../../../components'
import { goBack, push } from '../../../redux/navigation/actions'
import { Path } from '../../../routes'
import AssignServiceProvider from './AssignServiceProvider'
import { getServiceRequestId } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { getSpBusyInVisit } from '../../../redux/profile/PersonalDetail/actions';
import {
  getVisitServiceDetails,
  getVisitServiceSchedule,
  clearVisitServiceSchedule,
  updateServiceRequestByServiceProvider,
  cancelServiceRequestByServiceProvider,
  cancelInvitedServiceProvider,
  cancelAppliedServiceProvider,
  cancelHiredServiceProvider,
  getVisitServiceEligibilityStatus,
  getDays,
  dispatchServiceRequestByServiceProvider,
  formDirtyVisitServiceDetails
} from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { setPatient } from '../../../redux/patientProfile/actions';
import {
  getPerformTasksList,
  formDirtyPerformTask,
  getServiceVisitId
} from '../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions'
import { formDirty } from '../../../redux/visitHistory/VisitServiceDetails/actions'
import { formDirtySummaryDetails } from '../../../redux/visitSelection/VisitServiceProcessing/Summary/actions'
import { formDirtyFeedback } from '../../../redux/visitSelection/VisitServiceProcessing/Feedback/actions'
import { serviceRequestMessages } from '../../../utils/messageUtility'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover'
import '../../../screens/VisitSelection/VisitServiceDetails/style.css'
import {
  MORNING,
  AFTERNOON,
  EVENING,
  HIRED_STATUS_ID,
  USERTYPES,
  CONTACT_NOT_FOUND,
  PHONE_NUMBER_TEXT
} from '../../../constants/constants'
import { ServiceStatus } from './ServiceRequestStatus'
import {
  SERVICE_VISIT_STATUS,
  RECURRING_PATTERN,
  ORG_SERVICE_PROVIDER_TYPE_ID
} from '../../../constants/constants'
import { getLength } from '../../../utils/validations'
import { formatPhoneNumber } from '../../../utils/formatName'
import {
  getVisitServiceHistoryByIdDetail,
  clearVisitServiceHistoryByIdDetail
} from '../../../redux/visitHistory/VisitServiceDetails/actions'
import { getUserInfo, isEntityServiceProvider } from '../../../utils/userUtility';
import { onCreateNewConversation } from '../../../redux/asyncMessages/actions';
import { getSummaryDetails, getSavedSignature } from '../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { createVideoConference } from '../../../redux/telehealth/actions';
import { isFutureDay } from '../../../utils/dateUtility'

class VisitServiceDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verticalScroll: false,
      width: window.innerWidth,
      activeTab: '1',
      visitServiceDetails: [],
      visitServiceSchedule: [],
      isAlertModalOpen: false,
      patientId: '',
      serviceType: '',
      isOpen: false,
      isAlertModalopenConfirm: false,
      conversationsModal: false,
      canInitiateConversation: false,
      conversationErrMsg: '',
      pageNumber: 1,
      disableShowMore: false,
      standByModeAlertMsg: false,
      isLoading: false
    }
    this.alertModalMsg = ''
    this.status = {}
    this.alertModalMsgstatus = 'Please apply for another service request.Service Provider is already been Hired for this request'
  }

  componentDidMount() {
    if (this.props.ServiceRequestId) {
      this.props.getVisitServiceDetails(this.props.ServiceRequestId);
      // this.props.getVisitServiceSchedule(this.props.ServiceRequestId, this.state.pageNumber);
      this.props.getDays();
      this.props.getSpBusyInVisit();
    } else {
      this.props.history.push(Path.visitServiceList)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visitServiceDetails: nextProps.VisitServiceDetails,
      patientId: nextProps.VisitServiceDetails.patient &&
        nextProps.VisitServiceDetails.patientId,
      serviceType: nextProps.VisitServiceDetails.serviceRequestTypeDetails &&
        nextProps.VisitServiceDetails.serviceRequestTypeDetails[0]
          .serviceRequestTypeDetailsId,
      isLoading: nextProps.isLoading
    })
    this.visitServiceScheduleData(nextProps);
  }

  componentWillUnmount() {
    this.props.clearVisitServiceHistoryByIdDetail();
    this.props.clearVisitServiceSchedule();
  }

  clickShowMore = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
      this.props.getVisitServiceSchedule(this.props.ServiceRequestId, this.state.pageNumber);
    })
  }

  handelPatientProfile = (data) => {
    this.props.setPatient(data)
    this.props.goToPatientProfile()
  }

  visitServiceScheduleData = (nextProps) => {
    if (nextProps.VisitServiceSchedule.length) {
      if (this.state.visitServiceSchedule.length === 0) {
        this.setState({
          visitServiceSchedule: this.state.visitServiceSchedule.concat(nextProps.VisitServiceSchedule)
        })
      }
      else if (this.state.visitServiceSchedule[this.state.visitServiceSchedule.length - 1].serviceRequestVisitId !==
        nextProps.VisitServiceSchedule[nextProps.VisitServiceSchedule.length - 1].serviceRequestVisitId) {
        this.setState({
          visitServiceSchedule: this.state.visitServiceSchedule.concat(nextProps.VisitServiceSchedule)
        })
      }
      if (nextProps.VisitServiceSchedule.length === 10) {
        this.setState({
          disableShowMore: false
        })
      } else {
        this.setState({ disableShowMore: true })
      }
    } else {
      this.setState({ disableShowMore: true })
    }
  }

  checkEligibility = () => {
    const data = {
      patientId: this.state.visitServiceDetails.patient.patientId,
      serviceRequestId: this.props.ServiceRequestId,
      serviceProviderId: this.state.visitServiceDetails.serviceProviderId
    }
    this.props.getVisitServiceEligibilityStatus(data)
  }

  visitService = () => {
    this.props.visitService()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  onClickSchedule() {
    this.props.getVisitServiceSchedule(this.props.ServiceRequestId, this.state.pageNumber);
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

  reset = () => {
    this.props.getVisitServiceSchedule(this.props.ServiceRequestId, this.state.pageNumber);
    setTimeout(() => {
      this.setState({
        visitServiceSchedule: this.props.VisitServiceSchedule
      })
    }, 300)
  }

  selectedServiceType = e => {
    this.setState({ serviceType: parseInt(e.target.id, 0) })
  }

  getSlotName = slot => {
    if (slot === MORNING) return 'MORN'
    else if (slot === AFTERNOON) return 'AFTE'
    else if (slot === EVENING) return 'EVE'
  }

  postServiceRequest = status => {
    this.alertModalMsg = status.isInterested
      ? serviceRequestMessages.applyServiceProvider
      : (status.isCancel ? serviceRequestMessages[status.status] : serviceRequestMessages.notInterestedServiceProvider)
    this.setState({ isAlertModalOpen: true })
    this.status = status
  }

  onConfirmSerivceRequest = status => {
    if (!status.isCancel) {
      let model = {
        serviceRequestId: this.state.visitServiceDetails.serviceRequestId,
        type: status.isInterested ? 1 : 0
      }
      this.props.updateServiceRequestByServiceProvider(model)
      if (this.props.updateServiceRequestMsgStatus === 1) {
        this.setState({ isAlertModalopenConfirm: true })
      } else {
        this.props.history.push("/visitServiceList")
      }

    } else {
      let model = {
        serviceRequestId: this.state.visitServiceDetails.serviceRequestId,
        patientId: this.state.visitServiceDetails.patient ? this.state.visitServiceDetails.patient.patientId : 0,
        cancelledDescription: 'Canceled'
      }
      if (status.status === 36) this.props.cancelInvitedServiceProvider(model)
      else if (status.status === 37) this.props.cancelAppliedServiceProvider(model)
      else if (status.status === 38) this.props.cancelHiredServiceProvider(model)
      else this.props.cancelServiceRequestByServiceProvider(model)
    }
  }

  onConfirmSerivceRequestMsg = () => {
    this.setState({ isAlertModalopenConfirm: false })
    this.props.history.push(Path.visitServiceList)
  }

  showData = () => {
    if (this.state.visitServiceDetails.occurence !== 0) {
      return '- ' + this.state.visitServiceDetails.occurence + ' occurrences'
    } else {
      return (
        <React.Fragment>
          -
          &nbsp;
          <Moment format='DD MMM YYYY'>
            {this.state.visitServiceDetails.endDate}
          </Moment>
        </React.Fragment>
      )
    }
  }

  visitSummary = (data) => {
    this.props.getVisitServiceHistoryByIdDetail(data)
  }

  showPhoneNumber = () => {
    if (this.props.VisitServiceDetails.statusId !== 38) {
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
    if (this.props.VisitServiceDetails.statusId !== 38) {
      this.setState({
        conversationsModal: true,
        conversationErrMsg: 'You will be able to initiate a conversation once you are hired.'
      })
    } else {
      let userId = getUserInfo().coreoHomeUserId;
      let participantId = getUserInfo().serviceProviderId;
      let item = this.state.visitServiceDetails;
      let selectedParticipants = [{
        userId: item.patient.coreoHomeUserId,
        participantType: USERTYPES.PATIENT,
        participantId: item.patient.patientId
      }];

      let loggedInUser = {
        userId: userId,
        participantType: USERTYPES.SERVICE_PROVIDER,
        participantId: participantId
      }

      selectedParticipants.push(loggedInUser);
      let data = {
        participantList: selectedParticipants,
        createdBy: userId,
        createdByType: loggedInUser.participantType,
        title: '',
        context: item.patient.patientId
      };
      this.props.createNewConversation(data);
    }
  };


  onClickVideoConference = () => {
    if (this.props.VisitServiceDetails.statusId !== 38) {
      this.setState({
        conversationsModal: true,
        conversationErrMsg: 'You will be able to initiate a video call once you are hired.'
      })
    } else {
      let item = this.state.visitServiceDetails;
      let selectedParticipants = [{
        userId: item.patient.coreoHomeUserId,
        participantType: USERTYPES.PATIENT,
        participantId: item.patient.patientId,
        firstName: item.patient.firstName,
        lastName: item.patient.lastName,
        thumbNail: item.patient.imageString
      }];
      this.props.createVideoConference(selectedParticipants);
    }
  };

  goBackToServiceRequest = () => {
    this.props.goBack();
    this.props.formDirtyVisitServiceDetails();
  }

  render() {
    let defaultCheck = ''
    let sliderTypes =
      this.state.visitServiceDetails && this.state.visitServiceDetails.serviceRequestTypeDetails &&
      this.state.visitServiceDetails.serviceRequestTypeDetails.map(
        (serviceTypes, index) => {
          index === 0 ? (defaultCheck = true) : (defaultCheck = false)
          let catNum = index + 1
          return (
            <div className='ServiceTypeList'>
              <input
                id={serviceTypes.serviceRequestTypeDetailsId}
                type='radio'
                defaultChecked={defaultCheck}
                className='ServiceTypeInput'
                name='serviceType'
                value={catNum}
                onChange={e => this.selectedServiceType(e)}
              />
              <label
                className='ServiceTypeLink'
                htmlFor={serviceTypes.serviceRequestTypeDetailsId}
              >
                <span
                  className={`ServiceTypeIcon SPIconServices${serviceTypes.serviceTypeId}`}
                />
                <div className='serviceTypeDesc'>
                  <span className='serviceName'>
                    {serviceTypes.serviceTypeDescription}
                  </span>
                </div>
              </label>
              <span className='ServiceIndicatorBottom' />
            </div>
          )
        }
      )

    let description =
      this.state.visitServiceDetails && this.state.visitServiceDetails.serviceRequestTypeDetails &&
      this.state.visitServiceDetails.serviceRequestTypeDetails.map(
        (typeDetails, index) => {
          return (
            <div>
              {typeDetails.serviceRequestTypeTaskDetails.map(
                (taskDetails, i) => {
                  if (
                    this.state.serviceType &&
                    this.state.serviceType ===
                    taskDetails.serviceRequestTypeDetailsId
                  ) {
                    return (
                      <li>
                        <i>{i + 1}</i>{taskDetails.serviceTaskDescription}
                      </li>
                    )
                  }
                  return description
                }
              )}
            </div>
          )
        }
      )

    let modifiedDays = []

    this.props.daysType &&
      this.props.daysType.map(day => {
        let checkDay = {
          day: day.keyValue,
          slotDescription: []
        }
        this.state.visitServiceDetails && this.state.visitServiceDetails.serviceRequestSlot &&
          this.state.visitServiceDetails.serviceRequestSlot.map(slotDay => {
            if (day.id === slotDay.dayOfWeek) {
              checkDay.slotDescription.push(slotDay.slotDescription)
            }
            return '';
          })
        if (checkDay.slotDescription.length > 0) {
          modifiedDays.push(checkDay)
        }
        return '';
      })

    let AvailDays =
      modifiedDays &&
      modifiedDays.map((days, index) => {
        let Count = ''
        return (
          <div className={'SPAvailContainer ' + Count + 'Available'}>
            <div className={'SPAvailTitle'}>
              <label className='SPAvailTitleText'>{days.day}</label>
            </div>
            <div className={'SPAvailContent'}>
              <label
                className={
                  'SPAvailItems ' +
                  (days.slotDescription.includes('Morning') ? 'active' : '')
                }
              >
                Morning
              </label>
              <label
                className={
                  'SPAvailItems ' +
                  (days.slotDescription.includes('Afternoon') ? 'active' : '')
                }
              >
                Afternoon
              </label>
              <label
                className={
                  'SPAvailItems ' +
                  (days.slotDescription.includes('Evening') ? 'active' : '')
                }
              >
                Evening
              </label>
            </div>
          </div>
        )
      })

    let address =
      this.state.visitServiceDetails && this.state.visitServiceDetails.patient &&
      this.state.visitServiceDetails.patient.patientAddresses.filter(obj => {
        return obj.isPrimaryAddress === true
      })
    let profileImage = null
    let patientLastName = ''
    if (this.state.visitServiceDetails && this.state.visitServiceDetails.statusId === HIRED_STATUS_ID) {
      profileImage = this.state.visitServiceDetails.patient &&
        this.state.visitServiceDetails.patient.imageString
        ? this.state.visitServiceDetails.patient.imageString
        : require('../../../assets/images/Blank_Profile_icon.png')
      patientLastName =
        this.state.visitServiceDetails.patient &&
        this.state.visitServiceDetails.patient.lastName
    } else {
      profileImage = require('../../../assets/images/Blank_Profile_icon.png')
      patientLastName =
        this.state.visitServiceDetails.patient &&
        this.state.visitServiceDetails.patient.lastName.charAt(0)
    }

    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        {this.props.VisitServiceDetails.length === 0 && <Preloader />}
        {this.state.isLoading && <Preloader />}
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>Service Request / {this.state.visitServiceDetails.serviceRequestId
              ? this.state.visitServiceDetails.serviceRequestId
              : this.state.visitServiceDetails.ServiceRequestId}</h5>
          </div>
        </div>
        <Scrollbars
          speed={2}
          smoothScrolling
          horizontal={false}
          className='ServiceRequestsWidget'
        >
          <div className='card mainProfileCard'>
            <div className='CardContainers'>
              <section className='ProfileCardHeader'>
                <div className='primaryColor'>
                  <span className='HeaderBackWrapper CursorPointer'>
                    <a className={'HeaderBackButton'} onClick={this.goBackToServiceRequest}></a>
                  </span>
                  <span className='HeaderRequestLabel'>
                    Request ID
                  </span>
                  <span className='HeaderRequestLabelID'>
                    {this.state.visitServiceDetails.serviceRequestId
                      ? this.state.visitServiceDetails.serviceRequestId
                      : this.state.visitServiceDetails.ServiceRequestId}
                  </span>
                </div>
                <div className='ProfileHeaderButton'>
                  {!getUserInfo().isEntityServiceProvider && <ServiceStatus
                    status={{
                      id: this.state.visitServiceDetails.statusId,
                      name: this.state.visitServiceDetails.statusName,
                      visitInProgress: this.state.visitServiceDetails.visitInProgress
                    }}
                    postServiceRequest={this.postServiceRequest}
                  />}
                </div>
              </section>
              <section class='LeftPalette'>
                <div class='LeftPostedBy'>
                  <h2 className='postdby-title'>Posted By</h2>
                  <div class='PostedByImageContainer pt-0'>
                    <img
                      className='ProfileImage'
                      src={profileImage}
                      alt='patientImage'
                      onClick={() => { this.state.visitServiceDetails.statusId === HIRED_STATUS_ID ? this.handelPatientProfile(this.state.visitServiceDetails.patient && this.state.visitServiceDetails.patient.patientId) : '' }}
                    />

                    <div class='PostedByProfileDetails'>
                      <div class='ProfileDetailsName' onClick={() => { this.state.visitServiceDetails.statusId === HIRED_STATUS_ID ? this.handelPatientProfile(this.state.visitServiceDetails.patient && this.state.visitServiceDetails.patient.patientId) : '' }}>
                        {getLength(this.state.visitServiceDetails.patient) >
                          0 && this.state.visitServiceDetails.patient.firstName}
                        {' '}
                        {patientLastName}
                      </div>
                      <div class='ProfileDetailsDate'>
                        Posted on
                        {' '}
                        {this.state.visitServiceDetails.postedDate &&
                          <Moment format='DD MMM'>
                            {this.state.visitServiceDetails.postedDate}
                          </Moment>}
                      </div>
                    </div>
                  </div>
                  <div className='PostedByImageContainer CursorPointer' onClick={this.showPhoneNumber}>
                    <i class='ProfileIcon IconCall' />
                    <div class='PostedByProfileDetails'>
                      <div class='ProfileIconDetails'>
                        Phone Call
                      </div>
                    </div>
                  </div>
                  {!isEntityServiceProvider() &&
                    <div className='PostedByImageContainer CursorPointer' onClick={this.onClickConversation}>
                      <i class='ProfileIcon IconConversations' />
                      <div class='PostedByProfileDetails'>
                        <div class='ProfileIconDetails'>
                          Conversations
                      </div>
                      </div>
                    </div>}
                  {!isEntityServiceProvider() &&
                    <div className='PostedByImageContainer CursorPointer' onClick={this.onClickVideoConference}>
                      <i class='ProfileIcon IconVideo' />
                      <div class='PostedByProfileDetails'>
                        <div class='ProfileIconDetails'>
                          Video Conference
                      </div>
                      </div>
                    </div>}
                </div>
              </section>
              <section className='rightPalette'>
                <div className='container-fluid'>
                  <Nav tabs className='PaletteTabs'>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === '1'
                        })}
                        onClick={() => {
                          this.toggle('1')
                        }}
                      >
                        Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === '2'
                        })}
                        onClick={() => {
                          this.toggle('2')
                          this.onClickSchedule()
                        }}
                      >
                        Schedule
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1' className='TabBody'>
                      <form className='ServiceContent'>
                        <div className='ServiceCategoryContent'>
                          <h2 className='ServicesTitle'>Service Category</h2>
                          <p className='ScheduleTypeTitle'>
                            {
                              this.state.visitServiceDetails
                                .serviceCategoryDescription
                            }
                          </p>
                          <h2 className='ServicesTitle mt-4'>Service Types</h2>
                          <div className='ServiceType'>
                            <div className='ServiceTypesSlider Summary'>
                              {sliderTypes}
                            </div>
                          </div>
                          <div className='ServiceTasks Summary'>
                            <ul className='SelectedTask'>
                              {description}

                            </ul>
                          </div>
                          <h2 className='ServicesTitle'>
                            Additional Information
                          </h2>
                          <p className='AdditionInfo mt-3 mb-5'>
                            {
                              this.state.visitServiceDetails
                                .serviceRequestDescription
                            }
                          </p>
                          <h2 className='ServicesTitle'>
                            Schedule and Frequency
                          </h2>
                          <div className='ContentTitle Summary mt-3 mb-4'>
                            <span className='ContentTitle Summary'>
                              {this.state.visitServiceDetails
                                .recurringPatternDescription ===
                                RECURRING_PATTERN
                                ? this.state.visitServiceDetails
                                  .recurringPatternDescription + ' '
                                : 'Recurring '}
                              Schedule
                            </span>
                            <span>
                              {this.state.visitServiceDetails.startDate &&
                                <Moment format='DD MMM YYYY'>
                                  {this.state.visitServiceDetails.startDate}
                                </Moment>}

                              {this.state.visitServiceDetails
                                .recurringPatternDescription !==
                                RECURRING_PATTERN &&
                                this.showData()
                                // '- till ' +  this.state.visitServiceDetails.occurence + ' occurences'
                              }
                            </span>
                            {this.state.visitServiceDetails
                              .recurringPatternDescription !==
                              RECURRING_PATTERN &&
                              <React.Fragment>
                                <span className='ContentTitle Summary'>
                                  Recurring Pattern
                                </span>
                                <span>
                                  {
                                    this.state.visitServiceDetails
                                      .recurringPatternDescription
                                  }
                                </span>
                              </React.Fragment>}

                          </div>
                          <div className='AvailabilityWidget'>
                            <div className='SPAvailWidget Summary'>
                              {AvailDays}
                            </div>
                          </div>
                          <h2 className='ServicesTitle'>Point of Service</h2>
                          <div className='SummaryContent POS mt-3 mb-5'>

                            {this.state.visitServiceDetails.patient &&
                              this.state.visitServiceDetails.patient
                              ? address.map(pointofservice => {
                                return (
                                  <Fragment>
                                    <p>
                                      <span>Street</span>
                                      {pointofservice.streetAddress}
                                    </p>

                                    <p>
                                      <span>State</span>
                                      {pointofservice.stateName}
                                    </p>

                                    <p>
                                      <span>City</span>
                                      {pointofservice.city}
                                    </p>

                                    <p>
                                      <span>ZIP</span>
                                      {pointofservice.zipCode}
                                    </p>
                                  </Fragment>
                                )
                              })
                              : ''}
                          </div>
                        </div>
                      </form>
                    </TabPane>
                    <TabPane tabId='2' className='TabBody'>
                      <div className='ScheduleTableHeader primaryColor'>
                        <div>
                          <span>Date</span>
                        </div>
                        <div>
                          <span>Time Slot</span>
                        </div>
                        <div>
                          <span>Visit Status</span>
                        </div>
                        <div>
                          <span>Visit Length</span>
                        </div>
                        <div></div>
                        {
                          getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID &&
                          <div>
                            <span>Service Provider</span>
                          </div>
                        }
                        <div />
                      </div>
                      {this.props.VisitServiceDetails &&
                        (this.props.VisitServiceDetails.statusId === 35 ||
                          this.props.VisitServiceDetails.statusId === 36 ||
                          this.props.VisitServiceDetails.statusId === 37 ||
                          this.props.VisitServiceDetails.statusId === 39 ||
                          this.props.VisitServiceDetails.statusId === 58 ||
                          this.props.VisitServiceDetails.statusId === 106 ||
                          this.props.VisitServiceDetails.statusId === 107) &&
                        <div className='BoardContainer noInfoBlock update-noblockinfo'>
                          <span className="SPNoInfoDesc">
                            Visit Schedule(s) will be displayed after the hiring is completed.
                          </span>
                        </div>
                      }
                      {this.state.visitServiceSchedule &&
                        this.state.visitServiceSchedule.map(ScheduleList => {
                          return (
                            <div className='ScheduleTableRow'>
                              <div>
                                <span>
                                  <Moment format='DD MMM'>
                                    {ScheduleList.visitDate}
                                  </Moment>
                                </span>
                              </div>
                              <div>
                                <span>
                                  {this.getSlotName(ScheduleList.slot)}
                                </span>
                              </div>
                              <div>
                                <span>{ScheduleList.visitStatusName}</span>
                              </div>
                              <div>
                                {ScheduleList.originalTotalDuration
                                  ? <span>
                                    {ScheduleList.originalTotalDuration.substring(0,5)} hrs
                                    </span>
                                  : <span> - </span>}
                              </div>
                              <div>
                                <div class='ScheduleRowButton'>
                                  {ScheduleList.visitStatusName ===
                                    SERVICE_VISIT_STATUS.COMPLETED
                                    ? <a
                                      className='btn btn-outline-primary'
                                      onClick={() => this.visitSummary(ScheduleList.serviceRequestVisitId)}
                                    >
                                      <i className='ProfileIconEye' />Visit Summary
                                      </a>
                                    : ''}

                                  {(!(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID) ?
                                    ((ScheduleList.visitStatusName ===
                                      SERVICE_VISIT_STATUS.SCHEDULED)
                                      ? <button
                                        className='btn btn-outline-primary start-visit-btn'
                                        onClick={() =>
                                          this.visitProcessing(
                                            ScheduleList.serviceRequestVisitId
                                          )}
                                        disabled={!isFutureDay(ScheduleList.visitDate)}
                                      >
                                        Start Visit
                                      </button>
                                      : '') : '')}

                                  {(!(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID) ?
                                    ((ScheduleList.visitStatusName ===
                                      SERVICE_VISIT_STATUS.INPROGRESS)
                                      ? <a
                                        className='btn btn-outline-primary'
                                        onClick={() =>
                                          this.visitProcessing(
                                            ScheduleList.serviceRequestVisitId
                                          )}
                                      >
                                        In Progress
                                      </a>
                                      : '') : '')}

                                  {(!(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID) ?
                                    ((ScheduleList.visitStatusName ===
                                      SERVICE_VISIT_STATUS.PAYMENTPENDING)
                                      ? <a
                                        className='btn btn-outline-primary'
                                        onClick={() =>
                                          this.visitProcessingSummary(
                                            ScheduleList.serviceRequestVisitId
                                          )}
                                      >
                                        Payment Pending
                                      </a>
                                      : '') : '')}

                                </div>
                              </div>
                              {
                                getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID &&
                                <AssignServiceProvider sp={ScheduleList} reset={this.reset} statusID={this.props.VisitServiceDetails.statusId} />
                              }
                            </div>
                          )
                        })}
                      {/* <div
                        className='sr-showmore-btn'
                        onClick={() => this.clickShowMore()}
                        disabled={this.state.disableShowMore}
                      >
                        Show more
                                      </div> */}
                      {!this.state.disableShowMore && <ul className="list-group list-group-flush sr-showmore-btn">
                        <li
                          className="list-group-item ProfileShowMore"
                          onClick={this.clickShowMore}
                        >
                          Show more <i className="ProfileIconShowMore" />
                        </li>
                      </ul>}
                    </TabPane>
                  </TabContent>
                </div>
              </section>
            </div>
          </div>
          <ModalPopup
            isOpen={this.state.isAlertModalOpen}
            toggle={this.reset}
            ModalBody={<span>{this.alertModalMsg}</span>}
            btn1='Yes'
            btn2='No'
            className='modal-sm'
            headerFooter='d-none'
            centered='centered'
            onConfirm={() => {
              this.onConfirmSerivceRequest(this.status)
              this.setState({
                isAlertModalOpen: false
              })
            }}
            onCancel={() =>
              this.setState({
                isAlertModalOpen: false
              })}
          />
          <ModalPopup
            isOpen={this.state.isAlertModalopenConfirm}
            toggle={this.reset1}
            ModalBody={<span>{this.alertModalMsgstatus}</span>}
            btn1='Yes'
            className='modal-sm'
            headerFooter='d-none'
            centered='centered'
            onConfirm={() => {
              this.onConfirmSerivceRequestMsg()

            }}
            onCancel={() =>
              this.setState({
                isAlertModalopenConfirm: false
              })}
          />
          <ModalPopup
            isOpen={this.state.phoneNumberModal}
            ModalBody={<span> {this.state.phoneNumber
              === null
              ? CONTACT_NOT_FOUND
              : `${PHONE_NUMBER_TEXT}
              ${this.state.phoneNumber}`} </span>}
            btn1='OK'
            className='modal-sm'
            headerFooter='d-none'
            footer='d-none'
            centered='centered'
            onConfirm={() =>
              this.setState({
                phoneNumberModal: false
              })}
          />
          <ModalPopup
            isOpen={this.state.conversationsModal}
            ModalBody={<span> {this.state.conversationErrMsg} </span>}
            btn1='OK'
            className='modal-sm'
            headerFooter='d-none'
            footer='d-none'
            centered='centered'
            onConfirm={() =>
              this.setState({
                conversationsModal: false
              })}
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
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
    getVisitServiceSchedule: (data, pgNumber) => dispatch(getVisitServiceSchedule(data, pgNumber)),
    visitService: () => dispatch(push(Path.visitServiceList)),
    getPerformTasksList: data => dispatch(getPerformTasksList(data, true)),
    updateServiceRequestByServiceProvider: data =>
      dispatch(updateServiceRequestByServiceProvider(data)),
    cancelServiceRequestByServiceProvider: data =>
      dispatch(cancelServiceRequestByServiceProvider(data)),
    getVisitServiceEligibilityStatus: data =>
      dispatch(getVisitServiceEligibilityStatus(data)),
    getDays: () => dispatch(getDays()),
    goBack: () => dispatch(goBack()),
    dispatchServiceRequestByServiceProvider: () => dispatchServiceRequestByServiceProvider(),
    getVisitServiceHistoryByIdDetail: (data) => dispatch(getVisitServiceHistoryByIdDetail(data)),
    createNewConversation: (data) => dispatch(onCreateNewConversation(data)),
    createVideoConference: (data) => dispatch(createVideoConference(data)),
    formDirty: () => dispatch(formDirty()),
    formDirtyFeedback: () => dispatch(formDirtyFeedback()),
    formDirtyPerformTask: () => dispatch(formDirtyPerformTask()),
    getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
    getSavedSignature: (data) => dispatch(getSavedSignature(data)),
    getServiceVisitId: (data) => dispatch(getServiceVisitId(data)),
    formDirtySummaryDetails: () => dispatch(formDirtySummaryDetails()),
    cancelInvitedServiceProvider: (data) => dispatch(cancelInvitedServiceProvider(data)),
    cancelAppliedServiceProvider: (data) => dispatch(cancelAppliedServiceProvider(data)),
    cancelHiredServiceProvider: (data) => dispatch(cancelHiredServiceProvider(data)),
    clearVisitServiceHistoryByIdDetail: () => dispatch(clearVisitServiceHistoryByIdDetail()),
    clearVisitServiceSchedule: () => dispatch(clearVisitServiceSchedule()),
    formDirtyVisitServiceDetails: () => dispatch(formDirtyVisitServiceDetails()),
    getServiceRequestId: (data) => dispatch(getServiceRequestId(data)),
    goToServiceRequestDetailsPage: () => dispatch(push(Path.visitServiceDetails)),
    getSpBusyInVisit: () => dispatch(getSpBusyInVisit()),
    setPatient: (data) => dispatch(setPatient(data)),
    goToPatientProfile: () => dispatch(push(Path.patientProfile)),
  }
}

function mapStateToProps(state) {
  return {
    VisitServiceDetails: state.visitSelectionState.VisitServiceDetailsState
      .VisitServiceDetails,
    VisitServiceSchedule: state.visitSelectionState.VisitServiceDetailsState
      .VisitServiceSchedule,
    ServiceRequestId: state.visitSelectionState.VisitServiceDetailsState
      .ServiceRequestId,
    updateServiceRequestMsgStatus: state.visitSelectionState
      .VisitServiceDetailsState.updateServiceRequestMsgStatus,
    VisitServiceElibilityStatus: state.visitSelectionState
      .VisitServiceDetailsState.VisitServiceElibilityStatus,
    daysType: state.visitSelectionState.VisitServiceDetailsState.daysType,
    initiateConversation: state.visitSelectionState.VisitServiceDetailsState
      .canInitiateConversation,
    isStandByModeOn: state.profileState.PersonalDetailState.spBusyInVisit,
    isLoading: state.visitSelectionState.VisitServiceProcessingState.SummaryState.isLoading,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails)
)
