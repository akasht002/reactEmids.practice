import React, {Component} from 'react';
import './styles.css';

export default class TeleHealthVideoControls extends Component {

    render() {
        return (
            <div className="TeleHealthVideoControls">
                <div className="TeleHealthControlsItem">
                    <span className={"TeleHealthOptionLink " + (this.props.isMuteAudio ? 'off' : '')}><i className="TeleHealthIcons MuteAudio" onClick={this.props.controlAudio}/></span>
                    {this.props.isMuteAudio ? <span>Unmute Audio</span> : <span>Mute Audio</span>}
                </div>
                <div className="TeleHealthControlsItem">
                    <span className={"TeleHealthOptionLink " + (this.props.isHiddenVideo ? 'off' : '')}><i className="TeleHealthIcons HideVideo" onClick={this.props.controlVideo}/></span>
                    {this.props.isHiddenVideo ? <span>Show Video</span> : <span>Hide Vidio</span>}
                </div>
                <div className="TeleHealthControlsItem FullScreenBtn">
                    <span className={"TeleHealthOptionLink " + (this.props.FullScreen ? 'off' : '')} onClick={this.props.ToggleFullScreen}><i className="TeleHealthIcons NormalScreen"/></span> 
                    {this.props.FullScreen ? <span>Normal Screen</span> : <span>Full Screen</span>}
                </div>
                <div className="TeleHealthControlsItem">
                    <span className={"TeleHealthOptionLink " + (this.props.initiator ? '' : 'end')}><i className="TeleHealthIcons LeaveConference" onClick={this.props.leaveRoom}/></span>
                    <span>Leave Conference</span>
                </div>
                {this.props.initiator && <div className="TeleHealthControlsItem">
                    <span className="TeleHealthOptionLink end"><i className="TeleHealthIcons EndConference" onClick={this.props.endConference}/></span>
                    <span>End Conference</span>
                </div>}
            </div>
        );
    }
}