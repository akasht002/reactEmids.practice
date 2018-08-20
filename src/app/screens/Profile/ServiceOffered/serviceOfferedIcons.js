import React from "react";

class ServiceOfferedIcons extends React.Component {

    render() {

        if (this.props.type === 'view') {
            return (
                <li className={"SPIconServices SPIconServices" + (this.props.index + 1)}><span>{this.props.service.serviceTypeDescription}</span></li>
            )
        } else if (this.props.type === 'edit') {
            return (
                <div className="form-check form-check-inline selectType SPIconServicesCheckbox">
                    <input
                        id={this.props.service.serviceTypeId}
                        className="form-check-input"
                        type="checkbox"
                        value={this.props.service.serviceTypeDescription}
                        onChange={this.props.handleClick}
                        checked={this.props.service.isActive}
                        defaultChecked={this.props.service.isActive}
                    />
                    <label htmlFor={this.props.service.serviceTypeId}
                        className={"form-check-label SPIconServices" + (this.props.index + 1)}>
                        <span className="text-capitalize">
                            {this.props.service.serviceTypeDescription}
                        </span>
                    </label>
                </div>
            )
        }
    }
}

export default ServiceOfferedIcons;