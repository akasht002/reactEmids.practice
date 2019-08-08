import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import { AssessmentProcessingWizNavigationData } from '../../../../data/AssessmentProcessingWizNavigationData'
import { getQuestionsList, saveAnswers } from '../../../../redux/visitSelection/VisitServiceProcessing/Assessment/actions';
import { Scrollbars, DashboardWizFlow, ModalPopup, Preloader,StopWatch,Button } from '../../../../components';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { Path } from '../../../../routes'
import { push, goBack } from '../../../../redux/navigation/actions'
import {
    getVisitFeedBack
} from '../../../../redux/visitHistory/VisitServiceDetails/actions';
import { setPatient } from '../../../../redux/patientProfile/actions';
import { getPerformTasksList, getSummaryDetails,startOrStopService } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import './style.css'
import { isNull } from '../../../../utils/validations'
import { getUserInfo } from '../../../../services/http'
import { QUESTION_TYPE,SERVICE_STATES } from '../../../../constants/constants'
import { convertTime24to12 } from '../../../../utils/stringHelper';
export class Assessment extends Component {

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
            isSubmitButtonClicked: false,
            startService: true,
            startedTime: '',
            stopTime: false,
            isStopModalOpen: false,
            stopTimer: false
        };
        this.normalizedSelectedAnswers = {}
        this.selectedAnswers = [];
        this.percentageCompletion = 0;
        this.checkedTask = '';
        this.totalTask = 0;
        this.selectedTextArea ='';
        this.assessmentQuestionnaireId = '';
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        if (this.props.ServiceRequestVisitId) {
            this.props.getPerformTasksList(this.props.ServiceRequestVisitId, true,true);
            this.props.getQuestionsList(this.props.ServiceRequestVisitId);
            this.props.getVisitFeedBack(this.props.ServiceRequestVisitId)
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    componentWillReceiveProps(nextProps) { 
        if (this.props.questionsList !== nextProps.questionsList) {
            nextProps.questionsList.map((questionList,index) => {                
                if (questionList.answerTypeDescription === QUESTION_TYPE.ChoiceBased) {
                    questionList.answers.map((answer) => {                                                               
                        if (questionList.selectedAnswer === answer.answerName) {
                            let answers = { feedbackQuestionnaireId: questionList.assessmentQuestionnaireId, answerName: questionList.selectedAnswer }
                            let filteredData = this.selectedAnswers.filter((answer) => {
                                return answer.feedbackQuestionnaireId !== questionList.assessmentQuestionnaireId
                            });
                            filteredData.push(answers);
                            this.selectedAnswers = filteredData;
                            this.checkedTask ++
                        } 
                        return ''   
                    })                    
                }
                if (questionList.answerTypeDescription === QUESTION_TYPE.OpenText) {
                    questionList.answers.map((answer) => {                                                               
                        if (!isNull(questionList.selectedAnswer)) {
                            this.checkedTask ++
                            this.selectedTextArea = questionList.selectedAnswer;
                            this.assessmentQuestionnaireId = questionList.assessmentQuestionnaireId
                        } 
                    }) 
                    return ''                   
                }
                return ''
            } ) 
        }
        this.handleTextarea({target:{value:this.selectedTextArea}}, this.assessmentQuestionnaireId)
    }

    handelPatientProfile = (data) => {
        this.props.setPatient(data)
        this.props.goToPatientProfile()
    }    

    handleSelected = (answer, id) => {
        this.checkedTask = 0
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
        this.checkedTask = this.selectedAnswers.length
        this.setState({ answerList: filteredData });
    }

    handleTextarea = (e, id) => {
        this.handleSelected({
            feedbackQuestionnaireId: id,
            answerName: e.target.value
        })
        this.setState({
            textareaValue: e.target.value,
            textareaData: {
                feedbackQuestionnaireId: id,
                answerName: e.target.value
            }
        });
    }

    onClickNext = () => {
        if (this.state.textareaData) {
            this.selectedAnswers.push(this.state.textareaData);
        }
        if (this.props.questionsList.length === this.selectedAnswers.length) {
            this.onSubmit();
        } else {
            this.setState({ isModalOpen: true})
        }
    }

    onClickSkip = () => {
        this.setState({ isModalOpen: true })
    }

    onClickConfirm = () => {
        this.onSubmit()
    }

    onSubmit = () => {
        let data = {
            assessmentId: this.props.patientDetails.serviceRequestVisitId,
            serviceProviderId: getUserInfo().serviceProviderId,
            answers: this.selectedAnswers
        }
        this.props.saveAnswers(data);
        this.setState({ isModalOpen: false })
    }
   
    startService = (data, visitId) => {
        let startServiceAction = 1;
        let current_time;
        if (data === startServiceAction) {
            current_time = new moment().format("HH:mm");
            this.setState({ startedTime: current_time, disabled: false, disableCheckbox: false, backDisabled: true })
        } else {
            current_time = this.state.startedTime;
            this.setState({ stopTime: true, startService: true })
        }
        this.setState({ startService: !this.state.startService, disabled: false, backDisabled: true, stopTimer: !this.state.stopTimer })
        this.props.startOrStopService(data, visitId, convertTime24to12(current_time));
    }

    render() {
        
        let startService = 1;
        let time = <span className="TimerContent running">HH<i>:</i>MM<i>:</i>SS</span>
        let timerBtn;
        const { visitStatus, visitStartTime, visitEndTime, visitTimeDuration } = this.props.patientDetails
        if (visitStatus === SERVICE_STATES.IN_PROGRESS || visitStatus === SERVICE_STATES.COMPLETED || visitStatus === SERVICE_STATES.PAYMENT_PENDING) {
            time = <StopWatch
                stopTimer={visitStatus === SERVICE_STATES.COMPLETED || visitStatus === SERVICE_STATES.PAYMENT_PENDING}
                startTime={visitStartTime}
                endTime={visitEndTime}
                duration={visitTimeDuration}
            />
        }

        if (visitStatus === SERVICE_STATES.YET_TO_START) {
            timerBtn = <a className="btn btn-primary" onClick={() => { this.startService(startService, this.props.ServiceRequestVisitId) }}>Start Service</a>
        }

        if (visitStatus === SERVICE_STATES.IN_PROGRESS) {
            timerBtn = <a className="btn btn-primary" onClick={() => { this.setState({ isStopModalOpen: true }) }}>Stop Service</a>
        }
        this.totalTask = this.props.questionsList && this.props.questionsList.length
        this.percentageCompletion = Math.round((this.checkedTask / this.totalTask) * 100)
        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                {(this.state.isLoading || this.props.eligibilityIsLoading) && <Preloader />}
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Visit Processing</h5>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                    className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>
                        <div className='CardContainers TitleWizardWidget'>
                            <div className='TitleContainer'>
                                <span onClick={() => this.props.goBack()} className="TitleContent backProfileIcon" />
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
                                    <DashboardWizFlow VisitProcessingNavigationData={AssessmentProcessingWizNavigationData} activeFlowId={1} />
                                </div>
                                <div className="col col-md-4 rightTimerWidget">
                                    <div className="row rightTimerContainer">
                                        <div className="col-md-7 rightTimerContent FeedbackTimer">
                                            <span className="TimerContent">{ time }</span>
                                        </div>
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">{ timerBtn }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers'>
                            <div className='ServiceContent'>
                                <div className="FeedbackWidget mt-5">
                                    {this.props.questionsList && this.props.questionsList.length > 0 ?
                                        <div>
                                            {this.props.questionsList && this.props.questionsList.map((questionList, i) => {
                                                let showError = this.state.isSubmitButtonClicked && isNull(this.normalizedSelectedAnswers[questionList.assessmentQuestionnaireId])
                                                if (questionList.answerTypeDescription === QUESTION_TYPE.ChoiceBased) {
                                                    return (
                                                        <div key={questionList.assessmentQuestionnaireId} className="FeedbackQuestionWidget">
                                                            <p className={showError ? 'alertedQuestionnaire' : 'FeedbackQuestion'}>
                                                                {i + 1}. {questionList.question}
                                                            </p>
                                                            <div className='FeedbackAnswerWidget'>
                                                                {questionList.answers.map((answer) => {                                                               
                                                                        
                                                                            if (questionList.selectedAnswer === answer.answerName) {
                                                                                answer.checked = true;
                                                                            }
                                                                                                                                               
                                                                    return (
                                                                        <div className="form-radio col-md-3" key={answer.id}>
                                                                            <input className="form-radio-input"
                                                                                id={answer.id}
                                                                                type="radio"
                                                                                value={answer.answerName}
                                                                                name={questionList.assessmentQuestionnaireId}
                                                                                onChange={(e) => {
                                                                                    answer.checked = e.target.checked;
                                                                                    this.handleSelected(answer.answerName, questionList.assessmentQuestionnaireId)
                                                                                }}
                                                                                defaultChecked= {answer.checked}
                                                                                // disabled={this.props.VisitFeedback.length > 0}
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

                                                if (questionList.answerTypeDescription === QUESTION_TYPE.OpenText) {
                                                    return (
                                                        <div className="FeedbackQuestionWidget" key={questionList.assessmentQuestionnaireId}>
                                                            <p className="FeedbackQuestion">{i + 1}. {questionList.question}</p>
                                                            <div className='FeedbackAnswerWidget'>
                                                                {questionList.answers.map((answer, i) => {
                                                                    return (
                                                                        <div key={answer.id} className="feedbackForm">
                                                                            <textarea
                                                                                id={answer.id}
                                                                                rows={4}
                                                                                className='form-control'
                                                                                value={this.state.textareaValue }
                                                                                onChange={(e) => this.handleTextarea(e, questionList.assessmentQuestionnaireId)}
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
                                    <div className='col-md-5 d-flex mr-auto bottomTaskbar'>
                                        <span className="bottomTaskName">Tasks</span>
                                        <span className="bottomTaskRange">
                                            <i style={{ width: this.percentageCompletion + '%' }} className="bottomTaskCompletedRange" />
                                        </span>
                                        <span className="bottomTaskPercentage">{this.percentageCompletion && this.percentageCompletion}%</span>
                                    </div>
                                    <div className='ml-auto'>
                                    <Button
                                    classname='btn btn-primary ml-auto'
                                    onClick={this.onClickNext}
                                    disable={visitStatus === SERVICE_STATES.IN_PROGRESS || visitStatus === SERVICE_STATES.YET_TO_START}
                                    label={'Next'} />
                                     </div>
                                </div>
                            </div>
                        </div>
                        
                            
                       
                    </div>
                    <div className='cardBottom' />
                    <ModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={<span>Your Assessment is still incomplete. Are you sure you want to continue?</span>}
                        btn1="Confirm"
                        btn2="Cancel"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.onClickConfirm()}
                        onCancel={() => this.setState({
                            isModalOpen: !this.state.isModalOpen,
                        })}
                    />
                    <ModalPopup
                        isOpen={this.state.isStopModalOpen}
                        ModalBody={<span>Do you want to End the Service?</span>}
                        btn1="Yes"
                        btn2="No"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => { this.setState({ isStopModalOpen: !this.state.isStopModalOpen }); this.startService(0, this.props.ServiceRequestVisitId) }}
                        onCancel={() => this.setState({
                            isStopModalOpen: !this.state.isStopModalOpen,
                        })}
                    />
                    
                </Scrollbars>
            </AsideScreenCover>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPerformTasksList: (data) => dispatch(getPerformTasksList(data, true,true)),
        getQuestionsList: (data) => dispatch(getQuestionsList(data)),
        saveAnswers: (data) => dispatch(saveAnswers(data)),
        getVisitFeedBack: (data) => dispatch(getVisitFeedBack(data)),
        goToSummary: () => dispatch(push(Path.summary)),
        goBackToPerformTask: () => dispatch(push(Path.performTasks)),
        getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        goBack: () => dispatch(goBack()),
        startOrStopService: (data, visitId, startedTime) => dispatch(startOrStopService(data, visitId, startedTime)),
    }
};

function mapStateToProps(state) {
    return {
        questionsList: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.questionsList,
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        VisitFeedback: state.visitHistoryState.vistServiceHistoryState.VisitFeedback,
        isLoading: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.isLoading,
        eligibilityIsLoading: state.visitSelectionState.VisitServiceProcessingState.SummaryState.isLoading,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Assessment));