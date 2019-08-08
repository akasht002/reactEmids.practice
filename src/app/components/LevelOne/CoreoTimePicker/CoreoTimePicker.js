import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'

export const CoreoTimePicker = props => {
    return (
        <Fragment>
            <div className="form-group">
                <label className="width100"> {props.label}
                    <DatePicker
                        selected={props.startTime}
                        onChange={props.handleChange}
                        disabled={props.disabled}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat={props.dateFormat ? props.dateFormat : "h:mm a"}
                        timeCaption="Time"
                        timeFormat={props.dateFormat ? props.dateFormat : "h:mm a"}
                        value={props.startTime}
                        minTime={props.minTime}
                        maxTime={props.maxTime}
                    />
                </label>
            </div>
        </Fragment>
    )
}