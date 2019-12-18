import React from 'react'
import { ProfileImage } from '../../../components'
import { formatPhoneNumber } from '../../../utils/formatName'
import { SCREENS, PERMISSIONS } from '../../../constants/constants';

export const Details = props => {
  return (
    <div className='col-md-12 card CardWidget SPDetails'>
      <ProfileImage
        src={
          props.image
            ? props.image
            : require('../../../assets/images/Blank_Profile_icon.png')
        }
        profilePercentage={props.profilePercentage}
        profileImageWidget='SPDetailsContainer SPdpWidget'
        profileImageContainer='SPdpContainer'
        cicularChart='SPdpCircularChart'
        circle='SPdpCircle'
        profileImage='SPdpImage'
      />
      <span className="rating-blockcustome">
        <i class="Icon iconFilledStar"></i>
        {props.personalDetail && Math.round(props.personalDetail.rating * 10)/10}
      </span>
      <div className={'SPDetailsContainer SPNameWidget'}>
        <div className={'d-flex'}>
          <div className={'col-md-7 p-0'}>
            <h3 className={'SPName'}>
              {props.personalDetail &&
                `${props.personalDetail.firstName || ''} ${props.personalDetail.lastName || ''} `}
            </h3>
            <p className={'SPsubTitle theme-primary'}>
              <span>
                {props.personalDetail &&
                  props.personalDetail.genderName}
              </span>
              <span>
                {props.personalDetail && props.personalDetail.age}
                {' '}
                Yrs Old
              </span>
              {/* <span>
                {props.personalDetail &&
                  props.personalDetail.yearOfExperience}
                {' '}
                Yrs Exp
              </span> */}
            </p>
          </div>
        </div>
        <div className={'width100'}>
          <div className={'SPAffiliatedList'}>
            <span>
              {props.personalDetail.entity &&
                props.personalDetail.entity.assignedBy}
            </span>
          </div>
        </div>
        <div className={'width100'}>
          <div className={'SPAffiliatedList'}>
            <span>
              {props.personalDetail.entity &&
                props.personalDetail.entity.websiteUrl}
            </span>
          </div>
        </div>
        <div className={'width100'}>
          {props.personalDetail &&
            props.personalDetail.description !== ''
            ? props.personalDetail.description
            : <span
              name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
              className={'SPDescriptionNone'}
              onClick={props.togglePersonalDetails}
            >
              Edit your profile here
              </span>}
        </div>
      </div>
      <div className={'SPDetailsContainer SPAddressWidget'}>
        <div className={'SPAddressContent'}>
          <div className={'width100 SPAddressTitle d-flex'}>
            <span className={'SPAddressText theme-primary'}>Address</span>
          </div>
          <div className={'width100 d-flex'}>
            <span className={'AddressContentLabel'}>Street</span>
            <span className='AddressContentText'>
              {props.personalDetail && props.streetAddress}
            </span>
          </div>
          <div className={'width100 d-flex'}>
            <span className={'AddressContentLabel'}>City</span>
            <span className='AddressContentText'>
              {props.personalDetail && props.city}
            </span>
          </div>
          <div className={'width100 d-flex'}>
            <span className={'AddressContentLabel'}>State</span>
            <span className='AddressContentText'>
              {props.personalDetail && props.states}
            </span>
          </div>
          <div className={'width100 d-flex'}>
            <span className={'AddressContentLabel'}>Zip</span>
            <span className='AddressContentText'>
              {props.personalDetail && props.zipCode}
            </span>
          </div>
        </div>
        <div className={'SPAddressContent'}>
          <div className={'width100 SPAddressTitle d-flex'}>
            <span className={'SPAddressText theme-primary'}>Phone</span>
          </div>
          <div className={'width100 d-flex'}>
            <span>
              {props.personalDetail.phoneNumber &&
                formatPhoneNumber(props.personalDetail.phoneNumber)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
