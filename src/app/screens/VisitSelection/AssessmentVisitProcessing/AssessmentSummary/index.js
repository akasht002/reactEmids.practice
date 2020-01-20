import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import Moment from 'react-moment';
import SignaturePad from 'react-signature-pad-wrapper'
import { Scrollbars, DashboardWizFlow, ModalPopup, ProfileModalPopup, Preloader } from '../../../../components';
import { getSummaryDetail, onUpdateTime, saveSummaryDetails, saveSignature, getSavedSignature, updateVisitProcessingUpdateBilledDuration, calculationActualData } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { AssessmentProcessingWizNavigationData } from '../../../../data/AssessmentProcessingWizNavigationData';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { getUserInfo } from '../../../../services/http';
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { Path } from '../../../../routes';
import { push, goBack } from '../../../../redux/navigation/actions';
import { checkNumber,divideIfNotZero,nullCheckArray } from '../../../../utils/validations';
import { formatDateSingle,getSecondsFromTime } from '../../../../utils/dateUtility';
import { setPatient } from '../../../../redux/patientProfile/actions';
import './style.css'
import { DATE_FORMATS,ERROR_MSG } from '../../../../constants/constants'
import { VISIT_SUMMARY } from '../../../../redux/constants/constants'
import { isEntityUser } from "../../../../utils/userUtility";
import { setAddNewScheduledClicked } from "../../../../redux/visitSelection/VisitServiceDetails/actions"

export class AssessmentSummary extends Component {

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
            isProceedModalOpen: false,
            isDiscardModalOpen: false
        };
    };

    componentDidMount() {
        if (this.props.ServiceRequestVisitId) {
            this.props.getSummaryDetail(this.props.ServiceRequestVisitId);
            this.props.getSavedSignature(this.props.ServiceRequestVisitId);
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    componentWillReceiveProps(nextProps) {      
        let durations =nextProps.SummaryDetails.originalTotalDuration &&  nextProps.SummaryDetails.originalTotalDuration.split(":")  
        this.setState({
            signatureImage: nextProps.signatureImage.signature && nextProps.signatureImage.signature,
            summaryDetails: nextProps.SummaryDetails,
            updatedHour:  nullCheckArray(durations,0),
            updatedMin:  nullCheckArray(durations,1),
            updatedSec:  nullCheckArray(durations,2)
        })
    }

    handlePatientProfile = (data) => {
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

    adjustTime = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    signaturePad = () => {
        this.setState({ isSaveBtnShown: false })
        this.signaturePad.off();
    }

    saveSignature = () => {
        const data = this.signaturePad.toDataURL();
        if (data !== '') {
            this.setState({ isSaveBtnShown: false })
            this.signaturePad.off();
        }
        let signatureData = {
            "patientId": this.state.summaryDetails.patient.patientId,
            "serviceRequestVisitId": this.state.summaryDetails.servicePlanVisitId,
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
        let duration = getSecondsFromTime(time);
        let seconds = (+duration[0]) * 60 * 60 + (+duration[1]) * 60 + (+duration[2]);
        let originalTotalDuration = (seconds / 60);

        if (this.state.signatureImage || this.props.signatureImage) {
            const data = {
                serviceRequestVisitId: this.state.summaryDetails.servicePlanVisitId,
                serviceProviderId: this.state.summaryDetails.serviceProviderId,
                serviceRequestId: this.state.summaryDetails.serviceRequestId,
                hourlyRate: this.state.summaryDetails.hourlyRate,
                originalTotalDuration: originalTotalDuration,
                billedTotalDuration: (this.props.actualTimeDiff / 1000) / 60,
                image: this.state.signatureImage,
            }
            this.props.saveSummaryDetails(data);
            this.props.setAddNewScheduledClicked(true)
        } else {
            this.setState({ isSignatureModalOpen: true })
        }
    }

    onClickNextBtn = () => {
        this.setState({ isProceedModalOpen: true })
    }

    timerErrMessage = () => {
        var currentTime = moment(this.props.SummaryDetails.originalTotalDuration, DATE_FORMATS.hhMinSec);
        let hours = formatDateSingle(this.state.updatedHour)
        let minutes = formatDateSingle(this.state.updatedMin)
        let seconds = formatDateSingle(this.state.updatedSec)
        let newTime = hours + ':' + minutes + ':' + seconds
        var endTime = moment(newTime, DATE_FORMATS.hhMinSec);
        if (this.state.updatedHour === '' || this.state.updatedMin === '' || this.state.updatedMin === '') {
            this.setState({ emptyErrMessage: ERROR_MSG.emptyErrMessage })
        }else if(currentTime.isBefore(endTime) || this.state.updatedMin > 59 || this.state.updatedSec > 59) {
            this.setState({ timeErrMessage: ERROR_MSG.timeErrMessage })
        } else{
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


    onChangeFormData = (e) => {
        checkNumber(e.target.value) && this.setState({ [e.target.name]: e.target.value, timeErrMessage: '', emptyErrMessage: '' })
    }

    

    getAdjustTimeModalContent = (hour,minutes) =>{
            return (
                <form className="AdjustTimeForm">
                <p className="AdjustTimeText">
                    Time taken to complete the service
                </p>
                <p className="AdjustTimeContent">
                    <span className="mr-3">
                        HH <input
                            type="text"
                            value={checkNumber(this.state.updatedHour) ? this.state.updatedHour : ''}
                            name = {"updatedHour"}
                            onChange = {this.onChangeFormData}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={this.props.CalculationsData.totalHours || 24}
                            maxLength={2}
                        />
                    </span>
                    <span className="mr-3">
                        MM <input
                            type="text"
                            value={checkNumber(this.state.updatedMin) ? this.state.updatedMin : ''}
                            name = {"updatedMin"}
                            onChange = {this.onChangeFormData}
                            style={{ width: 10 + '%' }}
                            min={0}
                            max={59}
                            maxLength={2}
                        />
                    </span>                    
                    <span className="mt-4 d-block text-danger">{this.state.timeErrMessage}</span>
                    <span className="mt-4 d-block text-danger">{this.state.emptyErrMessage}</span>
                </p>

                <p className="AdjustTimeText">
                    Note: Maximum adjustable time is                  

                    <span> {hour}</span>
                    <span>:</span>
                    <span>{minutes}</span>
                    <span> (HH:MM)</span>
                </p>
            </form>
            )
    }

    render() {
        let modalContent = '';

        let validationContent = '';

        if (this.state.disableSignatureBtn) {
            validationContent = <span>Please provide the customer signature.</span>
        } else {
            validationContent = <span>Please save the customer signature.</span>
        }

        let completedTaskPercent =divideIfNotZero(this.props.SummaryDetails.totalTaskCompleted,this.props.SummaryDetails.totalTask) 

        let hour = this.props.SummaryDetails.originalTotalDuration && this.props.SummaryDetails.originalTotalDuration.substr(0, 2);
        let minutes = this.props.SummaryDetails.originalTotalDuration && this.props.SummaryDetails.originalTotalDuration.substr(3, 2);

        if (this.state.isModalOpen) {
            modalContent = this.getAdjustTimeModalContent(hour,minutes)
        }


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
                                <span onClick={() => this.props.goBack()} test-goBack='test-goBack' className="TitleContent backProfileIcon theme-primary-light" />
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.props.patientDetails.visitDate}</Moment>, {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestVisitNumber}</span>
                                    </div>
                                    <div className='requestImageContent' onClick={() => this.handlePatientProfile(this.props.patientDetails && this.props.patientDetails.patient.patientId)}>

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
                                    <DashboardWizFlow VisitProcessingNavigationData={AssessmentProcessingWizNavigationData} activeFlowId={2} />
                                </div>
                                <div className="col col-md-4 rightTimerWidget running">
                                    <div className="row rightTimerContainer">
                                        <div className="col-md-7 rightTimerContent FeedbackTimer">
                                            <span className="TimerContent running">{this.props.SummaryDetails.originalTotalDuration}</span>
                                        </div>
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">Started at {getUTCFormatedDate(this.props.SummaryDetails.visitStartTime, DATE_FORMATS.hhMinSession)}</span>
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
                                            <p className="SummaryContentTitle theme-primary">Service Details</p>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <p className="CategoryName">
                                                        <span className="CategoryTitle">
                                                            Assessment
                                                        </span>
                                                        <span className="CategorySub">{this.props.SummaryDetails && this.props.SummaryDetails.serviceCategoryDescription}</span>
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
                                            <p className="SummaryContentTitle theme-primary">Visit Details</p>                                         

                                           
                                           <div className="row CostTableWidget">
                                                {this.props.SummaryDetails.visitStatusId !== VISIT_SUMMARY  ?
                                                    <span className="EditIcon" onClick={this.adjustTime} />
                                                    :
                                                    ''
                                                } 
                                                <div className="col-md-8 CostTableContainer Label">
                                                    <p>
                                                        <span>Total Chargeable Time (HH:MM)</span>
                                                    </p>
                                                </div>
                                                <div className="col-md-4 CostTableContainer Cost">
                                                    <p>
                                                        <span>{this.props.SummaryDetails.originalTotalDuration}</span>                                                       
                                                    </p>
                                                </div>
                                            </div>
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
                                            { this.state.isSaveBtnShown && (this.props.signatureImage.signature === 'data:image/jpeg;base64,' || this.props.signatureImage.signature === '' || this.props.signatureImage.signature === null) ?
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
                                {this.props.SummaryDetails.visitStatusId !== VISIT_SUMMARY  ? 
                                <div className='bottomButton'>
                                    <div className='ml-auto'>
                                        <a className='btn btn-outline-primary mr-3' onClick={this.onPreviousClick}>Previous</a>
                                        {(getUserInfo().isEntityServiceProvider || isEntityUser()) &&
                                            <a className='btn btn-primary' onClick={this.onClickNext}>Done</a>                                           
                                        }
                                    </div> 
                                </div> : '' }
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
                        test-alertPopup='test-alertPopup'
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.setState({
                            isSignatureModalOpen: !this.state.isSignatureModalOpen,
                        })}
                    />

                    <ModalPopup
                        isOpen={this.state.isProceedModalOpen}
                        ModalBody={<span>Do you want to proceed for payment?</span>}
                        btn1="Yes"
                        btn2="No"
                        test-paymentPopup='test-paymentPopup'
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => {
                            this.setState({ isProceedModalOpen: !this.state.isProceedModalOpen });
                            this.onClickNext();
                        }}
                        onCancel={() => this.setState({ isProceedModalOpen: false })}
                    />

                    <ModalPopup
                        isOpen={this.state.isDiscardModalOpen}
                        ModalBody={<span>Do you want to discard the changes?</span>}
                        btn1='Yes'
                        btn2='No'
                        test-discardPopup='test-discardPopup'
                        className='modal-sm'
                        headerFooter='d-none'
                        centered='centered'
                        onConfirm={() => this.goBackToFeedback()}
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

export function mapDispatchToProps(dispatch) {
    return {
        getSummaryDetail: (data) => dispatch(getSummaryDetail(data)),
        onUpdateTime: (data, visitId) => dispatch(onUpdateTime(data, visitId)),
        saveSummaryDetails: (data) => dispatch(saveSummaryDetails(data)),
        saveSignature: (data) => dispatch(saveSignature(data)),
        getSavedSignature: (data) => dispatch(getSavedSignature(data)),
        goBackToFeedback: () => dispatch(push(Path.assessmentFeedback)),
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
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.planDetails,
        requestDetails: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.requestDetails,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        eligibilityCheck: state.visitSelectionState.VisitServiceDetailsState.VisitServiceElibilityStatus,
        signatureImage: state.visitSelectionState.VisitServiceProcessingState.SummaryState.signature,
        taskPercentage: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.taskPercentage,
    };
};

AssessmentSummary.propTypes = {
    isLoading: PropTypes.bool,
    SummaryDetails: PropTypes.object,
    CalculationsData: PropTypes.object,
    actualTimeDiff: PropTypes.any.isRequired,
    patientDetails: PropTypes.object,
    requestDetails: PropTypes.object,
    startedTime: PropTypes.any.isRequired,
    ServiceRequestVisitId: PropTypes.any.isRequired,
    eligibilityCheck: PropTypes.any.isRequired,
    signatureImage: PropTypes.any.isRequired,
    taskPercentage: PropTypes.any.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssessmentSummary));