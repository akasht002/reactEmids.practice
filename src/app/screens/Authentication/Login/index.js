import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onLogin } from '../../redux/auth/login/actions' 
import { ScreenCover, CoreoWizScreen, Button } from '../../components';
import userManager from '../../utils/userManager';

import { Scrollbars } from 'react-custom-scrollbars';

class Login extends PureComponent {
  
  onBtnPress = () => {
    userManager.signinRedirect();
  } 

  render() {
    return (
      <ScreenCover onPress={this.onBtnPress}>
        <CoreoWizScreen>
          <Scrollbars className="container-fluid mainContent px-5 d-flex align-items-start flex-column">
            <div className="row d-block">
              <div className="col-md-12 py-5 px-0">
                <h4 className="font-weight-normal mb-4">
                sdfsdfsdf
                <Button
                      type="submit"
                      classname="btn btn-primary"
                      label="Send Invitation"
                      onClick={this.onBtnPress}/>
                  {this.props.setPasswordLinkStatus === 'Onboarded' && 'User is already registered please Login to proceed'}
                  {this.props.setPasswordLinkStatus === 'Invalid' && 'Link is not active'}
                </h4>
              </div>
            </div>
          </Scrollbars>
        </CoreoWizScreen>
      </ScreenCover>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(onLogin())
  }
}

function mapStateToProps(state) {
  return {
    setPasswordLinkStatus: state.onboardingState.setPasswordState.setPasswordStatus
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
