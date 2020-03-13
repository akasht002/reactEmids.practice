import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginCover } from '../../../components';
import { Path } from '../../../routes';
import { push } from '../../../redux/navigation/actions';
import './resetPasswordSuccess.css'

export class ResetPasswordSuccess extends Component {
    
    onClickButtonLogin = () => {
        this.props.onLogin();
    }

    render() {
        return (
            <LoginCover isLoading={this.props.isLoading} test-restSuccess-body='test-restSuccess-body'>
                <div className="icon-check"></div>
                <p>Password Reset Sucessful!</p>
                <p><span onClick={this.onClickButtonLogin}>Go to Login Page</span></p>
            </LoginCover>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onLogin: () => dispatch(push(Path.login))
    }
}

export function mapStateToProps(state) {
    return {
        isLoading: state.loadingState.isLoading,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordSuccess));