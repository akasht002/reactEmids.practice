import React from 'react'
import { Route } from 'react-router'
import {
  Welcome,
  VerifyContact,
  SetPassword,
  VerifyUserID,
  OnboardSuccess
} from '../screens'
import { ConnectedRouter } from "react-router-redux";

export const Path = {
  root: '/',
  setPassword: '/setpassword',
  verifyEmail: '/verifyemail',
  verifyContact: '/verifycontact',
  onboardSuccess: '/onboardsuccess'
};

class AppStackRoot extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Route exact path={Path.root} component={Welcome} />
          <Route path={Path.setPassword} component={SetPassword} />
          <Route path={Path.verifyContact} component={VerifyContact} />
          <Route path={Path.verifyEmail} component={VerifyUserID} />
          <Route path={Path.onboardSuccess} component={OnboardSuccess} />
        </div>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;