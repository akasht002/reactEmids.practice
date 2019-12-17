import React from "react";

import ServiceOfferedAccordian from '../ServiceOffered/serviceOfferedAccordian'

export class ServiceOfferedContent extends React.Component {

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
                    toggleCollapse={() => {
                        this.props.toggleCollapse(category)
                    }}
                    handleClick={(serviceType) => {
                        let selectedServiceType = [...this.state.selectedServiceTypes];
                        const index = selectedServiceType.findIndex((service) => {
                            return (service.categoryId === serviceType.categoryId) &&
                                (service.serviceTypeId === serviceType.serviceTypeId) 
                        });
                        if (index > -1) {
                            selectedServiceType.splice(index, 1);
                        }
                        selectedServiceType.push(serviceType);

                        const serviceTypes = category.serviceTypeModel.map((service) => {
                            if (service.serviceTypeId === serviceType.serviceTypeId) {
                                return serviceType;
                            }
                            return service;
                        });
                        category.serviceTypeModel = serviceTypes;

                        this.setState({selectedServiceTypes: selectedServiceType});
                        this.props.handleClick(selectedServiceType, category);
                    }}
                    selectOrUnselectAll={(selected) => {
                        let selectedServiceType = this.state.selectedServiceTypes.filter((service) => {
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
                        this.setState({selectedServiceTypes: [...selectedServiceType, ...category.serviceTypeModel]});
                        this.props.handleClick([...selectedServiceType, ...category.serviceTypeModel], category);
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