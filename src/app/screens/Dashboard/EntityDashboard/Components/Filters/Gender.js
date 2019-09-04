import React, { Component } from "react";
import { OTHER,OTHERS } from '../../../../../constants/constants'

class Gender extends Component {

    render() {

        let genderDataTemplate = this.props.genderType && this.props.genderType.map((item, index) => {
            let catNum = index + 1;
            return (
                <div className="form-radio col-md-12 p-0" key={catNum}>
                    <input
                        className="form-radio-input"
                        name={"Gender"}
                        id={"Gender" + catNum}
                        type="radio"
                        checked={this.props.genderId === item.id}
                        value={item.id}
                        onChange={(e) => {
                            item.isChecked = e.target.checked;
                            this.props.handleGenderType(item, e)
                        }
                        }
                    />
                    <label className="form-radio-label" htmlFor={"Gender" + catNum}>{item.name !== OTHER ? item.name:OTHERS }
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