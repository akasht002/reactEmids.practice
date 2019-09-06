import React, { Component } from "react";
import { GENDER_TYPE } from '../../../../../constants/constants'
import { CoreoRadio } from "../../../../../components";

class Gender extends Component {

    onChange = (item, e) => {
        item.isChecked = e.target.checked;
        this.props.handleGenderType(item, e)
    }

    render() {

        let genderDataTemplate = this.props.genderType && this.props.genderType.map((item, index) => {
            let catNum = index + 1;
            return (
                <div className="form-radio col-md-12 p-0" key={catNum}>
                    <CoreoRadio
                        className="form-radio-input"
                        name={"Gender"}
                        id={"Gender" + catNum}
                        checked={this.props.genderId === item.id}
                        value={item.id}
                        onChange={(e) => this.onChange(item, e)}
                    />
                    <label className="form-radio-label" htmlFor={"Gender" + catNum}>{item.name !== GENDER_TYPE.other ? item.name:GENDER_TYPE.notDisclosed }
                        <span className="RadioBoxIcon" /></label>
                </div>
            )
        });

        return (
            <div className="FeedbackAnswerWidget">
                {genderDataTemplate}
            </div>
        )
    }
}

export default Gender;