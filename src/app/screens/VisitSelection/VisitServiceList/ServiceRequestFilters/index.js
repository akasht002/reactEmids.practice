import React, { Component } from "react";
import { TabContent, TabPane } from 'reactstrap';
import { Scrollbars, Calendar } from '../../../../components/LevelOne';
import { formateStateDate, formateStateDateValue } from "../../../../utils/validations";
import ServiceCategory from "./ServiceCategory";
import ServiceTypeList from "./ServiceTyplist";
import ServiceRequestsStatus from "./Status";
import ServiceArea from "./ServiceArea";
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

        let selectServiceCategory = this.props.ServiceCategory.map(function (type) {
            return { "label": type.serviceCategoryDescription, "value": type.serviceCategoryId };
        });

        return (
            <div className={"FilterWidget " + this.props.isOpen}>
                <div className="FilterWidgetForm">
                    <div className="FilterContainer FilterTop">
                        <span>Filters</span>
                        <span className="FilterCloseIcon" onClick={this.props.toggle} />
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
                                <TabPane tabId="1" id="Service_Category_tab">
                                    <div className="form-group">
                                        <label>Select Service Category</label>
                                    </div>
                                    <div className="form-group">
                                        <ServiceCategory
                                            id="Service Category"
                                            value={this.props.selectedOption}
                                            closeOnSelect={true}
                                            searchable={false}
                                            placeholder="Select Service Category"
                                            className='ServiceRequestSelect col-md-12 mb-4 p-0'
                                            options={selectServiceCategory}
                                            onChange={this.props.handleChangeServiceCategory}
                                        />
                                    </div>
                                    <ServiceTypeList
                                        id="Service Type List"
                                        ServiceType={this.props.ServiceType}
                                        handleserviceType={this.props.handleserviceType}
                                    />
                                </TabPane>
                                <TabPane tabId="2" id="Service_Area_tab">
                                    <div className="form-group">
                                        <label className="mb-3">Select Service Area</label>
                                    </div>
                                    <ServiceArea
                                        id="Service Area"
                                        ServiceAreaList={this.props.ServiceAreaList}
                                        handleServiceArea={this.props.handleServiceArea}
                                        serviceArea={this.props.serviceArea}
                                    />
                                    <span>Note : Service Area filters will only be applicable for open service request(s).</span>
                                </TabPane>
                                <TabPane tabId="3" id=" Date_range_tab">
                                    <div className="form-group">
                                        <label>Select the Date range</label>
                                    </div>
                                    <div className="col-md-12 mb-4 p-0">
                                        <Calendar
                                            startDate={this.props.startDate && formateStateDateValue(this.props.startDate)}
                                            onDateChange={this.props.dateChanged}
                                            onDateChangeRaw={this.props.dateChangedRaw}
                                            mandatory={false}
                                            minDate={this.props.fromDate && formateStateDate(this.props.fromDate)}
                                            value={this.props.startDate}
                                            className={"form-control datePicker"}
                                            label="From Date"
                                        />
                                    </div>
                                    <div className="col-md-12 mb-4 p-0">
                                        <Calendar
                                            startDate={this.props.endDate && formateStateDateValue(this.props.endDate)}
                                            onDateChange={this.props.todateChanged}
                                            onDateChangeRaw={this.props.todateChangedRaw}
                                            mandatory={false}
                                            minDate={this.props.startDate ? formateStateDate(this.props.startDate) : formateStateDate()}
                                            maxDate={formateStateDate()}
                                            value={this.props.endDate}
                                            className={"form-control datePicker"}
                                            label="To Date"
                                        />
                                    </div>

                                </TabPane>
                                <TabPane tabId="4">
                                    <div className="form-group">
                                        <label>Select the Status of Service Requests</label>
                                    </div>
                                    <ServiceRequestsStatus
                                        id="Service Requests Status"
                                        ServiceStatus={this.props.ServiceStatus}
                                        handleChangeserviceStatus={this.props.handleChangeserviceStatus}
                                        handleAllServiceStatus={this.props.handleAllServiceStatus}
                                    />
                                </TabPane>
                            </TabContent>
                        </div>
                    </Scrollbars>
                    <div className="FilterContainer FilterBottom">
                        <button className="btn btn-outline-primary mr-2"
                            onClick={() =>
                                this.props.applyReset()}>Reset</button>

                        <button className="btn btn-primary" onClick={() => {
                            this.props.applyFilter()
                        }}>Apply</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Filter;