import React, { useEffect, useState } from 'react';
import { Input, Button, LoginCover } from '../../../components';
import { push } from '../../../redux/navigation/actions';
import { Path } from '../../../routes';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getSecurityQuestion, validateSecurityAnswer, formDirty } from '../../../redux/auth/SecurityQuestion/actions';
import { checkEmpty } from '../../../utils/validations';

const SecurityQuestion = (props) => {

    useEffect(() => {
        props.getSecurityQuestion(props.match.params.uid)
    },
        []
    );

    const onClickButtonLogin = () => {
        props.onLogin();
    }

    const [formData, setFormData] = useState({ });

    const onChange = (e) => {
        props.formDirty();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
            onClickSubmit: false
        });
    }

    const submitAnswer = () => {
        setFormData({ ...formData, onClickSubmit: true })
        let data = {
            answer: formData.answer,
            stateToken: props.stateToken && props.stateToken
        }
        formData.answer && props.validateSecurityAnswer(data);
    }

    return (
        <LoginCover test-forget-body='test-forget-body'>
            <h6>Answer Forgotten Password Challenge</h6>
            <div className="form-group  text-center login-body pb-0 pt-2">
                <p className="text-left color-yello">{props._embedded && props._embedded.user.recovery_question.question}</p>
                <Input
                    name="answer"
                    value={formData.answer}
                    autoComplete="off"
                    required="required"
                    type="text"
                    placeholder="Answer"
                    maxlength={100}
                    className={'emailField ' + (formData.onClickSubmit && checkEmpty(formData.answer) && 'inputFailure')}
                    textChange={(e) => onChange(e)}
                />
                <small className='text-danger d-block OnboardingAlert'>
                    {formData.onClickSubmit && checkEmpty(formData.answer) && 'Please enter a valid answer'}
                </small>
                {props.errorMessage && <small className='text-danger d-block OnboardingAlert'>
                    {props.errorMessage}
                </small>}
            </div>
            <Button
                type="button"
                classname="btn btn-primary send-btn"
                label="Reset Password"
                onClick={submitAnswer}
                disable={false}
            />
            <p><span className="login" onClick={onClickButtonLogin}>Back to Login</span></p>
        </LoginCover>
    );
};

export function mapDispatchToProps(dispatch) {
    return {
        onLogin: () => dispatch(push(Path.login)),
        getSecurityQuestion: (uid) => dispatch(getSecurityQuestion(uid)),
        validateSecurityAnswer: (data) => dispatch(validateSecurityAnswer(data)),
        formDirty: () => dispatch(formDirty())
    }
}

export function mapStateToProps(state) {
    let { _embedded } = state.authState.securityQuestionState.securityQuestion
    return {
        _embedded,
        stateToken: state.authState.securityQuestionState.securityQuestion.stateToken,
        errorMessage: state.authState.securityQuestionState.errorMessage
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SecurityQuestion));