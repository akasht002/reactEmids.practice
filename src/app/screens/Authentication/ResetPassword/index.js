import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { resetPassword, getEmailId, formDirty } from '../../../redux/auth/ResetPassword/actions';
import { Input, ScreenCover, Button } from '../../../components';
import { checkPassword } from '../../../utils/validations';
import { RESPONSE_STATUS } from '../../../constants/variables'
import './resetPassword.css';

export class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            confirmPass: '',
            passwordMatch: true,
            passwordCombination: true,
            resetPasswordSuccess: false,
            userId: this.props.match.params.uid,
            tokenkey: this.props.match.params.token,
            isFieldDirty: false,
        };
    };

    componentDidMount() {
        this.props.getEmailId({
            uid: this.props.match.params.uid,
            tokenkey: this.props.match.params.token,
        });
    }

    onClickButtonReset = () => {
        if (this.state.passwordMatch && this.state.passwordCombination && this.state.pass !== ''
            && this.state.confirmPass !== '') {
            this.props.onClickReset({
                password: this.state.pass
                , userId: this.state.userId, token: this.state.tokenkey,
                userName: this.props.userName
            });
        }
        else {
            if (this.state.pass === '' || this.state.confirmPass === '') {
                this.setState({
                    isFieldDirty: true
                });
            }
        }
    }

    validatePassword = () => {
        if (checkPassword(this.state.pass)) {
            if (this.state.pass === this.state.confirmPass) {
                this.setState({ passwordMatch: true });
            } else {
                this.setState({ passwordMatch: false, isFieldDirty: false });
            }
        }
        else {
            this.setState({ passwordCombination: false, isFieldDirty: false });
        }
    }

    onChangeNewPassword = (e) => {
        this.setState({
            pass: e.target.value,
            passwordMatch: true,
            passwordCombination: true,
            isFieldDirty: false,
        })
        this.props.formDirty();
    }

    onChangeConfirmPassword = (e) => {
        this.setState({
            confirmPass: e.target.value,
            passwordMatch: true,
            passwordCombination: true,
            isFieldDirty: false,
        })
        this.props.formDirty();
    }

    render() {
        return (
            this.props.resetPasswordLinkStatus !== RESPONSE_STATUS.LINK_EXPIRED ?
                <ScreenCover isLoading={this.props.isLoading}>
                    <div className="resetPassword-body">
                        <div className="col-md-12 heading"><h2>COREO HOME</h2></div>
                        <div className="container">
                            <div className="row justify-content-center align-self-center">

                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <div className="jumbotron vertical-center text-center">
                                        <div className="login-box">
                                            <div className="login-bg">
                                                <div className="login-body text-center">
                                                    <h3>Reset your password?</h3>
                                                    <p>You have requested to reset password for {this.props.userName}</p>
                                                    <div className="form-group text-center">
                                                        <Input
                                                            name="newPass"
                                                            autoComplete="off"
                                                            type="password"
                                                            placeholder="New Password"
                                                            className={"passwordField " + (this.props.resetPasswordSuccess ? 'inputSuccess' : (!this.state.passwordCombination || (!this.state.passwordMatch && this.state.confirmPass)) && 'inputFailure')}
                                                            value={this.state.pass}
                                                            textChange={this.onChangeNewPassword}
                                                            onBlur={this.validatePassword}
                                                            onCopy={(e) => { e.preventDefault() }}
                                                            onPaste={(e) => { e.preventDefault() }}
                                                        />
                                                    </div>

                                                    <div className="form-group text-center">
                                                        <Input
                                                            name="confirmPass"
                                                            autoComplete="off"
                                                            type="password"
                                                            placeholder="Retype New Password"
                                                            className={"passwordField " + (this.props.resetPasswordSuccess ? 'inputSuccess' : (!this.state.passwordCombination || (!this.state.passwordMatch && this.state.confirmPass)) && 'inputFailure')}
                                                            value={this.state.confirmPass}
                                                            textChange={this.onChangeConfirmPassword}
                                                            onBlur={this.validatePassword}
                                                            onCopy={(e) => { e.preventDefault() }}
                                                            onPaste={(e) => { e.preventDefault() }}
                                                        />
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        classname="btn login-btn"
                                                        label="Reset My Password"
                                                        onClick={this.onClickButtonReset}
                                                        disable={false}
                                                    />
                                                    {this.state.isFieldDirty &&
                                                        <p className="text-danger">Please try again.</p>
                                                    }
                                                    {!this.state.passwordMatch && this.state.confirmPass &&
                                                        <p className="text-danger d-block mt-4 mb-2">Passwords do not match. Please try again.</p>
                                                    }
                                                    {!this.state.passwordCombination &&
                                                        <p className="text-danger d-block mt-4 mb-2">Password should contain a combination of upper case, lower case, special characters, numbers and should be at least 8 characters</p>
                                                    }
                                                    {this.props.resetPasswordStatus &&
                                                        <p className="text-danger d-block mt-4 mb-2">Invalid Password. The new password cannot be among the last 6 passwords used.</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScreenCover> :
                <h3 className="MsgWithIcon">
                    Link is not active
            </h3>
        )
    }
}

ResetPassword.propTypes = {
    userName: PropTypes.string,
    resetPasswordLinkStatus: PropTypes.string,
    isLoading: PropTypes.bool,
    onClickCancel: PropTypes.func,
    getEmailId: PropTypes.func,
    onClickReset: PropTypes.func
}

export function mapDispatchToProps(dispatch) {
    return {
        onClickReset: (data) => dispatch(resetPassword(data)),
        getEmailId: (data) => dispatch(getEmailId(data)),
        formDirty: () => dispatch(formDirty())

    }
}

export function mapStateToProps(state) {
    return {
        isLoading: state.loadingState.isLoading,
        userName: state.authState.resetPasswordState.emailId,
        resetPasswordSuccess: state.authState.resetPasswordState.resetPasswordSuccess,
        resetPasswordLinkStatus: state.authState.resetPasswordState.resetPasswordLinkStatus,
        resetPasswordStatus: state.authState.resetPasswordState.resetPasswordStatus
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));