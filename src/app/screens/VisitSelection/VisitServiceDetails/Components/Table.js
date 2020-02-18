import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { DATE_FORMATS, SCHEDULE_TYPES } from '../../../../constants/constants';
import AssignServiceProvider from '../AssignServiceProvider'
import RowPerPage from './RowPerPage';
import { PAGE_SIZE_OPTIONS, VISIT_STATUS, VISIT_PROCESSING_STATUS } from '../../../../constants/constants'
import { getServiceTypeImage } from '../../../../utils/validations'
import { isEntityUser } from '../../../../utils/userUtility';
import { getUserInfo } from '../../../../services/http'
import { convert24To12Hrs } from "../../../../utils/dateUtility";
import { getEntityProcessingStatus } from '../../../../utils/validations'
import './style.css';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';

export const renderServiceTypeImages = serviceTypes => {
    let updatedServiceTypes = serviceTypes.length > 3 ? serviceTypes.slice(0, 2) : serviceTypes
    return (
        updatedServiceTypes.slice(0, 3).map(type =>
            <div>
                {caseInsensitiveComparer(type.serviceTypeDescription, SCHEDULE_TYPES.assessment.name)  ? <span className={"status-view-btn theme-primary"}>{SCHEDULE_TYPES.assessment.name}</span> : <img src={require(`../../../../assets/ServiceTypes/${getServiceTypeImageBasedOnId(type.serviceTypeId)}`)} alt="Grooming" title={type.serviceTypeDescription} />}
            </div>
        ))
}

export const getServiceTypeImageBasedOnId = serviceTypeId => {
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

export const renderStatusBasedOnVisitStatus = (visitStatusId, isPaymentModeEnabled) => {
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

export const renderEntityStatusBasedOnVisitStatus = (visitStatusId, isPaymentModeEnabled) => {
    const data = {
        visitStatusId: visitStatusId,
        isPaymentModeEnabled: isPaymentModeEnabled,
    }
    switch (visitStatusId) {
        case VISIT_PROCESSING_STATUS.scheduled.id:
            return VISIT_PROCESSING_STATUS.scheduled.title
        case VISIT_PROCESSING_STATUS.inProgress.id:
            return VISIT_PROCESSING_STATUS.inProgress.title
        case VISIT_PROCESSING_STATUS.completed.id:
            return VISIT_STATUS.completed.keyValue
        case VISIT_PROCESSING_STATUS.paymentPending.id:
            return getEntityProcessingStatus(data)
        case VISIT_PROCESSING_STATUS.cancelled.id:
            return VISIT_PROCESSING_STATUS.cancelled.title
        default:
            return null
    }
}

export const Table = props => {
    let isEntity = isEntityUser()
    let isEntityServiceProvider = getUserInfo().isEntityServiceProvider
    return (
        <Fragment>
            <table className="table-responsive plan-tableview theme-primary" cellpadding="6" cellspacing="6">
                <thead>
                    <tr>
                        {props.header.map(item => {
                            return <th>{item.label}</th>
                        })}
                        {isEntity &&
                            <th></th>}
                        {isEntity &&
                            <th></th>}
                        {isEntity &&
                            <th></th>}
                        {!isEntity && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {props.visitList.map(item => {
                        let startTime = (isEntity || isEntityServiceProvider) ? item.startTime : convert24To12Hrs(item.visitStartTime)
                        let duration = (isEntity || isEntityServiceProvider) ? item.duration : (item.originalTotalDuration === null ? item.billedTotalDuration : item.originalTotalDuration)
                        let isIndividualServiceProvider = !((item.visitStatusId === VISIT_STATUS.startVisit.id) && isEntity && isEntityServiceProvider)
                        let isStartVisit = (item.visitStatusId === VISIT_STATUS.startVisit.id) && !(isEntity || isEntityServiceProvider)
                        let activeRowClass = (props.servicePlanVisitId === item.servicePlanVisitId) ? 'active-row-view' : ''
                        return <tr className={activeRowClass} onClick={() => props.highlightVisit(item)}>
                            <td><Moment format={DATE_FORMATS.monDD}>{item.visitDate}</Moment> </td>
                            <td>{isIndividualServiceProvider && startTime}</td>
                            <td>{isStartVisit ? '': duration}</td>
                            <td>
                                <span className="service-typesview-plan">
                                    {renderServiceTypeImages(item.serviceTypes)}
                                    {item.serviceTypes.length > 3 && <div className="service-typesview-more tooltip theme-primary">3+
                                        <div className="bottom">
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
                                <td className={item.visitStatusId === VISIT_STATUS.cancelled.id && 'disable-assign-provider'}>
                                    <AssignServiceProvider
                                        visitList={item}
                                        getServicePlanVisitId={item.servicePlanVisitId}
                                        onSubmit={props.onSubmit}
                                        entityServiceProvidersList={props.entityServiceProvidersList}
                                    />
                                </td>
                            }
                            <td>
                            {item.additionalInformation === null ? 
                            <span></span> :
                            <div className="theme-primary">
                              <img src={require(`../../../../assets/images/icons/Note_edit.png`)} className="note-block" alt="noteEdit" title={item.additionalInformation}/>
                            </div>
                            }        
                            </td>        
                            {!isEntity ?
                                <td>
                                    <div className="ScheduleRowButton"><button className="btn btn-outline-primary"
                                        onClick={() => props.navigateToparticularPageBasedonId(item)}
                                    >{renderStatusBasedOnVisitStatus(item.visitStatusId, item.isPaymentModeEnabled)}</button></div>
                                </td>
                                :
                                <td>
                                    <div className="ScheduleRowButton">
                                        {item.visitStatusId !== VISIT_PROCESSING_STATUS.scheduled.id ?
                                            <button className="btn btn-outline-primary" onClick={() => props.navigateToparticularPageBasedonId(item)}>
                                                {renderEntityStatusBasedOnVisitStatus(item.visitStatusId, item.isPaymentModeEnabled)}
                                            </button>
                                            :
                                            <span className="status-view-btn theme-primary">
                                                {renderEntityStatusBasedOnVisitStatus(item.visitStatusId, item.isPaymentModeEnabled)}
                                            </span>
                                        }
                                    </div>
                                </td>
                            }
                            {
                                isEntity && item.visitStatusId === VISIT_STATUS.startVisit.id ?
                                    <td>
                                        <button className="edit-rightico" onClick={() => props.toggleEditModal(item.servicePlanVisitId, item.assignedServiceProviderId)}>Edit</button>
                                    </td>
                                    :
                                    (isEntity ? <td></td> : null)
                            }
                        </tr>
                    })}
                </tbody>
            </table>
            {props.visitList.length !== 0 &&
                <div className="table-result-block">
                    <RowPerPage
                        pageSize={props.rowPageSize}
                        pageSizeChange={props.rowPageChange}
                        pageSizeOption={PAGE_SIZE_OPTIONS}
                    />
                    <span className="page-result">Total {props.totalResult} results</span>
                </div>
            }
        </Fragment>
    )
}



