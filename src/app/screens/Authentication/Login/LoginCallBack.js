import React, { Component } from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "../../../utils/userManager";
import { ScreenCover } from '../../../components';
import { onLoginSuccess, onLoginFail } from '../../../redux/auth/login/actions';

class LoginCallBack extends Component {
  render() {
    return (
      <ScreenCover onPress={this.onBtnPress}>
        <CallbackComponent
          userManager={ userManager }
          successCallback={(data) => {
            this.props.onLoginSuccess(data);
          }}
          errorCallback={error => {
            this.props.onLoginFail();
          }}>
          <div>Redirecting...</div>
        </CallbackComponent>
      </ScreenCover>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
      onLoginSuccess: (data) => dispatch(onLoginSuccess(data)),
      onLoginFail: () => dispatch(onLoginFail())
  }
}

export default connect(null, mapDispatchToProps)(LoginCallBack);