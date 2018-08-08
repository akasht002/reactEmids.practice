import React from "react";

import ServiceOfferedAccordian from '../ServiceOffered/serviceOfferedAccordian'

class ServiceOfferedContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedServiceTypes: []
        }
    }

    render() {
        let categories = this.props.name && this.props.name.map((category) => {
            return (
                <ServiceOfferedAccordian 
                    key={category.serviceCategoryId} 
                    category={category} 
                    type={this.props.type} 
                    allCheck={category.serviceTypeModel.every((service) => {
                        return service.isActive === true;
                    })}
                    isOpen={false}
                    handleClick={(serviceType) => {
                        var array = [...this.state.selectedServiceTypes];
                        const index = array.findIndex((service) => {
                            return (service.categoryId === serviceType.categoryId) &&
                                (service.serviceTypeId === serviceType.serviceTypeId) 
                        });
                        if (index > -1) {
                            array.splice(index, 1);
                        }
                        array.push(serviceType);

                        const serviceTypes = category.serviceTypeModel.map((service) => {
                            if (service.serviceTypeId === serviceType.serviceTypeId) {
                                return serviceType;
                            }
                            return service;
                        });
                        category.serviceTypeModel = serviceTypes;

                        this.setState({selectedServiceTypes: array});
                        this.props.handleClick(array, category);
                    }}
                    selectOrUnselectAll={(selected) => {
                        var array = this.state.selectedServiceTypes.filter((service) => {
                            return service.categoryId !== category.serviceCategoryId;
                        });

                        const serviceTypes = category.serviceTypeModel.map((service) => {
                            return {
                                ...service,
                                isActive: selected,
                                categoryId: category.serviceCategoryId
                            }
                        });
                        category.serviceTypeModel = serviceTypes;
                        this.setState({selectedServiceTypes: [...array, ...category.serviceTypeModel]});
                        this.props.handleClick([...array, ...category.serviceTypeModel], category);
                    }}
                />
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