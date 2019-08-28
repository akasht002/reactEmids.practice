import React, { Fragment, Component } from 'react';
import DatePicker from 'react-datepicker';
import { DATE_FORMATS } from '../../../constants/constants'

class CoreoTimePicker extends Component {
    
    clickOutside = () => {
        this.calendar.cancelFocusInput();
        this.calendar.setOpen(false);
    }

    render() {
        return(
            <Fragment>
            <div className="form-group">
                <label className="width100" onClick={e => this.calendar.state.open && e.preventDefault()}> {this.props.label}
                    <DatePicker
                        selected={this.props.startTime}
                        onChange={this.props.handleChange}
                        disabled={this.props.disabled}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat={this.props.dateFormat ? this.props.dateFormat : DATE_FORMATS.timeh_mm_a}
                        timeCaption="Time"
                        timeFormat={this.props.dateFormat ? this.props.dateFormat : DATE_FORMATS.timeh_mm_a}
                        value={this.props.startTime}
                        minTime={this.props.minTime}
                        maxTime={this.props.maxTime}
                        onClickOutside={this.clickOutside}
                        ref={r => this.calendar = r}
                    />
                </label>
            </div>
        </Fragment>
        );
    }
}

export default CoreoTimePicker;