import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { DATE_FORMATS } from '../../../../constants/constants';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Select, Item } from '@zendeskgarden/react-select';
import AssignServiceProvider from '../AssignServiceProvider'
import RowPerPage from './RowPerPage';
import {PAGE_SIZE_OPTIONS} from '../../../../constants/constants'
import './style.css';

export const Tabel = props => {
    return (
        <Fragment>
            <table className="table-responsive plan-tableview" cellpadding="6" cellspacing="6">
                <thead>
                    <tr>
                        {props.header.map(item => {
                            return <th>{item.label}</th>
                        })}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.visitList.map(item => {
                        return <tr>
                            <td><Moment format={DATE_FORMATS.monDD}>{item.visitDate}</Moment> </td>
                            <td>{item.startTime}</td>
                            <td>{item.duration}</td>
                            <td>

                                {/* {item.serviceTypes.map(type => {
                                    return type.serviceTypeDescription
                                })} */}

                                <span className="service-typesview-plan">
                                    <img alt="" src={require('../../../../assets/ServiceTypes/ADL Eating.svg')}></img>
                                    <img alt="" src={require('../../../../assets/ServiceTypes/HAH - Housekeeping.svg')}></img>
                                    <img alt="" src={require('../../../../assets/ServiceTypes/ADL Bathing.svg')}></img>
                                    <span className="service-typesview-more">3+</span>
                                </span>
                            </td>
                            <td>
                                <AssignServiceProvider
                                    visitList={item}
                                    getServicePlanVisitId={item.servicePlanVisitId}
                                    onSubmit={props.onSubmit}
                                    entityServiceProvidersList={props.entityServiceProvidersList}
                                />
                            </td>
                            <td>
                                {/* <ThemeProvider>
                                    <SelectField>
                                        <Select
                                            placement="bottom"
                                            options={props.espList}
                                            onChange={props.handleChangeSelectedDays}
                                            selectedValue={props.selectedDays}
                                            className='onBoardingSelect'
                                        >
                                            {props.selectedDaysLabel ? props.selectedDaysLabel : <span className="Select-placeholder pl-0">Select weekly</span>}
                                        </Select>
                                    </SelectField>
                                </ThemeProvider> */}

                                {/* <span className="SP-viewplantable">
                             <img alt="" src={require('../../../../assets/images/Blank_Profile_icon.png')}></img>
                             <span><a>Assign Provider</a></span>
                             </span> */}
                            </td>
                            <td>
                                {/* <div class="ScheduleRowButton"><a class="btn btn-outline-primary">Start Visit</a></div> */}
                            </td>
                            <td>
                                <button className="edit-rightico" onClick={() => props.toggleEditModal(item.servicePlanVisitId)}>Edit</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <RowPerPage
                pageSize={props.rowPageSize}
                pageSizeChange={props.rowPageChange}
                pageSizeOption={PAGE_SIZE_OPTIONS}
              />
              <span>Total {props.totalResult} results</span>
        </Fragment>
    )
}



