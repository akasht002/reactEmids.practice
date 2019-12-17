import React from "react";

export class ServiceOfferedIcons extends React.Component {

    render() {

        if (this.props.type === 'view') {
            return (
                <li className={"SPIconServices SPIconServices" + (this.props.service.serviceTypeId)}><span>{this.props.service.serviceTypeDescription}</span></li>
            )
        } else if (this.props.type === 'edit') {
            return (
                <div className="form-check form-check-inline selectType SPIconServicesCheckbox theme-primary-light">
                    <input
                        id={'_'+ this.props.service.serviceTypeId}
                        className="form-check-input"
                        type="checkbox"
                        value={this.props.service.serviceTypeDescription}
                        onChange={e => {
                           
                            this.props.handleClick(e)}}
                        checked={this.props.service.isActive}
                        defaultChecked={this.props.service.isActive}
                    />
                    <label htmlFor={'_'+ this.props.service.serviceTypeId}
                        className={"form-check-label SPIconServices" + (this.props.service.serviceTypeId)}>
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