import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { ScreenCover } from '../../../components';
import { push } from '../../../redux/navigation/actions';
import './resetPasswordConfirmation.css';
import { Path } from '../../../routes';

export class ResetPasswordConfirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailValid: true,
        };
    };

    resendEmail = () => {
        this.props.redirect(Path.forgetPassword);
    }

    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <div className="resetPasswordConfirmation-body">
                    <div className="col-md-12 heading"><h2>COREO HOME</h2></div>
                    <div className="container">
                        <div className="row justify-content-center align-self-center">

                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="jumbotron vertical-center text-center">
                                    <div className="login-box">
                                        <div className="login-bg1">
                                            <div className="login-body text-center">
                                                <div className="icon-check"></div>
                                                <p>A reset password link has been sent to email ID {this.props.emailId}. </p>
                                                <p>Click on the link in the email to set your new password </p>
                                                <p>Didn't receive the email yet? <br />
                                                    Please check your Spam folder, or <span onClick={this.resendEmail}>Resend</span> Email.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenCover>
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