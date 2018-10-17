import React from 'react'
import ImageCrop from 'react-image-crop-component'
import 'react-image-crop-component/style.css'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-image-crop/lib/ReactCrop.scss'
import { ProfileImage } from '../../../components'
import { PHONE_NUMBER_CONST } from '../../../constants/constants'
import {SCREENS, PERMISSIONS} from '../../../constants/constants';

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
      <div className={'SPDetailsContainer SPNameWidget'}>
        <div className={'d-flex'}>
          <div className={'col-md-7 p-0'}>
            <h3 className={'SPName'}>
              {props.personalDetail &&
                `${props.personalDetail.firstName || ''} ${props.personalDetail.lastName || ''} `}
            </h3>
            <p className={'SPsubTitle'}>
              <span>
                {props.personalDetail &&
                  props.personalDetail.genderName}
                {' '}
                gender
              </span>
              <span>
                {props.personalDetail && props.personalDetail.age}
                {' '}
                years
              </span>
              <span>
                {props.personalDetail &&
                  props.personalDetail.yearOfExperience}
                {' '}
                years exp
              </span>
            </p>
          </div>
          <div className={'col p-0'}>
            <h3 className={'ratePerHour primaryColor'}>
              <span>
                {props.personalDetail &&
                  props.personalDetail.hourlyRate}
              </span>
            </h3>
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
            <span className={'SPAddressText primaryColor'}>Address</span>
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
            <span className={'AddressContentLabel'}>ZIP</span>
            <span className='AddressContentText'>
              {props.personalDetail && props.zipCode}
            </span>
          </div>
        </div>
        <div className={'SPAddressContent'}>
          <div className={'width100 SPAddressTitle d-flex'}>
            <span className={'SPAddressText primaryColor'}>Phone</span>
          </div>
          <div className={'width100 d-flex'}>
            <span>
              {props.personalDetail.phoneNumber &&
                PHONE_NUMBER_CONST + props.personalDetail.phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <i
        name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
        className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
        onClick={props.togglePersonalDetails}
      />
    </div>
  )
}


export const ProfileImageDetail = props => {
    return (
        <div className={'UploadProfileImageWidget'}>
        <div className={'width100 UploadProfileImageContainer'}>
          <div style={{ width: '300px', height: '300px' }}>
            <ImageCrop
              src={props.uploadedImageFile}
              setWidth={300}
              setHeight={300}
              square={false}
              resize
              border={'dashed #ffffff 2px'}
              onCrop={props.onCroppeds}
              watch={props.watch}
            />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8'}>
            <ul className={'UploadedImageLimitation'}>
              <li>The image should not exceed beyond 2MB.</li>
              <li>The image should be either of PNG or JPEG/JPG type only.</li>
            </ul>
          </div>
          <div className={'col-md-4 text-right'}>
            <button className='btn btn-outline-primary UploadImageBtn'>
              Change Photo
            </button>
            <input
              className='addImageInput'
              type='file'
              onChange={props.reUpload}
            />
          </div>
        </div>
      </div>
    )
}
