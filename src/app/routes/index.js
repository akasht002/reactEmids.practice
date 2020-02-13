import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router';
import Loadable from 'react-loadable';
import { SCREENS, USER_LOCALSTORAGE, ENTITY_USER } from '../constants/constants';
import { Security, ImplicitCallback } from '@okta/okta-react';
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
  VisitNotification,
  VisitNotificationSettings,
  ESPProfile,
  Assessment,
  AssessmentFeedback,
  AssessmentSummary,
  Schedule,
  EntityDashboard,
  OktaCallBack
} from '../screens';
import PrivateRoute from './privateRouter';
import { oktaIssuer, oktaClientId } from '../services/http';

export function Loading({ error }) {
  if (error) {
    return 'Oh nooess!';
  } else {
    return <h3>Loading...</h3>;
  }
}

export const LoginCallBack = Loadable({
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
  conversation: '/conversation',
  visitHistory: '/visitHistory',
  visitSummaryDetail: '/visitSummary',
  patientProfile: '/patientProfile',
  visitNotification: '/visitNotification',
  visitNotificationSettings: '/visitNotificationSettings',
  ESPProfile: '/espProfile',
  assessment: '/assessment/processing',
  assessmentFeedback: '/assessment/feedback',
  assessmentSummary: '/assessment/summary',
  schedule: '/schedule',
  entityDashboard: '/entityDashboard',
  oktaCallBack: '/oktaCallBack'
};

export class AppStackRoot extends Component {

  startPage = (props, context) => {
    let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
    if (localStorageData && localStorageData.data && localStorageData.data.access_token) {
      if (localStorageData.data.userInfo.serviceProviderTypeId === ENTITY_USER) {
        return <PrivateRoute path={Path.entityDashboard} component={EntityDashboard} />
      } else {
        return <PrivateRoute path={Path.dashboard} permission={SCREENS.DASHBOARD} component={Dashboard} />

      }
    } else { return <Welcome /> }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Security
          issuer= {oktaIssuer}
          client_id= {oktaClientId}
          redirect_uri={window.location.origin + '/implicit/callback'}
          pkce={false}>
          <Switch>
            <Route exact path={Path.root} component={this.startPage} />
            <Route path="/implicit/callback" component={ImplicitCallback} /> 
            <Route path={Path.setPassword} component={SetPassword} />
            <Route path={Path.oktaCallBack} component={OktaCallBack} />
            <Route path={Path.verifyContact} component={VerifyContact} />
            <Route path={Path.verifyContactEntity} component={VerifyContact} />
            <Route path={Path.verifyEmail} component={VerifyUserID} />
            <Route path={Path.onboardSuccess} component={OnboardSuccess} />
            <Route path={Path.loginCallBack} component={LoginCallBack} />
            <Route path={Path.forgetPassword} component={ForgetPassword} />
            <Route path={Path.resetPassword} component={ResetPassword} />
            <Route path={Path.resetPasswordConfirmation} component={ResetPasswordConfirmation} />
            <Route path={Path.resetPasswordSuccess} component={ResetPasswordSuccess} />
            <PrivateRoute path={Path.ESPProfile} component={ESPProfile} />
            <PrivateRoute path={Path.visitNotification} component={VisitNotification} />
            <PrivateRoute path={Path.visitServiceList} permission={SCREENS.VISIT_PROCESSING} component={VisitServiceList} />
            <PrivateRoute path={Path.visitServiceDetails} permission={SCREENS.VISIT_PROCESSING} component={VisitServiceDetails} />
            <PrivateRoute path={Path.performTasks} permission={SCREENS.SERVICE_REQUEST} component={PerformTasks} />
            <PrivateRoute path={Path.feedback} permission={SCREENS.SERVICE_REQUEST} component={Feedback} />
            <PrivateRoute path={Path.summary} permission={SCREENS.SERVICE_REQUEST} component={Summary} />
            <PrivateRoute path={Path.teleHealth} permission={SCREENS.TELEHEALTH} component={TeleHealth} />
            <PrivateRoute path={Path.conversation} permission={SCREENS.ASYNC_MESSAGE} component={Conversation} />
            <PrivateRoute path={Path.messageSummary} permission={SCREENS.ASYNC_MESSAGE} component={ConversationSummary} />
            <PrivateRoute path={Path.profile} permission={SCREENS.PROFILE} component={Profile} />
            <PrivateRoute path={Path.dashboard} permission={SCREENS.DASHBOARD} component={
              JSON.parse(localStorage.getItem(USER_LOCALSTORAGE)) && JSON.parse(localStorage.getItem(USER_LOCALSTORAGE)).data.userInfo.serviceProviderTypeId === ENTITY_USER ? EntityDashboard : Dashboard
            } />
            <PrivateRoute path={Path.visitHistory} permission={SCREENS.VISIT_HISTORY} component={VisitHistory} />
            <PrivateRoute path={Path.visitSummaryDetail} permission={SCREENS.VISIT_HISTORY} component={VistSummary} />
            <PrivateRoute path={Path.payments} permission={SCREENS.PAYMENT_PROCESSING} component={Payments} />
            <PrivateRoute path={Path.paymentsuccess} permission={SCREENS.PAYMENT_PROCESSING} component={PaymentSuccess} />
            <PrivateRoute path={Path.paymentfailure} permission={SCREENS.PAYMENT_PROCESSING} component={PaymentFailure} />
            <PrivateRoute path={Path.patientProfile} component={PatientProfile} />
            <PrivateRoute path={Path.schedule} permission={SCREENS.VISIT_PROCESSING} component={Schedule} />
            <PrivateRoute
              path={Path.visitNotificationSettings}
              component={VisitNotificationSettings}
            />
            <PrivateRoute path={Path.assessment} component={Assessment} />
            <PrivateRoute path={Path.assessmentFeedback} component={AssessmentFeedback} />
            <PrivateRoute path={Path.assessmentSummary} component={AssessmentSummary} />
            <PrivateRoute path={Path.entityDashboard} component={EntityDashboard} />
          </Switch>
        </Security>
      </Router>
    );
  }
};

export default AppStackRoot;