import React from "react";
import {Link} from "react-router-dom";
import '../../styles/Feedback.css'

class FeedbackContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
    };

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return (
            <form className='ServiceContent'>
                <div className="FeedbackWidget">
                    <div className="FeedbackRating">
                        <p>Please rate your experience in engaging with Christopher W</p>
                        <div className="FeedbackContent">
                            <fieldset className="rating">
                                <input type="radio" id="star5" name="rating" value="5"/>
                                <label className="full" htmlFor="star5"/>
                                <input type="radio" id="star4" name="rating" value="4"/>
                                <label className="full" htmlFor="star4"/>
                                <input type="radio" id="star3" name="rating" value="3"/>
                                <label className="full" htmlFor="star3"/>
                                <input type="radio" id="star2" name="rating" value="2"/>
                                <label className="full" htmlFor="star2"/>
                                <input type="radio" id="star1" name="rating" value="1"/>
                                <label className="full" htmlFor="star1"/>
                            </fieldset>
                        </div>
                    </div>
                    <div className="FeedbackQuestionWidget">
                        <p className="FeedbackQuestion">1. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris?</p>
                        <div className='FeedbackAnswerWidget'>
                            <div className="form-radio col-md-3 Selected">
                                <input className="form-radio-input" name="answer1" id="answer11" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer11">Answer 1</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-3">
                                <input className="form-radio-input" name="answer1" id="answer12" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer12">Answer 2</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-3">
                                <input className="form-radio-input" name="answer1" id="answer13" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer13">Answer 3</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-3">
                                <input className="form-radio-input" name="answer1" id="answer14" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer14">Answer 4</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                        </div>
                    </div>

                    <div className="FeedbackQuestionWidget">
                        <p className="FeedbackQuestion">2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris?</p>
                        <div className='FeedbackAnswerWidget'>
                            <div className="form-radio col-md-6">
                                <input className="form-radio-input" name="answer2" id="answer21" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer21">Answer 1</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-6">
                                <input className="form-radio-input" name="answer2" id="answer22" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer22">Answer 2</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-6">
                                <input className="form-radio-input" name="answer2" id="answer23" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer23">Answer 3</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-6">
                                <input className="form-radio-input" name="answer2" id="answer24" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer24">Answer 4</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                        </div>
                    </div>

                    <div className="FeedbackQuestionWidget">
                        <p className="FeedbackQuestion">3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris?</p>
                        <div className='FeedbackAnswerWidget'>
                            <div className="form-radio col-md-12">
                                <input className="form-radio-input" name="answer3" id="answer31" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer31">Answer 1</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-12">
                                <input className="form-radio-input" name="answer3" id="answer32" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer32">Answer 2</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-12">
                                <input className="form-radio-input" name="answer3" id="answer33" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer33">Answer 3</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                            <div className="form-radio col-md-12">
                                <input className="form-radio-input" name="answer3" id="answer34" type="radio"
                                       value="1"/>
                                <label className="form-radio-label" htmlFor="answer34">Answer 4</label>
                                <span className="RadioBoxIcon"/>
                            </div>
                        </div>
                    </div>

                    <div className="FeedbackQuestionWidget">
                        <p className="FeedbackQuestion">4. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris?</p>
                        <div className='FeedbackAnswerWidget'>
                            <div className="feedbackForm">
                                <textarea rows={4} className='form-control'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim urna at justo viverra consequat. Integer id pulvinar dui. Mauris tristique ex eros, sed consequat lectus interdum varius. Nulla mollis, erat eu </textarea>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='bottomButton'>
                    <div className='ml-auto'>
                        <Link className='btn btn-outline-primary mr-3' to='/VisitProcessing'>Previous</Link>
                        <Link className='btn btn-primary' to='/schedulerequest'>Next</Link>
                    </div>
                </div>
            </form>
        );
    }
}

export default FeedbackContent;