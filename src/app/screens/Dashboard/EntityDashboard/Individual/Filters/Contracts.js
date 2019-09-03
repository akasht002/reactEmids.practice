import React, { Component } from "react";

class Contracts extends Component {

    render() {

        let contractDataTemplate = this.props.contracts && this.props.contracts.map((item, index) => {
            let catNum = index + 1;
            return (
                <div className="form-radio col-md-12 p-0" key={catNum}>
                    <input
                        className="form-radio-input"
                        name={"Contracts"}
                        id={"Contracts" + catNum}
                        type="radio"
                        checked={this.props.memberContractId === item.membershipId}
                        value={item.membershipId}
                        onChange={(e) => {
                            item.isChecked = e.target.checked;
                            this.props.handleContracts(item, e)
                        }
                        }
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