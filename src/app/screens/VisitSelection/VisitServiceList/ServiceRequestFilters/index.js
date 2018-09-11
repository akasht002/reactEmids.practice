import React, { Component } from "react";
import {Link} from "react-router-dom";
import {TabContent, TabPane} from 'reactstrap';
import Select from 'react-select';
import {Scrollbars,Calendar} from '../../../../components/LevelOne';
import {formateStateDate,formattedDateMoment,formattedDateChange } from "../../../../utils/validations";
import ServiceCategory from "./ServiceCategory";
import ServiceTypeList from "./ServiceTyplist";
import ServiceRequestsStatus from "./Status";

import "./style.css";

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1"
        }
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    render() {

        let selectServiceCategory =this.props.ServiceCategory.map(function(type){
            return {"label": type.serviceCategoryDescription, "value": type.serviceCategoryId};
        });

        return (
            <div className={"FilterWidget " + this.props.isOpen}>
                <div className="FilterWidgetForm">
                    <div className="FilterContainer FilterTop">
                        <span>Filters</span>
                        <span className="FilterCloseIcon" onClick={this.props.toggle}/>
                    </div>
                    <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                                className="FilterContainer FilterMiddle">
                        <div className="FilterMiddleContent FilterMiddleLeft">
                            <span className={this.state.activeTab === '1' ? 'active' : ''}
                                  onClick={() => {
                                      this.toggle('1');
                                  }}>
                                Categories & Types
                            </span>
                            <span className={this.state.activeTab === '2' ? 'active' : ''}
                                  onClick={() => {
                                      this.toggle('2');
                                  }}>
                                Service Areas
                            </span>
                            <span className={this.state.activeTab === '3' ? 'active' : ''}
                                  onClick={() => {
                                      this.toggle('3');
                                  }}>
                                Date Range
                            </span>
                            <span className={this.state.activeTab === '4' ? 'active' : ''}
                                  onClick={() => {
                                      this.toggle('4');
                                  }}>
                                Status
                            </span>
                        </div>
                        <div className="FilterMiddleContent FilterMiddleRight">
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <div className="form-group">
                                        <label>Select the Service Category</label>
                                    </div>
                                    <div className="form-group">
                                        <ServiceCategory
                                            id="Service Category"
                                            value={this.props.selectedOption}
                                            closeOnSelect={true}
                                            searchable={false}
                                            placeholder="Select the Service Category"
                                            className='ServiceRequestSelect col-md-12 mb-4 p-0'
                                            options={selectServiceCategory}
                                            onChange={this.props.handleChangeServiceCategory}
                                        />
                                    </div>
                                    <ServiceTypeList 
                                        ServiceType={this.props.ServiceType}
                                        handleserviceType={this.props.handleserviceType}
                                        
                                    />
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="form-group">
                                        <label className="mb-3">Select Service Area</label>
                                    </div>

                                    <div className="form-radio AddressCardWidget All mb-2">
                                        <input className="form-radio-input" name="AddressPOS" id="AddressPOS1"
                                               type="radio"
                                               value="1"/>
                                        <label className="form-radio-label AddressPOS" htmlFor="AddressPOS1">All</label>
                                        <span className="RadioBoxIcon"/>
                                    </div>

                                    <div className="form-radio AddressCardWidget mb-2">
                                        <input className="form-radio-input" name="AddressPOS" id="AddressPOS2"
                                               type="radio"
                                               value='2'/>
                                        <label className="form-radio-label AddressPOS" htmlFor="AddressPOS2">
                                            <span className='POSTitle'>Home</span>
                                            <span className='POSAddress'><i>Street</i>3343 Kooter Lane, 59 College Avenue</span>
                                            <span className='POSAddress'><i>City</i>Farmington</span>
                                            <span className='POSAddress'><i>State</i>West Virginia</span>
                                            <span className='POSAddress'><i>Zip</i>26571</span>
                                        </label>
                                        <span className="RadioBoxIcon"/>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="form-group">
                                        <label>Select the Date range</label>
                                    </div>
                                    <div className="col-md-12 mb-4 p-0">
                                    <Calendar
                                        startDate={this.props.startDate && formateStateDate(this.props.startDate)}
                                        onDateChange={this.props.dateChanged}
                                        onDateChangeRaw={this.props.dateChangedRaw}
                                        mandatory={false}
                                        minDate={this.props.toDate ? formateStateDate(this.props.toDate) : formateStateDate()}
                                        value={this.props.startDate}
                                        className={"form-control datePicker"}
                                        label="From Date"
                                    />
                                </div>
                                <div className="col-md-12 mb-4 p-0">
                                    <Calendar
                                        startDate={this.props.endDate && formateStateDate(this.props.endDate)}
                                        onDateChange={this.props.todateChanged}
                                        onDateChangeRaw={this.props.todateChangedRaw}
                                        mandatory={false}
                                        minDate={this.props.fromDate && formateStateDate(this.props.fromDate)}
                                        maxDate={formateStateDate()}
                                        value={this.props.endDate}
                                        className={"form-control recurrenceEndPicker"}
                                        label="To Date"
                                    />
                                </div>
                                   
                                </TabPane>
                                <TabPane tabId="4">
                                    <div className="form-group">
                                        <label>Select the Status of Service Requests</label>
                                    </div>
                                    <ServiceRequestsStatus
                                        ServiceStatus ={this.props.ServiceStatus}
                                        handleChangeserviceStatus={this.props.handleChangeserviceStatus}
                                        serviceStatus={this.props.serviceStatus}
                                    />
                                </TabPane>
                            </TabContent>
                        </div>
                    </Scrollbars>
                    <div className="FilterContainer FilterBottom">
                    <button  className="btn btn-outline-primary mr-2" 
                    onClick={()=>
                        this.props.applyReset()}>Reset</button>
                        
                    <button className="btn btn-primary" onClick={()=>{
                        this.props.applyFilter()}}>Apply</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Filter;