import React,{Component} from 'react';
import { Route,Switch } from 'react-router';
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
  VisitHistory,
  VistSummary
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
  loader: () => import('../screens/Login/LoginCallBack'),
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
  performTasks:'/performtasks',
  feedback:'/feedback',
  home:'/home',
  loginCallBack: '/loginCallBack',
  summary: '/summary',
  VisitHistory: '/visitHistory',
  visitSummaryDetail: '/visitSummary/:id',
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
            <Route path={Path.profile} component={Profile} />
            <Route path={Path.visitServiceList} component={VisitServiceList} />
            <Route path={Path.visitServiceDetails} component={VisitServiceDetails} />
            <Route path={Path.performTasks} component={PerformTasks} />
            <Route path={Path.feedback} component={Feedback} />
            <Route path={Path.summary} component={Summary} />
            <Route path={Path.loginCallBack} component={LoginCallBack}/>
            <Route path={Path.VisitHistory} component={VisitHistory}/>
            <Route exact path={Path.visitSummaryDetail} component={VistSummary} />
            <PrivateRoute path={Path.profile} component={Profile} />
          </Switch>
        </HashRouter>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;