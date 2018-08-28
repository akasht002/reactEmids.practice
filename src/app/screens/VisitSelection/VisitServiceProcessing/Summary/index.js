import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import SignaturePad from 'react-signature-pad-wrapper'
import { Scrollbars, DashboardWizFlow, GeneralModalPopup } from '../../../../components';
import { getSummaryDetails, onUpdateTime, saveSummaryDetails } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { getFirstCharOfString } from '../../../../utils/stringHelper'
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
            originalEstimation: '',
            actualEstimation: '',
            signatureImage: '',
            completedTaskPercent: ''
        };
    };

    componentDidMount() {
        this.props.getSummaryDetails(this.props.patientDetails.serviceRequestVisitId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            summaryDetails: nextProps.SummaryDetails,
            updatedHour: nextProps.CalculationsData.totalHours,
            updatedMin: nextProps.CalculationsData.totalMinutes,
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
        console.log(data)
        this.setState({ signatureImage: data })
    }

    onClickNext = () => {
        this.saveSignature();
        const data = {
            serviceRequestVisitId: this.state.summaryDetails.serviceRequestVisitId,
            ServiceProviderId: this.state.summaryDetails.serviceProviderId,
            ServiceRequestId: this.state.summaryDetails.serviceRequestId,
            EstimatedClaim: this.state.summaryDetails.estimatedClaim,
            OutOfPocketAmount: this.state.summaryDetails.outOfPocketAmount,
            HourlyRate: this.state.summaryDetails.hourlyRate,
            OriginalTotalDuration: parseInt(this.state.summaryDetails.originalTotalDuration),
            BilledTotalDuration: (this.props.actualTimeDiff / 1000) / 60,
            TaxPaid: this.props.CalculationsData.taxes,
            BilledPerService: this.props.CalculationsData.totalVisitCost,
            TotalCost: this.props.CalculationsData.grandTotalAmount,
            Image: this.state.signatureImage
        }
        this.props.saveSummaryDetails(data);
    }

    updateTime = () => {
        const data = {
            hour: parseInt(this.state.updatedHour),
            min: parseInt(this.state.updatedMin)
        }
        this.props.onUpdateTime(data)
    }

    render() {

        let modalContent = '';
        let completedTaskPercent = (this.props.SummaryDetails.totalTaskCompleted / this.props.SummaryDetails.totalTask) * 100;

        if (this.state.isModalOpen) {
            modalContent = <form className="AdjustTimeForm">
                <p className="AdjustTimeText">
                    Time taken to complete the service
                </p>
                <p className="AdjustTimeContent">
                    HH <input
                        type="number"
                        value={this.state.updatedHour}
                        onChange={(e) => this.setState({ updatedHour: e.target.value })}
                        style={{ width: 10 + '%' }}
                        min={0}
                    />
                    MM <input
                        type="number"
                        value={this.state.updatedMin}
                        onChange={(e) => this.setState({ updatedMin: e.target.value })}
                        style={{ width: 10 + '%' }}
                        min={0}
                    />
                </p>
            </form>
        }

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
                                <a className="TitleContent backProfileIcon" />
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'>Sun, 24 Aug, Morning</i>1</span>
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
                                <div className="col col-md-9 WizardContent">
                                    <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={2} />
                                </div>
                                <div className="col col-md-3 rightTimerWidget running">
                                    <div className="row rightTimerContainer">
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerContent running">01<i>:</i>45</span>
                                        </div>
                                        <div className="col-md-7 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">Started at 12:30 pm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers ServiceCategoryWidget'>
                            <form className='ServiceContent'>
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

                                            <div className="row EstimatedCostWidget">
                                                <div className="col-md-8 EstimatedCostContainer Label">
                                                    <p><span>Estimated Claim</span>
                                                        <span>Out of Pocket Amount</span></p>
                                                </div>
                                                <div className="col-md-4 EstimatedCostContainer Cost">
                                                    <p><span>${this.props.SummaryDetails.estimatedClaim && this.props.SummaryDetails.estimatedClaim}</span>
                                                        <span>${this.props.SummaryDetails.outOfPocketAmount && this.props.SummaryDetails.outOfPocketAmount}</span></p>
                                                </div>
                                            </div>
                                            <p className="DisclaimerText">Disclaimer - I authorize this payment recognizing that this claim is an estimate pending the claim process</p>
                                        </div>
                                    </div>
                                    <div className="RightWidget">
                                        <div className="RightContent">
                                            <p className="SummaryContentTitle">Customer Signature</p>
                                            <p>Put your signature inside the box</p>
                                            <div className="SignatureColumn">
                                                <SignaturePad width={420} height={320} ref={ref => this.signaturePad = ref} />
                                            </div>
                                            {/* <button onClick={this.saveSignature}>log signature</button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='bottomButton'>
                                    <div className='ml-auto'>
                                        <Link className='btn btn-outline-primary mr-3' to='/VisitProcessing'>Previous</Link>
                                        <a className='btn btn-primary' onClick={this.onClickNext}>Proceed to Payment</a>
                                    </div>
                                </div>
                            </form>
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
                            this.updateTime(),
                                this.setState({
                                    isModalOpen: !this.state.isModalOpen,
                                })
                        }}
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
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary));