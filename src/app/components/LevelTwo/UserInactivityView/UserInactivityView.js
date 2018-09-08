import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import {ModalPopup} from '../../';
import './styles.css';

class UserInactivityView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInactivityModal: false
        }
    }

    onInactivity = () => {
        this.setState({
            showInactivityModal: true
        });
    }

    render() {
        return (
            <IdleTimer
                 onIdle={this.onInactivity}
                 timeout={this.props.timeForInactivity}
            >
                {this.props.children}
                <ModalPopup
                     className="modal-sm"
                     headerFooter="d-none"
                     centered={true}
                     isOpen={this.state.showInactivityModal}
                     btn1="OK"
                     onConfirm={() => {
                         this.setState({
                             showInactivityModal: !this.state.showInactivityModal,
                         })
                         this.props.inactiveUser();
                     }}
                     ModalBody={<span>Your session has timed out due to inactivity. Please log in to continue</span>}
                />
            </IdleTimer>
        );
    }
}

export default UserInactivityView;