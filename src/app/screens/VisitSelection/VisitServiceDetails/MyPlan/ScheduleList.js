import React, { Fragment } from 'react';
import { getFields } from "../../../../utils/validations";

export const ScheduleList = props => {
    return (
        <Fragment>
            {
                props.list.map(item => {
                    return (
                        <div className="schedule-listblock">
                            <fieldset>
                                <label className="customechk">
                                    <input
                                        type="checkbox"
                                        id={item.planScheduleId}
                                        name={item.keyValue}
                                        value={item.planScheduleId}
                                        onChange={(e) => { props.handleChangeSchedule(e) }}
                                        defaultChecked={true}
                                    />
                                    <div className='BlockImageDetailsName'>
                                        {item.serviceTypes &&
                                            getFields(item.serviceTypes, 'serviceTypeDescription')}
                                    </div>
                                    <span className="SR-cat"><label htmlFor={"ServiceStatus" + item.planScheduleId}>{item.schedulePatternType}</label></span>
                                    <span class="checkmark"></span>
                                </label>
                            </fieldset>
                            <button onClick={() => props.handelEditShedule(item.planScheduleId)}>Edit</button>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}
