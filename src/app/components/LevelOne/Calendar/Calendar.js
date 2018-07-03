import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends React.Component {

    render() {
        return(
            <label> {this.props.label}
                <DatePicker
                    selected={this.props.startDate}
                    onChange={this.props.onDateChange}
                    dateFormat="LL"
                    placeholderText="June 6, 1972"
                    className="form-control datePicker"
                />
            </label>
        );
    }
}

export default Calendar;