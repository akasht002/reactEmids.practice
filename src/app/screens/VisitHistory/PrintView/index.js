import React from 'react';
import './printview.css'
import moment from 'moment';
import { FEEDBACK_QUESTION_TYPE, DATE_FORMATS } from '../../../constants/constants';
import Moment from 'react-moment';

export class PrintView extends React.Component {

getTaskPercentage = (totalTaskCompleted, totalTask) => {
    if (totalTaskCompleted !== 0 && totalTask !== 0) {
        return Math.round((totalTaskCompleted / totalTask) * 100)
    } else if (totalTask === 0) {
        return 0
    } else {
        return 0
    }
}

    render() {
        const { serviceRequestVisitNumber, serviceTypeDescription, visitDate, duration, totalTask, totalTaskCompleted } = this.props.userFeedbackInfo
        const { spFirstName, spLastName } = this.props.userFeedbackInfo && this.props.userFeedbackInfo.serviceProviderFeedbackDetails && this.props.userFeedbackInfo.serviceProviderFeedbackDetails 
        const { patientFirstName, patientLastName, patientGender, patientDOB, patientHeight, patientWeight, patientStateName, patientCity, patientZipCode, patientStreetAddess, patientPhoneNumber } = this.props.userFeedbackInfo && this.props.userFeedbackInfo.patientFeedbackDetails && this.props.userFeedbackInfo.patientFeedbackDetails 

        return (
            <div className="full-block page-print-view full-height-block">
                <div className="row full-block top-row page-break">
                    <h4 className="mt-3 mb-3">Coreo Home Initial Assessment Visit - {serviceRequestVisitNumber}</h4>
                    <div className="col-lg-12 col-md-12 border-block top-block-details mt-3 mb-3 bg-white">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 border-right pdf-block min-74">
                                <div className="col  p-0">
                                    <p>Patient Name</p>
                                    <span>{patientFirstName} {patientLastName}</span>
                                </div>
                                <div className="profile-body-block">
                                    <div className="row">
                                        <div className="col min-101  border-right border-top min-74">
                                            <p>Gender</p>
                                            <span>{patientGender}</span>
                                        </div>
                                        <div className="col min-101  border-top min-74">
                                            <p>DOB</p>
                                            <span>{moment(patientDOB, DATE_FORMATS.yyyy_mm_dd).format(DATE_FORMATS.ddmmmyyy)}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col min-101  border-right border-top min-74">
                                            <p>Height</p>
                                            <span>{`${patientHeight} Inches`}</span>
                                        </div>
                                        <div className="col min-101 border-top min-74">
                                            <p>Weight</p>
                                            <span>{`${patientWeight} Lbs`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pdf-block">
                                <div className="row">
                                    <div className="col-lg-12  col-md-12">
                                        <p>Address</p>
                                        <div className="full-block">
                                            <div className="SummaryContent POS mb-2 emergency-address-block">
                                                <ul className="SPCertificateList theme-primary">
                                                    <li className="SPAddressItems">
                                                        <p><span>Street</span>{patientStreetAddess}</p>
                                                        <p><span>City</span>{patientCity}</p>
                                                        <div className="d-flex">
                                                            <p className="col-md-6 col-lg-6 p-0"><span>State</span>{patientStateName}</p>
                                                            <p className="col-md-6 col-lg-6 p-0"><span>Zip</span>{patientZipCode}</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 min-101  col-md-12 border-top min-74">
                                        <p>Primary Phone Number</p>
                                        <span>{patientPhoneNumber}</span>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>



                </div>

                <div className="full-block-table page-break">
                    <h5 className="mt-3 mb-3 text-left">Visit History details</h5>
                    <hr></hr>
                    <div className="print-table-top details-view-block">
                        <div className="row">

                            <div className="col border-right">
                                <span className="title-label">Date Of Visit</span>
                                <span className="details-view-user">
                                    <Moment format='ddd, DD MMM'>
                                        {visitDate}
                                    </Moment>
                                </span>
                            </div>
                            <div className="col border-right">
                                <span className="title-label">Duration Of Visit</span>
                                <span className="details-view-user">{duration && duration.substring(0, 5)}{' '}(HH:MM)</span>
                            </div>
                            <div className="col border-right">
                                <span className="title-label">Service Types Of Visit</span>
                                <span className="details-view-user">{serviceTypeDescription.join(', ')}</span>
                            </div>
                            <div className="col border-right">
                                <span className="title-label">Name Of the ESP</span>
                                <span className="details-view-user">{`${spFirstName} ${spLastName}`}</span>
                            </div>
                            <div className="col">
                                <span className="title-label">Percentage Of tasks</span>
                                <span className="details-view-user">{this.getTaskPercentage(totalTaskCompleted, totalTask)}</span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="full-block-table page-break">
                    <h5 className="mt-3 mb-3 text-left">Assessment Questions</h5>
                    <hr></hr>
                    <div className="print-table-top questions-view-block">

                        {this.props.questionsList && this.props.questionsList.map((questionList, i) => {
                            if (questionList.answerTypeDescription === FEEDBACK_QUESTION_TYPE.CHOICEBASED) {
                                return (

                                    <div key={questionList.assessmentQuestionnaireId} className="FeedbackQuestionWidget">
                                        <p className={'FeedbackQuestion'}>
                                            {i + 1}. {questionList.question}
                                        </p>
                                        <div className='FeedbackAnswerWidget pl-3'>
                                            {questionList.answers.map((answer) => {
                                                if (questionList.selectedAnswer === answer.answerName) {
                                                    answer.checked = true;
                                                }
                                                return (

                                                    <div className="form-radio col-lg-3 col-md-3 col-sm-4 col-xs-6 question-part" key={answer.id}>
                                                        <input className="form-radio-input"
                                                            id={answer.id}
                                                            type="radio"
                                                            value={answer.answerName}
                                                            name={questionList.feedbackQuestionnaireId}
                                                            checked={answer.checked}
                                                            disabled={true}
                                                        />
                                                        <label className="form-radio-label theme-primary" htmlFor={answer.id}>{answer.answerName}
                                                            <span className="RadioBoxIcon theme-primary" /></label>
                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>

                                )
                            }

                            if (questionList.answerTypeDescription === FEEDBACK_QUESTION_TYPE.MULTISELECT) {
                                return (

                                    <div key={questionList.assessmentQuestionnaireId} className="FeedbackQuestionWidget">
                                        <p className={'FeedbackQuestion'}>
                                            {i + 1}. {questionList.question}
                                        </p>
                                        <div className='FeedbackAnswerWidget pl-3'>
                                            {questionList.answers.map((answer) => {
                                                let multipleCheckboxOption = questionList.selectedAnswer && questionList.selectedAnswer.split(',');
                                                multipleCheckboxOption && multipleCheckboxOption.map((item) => {
                                                    if ((item).trim() === answer.answerName) {
                                                        answer.checked = true;
                                                    }
                                                })
                                                return (
                                                    <div className="form-check col-lg-3 col-md-3 col-sm-4 col-xs-6 question-part" key={answer.id}>
                                                        <label className='form-check-label'>
                                                            <input className="form-check-input"
                                                                id={answer.id}
                                                                type="checkbox"
                                                                value={answer.answerName}
                                                                name={questionList.feedbackQuestionnaireId}
                                                                checked={answer.checked}
                                                                disabled={true}
                                                            />
                                                            {answer.answerName}
                                                            <span className='CheckboxIcon' /></label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                )
                            }

                            if (questionList.answerTypeDescription === FEEDBACK_QUESTION_TYPE.OPENTEXT) {
                                return (

                                    <div className="FeedbackQuestionWidget" key={questionList.assessmentQuestionnaireId}>
                                        <p className="FeedbackQuestion">{i + 1}. {questionList.question}</p>
                                        <div className='FeedbackAnswerWidget'>

                                            <div className="form-group full-block pl-3 print-textbox">
                                                <input className='form-control' type='text' value = {questionList.selectedAnswer}/>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                            return questionList
                        })
                        }

                    </div>
                </div>


            </div>
        )
    }
}

export default PrintView;