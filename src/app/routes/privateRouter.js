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

class PrivateRoute extends Component  {

  checkUserData = () => {
    if (!this.props.user_token) {
      this.props.checkUserData();
    }
    let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
    return this.props.user_token || (localStorageData && localStorageData.data && localStorageData.data.access_token);
  }

  renderMethod = () => {
    let authData = this.checkUserData();
    let Component = this.props.component;
    return ((
      authData ? (
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
    return {
      user_token: state.authState.userState.userData && state.authState.userState.userData.data && state.authState.userState.userData.data.access_token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      checkUserData: () => dispatch(checkUserData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));

  