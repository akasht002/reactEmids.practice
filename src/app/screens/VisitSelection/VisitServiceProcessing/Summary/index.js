import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import SignaturePad from 'react-signature-pad-wrapper'
import { Scrollbars, DashboardWizFlow, ModalPopup, ProfileModalPopup } from '../../../../components';
import { getSummaryDetail, onUpdateTime, saveSummaryDetails, saveSignature, getSavedSignature, updateVisitProcessingUpdateBilledDuration } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { getFirstCharOfString } from '../../../../utils/stringHelper';
import { getUserInfo } from '../../../../services/http';
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { Path } from '../../../../routes';
import { push } from '../../../../redux/navigation/actions';
import { checkNumber } from '../../../../utils/validations';
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
            timeErrMessage: '',
            emptyErrMessage: '',
            disableSignatureBtn: true,
            isProccedModalOpen: false,
            isDiscardModalOpen: false
        };
    };

    componentDidMount() {
        if (this.props.ServiceRequestVisitId) {
            this.props.getSummaryDetail(this.props.patientDetails.serviceRequestVisitId);
            this.props.getSavedSignature(this.props.patientDetails.serviceRequestVisitId);
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signatureImage.signature) {

            this.setState({ signatureImage: nextProps.signatureImage.signature })

        }
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

    togglePopup = () => {
        this.setState({ isModalOpen: false })
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
        let signatureData = {
            "patientId": this.state.summaryDetails.patient.patientId,
            "serviceRequestVisitId": this.state.summaryDetails.serviceRequestVisitId,
            "serviceRequestId": this.state.summaryDetails.serviceRequestId,
            "rating": 0,
            "signature": data,
            "signatureArray": ""
        }
        this.props.saveSignature(signatureData)
        this.setState({ signatureImage: data })
    }

    resetSignature = () => {
        this.signaturePad.clear();
        this.setState({ disableSignatureBtn: true })
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
            const data = {
                serviceRequestVisitId: this.state.summaryDetails.serviceRequestVisitId,
                ServiceProviderId: this.state.summaryDetails.serviceProviderId,
                ServiceRequestId: this.state.summaryDetails.serviceRequestId,
                EstimatedClaim: this.props.CalculationsData.estimatedClaim,
                OutOfPocketAmount: this.props.CalculationsData.copayAmount,
                HourlyRate: this.state.summaryDetails.hourlyRate,
                OriginalTotalDuration: originalTotalDuration,
                BilledTotalDuration: (this.props.actualTimeDiff / 1000) / 60,
                TaxPaid: this.props.CalculationsData.taxes,
                BilledPerService: this.props.CalculationsData.totalVisitCost,
                TotalCost: this.props.CalculationsData.totalVisitCost,
                Image: this.state.signatureImage,
                TaxRate: this.state.summaryDetails.taxAmount
            }
            this.props.saveSummaryDetails(data);
        } else {
            this.setState({ isSignatureModalOpen: true })
        }
    }

    onClickNextBtn = () => {
        this.setState({ isProccedModalOpen: true })
    }

    timerErrMessage = () => {        
        var currentTime = moment(this.props.SummaryDetails.originalTotalDuration, "HH:mm:ss");       
        let hours = this.state.updatedHour > 9  ? "" + this.state.updatedHour: "0" + this.state.updatedHour;
        let minutes = this.state.updatedMin > 9 ? "" + this.state.updatedMin: "0" + this.state.updatedMin;
        let seconds = this.state.updatedSec > 9 ? "" + this.state.updatedSec: "0" + this.state.updatedSec;
        let newTime = hours +':'+ minutes+':'+seconds
        var endTime = moment(newTime, "HH:mm:ss");
        
        // if (this.state.updatedHour > this.props.CalculationsData.totalHours ||
        //     (this.state.updatedHour === this.props.CalculationsData.totalHours && this.state.updatedMin > this.props.CalculationsData.totalMinutes) ||
        //     (this.state.updatedHour === this.props.CalculationsData.totalHours && this.state.updatedMin === this.props.CalculationsData.totalMinutes && this.state.updatedSec > this.props.CalculationsData.totalSeconds)) {
        //     this.setState({ timeErrMessage: 'Updated time cannot be greater than Maximum adjustable time.' })
        // } else if (this.state.updatedHour === '' || this.state.updatedMin === '' || this.state.updatedMin === '') {
        //     this.setState({ emptyErrMessage: 'Time field(s) cannot be empty.' })
        // } else {
        //     this.updateTime();
        // }

        if (currentTime.isBefore(endTime)) {
            this.setState({ timeErrMessage: 'Updated time cannot be greater than Maximum adjustable time.' })
        } else if (this.state.updatedHour === '' || this.state.updatedMin === '' || this.state.updatedMin === '') {
            this.setState({ emptyErrMessage: 'Time field(s) cannot be empty.' })
        } else {
            this.updateTime();
        }
    }

    onPreviousClick = () => {
        this.setState({ isDiscardModalOpen: true })
    }

    updateTime = () => {
        const data = {
            hour: parseInt(this.state.updatedHour, 0),
            min: parseInt(this.state.updatedMin, 0),
            sec: parseInt(this.state.updatedSec, 0)
        }
        this.setState({ isModalOpen: false })
        this.props.onUpdateTime(data, this.state.summaryDetails.serviceRequestVisitId)
    }

    onMouseUp = () => {
        this.setState({ disableSignatureBtn: false })
    }

    onPreviousClick = () => {
        if (!this.state.disableSignatureBtn && this.state.isSaveBtnShown) {
            this.setState({ isDiscardModalOpen: true })
        } else {
            this.props.goBack();
        }
    }

    goBack = () => {
        this.props.goBack();
    }

    render() {

        let modalContent = '';

        let validationContent = '';

        if (this.state.disableSignatureBtn) {
            validationContent = <span>Please provide the customer signature.</span>
        } else {
            validationContent = <span>Please save the customer signature.</span>
        }

        let completedTaskPercent = Math.round((this.props.SummaryDetails.totalTaskCompleted / this.props.SummaryDetails.totalTask) * 100);

        if (this.state.isModalOpen) {
            modalContent = <form className="AdjustTimeForm">
                <p className="AdjustTimeText">
                    Time taken to complete the service
                </p>
                <p className="AdjustTimeContent">
                    <span className="mr-3">
                        HH <input
                            type="text"
                            value={checkNumber(this.state.updatedHour) ? this.state.updatedHour : ''}
                            onChange={(e) => {
                                if (checkNumber(e.target.value)) {
                                    this.setState({ updatedHour: e.target.value, timeErrMessage: '', emptyErrMessage: '' })
                                }
                            }}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalHours}
                        />
                    </span>
                    <span className="mr-3">
                        MM <input
                            type="text"
                            value={checkNumber(this.state.updatedMin) ? this.state.updatedMin : ''}
                            onChange={(e) => {
                                if (checkNumber(e.target.value)) {
                                    this.setState({ updatedMin: e.target.value, timeErrMessage: '', emptyErrMessage: '' })
                                }
                            }}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalMinutes}
                        />
                    </span>
                    <span>
                        SS <input
                            type="text"
                            value={checkNumber(this.state.updatedSec) ? this.state.updatedSec : ''}
                            onChange={(e) => {
                                if (checkNumber(e.target.value)) {
                                    this.setState({ updatedSec: e.target.value, timeErrMessage: '', emptyErrMessage: '' })
                                }
                            }}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalSeconds}
                        />
                    </span>
                    <span className="mt-4 d-block text-danger">{this.state.timeErrMessage}</span>
                    <span className="mt-4 d-block text-danger">{this.state.emptyErrMessage}</span>
                </p>

                <p className="AdjustTimeText">
                    Note: Maximum adjustable time is
                    {/* <span> {this.props.CalculationsData.totalHours} hr</span>
                    <span> {this.props.CalculationsData.totalMinutes} min</span>
                    <span> {this.props.CalculationsData.totalSeconds} sec</span> */}

                    <span> {this.props.SummaryDetails.originalTotalDuration.substr(0, 2)} hr</span>
                    <span> {this.props.SummaryDetails.originalTotalDuration.substr(3, 2)} min</span>
                    <span> {this.props.SummaryDetails.originalTotalDuration.substr(6, 2)} sec</span>
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
                                                        <p><span>Credit Card Payment</span></p>
                                                    </div>
                                                    <div className="col-md-4 EstimatedCostContainer Cost">
                                                        <p><span>${this.props.CalculationsData.estimatedClaim}</span></p>
                                                        <p><span>${this.props.CalculationsData.copayAmount && this.props.CalculationsData.copayAmount.toFixed(2)}</span></p>
                                                    </div>
                                                </div>
                                            }
                                            <p className="DisclaimerText">Disclaimer - I authorize this payment recognizing that any claim is an estimate pending the claim process</p>
                                        </div>
                                    </div>
                                    <div className="RightWidget">
                                        <div className="RightContent">
                                            <p className="SummaryContentTitle">Customer Signature</p>
                                            <p>Put your signature inside the box</p>
                                            <div id="signatureWidget" className={"SignatureColumn"} onMouseUp={this.onMouseUp} onClick={this.onClickSignaturePad}>
                                                {this.props.signatureImage && this.props.signatureImage.signature ?
                                                    <img className="sign-pad" alt="sign" src={this.props.signatureImage.signature} /> :
                                                    <SignaturePad ref={ref => this.signaturePad = ref} />
                                                }
                                            </div>
                                            {this.state.isSaveBtnShown && (this.state.signatureImage === 'data:image/jpeg;base64,' || this.state.signatureImage === '') ?
                                                <div className="SignatureButtons">
                                                    <button className="btn btn-outline-primary CancelSignature" disabled={this.state.disableSignatureBtn} onClick={this.saveSignature}>Save</button>
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
                                        <a className='btn btn-outline-primary mr-3' onClick={this.onPreviousClick}>Previous</a>
                                        {getUserInfo().isEntityServiceProvider ?
                                            <a className='btn btn-primary' onClick={this.onClickNext}>Done</a>
                                            :
                                            <a className='btn btn-primary' onClick={this.onClickNextBtn}>Proceed to Payment</a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardBottom' />
                    <ProfileModalPopup
                        isOpen={this.state.isModalOpen}
                        toggle={this.togglePopup}
                        ModalBody={modalContent}
                        className="modal-lg asyncModal ModalPadding0"
                        modalTitle={'Adjust Time'}
                        centered="true"
                        onClick={this.timerErrMessage}
                        onDiscard={this.togglePopup}
                        buttonLabel={'Update'}
                        discardBtn={true}
                    />

                    <ModalPopup
                        isOpen={this.state.isSignatureModalOpen}
                        ModalBody={validationContent}
                        btn1="OK"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.setState({
                            isSignatureModalOpen: !this.state.isSignatureModalOpen,
                        })}
                    />

                    <ModalPopup
                        isOpen={this.state.isProccedModalOpen}
                        ModalBody={<span>Do you want to proceed for payment?</span>}
                        btn1="Yes"
                        btn2="No"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => {
                            this.setState({ isProccedModalOpen: !this.state.isProccedModalOpen });
                            this.onClickNext();
                        }}
                        onCancel={() => this.setState({ isProccedModalOpen: false })}
                    />

                    <ModalPopup
                        isOpen={this.state.isDiscardModalOpen}
                        ModalBody={<span>Do you want to discard the changes?</span>}
                        btn1='YES'
                        btn2='NO'
                        className='modal-sm'
                        headerFooter='d-none'
                        centered='centered'
                        onConfirm={() => this.goBack()}
                        onCancel={() =>
                            this.setState({
                                isDiscardModalOpen: false
                            })}
                    />
                </Scrollbars>
            </AsideScreenCover>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSummaryDetail: (data) => dispatch(getSummaryDetail(data)),
        onUpdateTime: (data, visitId) => dispatch(onUpdateTime(data, visitId)),
        saveSummaryDetails: (data) => dispatch(saveSummaryDetails(data)),
        saveSignature: (data) => dispatch(saveSignature(data)),
        getSavedSignature: (data) => dispatch(getSavedSignature(data)),
        goBack: () => dispatch(push(Path.feedback)),
        updateVisitProcessingUpdateBilledDuration: (data) => dispatch(updateVisitProcessingUpdateBilledDuration(data))
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
        eligibilityCheck: state.visitSelectionState.VisitServiceDetailsState.VisitServiceElibilityStatus,
        signatureImage: state.visitSelectionState.VisitServiceProcessingState.SummaryState.signature,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary));