import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import SignaturePad from 'react-signature-pad-wrapper'
import { Scrollbars, DashboardWizFlow, GeneralModalPopup, ModalPopup } from '../../../../components';
import { getSummaryDetails, onUpdateTime, saveSummaryDetails } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { getFirstCharOfString } from '../../../../utils/stringHelper';
import { getUserInfo } from '../../../../services/http';
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { Path } from '../../../../routes'
import './style.css'

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isModalOpen: false,
            summaryDetails: {},
            updatedHour: '',
            updatedMin: '',
            updatedSec: '',
            originalEstimation: '',
            actualEstimation: '',
            signatureImage: '',
            completedTaskPercent: '',
            disableTimeAdjust: true,
            isAlertModalOpen: false,
            isSignatureModalOpen: false,
            isSaveBtnShown: true,
            timeErrMessage: ''
        };
    };

    componentDidMount() {
        if (this.props.ServiceRequestVisitId) {
            this.props.getSummaryDetails(this.props.patientDetails.serviceRequestVisitId);
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            summaryDetails: nextProps.SummaryDetails,
            updatedHour: nextProps.CalculationsData.totalHours,
            updatedMin: nextProps.CalculationsData.totalMinutes,
            updatedSec: nextProps.CalculationsData.totalSeconds
        })
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    AdjustTime = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    saveSignature = () => {
        const data = this.signaturePad.toDataURL();
        if (data !== '') {
            this.setState({ isSaveBtnShown: false })
            this.signaturePad.off();
        }
        this.setState({ signatureImage: data })
    }

    resetSignature = () => {
        this.signaturePad.clear();
    }

    onClickSignaturePad = () => {
        this.setState({ disableTimeAdjust: false })
    }

    onClickNext = () => {
        let time = this.state.summaryDetails.originalTotalDuration;
        let duration = time.split(':');
        let seconds = (+duration[0]) * 60 * 60 + (+duration[1]) * 60 + (+duration[2]);
        let originalTotalDuration = (seconds / 60);

        if (this.state.signatureImage) {
            this.saveSignature();
            const data = {
                serviceRequestVisitId: this.state.summaryDetails.serviceRequestVisitId,
                ServiceProviderId: this.state.summaryDetails.serviceProviderId,
                ServiceRequestId: this.state.summaryDetails.serviceRequestId,
                EstimatedClaim: this.state.summaryDetails.estimatedClaim,
                OutOfPocketAmount: this.state.summaryDetails.outOfPocketAmount,
                HourlyRate: this.state.summaryDetails.hourlyRate,
                OriginalTotalDuration: originalTotalDuration,
                BilledTotalDuration: (this.props.actualTimeDiff / 1000) / 60,
                TaxPaid: this.props.CalculationsData.taxes,
                BilledPerService: this.props.CalculationsData.totalVisitCost,
                TotalCost: this.props.CalculationsData.grandTotalAmount,
                Image: this.state.signatureImage,
            }
            this.props.saveSummaryDetails(data);
        } else {
            this.setState({ isSignatureModalOpen: true })
        }
    }

    timerErrMessage = () => {
        if (this.state.updatedHour > this.props.CalculationsData.totalHours ||
            this.state.updatedMin > this.props.CalculationsData.totalMinutes ||
            this.state.updatedSec > this.props.CalculationsData.totalSeconds) {
            this.setState({ timeErrMessage: 'Updated time cannot be greater than Maximum adjustable time.' })
        }else{
            this.updateTime();
        }
    }

    updateTime = () => {
        const data = {
            hour: parseInt(this.state.updatedHour, 0),
            min: parseInt(this.state.updatedMin, 0),
            sec: parseInt(this.state.updatedMin, 0)
        }
        this.setState({ isModalOpen: !this.state.isModalOpen })
        this.props.onUpdateTime(data)
    }

    

    render() {

        let modalContent = '';

        let completedTaskPercent = Math.round((this.props.SummaryDetails.totalTaskCompleted / this.props.SummaryDetails.totalTask) * 100);

        if (this.state.isModalOpen) {
            modalContent = <form className="AdjustTimeForm">
                <p className="AdjustTimeText">
                    Time taken to complete the service
                </p>
                <p className="AdjustTimeContent">
                    <span className="mr-3">
                        HH <input
                            type="number"
                            value={this.state.updatedHour}
                            onChange={(e) => this.setState({ updatedHour: e.target.value, timeErrMessage: '' })}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalHours}
                        />
                    </span>
                    <span className="mr-3">
                        MM <input
                            type="number"
                            value={this.state.updatedMin}
                            onChange={(e) => this.setState({ updatedMin: e.target.value, timeErrMessage: '' })}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalMinutes}
                        />
                    </span>
                    <span>
                        SS <input
                            type="number"
                            value={this.state.updatedSec}
                            onChange={(e) => this.setState({ updatedSec: e.target.value, timeErrMessage: '' })}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalSeconds}
                        />
                    </span>
                </p>
                {/* <p>{this.state.timeErrMessage}</p> */}
                <p className="AdjustTimeText">
                    Note: Maximum adjustable time is
                    <span> {this.props.CalculationsData.totalHours} hr</span>
                    <span> {this.props.CalculationsData.totalMinutes} min</span>
                    <span> {this.props.CalculationsData.totalSeconds} sec</span>
                </p>
            </form>
        }

        const SignWidth = 400;

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
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.props.patientDetails.visitDate}</Moment>, {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestId}</span>
                                    </div>
                                    <div className='requestImageContent'>

                                        {this.props.patientDetails.patient ?
                                            <span>
                                                <img
                                                    src={this.props.patientDetails.patient && this.props.patientDetails.patient.imageString}
                                                    className="avatarImage avatarImageBorder" alt="patientImage" />
                                                <i className='requestName'>{this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName && getFirstCharOfString(this.props.patientDetails.patient.lastName)}</i>
                                            </span>
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
                                    <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={2} />
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
                            <div className='ServiceContent'>
                                <div className="VisitSummaryWidget">
                                    <div className="LeftWidget">
                                        <div className="LeftContent">
                                            <p className="SummaryContentTitle">Service Visit Details</p>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <p className="CategoryName">
                                                        <span className="CategoryTitle">
                                                            {this.props.SummaryDetails.serviceRequestTypeVisits && this.props.SummaryDetails.serviceRequestTypeVisits.map((serviceType) => {
                                                                return serviceType.serviceTypeDescription + ', ';
                                                            })}
                                                        </span>
                                                        <span className="CategorySub">{this.props.SummaryDetails && this.props.SummaryDetails.serviceCategoryDescription}</span></p>
                                                </div>
                                                <div className="col-md-4 SummaryRange">
                                                    <span className="bottomTaskName">Tasks</span>
                                                    <span className="bottomTaskRange">
                                                        <i style={{ width: completedTaskPercent + '%' }} className="bottomTaskCompletedRange" />
                                                    </span>
                                                    <span className="bottomTaskPercentage">{completedTaskPercent}%</span>
                                                </div>
                                            </div>
                                            <p className="SummaryContentTitle">Payment Details</p>

                                            <div className="row CostTableWidget">
                                                {!this.state.signatureImage ?
                                                    <span className="EditIcon" onClick={this.AdjustTime} />
                                                    :
                                                    ''
                                                }

                                                <div className="col-md-8 CostTableContainer Label">
                                                    <p><span>Total Chargeable Time</span>
                                                        <span>Hourly Rate</span></p>
                                                    <p className="TaxLabel"><span>Total Visit Cost </span>
                                                        <span>Taxes and Fees</span></p>
                                                </div>
                                                <div className="col-md-4 CostTableContainer Cost">
                                                    <p><span>{this.props.CalculationsData.totalChargableTime} hrs</span>
                                                        <span>${this.props.SummaryDetails.hourlyRate && this.props.SummaryDetails.hourlyRate}/hr</span></p>
                                                    <p className="TaxCost"><span>${parseFloat(this.props.CalculationsData.totalVisitCost).toFixed(2)}</span>
                                                        <span>${parseFloat(this.props.CalculationsData.taxes).toFixed(2)}</span></p>
                                                </div>
                                                <div className="col-md-12 CostTableContainer Total">
                                                    <p className="TotalLabel"><span>Total Cost </span></p>
                                                    <p className="TotalCost"><span>${parseFloat(this.props.CalculationsData.grandTotalAmount).toFixed(2)}</span></p>
                                                </div>
                                            </div>

                                            {getUserInfo().isEntityServiceProvider ?
                                                ''
                                                :
                                                <div className="row EstimatedCostWidget">
                                                    <div className="col-md-8 EstimatedCostContainer Label">
                                                        <p><span>Estimated Claim</span>
                                                        </p>
                                                        <p><span>Copay On Credit Card</span></p>
                                                    </div>
                                                    <div className="col-md-4 EstimatedCostContainer Cost">
                                                        <p><span>${this.props.CalculationsData.estimatedClaim}</span></p>
                                                        <p><span>${this.props.CalculationsData.copayAmount}</span></p>
                                                    </div>
                                                </div>
                                            }
                                            <p className="DisclaimerText">Disclaimer - I authorize this payment recognizing that this claim is an estimate pending the claim process</p>
                                        </div>
                                    </div>
                                    <div className="RightWidget">
                                        <div className="RightContent">
                                            <p className="SummaryContentTitle">Customer Signature</p>
                                            <p>Put your signature inside the box</p>
                                            <div id="signatureWidget" className="SignatureColumn" onClick={this.onClickSignaturePad}>
                                                <SignaturePad width={SignWidth} height={320} ref={ref => this.signaturePad = ref} />
                                            </div>
                                            {this.state.isSaveBtnShown ?
                                                <div className="SignatureButtons">
                                                    <button className="btn btn-outline-primary CancelSignature" onClick={this.saveSignature}>Save</button>
                                                    <button className="btn btn-outline-primary ResetSignature" onClick={this.resetSignature}>Reset Signature</button>
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='bottomButton'>
                                    <div className='ml-auto'>
                                        <a className='btn btn-primary' onClick={this.onClickNext}>Proceed to Payment</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardBottom' />
                    <GeneralModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={modalContent}
                        modalTitle={'Adjust Time'}
                        className="modal-lg asyncModal CertificationModal"
                        centered={true}
                        label={'Update'}
                        onClick={() => {
                            this.updateTime()
                            this.setState({ isModalOpen: !this.state.isModalOpen })
                        }}
                    />

                    <ModalPopup
                        isOpen={this.state.isSignatureModalOpen}
                        ModalBody={<span>Please provide the customer signature.</span>}
                        btn1="OK"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.setState({
                            isSignatureModalOpen: !this.state.isSignatureModalOpen,
                        })}
                    />
                </Scrollbars>
            </AsideScreenCover>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
        onUpdateTime: (data) => dispatch(onUpdateTime(data)),
        saveSummaryDetails: (data) => dispatch(saveSummaryDetails(data))
    }
};

function mapStateToProps(state) {
    return {
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.SummaryState.SummaryDetails,
        CalculationsData: state.visitSelectionState.VisitServiceProcessingState.SummaryState.CalculationsData,
        actualTimeDiff: state.visitSelectionState.VisitServiceProcessingState.SummaryState.actualTimeDiff,
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        eligibilityCheck: state.visitSelectionState.VisitServiceDetailsState.VisitServiceElibilityStatus
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary));