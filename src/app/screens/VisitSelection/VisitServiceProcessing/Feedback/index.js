import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { getQuestionsList, saveAnswers } from '../../../../redux/visitSelection/VisitServiceProcessing/Feedback/actions';
import { Scrollbars, DashboardWizFlow, ModalPopup, Preloader } from '../../../../components';
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { Path } from '../../../../routes'
import { push, goBack } from '../../../../redux/navigation/actions'
import {
    getVisitFeedBack
} from '../../../../redux/visitHistory/VisitServiceDetails/actions';
import { setPatient } from '../../../../redux/patientProfile/actions';
import { getSummaryDetails, getSavedSignature } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import './style.css'
import { isNull, getStatusTextBasedOnStatus } from '../../../../utils/validations'
import { getUserInfo, isEntityUser } from "../../../../utils/userUtility";
import { visitProcessingNavigationData } from "../../../../utils/arrayUtility";

export class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isModalOpen: false,
            answerList: '',
            textareaValue: '',
            textareaData: '',
            isDiscardModalOpen: false,
            isLoading: false,
            isAlertModalOpen: false,
            isSubmitButtonClicked: false
        };
        this.normalizedSelectedAnswers = {}
        this.selectedAnswers = [];
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        if (this.props.ServiceRequestVisitId) {
            this.props.getQuestionsList();
            this.props.getVisitFeedBack(this.props.ServiceRequestVisitId)
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading
        })
    }

    handelPatientProfile = (data) => {
        this.props.setPatient(data)
        this.props.goToPatientProfile()
    }

    handleSelected = (answer, id) => {
        let answers = { feedbackQuestionnaireId: id, answerName: answer }
        let filteredData = this.selectedAnswers.filter((answer) => {
            return answer.feedbackQuestionnaireId !== id
        });
        filteredData.push(answers);
        this.selectedAnswers = filteredData;
        this.normalizedSelectedAnswers = {
            ...this.normalizedSelectedAnswers,
            [id]: id
        }
        this.setState({ answerList: filteredData });
    }

    handleTextarea = (e, id) => {
        this.setState({
            textareaValue: e.target.value,
            textareaData: {
                feedbackQuestionnaireId: id,
                answerName: this.state.textareaValue
            }
        });
    }

    onClickNext = () => {
        if (this.state.textareaData) {
            this.selectedAnswers.push(this.state.textareaData);
        }
        if (this.props.QuestionsList.length === this.selectedAnswers.length || this.props.VisitFeedback.length > 0) {
            this.onSubmit();
        } else {
            this.setState({ isAlertModalOpen: true, isSubmitButtonClicked: true })
        }
    }

    onClickSkip = () => {
        this.setState({ isModalOpen: true })
    }

    onClickConfirm = () => {
        this.selectedAnswers = [];
        this.props.getSummaryDetails(this.props.patientDetails.serviceRequestVisitId);
    }

    onSubmit = () => {
        let data = {
            serviceRequestVisitId: this.props.patientDetails.serviceRequestVisitId,
            serviceRequestId: this.props.patientDetails.serviceRequestId,
            serviceProviderId: this.props.patientDetails.serviceProviderId,
            answers: this.selectedAnswers
        }
        this.props.saveAnswers(data);
        this.setState({ isModalOpen: false })
    }

    onPreviousClick = () => {
        if (this.selectedAnswers.length > 0) {
            this.setState({ isDiscardModalOpen: true })
        } else {
            this.selectedAnswers = []
            this.props.goBackToPerformTask();
        }
    }

    goBackToPerformTask = () => {
        this.selectedAnswers = []
        this.props.goBackToPerformTask();
        this.props.getQuestionsList();
        this.props.getVisitFeedBack(this.props.ServiceRequestVisitId)
    }

    render() {
        let isEntity = (getUserInfo().isEntityServiceProvider || isEntityUser());
        let updatedIndicatorData = visitProcessingNavigationData(isEntity)

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                {/* {this.state.isLoading && <Preloader />} */}
                {(this.state.isLoading || this.props.eligibilityIsLoading) && <Preloader />}
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='theme-primary m-0'>Service Requests</h5>
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
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.props.patientDetails.visitDate}</Moment>, {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestVisitNumber}</span>
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
                                                {this.props.patientDetails.patient && this.props.patientDetails.patient.deceasedInd &&
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
                                    <DashboardWizFlow VisitProcessingNavigationData={updatedIndicatorData} activeFlowId={1} />
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
                            <form className='ServiceContent'>
                                <div className="FeedbackWidget mt-5">
                                    {this.props.QuestionsList.length > 0 ?
                                        <div>
                                            {this.props.QuestionsList && this.props.QuestionsList.map((questionList, i) => {
                                                let showError = this.state.isSubmitButtonClicked && isNull(this.normalizedSelectedAnswers[questionList.feedbackQuestionnaireId])
                                                if (questionList.answerTypeDescription === 'ChoiceBased') {
                                                    return (
                                                        <div key={questionList.feedbackQuestionnaireId} className="FeedbackQuestionWidget">
                                                            <p className={showError ? 'alertedQuestionnaire' : 'FeedbackQuestion'}>
                                                                {i + 1}. {questionList.question}
                                                            </p>
                                                            <div className='FeedbackAnswerWidget'>
                                                                {questionList.answers.map((answer) => {
                                                                    this.props.VisitFeedback.map((feedback) => {
                                                                        if (feedback.feedbackQuestionnaireId === questionList.feedbackQuestionnaireId) {
                                                                            if (feedback.selectedAnswer === answer.answerName) {
                                                                                answer.checked = true;
                                                                            }
                                                                        }
                                                                        return '';
                                                                    });
                                                                    return (
                                                                        <div className="form-radio col-md-3" key={answer.id}>
                                                                            <input className="form-radio-input"
                                                                                id={answer.id}
                                                                                test-input="test-input"
                                                                                type="radio"
                                                                                value={answer.answerName}
                                                                                name={questionList.feedbackQuestionnaireId}
                                                                                onChange={(e) => {
                                                                                    this.handleSelected(answer.answerName, questionList.feedbackQuestionnaireId)
                                                                                }}
                                                                                checked={answer.checked}
                                                                                disabled={this.props.VisitFeedback.length > 0 ? true : false}
                                                                            />
                                                                            <label className="form-radio-label" htmlFor={answer.id}>
                                                                                <span className="RadioBoxIcon" /> {answer.answerName}</label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                if (questionList.answerTypeDescription === 'OpenText') {
                                                    return (
                                                        <div className="FeedbackQuestionWidget" key={questionList.feedbackQuestionnaireId}>
                                                            <p className="FeedbackQuestion">{i + 1}. {questionList.question}</p>
                                                            <div className='FeedbackAnswerWidget'>
                                                                {questionList.answers.map((answer, i) => {
                                                                    return (
                                                                        <div key={answer.id} className="feedbackForm">
                                                                            <textarea
                                                                                id={answer.id}
                                                                                rows={4}
                                                                                className='form-control'
                                                                                value={this.state.textareaValue}
                                                                                onChange={(e) => this.handleTextarea(e, questionList.feedbackQuestionnaireId)}
                                                                                maxLength={1000}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return questionList
                                            })
                                            }
                                        </div>
                                        :
                                        ''
                                    }

                                </div>
                                <div className='bottomButton'>
                                {this.props.VisitFeedback.length > 0 ?
                                    ''
                                :
                                    <div className='mr-auto'>
                                         <a className='btn btn-outline-primary' onClick={this.onClickSkip}>Skip</a>
                                    </div>
                                }
                                    <div className='ml-auto'>
                                        <a className='btn btn-outline-primary mr-3' onClick={this.onPreviousClick}>Previous</a>
                                        <a className='btn btn-primary' onClick={this.onClickNext}>Next</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='cardBottom' />
                    <ModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={<span>Your feedback is still incomplete. Are you sure you want to continue?</span>}
                        btn1="Confirm"
                        btn2="Cancel"
                        test-feedback="test-feedback"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.onClickConfirm()}
                        onCancel={() => this.setState({
                            isModalOpen: !this.state.isModalOpen,
                        })}
                    />
                    <ModalPopup
                        isOpen={this.state.isDiscardModalOpen}
                        toggle={this.toggleCheck}
                        ModalBody={<span>Do you want to discard the changes?</span>}
                        btn1='YES'
                        btn2='NO'
                        test-discard="test-discard"
                        className='modal-sm'
                        headerFooter='d-none'
                        centered='centered'
                        onConfirm={() => this.goBackToPerformTask()}
                        onCancel={() =>
                            this.setState({
                                isDiscardModalOpen: false
                            })}
                    />
                </Scrollbars>
            </AsideScreenCover>

        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getQuestionsList: () => dispatch(getQuestionsList()),
        saveAnswers: (data) => dispatch(saveAnswers(data)),
        getVisitFeedBack: (data) => dispatch(getVisitFeedBack(data)),
        goToSummary: () => dispatch(push(Path.summary)),
        goBackToPerformTask: () => dispatch(push(Path.performTasks)),
        getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
        getSavedSignature: (data) => dispatch(getSavedSignature(data)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        goBack: () => dispatch(goBack())
    }
};

export function mapStateToProps(state) {
    return {
        QuestionsList: state.visitSelectionState.VisitServiceProcessingState.FeedbackState.QuestionsList,
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        VisitFeedback: state.visitHistoryState.vistServiceHistoryState.VisitFeedback,
        isLoading: state.visitSelectionState.VisitServiceProcessingState.FeedbackState.isLoading,
        eligibilityIsLoading: state.visitSelectionState.VisitServiceProcessingState.SummaryState.isLoading,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));