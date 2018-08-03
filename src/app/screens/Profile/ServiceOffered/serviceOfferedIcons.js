import React from "react";

//import ServiceOfferedAccordian from '../ServiceOffered/serviceOfferedAccordian'

class ServiceOfferedIcons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    handleClick = (e) => {
        // this.serviceType.push({
        //     serviceTypeId: e.target.id,
        //     serviceTypeDescription: e.target.value,
        //     isActive: e.target.checked,
        //     categoryId: this.props.categoryId
        // })
        this.setState({ isActive: !this.state.isActive });
        this.props.handleClick({
            serviceTypeId: e.target.id,
            serviceTypeDescription: e.target.value,
            isActive: e.target.checked,
            categoryId: this.props.categoryId
        });
    }

    componentDidMount() {
        this.setState({
            isActive: this.props.service.isActive
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isActive: nextProps.selectAllCheck });
    }

    render() {
        let checkboxCount = '';

        if (this.props.type === 'view') {
            checkboxCount = <span className={'SPServiceCount'}>{this.props.index + 1}</span>;
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
                        //data-id={this.props.category.serviceCategoryId}
                        onChange={this.handleClick}
                        checked={this.state.isActive}
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

        // return (
        //     <div>

        //     </div>
        // )
    }
}

export default ServiceOfferedIcons;