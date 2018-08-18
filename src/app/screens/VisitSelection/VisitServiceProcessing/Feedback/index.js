import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.css'
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData'
import { getQuestionsList, saveAnswers } from '../../../../redux/visitSelection/VisitServiceProcessing/Feedback/actions';
import { LeftSideMenu, ProfileHeader, Scrollbars, DashboardWizFlow, ModalPopup } from '../../../../components';

class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isModalOpen: false,
            rating: '',
            answerList: '',
            textareaValue: '',
            textareaData: ''
        };
        this.selectedAnswers = [];
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        this.props.getQuestionsList();
    }

    handleSelected = (answer) => {
        this.selectedAnswers.push(answer)
        this.setState({ answerList: this.selectedAnswers })
    }

    handleTextarea = (e) => {
        this.setState({
            textareaValue: e.target.value,
            textareaData: {
                id: parseInt(e.target.id),
                answerName: this.state.textareaValue
            }
        });
    }

    handleSelectedRating = (e) => {
        this.setState({ rating: e.target.value })
    }

    onClickNext = () => {
        let answers = this.selectedAnswers
        answers.push(this.state.textareaData);

        if (this.props.QuestionsList.length === answers.length) {
            this.onSubmit();
        } else {
            this.setState({ isModalOpen: true })
        }
    }

    onSubmit = () => {
        let answers = this.selectedAnswers
        answers.push(this.state.textareaData);
        const data = {
            serviceRequestVisitId: this.props.patientDetails.serviceRequestVisitId,
            serviceRequestId: this.props.patientDetails.serviceRequestId,
            serviceProviderId: this.props.patientDetails.serviceProviderId,
            rating: this.state.rating,
            answers: answers
        }
        this.props.saveAnswers(data);
        this.setState({ isModalOpen: false })
    }

    render() {
        return (
            <section className="d-flex">
                <LeftSideMenu isOpen={this.state.isOpen} />
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.toggle.bind(this)} />
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)} />
                    <div className='ProfileRightContainer'>
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
                                        <a className="TitleContent backProfileIcon"></a>
                                        <div className='requestContent'>
                                            <div className='requestNameContent'>
                                                <span><i className='requestName'><Moment format="DD MMM">{this.props.patientDetails.visitDate}</Moment>, {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestId}</span>
                                            </div>
                                            <div className='requestImageContent'>
                                                <span>
                                                    {/* <img
                                                    src={imagePath("./avatar/user-10.jpg")}
                                                    className="avatarImage avatarImageBorder" /> */}
                                                    <i className='requestName'>{this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName}</i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers WizardWidget'>
                                    <div className="row">
                                        <div className="col col-md-9 WizardContent">
                                            <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={1} />
                                        </div>
                                        <div className="col col-md-3 rightTimerWidget">
                                            <div className="row rightTimerContainer">
                                                <div className="col-md-5 rightTimerContent">
                                                    <span className="TimerContent">01<i>:</i>45</span>
                                                </div>
                                                <div className="col-md-7 rightTimerContent">
                                                    <Link className="btn btn-primary" to="/">Stop Service</Link>
                                                    <span className="TimerStarted">Started at 12:30 pm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers ServiceCategoryWidget'>
                                    <form className='ServiceContent'>
                                        <div className="FeedbackWidget">
                                            <div className="FeedbackRating">
                                                <p>Please rate your experience in engaging with {this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName}</p>
                                                <div className="FeedbackContent">
                                                    <fieldset className="rating" onChange={(e) => this.handleSelectedRating(e)}>
                                                        <input type="radio" id="star5" name="rating" value="5" />
                                                        <label className="full" htmlFor="star5" />
                                                        <input type="radio" id="star4" name="rating" value="4" />
                                                        <label className="full" htmlFor="star4" />
                                                        <input type="radio" id="star3" name="rating" value="3" />
                                                        <label className="full" htmlFor="star3" />
                                                        <input type="radio" id="star2" name="rating" value="2" />
                                                        <label className="full" htmlFor="star2" />
                                                        <input type="radio" id="star1" name="rating" value="1" />
                                                        <label className="full" htmlFor="star1" />
                                                    </fieldset>
                                                </div>
                                            </div>
                                            {this.props.QuestionsList.length > 0 ?
                                                <div>
                                                    {this.props.QuestionsList && this.props.QuestionsList.map((questionList, i) => {
                                                        if (questionList.answerTypeDescription === 'ChoiceBased') {
                                                            return (
                                                                <div key={questionList.feedbackQuestionnaireId} className="FeedbackQuestionWidget">
                                                                    <p className="FeedbackQuestion">{i + 1}. {questionList.question}</p>
                                                                    <div className='FeedbackAnswerWidget'>
                                                                        {questionList.answers.map((answer, i) => {
                                                                            return (
                                                                                <div className="form-radio col-md-3" key={answer.id}>
                                                                                    <input className="form-radio-input"
                                                                                        id={answer.id}
                                                                                        type="radio"
                                                                                        value={answer.answerName}
                                                                                        name={questionList.feedbackQuestionnaireId}
                                                                                        onChange={(e) => this.handleSelected(answer)}
                                                                                    />
                                                                                    <label className="form-radio-label" htmlFor={answer.id}>{answer.answerName}</label>
                                                                                    <span className="RadioBoxIcon" />
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
                                                                                        onChange={(e) => this.handleTextarea(e)}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                    }
                                                </div>
                                                :
                                                ''
                                            }

                                        </div>
                                        <div className='bottomButton'>
                                            <div className='ml-auto'>
                                                {/* <Link className='btn btn-outline-primary mr-3' to='/VisitProcessing'>Previous</Link> */}
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
                                className="modal-sm"
                                headerFooter="d-none"
                                centered={true}
                                onConfirm={() => this.onSubmit()}
                                onCancel={() => this.setState({
                                    isModalOpen: !this.state.isModalOpen,
                                })}
                            />
                        </Scrollbars>
                    </div>
                </div>
            </section>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQuestionsList: () => dispatch(getQuestionsList()),
        saveAnswers: (data) => dispatch(saveAnswers(data))
    }
};

function mapStateToProps(state) {
    return {
        QuestionsList: state.visitSelectionState.VisitServiceProcessingState.FeedbackState.QuestionsList,
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));