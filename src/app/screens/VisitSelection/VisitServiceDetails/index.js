import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Moment from 'react-moment'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { Scrollbars, ModalPopup } from '../../../components'
import { push } from '../../../redux/navigation/actions'
import { Path } from '../../../routes'
import {
  getVisitServiceDetails,
  getVisitServiceSchedule,
  updateServiceRequestByServiceProvider,
  cancelServiceRequestByServiceProvider
} from '../../../redux/visitSelection/VisitServiceDetails/actions'
import {
  getPerformTasksList
} from '../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions'
import { serviceRequestMessages } from '../../../utils/messageUtility'
import { getFirstCharOfString } from '../../../utils/stringHelper'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover'
import '../../../screens/VisitSelection/VisitServiceDetails/style.css'
import { MORNING, AFTERNOON, EVENING } from '../../../constants/constants'
import { ServiceStatus } from './ServiceRequestStatus'

class VisitServiceDetails extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      verticalScroll: false,
      width: window.innerWidth,
      activeTab: '1',
      visitServiceDetails: '',
      visitServiceSchedule: '',
      isAlertModalOpen: false,
      patientId: '',
      serviceType: '',
      isOpen: false
    },
     this.alertModalMsg = '',
     this.status ={}
  }

  componentDidMount () {
    if (this.props.ServiceRequestId) {
      this.props.getVisitServiceDetails(this.props.ServiceRequestId)
      this.props.getVisitServiceSchedule(this.props.ServiceRequestId)
    } else {
      this.props.history.push(Path.visitServiceList)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      visitServiceDetails: nextProps.VisitServiceDetails,
      visitServiceSchedule: nextProps.VisitServiceSchedule,
      patientId: nextProps.VisitServiceDetails.patient &&
        nextProps.VisitServiceDetails.patientId
    })
  }

  visitService = () => {
    this.props.visitService()
  }

  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  visitProcessing = data => {
    this.props.getPerformTasksList(data)
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
      : serviceRequestMessages.notInterestedServiceProvider
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
    } else {
      let model = {
        serviceRequestId: this.state.visitServiceDetails.serviceRequestId,
        patientId: this.state.patientId,
        cancelledDescription: 'Canceled'
      }
      this.props.cancelServiceRequestByServiceProvider(model)
    }
  }

  render () {
    let sliderTypes =
      this.state.visitServiceDetails.serviceRequestTypeDetails &&
      this.state.visitServiceDetails.serviceRequestTypeDetails.map(
        (serviceTypes, index) => {
          let catNum = index + 1
          return (
            <div className='ServiceTypeList'>
              <input
                id={serviceTypes.serviceRequestTypeDetailsId}
                type='radio'
                className='ServiceTypeInput'
                name='serviceType'
                value={catNum}
                onChange={e => this.selectedServiceType(e)}
              />
              <label
                className='ServiceTypeLink'
                htmlFor={serviceTypes.serviceRequestTypeDetailsId}
              >
                <span className={'ServiceTypeIcon SPIconServices' + catNum} />
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
      this.state.visitServiceDetails.serviceRequestTypeDetails &&
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

    let AvailDays =
      this.state.visitServiceDetails.serviceRequestSlot &&
      this.state.visitServiceDetails.serviceRequestSlot.map((days, index) => {
        let Count = ''
        return (
          <div className={'SPAvailContainer ' + Count + 'Available'}>
            <div className={'SPAvailTitle'}>
              <label className='SPAvailTitleText'>{days.day}</label>
            </div>
            <div className={'SPAvailContent'}>
              <div>
                {days.slotDescription === 'Morning'
                  ? <div>
                    <label className='SPAvailItems active'>Morning</label>
                    <label className='SPAvailItems'>Afternoon</label>
                    <label className='SPAvailItems'>Evening</label>
                  </div>
                  : ''}
                {days.slotDescription === 'Afternoon'
                  ? <div>
                    <label className='SPAvailItems'>Morning</label>
                    <label className='SPAvailItems active'>Afternoon</label>
                    <label className='SPAvailItems'>Evening</label>
                  </div>
                  : ''}
                {days.slotDescription === 'Evening'
                  ? <div>
                    <label className='SPAvailItems'>Morning</label>
                    <label className='SPAvailItems'>Afternoon</label>
                    <label className='SPAvailItems active'>Evening</label>
                  </div>
                  : ''}
              </div>
            </div>
          </div>
        )
      })

    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>Service Requests</h5>
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
                  <span className='HeaderBackWrapper'>
                    <Link to='/visitServiceList' className='HeaderBackButton' />
                  </span>
                  <span className='HeaderRequestLabel'>
                    Request ID
                  </span>
                  <span className='HeaderRequestLabelID'>
                    {this.state.visitServiceDetails.serviceRequestId}
                  </span>
                </div>
                <div className='ProfileHeaderButton'>
                  <ServiceStatus
                    status={{
                      id: this.state.visitServiceDetails.statusId,
                      name: this.state.visitServiceDetails.statusName
                    }}
                    postServiceRequest={this.postServiceRequest}
                  />
                </div>
              </section>
              <section class='LeftPalette'>
                <div className='primaryColor LeftPaletteHeader'>
                  Posted By
                </div>
                <div class='LeftPostedBy'>
                  <div class='PostedByImageContainer'>
                    <img
                      className='ProfileImage'
                      src={this.state.visitServiceDetails.image}
                      alt='patientImage'
                    />
                    <div class='PostedByProfileDetails'>
                      <div class='ProfileDetailsName'>
                        {this.state.visitServiceDetails.patientFirstName}
                        {' '}
                        {this.state.visitServiceDetails.patientLastName &&
                          getFirstCharOfString(
                            this.state.visitServiceDetails.patientLastName
                          )}
                      </div>
                      <div class='ProfileDetailsDate'>
                        Posted on
                        {' '}
                        <Moment format='DD MMM'>
                          {this.state.visitServiceDetails.requestDate}
                        </Moment>
                      </div>
                    </div>
                  </div>
                  <div className='PostedByImageContainer'>
                    <i class='ProfileIcon IconCall' />
                    <div class='PostedByProfileDetails'>
                      <div class='ProfileIconDetails'>
                        Phone Call
                      </div>
                    </div>
                  </div>
                  <div className='PostedByImageContainer'>
                    <i class='ProfileIcon IconConversations' />
                    <div class='PostedByProfileDetails'>
                      <div class='ProfileIconDetails'>
                        Conversations
                      </div>
                    </div>
                  </div>
                  <div className='PostedByImageContainer'>
                    <i class='ProfileIcon IconVideo' />
                    <div class='PostedByProfileDetails'>
                      <div class='ProfileIconDetails'>
                        Video Call
                      </div>
                    </div>
                  </div>
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
                              Recurring Schedule
                            </span>
                            <span>
                              <Moment format='DD MMM YYYY'>
                                {this.state.visitServiceDetails.startDate}
                              </Moment>
                              {' '}
                              - till
                              {' '}
                              {this.state.visitServiceDetails.recurringPattern}
                              {' '}
                              occurences
                            </span>
                            <span className='ContentTitle Summary'>
                              Recurring Pattern
                            </span>
                            <span>
                              {
                                this.state.visitServiceDetails
                                  .recurringPatternDescription
                              }
                            </span>
                          </div>
                          <div className='AvailabilityWidget'>
                            <div className='SPAvailWidget Summary mb-4'>
                              {AvailDays}
                            </div>
                          </div>
                          <h2 className='ServicesTitle'>Point of Service</h2>
                          <div className='SummaryContent POS mt-3 mb-5'>
                            <p className='ContentTitle Summary'>Home</p>

                            {this.state.visitServiceDetails.patient
                              ? <span>
                                <p>
                                  <span>Street</span>
                                  {' '}
                                  {this.state.visitServiceDetails.patient
                                      .patientAddresses &&
                                      this.state.visitServiceDetails.patient
                                        .patientAddresses.streetAddress}
                                </p>
                                <p>
                                  <span>City</span>
                                  {' '}
                                  {this.state.visitServiceDetails.patient
                                      .patientAddresses &&
                                      this.state.visitServiceDetails.patient
                                        .patientAddresses.city}
                                </p>
                                <p>
                                  <span>State</span>
                                  {' '}
                                  {this.state.visitServiceDetails.patient
                                      .patientAddresses &&
                                      this.state.visitServiceDetails.patient
                                        .patientAddresses.stateName}
                                </p>
                                <p>
                                  <span>ZIP</span>
                                  {' '}
                                  {this.state.visitServiceDetails.patient
                                      .patientAddresses &&
                                      this.state.visitServiceDetails.patient
                                        .patientAddresses.zipCode}
                                </p>
                              </span>
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
                        <div />
                      </div>
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
                                    {ScheduleList.originalTotalDuration} Hrs
                                    </span>
                                  : <span> - </span>}
                              </div>
                              <div>
                                <div class='ScheduleRowButton'>
                                  {ScheduleList.visitStatusName === 'Completed'
                                    ? <a
                                      className='btn btn-outline-primary'
                                      to='/'
                                      >
                                      <i className='ProfileIconEye' />Summary
                                      </a>
                                    : ''}
                                  {ScheduleList.visitStatusName === 'Scheduled'
                                    ? <a
                                      className='btn btn-outline-primary'
                                      onClick={() =>
                                          this.visitProcessing(
                                            ScheduleList.serviceRequestVisitId
                                          )}
                                      >
                                        Start Visit
                                      </a>
                                    : ''}
                                </div>
                              </div>
                            </div>
                          )
                        })}
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
            btn1='YES'
            btn2='NO'
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
        </Scrollbars>
      </AsideScreenCover>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
    getVisitServiceSchedule: data => dispatch(getVisitServiceSchedule(data)),
    visitService: () => dispatch(push(Path.visitServiceList)),
    getPerformTasksList: data => dispatch(getPerformTasksList(data)),
    updateServiceRequestByServiceProvider: data =>
      dispatch(updateServiceRequestByServiceProvider(data)),
    cancelServiceRequestByServiceProvider: data =>
      dispatch(cancelServiceRequestByServiceProvider(data))
  }
}

function mapStateToProps (state) {
  return {
    VisitServiceDetails: state.visitSelectionState.VisitServiceDetailsState
      .VisitServiceDetails,
    VisitServiceSchedule: state.visitSelectionState.VisitServiceDetailsState
      .VisitServiceSchedule,
    ServiceRequestId: state.visitSelectionState.VisitServiceDetailsState
      .ServiceRequestId
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails)
)
