import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import { AssessmentProcessingWizNavigationData } from '../../../../data/AssessmentProcessingWizNavigationData'
import { getQuestionsList, saveAnswers,startOrStopService,getServicePlanVisitSummaryDetails,
    saveTaskPercentage,getQuestionsListSuccess } from '../../../../redux/visitSelection/VisitServiceProcessing/Assessment/actions';
import { Scrollbars, DashboardWizFlow, ModalPopup, Preloader,StopWatch} from '../../../../components';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { Path } from '../../../../routes'
import { push, goBack } from '../../../../redux/navigation/actions'
import {
    getVisitFeedBack
} from '../../../../redux/visitHistory/VisitServiceDetails/actions';
import { setPatient } from '../../../../redux/patientProfile/actions';
import { getPerformTasksList, getSummaryDetails } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import './style.css'
import { isNull,checkEmpty,divideIfNotZero } from '../../../../utils/validations'
import { getUserInfo } from '../../../../services/http'
import { QUESTION_TYPE,SERVICE_STATES,DATE_FORMATS } from '../../../../constants/constants'
import { convertTime24to12,getFullName } from '../../../../utils/stringHelper';
import { Footer } from './Components/Footer'
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
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
        this.checkedTask = 0;
        this.totalTask = 0;
        this.selectedTextArea ='';
        this.assessmentQuestionnaireId = '';
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        if (this.props.ServiceRequestVisitId && this.props.patientDetails) {
            this.props.getQuestionsList(this.props.ServiceRequestVisitId)
            this.props.getServicePlanVisitSummaryDetails(this.props.ServiceRequestVisitId)
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
                        } 
                        return ''   
                    })                    
                }
                else if (questionList.answerTypeDescription === QUESTION_TYPE.OpenText) {
                    questionList.answers.map((answer) => {                                                               
                        if (!isNull(questionList.selectedAnswer)) {
                            this.selectedTextArea = questionList.selectedAnswer;
                            this.assessmentQuestionnaireId = questionList.assessmentQuestionnaireId
                        } 
                    }) 
                    this.handleTextarea({target:{value:this.selectedTextArea}}, this.assessmentQuestionnaireId) 
                    return ''                   
                }
                return ''
            } ) 
        }               
        
    }

    handelPatientProfile = (data) => {
        this.props.setPatient(data)
        this.props.goToPatientProfile()
    }    

    handleSelected = (answer, id) => {
        let taskList = []
        let answers = { feedbackQuestionnaireId: id, answerName: answer,id }
        let filteredData = this.selectedAnswers.filter((answer) => {
            return answer.feedbackQuestionnaireId !== id
        });
        filteredData.push(answers);
        this.selectedAnswers = filteredData;
        this.normalizedSelectedAnswers = {
            ...this.normalizedSelectedAnswers,
            [id]: id
        }
        taskList = this.selectedAnswers.filter((answer) => {
            return answer.feedbackQuestionnaireId !== undefined
        });
        this.checkedTask = taskList.length;
        this.setState({answerList:this.selectedAnswers})
    }

    handleTextarea = (e, id) => {
        this.handleSelected(e.target.value,id)
        this.checkedTask =  e.target.value === '' ? this.checkedTask : this.selectedAnswers.length;
        this.setState({
            textareaValue: e.target.value,
            textareaData: {
                feedbackQuestionnaireId: id,
                answerName: e.target.value,
                id:id
            }
        });
    }

    onClickNext = () => {
        let selectedLength = this.selectedAnswers.filter((answer) => {
            return !checkEmpty(answer.feedbackQuestionnaireId)
        }).length;
        if (this.props.questionsList.length === selectedLength) {
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
            assessmentId: this.props.patientDetails.serviceRequestVisitId === 0 ? this.props.patientDetails.servicePlanVisitId : this.props.patientDetails.serviceRequestVisitId,
            serviceProviderId: getUserInfo().serviceProviderId,
            answers: this.selectedAnswers.filter((answer) => {
                return !checkEmpty(answer.feedbackQuestionnaireId)
            })
        }
        this.props.saveAnswers(data);
        this.props.saveTaskPercentage(this.percentageCompletion);
        this.setState({ isModalOpen: false })
    }
   
    startService = (data, visitId) => {
        let startServiceAction = 1;
        let current_time;
        if (data === startServiceAction) {
            current_time = new moment().format("HH:mm");
            this.setState({ startedTime: current_time, 
                            disabled: false, 
                            disableCheckbox: false, 
                            backDisabled: true,
                            startService: !this.state.startService,
                            stopTimer: !this.state.stopTimer
                         })
        } else {
            current_time = this.state.startedTime;
            this.setState({ stopTime: true, 
                            startService: true,
                            disabled: false,
                            backDisabled: true,
                            stopTimer: !this.state.stopTimer 
                        })
        }        
        this.props.startOrStopService(this.props.patientDetails, data, convertTime24to12(current_time));
    }

    render() {
        let startService = 1;
        let serviceRequestVisitId = this.props.patientDetails.serviceRequestVisitId === 0 ? this.props.patientDetails.servicePlanVisitId : this.props.patientDetails.serviceRequestVisitId
        let time = <span className="TimerContent running">HH<i>:</i>MM<i>:</i>SS</span>
        let timerBtn;        
        const { visitStatus, visitStartTime, visitEndTime, visitTimeDuration } = this.props.requestDetails
        if (visitStatus === SERVICE_STATES.IN_PROGRESS || visitStatus === SERVICE_STATES.COMPLETED || visitStatus === SERVICE_STATES.PAYMENT_PENDING) {
            time = <StopWatch
                stopTimer={visitStatus === SERVICE_STATES.COMPLETED || visitStatus === SERVICE_STATES.PAYMENT_PENDING}
                startTime={visitStartTime}
                endTime={visitEndTime}
                duration={visitTimeDuration}
            />
        }

        if (visitStatus === SERVICE_STATES.YET_TO_START) {
            timerBtn = <a className="btn btn-primary" onClick={() => { this.startService(startService, serviceRequestVisitId) }}>Start Service</a>
        }

        if (visitStatus === SERVICE_STATES.IN_PROGRESS) {
            timerBtn = <a className="btn btn-primary" onClick={() => { this.setState({ isStopModalOpen: true }) }}>Stop Service</a>
        }
        this.checkedTask = this.selectedAnswers.filter((answer) => {
            return !checkEmpty(answer.feedbackQuestionnaireId)
        }).length;
        this.totalTask = this.props.questionsList && this.props.questionsList.length
        this.percentageCompletion = divideIfNotZero(this.checkedTask,this.totalTask)
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
                                        <span>
                                            <i className='requestName'>
                                                <Moment format={DATE_FORMATS.visitFormat}>{this.props.patientDetails.visitDate}</Moment>, 
                                                {this.props.patientDetails.slotDescription}
                                            </i>
                                            {this.props.patientDetails.serviceRequestVisitNumber}
                                        </span>
                                    </div>
                                    <div className='requestImageContent' onClick={() => this.handelPatientProfile(this.props.patientDetails && this.props.patientDetails.patientId)}>
                                        {this.props.patientDetails ?
                                            <span>
                                                <img
                                                     src={
                                                        this.props.patientDetails && this.props.patientDetails.patientImage
                                                            ? this.props.patientDetails.patientImage
                                                            : require('../../../../assets/images/Blank_Profile_icon.png')
                                                    }
                                                    className="avatarImage avatarImageBorder" alt="patientImage" />
                                                <i className='requestName'>{this.props.patientDetails.patientFirstName && getFullName(this.props.patientDetails.patientFirstName,this.props.patientDetails.patientLastName)} </i></span>
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
                                    <DashboardWizFlow VisitProcessingNavigationData={AssessmentProcessingWizNavigationData} activeFlowId={0} />
                                </div>
                                <div className="col col-md-4 rightTimerWidget">
                                    <div className="row rightTimerContainer">
                                        <div className="col-md-7 rightTimerContent FeedbackTimer">
                                            <span className="TimerContent">{ time }</span>
                                        </div>
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">{ timerBtn }</span>
                                        </div>
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">Started at {getUTCFormatedDate(this.props.requestDetails.startedTime, "hh:mm a")}</span>
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
                                                                                disabled={this.props.requestDetails.visitStatusId === 43}
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
                                                                                disabled={this.props.requestDetails.visitStatusId === 43}
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
                                <Footer
                                percentageCompletion = {this.percentageCompletion}
                                onClickNext={this.onClickNext}
                                visitStatus={visitStatus}
                                />
                                
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
        getServicePlanVisitSummaryDetails:(data) => dispatch(getServicePlanVisitSummaryDetails(data)),
        saveTaskPercentage:(data) => dispatch(saveTaskPercentage(data)),
        getQuestionsListSuccess:(data) => dispatch(getQuestionsListSuccess(data))
    }
};

function mapStateToProps(state) {
    return {
        questionsList: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.questionsList,
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.planDetails,
        requestDetails: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.requestDetails,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        VisitFeedback: state.visitHistoryState.vistServiceHistoryState.VisitFeedback,
        isLoading: state.visitSelectionState.VisitServiceProcessingState.AssessmentState.isLoading,
        eligibilityIsLoading: state.visitSelectionState.VisitServiceProcessingState.SummaryState.isLoading,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Assessment));