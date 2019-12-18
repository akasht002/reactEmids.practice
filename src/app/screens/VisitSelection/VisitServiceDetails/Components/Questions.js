import React,{Fragment} from 'react'

import { QUESTION_TYPE } from '../../../../constants/constants'


export const Questions = (props) => {
    return(
        <Fragment>
        {props.questionsLists && props.questionsLists.length > 0 ?
            <div>
                {props.questionsLists && props.questionsLists.map((questionList, i) => {
                    
                    if (questionList.answerType === QUESTION_TYPE.ChoiceBased) {
                        return (
                            <div key={"questionList" + i} className="FeedbackQuestionWidget">
                                <p className={ 'FeedbackQuestion'}>
                                    {i + 1}. {questionList.question}
                                </p>
                                <div className='FeedbackAnswerWidget'>
                                    {questionList.answerss.map((answers, index)=>{  
                                        if (questionList.selectedAnswer === answers.answerName) {
                                            answers.checked = true;
                                        }                                                                                     
                                        return (
                                            <div className="form-radio col-md-4" key={(index+1)}>
                                                <input className="form-radio-input"
                                                    id={questionList.serviceRequestAssessmentQuestionnaireId}
                                                    type="radio"
                                                    value={answers.answerName}
                                                    name={questionList.serviceRequestAssessmentQuestionnaireId}
                                                    defaultChecked= {answers.checked }
                                                    disabled={true}
                                                />
                                                <label className="form-radio-label" htmlFor={(index+1)}>
                                                    <span className="RadioBoxIcon" /> {answers.answerName}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }

                    if (questionList.answerType === QUESTION_TYPE.OpenText) {
                        return (
                            <div className="FeedbackQuestionWidget" key={"questionList"+i}>
                                <p className={ 'FeedbackQuestion'}>{i + 1}. {questionList.question}</p>
                                <div className='FeedbackAnswerWidget'>
                                    {<div key={(i+10)} className="feedbackForm">
                                                <textarea
                                                    id={questionList.serviceRequestAssessmentQuestionnaireId}
                                                    rows={4}
                                                    className='form-control'
                                                    value={questionList.selectedAnswer}                                                   
                                                    maxLength={1000}
                                                    disabled={true}
                                                />
                                    </div>}
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
        </Fragment>
    )
}