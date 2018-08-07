import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "../../utils/userManager";
import { ScreenCover } from '../../components';
import { onLoginSuccess, onLoginFail } from '../../redux/auth/login/actions';

class LoginCallBack extends React.Component {
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
            console.error(error);
          }}>
          <div>Redirecting...</div>
        </CallbackComponent>
      </ScreenCover>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
      onLoginSuccess: () => dispatch(onLoginSuccess()),
      onLoginFail: () => dispatch(onLoginFail())
  }
}

export default connect(null, mapDispatchToProps)(LoginCallBack);