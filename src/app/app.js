import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';

class App extends Component {
  render() {
    return (
      <AppStackRoot history={this.props.history} />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState
  };
}

export default connect(mapStateToProps)(App);

