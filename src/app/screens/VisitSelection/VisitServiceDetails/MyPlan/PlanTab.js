import React, { Fragment } from 'react';
import { TabPane } from 'reactstrap';
import { ScheduleList } from './ScheduleList';
import { Table } from '../Components/Table';
import { CoreoPagination } from '../../../../components';
import { isEntityUser } from '../../../../utils/userUtility'
import Filter from "./Filter/index";
import { VISIT_STATUS } from '../../../../constants/constants';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';

export const PlanTab = props => {
    let isEntity = isEntityUser()
    let renderPLanDetailsClass = !isEntity ? 'full-block-requestplan' : '';
    let defaultImage = (caseInsensitiveComparer(props.visitServiceDetails.statusName, VISIT_STATUS.requested.keyValue) || caseInsensitiveComparer(props.visitServiceDetails.statusName, VISIT_STATUS.open.keyValue))
    return (
        <TabPane tabId='2' className='TabBody'>
            { defaultImage && !isEntity ?
                <div className="empty-planblock">
                    <img src={require('../../../../assets/images/blankPlan.png')} alt="service plan" />
                    <span>No Results</span>
                    <p>Lorem ipsum dolar sit amet,consectetuer adipiscing elit, sed diam nonummy.
                    Lorem ipsum dolar sit amet,consectetuer adipiscing elit.</p>
                </div>
                :
                <Fragment>
                    <div className="row">
                        {isEntity &&
                            <div className="col-lg-4 col-md-4 left-customewidth">
                                <span className="title-view theme-primary">Schedule(s)</span>
                            </div>
                        }
                        <div className={`col-lg-8 col-md-8 right-customewidth ${renderPLanDetailsClass}`}>
                            <div className="pull-left">
                                <span className="title-view theme-primary">Visit(s)</span>
                            </div>
                            <div className="pull-right">
                                <div className="full-block filter-block">
                                    <span className='primaryColor profile-header-filter theme-primary' onClick={props.toggle}>Filters</span>
                                    {isEntity &&
                                        <button
                                            onClick={() => props.addSchedule()}
                                            disabled={!props.isDisabledAddSchedule}
                                        >
                                            <span>+</span>Add New Schedule
                                </button>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {isEntity &&
                            <div className="col-lg-4 col-md-4 left-customewidth">
                                <div className="full-block shadow-style left-listblock">

                                    <ScheduleList
                                        list={props.scheduleList}
                                        handleChangeSchedule={props.handleChangeSchedule}
                                        handelEditShedule={props.handelEditShedule}
                                        handelEditAssessment={props.handelEditAssessment}
                                        planScheduleId={props.planScheduleId}
                                    />
                                </div>
                            </div>}
                        <div className={`col-lg-8 col-md-8 right-customewidth ${renderPLanDetailsClass}`}>
                            <div className="full-block shadow-style right-tablelist">
                                <Table
                                    visitList={props.visitList}
                                    header={props.header}
                                    espList={props.espList}
                                    toggleEditModal={props.toggleEditModal}
                                    onSubmit={props.onSubmit}
                                    entityServiceProvidersList={props.entityServiceProvidersList}
                                    rowPageChange={props.rowPageChange}
                                    rowPageSize={props.rowPageSize}
                                    totalResult={props.pageCount}
                                    tooltipOpen={props.tooltipOpen}
                                    toggleToolTip={props.toggleToolTip}
                                    navigateToparticularPageBasedonId={props.navigateToparticularPageBasedonId}
                                    servicePlanVisitId={props.servicePlanVisitId}
                                    highlightVisit={props.highlightVisit}
                                />
                                {props.visitList.length !== 0 &&
                                    <CoreoPagination
                                        activePage={props.activePage}
                                        itemsCountPerPage={props.rowPageSize}
                                        totalItemsCount={props.pageCount}
                                        pageRangeDisplayed={5}
                                        onChange={props.pageNumberChange}
                                    />
                                }
                                <Filter
                                    isOpen={props.isOpen}
                                    toggle={props.toggle}
                                    applyFilter={props.applyFilter}
                                    applyReset={props.applyReset}
                                    startDate={props.startDate}
                                    dateChanged={props.dateChanged}
                                    dateChangedRaw={props.dateChangedRaw}
                                    todateChanged={props.todateChanged}
                                    todateChangedRaw={props.todateChangedRaw}
                                    endDate={props.endDate}
                                    isValid={props.isValid}
                                    ServiceCategory={props.ServiceCategory}
                                    handleChangeServiceCategory={props.handleChangeServiceCategory}
                                    ServiceCategoryId={props.ServiceCategoryId}
                                    selectedOption={props.selectedOption}
                                    ServiceType={props.ServiceType}
                                    handleserviceType={props.handleserviceType}
                                    ServiceStatus={props.ServiceStatus}
                                    handleChangeserviceStatus={props.handleChangeserviceStatus}
                                    checked={props.checked}
                                    entityServiceProvidersList={props.entityServiceProvidersList}
                                    handleEsp={props.handleEsp}
                                    clickShowMore={props.clickShowMore}
                                    disableShowmore={props.disableShowmore}
                                    visitDate={props.visitDate}
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </TabPane>
    )
}
