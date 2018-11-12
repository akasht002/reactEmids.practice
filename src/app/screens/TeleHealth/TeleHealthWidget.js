import React, { Component } from 'react';
import Slider from "react-slick"
import Video from 'twilio-video';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {ModalPopup} from '../../components';
import { connect } from 'react-redux';
import TeleHealthVideoControls from './TeleHealthVideoControls';
import TeleHealthParticipants from './TeleHealthParticipants';
import TeleHealthInviteParticipants from './TeleHealthInviteParticipants';
import {TeleHealthSettings} from '../../constants/config';
import { leaveVideoConference, GetAllParticipants, AddParticipantsToVideoConference, endConference, GetParticipantByConferenceId } from '../../redux/telehealth/actions';
import './styles.css';
import _ from 'lodash'
import { Path } from '../../routes';
import {push} from '../../redux/navigation/actions'

class TeleHealthWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddParticipants: false,
            FullScreen: false,
            activeRoom: '',
            localMediaAvailable: false,
            hasJoinedRoom: false,
            previewTracks: null,
            isMuteAudio: false,
            isHiddenVideo: false,
            videoAdded: false,
            activeParticipantIdentity: '',
            sessionInactivePopup: false,
            timeStartedSeconds: 0,
            timeStarted: '',
            currentDateTime: moment().format('MM/DD/YYYY HH:mm'),
            showLeaveConfModal: false
        };
        this.interval = null;
        this.leaveTimeout = null;
        this.inactiveSession = null;
    }

    componentDidMount() {
        if (this.props.roomId) {
            this.joinRoom();
        } else {
            this.props.goToDashBoard()
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.leaveTimeout);
        clearTimeout(this.inactiveSession);
        if (this.state.hasJoinedRoom) {
            this.leaveRoom(this.state.hasJoinedRoom);
        }
    }

    joinRoom = () => {
        let connectOptions = {
            name: this.props.roomId
        };

        if (this.state.previewTracks) {
            connectOptions.tracks = this.state.previewTracks;
        }

        Video.connect(this.props.telehealthToken, connectOptions).then(this.roomJoined, error => {
            alert('Could not connect to Twilio: ' + error.message);
        });
    }

    attachTracks(tracks, container) {
        _.forEach(tracks,track => {
            container.appendChild(track.attach());
        });
    }

    attachParticipantTracks(participant, container) {
        var tracks = Array.from(participant.tracks.values());
        this.attachTracks(tracks, container);
    }

    detachTracks = (tracks) => {
        let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        _.forEach(tracks,track => {
            if (isSafari) {
                _.forEach(track._attachments, function (element) {
                    element.remove();
                });
            } else {
                _.forEach(track.detach(),detachedElement => {
                    detachedElement.remove();
                });
            }
        });
    }

    detachParticipantTracks = (participant) => {
        var tracks = Array.from(participant.tracks.values());
        this.detachTracks(tracks);
    }

    leaveRoom = (data) => {
        if (this.state.activeRoom) {
            this.state.activeRoom.disconnect();
        }
        this.setState({
            hasJoinedRoom: false,
            localMediaAvailable: false
        });
        this.props.leaveVideoConference(data);
    }

    endConference = () => {
        if (this.state.activeRoom) {
            this.state.activeRoom.disconnect();
        }
        this.setState({
            hasJoinedRoom: false,
            localMediaAvailable: false
        });
        this.props.endConference();
    }

    checkSessionInactive = () => {
       this.inactiveSession = setTimeout(() => {
        this.setState({sessionInactivePopup: true});
       }, TeleHealthSettings.sessionInactiveInMs);
    }

    checkMaxVideoCallHour = () => {
        this.leaveTimeout = setTimeout(() => {
            this.leaveRoom();
        }, TeleHealthSettings.maxVideoCallHourInMs);
    }

    checkTimeStarted = () => {
        this.interval = setInterval(() => {
            let timeStarted = moment("2015-01-01").startOf('day')
            .seconds(this.state.timeStartedSeconds + 1)
            .format('HH:mm:ss');
            this.setState({
                timeStarted: timeStarted, 
                timeStartedSeconds: this.state.timeStartedSeconds + 1,
                currentDateTime: moment().format('MM/DD/YYYY HH:mm')
            });
        }, 1000);
    }

    roomJoined = (room) => {
        this.setState({
            activeRoom: room,
            localMediaAvailable: true,
            hasJoinedRoom: true
        });
        this.checkSessionInactive();
        this.checkMaxVideoCallHour();
        this.checkTimeStarted()
        var previewContainer = this.refs.localMediaMe;
        if (!previewContainer.querySelector('video')) {
            this.attachParticipantTracks(room.localParticipant, previewContainer);
        }
        var fullWidthMediaContainer = this.refs.fullWidthMedia;
        if (!fullWidthMediaContainer.querySelector('video')) {
            this.attachParticipantTracks(room.localParticipant, fullWidthMediaContainer);
        }

        this.setState({ activeParticipantIdentity: room.localParticipant.identity });

        _.forEach(room.participants,participant => {
            this.setState({ videoAdded: true });
        });

        room.on('trackAdded', (track, participant) => {
            this.setState({ videoAdded: true });
        });

        room.on('trackRemoved', (track, participant) => {
            this.detachTracks([track]);
            this.setState({ videoAdded: false });
        });

        room.on('participantConnected', participant => {

        });

        room.on('participantDisconnected', participant => {
            this.detachParticipantTracks(participant);
            this.setState({ videoAdded: false });
        });

        room.on('disconnected', () => {
            if (this.state.previewTracks) {
                _.forEach(this.state.previewTracks,track => {
                    track.stop();
                });
            }
            this.detachParticipantTracks(room.localParticipant);
            _.forEach(room.participants,this.detachParticipantTracks);
            this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
        });
    }

    DisplayInviteParticipantsList = () => {
        this.setState({
            AddParticipants: !this.state.AddParticipants
        });
        this.props.getParticipantByConferenceId();
    };

    ToggleFullScreen() {
        this.setState({
            FullScreen: !this.state.FullScreen
        });
    }

    controlAudio = () => {
        _.forEach(this.state.activeRoom.localParticipant.audioTracks,(audioTrack) => {
            this.state.isMuteAudio ? audioTrack.enable() : audioTrack.disable();
        });
        this.setState({ isMuteAudio: !this.state.isMuteAudio });
    }

    controlVideo = () => {
        _.forEach(this.state.activeRoom.localParticipant.videoTracks,(videoTrack) => {
            this.state.isHiddenVideo ? videoTrack.enable() : videoTrack.disable();
        });
        this.setState({ isHiddenVideo: !this.state.isHiddenVideo });
    }

    participantClick = (participant) => {
        var fullWidthMediaContainer = this.refs.fullWidthMedia;
        this.attachParticipantTracks(participant, fullWidthMediaContainer);
        this.setState({ activeParticipantIdentity: participant.identity });
    }

    render() {

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            variableWidth: true,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };

        let sliderCategory = [];
        this.state.activeRoom && _.forEach(this.state.activeRoom.participants,(participant) => {
            var tracks = Array.from(participant.tracks.values());
            let cat = <div className='TeleHealthParticipants' onClick={() => { this.participantClick(participant) }}>
                <input id={'Participants' + participant.sid} type='radio' name='Participants' value={participant.sid} />
                <label className='ParticipantsLinkLabel' htmlFor={'Participants' + participant.sid}>
                    <div className="VideoBackground" />
                    <span className="ParticipantSliderName">{participant.identity}</span>
                    <div ref={"remoteVideo" + participant.sid}></div>
                </label>
            </div>
            sliderCategory.push(cat);
            setTimeout(() => {
                _.forEach(tracks,track => {
                    this.refs['remoteVideo' + participant.sid].appendChild(track.attach());
                });
            }, 1000)
        })

        return (
            <div className="card TeleHealthContent">
                <div className={"TeleHealthItem Left " + this.state.FullScreen}>
                    <div className="TeleHealthVideoContainer">
                        <div className="VideoBackground" />
                        <div className="TeleHealthHeader">
                            <div className="TeleHealthDate">
                                <span className="RoomId">Room ID<i>{this.props.roomId}</i></span>
                                <div className='TeleHealthParticipants' onClick={() => { this.participantClick(this.state.activeRoom.localParticipant) }}>
                                    <input id='Participants' type='radio' name='Participants' value='0' />
                                    <label className='ParticipantsLinkLabel' htmlFor='Participants'>
                                        <div className="VideoBackground itsme" />
                                        <span className="ParticipantSliderName">Me</span>
                                        <div className='TeleHealthVideo itsMe' ref="localMediaMe"></div>
                                    </label>
                                </div>
                            </div>
                            <span className="TeleHealthProfileName">{this.state.activeParticipantIdentity}</span>
                            <span className="TeleHealthTime">{this.state.timeStarted}<i>{this.state.currentDateTime}</i></span>
                        </div>
                        <div className='TeleHealthVideo' ref="fullWidthMedia"></div>
                        <Slider {...settings} className="TeleHealthParticipantSlider">
                            {sliderCategory}
                        </Slider>
                    </div>
                    <TeleHealthVideoControls
                        FullScreen={this.state.FullScreen}
                        ToggleFullScreen={this.ToggleFullScreen.bind(this)}
                        controlAudio={this.controlAudio}
                        isMuteAudio={this.state.isMuteAudio}
                        isHiddenVideo={this.state.isHiddenVideo}
                        controlVideo={this.controlVideo}
                        leaveRoom={() => {this.setState({showLeaveConfModal: true})}}
                        endConference={this.endConference}
                        initiator={this.props.initiator}
                    />
                </div>
                <div className="TeleHealthItem Right">
                    <TeleHealthParticipants
                        participantList={this.props.existingParticipantList}
                        ToggleAddParticipantsListView={this.DisplayInviteParticipantsList}
                    />
                    <TeleHealthInviteParticipants
                        participantList={this.props.conferenceParticipants}
                        AddParticipants={this.state.AddParticipants}
                        ToggleAddParticipantsListView={this.DisplayInviteParticipantsList}
                        getAllParticipants={this.props.getAllParticipants}
                        addParticipantsToConference={this.props.addParticipantsToConference}
                    />
                </div>
                <ModalPopup
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                    isOpen={this.state.showLeaveConfModal}
                    btn1="Continue"
                    btn2="Leave"
                    onConfirm={() => {
                        this.setState({
                            showLeaveConfModal: !this.state.showLeaveConfModal,
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            showLeaveConfModal: !this.state.showLeaveConfModal,
                        })
                        this.leaveRoom()
                    }}
                    ModalBody={<span>This will leave you out from ongoing video conference. Are you sure you want to continue?</span>}
               />
               <ModalPopup
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                    isOpen={this.state.sessionInactivePopup}
                    btn1="Continue"
                    btn2="Leave"
                    onConfirm={() => {
                        this.setState({
                            sessionInactivePopup: !this.state.sessionInactivePopup,
                        })
                        this.checkSessionInactive();
                    }}
                    onCancel={() => {
                        this.setState({
                            sessionInactivePopup: !this.state.sessionInactivePopup,
                        })
                        this.leaveRoom()
                    }}
                    ModalBody={<span>Your time has elapsed. Are you sure you want to continue with the conference?</span>}
               />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        leaveVideoConference: (checkRoute) => dispatch(leaveVideoConference(checkRoute)),
        getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
        addParticipantsToConference: (data) => dispatch(AddParticipantsToVideoConference(data)),
        endConference: () => dispatch(endConference()),
        getParticipantByConferenceId: () => dispatch(GetParticipantByConferenceId()),
        goToDashBoard: () => dispatch(push(Path.dashboard))
    }
};

function mapStateToProps(state) {
    return {
        existingParticipantList: state.telehealthState.participantsByConferenceId,
        conferenceParticipants: state.telehealthState.linkedParticipants,
        initiator: state.telehealthState.initiator
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeleHealthWidget));