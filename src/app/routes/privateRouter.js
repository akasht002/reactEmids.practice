import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Route,
    Redirect,
  } from "react-router-dom";
import { Path } from './';
import { checkUserData } from '../redux/auth/user/actions';

class PrivateRoute extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      userData: ''
    }
  }
  
  componentDidMount() {
    this.props.checkUserData();
  }

  checkUserData = () => {
    return this.props.user_token || JSON.parse(localStorage.getItem('userData')).data.access_token;
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
      user_token: state.authState.userState.userData && state.authState.userState.userData.authData && state.authState.userState.userData.authData.data.access_token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      checkUserData: () => dispatch(checkUserData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));

  