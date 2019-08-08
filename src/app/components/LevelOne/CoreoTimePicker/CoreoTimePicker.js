import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { DATE_FORMATS } from '../../../constants/constants'

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
                        dateFormat={props.dateFormat ? props.dateFormat : DATE_FORMATS.timeh_mm_a}
                        timeCaption="Time"
                        timeFormat={props.dateFormat ? props.dateFormat : DATE_FORMATS.timeh_mm_a}
                        value={props.startTime}
                        minTime={props.minTime}
                        maxTime={props.maxTime}
                    />
                </label>
            </div>
        </Fragment>
    )
}