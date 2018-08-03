import React from "react";
import { UncontrolledCollapse } from 'reactstrap';
import ServiceOfferedIcons from '../ServiceOffered/serviceOfferedIcons'

class ServiceOfferedAccordian extends React.Component {

    constructor(props) {
        super(props);
        this.serviceTypes = [];
        this.state = {
            selectAllChecked: false,
            serviceTypes: [],
            individualSelected: false
        };
    }

    handleClick = (selectedServiceType) => {
        if (!selectedServiceType.isActive) {
            this.setState({selectAllChecked: false, individualSelected: true});
        }
        // const index = this.serviceTypes.findIndex((service) => {
        //     return service.serviceTypeId == service.serviceTypeId
        // });
        // if (index > -1) {
        //     this.serviceTypes.splice(index, 1);
        //     console.log(this.serviceTypes);
        // }
        // this.serviceTypes.push(selectedServiceType);
        // console.log(this.serviceTypes);
        
        this.props.selectedServiceTypes(selectedServiceType);
    }

    componentDidMount() {
        this.setState({
            serviceTypes: this.props.category.serviceTypeModel,
            selectAllChecked: false
        });
        if(this.props.category.serviceTypeModel.every((service) => {
            return service.isActive === true;
        })) {
            this.setState({
                selectAllChecked: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category.serviceTypeModel !== this.serviceTypes) {
            this.setState({
                serviceTypes: nextProps.category.serviceTypeModel
            });
        }
    }

    onChangeSelectAll() {
        let serviceTypes = this.state.serviceTypes.map((serviceType) => {
            return {
                ...serviceType,
                isActive: !this.state.selectAllChecked
            };
        });
        this.setState({ selectAllChecked: !this.state.selectAllChecked, serviceTypes: serviceTypes, individualSelected: false });
        this.props.selectedServiceTypes(serviceTypes);
    }

    render() {
        let checkboxCount = '';
        let showFirstContentDefault;
        let contentClassName = '';
        let widgetClassName = '';
        widgetClassName = "SPTabWidgetEdit";
        contentClassName = "SPTabContentEdit";

        return (
            <div>
                
                    <UncontrolledCollapse toggler={'#a' + this.props.category.serviceCategoryId} className={contentClassName + " SPTabContent " + showFirstContentDefault}>
                        {this.props.type === 'edit' && <div className={'width100 selectServiceTypes d-flex'}>
                            <p className={'mr-auto'}>Select the Service Types</p>
                            <div className='form-check ml-auto'>
                                <label className="form-check-label">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value={this.state.selectAllChecked}
                                        checked={this.state.selectAllChecked}
                                        onChange={() => {
                                            this.onChangeSelectAll();
                                        }}
                                    />
                                    Select All
                                    <span className="CheckboxIcon" />
                                </label>
                            </div>
                        </div>}
                        
                        {this.state.serviceTypes && this.state.serviceTypes.map((listService, index) => {
                            return (
                                <ServiceOfferedIcons
                                    selectAllCheck={this.state.selectAllChecked}
                                    individualSelected={this.state.individualSelected}
                                    categoryId={this.props.category.serviceCategoryId}
                                    service={listService}
                                    index={index}
                                    type={this.props.type}
                                    handleClick={this.handleClick}
                                    checkboxCount={this.props.checkboxCount}
                                />
                            )
                        })}
                    </UncontrolledCollapse>
                
                <div className={'SPTabHeader'} id={'a' + this.props.category.serviceCategoryId} onClick={this.toggleCollapse}>
                    <div className={'SPTabTitle'}>
                        <h5 className={'SPTabTitleContent'}>{this.props.category.serviceCategoryDescription}</h5>
                        {this.props.type === 'view' ?
                            this.props.checkboxCount
                            :
                            ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ServiceOfferedAccordian;