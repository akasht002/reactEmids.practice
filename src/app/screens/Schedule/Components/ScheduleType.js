import React, { Fragment } from 'react';
import { Calendar, CoreoTimePicker } from '../../../components/LevelOne';
import { formateStateDateValue } from "../../../utils/validations";
import { getDiffTime, timeDropDownFormat, defaultStartTime, defaultEndTime } from "../../../utils/dateUtility";
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Select, Item } from '@zendeskgarden/react-select';
import { DATE_FORMATS, RECURRING_PATTERN_OPTIONS, SCHEDULE_TYPE_OPTIONS } from '../../../constants/constants'
import moment from 'moment';

export const ScheduleType = props => {
    let days = props.daysList.map(type => {
        return <Item className='ListItem CTDashboard' key={type.id}>{type.keyValue}</Item>;
    })

    let weekRecurrings = props.weekRecurring.map(type => {
        return <Item className='ListItem CTDashboard' key={type.id}>{type.value}</Item>;
    });

    return (
        <Fragment>
            {parseInt(props.planType, 10) === SCHEDULE_TYPE_OPTIONS.standard &&
                props.options.map(item => {
                    return (

                        <div className="schdule-typeblock col-md-6">
                            <fieldset>
                                <input
                                    type="radio"
                                    id={item.value}
                                    defaultChecked={props.selectedType === item.booleanValue}
                                    name={item.name}
                                    value={item.value}
                                    className="form-radio-input"
                                    onChange={() => { props.handleChangeScheduleType(item.booleanValue) }}
                                />
                                <label className="form-radio-label" htmlFor={item.value}>{item.value} <span className="RadioBoxIcon" /></label>
                            </fieldset>
                        </div>

                    )
                })
            }

            {!props.selectedType &&

                <div className="full-block-scheduleDate">
                    <div className="col-md-12  p-0 date-blockview">
                        <Calendar
                            startDate={props.startDate && formateStateDateValue(props.startDate)}
                            onDateChange={props.dateChanged}
                            onDateChangeRaw={props.dateChangedRaw}
                            mandatory={false}
                            minDate={moment()}
                            value={props.startDate}
                            className={"form-control datePicker"}
                            label="Start Date"
                            dateFormat={DATE_FORMATS.m_d_yy}
                            placeholderText={DATE_FORMATS.m_d_yy}
                        />
                        {!props.startDate && props.onClickSave &&
                            <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                Please select Start Date
                        </span>}
                        <div className="form-group2block">
                            <div className="col-md-4 pd-left-0">
                                <CoreoTimePicker
                                    startTime={props.startTime}
                                    handleChange={props.handleChangeStartTime}
                                    value={props.startTime}
                                    label="Start Time"
                                    minTime={defaultStartTime()}
                                    maxTime={props.endTime ? timeDropDownFormat(props.endTime) : defaultEndTime()}
                                    placeholderText={'Start Time'}
                                />
                                {!props.startTime && props.onClickSave &&
                                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                        Please select Start Time
                        </span>}
                            </div>
                            <div className="col-md-4">
                                <CoreoTimePicker
                                    startTime={props.endTime}
                                    handleChange={props.handleChangeEndTime}
                                    value={props.endTime}
                                    minDate={props.startTime}
                                    label="End Time"
                                    disabled={!props.startTime}
                                    minTime={timeDropDownFormat(props.startTime)}
                                    maxTime={defaultEndTime()}
                                    placeholderText={'End Time'}
                                />
                                {!props.endTime && props.onClickSave &&
                                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                        Please select End Time
                            </span>}
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <h4>Duration</h4>
                                    {
                                        props.endTime ?
                                            <h5>{getDiffTime(props.startTime, props.endTime)} Hour(s)</h5>
                                            :
                                            <h5> 00:00 Hour(s)</h5>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {props.selectedType && parseInt(props.planType, 10) === SCHEDULE_TYPE_OPTIONS.standard &&
                <div className="full-block-scheduleDate">
                    <div className="col-md-6  p-6">
                        <div className="left-recurringpattern">
                            <span className="width100">Select the recurring pattern</span>
                            {
                                props.recurringPatternList.map(item => {
                                    return (
                                        <div className="recurr_pattern_radioblock">
                                            <fieldset>
                                                <input
                                                    type="radio"
                                                    id={item.id}
                                                    name={'recurringPattern'}
                                                    value={item.keyValue}
                                                    className="form-radio-input"
                                                    defaultChecked={item.id === props.selectedRecurringType}
                                                    onChange={() => { props.handleChangeRecurringPattern(item.id) }}
                                                />
                                                <label className="form-radio-label" htmlFor={item.id}>{item.keyValue} <span className="RadioBoxIcon" /></label>
                                            </fieldset>
                                        </div>
                                    )
                                })
                            }

                            {props.selectedRecurringType === RECURRING_PATTERN_OPTIONS.daily &&

                                <Fragment>
                                    <div className="right-monthblock">

                                        <div className="every-dayblock">
                                            <fieldset>
                                                <label>Every</label>
                                                <input
                                                    type="text"
                                                    name={'recurringPattern'}
                                                    value={props.dailyDayOccurence}
                                                    maxLength={2}
                                                    autoComplete='off'
                                                    onChange={(e) => { props.handleChangeDailyDayOccurence(e.target.value) }}
                                                />
                                                <label>{'Day(s)'}</label>
                                            </fieldset>
                                        </div>
                                    </div>
                                </Fragment>
                            }
                            {props.selectedRecurringType === RECURRING_PATTERN_OPTIONS.weekly &&
                                <Fragment>
                                    <div class="right-monthblock">

                                        <div className="every-dayblock">
                                            <fieldset>
                                                <label>Every</label>
                                                <input
                                                    type="text"
                                                    name={'recurringPattern'}
                                                    value={props.weeklyDayOccurence}
                                                    maxLength={2}
                                                    autoComplete='off'
                                                    onChange={(e) => { props.handleChangeWeeklyDayOccurence(e.target.value) }}
                                                />
                                                <label>{'Week(s)'}</label>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="week-column">
                                        <fieldset className="parent-col">
                                            {props.daysList.map(item => {
                                                return (
                                                    <fieldset>
                                                        <input
                                                            type="checkbox"
                                                            id={item.id}
                                                            defaultChecked={item.selected}
                                                            className="form-radio-input"
                                                            name={item.keyValue}
                                                            value={item.keyValue}
                                                            onChange={(e) => { props.handleChangeDaysSelection(e) }}
                                                        />
                                                        <label class="form-radio-label" htmlFor={item.id}>{(item.keyValue).charAt(0)}</label>

                                                    </fieldset>
                                                )
                                            })}
                                        </fieldset>
                                    </div>
                                </Fragment>
                            }

                            {props.selectedRecurringType === RECURRING_PATTERN_OPTIONS.monthly &&
                                <Fragment>
                                    <div className="right-monthblock">
                                        <div className="left-radioblock clearfix">
                                            <fieldset>
                                                <input
                                                    id={'Pattern3'}
                                                    type="radio"
                                                    name="monthly"
                                                    value={1}
                                                    className="form-radio-input"
                                                    onChange={(e) => { props.handleChangeMonthlySelectionFirst(e.target.id) }}
                                                />
                                                <label className="form-radio-label" htmlFor={'Pattern3'}><span className="RadioBoxIcon" /></label>
                                            </fieldset>
                                        </div>
                                        <fieldset className="right-colblock">
                                            <label>Day</label>
                                            <input
                                                type="text"
                                                name={'recurringPattern'}
                                                value={props.monthlyDay}
                                                maxLength={2}
                                                autoComplete='off'
                                                onChange={(e) => { props.handleChangeMonthlyDay(e.target.value) }}
                                            />
                                            <label>of every</label>
                                            <input
                                                type="text"
                                                name={'recurringPattern'}
                                                value={props.monthlyMonths}
                                                maxLength={2}
                                                autoComplete='off'
                                                onChange={(e) => { props.handleChangeMonthlyMonths(e.target.value) }}
                                            />
                                            <label>Month(s)</label>
                                        </fieldset>
                                    </div>
                                    {<div className="last-block-monthwise">

                                        <div className="left-radioblock clearfix">
                                            <fieldset>
                                                <input
                                                    id={2}
                                                    type="radio"
                                                    name="monthly"
                                                    value={2}
                                                    className="form-radio-input"
                                                    onChange={(e) => { props.handleChangeMonthlySelectionSecond(e.target.id) }}
                                                />
                                                <label className="form-radio-label" htmlFor={2}><span className="RadioBoxIcon" /></label>
                                            </fieldset>
                                        </div>

                                        <fieldset className="right-colblock2">
                                            <label>The</label>
                                            <ThemeProvider>
                                                <SelectField>
                                                    <Select
                                                        placement="bottom"
                                                        options={weekRecurrings}
                                                        onChange={props.handleChangeSelectedDays}
                                                        selectedValue={props.selectedDays}
                                                        className='onBoardingSelect'
                                                    >
                                                        {props.selectedDaysLabel ? props.selectedDaysLabel : <span className="Select-placeholder pl-0">Select weekly</span>}
                                                    </Select>
                                                </SelectField>
                                            </ThemeProvider>
                                            <ThemeProvider>
                                                <SelectField>
                                                    <Select
                                                        placement="bottom"
                                                        options={days}
                                                        onChange={props.handleChangeSelectedWeeks}
                                                        selectedValue={props.selectedWeeks}
                                                        className='onBoardingSelect'
                                                    >
                                                        {props.selectedWeeksLabel ? props.selectedWeeksLabel : <span className="Select-placeholder pl-0">Select Day</span>}
                                                    </Select>
                                                </SelectField>
                                            </ThemeProvider>
                                            <label>of every</label>
                                            <input
                                                type="text"
                                                name={'recurringPattern'}
                                                value={props.monthlyMonthsSecond}
                                                maxLength={2}
                                                autoComplete='off'
                                                onChange={(e) => { props.handleChangeMonthlyMonthsSecond(e.target.value) }}
                                            />
                                            <label>Month(s)</label>
                                        </fieldset>
                                    </div>}
                                </Fragment>
                            }
                        </div>
                    </div>

                    <div className="col-md-6 mb-4 p-0 start-rightdate">
                        <Calendar
                            startDate={props.startDate && formateStateDateValue(props.startDate)}
                            onDateChange={props.dateChanged}
                            onDateChangeRaw={props.dateChangedRaw}
                            mandatory={false}
                            minDate={moment()}
                            value={props.startDate}
                            className={"form-control datePicker"}
                            label="Start Date"
                            dateFormat={DATE_FORMATS.m_d_yy}
                            placeholderText={DATE_FORMATS.m_d_yy}
                            maxDate={props.endDate && formateStateDateValue(props.endDate)}
                        />
                        {!props.startDate && props.onClickSave &&
                            <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                Please select Start Date
                        </span>}
                        <Calendar
                            startDate={props.endDate && formateStateDateValue(props.endDate)}
                            onDateChange={props.todateChanged}
                            onDateChangeRaw={props.todateChangedRaw}
                            mandatory={false}
                            minDate={props.startDate ? formateStateDateValue(props.startDate) : moment()}
                            value={props.endDate}
                            className={"form-control datePicker"}
                            label="End Date"
                            dateFormat={DATE_FORMATS.m_d_yy}
                            placeholderText={DATE_FORMATS.m_d_yy}
                            disabled={!props.startDate}
                        />
                        {!props.endDate && props.onClickSave &&
                            <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                Please select End Date
                        </span>}
                        <div className="form-group2block full-block">
                            <div className="col-md-4 pd-left-0">
                                <CoreoTimePicker
                                    startTime={props.startTime}
                                    handleChange={props.handleChangeStartTime}
                                    value={props.startTime}
                                    label="Start Time"
                                    minTime={defaultStartTime()}
                                    maxTime={props.endTime ? timeDropDownFormat(props.endTime) : defaultEndTime()}
                                />
                                {!props.startTime && props.onClickSave &&
                                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                        Please select Start Time
                        </span>}
                            </div>
                            <div className="col-md-4">
                                <CoreoTimePicker
                                    startTime={props.endTime}
                                    handleChange={props.handleChangeEndTime}
                                    value={props.endTime}
                                    disabled={!props.startTime}
                                    label="End Time"
                                    minTime={timeDropDownFormat(props.startTime)}
                                    maxTime={defaultEndTime()}
                                />
                                {!props.endTime && props.onClickSave &&
                                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                        Please select End Time
                        </span>}
                            </div>
                            <div className="col-md-4">

                                <div className="form-group">
                                    <h4>Duration</h4>
                                    {
                                        props.endTime ?
                                            <h5>{getDiffTime(props.startTime, props.endTime)} Hour(s)</h5>
                                            :
                                            <h5> 00:00 Hour(s)</h5>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </Fragment >
    )
}
