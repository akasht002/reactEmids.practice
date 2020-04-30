import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import './index.css'
import {
  Input,
  SelectBox,
  ProfileModalPopup,
  ModalPopup,
  ScreenCover,
  ProfileImage,
  ImageCropView
} from '../../../components'
import ImageModal from '../PersonalDetail/ImageModal';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  getArrayLength,
  getLength,
  isUrlValid
} from '../../../utils/validations'
import { formatPhoneNumber } from '../../../utils/formatName'
import { calculateRating } from '../../../utils/calculation'
import { SCREENS, PERMISSIONS } from '../../../constants/constants';
import { SETTING } from '../../../constants/config'
import { ImageInstruction } from '../Components/ImageInstruction'
import { CustomTextArea } from '../../../components/Base';
export class Organization extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,
      isAlertModalOpen: false,
      urlInvaild: false,
      ModalOrg: true,
      src: null,
      isAlertSaveModalOpen: false,
      crop: SETTING.CROP_DEFAULT
    }
    this.isImageSave = false;
    this.isChangePhoto = false
  }

  componentDidMount() {
    this.props.getPersonalDetail()
    this.props.getCityDetail()
    this.props.getImage()
  }

  componentWillReceiveProps(nextProps) {
    if (this.isImageSave === false) {
      this.setState({
        organizationName: nextProps.personalDetail && nextProps.personalDetail.entity && nextProps.personalDetail.entity.organization,
        yearsOfExperience: nextProps.personalDetail && nextProps.personalDetail.yearOfExperience,
        url: nextProps.personalDetail && nextProps.personalDetail.entity && nextProps.personalDetail.entity.websiteUrl,
        description: nextProps.personalDetail.description,
        hourlyRate: nextProps.personalDetail.hourlyRate,
        city: getArrayLength(nextProps.personalDetail.address) > 0
          ? nextProps.personalDetail.address[0].city
          : '',
        streetAddress: getArrayLength(nextProps.personalDetail.address) > 0
          ? nextProps.personalDetail.address[0].streetAddress
          : '',
        zipCode: getArrayLength(nextProps.personalDetail.address) > 0
          ? nextProps.personalDetail.address[0].zipCode
          : '',
        phoneNumber: nextProps.personalDetail.phoneNumber,
        state_id: getArrayLength(nextProps.personalDetail.address) > 0 &&
          nextProps.personalDetail.address[0].state != null
          ? nextProps.personalDetail.address[0].state.id
          : '',
        selectedState: {
          label: getArrayLength(nextProps.personalDetail.address) > 0 &&
            nextProps.personalDetail.address[0].state != null
            ? nextProps.personalDetail.address[0].state.name
            : '',
          value: getArrayLength(nextProps.personalDetail.address) > 0 &&
            nextProps.personalDetail.address[0].state != null
            ? nextProps.personalDetail.address[0].state.id
            : '-' + getArrayLength(nextProps.personalDetail.address) > 0 &&
              nextProps.personalDetail.address[0].state != null
              ? nextProps.personalDetail.address[0].state.name
              : ''
        }
      })
    }
    this.setState({
      imageProfile: nextProps.profileImgData.image,
      uploadedImageFile: nextProps.profileImgData.image
        ? nextProps.profileImgData.image
        : require('../../../assets/images/Blank_Profile_icon.png')
    })
    this.setState({
      imageProfile: nextProps.profileImgData.image
    })
    this.styles = {
      height: 100,
      maxHeight: 100
    }
    this.city = getArrayLength(nextProps.personalDetail.address) > 0
      ? nextProps.personalDetail.address[0].city
      : ''
    this.streetAddress = getArrayLength(nextProps.personalDetail.address) > 0
      ? nextProps.personalDetail.address[0].streetAddress
      : ''
    this.zipCode = getArrayLength(nextProps.personalDetail.address) > 0
      ? nextProps.personalDetail.address[0].zipCode
      : ''
    this.states = getArrayLength(nextProps.personalDetail.address) > 0 &&
      nextProps.personalDetail.address[0].state != null
      ? nextProps.personalDetail.address[0].state.name
      : ''
  }

  handleChange = () => {
    this.setState({ uploadImage: true })
  }

  reUpload = e => {
    this.isChangePhoto = true
    if (
      e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)
    ) {
      this.setState({
        uploadedImageFile: URL.createObjectURL(e.target.files[0]),
        crop: SETTING.CROP_DEFAULT,
        croppedImageUrl: null
      })
    } else {
      this.setState({
        isAlertModalOpen: !this.state.isAlertModalOpen
      })
    }
  }

  onCropChange = crop => {
    this.setState({ crop });
  };

  onSubmit = () => {
    const { organizationNameInvaild, phoneNumberInvalid, urlInvaild, city, zipCode, streetAddress, selectedState, yearsOfExperienceInvalid } = this.state;
    this.isImageSave = false;
    if (
      organizationNameInvaild ||
      phoneNumberInvalid ||
      urlInvaild ||
      yearsOfExperienceInvalid ||
      city === '' || city === null ||
      zipCode === '' || zipCode === null ||
      streetAddress === '' || streetAddress === null ||
      selectedState === '' || selectedState === null
    ) {
      let cityInvalid = false, zipCodeInvalid = false, streetInvalid = false, stateInvalid = false;
      if (city === '' || city === null) {
        cityInvalid = true;
      }
      if (zipCode === '' || zipCode === null || zipCode < 5) {
        zipCodeInvalid = true;
      }
      if (streetAddress === '' || streetAddress === null) {
        streetInvalid = true;
      }
      if (selectedState === '' || selectedState === null || selectedState === undefined) {
        stateInvalid = false;
      }
      this.setState({
        isValid: false,
        isStateInvalid: stateInvalid,
        isCityInvalid: cityInvalid,
        isZipInvalid: zipCodeInvalid,
        isStreetInvalid: streetInvalid
      })
    } else {
      this.props.updateOrganizationDetail(this.state)
      this.setState({
        EditPersonalDetailModal: !this.state.EditPersonalDetailModal
      })
    }
  }

  closeImageUpload = () => {
    !this.isChangePhoto ? this.setState({
      uploadImage: !this.state.uploadImage,
      imageProfile: this.props.profileImgData.image,
      uploadedImageFile: this.props.profileImgData.image
        ? this.props.profileImgData.image
        : require('../../../assets/images/Blank_Profile_icon.png'),
      crop: SETTING.CROP_DEFAULT,
      croppedImageUrl: null
    }) : this.setState({ isAlertSaveModalOpen: !this.state.isAlertSaveModalOpen })
  }

  resetImage = () => {
    this.isChangePhoto = false
    this.setState({
      isAlertSaveModalOpen: !this.state.isAlertSaveModalOpen,
      uploadImage: !this.state.uploadImage,
      imageProfile: this.props.profileImgData.image,
      uploadedImageFile: this.props.profileImgData.image
        ? this.props.profileImgData.image
        : require('../../../assets/images/Blank_Profile_icon.png'),
      crop: SETTING.CROP_DEFAULT,
      croppedImageUrl: null
    })
  }

  saveImageUpload = () => {
    this.isChangePhoto = false
    this.isImageSave = true;
    if (this.state.croppedImageUrl.length <= SETTING.FILE_UPLOAD_SIZE) {
      this.props.uploadImg(this.state.croppedImageUrl)
      this.setState({
        uploadImage: !this.state.uploadImage
      })
    } else {
      this.setState({
        isAlertModalOpen: !this.state.isAlertModalOpen
      })
    }
    this.setState({
      crop: SETTING.CROP_DEFAULT,
      croppedImageUrl: null
    })
  }

  render() {
    let modalContent
    let modalTitle = 'Edit Entity Details'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      city.label = city.name
      city.value = city.id + '-' + city.name
      return city
    })

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail)}
        <ImageModal
          isOpen={this.state.uploadImage}
          toggle={this.closeImageUpload}
          ModalBody={this.getBlackModalContent()}
          className='modal-lg asyncModal BlackoutModal'
          modalTitle='Edit Profile Image'
          centered='centered'
          saveImage={this.saveImageUpload}
          buttonDisable={!this.state.croppedImageUrl}
        />
      </form>
    )
    modalContent = EducationModalContent

    const ProfileDetail = this.renderDetails()
    return (
      <ScreenCover isLoading={this.props.isLoading}>
        {ProfileDetail}
        <ProfileModalPopup
          isOpen={this.state.EditPersonalDetailModal}
          toggle={this.togglePersonalDetails.bind(this, modalType)}
          ModalBody={modalContent}
          className='modal-lg asyncModal CertificationModal'
          modalTitle={modalTitle}
          centered='centered'
          onClick={this.onSubmit}
          disabled={this.state.disabledSaveBtn}
        />
        <ModalPopup
          isOpen={this.state.isDiscardModalOpen}
          toggle={this.reset}
          ModalBody={<span>Do you want to discard the changes?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() => this.reset()}
          onCancel={() =>
            this.setState({
              isDiscardModalOpen: false
            })}
        />
        <ModalPopup
          isOpen={this.state.isAlertModalOpen}
          toggle={this.reset}
          ModalBody={
            <span>
              Please insert a image less than 2 MB and should be in the format of JPEG, PNG, GIF.
            </span>
          }
          btn1='OK'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() =>
            this.setState({
              isAlertModalOpen: false
            })}
          onCancel={() =>
            this.setState({
              isDiscardModalOpen: false
            })}
        />
        <ModalPopup
          isOpen={this.state.isAlertSaveModalOpen}
          toggle={this.reset}
          ModalBody={<span>Do you want to discard the changes?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          footer='d-none'
          centered='centered'
          onConfirm={() => this.resetImage()}
          onCancel={() =>
            this.setState({
              isAlertSaveModalOpen: false
            })}
        />
      </ScreenCover>
    )
  }

  getBlackModalContent = () => {
    return (
      <div className={'UploadProfileImageWidget'}>
        <ImageCropView
          uploadedImageFile={this.state.uploadedImageFile}
          crop={this.state.crop}
          onCropChange={this.onCropChange}
          changeCroppedImage={(croppedImage) => {
            this.setState({ croppedImageUrl: croppedImage })
          }}
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
              onChange={this.reUpload}
            />
          </div>
        </div>
      </div>
    )
  }

  renderDetails = () => {
    let rating = this.props.personalDetail && this.props.personalDetail.rating
    return (
      <div className='col-md-12 card CardWidget SPDetails'>
       <div className="block-height-rating">
        <ProfileImage
          src={
            this.state.imageProfile
              ? this.state.imageProfile
              : require('../../../assets/images/Blank_Profile_icon.png')
          }
          profilePercentage={this.props.profilePercentage}
          profileImageWidget='SPDetailsContainer SPdpWidget'
          profileImageContainer='SPdpContainer'
          cicularChart='SPdpCircularChart'
          circle='SPdpCircle'
          profileImage='SPdpImage'
        />
        {
        rating ?
          <span className="rating-blockcustom">
            <i className={"Icon iconFilledStar"} />
            {calculateRating(rating)}
          </span> 
          :
          ''
        }
      </div>  
        <div className={'SPDetailsContainer SPNameWidget'}>
          <div className={'d-flex'}>
            <div className={'col-md-7 p-0'}>
              <h3 className={'SPName'}>
                {this.props.personalDetail && this.props.personalDetail.entity &&
                  `${this.props.personalDetail.entity.organization || ''} `}
              </h3>
              <p className={'SPsubTitle theme-primary'}>
                <span>
                  {this.props.personalDetail &&
                    this.props.personalDetail.yearOfExperience}
                  {' '}
                  Yrs in Business
                </span>
              </p>
            </div>
            {/* <div className={'col p-0'}>
              <h3 className={'ratePerHour theme-primary'}>
                <span>
                  {this.props.personalDetail &&
                    this.props.personalDetail.hourlyRate}
                </span>
              </h3>
            </div> */}
          </div>

          <div className={'width100 url-separator'}>
            <h3 className={'webUrl theme-primary'}>
              {(this.props.personalDetail && this.props.personalDetail.entity) && this.props.personalDetail.entity.websiteUrl ?
                <a href={'https://' + this.props.personalDetail.entity.websiteUrl} target="_blank">{this.props.personalDetail.entity.websiteUrl}</a> : ''}
            </h3>
          </div>
          <div className={'width100 description-block-profile'}>
          <span className={'theme-primary'}>Description</span>
          <span>
            {this.props.personalDetail &&
              this.props.personalDetail.description !== ''
              ? this.props.personalDetail.description
              : <span
                name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
                className={'SPDescriptionNone'}
                onClick={this.togglePersonalDetails.bind(this)}
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
                {this.props.personalDetail && this.streetAddress}
              </span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>City</span>
              <span className='AddressContentText'>
                {this.props.personalDetail && this.city}
              </span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>State</span>
              <span className='AddressContentText'>
                {this.props.personalDetail && this.states}
              </span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>Zip</span>
              <span className='AddressContentText'>
                {this.props.personalDetail && this.zipCode}
              </span>
            </div>
          </div>
          <div className={'SPAddressContent'}>
            <div className={'width100 SPAddressTitle d-flex'}>
              <span className={'SPAddressText theme-primary'}>Phone</span>
            </div>
            <div className={'width100 d-flex'}>
              <span>
                {this.props.personalDetail.phoneNumber &&
                  formatPhoneNumber(this.props.personalDetail.phoneNumber)}
              </span>
            </div>
          </div>
        </div>
        {this.props.isUser && <i
          name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
          className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
          onClick={this.togglePersonalDetails.bind(this)}
        />}
      </div>
    )
  }
  getModalContent = stateDetail => {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h4 className='theme-primary text-left editProfileHeader'>
            Introduction
          </h4>
        </div>
        <div className='col-md-4 mb-2 editProfileImageContainer'>
          <div className='profileImage'>
            <img
              alt='profile_image'
              className={'SPdpImage'}
              src={
                this.state.imageProfile
                  ? this.state.imageProfile
                  : require('../../../assets/images/Blank_Profile_icon.png')
              }
            />
            <span className='editDpImage' />
            <div className='uploadWidget'>
              <i className='addImageBtn theme-primary' onClick={this.handleChange} />
            </div>
          </div>
        </div>
        <div className='col-md-8 mb-2 editProfileDetailsContainer'>
          <div className='row'>
            <div className='col-md-12'>
              <Input
                name='organizationName'
                label='Entity Name'
                autoComplete='off'
                required='required'
                type='text'
                maxlength='100'
                value={this.state.organizationName}
                className={"form-control custome-placeholder " + (this.state.organizationNameInvaild && 'inputFailure')}

                textChange={(e) => {
                  this.setState({
                    organizationName: e.target.value,
                    organizationNameInvaild: false,
                    disabledSaveBtn: false

                  })
                }}
                onBlur={(e) => {
                  if (!checkTextNotStartWithNumber(e.target.value)) {
                    this.setState({ organizationNameInvaild: true });
                  }
                }}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.organizationNameInvaild && 'Please enter valid Organization Name'}
              </small>
            </div>
            {/* <div className='col-md-12'>
              <Input
                name='hourlyRate'
                label='Hourly Rate ($/hr)'
                autoComplete='off'
                type='text'
                value={this.state.hourlyRate}
                maxlength='6'
                textChange={e => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                  if (onlyNums.length < 5) {
                    this.setState({ hourlyRate: onlyNums, disabledSaveBtn: false })
                  } else if (onlyNums.length === 5) {
                    const number = onlyNums.replace(
                      /(\d{3})(\d{2})/,
                      '$1.$2'
                    )
                    this.setState({
                      hourlyRate: number,
                      disabledSaveBtn: false
                    })
                  }
                }
                }
                className='form-control'
              />
              <small className="text-danger d-block OnboardingAlert"></small>
            </div> */}
            <div className='col-md-12'>
              <Input
                name='url'
                label='URL'
                autoComplete='off'
                required='required'
                type='text'
                maxlength='60'
                value={this.state.url}
                textChange={e => {
                  this.setState({ url: e.target.value, urlInvaild: false, disabledSaveBtn: false })
                }}
                onBlur={(e) => {
                  if (!isUrlValid(e.target.value)) {
                    this.setState({ urlInvaild: true });
                  }
                }}
                className={'form-control ' + (this.state.urlInvaild && 'inputFailure')}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.urlInvaild && 'Please enter valid Url'}
              </small>

            </div>
            <div className='col-md-12'>
              <Input
                name='YearsExperience'
                label='Years in Business'
                autoComplete='off'
                required='required'
                type='text'
                maxlength='2'
                value={this.state.yearsOfExperience}
                textChange={e => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({ yearsOfExperience: e.target.value, disabledSaveBtn: false, yearsOfExperienceInvalid: false })
                  }
                }}
                onBlur={e => {
                  if (!e.target.value) {
                    this.setState({ yearsOfExperienceInvalid: true })
                  }
                }}
                className={"form-control " + (this.state.yearsOfExperienceInvalid && 'inputFailure')}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.yearsOfExperienceInvalid && 'Please enter valid Years of Business'}
              </small>
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-2'>
          <CustomTextArea
            name='Description'
            placeholder='Tell us about yourself'
            className='form-control'
            rows='5'
            maxlength={'2000'}
            value={this.state.description}
            textChange={e => {
              if (getLength(e.target.value) <= 2000) {
                this.setState({
                  description: e.target.value,
                  disabledSaveBtn: false
                })
              }
            }}
          />
        </div>

        <div className='hrLine' />
        <div className='col-md-12 mb-2'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='theme-primary text-left editProfileHeader'>
                Address
              </h4>
            </div>
            <div className='col-md-12'>
              <div className='row'>
                <div className='col-md-6 mb-2'>
                  <div className='form-group'>
                    <Input
                      name='Street'
                      label='Street'
                      autoComplete='off'
                      type='text'
                      maxlength='500'
                      value={this.state.streetAddress}
                      textChange={e =>
                        this.setState({
                          streetAddress: e.target.value,
                          disabledSaveBtn: false,
                          isStreetInvalid: false
                        })}
                      onBlur={e => {
                        if (!e.target.value) {
                          this.setState({ isStreetInvalid: true })
                        }
                      }}
                      className='form-control'
                    />
                    <small className="text-danger d-block OnboardingAlert">
                      {this.state.isStreetInvalid && <span>Please enter valid {(this.state.streetAddress === '' || this.state.streetAddress === null) && 'Street'}</span>}
                    </small>
                  </div>
                </div>


                <div className='col-md-6 mb-2'>
                  <div className='form-group'>
                    <Input
                      name='city'
                      label='City'
                      autoComplete='off'
                      maxlength='50'
                      type='text'
                      value={this.state.city}
                      textChange={e =>
                        this.setState({
                          city: e.target.value,
                          disabledSaveBtn: false,
                          isCityInvalid: false
                        })}
                      onBlur={e => {
                        if (!e.target.value) {
                          this.setState({ isCityInvalid: true })
                        }
                      }}
                      className='form-control'
                    />
                    <small className="text-danger d-block OnboardingAlert">
                      {this.state.isCityInvalid && <span>Please enter valid {(this.state.city === '' || this.state.city === null) && 'City'}</span>}
                    </small>
                  </div>
                </div>
                <div className='col-md-12 mb-2'>
                  <div className='row'>
                    <div className='col-md-6 mb-2'>
                      <div className='form-group'>
                        <label>State</label>
                        <SelectBox
                          options={stateDetail}
                          simpleValue
                          placeholder='Select the state'
                          onChange={value => {
                            this.setState({
                              selectedState: value,
                              disabledSaveBtn: false,
                              isStateInvalid: false
                            })
                          }}
                          onBlur={(e) => {
                            if (this.state.selectedState.value === '') {
                              this.setState({ isStateInvalid: true })
                            }
                          }}
                          selectedValue={this.state.selectedState}
                          className={'inputFailure border-style'}
                        />
                        <small className="text-danger d-block OnboardingAlert">
                          {this.state.isStateInvalid && 'Please select valid State'}
                        </small>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <Input
                        name='Zip'
                        label='Zip'
                        autoComplete='off'
                        type='text'
                        maxlength='5'
                        value={this.state.zipCode}
                        textChange={e => {
                          const re = /^[0-9\b]+$/
                          if (
                            (e.target.value === '' ||
                              re.test(e.target.value)) &&
                            getLength(e.target.value) <= 5
                          ) {
                            this.setState({
                              zipCode: e.target.value,
                              disabledSaveBtn: false,
                              isZipInvalid: false
                            })
                          }
                        }}
                        onBlur={e => {
                          if (!e.target.value || getLength(e.target.value) < 5) {
                            this.setState({ isZipInvalid: true })
                          }
                        }}
                        className='form-control'
                      />
                      <small className="text-danger d-block OnboardingAlert">
                        {this.state.isZipInvalid && <span>Please enter valid Zipcode</span>}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hrLine' />
        <div className='col-md-12 mb-2'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='theme-primary text-left editProfileHeader'>
                Phone
              </h4>
            </div>
            <div className='col-md-12'>
              <div className='row'>
                <div className='col-md-6 mb-2'>
                  <Input
                    name='PhoneNumber'
                    label='Phone Number'
                    PhoneInput="PhoneInput"
                    autoComplete='off'
                    maxlength='15'
                    type='text'
                    value={formatPhoneNumber(this.state.phoneNumber)}
                    className={"form-control custome-placeholder " + (this.state.phoneNumberInvalid && 'inputFailure')}

                    textChange={e => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                      if (onlyNums.length < 10) {
                        this.setState({ phoneNumber: onlyNums })
                      } else if (onlyNums.length === 10) {
                        const number = onlyNums.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          '$1-$2-$3'
                        )
                        this.setState({
                          phoneNumber: number,
                          phoneNumberInvalid: false,
                          disabledSaveBtn: false
                        })
                      }
                    }
                    }

                    onBlur={(e) => {
                      if (getLength(e.target.value) < 10) {
                        this.setState({ phoneNumberInvalid: true });
                      }
                    }}
                  />
                  <small className="text-danger d-block OnboardingAlert">
                    {this.state.phoneNumberInvalid && 'Please enter valid Phone Number'}
                  </small>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  togglePersonalDetails(action, e) {
    this.isImageSave = false;
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: !this.state.disabledSaveBtn
    })
    let old_data = {
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      organizationName: this.props.personalDetail.entity.organization
        ? this.props.personalDetail.entity.organization
        : '',
      phoneNumber: this.props.personalDetail.phoneNumber,
      yearsOfExperience: this.props.personalDetail.yearOfExperience
    }

    let updated_data = {
      organizationName: this.state.organizationName
        ? this.state.organizationName
        : '',
      description: this.state.description,
      hourlyRate: this.state.hourlyRate,
      phoneNumber: this.state.phoneNumber,
      yearsOfExperience: this.state.yearsOfExperience
    }

    const fieldDifference = _.isEqual(old_data, updated_data)

    if (fieldDifference === true) {
      this.setState({ certificationModal: false, isDiscardModalOpen: false })
    } else {
      this.setState({ isDiscardModalOpen: true, EditPersonalDetailModal: true })
    }
  }

  reset = () => {
    this.isImageSave = false;
    this.setState({
      EditPersonalDetailModal: false,
      isDiscardModalOpen: false,
      organizationName: this.props.personalDetail.organization,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber,
      organizationNameInvaild: false,
      phoneNumberInvalid: false,
      yearsOfExperienceInvalid: false,
      yearsOfExperience: this.props.personalDetail.yearOfExperience
    })
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    updateOrganizationDetail: data =>
      dispatch(action.updateOrganizationDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail()),
    uploadImg: data => dispatch(action.uploadImg(data)),
    getImage: () => dispatch(action.getImage())
  }
}

export function mapStateToProps(state) {
  return {
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    updatePersonalDetailSuccess: state.profileState.PersonalDetailState
      .updatePersonalDetailSuccess,
    cityDetail: state.profileState.PersonalDetailState.cityDetail,
    profileImgData: state.profileState.PersonalDetailState.imageData,
    isUser: state.profileState.PersonalDetailState.isUser
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Organization)
)
