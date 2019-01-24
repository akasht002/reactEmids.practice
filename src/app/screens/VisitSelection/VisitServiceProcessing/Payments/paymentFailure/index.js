import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import { VisitProcessingNavigationData } from '../../../../../data/VisitProcessingWizNavigationData'
import { Scrollbars, DashboardWizFlow } from '../../../../../components';
import { AsideScreenCover } from '../../../../ScreenCover/AsideScreenCover';
import { getUTCFormatedDate } from "../../../../../utils/dateUtility";
import { push } from '../../../../../redux/navigation/actions'
import { Path } from '../../../../../routes';
import { setPatient } from '../../../../../redux/patientProfile/actions';
import {updateServiceRequestId} from '../../../../../redux/visitSelection/VisitServiceProcessing/Payments/actions';

import '../style.css'

class PaymentFailure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SelectedCard: '1',
            selectedCard: ''
        };
    };

    componentDidMount() {
        if (!this.props.ServiceRequestVisitId) {
            this.props.goVisitServiceList()
        }
    }

    componentWillUnmount() {
        this.props.updateServiceRequestId(null)
    }

    toggleCardSelection = (e) => {
        this.setState({
            SelectedCard: e.target.value
        })
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    handelPatientProfile = (data) => {
        this.props.setPatient(data)
        this.props.goToPatientProfile()
    }


    render() {

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Service Requests <span>/ {this.props.patientDetails.serviceRequestId}</span></h5>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                    className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>

                        <div className='CardContainers TitleWizardWidget'>
                            <div className='TitleContainer'>
                                <Link to="/visitServiceDetails" className="TitleContent backProfileIcon" />
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.props.patientDetails.visitDate}</Moment>, {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestVisitId}</span>
                                    </div>
                                    <div className='requestImageContent' onClick={() => this.handelPatientProfile(this.props.patientDetails && this.props.patientDetails.patient.patientId)}>
                                        {this.props.patientDetails.patient ?
                                            <span>
                                                <img
                                                    src={this.props.patientDetails.patient && this.props.patientDetails.patient.imageString}
                                                    className="avatarImage avatarImageBorder" alt="patientImage" />
                                                <i className='requestName'>{this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName && this.props.patientDetails.patient.lastName}</i></span>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers WizardWidget'>
                            <div className="row">
                                <div className="col col-md-8 WizardContent">
                                    <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={3} />
                                </div>
                                <div className="col col-md-4 rightTimerWidget running">
                                    <div className="row rightTimerContainer">
                                        <div className="col-md-7 rightTimerContent FeedbackTimer">
                                            <span className="TimerContent running">{this.props.SummaryDetails.originalTotalDuration}</span>
                                        </div>
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">Started at {getUTCFormatedDate(this.props.SummaryDetails.visitStartTime, "hh:mm a")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='CardContainers'>
                            <form className='VisitPaymentContainer'>
                                <div className="VisitPaymentSuccess">
                                    <div className="VisitPaymentFailureMsg">
                                        <img alt="failure_image" src={require('../../../../../assets/images/remove_icon.svg')} />
                                        <p className="mb-4">Your payment is Unsuccessful</p>
                                        <Link className='btn btn-outline-primary' to='/payments'>Retry Payment</Link>
                                    </div>
                                </div>
                            </form>
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
        goVisitServiceList: () => dispatch(push(Path.visitServiceList)),
        updateServiceRequestId: (data) => dispatch(updateServiceRequestId(data)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile))
    }
};

function mapStateToProps(state) {
    return {
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
        CardList: state.visitSelectionState.VisitServiceProcessingState.PaymentsState.CardList,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PaymentsState.serviceRequestId
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFailure));