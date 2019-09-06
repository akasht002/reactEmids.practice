import React, { Component } from "react";
import { TabContent, TabPane } from 'reactstrap';
import { Scrollbars, StarRating } from '../../../../../components/LevelOne';
import AgeRange from "./AgeRange";
import Gender from "./Gender";
import Contracts from "./Contracts";
import ClinicalCondition from "./ClinicalCondition";
import { FilterActiveTab } from "../../../../../constants/constants"
import { Tabs } from "./Tabs";
import Experience from './Experience'
import ServiceTypeList from './ServiceTyplist'
import Select from 'react-select';
import ServiceRequestStatus from "./ServiceRequestStatus";
import ScheduleType from "./ScheduleType";
import './style.css'

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.filterTabs[0].id
        }
    };

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const serviceCategories = this.props.serviceCategory && this.props.serviceCategory.map(function (type) {
            return { "label": type.serviceCategoryDescription, "value": type.serviceCategoryId };
        });
        return (
            <div className={"CTFilter FilterWidget entity-filter-block " + this.props.isOpen}>
                <div className="filterOverlay individual"></div>
                <div className="FilterWidgetForm">
                    <div className="FilterContainer FilterTop">
                        <span>Filters</span>
                        <span className="FilterCloseIcon" onClick={this.props.toggle} />
                    </div>
                    <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                        className="FilterContainer FilterMiddle">
                        <div className="FilterMiddleContent FilterMiddleLeft">
                            <Tabs
                                filterTabs={this.props.filterTabs}
                                toggleTabs={this.toggle}
                                activeTab={this.state.activeTab}
                            />
                        </div>
                        <div className="FilterMiddleContent FilterMiddleRight">
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId={FilterActiveTab.contracts}>
                                    <div className="form-group">
                                        <label>Select Contract</label>
                                    </div>
                                    <Contracts
                                        contracts={this.props.contracts}
                                        handleContracts={this.props.handleContracts}
                                        memberContractId={this.props.memberContractId}
                                    />
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.age}>
                                    <div className="form-group">
                                        <label>Select Preferred Age group</label>
                                        <AgeRange
                                            onChangeSlider={this.props.onChangeSlider}
                                            ageRange={this.props.ageRange}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.clinicalConditions}>
                                    <div className="form-group">
                                        <label>Select Clinical Conditions</label>
                                        <ClinicalCondition
                                            clinicalConditionList={this.props.clinicalConditionList}
                                            handleClinicalConditions={this.props.handleClinicalConditions}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.gender}>
                                    <div className="form-group">
                                        <label>Select Gender</label>
                                        <Gender
                                            genderType={this.props.genderType}
                                            handleGenderType={this.props.handleGenderType}
                                            genderId={this.props.genderId}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.rating}>
                                    <div className="form-group">
                                        <label>Select Minimum Rating</label>
                                        <StarRating
                                            handleSelectedRating={this.props.handleSelectedRating}
                                            rating={this.props.rating}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.experience}>
                                    <div className="form-group">
                                        <label>Select Preferred Experience</label>
                                        <Experience
                                            onChangeExperinceSlider={this.props.onChangeExperinceSlider}
                                            minExperience={this.props.minExperience}
                                            maxExperience={this.props.maxExperience}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.categories}>
                                    <div className="form-group">
                                        <label className="m-0">Select Service Category</label>
                                    </div>
                                    <div className="form-group mb-2">
                                        <Select
                                            id="recurrencePattern"
                                            closeOnSelect={true}
                                            searchable={false}
                                            value={this.props.selectedOption}
                                            placeholder="Select Service Category"
                                            className='ServiceRequestSelect col-md-12 mb-4 p-0'
                                            options={serviceCategories}
                                            onChange={this.props.handleChangeServiceCategory}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-3">Select the Service Type(s)</label>
                                        <ServiceTypeList
                                            serviceType={this.props.serviceType}
                                            handleServiceType  ={(item, e) => { this.props.handleServiceType  (item, e) }}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.status}>
                                    <div className="form-group">
                                        <label>Select the Status of Service Requests</label>
                                    </div>
                                    <ServiceRequestStatus
                                        handleServiceRequestStatus={this.props.handleServiceRequestStatus}
                                        serviceRequestStatusList={this.props.serviceRequestStatusList}
                                    />
                                </TabPane>
                                <TabPane tabId={FilterActiveTab.recurring}>
                                    <div className="form-group">
                                        <label>Select Schedule Type</label>
                                        <ScheduleType
                                            scheduleType={this.props.scheduleType}
                                            handleScheduleType={this.props.handleScheduleType}
                                            scheduleLabel={this.state.scheduleLabel}
                                        />
                                    </div>
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