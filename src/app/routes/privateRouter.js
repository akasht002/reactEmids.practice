import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Route,
    Redirect,
  } from "react-router-dom";
import { Path } from './';
import { checkUserData } from '../redux/auth/user/actions';
import { USER_LOCALSTORAGE } from '../constants/constants'; 
import {extractRole} from '../utils/roleUtility';

class PrivateRoute extends Component  {

  checkUserData = () => {
    if (!this.props.access_token) {
      this.props.checkUserData();
    }
    let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
    return (this.props.access_token) || (localStorageData && localStorageData.data && localStorageData.data.access_token);
  }

  renderMethod = () => {
    let authData = this.checkUserData();
    let permission = this.props.permission ? extractRole(this.props.permission).Read : true;
    let Component = this.props.component;
    return ((
      //  && permission
      (authData && permission ) ? (
        <Component {...this.props} /> ) : (
          <Redirect
          to={{
            pathname: Path.root,
            state: { from: this.props.location }
          }}
          />
      )
    ))
  }

  render() {
      return (
        <Route render={this.renderMethod}/>
      )
    }
};

const mapStateToProps = state => {
  let userState = state.authState.userState; 
  return {
    access_token: userState && userState.userData && userState.userData.access_token
  }
}

const mapDispatchToProps = dispatch => {
    return {
      checkUserData: () => dispatch(checkUserData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));