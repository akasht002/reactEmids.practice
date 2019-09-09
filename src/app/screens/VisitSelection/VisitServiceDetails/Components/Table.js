import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { DATE_FORMATS } from '../../../../constants/constants';
import AssignServiceProvider from '../AssignServiceProvider'
import RowPerPage from './RowPerPage';
import { PAGE_SIZE_OPTIONS, VISIT_STATUS } from '../../../../constants/constants'
import { getServiceTypeImage } from '../../../../utils/validations'
import { isEntityUser } from '../../../../utils/userUtility';
import { isFutureDay } from '../../../../utils/dateUtility'
import { getUserInfo } from '../../../../services/http'
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { getEntityProcessingStatus } from '../../../../utils/validations'
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

const renderStatusBasedOnVisitStatus = (visitStatusId, isPaymentModeEnabled) => {
    const data = {
        visitStatusId: visitStatusId,
        isPaymentModeEnabled: isPaymentModeEnabled,
    }
    switch (visitStatusId) {
        case VISIT_STATUS.startVisit.id:
            return VISIT_STATUS.startVisit.keyValue
        case VISIT_STATUS.inProgress.id:
            return VISIT_STATUS.inProgress.keyValue
        case VISIT_STATUS.completed.id:
            return VISIT_STATUS.completed.keyValue
        case VISIT_STATUS.paymentPending.id:            
            return getEntityProcessingStatus(data)
        case VISIT_STATUS.cancelled.id:
            return VISIT_STATUS.cancelled.keyValue
        default:
            return null
    }
}

export const Table = props => {
    let isEntity = isEntityUser()
    let isEntityServiceProvider = getUserInfo().isEntityServiceProvider
    return (
        <Fragment>
            <table className="table-responsive plan-tableview" cellpadding="6" cellspacing="6">
                <thead>
                    <tr>
                        {props.header.map(item => {
                            return <th>{item.label}</th>
                        })}
                        {isEntity &&
                            <th></th>}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.visitList.map(item => {
                        let startTime = (isEntity || isEntityServiceProvider) ? item.startTime : getUTCFormatedDate(item.visitStartTime, DATE_FORMATS.hh_mm_a)
                        let duration = (isEntity || isEntityServiceProvider) ? item.duration : (item.originalTotalDuration === null ? item.billedTotalDuration : item.originalTotalDuration)
                        return <tr>
                            <td><Moment format={DATE_FORMATS.monDD}>{item.visitDate}</Moment> </td>
                            <td>{startTime}</td>
                            <td>{duration}</td>
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
                            {
                                isEntity &&
                                <td>
                                    <AssignServiceProvider
                                        visitList={item}
                                        getServicePlanVisitId={item.servicePlanVisitId}
                                        onSubmit={props.onSubmit}
                                        entityServiceProvidersList={props.entityServiceProvidersList}
                                    />
                                </td>
                            }
                            {!isEntity &&
                                <td>
                                    <div class="ScheduleRowButton"><button class="btn btn-outline-primary"
                                        onClick={() => props.navigateToparticularPageBasedonId(item)}
                                    >{renderStatusBasedOnVisitStatus(item.visitStatusId, item.isPaymentModeEnabled)}</button></div>
                                </td>}
                            {
                                isEntity && item.visitStatusId === VISIT_STATUS.startVisit.id && isFutureDay(item.visitDate) ?
                                    <td>
                                        <button className="edit-rightico" onClick={() => props.toggleEditModal(item.servicePlanVisitId)}>Edit</button>
                                    </td>
                                    :
                                    <td></td>
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



