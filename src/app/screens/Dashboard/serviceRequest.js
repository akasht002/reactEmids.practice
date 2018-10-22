import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { CSS_PROPS } from './css-data-props'
import { Scrollbars } from '../../components'
import {
  ServiceProviderRequestDetails,
  ServiceRequestDefault
} from './ServiceInfo'
import './ProfileMainPanel.css'
import {
  getPatientServiceRequestDetail,
  getServiceStatusDetail
} from '../../redux/dashboard/Dashboard/actions'
import {
  getVisitServiceDetails,
  getVisitServiceSchedule
} from '../../redux/visitSelection/VisitServiceDetails/actions'

import { getLength } from '../../utils/validations'

class ServiceRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: true,
      min:0,
      max:2,
      selectedValue: { label: 'Hired', value: '38' }
    }
    this.toggleName = 'Show more'
  }

  componentDidMount() {
    this.props.getPatientServiceRequestDetail(this.state.selectedValue.value)
    this.props.getServiceStatusDetail()
  }

  componentWillReceiveProps(nextProps) { }

  clickShowMore = () => {
    this.setState({
      showMore: !this.state.showMore,
      min:0,
      max:5
    })
    if (this.toggleName === 'Show more') {
      this.toggleName = 'Show less'
    } else {
      this.toggleName = 'Show more'
    }
  }

  optionChanged = (e) => {
    this.setState({
      selectedValue: e
    })
    this.props.getPatientServiceRequestDetail(e.id)
  }
  handleClick = requestId => {
    this.props.getVisitServiceDetails(requestId)
    this.props.getVisitServiceSchedule(requestId)
  }

  menuRenderer = (params) => {
    const menu = Select.defaultProps.menuRenderer(params)

    const scrollBarProps = {
      autoHeight: true,
      autoHeightMin: 0,
      autoHeightMax: 200
    }

    return (
      <Scrollbars {...scrollBarProps}>
        {menu}
      </Scrollbars>
    )
  }

  render() {
    const serviceStatusLookUp = this.props.serviceStatusLookUp.map(
      (data, i) => {
        data.label = data.keyValue
        data.value = data.id
        return data
      }
    )

    let serviceRequest = this.props.patientServiceRequest
    let serviceRequestItem = ''
    serviceRequestItem = getLength(serviceRequest) > 0
      ? <ServiceProviderRequestDetails
        serviceRequest={this.props.patientServiceRequest}
        handleClick={requestId => this.handleClick(requestId)}
        minVal={this.state.min}
        maxVal={this.state.max}
      />
      : <ServiceRequestDefault />
    return (
      <div
        className={
          this.state.showMore ? 'card ProfileCard' : 'card ProfileCard extended'
        }
      >
        <div className='ProfileCardBody'>
          <div className='ProfileCardHeader'>
            <span className='ProfileCardHeaderTitle primaryColor'>
              Service Requests
            </span>
            {getLength(serviceRequest) > 5 &&
            <Link className='ProfileCardHeaderLink' to='/visitServiceList'>View all</Link>
            }
          </div>
          <div className='topPalette'>
            <div className='monthPalette'>
              <Select
                menuRenderer={this.menuRenderer}
                id='ProfileMonth'
                multiple={false}
                className='ProfileMonthList'
                searchable={false}
                onChange={this.optionChanged}
                options={serviceStatusLookUp}
                value={this.state.selectedValue}
              />
            </div>
          </div>
          <Scrollbars
            speed={2}
            smoothScrolling
            horizontal={false}
            stopScrollPropagation
            className={
              getLength(this.props.patientServiceRequest) >2
                ? CSS_PROPS.Scrollbars_With_No_Length
                : CSS_PROPS.Scrollbars_With_Length
            }
          >
            <ul className='list-group ProfileServicesVisitList'>
              {serviceRequestItem}
            </ul>
          </Scrollbars>
        </div>
        {getLength(serviceRequest) > 2 &&
          <ul className='list-group list-group-flush'>
            <li
              className='list-group-item ProfileShowMore'
              onClick={this.clickShowMore}
            >
             {this.toggleName} <i className='ProfileIconShowMore' />
            </li>
          </ul>
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPatientServiceRequestDetail: data =>
      dispatch(getPatientServiceRequestDetail(data)),
    getServiceStatusDetail: () => dispatch(getServiceStatusDetail()),    
    getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
    getVisitServiceSchedule: data => dispatch(getVisitServiceSchedule(data)),
  }
}

function mapStateToProps(state) {
  return {
    conversationDetail: state.dashboardState.dashboardState.conversationDetail,
    patientServiceRequest: state.dashboardState.dashboardState
      .patientServiceRequest,
    serviceStatusLookUp: state.dashboardState.dashboardState
      .serviceStatusLookUp
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceRequest)
)
