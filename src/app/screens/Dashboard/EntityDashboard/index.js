import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import moment from 'moment'
import Individuals from './Individual'
import ServiceVisits from './ServiceVisits'
import ServiceProvider from './ServiceProvider'
import ServiceRequest from './ServiceRequest'
import { Calendar } from '../../../components/LevelOne'
import { formateStateDate } from '../../../utils/validations'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover'
import { formatDate } from '../../../utils/dateUtility'
import { DATE_FORMAT, entityDashboardTab } from '../../../constants/constants'
import {setActiveTab, setFromDate, setToDate} from '../../../redux/dashboard/EntityDashboard/Individuals/actions';
// import { getUserInfo } from '../../../redux/auth/UserAgreement/actions';
import { getAboutUsContent, getBuildVersion } from '../../../redux/aboutUs/actions';
import { getMessageFallBackInterval } from '../../../redux/asyncMessages/actions';
import { createDataStore } from '../../../redux/telehealth/actions'
import './entity-user-dashboard.css'

class EntityDashboard extends Component {
  constructor (props) {
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

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleTabs (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        filterOpen: false
      })
      this.props.setActiveTab(tab)
    }
  }

  toggleFilter () {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  toggleSearch () {
    this.setState({
      SearchOpen: !this.state.SearchOpen
    })
  }

  componentDidMount () {
    // this.props.getUserInfo();
    // this.props.getAboutUsContent();
    // this.props.getBuildVersion();
    // this.props.getMessageFallBackInterval();
    this.setState({activeTab: this.props.activeTab})
    this.updateHeight.bind(this)
    window.addEventListener('load', this.updateHeight.bind(this))
    window.addEventListener('resize', this.updateHeight.bind(this))
  }

  componentDidUpdate () {
    this.updateHeight.bind(this)
  }

  updateHeight () {
    if (window.innerWidth >= '767') {
      this.setState({
        height: window.innerHeight
      })
    }
    if (window.innerWidth <= '768' && window.innerWidth >= '479') {
      this.setState({
        height: window.innerHeight
      })
    }
    if (window.innerWidth <= '480') {
      this.setState({
        height: window.innerHeight + 30
      })
    }
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

  render () {
    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle entity-dashboard-topview'>
            <div className='ProfileHeaderLeft'>
              <h5 className='primaryColor m-0'>Dashboard</h5>
            </div>
            <div className='ProfileHeaderRight'>
              <div>
                <div className='CTDateFilter'>
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
                  />
                </div>
                <div className='CTDateFilter'>
                  <Calendar
                    startDate={
                      this.state.toDate && formateStateDate(this.state.toDate)
                    }
                    onDateChange={this.toDateChanged}
                    mandatory={false}
                    value={this.state.toDate}
                    className={'form-control datePicker'}
                    label='To'
                  />
                </div>
                <div className='CTDateFilter'>
                  <button
                    className='btn btn-outline-primary CTHeaderFilterToday'
                    onClick={this.todaysDate}
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='entity-dashboard-section'>
          <Nav tabs className='tab-link'>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === entityDashboardTab.individuals
                })}
                onClick={() => {                  
                  this.toggleTabs(entityDashboardTab.individuals)
                }}
              >
                Individuals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === entityDashboardTab.serviceProviders
                })}
                onClick={() => {
                  this.toggleTabs(entityDashboardTab.serviceProviders)
                }}
              >
                Service Providers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === entityDashboardTab.serviceRequests
                })}
                onClick={() => {
                  this.toggleTabs(entityDashboardTab.serviceRequests)
                }}
              >
                Service Requests
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === entityDashboardTab.serviceVisits
                })}
                onClick={() => {
                  this.toggleTabs(entityDashboardTab.serviceVisits)
                }}
              >
                Service Visits
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className='tab-content tab-content-block' activeTab={this.state.activeTab}>
            <TabPane tabId={entityDashboardTab.individuals} className='tab-pane TabBody'>
            {this.state.activeTab === entityDashboardTab.individuals && <Individuals
                toggleSearch={this.toggleSearch.bind(this)}
                toggleFilter={this.toggleFilter.bind(this)}
                isOpenFilter={this.state.filterOpen}
                SearchOpen={this.state.SearchOpen}
                fromDate={moment(this.state.fromDate).format('l')}
                toDate={moment(this.state.toDate).format('l')}
                createDataStore={this.props.createDataStore}
              />}
            </TabPane>
            <TabPane tabId={entityDashboardTab.serviceProviders} className='tab-pane TabBody'>
            {this.state.activeTab === entityDashboardTab.serviceProviders && <ServiceProvider
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                isOpenFilter={this.state.filterOpen}
                toggleSearch={this.toggleSearch.bind(this)}
                toggleFilter={this.toggleFilter.bind(this)}
                SearchOpen={this.state.SearchOpen}
                createDataStore={this.props.createDataStore}
              /> }
            </TabPane>
            <TabPane tabId={entityDashboardTab.serviceRequests} className='TabBody'>
            {this.state.activeTab === entityDashboardTab.serviceRequests && <ServiceRequest
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                isOpenFilter={this.state.filterOpen}
                toggleSearch={this.toggleSearch.bind(this)}
                toggleFilter={this.toggleFilter.bind(this)}
                SearchOpen={this.state.SearchOpen}
              />}
            </TabPane>
            <TabPane tabId={entityDashboardTab.serviceVisits} className='TabBody'>
            {this.state.activeTab === entityDashboardTab.serviceVisits && <ServiceVisits
                fromDate={moment(this.state.fromDate).format('l')}
                toDate={moment(this.state.toDate).format('l')}
                isOpenFilter={this.state.filterOpen}
                toggleSearch={this.toggleSearch.bind(this)}
                toggleFilter={this.toggleFilter.bind(this)}
                SearchOpen={this.state.SearchOpen} 
              />}
            </TabPane>
          </TabContent>
        </section>

      </AsideScreenCover>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveTab: data => dispatch(setActiveTab(data)),
//     // getUserInfo: () => dispatch(getUserInfo()),
//     getBuildVersion: () => dispatch(getBuildVersion()),
//     getAboutUsContent: () => dispatch(getAboutUsContent()),
//     getMessageFallBackInterval: () => dispatch(getMessageFallBackInterval()),
//     createDataStore: data => dispatch(createDataStore(data)),
    setFromDate: data => dispatch(setFromDate(data)),
    setToDate: data => dispatch(setToDate(data)),
  }
}

function mapStateToProps(state) {
  return {
    activeTab: state.dashboardState.individualsListState.activeTab,
    fromDate: state.dashboardState.individualsListState.fromDate,
    toDate: state.dashboardState.individualsListState.toDate
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntityDashboard)
)
