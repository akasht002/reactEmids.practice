import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { DATE_FORMATS } from '../../../../constants/constants';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Select, Item } from '@zendeskgarden/react-select';
import AssignServiceProvider from '../AssignServiceProvider'
import RowPerPage from './RowPerPage';
import { PAGE_SIZE_OPTIONS } from '../../../../constants/constants'
import { getServiceTypeImage } from '../../../../utils/validations'
import { getUserInfo } from '../../../../services/http'
import './style.css';

const renderServiceTypeImages = serviceTypes => {
    let updatedServiceTypes = serviceTypes.length > 3 ? serviceTypes.slice(0, 2) : serviceTypes
    return (
        updatedServiceTypes.slice(0, 3).map(type =>
            <img src={require(`../../../../assets/ServiceTypes/${getServiceTypeImageBasedOnId(type.serviceTypeId)}`)} alt="Grooming" />
        ))
}

const getServiceTypeImageBasedOnId = serviceTypeId => {
    return getServiceTypeImage(serviceTypeId)
}

const renderServiceTypesInToolTip = serviceTypes => {
    return (serviceTypes.map(type =>
        <div>
            <ul>
                <li><span><img src={require(`../../../../assets/ServiceTypes/${getServiceTypeImageBasedOnId(type.serviceTypeId)}`)} alt="coreoLogo" />
                    <div className="SR-types-tooltip">{type.serviceTypeDescription}</div></span></li>
            </ul>
            <i></i>
        </div>
    ))
}

export const Table = props => {
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
                                <span className="service-typesview-plan">
                                    {renderServiceTypeImages(item.serviceTypes)}
                                    {item.serviceTypes.length > 3 && <div className="service-typesview-more tooltip">3+
                                        <div class="bottom">
                                            <h3>Service Types</h3>
                                            <div className="inner-block-SRtypes">
                                                {renderServiceTypesInToolTip(item.serviceTypes)}
                                            </div>
                                            <i></i>
                                        </div>
                                    </div>}
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
                            {
                                !getUserInfo().isEntityServiceProvider &&
                                <td>
                                    <button className="edit-rightico" onClick={() => props.toggleEditModal(item.servicePlanVisitId)}>Edit</button>
                                </td>
                            }
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="table-result-block">
                <RowPerPage
                    pageSize={props.rowPageSize}
                    pageSizeChange={props.rowPageChange}
                    pageSizeOption={PAGE_SIZE_OPTIONS}
                />
                <span className="page-result">Total {props.totalResult} results</span>
            </div>
        </Fragment>
    )
}



