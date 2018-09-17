import React, { Component } from 'react';
import '../styles.css';

const images = require.context('../../../assets/images/telehealth/avatar', true)
const imagePath = (name) => images(name, true)

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
                        <img alt="" src={imagePath("./user-1.jpg")}
                            className="avatarImage" />
                        <div className={"memberType memT-"+ this.props.participant.participantType }>{this.props.participant.participantType}</div>
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