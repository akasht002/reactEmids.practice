import React, { Component } from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "../../../utils/userManager";
import { ScreenCover, Preloader } from '../../../components';
import { onLoginSuccess, onLoginFail } from '../../../redux/auth/login/actions';
import {
  Navbar,
  NavbarBrand } from 'reactstrap';
  import './styles.css';

class LoginCallBack extends Component {
  render() {
    return (
      <ScreenCover onPress={this.onBtnPress}>
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
          {/* <div className="redirect-screen">
            <Navbar className="navbar-light boxShadowBottom white-backgnd" expand="md">
              <NavbarBrand className="text-uppercase px-3 onboardingLogo">
                <img src={require('../../../assets/images/logo/CoreoHomeGray.png')} alt="coreoLogo" />
              </NavbarBrand>
            </Navbar>
            <div className="HomeLoader"></div>
          </div> */}
          <div className="loginCallback">
            <Preloader/>
          </div>
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