import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ScreenCover} from '../../../components';
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
            <ScreenCover isLoading={this.props.isLoading}>
                <div className="resetPasswordSuccess-body">
                    <div className="col-md-12 heading"><h2>COREO HOME</h2></div>
                    <div className="container">
                        <div className="row justify-content-center align-self-center">

                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="jumbotron vertical-center text-center">
                                    <div className="login-box">
                                        <div className="login-bg1">
                                            <div className="login-body text-center">
                                                <div className="icon-check"></div>
                                                <p>Password Reset Sucessful!</p>
                                                <p><span onClick={this.onClickButtonLogin}>Go to Login Page</span></p>
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