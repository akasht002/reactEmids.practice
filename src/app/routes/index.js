import React from 'react'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from "react-router-redux";
import { HashRouter } from 'react-router-dom';
import {
  Welcome,
  VerifyContact,
  SetPassword,
  VerifyUserID,
  OnboardSuccess,
  Profile,
  VisitServiceList,
  VisitServiceDetails,
  VisitServiceProcessing,
  PerformTasks,
  Feedback
} from '../screens'


export const Path = {
  root: '/',
  setPassword: '/setpassword',
  verifyEmail: '/verifyemail',
  verifyContact: '/verifycontact',
  onboardSuccess: '/onboardsuccess',
  profile: '/profile',
  visitServiceList: '/Visitservicelist',
  visitServiceDetails: '/visitservicedetails',
  visitServiceProcessing:'/visitserviceprocessing',
  performTasks:'/performtasks',
  feedback:'/feedback'
};

class AppStackRoot extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <HashRouter>
          <Switch>
            <Route exact path={Path.root} component={Welcome} />
            <Route path={Path.setPassword} component={SetPassword} />
            <Route path={Path.verifyContact} component={VerifyContact} />
            <Route path={Path.verifyEmail} component={VerifyUserID} />
            <Route path={Path.onboardSuccess} component={OnboardSuccess} />
            <Route path={Path.profile} component={Profile} />
            <Route path={Path.visitServiceList} component={VisitServiceList} />
            <Route path={Path.visitServiceDetails} component={VisitServiceDetails} />
            <Route path={Path.visitServiceProcessing} component={VisitServiceProcessing} />
            <Route path={Path.performTasks} component={PerformTasks} />
            <Route path={Path.feedback} component={Feedback} />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;