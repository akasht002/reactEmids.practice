import React, { Component } from "react";

class ScheduleType extends Component {

    render() {

        let scheduleDataTemplate = this.props.scheduleType && this.props.scheduleType.map((item, index) => {
            let catNum = index + 1;
            return (
                <div className="form-radio col-md-12" key={catNum}>
                    <input
                        className="form-radio-input"
                        name={"Schedule"}
                        id={"Schedule" + catNum}
                        type="radio"
                        checked={item.isChecked}
                        value={item.id}
                        onChange={(e) => {
                            item.isChecked = e.target.checked;
                            this.props.handleScheduleType(item, e)
                        }}
                    />
                    <label className="form-radio-label" htmlFor={"Schedule" + catNum}>{item.name}
                        <span className="RadioBoxIcon" /></label>
                </div>
            )
        });

        return (
            <div className="FeedbackAnswerWidget">
                {scheduleDataTemplate}
            </div>
        )
    }
}

export default ScheduleType;