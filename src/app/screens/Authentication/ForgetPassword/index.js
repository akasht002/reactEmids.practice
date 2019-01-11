import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Input, Button, LoginCover } from '../../../components';
import { checkEmail } from '../../../utils/validations'
import {
    sendResetPasswordLink,
    formDirty
} from '../../../redux/auth/ForgetPassword/actions';
import { onLogin } from '../../../redux/auth/login/actions';
import './forgetPassword.css';

export class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailValid: true,
        };
    };

    onClicksendResetPasswordLink = () => {
        if (checkEmail(this.state.email)) {
            this.setState({ emailValid: true });
            this.props.sendResetPasswordLink({ emailId: this.state.email });
        }
        else {
            this.setState({ emailValid: false });
            this.props.formDirty();
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            emailValid: true
        });
        this.props.formDirty();
    }

    onClickButtonLogin = () => {
        this.props.onLogin();
    }

    render() {
        return (
            <LoginCover isLoading={this.props.isLoading}>
                <h3>Forgot your password ?</h3>
                <p>Don't  worry. Resetting password is easy. Just tell us your Email Address registered with CoreoHome.</p>
                <div className="form-group text-center">
                    <Input
                        name="emailId"
                        autoComplete="off"
                        required="required"
                        type="email"
                        placeholder="Enter Email Address"
                        maxlength={100}
                        className={"emailField " + (this.props.isSendResetPasswordLinkSuccess ? 'inputSuccess' : (!this.state.emailValid || this.props.isSendResetPasswordLinkError) && 'inputFailure')}
                        value={this.state.email}
                        textChange={this.onChangeEmail}
                    />
                </div>
                {!this.state.emailValid &&
                    <p className="text-danger">Please enter a valid Email Address(e.g. abc@xyz.com)</p>
                }
                {this.props.isSendResetPasswordLinkError &&
                    <p className="text-danger d-block mt-4 mb-2">Invalid Email Address. Please try again</p>
                }
                <Button
                    type="button"
                    classname="btn send-btn"
                    label="Send Link"
                    onClick={this.onClicksendResetPasswordLink}
                    disable={false}
                />
                <p><span className="login" onClick={this.onClickButtonLogin}>Back to Login</span></p>
            </LoginCover>
        );
    }
}

ForgetPassword.propTypes = {
    isSendResetPasswordLinkError: PropTypes.string,
    isSendResetPasswordLinkSuccess: PropTypes.string,
    isLoading: PropTypes.bool,
    sendResetPasswordLink: PropTypes.func,
    formDirty: PropTypes.func,
}

export function mapDispatchToProps(dispatch) {
    return {
        sendResetPasswordLink: (data) => dispatch(sendResetPasswordLink(data)),
        formDirty: () => dispatch(formDirty()),
        onLogin: () => dispatch(onLogin())
    }
}

export function mapStateToProps(state) {
    return {
        isSendResetPasswordLinkSuccess: state.authState.forgetPasswordState.sendResetPasswordLinkSuccess,
        isLoading: state.loadingState.isLoading,
        isSendResetPasswordLinkError: state.authState.forgetPasswordState.sendResetPasswordLinkError,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetPassword));