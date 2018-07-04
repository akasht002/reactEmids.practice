import React from 'react'
import {Route } from 'react-router'
import {
  Welcome,
  VerifyContact,
  SetPassword,
  VerifyUserID,
} from '../screens'
import { ConnectedRouter } from "react-router-redux";

class AppStackRoot extends React.Component {
    render() {
      return (
        <ConnectedRouter history={this.props.history}>
            <div>
                <Route exact path="/" component={Welcome}/>                
                <Route path="/setPassword" component={SetPassword}/>                
                <Route path="/verifycontact" component={VerifyContact}/>
                <Route path="/verifyemail" component={VerifyUserID}/>
            </div>
        </ConnectedRouter>
      );
    }
  }

export default AppStackRoot;