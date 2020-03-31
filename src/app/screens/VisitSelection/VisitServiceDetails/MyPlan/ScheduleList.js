import React, { Fragment } from 'react';
import { getFields } from "../../../../utils/validations";
import {VISIT_TYPE} from "../../../../constants/constants"

export const ScheduleList = props => {

    
const onClickPlanAction = (item) => {
    !item.isAnyAvailableScheduleVisit ? props.setViewPlan(true) : props.setViewPlan(false)
    parseInt(item.scheduleTypeId,10) === VISIT_TYPE.scheduled ? props.handelEditShedule(item.planScheduleId) : props.handelEditAssessment(item.planScheduleId)
}

    return (
        <Fragment>
            {
                props.list.map( (item,index) => {
                    let renderPlanActionIcon = item.isAnyAvailableScheduleVisit ? 'edit-block' : 'view-icon'
                    let activeListBlockClass = (props.planScheduleId === item.planScheduleId) ? 'active-listblock' : ''
                    return (
                        <div className={`schedule-listblock ${activeListBlockClass}`} key={`schedule-listblock_id${index}`}>
                            <fieldset>
                                <label className="customechk">
                                    <input
                                        type="checkbox"
                                        id={item.planScheduleId}
                                        name={item.keyValue}
                                        value={item.planScheduleId}
                                        onChange={(e) => { props.handleChangeSchedule(e) }}
                                        defaultChecked={true}
                                        className= {'Test'}
                                    />
                                    <label className='SR-types-label theme-primary'>
                                        {item.serviceTypes &&
                                            getFields(item.serviceTypes, 'serviceTypeDescription')}
                                    </label>
                                    <span className="SR-cat"><label htmlFor={"ServiceStatus" + item.planScheduleId}>{item.schedulePatternType}</label></span>
                                    <span class="checkmark theme-primary"></span>
                
                                <div className={renderPlanActionIcon}>
                                {<button className= {'TestBtn'} onClick={() => onClickPlanAction(item)}>
                                    Edit
                                </button>}
                                </div>
                                </label>
                            </fieldset>
                          
                        </div>
                    )
                })
            }
        </Fragment>
    )
}
