import React, { Component } from "react";
import { TabContent, TabPane } from 'reactstrap';
import { Scrollbars, Calendar } from '../../../../../components/LevelOne';
import { formateStateDateValue } from "../../../../../utils/validations";
import ServiceCategory from "./ServiceCategory";
import ServiceTypeList from "./ServiceTyplist";
import ServiceRequestsStatus from "./Status";
import EntitySp from "./EntitySp";
import { ISP_TAB, EU_TAB, ESP_TAB } from "./filterTabData";
import { isEntityUser } from '../../../../../utils/userUtility'
import { getUserInfo } from "../../../../../services/http";
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

    resetToDefaultTab = () => {
        this.props.applyReset();
        this.setState({ activeTab: '1' });
    }


    render() {
        let isEntity = isEntityUser();
        let isEntitySp = getUserInfo().isEntityServiceProvider;
        let selectServiceCategory = this.props.ServiceCategory.map(function (type) {
            return { "label": type.serviceCategoryDescription, "value": type.serviceCategoryId };
        });

        let tabData = isEntity ? EU_TAB : (isEntitySp ? ESP_TAB : ISP_TAB);

        return (
            <div className={"FilterWidget " + this.props.isOpen}>

                <div className="FilterWidgetForm my-plan-filter">
                    <div className="FilterContainer FilterTop">
                        <span>Filters</span>
                        <span className="FilterCloseIcon" onClick={this.props.toggle} />
                    </div>
                    <div className="FilterContainer FilterMiddle">
                        <div className="FilterMiddleContent FilterMiddleLeft">
                            {tabData.map(item => {
                                return <span className={this.state.activeTab === item.id ? 'active' : ''}
                                    onClick={() => { this.toggle(item.id) }}>
                                    {item.name}
                                </span>
                            })}
                        </div>
                        <Scrollbars
                            speed={2}
                            smoothScrolling
                            horizontal={false}
                            className='FilterMiddleContent FilterMiddleRight'
                        >
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1" id=" Date_range_tab">
                                    <div className="form-group">
                                        <label>Select the Date Range</label>
                                    </div>
                                    <div className="col-md-12 mb-4 p-0">
                                        <Calendar
                                            startDate={this.props.startDate && formateStateDateValue(this.props.startDate)}
                                            onDateChange={this.props.dateChanged}
                                            onDateChangeRaw={this.props.dateChangedRaw}
                                            mandatory={false}
                                            minDate={this.props.visitDate.startVisitDateForWeb && formateStateDateValue(this.props.visitDate.startVisitDateForWeb)}
                                            maxDate={this.props.visitDate.endVisitDateForWeb && formateStateDateValue(this.props.visitDate.endVisitDateForWeb)}
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
                                            minDate={this.props.visitDate.startVisitDateForWeb && formateStateDateValue(this.props.visitDate.startVisitDateForWeb)}
                                            maxDate={this.props.visitDate.endVisitDateForWeb && formateStateDateValue(this.props.visitDate.endVisitDateForWeb)}
                                            value={this.props.endDate}
                                            className={"form-control datePicker"}
                                            label="To Date"
                                        />
                                    </div>
                                </TabPane>

                                <TabPane tabId="2">
                                    <div className="form-group">
                                        <label>Visit Status</label>
                                    </div>
                                    <ServiceRequestsStatus
                                        id="Service Requests Status"
                                        ServiceStatus={this.props.ServiceStatus}
                                        handleChangeserviceStatus={this.props.handleChangeserviceStatus}
                                        handleAllServiceStatus={this.props.handleAllServiceStatus}
                                    />
                                </TabPane>

                                <TabPane tabId="3" id="Service_Category_tab">
                                    <div className="form-group">
                                        <label>Categories & Types</label>
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

                                <TabPane tabId="4">
                                    <div className="form-group">
                                        <label>Entity Service Provider</label>
                                    </div>
                                    <EntitySp
                                        entityServiceProvidersList={this.props.entityServiceProvidersList}
                                        handleEsp={this.props.handleEsp}
                                    />
                                    <ul className="show-more-assignSP">
                                        <li
                                            class="list-group-item ProfileShowMore"
                                            onClick={this.props.clickShowMore}
                                            disabled={this.props.disableShowmore}
                                        >
                                            Show more
                                        <i class="ProfileIconShowMore"></i>
                                        </li>
                                    </ul>
                                </TabPane>
                            </TabContent>
                        </Scrollbars>
                    </div>

                    <div className="FilterContainer FilterBottom">
                        <button className="btn btn-outline-primary mr-2"
                            onClick={() => this.resetToDefaultTab()}>Reset</button>

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