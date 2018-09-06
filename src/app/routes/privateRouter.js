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
    if (!this.props.userData) {
      this.props.checkUserData();
    }
    let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
    return this.props.userData || (localStorageData && localStorageData.serviceData && localStorageData.serviceData.serviceProviderID);
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
      userData: state.authState.userState.userData && state.authState.userState.userData.serviceData && state.authState.userState.userData.serviceData.serviceProviderID
    }
}

const mapDispatchToProps = dispatch => {
    return {
      checkUserData: () => dispatch(checkUserData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));

  