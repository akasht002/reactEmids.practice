import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from "react-router-redux";
import { HashRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import {SCREENS} from '../constants/constants';
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
  Summary,
  ForgetPassword,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordConfirmation,
  Dashboard,
  VisitHistory,
  VistSummary,
  Welcome,
  Payments,
  PaymentSuccess,
  PaymentFailure,
  TeleHealth,
  ConversationSummary,
  Conversation,
  PatientProfile,
  VisitNotification
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
  verifyContactEntity: '/verifycontactentity/:id/:token/:type',
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
  dashboard: '/dashboard',
  payments: '/payments',
  paymentsuccess: '/paymentsuccess',
  paymentfailure: '/paymentfailure',
  teleHealth: '/teleHealth',
  messageSummary: '/messagesummary',
  conversations: '/conversation/:id',
  conversation: '/conversation/',
  visitHistory: '/visitHistory',
  visitSummaryDetail: '/visitSummary',
  patientProfile: '/patientProfile',
  visitNotification: '/visitNotification'
};

class AppStackRoot extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <HashRouter>
          <Switch>
            <Route exact path={Path.root} component={Welcome} />
            <Route path={Path.setPassword} component={SetPassword} />
            <Route path={Path.verifyContact} component={VerifyContact} />
            <Route path={Path.verifyContactEntity} component={VerifyContact} />
            <Route path={Path.verifyEmail} component={VerifyUserID} />
            <Route path={Path.onboardSuccess} component={OnboardSuccess} />
            <Route path={Path.loginCallBack} component={LoginCallBack} />
            <Route path={Path.forgetPassword} component={ForgetPassword} />
            <Route path={Path.resetPassword} component={ResetPassword} />
            <Route path={Path.resetPasswordConfirmation} component={ResetPasswordConfirmation} />
            <Route path={Path.resetPasswordSuccess} component={ResetPasswordSuccess} />
            <PrivateRoute path={Path.visitNotification} component={VisitNotification} />
            <PrivateRoute path={Path.visitServiceList} permission={SCREENS.VISIT_PROCESSING} component={VisitServiceList} />
            <PrivateRoute path={Path.visitServiceDetails} permission={SCREENS.VISIT_PROCESSING} component={VisitServiceDetails} />
            <PrivateRoute path={Path.performTasks} permission={SCREENS.SERVICE_REQUEST} component={PerformTasks} />
            <PrivateRoute path={Path.feedback} permission={SCREENS.SERVICE_REQUEST} component={Feedback} />
            <PrivateRoute path={Path.summary} permission={SCREENS.SERVICE_REQUEST} component={Summary} />
            <PrivateRoute path={Path.teleHealth} permission={SCREENS.TELEHEALTH} component={TeleHealth} />
            <PrivateRoute path={Path.conversations} permission={SCREENS.ASYNC_MESSAGE} component={Conversation} />
            <PrivateRoute path={Path.messageSummary} permission={SCREENS.ASYNC_MESSAGE} component={ConversationSummary} />
            <PrivateRoute path={Path.profile} permission={SCREENS.PROFILE} component={Profile} />
            <PrivateRoute path={Path.dashboard} permission={SCREENS.DASHBOARD} component={Dashboard} />
            <PrivateRoute path={Path.visitHistory} permission={SCREENS.VISIT_HISTORY} component={VisitHistory}/>            
            <PrivateRoute path={Path.visitSummaryDetail} permission={SCREENS.VISIT_HISTORY} component={VistSummary} />
            <PrivateRoute path={Path.payments} permission={SCREENS.PAYMENT_PROCESSING} component={Payments} />
            <PrivateRoute path={Path.paymentsuccess} permission={SCREENS.PAYMENT_PROCESSING} component={PaymentSuccess} />
            <PrivateRoute path={Path.paymentfailure} permission={SCREENS.PAYMENT_PROCESSING} component={PaymentFailure} />
            <PrivateRoute path={Path.patientProfile} component={PatientProfile} />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;