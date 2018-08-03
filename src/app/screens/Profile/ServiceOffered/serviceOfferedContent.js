import React from "react";

import ServiceOfferedAccordian from '../ServiceOffered/serviceOfferedAccordian'

class ServiceOfferedContent extends React.Component {

    constructor(props) {
        super(props);
        this.serviceTypes = [];
    }

    handleClick = (serviceTypes) => {
        this.serviceTypes.push(serviceTypes);
        this.props.handleClick(this.serviceTypes);
    }

    render() {

        let categories = this.props.name && this.props.name.map((category) => {
            return (
                <ServiceOfferedAccordian key={category.serviceCategoryId} category={category} type={this.props.type} selectedServiceTypes={this.handleClick} />
            )
        });

        return (
            <div>
                {categories}
            </div>
        )
    }
}

export default ServiceOfferedContent;