import React from 'react';
import { TabPane } from 'reactstrap';
import { ScheduleList } from './ScheduleList';
import { Table } from '../Components/Table';
import { CoreoPagination } from '../../../../components';
import Filter from "./Filter/index";

export const PlanTab = props => {
    return (
        <TabPane tabId='2' className='TabBody'>

            <div className="row">
                <div className="col-lg-4 col-md-4 pd-15 left-customewidth">
                    <span className="title-view">Schedule (s)</span>
                </div>
                <div className="col-lg-8 col-md-8 pd-15 right-customewidth">
                    <div className="pull-left">
                        <span className="title-view">Visit (s)</span>
                    </div>
                    <div className="pull-right">
                        <div className="full-block filterblock">
                            <span className='primaryColor ProfileHeaderFilter' onClick={props.toggle}>Filters</span>
                            <button onClick={() => props.addSchedule()}> <span>+</span>Add New Schedule </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-4 left-customewidth">
                    <div className="full-block shadow-style left-listblock">

                        <ScheduleList
                            list={props.scheduleList}
                            handleChangeSchedule={props.handleChangeSchedule}
                        />
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 right-customewidth">
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
                        />
                        <CoreoPagination
                            activePage={props.activePage}
                            itemsCountPerPage={props.rowPageSize}
                            totalItemsCount={props.pageCount}
                            pageRangeDisplayed={10}
                            onChange={props.pageNumberChange}
                            itemClass='PaginationItem'
                            itemClassFirst='PaginationIcon First'
                            itemClassPrev='PaginationIcon Prev'
                            itemClassNext='PaginationIcon Next'
                            itemClassLast='PaginationIcon Last'
                        />
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
                        />
                    </div>
                </div>
            </div>
        </TabPane>
    )
}
