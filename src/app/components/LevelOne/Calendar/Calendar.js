import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';
import './styles.css';

class Calendar extends Component {

    clickOutside = () => {
        this.calendar.cancelFocusInput();
        this.calendar.setOpen(false);
    }

    render() {
        return(
            <div className="form-group">
                <label className="width100" onClick={e => this.calendar.state.open && e.preventDefault()}> {this.props.label}
                    <DatePicker
                        selected={this.props.startDate}
                        onChange={this.props.onDateChange}
                        onChangeRaw={this.props.onDateChangeRaw}
                        dateFormat="MM-DD-YYYY"
                        ref={r => this.calendar = r}
                        onClickOutside={this.clickOutside}
                        placeholderText="MM-DD-YYYY"
                        className={this.props.className}
                        disabled={this.props.disabled}
                        shouldCloseOnSelect={true}
                        maxDate={this.props.maxDate}
                        minDate={this.props.minDate}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        value={this.props.value}
                    />
                </label>
            </div>
        );
    }
}

Calendar.propTypes = {
    startDate: PropTypes.string,
    onDateChange: PropTypes.func,
    onDateChangeRaw: PropTypes.func,
    className: PropTypes.string
}

export default Calendar;