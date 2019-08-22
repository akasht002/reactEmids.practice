import React, { Component } from "react";
import { TabContent, TabPane } from 'reactstrap';
import { Scrollbars } from '../../../../../components/LevelOne';
import AgeRange from "./AgeRange";
import Gender from "./Gender";
import Contracts from "./Contracts";
import ClinicalCondition from "./ClinicalCondition";
import { InddividualFilterActiveTab } from "../../../../../constants/constants"

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            selectedKey: ''
        }
    };

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handlechangeArea = (selectedKey, e) => {
        this.setState({ selectedKey: selectedKey })
    }

    render() {
        return (
            <div className={"CTFilter FilterWidget " + this.props.isOpen}>
                <div className="filterOverlay individual"></div>
                <div className="FilterWidgetForm">
                    <div className="FilterContainer FilterTop">
                        <span>Filters</span>
                        <span className="FilterCloseIcon" onClick={this.props.closeFIlter} />
                    </div>
                    <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                        className="FilterContainer FilterMiddle">
                        <div className="FilterMiddleContent FilterMiddleLeft">
                            <span className={this.state.activeTab === InddividualFilterActiveTab.contracts ? 'active' : ''}
                                onClick={() => {
                                    this.toggle(InddividualFilterActiveTab.contracts);
                                }}>
                                Contracts
                            </span>
                            <span className={this.state.activeTab === InddividualFilterActiveTab.clinicalConditions ? 'active' : ''}
                                onClick={() => {
                                    this.toggle(InddividualFilterActiveTab.clinicalConditions);
                                }}>
                                Clinical Conditions
                            </span>
                            <span className={this.state.activeTab === InddividualFilterActiveTab.age ? 'active' : ''}
                                onClick={() => {
                                    this.toggle(InddividualFilterActiveTab.age);
                                }}>
                                Age
                            </span>
                            <span className={this.state.activeTab === InddividualFilterActiveTab.gender ? 'active' : ''}
                                onClick={() => {
                                    this.toggle(InddividualFilterActiveTab.gender);
                                }}>
                                Gender
                            </span>
                        </div>
                        <div className="FilterMiddleContent FilterMiddleRight">
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId={InddividualFilterActiveTab.contracts}>
                                    <div className="form-group">
                                        <label>Select Contract</label>
                                    </div>
                                    <Contracts
                                        contracts={this.props.contracts}
                                        handleContracts={this.props.handleContracts}
                                        memberContractId={this.props.memberContractId}
                                    />
                                </TabPane>
                                <TabPane tabId={InddividualFilterActiveTab.age}>
                                    <div className="form-group">
                                        <label>Select Preferred Age group</label>
                                        <AgeRange
                                            onChangeSlider={this.props.onChangeSlider}
                                            ageRange={this.props.ageRange}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tabId={InddividualFilterActiveTab.clinicalConditions}>
                                    <div className="form-group">
                                        <label>Select Clinical Conditions</label>
                                        <ClinicalCondition
                                            clinicalConditionList={this.props.clinicalConditionList}
                                            handleClinicalConditions={this.props.handleClinicalConditions}
                                        />
                                    </div>
                                </TabPane>

                                <TabPane tabId={InddividualFilterActiveTab.gender}>
                                    <div className="form-group">
                                        <label>Select Gender</label>
                                        <Gender
                                            genderType={this.props.genderType}
                                            handleGenderType={this.props.handleGenderType}
                                            genderId={this.props.genderId}
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