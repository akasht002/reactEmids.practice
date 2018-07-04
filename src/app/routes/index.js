import React from 'react'
import { Route } from 'react-router'
import {
  Welcome,
  VerifyContact,
  SetPassword,
  VerifyUserID,
} from '../screens'
import { ConnectedRouter } from "react-router-redux";

export const Path = {
  root: '/',
  setPassword: '/setPassword',
  verifyEmail: '/verifyemail',
  verifycontact: '/verifycontact'
};

class AppStackRoot extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Route exact path={Path.root} component={Welcome} />
          <Route path={Path.setPassword} component={SetPassword} />
          <Route path={Path.verifycontact} component={VerifyContact} />
          <Route path={Path.verifyEmail} component={VerifyUserID} />
        </div>
      </ConnectedRouter>
    );
  }
};

export default AppStackRoot;