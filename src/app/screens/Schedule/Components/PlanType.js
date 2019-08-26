import React, { Fragment } from 'react';

export const PlanType = props => {
    return (
        <Fragment>
            {
                props.options.map(item => {
                    return (
                        <fieldset>
                            <div className={props.isIndividualScheduleEdit ? "Midddle-Viewtab Midddle-Viewtab-Edit" : "Midddle-Viewtab"}>
                            <input
                                type="radio"
                                defaultChecked={props.planType === item.id}
                                id={item.id}
                                name={item.name}
                                value={item.value}
                                className="form-radio-input"
                                onChange={(e) => { props.handleChangePlanType(e.target.id) }}
                            />
                            <label className="form-radio-label" htmlFor={item.id}>{item.value}<span className="RadioBoxIcon" /></label>
                            </div>
                        </fieldset>
                    )
                })
            }
        </Fragment>
    )
}
