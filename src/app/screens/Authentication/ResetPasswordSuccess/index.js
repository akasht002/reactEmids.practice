import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginCover } from '../../../components';
import { onLogin } from '../../../redux/auth/login/actions';
import './resetPasswordSuccess.css'

export class ResetPasswordSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailValid: true,
        };
    };

    onClickButtonLogin = () => {
        this.props.onLogin();
    }

    render() {
        return (
            <LoginCover isLoading={this.props.isLoading}>
                <div className="icon-check"></div>
                <p>Password Reset Sucessful!</p>
                <p><span onClick={this.onClickButtonLogin}>Go to Login Page</span></p>
            </LoginCover>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onLogin: () => dispatch(onLogin()),
    }
}

export function mapStateToProps(state) {
    return {
        isLoading: state.loadingState.isLoading,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordSuccess));