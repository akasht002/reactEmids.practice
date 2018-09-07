import React from "react";
import DatePicker from 'react-datepicker';

class DatePickerComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            DateDisable: false,
            DateLabelClass: "DatePickerDisabled"
        };
        this.DateChange = this.DateChange.bind(this);
        this.EnableDatePicker = this.EnableDatePicker.bind(this);
        this.DisableDatePicker = this.DisableDatePicker.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
    };

    DateChange(date) {
        this.setState({
            startDate: date
        });
    };

    EnableDatePicker() {
        this.setState({
            DateDisable: false,
            DateLabelClass: "DatePickerEnabled"
        });
    };

    DisableDatePicker() {
        if(!this.state.startDate) {
            this.setState({
                DateDisable: false,
                DateLabelClass: "DatePickerDisabled"
            });
        }
    };

    onFocusInput(){
        this.EnableDatePicker();
    }

    onBlurInput(){
        this.DisableDatePicker();
    }

    render() {
        return(
            <div className="form-group">
                <label className={"m-0 DatePickerLabel " + this.state.DateLabelClass}> <span onClick={this.EnableDatePicker}>{this.props.labelText}</span></label>
                <DatePicker
                    name="DoB"
                    selected={this.state.startDate}
                    onChange={this.DateChange}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="scroll"
                    placeholderText={this.props.placeholder}
                    dateFormat={this.props.dateFormat}
                    className={this.props.className}
                    disabled={this.state.DateDisable}
                    shouldCloseOnSelect={true}
                    onFocus={this.onFocusInput}
                    onBlur={this.onBlurInput}
                />
            </div>
        );
    }
}

export default DatePickerComp;