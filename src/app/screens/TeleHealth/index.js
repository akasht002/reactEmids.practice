import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import TeleHealthWidget from './TeleHealthWidget';
import { generateToken } from '../../redux/telehealth/actions';
import './styles.css';
import { getUserInfo } from '../../services/http';
import { GetParticipantByConferenceId, clearLinkedParticipants, leaveVideoConference } from '../../redux/telehealth/actions';

class TeleHealth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Participants: false,
            width: '',
            height: ''
        }
    }

    componentDidMount() {
        this.updateHeight();
        window.addEventListener("load", this.updateHeight);
        window.addEventListener("resize", this.updateHeight);
        this.props.getParticipantByConferenceId();
    }

    componentDidUpdate() {
        this.updateHeight();
    }

    componentWillUnmount() {
        this.props.clearLinkedParticipants();
    }

    updateHeight = () => {
        if (window.innerWidth <= '768' && window.innerWidth >= '479') {
            this.setState({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }
        if (window.innerWidth <= '480') {
            this.setState({
                height: window.innerHeight + 30,
                width: window.innerWidth,
            })
        }
    }

    componentWillMount() {
        this.props.generateToken();
    }

    render() {
        return (
            <AsideScreenCover>
                <div className='TeleHealth ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Video Conference</h5>
                        <span className="TeleHealthViewParticipants" onClick={() => { }} />
                    </div>
                </div>
                <div className={'col-md-12 TeleHealthWidget ' + this.state.Participants}
                    style={{ 'height': `${this.state.height - 150}px` }}>
                    {this.props.telehealthToken &&
                        <TeleHealthWidget
                            telehealthToken={this.props.telehealthToken}
                            roomId={this.props.roomId}
                            participantList={this.props.participantList}
                        />
                    }
                </div>
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        generateToken: () => dispatch(generateToken()),
        getParticipantByConferenceId: ()=> dispatch(GetParticipantByConferenceId()),
        clearLinkedParticipants: () => dispatch(clearLinkedParticipants()),
        leaveRoom: () => dispatch(leaveVideoConference(false))
    }
}

function mapStateToProps(state) {
    return {
        telehealthToken: state.telehealthState.token,
        roomId: state.telehealthState.roomId,
        participantList: state.telehealthState.linkedParticipants,
        loggedInUser: getUserInfo()
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeleHealth));
