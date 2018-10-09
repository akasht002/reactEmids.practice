import React, { Component } from 'react';
import { ScreenCover } from "../../../components";
import { withRouter, Link } from 'react-router-dom';

import './loginCover.css';

class LoginCover extends Component {
    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <div className="loginCover-body">
                    <div className="onBoardingHeader">
                        <Link className="brandName text-uppercase" to="/">
                            <img src={require('../../../assets/images/logo/CoreoHomeWhite.png')} alt="coreoLogo" />
                        </Link>
                    </div>
                    <div className="login-boxLoginCover">
                        <div className="login-bgLoginCover">
                            <div className="login-body text-center">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenCover>
        );
    }
}

export default LoginCover;