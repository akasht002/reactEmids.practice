import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'react-moment';
import { VisitProcessingNavigationData } from '../../../../../data/VisitProcessingWizNavigationData'
import { getFirstCharOfString } from '../../../../../utils/stringHelper'
import { Scrollbars, DashboardWizFlow } from '../../../../../components';
import { AsideScreenCover } from '../../../../ScreenCover/AsideScreenCover';
import { getUTCFormatedDate } from "../../../../../utils/dateUtility";
import { push } from '../../../../../redux/navigation/actions'
import { Path } from '../../../../../routes'
import {updateServiceRequestId} from '../../../../../redux/visitSelection/VisitServiceProcessing/Payments/actions';

import '../style.css'

class PaymentSuccess extends Component {

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
                                    <div className='requestImageContent'>
                                        {this.props.patientDetails.patient ?
                                            <span>
                                                <img
                                                    src={this.props.patientDetails.patient && this.props.patientDetails.patient.imageString}
                                                    className="avatarImage avatarImageBorder" alt="patientImage" />
                                                <i className='requestName'>{this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName && getFirstCharOfString(this.props.patientDetails.patient.lastName)}</i></span>
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
                                    <div className="VisitPaymentSuccessMsg">
                                        <img alt="success_image" src={require('../../../../../assets/images/SuccessTickGreen.png')} />
                                        <p>Your payment is successful</p>
                                    </div>
                                </div>

                                <div className='bottomButton'>
                                    <div className='ml-auto'>
                                        <Link className='btn btn-primary' to='/visitservicedetails'>Done</Link>
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
        updateServiceRequestId: (data) => dispatch(updateServiceRequestId(data))
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess));