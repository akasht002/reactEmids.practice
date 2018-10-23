import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as action from '../../../redux/patientProfile/actions'
import {
  getLength
} from '../../../utils/validations'
import { ProfileImage } from '../../../components'
import './index.css'

class PersonalDetail extends React.PureComponent {

  componentDidMount () {
    this.props.getPersonalDetail()
    this.props.getImage()
    this.props.getProfilePercentage();
  }

  render () {
    return (
      <Fragment>
        <div className='col-md-12 card CardWidget SPDetails'>
        <ProfileImage
            src={
              this.props.profileImgData.image
                ? this.props.profileImgData.image
                : require('../../../assets/images/Blank_Profile_icon.png')
            }
            profilePercentage={this.props.profilePercentage}
            profileImageWidget='SPDetailsContainer SPdpWidget'
            profileImageContainer='SPdpContainer'
            cicularChart='SPdpCircularChart'
            circle='SPdpCircle'
            profileImage='SPdpImage'
        />
          <div className={'SPDetailsContainer SPNameWidget'}>
            <div className={'d-flex'}>
              <div className={'col-md-7 p-0'}>
                <h3 className='SPName SPPatientName'>
                  {this.props.personalDetail &&
                    `${this.props.personalDetail.firstName || ''} ${this.props.personalDetail.lastName || ''} `}
                </h3>
                <p className={'SPsubTitle'}>
                  <span>
                    {this.props.personalDetail && this.props.personalDetail.gender && this.props.personalDetail.gender.genderName}
                    {' '}
                  </span>
                  <span>
                    {this.props.personalDetail && this.props.personalDetail.age}
                    {' '}
                    years
                  </span>
                </p>
              </div>
            </div>
            <div className={'width100'}>
              <div className={'SPAffiliatedList'} />
            </div>
            <div className={'width100'}>
              <div className='SPDesc'>
                {this.props.personalDetail &&
                  this.props.personalDetail.description}
              </div>
            </div>
          </div>
          <div className={'SPDetailsContainer SPAddressWidget'}>
            <div className={'SPAddressContent'}>
              <div className={'width100 SPAddressTitle d-flex'}>
                <span className={'SPAddressText primaryColor'}>
                  Primary Phone Number
                </span>
              </div>
              <div className={'width100 d-flex'}>
                <span>
                  {getLength(this.props.personalDetail.phoneNumber) > 0 ?
                    '+1 ' + this.props.personalDetail.phoneNumber : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    getImage: () => dispatch(action.getImage()),
    getProfilePercentage: () => dispatch(action.getProfilePercentage())
  }
}

function mapStateToProps (state) {
  return {
    personalDetail: state.patientProfileState.personalDetail,
    profileImgData: state.patientProfileState.imageData,
    profilePercentage: state.patientProfileState.profilePercentage
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
)
