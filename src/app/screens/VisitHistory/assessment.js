import React from 'react';
import { FEEDBACK_QUESTION_TYPE } from '../../constants/constants'
import {CoreoRadio} from '../../components/Base/CoreoRadio';

export const Assessment = props => {
    return (
        <div>
            {props.questionsList && props.questionsList.map((questionList, i) => {
                if (questionList.answerTypeDescription === FEEDBACK_QUESTION_TYPE.CHOICEBASED) {
                    return (
                        <div key={questionList.assessmentQuestionnaireId} className="FeedbackQuestionWidget pb-0">
                            <p className={'FeedbackQuestion'}>
                                {i + 1}. {questionList.question}
                            </p>
                            <div className='FeedbackAnswerWidget'>
                                {questionList.answers.map((answer) => {
                                    if (questionList.selectedAnswer === answer.answerName) {
                                        answer.checked = true;
                                    }
                                    return (
                                        <div className="form-radio col-md-3" key={answer.id}>
                                            <CoreoRadio 
                                                id={answer.id}
                                                value={answer.answerName}
                                                name={questionList.feedbackQuestionnaireId}                                               
                                                checked={answer.checked}
                                                disabled={true}
                                            />
                                            <label className="form-radio-label" htmlFor={answer.id}>{answer.answerName}
                                                <span className="RadioBoxIcon" /></label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }

                if (questionList.answerTypeDescription === FEEDBACK_QUESTION_TYPE.MULTISELECT) {
                    return (
                        <div key={questionList.assessmentQuestionnaireId} className="FeedbackQuestionWidget pb-0">
                            <p className={'FeedbackQuestion'}>
                                {i + 1}. {questionList.question}
                            </p>
                            <div className='FeedbackAnswerWidget'>
                                {questionList.answers.map((answer) => {
                                   let multipleCheckboxOption = questionList.selectedAnswer && questionList.selectedAnswer.split(',');
                                   multipleCheckboxOption && multipleCheckboxOption.map((item) => {
                                        if ((item).trim() === answer.answerName) {
                                            answer.checked = true;
                                        }
                                        return ''
                                    })
                                    return (
                                        <div className="form-check pr-3" key={answer.id}>
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
                                {questionList.answers.map((answer, i) => {
                                    return (
                                        <div key={answer.id} className="feedbackForm">
                                            <textarea
                                                id={answer.id}
                                                rows={4}
                                                className='form-control'
                                                maxLength='1000'
                                                value={questionList.selectedAnswer}
                                                disabled={true}
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
    )
}