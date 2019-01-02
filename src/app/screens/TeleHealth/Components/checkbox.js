import React, { Component } from 'react';
import '../styles.css';

class CheckBox extends Component {
    render() {
        return (
            <div className="form-check">
                <label className="form-check-label m-0 width100 checkBoxCenter">
                    {this.props.children}
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.props.participant.userId}
                        id={this.props.participant.userId}
                        checked={this.props.isChecked}
                        onChange={this.props.onCheckParticipant.bind(this, this.props.participant)} />

                    <div className={"avatarContainer"}>
                        <img alt="" src={this.props.participant.thumbNail ? this.props.participant.thumbNail : require("../../../assets/images/Blank_Profile_icon.png")}
                            className="avatarImage" />
                        <div className={"memberType memT-"+ (this.props.participant.participantType === 'IG' ? 'I' : this.props.participant.participantType) }>{this.props.participant.participantType === 'IG' ? 'I' : this.props.participant.participantType}</div>
                    </div>
                    <div className="participantName participantSearchName">
                        {this.props.participant.firstName + " " + this.props.participant.lastName}
                    </div>
                    <span className="participantsCheckboxIcon" />
                </label>
            </div>
        )
    }

};

export default CheckBox;