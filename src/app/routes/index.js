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
  VisitServiceList,
  VisitServiceDetails,
  PerformTasks,
  Feedback,
  Home,
  Summary,
  ForgetPassword,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordConfirmation,
  Dashboard,
  Welcome,
  ConversationSummary,
  Conversation
} from '../screens';
import PrivateRoute from './privateRouter';

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
  visitServiceList: '/Visitservicelist',
  visitServiceDetails: '/visitservicedetails',
  performTasks: '/performtasks',
  feedback: '/feedback',
  loginCallBack: '/loginCallBack',
  summary: '/summary',
  forgetPassword: '/forgetPassword',
  resetPassword: '/resetPassword/:uid/:token',
  resetPasswordSuccess: '/resetPasswordSuccess',
  resetPasswordConfirmation: '/resetPasswordConfirmation',
  dashboard:'/dashboard',
  messageSummary: '/messagesummary',
  conversations: '/conversation/:id',
  conversation : '/conversation/'
};

class AppStackRoot extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <HashRouter>
          <div>
          <Switch>
            <Route exact path={Path.root} component={Welcome} />
            <Route path={Path.setPassword} component={SetPassword} />
            <Route path={Path.verifyContact} component={VerifyContact} />
            <Route path={Path.verifyEmail} component={VerifyUserID} />
            <Route path={Path.onboardSuccess} component={OnboardSuccess} />
            <Route path={Path.loginCallBack} component={LoginCallBack}/>
            <Route path={Path.forgetPassword} component={ForgetPassword} />
            <Route path={Path.resetPassword} component={ResetPassword} />
            <Route path={Path.resetPasswordConfirmation} component={ResetPasswordConfirmation} />
            <Route path={Path.resetPasswordSuccess} component={ResetPasswordSuccess} />
            <PrivateRoute exact path={Path.visitServiceList} component={VisitServiceList} />
            <PrivateRoute  exact path={Path.visitServiceDetails} component={VisitServiceDetails} />
            <PrivateRoute exact path={Path.performTasks} component={PerformTasks} />
            <PrivateRoute exact path={Path.feedback} component={Feedback} />
            <PrivateRoute exact path={Path.summary} component={Summary} />
            <PrivateRoute exact path={Path.dashboard} component={Dashboard} />
            <PrivateRoute  path={Path.conversations} component={Conversation} />
            <PrivateRoute  path={Path.messageSummary} component={ConversationSummary} />
            <PrivateRoute exact path={Path.profile} component={Profile} />                     
          </Switch>
          </div>
        </HashRouter>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;