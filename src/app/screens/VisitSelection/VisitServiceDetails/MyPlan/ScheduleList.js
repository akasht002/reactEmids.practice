import React, { Fragment } from 'react';
import { getFields } from "../../../../utils/validations";
import {VISIT_TYPE} from "../../../../constants/constants"

export const ScheduleList = props => {
    return (
        <Fragment>
            {
                props.list.map(item => {
                    let activeListBlockClass = (props.planScheduleId === item.planScheduleId) ? 'active-listblock' : ''
                    return (
                        <div className={`schedule-listblock ${activeListBlockClass}`}>
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
                
                                <div className="edit-block">
                                {item.isAnyAvailableScheduleVisit && <button className= {'TestBtn'} onClick={() => parseInt(item.scheduleTypeId,10) === VISIT_TYPE.scheduled ? 
                                                props.handelEditShedule(item.planScheduleId): 
                                                props.handelEditAssessment(item.planScheduleId)}>
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
