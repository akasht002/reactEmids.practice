import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { LoginCover } from '../../../components';
import { push } from '../../../redux/navigation/actions';
import './resetPasswordConfirmation.css';
import { Path } from '../../../routes';

export class ResetPasswordConfirmation extends Component {
    
    resendEmail = () => {
        this.props.redirect(Path.forgetPassword);
    }

    render() {
        return (
            <LoginCover isLoading={this.props.isLoading}>
                <div className="icon-check"></div>
                <p>A reset password link has been sent to Email Address <span className="email-length">{this.props.emailId}</span></p>
                <p>Click on the link in the email to set your new password </p>
                <p>Didn't receive the email yet? <br />
                    Please check your Spam folder, or <span onClick={this.resendEmail}>Resend</span> Email.</p>
            </LoginCover>
        );
    }
}

ResetPasswordConfirmation.propTypes = {
    isLoading: PropTypes.bool,
    redirect: PropTypes.func
}

export function mapDispatchToProps(dispatch) {
    return {
        redirect: (data) => dispatch(push(data))
    }
}

export function mapStateToProps(state) {
    return {
        isLoading: state.loadingState.isLoading,
        emailId: state.authState.forgetPasswordState.emailId,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordConfirmation));