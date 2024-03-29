import React from 'react'
import { ProfileImage, ImageCropView } from '../../../components'
import { formatPhoneNumber } from '../../../utils/formatName'
import {SCREENS, PERMISSIONS} from '../../../constants/constants';
import { ImageInstruction } from '../Components/ImageInstruction'

export const Details = props => {
  return (
    <div className='col-md-12 card CardWidget SPDetails'>
     <div className="block-height-rating">
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
          <i className={"Icon iconFilledStar"}/>
          {props.personalDetail && props.personalDetail.rating}
      </span>
      </div>
      <div className={'SPDetailsContainer SPNameWidget'}>
        <div className={'d-flex'}>
          <div className={'p-0'}>
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
            </p>
          </div>
        </div>
       <div className={'width100'}>
        <div className={'SPAffiliatedList'}>
          <span>
          Assigned by: <b>{props.personalDetail.entity &&
              props.personalDetail.entity.assignedBy}</b>
          </span>
        </div>
      </div>
        <div className={'width100'}>
          <div className={'SPAffiliatedList'}>
            <span className="link-view webUrl theme-primary">
              {props.personalDetail.entity && props.personalDetail.entity.websiteUrl ?
                <a href={'https://'+props.personalDetail.entity.websiteUrl} target="_blank">{props.personalDetail.entity.websiteUrl}</a> : ''}               
            </span>
          </div>
        </div>
        <div className={'width100 description-block-profile'}>
        <span className={'theme-primary'}>Description</span>
        <span>
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
         </span>      
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
      {props.isUser && 
        <i
        name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
        className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
        onClick={props.togglePersonalDetails}
      />
      }
    </div>
  )
}


export const ProfileImageDetail = props => {
    return (
        <div className={'UploadProfileImageWidget'}>
          <ImageCropView
            uploadedImageFile={props.uploadedImageFile}
            crop={props.crop}
            onCropChange={props.onCropChange}
            changeCroppedImage={props.changeCroppedImage}
          />
        <div className={'row'}>
          <ImageInstruction />
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
