// import React, { Component } from 'react';
import React, { Component, lazy, Suspense  } from 'react'
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from "react-router-redux";
import { HashRouter } from 'react-router-dom';
// import Loadable from 'react-loadable';
import {SCREENS,USER_LOCALSTORAGE} from '../constants/constants';
import LoginCallBack from '../screens/Authentication/Login/LoginCallBack'
import {
  // VerifyContact,
  // SetPassword,
  // VerifyUserID,
  // OnboardSuccess,
  // Profile,
  // VisitServiceList,
  // VisitServiceDetails,
  // PerformTasks,
  // Feedback,
  // Summary,
  // ForgetPassword,
  // ResetPassword,
  // ResetPasswordSuccess,
  // ResetPasswordConfirmation,
  // Dashboard,
  // VisitHistory,
  // VistSummary,
  
  Welcome,

  // Payments,
  // PaymentSuccess,
  // PaymentFailure,

  // TeleHealth,
  // ConversationSummary,
  // Conversation,
  // PatientProfile,
  // VisitNotification,
  // VisitNotificationSettings,
  // ESPProfile
} from '../screens';
import PrivateRoute from './privateRouter';

const Dashboard = lazy(() => import('../screens/Dashboard'));
const VisitServiceList = lazy(() => import('../screens/VisitSelection/VisitServiceList'));
const SetPassword = lazy(() => import('../screens/Onboarding/SetPassword'));
const VerifyContact = lazy(() => import('../screens/Onboarding/VerifyContact'));
const VerifyUserID = lazy(() => import('../screens/Onboarding/VerifyUserID'));
const OnboardSuccess = lazy(() => import('../screens/Onboarding/OnboardSuccess'));
const Profile = lazy(() => import('../screens/Profile/Profile'));
const VisitServiceDetails = lazy(() => import('../screens/VisitSelection/VisitServiceDetails'));
const PerformTasks = lazy(() => import('../screens/VisitSelection/VisitServiceProcessing/PerformTasks'));
const Feedback = lazy(() => import('../screens/VisitSelection/VisitServiceProcessing/Feedback'));
const Summary = lazy(() => import('../screens/VisitSelection/VisitServiceProcessing/Summary'));

const ForgetPassword = lazy(() => import('../screens/Authentication/ForgetPassword'));
const ResetPassword = lazy(() => import('../screens/Authentication/ResetPassword'));
const ResetPasswordSuccess = lazy(() => import('../screens/Authentication/ResetPasswordSuccess'));
const ResetPasswordConfirmation = lazy(() => import('../screens/Authentication/ResetPasswordConfirmation'));

const VisitHistory = lazy(() => import('../screens/VisitHistory'));
const VistSummary = lazy(() => import('../screens/VisitHistory/VisitSummary'));

const Payments = lazy(() => import('../screens/VisitSelection/VisitServiceProcessing/Payments'));
const PaymentSuccess = lazy(() => import('../screens/VisitSelection/VisitServiceProcessing/Payments/paymentSuccess'));
const PaymentFailure = lazy(() => import('../screens/VisitSelection/VisitServiceProcessing/Payments/paymentFailure'));

const TeleHealth = lazy(() => import('../screens/TeleHealth'));
const ConversationSummary = lazy(() => import('../screens/AsyncMessage/ConversationSummary'));
const Conversation = lazy(() => import('../screens/AsyncMessage/Conversation'));

const PatientProfile = lazy(() => import('../screens/PatientProfile/Profile'));
const VisitNotification = lazy(() => import('../screens/VisitProcessingNotification/VisitNotification'));
const VisitNotificationSettings = lazy(() => import('../screens/VisitProcessingNotification/VisitNotificationSettings'));
const ESPProfile = lazy(() => import('../screens/ESPProfile/Profile'));

// function Loading({ error }) {
//   if (error) {
//     return 'Oh nooess!';
//   } else {
//     return <h3>Loading...</h3>;
//   }
// }

// const LoginCallBack = Loadable({
//   loader: () => import('../screens/Authentication/Login/LoginCallBack'),
//   loading: Loading
// });

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
  ESPProfile:'/espProfile'
};

class AppStackRoot extends Component {

  startPage = (props, context) => {
    let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
    if (localStorageData && localStorageData.data && localStorageData.data.access_token) {     
      return <PrivateRoute path={Path.dashboard} permission={SCREENS.DASHBOARD} component={Dashboard} />      
    } else{ return <Welcome/>}      
   }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
      
        <HashRouter><Suspense fallback={<h2>Loading....</h2>}>
          <Switch>
            <Route exact path={Path.root} component={this.startPage} />
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
            <PrivateRoute path={Path.dashboard} permission={SCREENS.DASHBOARD} component={Dashboard} />
            <PrivateRoute path={Path.visitHistory} permission={SCREENS.VISIT_HISTORY} component={VisitHistory}/>            
            <PrivateRoute path={Path.visitSummaryDetail} permission={SCREENS.VISIT_HISTORY} component={VistSummary} />
            <PrivateRoute path={Path.payments} permission={SCREENS.PAYMENT_PROCESSING} component={Payments} />
            <PrivateRoute path={Path.paymentsuccess} permission={SCREENS.PAYMENT_PROCESSING} component={PaymentSuccess} />
            <PrivateRoute path={Path.paymentfailure} permission={SCREENS.PAYMENT_PROCESSING} component={PaymentFailure} />
            <PrivateRoute path={Path.patientProfile} component={PatientProfile} />
            <PrivateRoute
              path={Path.visitNotificationSettings}
              component={VisitNotificationSettings}
            />
          </Switch></Suspense>
        </HashRouter>
        
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;