import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {Preloader, UserInactivityView} from '../../';
import { onLogout } from '../../../redux/auth/logout/actions';
import './styles.css';

class ScreenCover extends Component {
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

export function mapStateToProps(state) {
    return {
        timeForInactivity: state.authState.userState.userData && state.authState.userState.userData.autoLogoutTime,
        accessToken: state.oidc.user && state.oidc.user.access_token
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        inactiveUser: () => dispatch(onLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCover); 