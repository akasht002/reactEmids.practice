import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as action from '../../../redux/patientProfile/actions'

class PointService extends React.Component {

  componentDidMount() {
    this.props.getPointService()
  }

  render() {

    const PointServiceList =
      this.props.PointServiceList &&
      this.props.PointServiceList.map((pointService, i) => {
        return (
          <li className='SPAddressItems' key={pointService.addressId}>
            <div className={'SPCertificateContent'}>
              <div className={'width100 d-flex'}>
                <h5 className={'SPPOSHeader'}>{pointService.addressTypeId}</h5>
                {pointService.isPrimaryAddress &&
                  <span className={'ml-auto SPWorkYear PrimaryAddress'}>
                    Primary Address
                  </span>}

              </div>
              <div className={'width100 d-flex'}>
                <span className={'AddressContentLabel'}>Street</span>
                <span className={'SPCertificateDesc'}>
                  {pointService.street}
                </span>
              </div>
              <div className={'width100 d-flex'}>
                <span className={'AddressContentLabel'}>City</span>
                <span className={'SPCertificateDesc'}>{pointService.city}</span>
              </div>
              <div className={'width100 d-flex'}>
                <span className={'AddressContentLabel'}>State</span>
                <span className={'SPCertificateDesc'}>
                  {pointService.stateName}
                </span>
              </div>
              <div className={'width100 d-flex'}>
                <span className={'AddressContentLabel'}>Zip</span>
                <span className={'SPCertificateDesc'}>{pointService.zip}</span>
              </div>
            </div>
          </li>
        )
      })

    return (
      <div className='col-md-12 card CardWidget SPCertificate'>
        <div className='SPCardTitle d-flex'>
          <h4 className='theme-primary'>Point of Service</h4>
        </div>
        <div className='SPCertificateContainer width100'>
          <ul className='SPCertificateList theme-primary'>
            {this.props.PointServiceList.length > 0
              ? <div>
                {PointServiceList}
              </div>
              :
              // <div className='SPNoInfo mb-5'>
              //   <div className='SPNoInfoContent'>
              //     <div className='SPInfoContentImage' />
              //   </div>
              // </div>
              <div className='SPNoInfo'>
                <div className='SPNoInfoContent'>
                  <div className='SPInfoContentImage' />
                  <span className='SPNoInfoDesc'>No data available</span>
                </div>
              </div>
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPointService: () => dispatch(action.getPointService())
  }
}

function mapStateToProps(state) {
  return {
    PointServiceList: state.patientProfileState.pointOfServiceList
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PointService)
)
