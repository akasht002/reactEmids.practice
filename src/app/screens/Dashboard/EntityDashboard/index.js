import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { TabContent, TabPane } from 'reactstrap'
import moment from 'moment'
import Individuals from './Individual'
import ServiceVisits from './ServiceVisits'
import ServiceProvider from './ServiceProvider'
import ServiceRequest from './ServiceRequest'
import { Calendar } from '../../../components/LevelOne'
import { formateStateDate } from '../../../utils/validations'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover'
import { formatDate } from '../../../utils/dateUtility'
import { DATE_FORMAT, entityDashboardTab, ENTITY_DASHBOARD_STATUS } from '../../../constants/constants'
import { setActiveTab, setFromDate, setToDate } from '../../../redux/dashboard/EntityDashboard/Individuals/actions';
import { getAboutUsContent, getBuildVersion } from '../../../redux/aboutUs/actions';
import { getMessageFallBackInterval } from '../../../redux/asyncMessages/actions';
import { createDataStore } from '../../../redux/telehealth/actions'
import './entity-user-dashboard.css'
import { Tabs } from './Components/Tabs/Tabs';

class EntityDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      activeTab: '1',
      height: '',
      filterOpen: false,
      SearchOpen: false,
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleTabs = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        filterOpen: false
      })
      this.props.setActiveTab(tab)
    }
  }

  toggleFilter() {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  toggleSearch = () => {
    this.setState({
      SearchOpen: !this.state.SearchOpen
    })
  }

  componentDidMount() {
    this.props.getAboutUsContent();
    this.props.getBuildVersion();
    this.props.getMessageFallBackInterval();
    this.setState({ activeTab: this.props.activeTab })
  }

  fromDateChanged = date => {
    const formattedDate = date ? formatDate(date, DATE_FORMAT) : null
    this.setState({ fromDate: formattedDate })
    this.props.setFromDate(formattedDate)
  }

  toDateChanged = date => {
    const formattedDate = date ? formatDate(date, DATE_FORMAT) : null
    this.setState({ toDate: formattedDate })
    this.props.setToDate(formattedDate)
  }

  todaysDate = () => {
    this.setState({
      fromDate: moment().toDate(),
      toDate: moment().toDate()
    })
    this.props.setFromDate(moment().toDate())
    this.props.setToDate(moment().toDate())
  }

  render() {
    let disableDate = ((this.props.activeStatus === ENTITY_DASHBOARD_STATUS.individuals.statCard.all) ||
    (this.props.activeStatus === ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.lowRating)) &&
      (this.state.activeTab === entityDashboardTab.individuals || this.state.activeTab === entityDashboardTab.serviceProviders)
    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle entity-dashboard-topview'>
            <div className='ProfileHeaderLeft'>
              <h5 className='primaryColor m-0'>Dashboard</h5>
            </div>
            <div className='ProfileHeaderRight'>
              <div>
                <div className='entity-date-filter'>
                  <Calendar
                    startDate={
                      this.state.fromDate &&
                      formateStateDate(this.state.fromDate)
                    }
                    onDateChange={this.fromDateChanged}
                    mandatory={false}
                    value={this.state.fromDate}
                    className={'form-control datePicker'}
                    label='From'
                    disabled={disableDate}
                  />
                </div>
                <div className='entity-date-filter'>
                  <Calendar
                    startDate={
                      this.state.toDate && formateStateDate(this.state.toDate)
                    }
                    onDateChange={this.toDateChanged}
                    mandatory={false}
                    value={this.state.toDate}
                    className={'form-control datePicker'}
                    label='To'
                    disabled={disableDate}
                  />
                </div>
                <div className='entity-date-filter'>
                  <button
                    className='btn btn-outline-primary CTHeaderFilterToday'
                    onClick={this.todaysDate}
                    disabled={disableDate}
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='entity-dashboard-section'>
          <Tabs
            activeTab={this.state.activeTab}
            toggleTabs={this.toggleTabs}
          />
          <TabContent className='tab-content tab-content-block' activeTab={this.state.activeTab}>
            <TabPane tabId={entityDashboardTab.individuals} className='tab-pane TabBody'>
              {this.props.activeTab === entityDashboardTab.individuals && <Individuals
                toggleSearch={this.toggleSearch}
                toggleFilter={this.toggleFilter}
                isOpenFilter={this.state.filterOpen}
                SearchOpen={this.state.SearchOpen}
                fromDate={moment(this.state.fromDate).format('l')}
                toDate={moment(this.state.toDate).format('l')}
                createDataStore={this.props.createDataStore}
              />}
            </TabPane>
            <TabPane tabId={entityDashboardTab.serviceProviders} className='tab-pane TabBody'>
              {this.props.activeTab === entityDashboardTab.serviceProviders && <ServiceProvider
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                isOpenFilter={this.state.filterOpen}
                toggleSearch={this.toggleSearch}
                toggleFilter={this.toggleFilter}
                SearchOpen={this.state.SearchOpen}
                createDataStore={this.props.createDataStore}
              />}
            </TabPane>
            <TabPane tabId={entityDashboardTab.serviceRequests} className='TabBody'>
              {this.props.activeTab === entityDashboardTab.serviceRequests && <ServiceRequest
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                isOpenFilter={this.state.filterOpen}
                toggleSearch={this.toggleSearch}
                toggleFilter={this.toggleFilter}
                SearchOpen={this.state.SearchOpen}
              />}
            </TabPane>
            <TabPane tabId={entityDashboardTab.serviceVisits} className='TabBody'>
              {this.props.activeTab === entityDashboardTab.serviceVisits && <ServiceVisits
                fromDate={moment(this.state.fromDate).format('l')}
                toDate={moment(this.state.toDate).format('l')}
                isOpenFilter={this.state.filterOpen}
                toggleSearch={this.toggleSearch}
                toggleFilter={this.toggleFilter}
                SearchOpen={this.state.SearchOpen}
              />}
            </TabPane>
          </TabContent>
        </section>

      </AsideScreenCover>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTab: data => dispatch(setActiveTab(data)),
    getBuildVersion: () => dispatch(getBuildVersion()),
    getAboutUsContent: () => dispatch(getAboutUsContent()),
    getMessageFallBackInterval: () => dispatch(getMessageFallBackInterval()),
    createDataStore: data => dispatch(createDataStore(data)),
    setFromDate: data => dispatch(setFromDate(data)),
    setToDate: data => dispatch(setToDate(data)),
  }
}

function mapStateToProps(state) {
  return {
    activeTab: state.dashboardState.individualsListState.activeTab,
    fromDate: state.dashboardState.individualsListState.fromDate,
    toDate: state.dashboardState.individualsListState.toDate,
    activeStatus: state.dashboardState.individualsListState.activeStatus
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntityDashboard)
)
