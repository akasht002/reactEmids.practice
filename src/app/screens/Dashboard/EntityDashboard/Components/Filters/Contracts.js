import React, { Component } from "react";
import { CoreoRadio } from "../../../../../components";

class Contracts extends Component {

    onChange = (item, e) => {
        item.isChecked = e.target.checked;
        this.props.handleContracts(item)
    }

    render() {

        let contractDataTemplate = this.props.contracts && this.props.contracts.map((item, index) => {
            let catNum = index + 1;
            return (
                <div className="form-radio col-md-12 p-0" key={catNum}>
                    <CoreoRadio
                        className="form-radio-input"
                        name={"Contracts"}
                        id={"Contracts" + catNum}
                        checked={this.props.memberContractId === item.membershipId}
                        value={item.membershipId}
                        onChange={e => this.onChange(item, e)}
                    />
                    <label className="form-radio-label" htmlFor={"Contracts" + catNum}>{item.membershipName}
                        <span className="RadioBoxIcon" /></label>
                </div>
            )
        });

        return (
            <div className="FeedbackAnswerWidget">
                {contractDataTemplate}
            </div>
        )
    }
}

export default Contracts;