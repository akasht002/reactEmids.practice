import React from 'react'
import moment from 'moment'
import Select from 'react-select'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Scrollbars } from '../../components'
import './ProfileMainPanel.css'
import {
  convertStringToDate,
  partialCompare
} from '../../utils/validations'
import {
  getServiceProviderVists,
  getServiceVisitCount
} from '../../redux/dashboard/Dashboard/actions'
import { ServiceCalendarDefault } from './ServiceInfo'

const today = new Date()

class serviceCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(today).format(),
      startMonth: moment(today).format('MMM'),
      startYear: moment(today).format('YYYY'),
      changedDate: '',
      DateDisable: false,
      DateLabelClass: 'DatePickerDisabled',
      reportDay: moment(today).format(),
      selectedMonth: {
        label: moment(today).format('MMM'),
        value: moment(today).format('MMM')
      },
      showMore: false,
      verticalScroll: false,
      width: window.innerWidth
    }
  }

  MonthChange = e => {
    let curDate = this.state.startYear + ',' + e.value + ',01'
    curDate = new Date(curDate)
    this.setState({
      startDate: moment(curDate).format(),
      reportDay: moment(curDate).format(),
      selectedMonth: e
    })
  }

  clickNextWeek = () => {
    let updatedDay = ''
    if (this.state.width > '1280') {
      updatedDay = moment(this.state.startDate).add(5, 'days')
    } else {
      updatedDay = moment(this.state.startDate).add(7, 'days')
    }
    this.setState({
      startDate: updatedDay.format(),
      startYear: updatedDay.format('YYYY'),
      reportDay: updatedDay.format(),
      startMonth: updatedDay.format('MMM'),
      selectedMonth: {
        label: updatedDay.format('MMM'),
        value: updatedDay.format('MMM')
      }
    })
  }

  clickPrevWeek = () => {
    let updatedDay = ''
    if (this.state.width > '1280') {
      updatedDay = moment(this.state.startDate).subtract(5, 'days')
    } else {
      updatedDay = moment(this.state.startDate).subtract(7, 'days')
    }
    this.setState({
      startDate: updatedDay.format(),
      startYear: updatedDay.format('YYYY'),
      reportDay: updatedDay.format(),
      startMonth: updatedDay.format('MMM'),
      selectedMonth: {
        label: updatedDay.format('MMM'),
        value: updatedDay.format('MMM')
      }
    })
  }

  todayDate = () => {
    this.setState({
      startYear: moment(today).format('YYYY'),
      startDate: moment(today).format(),
      reportDay: moment(today).format(),
      startMonth: moment(today).format('MMM')
    })
  }

  handleDayChange = e => {
    let getDate = moment(e.target.getAttribute('data-date'))
    this.setState({
      reportDay: e.target.getAttribute('data-date'),
      startYear: getDate.format('YYYY'),
      startMonth: getDate.format('MMM'),
      selectedMonth: {
        label: getDate.format('MMM'),
        value: getDate.format('MMM')
      }
    })
  }

  clickShowMore = () => {
    this.setState({
      showMore: !this.state.showMore,
      verticalScroll: !this.state.verticalScroll
    })
  }

  optionChanged = e => {
    this.setState({
      selectedValue: e
    })
  }

  componentDidMount() {
    let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.props.getServiceProviderVists(utc)
    let d = new Date(utc)
    d.setMonth(d.getMonth() - 3)
    let start_date = d.toLocaleDateString()
    let d2 = new Date(utc)
    d2.setMonth(d2.getMonth() + 3)
    let end_date = d2.toLocaleDateString()
    const date_range = {
      start_date: start_date,
      end_date: end_date
    }
    this.props.getServiceVisitCount(date_range)
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth })
  }

  SelectOnBlur(e) { }

  optionClicked = e => {
    console.log(this.offset)
    let testDiv = document.getElementsByClassName('Select-menu-outer')
    testDiv.offsetBottom = testDiv.offsetTop + testDiv.offsetHeight
  }

  showServiceProviderList = data => {
    let date = convertStringToDate(data.target.value)
    this.props.getServiceProviderVists(date)
  }

  render() {
    let selectedDate = this.state.startDate

    const visitCount = this.props.serviceVistCount

    let dates = [
      {
        day: moment(selectedDate).subtract(2, 'days'),
        date: moment(selectedDate).subtract(2, 'days')
      },
      {
        day: moment(selectedDate).subtract(1, 'days'),
        date: moment(selectedDate).subtract(1, 'days')
      },
      {
        day: moment(selectedDate),
        date: moment(selectedDate)
      },
      {
        day: moment(selectedDate).add(1, 'days'),
        date: moment(selectedDate).add(1, 'days')
      },
      {
        day: moment(selectedDate).add(2, 'days'),
        date: moment(selectedDate).add(2, 'days')
      }
    ]

    if (this.state.width > '1280') {
      dates = [
        {
          day: moment(selectedDate).subtract(3, 'days'),
          date: moment(selectedDate).subtract(3, 'days')
        },
        {
          day: moment(selectedDate).subtract(2, 'days'),
          date: moment(selectedDate).subtract(2, 'days')
        },
        {
          day: moment(selectedDate).subtract(1, 'days'),
          date: moment(selectedDate).subtract(1, 'days')
        },
        {
          day: moment(selectedDate),
          date: moment(selectedDate)
        },
        {
          day: moment(selectedDate).add(1, 'days'),
          date: moment(selectedDate).add(1, 'days')
        },
        {
          day: moment(selectedDate).add(2, 'days'),
          date: moment(selectedDate).add(2, 'days')
        },
        {
          day: moment(selectedDate).add(3, 'days'),
          date: moment(selectedDate).add(3, 'days')
        }
      ]
    }

    let optionChecked = this.state.reportDay

    let current_month = new Date().getMonth();
    let pervious_month = moment.months().splice(current_month - 3, 3)
    let next_month_list = moment.months().splice(current_month, 3)

    let monthLists = pervious_month.concat(next_month_list)

    let monthList = monthLists.map(month => {
      return { label: month.substring(0,3), value: month.substring(0,3) }
    })

    let dateList = dates.map((daysMapping, i) => {
      let className = ''
      if (daysMapping.date.format() === moment(today).format()) {
        className = ' toDay'
      }
      return (
        <div className={'dateRow' + className}>
          <input
            id={'date' + daysMapping.date.format('DD')}
            data-date={daysMapping.date.format()}
            className='form-control'
            type='radio'
            name='profileDate'
            checked={optionChecked === daysMapping.date.format()}
            value={daysMapping.date.format('DDMMYYYY')}
            onClick={e => this.showServiceProviderList(e)}
          />
          <label
            htmlFor={'date' + daysMapping.date.format('DD')}
            className='dateLabel'
          >
            <span className='dayElement'>{daysMapping.date.format('ddd')}</span>
            <span className='dateElement'>{daysMapping.day.format('D')}</span>
          </label>
          <div className='eventIndicator'>

            {partialCompare(
              daysMapping.date.format('YYYY-MM-DD'),
              visitCount
            ) && <i className='indicator' />}

            {/* <i className='indicator' />
            <i className='indicator' /> */}
          </div>
        </div>
      )
    })

    let serviceVist = this.props.serviceVist
    let visitData = <ServiceCalendarDefault Servicelist={serviceVist} />

    return (
      <div
        className={
          this.state.showMore ? 'card ProfileCard extended' : 'card ProfileCard'
        }
      >
        <div className='ProfileCardBody'>
          <div className='ProfileCardHeader'>
            <span className='ProfileCardHeaderTitle primaryColor'>
              My Services Visits
            </span>
            {(this.props.serviceVistCount).length > 0 ?
              <Link className='ProfileCardHeaderLink' to='/visitHistory'>View all</Link>
              :
              ''
            }
          </div>
          <div className='topPalette'>
            <div className='monthPalette Center'>
              <Select
                id='ProfileMonth'
                multiple={false}
                className='ProfileMonthList MonthName'
                searchable={false}
                options={monthList}
                onChange={this.MonthChange}
                value={this.state.selectedMonth}
              />
              <span>{this.state.startYear}</span>
            </div>
            <div className='todayPalette'>
              <span
                className='btn ProfileCardTodayLink'
                onClick={this.todayDate}
              >
                Today
              </span>
            </div>
          </div>
          <div className='middlePalette'>
            <div className='datePalette'>
              <span
                className='ProfileCalendarCaret CaretPrev'
                onClick={this.clickPrevWeek}
              />
              <div onChange={this.handleDayChange} className='datesList'>
                {dateList}
              </div>
              <span
                className='ProfileCalendarCaret CaretNext'
                onClick={this.clickNextWeek}
              />
            </div>
          </div>
          <Scrollbars
            speed={2}
            smoothScrolling
            horizontal={false}
            vertical={this.state.verticalScroll}
            className='bottomPalette'
          >
            <ul className='list-group ProfileServicesVisitList'>
              {visitData}
            </ul>
          </Scrollbars>
        </div>
        <ul className='list-group list-group-flush'>
          <li
            className='list-group-item ProfileShowMore'
            onClick={this.clickShowMore}
          >
            Show more <i className='ProfileIconShowMore' />
          </li>
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceProviderVists: data => dispatch(getServiceProviderVists(data)),
    getServiceVisitCount: data => dispatch(getServiceVisitCount(data))
  }
}

function mapStateToProps(state) {
  return {
    serviceVist: state.dashboardState.dashboardState.serviceVist,
    serviceVistCount: state.dashboardState.dashboardState.serviceVistCount
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(serviceCalendar)
)
