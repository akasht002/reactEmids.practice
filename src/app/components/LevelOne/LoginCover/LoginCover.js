import React, { Component } from 'react';
import { ScreenCover } from "../../../components";

import './loginCover.css';

class LoginCover extends Component {
    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <div className="loginCover-body">
                    <div className="col-md-12 headingLoginCover"><h2>COREO HOME</h2></div>
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