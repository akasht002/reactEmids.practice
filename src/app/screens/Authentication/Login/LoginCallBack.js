import React, { Component } from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "../../../utils/userManager";
import { ScreenCover } from '../../../components';
import { onLoginSuccess, onLoginFail } from '../../../redux/auth/login/actions';

class LoginCallBack extends Component {
  render() {
    return (
      <ScreenCover onPress={this.onBtnPress} isLoading={true}>
        <CallbackComponent
          userManager={ userManager }
          successCallback={(data) => {
            if (data.access_token) {
              this.props.onLoginSuccess(data);
            } else {
              this.props.onLoginFail();
            }
          }}
          errorCallback={error => {
            console.log(error)
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