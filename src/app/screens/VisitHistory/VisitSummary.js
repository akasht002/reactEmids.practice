import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Scrollbars } from '../../components'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'
import { Path } from '../../routes'
import { push } from '../../redux/navigation/actions';
import {
  getVisitServiceHistoryByIdDetail, getVisitFeedBack
} from '../../redux/visitHistory/VisitServiceDetails/actions'
import './VisitSummary.css'
import 'react-accessible-accordion/dist/fancy-example.css'
import Summary from './Summary'
import { setPatient } from '../../redux/patientProfile/actions';
import {paymentPathValid } from '../../redux/visitSelection/VisitServiceProcessing/Payments/actions';

import './visitProcessing.css'
import { getFullName } from '../../utils/stringHelper';

export class VisitSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      modal: false
    }
    this.FeedbackModal = () => {
      this.setState({
        modal: !this.state.modal
      })
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentWillMount() {
    this.props.ServiceRequestId
      ? this.props.getVisitServiceHistoryByIdDetail(this.props.ServiceRequestId)
      : this.props.history.push(Path.visitHistory)
  }

  handelBack = () => {
    if (this.props.isPaymentPathValid) {
      this.props.paymentPathValid(false)
      this.props.goToDetailsPage()
    } else {
      this.props.history.goBack()
    }
  }

  onSubmitFeedback = () => {
    this.props.getVisitFeedBack(this.props.Visits.VisitServiceDetails.serviceRequestVisitId)
  }

  handelPatientProfile = (data) => {
    this.props.setPatient(data)
    this.props.goToPatientProfile()
  }

  render() {
    let visitSummary = this.props.Visits.VisitServiceDetails
    let profileData;
    let defaultImage = require('../../assets/images/Blank_Profile_icon.png');
    if(this.props.isServiceProviderFeedbackTab) {
      profileData = {
        image: visitSummary.patient && visitSummary.patient.imageString ?
        visitSummary.patient.imageString : defaultImage,
        fullName: visitSummary.patient && getFullName(visitSummary.patient.firstName, visitSummary.patient.lastName) 
      }
    }
    else {
       profileData = {
       image: visitSummary.serviceProvider && visitSummary.serviceProvider.image ?
       visitSummary.serviceProvider.image : defaultImage,
       fullName: visitSummary.serviceProvider && getFullName(visitSummary.serviceProvider.firstName, visitSummary.serviceProvider.lastName) 
      }
    }

    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>
              View Request
            </h5>
          </div>
        </div>
        <Scrollbars
          speed={2}
          smoothScrolling
          horizontal={false}
          className='ProfileContentWidget'
        >
          <div className='card mainProfileCard'>
            <div className='CardContainers TitleWizardWidget'>
              <div className='TitleContainer'>
                <a
                  className='TitleContent backProfileIcon'
                  onClick={this.handelBack}
                />

                <div className='requestContent'>
                  <div className='requestNameContent'>
                    <span>
                      <i className='requestName'><Moment format="ddd, DD MMM">{visitSummary.visitDate}</Moment>, {visitSummary.slotDescription}</i>{visitSummary.serviceRequestVisitNumber}</span>
                  </div>
                  <div className='requestImageContent' onClick={() => this.handelPatientProfile(visitSummary.patient && visitSummary.patient.patientId)}>
                    <span className='IndividualName'>
                      <img
                        alt={'NO_IMAGE'}
                        src={profileData.image}
                        className='avatarImage avatarImageBorder'
                      />
                      <i className='requestName'>
                        {profileData.fullName}
                      </i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='CardContainers'>
              <Summary
                SummaryDetails={visitSummary}
                FeedbackModal={this.FeedbackModal}
                onSubmitFeedback={this.onSubmitFeedback}
              />
            </div>
          </div>
          <div className='cardBottom' />
        </Scrollbars>
      </AsideScreenCover>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    getVisitFeedBack: data => dispatch(getVisitFeedBack(data)),
    setPatient: (data) => dispatch(setPatient(data)),
    goToPatientProfile: () => dispatch(push(Path.patientProfile)),
    goToDetailsPage: () => dispatch(push(Path.visitServiceDetails)),
    paymentPathValid: (data) => dispatch(paymentPathValid(data))
  }
}

function mapStateToProps(state) {
  return {
    Visits: state.visitHistoryState.vistServiceHistoryState,
    ServiceRequestId: state.visitHistoryState.vistServiceHistoryState
      .ServiceRequestId,
    isPaymentPathValid: state.visitSelectionState.VisitServiceProcessingState.PaymentsState.isPaymentPathValid,
    isServiceProviderFeedbackTab: state.dashboardState.VisitServiceProviderState.isServiceProviderFeedbackTab
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitSummary)
)
