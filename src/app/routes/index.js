import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from "react-router-redux";
import { HashRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import {
  VerifyContact,
  SetPassword,
  VerifyUserID,
  OnboardSuccess,
  Profile,
  Home,
  ForgetPassword,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordConfirmation

} from '../screens';
import { PrivateRoute } from './privateRouter';

function Loading({ error }) {
  if (error) {
    return 'Oh nooess!';
  } else {
    return <h3>Loading...</h3>;
  }
}

const LoginCallBack = Loadable({
  loader: () => import('../screens/Authentication/Login/LoginCallBack'),
  loading: Loading
});

export const Path = {
  root: '/',
  setPassword: '/setpassword',
  verifyEmail: '/verifyemail',
  verifyContact: '/verifycontact',
  onboardSuccess: '/onboardsuccess',
  profile: '/profile',
  loginCallBack: '/loginCallBack',
  forgetPassword: '/forgetPassword',
  resetPassword: '/resetPassword:uid/:token',
  resetPasswordSuccess: '/resetPasswordSuccess',
  resetPasswordConfirmation: '/resetPasswordConfirmation',
  home:'/home',
};

class AppStackRoot extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <HashRouter>
          <Switch>
            <Route exact path={Path.root} component={Home} />
            <Route path={Path.setPassword} component={SetPassword} />
            <Route path={Path.verifyContact} component={VerifyContact} />
            <Route path={Path.verifyEmail} component={VerifyUserID} />
            <Route path={Path.onboardSuccess} component={OnboardSuccess} />
            <Route path={Path.loginCallBack} component={LoginCallBack} />
            <Route path={Path.forgetPassword} component={ForgetPassword} />
            <Route path={Path.resetPassword} component={ResetPassword} />
            <Route path={Path.resetPasswordConfirmation} component={ResetPasswordConfirmation} />
            <Route path={Path.resetPasswordSuccess} component={ResetPasswordSuccess} />
            <Route path={Path.profile} component={Profile} />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;