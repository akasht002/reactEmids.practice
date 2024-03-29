import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import Moment from 'react-moment';
import SignaturePad from 'react-signature-pad-wrapper'
import { Scrollbars, DashboardWizFlow, ModalPopup, ProfileModalPopup, Preloader } from '../../../../components';
import { getSummaryDetail, onUpdateTime, saveSummaryDetails, saveSignature, getSavedSignature, updateVisitProcessingUpdateBilledDuration, calculationActualData } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { getUserInfo } from '../../../../services/http';
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { Path } from '../../../../routes';
import { push, goBack } from '../../../../redux/navigation/actions';
import { checkNumber, getFields, getStatusTextBasedOnStatus } from '../../../../utils/validations';
import { formatDateSingle } from '../../../../utils/dateUtility';
import { setPatient } from '../../../../redux/patientProfile/actions';
import './style.css'
import { visitProcessingNavigationData } from "../../../../utils/arrayUtility";
import { DATE_FORMATS, ORG_SERVICE_PROVIDER_TYPE_ID } from "../../../../constants/constants";
import { isEntityUser } from "../../../../utils/userUtility";
import { setAddNewScheduledClicked } from "../../../../redux/visitSelection/VisitServiceDetails/actions"

export class Summary extends Component {

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

    handelPatientProfile = (data) => {
        this.props.setPatient(data)
        this.props.goToPatientProfile()
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    togglePopup = () => {
        this.setState({ isModalOpen: false, updatedHour: '', updatedMin: '', timeErrMessage: '', emptyErrMessage: '' })
        this.props.calculationActualData();
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
                EstimatedClaim: parseFloat(this.props.CalculationsData.estimatedClaim),
                OutOfPocketAmount: parseFloat(this.props.CalculationsData.copayAmount),
                HourlyRate: this.state.summaryDetails.hourlyRate,
                OriginalTotalDuration: originalTotalDuration,
                BilledTotalDuration: (this.props.actualTimeDiff / 1000) / 60,
                TaxPaid: parseFloat(this.props.CalculationsData.taxes),
                BilledPerService: parseFloat(this.props.CalculationsData.totalVisitCost),
                TotalCost: parseFloat(this.props.CalculationsData.totalVisitCost),
                Image: this.state.signatureImage,
                TaxRate: parseFloat(this.state.summaryDetails.taxAmount)
            }
            this.props.saveSummaryDetails(data);
            this.props.setAddNewScheduledClicked(true)
        } else {
            this.setState({ isSignatureModalOpen: true })
        }
    }

    onClickNextBtn = () => {
        this.setState({ isProccedModalOpen: true })
    }

    timerErrMessage = () => {
        let currentTime = moment(this.props.SummaryDetails.originalTotalDuration, DATE_FORMATS.hhMinSec);
        let hours = formatDateSingle(this.state.updatedHour)
        let minutes = formatDateSingle(this.state.updatedMin)
        let seconds = formatDateSingle(this.state.updatedSec)
        let newTime = hours + ':' + minutes + ':' + seconds
        let endTime = moment(newTime, DATE_FORMATS.hhMinSec);
        let time = currentTime.isSameOrAfter(endTime)
        if (!time) {
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
            this.props.goBackToFeedback();
        }
    }

    goBackToFeedback = () => {
        this.props.goBackToFeedback();
    }

    render() {

        let isIndividual = !(getUserInfo().isEntityServiceProvider || getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID);
        
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
                            maxlength={2}
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
                            max={59}
                            maxlength={2}
                        />
                    </span>
                    {/* Dont Remove */}
                    {/* <span>
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
                            max={59}
                        />
                    </span> */}
                    <span className="mt-4 d-block text-danger">{this.state.timeErrMessage}</span>
                    <span className="mt-4 d-block text-danger">{this.state.emptyErrMessage}</span>
                </p>

                <p className="AdjustTimeText">
                    Note: Maximum adjustable time is
                    {/* <span> {this.props.CalculationsData.totalHours} hr</span>
                    <span> {this.props.CalculationsData.totalMinutes} min</span>
                    <span> {this.props.CalculationsData.totalSeconds} sec</span> */}

                    <span> {this.props.SummaryDetails.originalTotalDuration.substr(0, 2)}</span>
                    <span>:</span>
                    <span>{this.props.SummaryDetails.originalTotalDuration.substr(3, 2)}</span>
                    <span> (HH:MM)</span>
                    {/* <span> {this.props.SummaryDetails.originalTotalDuration.substr(6, 2)} sec</span> */}
                </p>
            </form>
        }

        let isEntity = this.props.patientDetails.serviceProvider && this.props.patientDetails.serviceProvider.isEntityUser;
        let updatedIndicatorData = visitProcessingNavigationData(isEntity)

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                {this.props.isLoading && <Preloader />}
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='theme-primary m-0'>Visit Processing</h5>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                    className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>
                        <div className='CardContainers TitleWizardWidget'>
                            <div className='TitleContainer'>
                                <span onClick={() => this.props.goBack()} className="TitleContent backProfileIcon theme-primary-light" />
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.props.patientDetails.visitDate}</Moment>{this.props.patientDetails.slot && `,`} {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestVisitNumber}</span>
                                    </div>
                                    <div className='requestImageContent' onClick={() => this.handelPatientProfile(this.props.patientDetails && this.props.patientDetails.patient.patientId)}>

                                        {this.props.patientDetails.patient ?
                                            <span>
                                                <img
                                                    src={
                                                        this.props.patientDetails.patient && this.props.patientDetails.patient.imageString
                                                            ? this.props.patientDetails.patient.imageString
                                                            : require('../../../../assets/images/Blank_Profile_icon.png')
                                                    }
                                                    className="avatarImage avatarImageBorder" alt="patientImage" />
                                                <i className='requestName'>{this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName && this.props.patientDetails.patient.lastName}</i>
                                                {this.props.patientDetails.patient && (this.props.patientDetails.patient.deceasedInd || !this.props.patientDetails.patient.isActive) &&
                                                    <span className='visit-processing-pg-status'>{getStatusTextBasedOnStatus(this.props.patientDetails.patient)}</span>}
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
                                    <DashboardWizFlow VisitProcessingNavigationData={updatedIndicatorData} activeFlowId={2} />
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
                                            <p className="SummaryContentTitle theme-primary">Service {isIndividual && 'Visit'} Details</p>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <p className="CategoryName">
                                                        <span className="CategoryTitle">
                                                            {this.props.SummaryDetails.serviceRequestTypeVisits &&
                                                                getFields(
                                                                    this.props.SummaryDetails.serviceRequestTypeVisits,
                                                                    "serviceTypeDescription"
                                                                )}
                                                        </span>
                                                        </p>
                                                </div>
                                                <div className="col-md-4 SummaryRange">
                                                    <span className="bottomTaskName">Tasks</span>
                                                    <span className="bottomTaskRange theme-primary">
                                                        <i style={{ width: completedTaskPercent + '%' }} className="bottomTaskCompletedRange" />
                                                    </span>
                                                    <span className="bottomTaskPercentage">{completedTaskPercent}%</span>
                                                </div>
                                            </div>
                                            <p className="SummaryContentTitle theme-primary">{isIndividual ? 'Payment' : 'Visit'} Details</p>

                                            <div className="row CostTableWidget">
                                                {!this.state.signatureImage ?
                                                    <span className="EditIcon" onClick={this.AdjustTime} />
                                                    :
                                                    ''
                                                }
                                                <div className="col-md-8 CostTableContainer Label">
                                                    <p><span>Total Chargeable Time (HH:MM)</span>
                                            {!isEntity && <span>Hourly Rate</span>}</p>
                                            {!isEntity && <p className="TaxLabel"><span>Total Visit Cost </span>
                                                        <span>Taxes and Fees</span></p>}
                                                </div>
                                                <div className="col-md-4 CostTableContainer Cost">
                                                    <p>
                                                        <span>{this.props.CalculationsData.totalChargableTime}</span>
                                                        {!isEntity && <span>{this.props.SummaryDetails.hourlyRate === 0 ?
                                                            <span>$0.00</span>
                                                            :
                                                            <span>
                                                                ${this.props.SummaryDetails.hourlyRate &&
                                                                    this.props.SummaryDetails.hourlyRate.toFixed(2)}
                                                            </span>
                                                        }</span>}                                                  
                                                    </p>
                                                    {!isEntity && <p className="TaxCost"><span>${this.props.CalculationsData.totalVisitCost}</span>
                                                        <span>${(this.props.CalculationsData.taxes)}</span></p>}
                                                </div>
                                                {!isEntity && <div className="col-md-12 CostTableContainer Total">
                                                    <p className="TotalLabel"><span>Total Cost </span></p>
                                                    <p className="TotalCost"><span>${(this.props.CalculationsData.grandTotalAmount)}</span></p>
                                                </div>}
                                            </div>

                                            {(getUserInfo().isEntityServiceProvider || isEntityUser()) ?
                                                ''
                                                :
                                                <div className="row EstimatedCostWidget theme-primary">
                                                    <div className="col-md-8 EstimatedCostContainer Label">
                                                        <p><span>Estimated Claim</span>
                                                        </p>
                                                        <p><span>Credit Card Payment</span></p>
                                                    </div>
                                                    <div className="col-md-4 EstimatedCostContainer Cost">
                                                        <p>{this.props.CalculationsData.estimatedClaim === 0 ?
                                                            <span>$0.00</span>
                                                            :
                                                            <span>
                                                                ${this.props.CalculationsData.estimatedClaim &&
                                                                    this.props.CalculationsData.estimatedClaim}
                                                            </span>
                                                        }
                                                        </p>
                                                        <p><span>${this.props.CalculationsData.copayAmount && this.props.CalculationsData.copayAmount}</span></p>
                                                    </div>
                                                </div>
                                            }
                                            {!isEntity && <p className="DisclaimerText">Disclaimer - I authorize this payment recognizing that any claim is an estimate pending the claim process</p>}
                                        </div>
                                    </div>
                                    <div className="RightWidget">
                                        <div className="RightContent">
                                            <p className="SummaryContentTitle theme-primary">Customer Signature</p>
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
                                        {(getUserInfo().isEntityServiceProvider || isEntityUser()) ?
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
                        test-signModal="test-signModal"
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
                        test-proceedModal="test-proceedModal"
                    />

                    <ModalPopup
                        isOpen={this.state.isDiscardModalOpen}
                        ModalBody={<span>Do you want to discard the changes?</span>}
                        btn1='YES'
                        btn2='NO'
                        className='modal-sm'
                        headerFooter='d-none'
                        centered='centered'
                        onConfirm={() => this.goBackToFeedback()}
                        onCancel={() =>
                            this.setState({
                                isDiscardModalOpen: false
                            })}
                        test-discardModal="test-discardModal"
                    />
                </Scrollbars>
            </AsideScreenCover>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getSummaryDetail: (data) => dispatch(getSummaryDetail(data)),
        onUpdateTime: (data, visitId) => dispatch(onUpdateTime(data, visitId)),
        saveSummaryDetails: (data) => dispatch(saveSummaryDetails(data)),
        saveSignature: (data) => dispatch(saveSignature(data)),
        getSavedSignature: (data) => dispatch(getSavedSignature(data)),
        goBackToFeedback: () => dispatch(push(Path.feedback)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        calculationActualData: () => dispatch(calculationActualData()),
        updateVisitProcessingUpdateBilledDuration: (data) => dispatch(updateVisitProcessingUpdateBilledDuration(data)),
        goBack: () => dispatch(goBack()),
        setAddNewScheduledClicked: data => dispatch(setAddNewScheduledClicked(data))
    }
};

export function mapStateToProps(state) {
    return {
        isLoading: state.visitSelectionState.VisitServiceProcessingState.SummaryState.isLoading,
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