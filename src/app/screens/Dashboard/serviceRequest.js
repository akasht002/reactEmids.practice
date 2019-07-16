import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { CSS_PROPS } from './css-data-props'
import { Scrollbars } from '../../components'
import {VIEW_ALL_COUNT} from '../../constants/constants'
import {
  ServiceProviderRequestDetails
} from './Components/RequestList'
import {
  ServiceRequestDefault
} from './Components/RequestDefault'
import './ProfileMainPanel.css'
import {
  getPatientServiceRequestDetail,
  getServiceStatusDetail
} from '../../redux/dashboard/Dashboard/actions'
import {
  getServiceRequestId
} from '../../redux/visitSelection/VisitServiceDetails/actions'
import { Path } from '../../routes';
import { push } from '../../redux/navigation/actions'
import { setPatient } from "../../redux/patientProfile/actions";
import { setServiceRequestStatus } from '../../redux/visitSelection/VisitServiceList/actions'
import {
  ServiceRequestStatus
} from "../../redux/visitSelection/ServiceRequestFilters/actions";
import { getLength } from '../../utils/validations'
import { Preloader } from '../../components'

class ServiceRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false,
      min:0,
      max:2,
      selectedValue: { label: 'All', value: '0' }
    }
    this.toggleName = 'Show more'
    this.phoneNumber = ''
  }

  componentDidMount() {
    this.props.getPatientServiceRequestDetail(this.state.selectedValue.value)
    this.props.getServiceStatusDetail()
    this.props.ServiceRequestStatus()
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
      selectedValue: e,
      showMore: false
    })
    this.toggleName = 'Show more'
    this.props.getPatientServiceRequestDetail(e.id)
  }

  handleClick = requestId => {
    this.props.getServiceRequestId(requestId)
    this.props.goToServiceRequestDetailsPage();
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

  handleViewAll = () => {
    this.props.setServiceRequestStatus({status: this.state.selectedValue.value, isDashboardFilteredStatus: true}) // Temporarily disabling the functionality till the pagination in SR listing screen is fixed.
  }

  render() {
    const serviceStatusLookUp = this.props.serviceStatusLookUp.map(
      (data, i) => {
        data.label = data.keyValue
        data.value = data.id
        return data
      }
    )   
    let serviceRequest = this.props.patientServiceRequest && _.uniqBy(this.props.patientServiceRequest, 'serviceRequestId');
    let serviceRequestItem = ''
    serviceRequestItem = serviceRequest? getLength(serviceRequest) > 0
      ? <ServiceProviderRequestDetails
        serviceRequest={serviceRequest}
        handleClick={requestId => this.handleClick(requestId)}
        minVal={this.state.min}
        maxVal={this.state.max}
        goToPatientProfile={data => {
          console.log(data)
          this.props.setPatient(data);
          this.props.goToPatientProfile();
        }}   
      />
      : <ServiceRequestDefault /> : <Preloader/>
    return (
      <div
        className={
          this.state.showMore ? 'card ProfileCard extended' : 'card ProfileCard'
        }
      >
        <div className='ProfileCardBody'>
          <div className='ProfileCardHeader'>
            <span className='ProfileCardHeaderTitle primaryColor'>
              Service Requests
            </span>
            {getLength(serviceRequest) > VIEW_ALL_COUNT &&
            <span className='ProfileCardHeaderLink'
            onClick={e => this.handleViewAll()}
            >View all</span>
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
          {/* <Scrollbars
            speed={2}
            smoothScrolling
            horizontal={false}
            stopScrollPropagation
            className={
              getLength(this.props.patientServiceRequest) < 2
                ? CSS_PROPS.Scrollbars_With_No_Length
                : CSS_PROPS.Scrollbars_With_Length
            }
          > */}
          <div className={
              getLength(this.props.patientServiceRequest) < 2
                ? CSS_PROPS.Scrollbars_With_No_Length
                : CSS_PROPS.Scrollbars_With_Length
            + " scrollarea ProfileContentWidget ScrollBar"}>
            <div className="scrollarea-content">
            {this.props.isServiceRequestLoading && <Preloader/>}
            <ul className='list-group ProfileServicesVisitList'>
              {serviceRequestItem}
            </ul>
            </div></div>
          {/* </Scrollbars> */}
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
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    goToServiceRequestDetailsPage: () => dispatch(push(Path.visitServiceDetails)),
    goToPatientProfile: () => dispatch(push(Path.patientProfile)),
    setPatient: data => dispatch(setPatient(data)),
    setServiceRequestStatus: data => dispatch(setServiceRequestStatus(data)),
    ServiceRequestStatus: () => dispatch(ServiceRequestStatus())
  }
}

function mapStateToProps(state) {
  return {
    conversationDetail: state.dashboardState.dashboardState.conversationDetail,
    patientServiceRequest: state.dashboardState.dashboardState
      .patientServiceRequest,
    serviceStatusLookUp: state.dashboardState.dashboardState
      .serviceStatusLookUp,
    isServiceRequestLoading: state.dashboardState.dashboardState.isServiceRequestLoading 
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceRequest)
)
