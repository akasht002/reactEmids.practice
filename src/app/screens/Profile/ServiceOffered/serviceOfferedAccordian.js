import React from "react";
import { UncontrolledCollapse } from 'reactstrap';
import ServiceOfferedIcons from '../ServiceOffered/serviceOfferedIcons'

class ServiceOfferedAccordian extends React.Component {
    render() {
        let showFirstContentDefault;
        let contentClassName = '';
        contentClassName = "SPTabContentEdit";

        return (
            <div>
                 <div className={'SPTabHeader'} id={'a' + this.props.category.serviceCategoryId} onClick={this.toggleCollapse}>
                    <div className={'SPTabTitle'}>
                        <h5 className={'SPTabTitleContent'}>{this.props.category.serviceCategoryDescription}</h5>
                        {this.props.type === 'view' ?
                            <span className={'SPServiceCount'}>{this.props.category.serviceTypeModel.length}</span>
                            :
                            ''
                        }
                    </div>
                </div>
                <UncontrolledCollapse toggler={'#a' + this.props.category.serviceCategoryId} className={contentClassName + " SPTabContent " + showFirstContentDefault}>
                    {this.props.type === 'edit' && <div className={'width100 selectServiceTypes d-flex'}>
                        <p className={'mr-auto'}>Select the Service Types</p>
                        <div className='form-check ml-auto'>
                            <label className="form-check-label">
                                <input className="form-check-input"
                                    type="checkbox"
                                    value={this.props.allCheck}
                                    checked={this.props.allCheck}
                                    onChange={(e) => {
                                        this.props.selectOrUnselectAll(e.target.checked);
                                    }}
                                />
                                Select All
                                <span className="CheckboxIcon" />
                            </label>
                        </div>
                    </div>}
                    
                    {this.props.category.serviceTypeModel && this.props.category.serviceTypeModel.map((listService, index) => {
                        return (
                            <ServiceOfferedIcons
                                categoryId={this.props.category.serviceCategoryId}
                                service={listService}
                                index={index}
                                type={this.props.type}
                                handleClick={(e) => {
                                    listService.isActive = e.target.checked
                                    this.props.handleClick({
                                        ...listService,
                                        categoryId: this.props.category.serviceCategoryId
                                    });
                                }}
                                checkboxCount={this.props.checkboxCount}
                            />
                        )
                    })}
                </UncontrolledCollapse>
                
               
            </div>
        )
    }
}

export default ServiceOfferedAccordian;