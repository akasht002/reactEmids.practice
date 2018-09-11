import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {Preloader, UserInactivityView} from '../../';
import { onLogout } from '../../../redux/auth/logout/actions';
import {getUserInactiveTimeout} from '../../../redux/auth/user/actions';
import './styles.css';

class ScreenCover extends Component {

    componentDidMount() {
        if (!this.props.timeForInactivity) {
            this.props.getUserInactiveTimeout();
        }
    }

    render() {
        return(
            <section className="d-flex">
                {this.props.accessToken ? 
                    <UserInactivityView
                        timeForInactivity={this.props.timeForInactivity}
                        inactiveUser={this.props.inactiveUser}
                    > 
                        {this.props.children}
                        {this.props.isLoading && <Preloader/>}
                    </UserInactivityView> :
                    <Fragment>
                        {this.props.children}
                        {this.props.isLoading && <Preloader/>}
                    </Fragment>
                }
            </section>
        );
    }
};

ScreenCover.propTypes = {
    children: PropTypes.any,
    backgroundColor: PropTypes.string
}

function mapStateToProps(state) {
    return {
        timeForInactivity: state.authState.userState.autoLogoutTime,
        accessToken: state.oidc.user && state.oidc.user.access_token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        inactiveUser: () => dispatch(onLogout()),
        getUserInactiveTimeout: () => dispatch(getUserInactiveTimeout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCover); 