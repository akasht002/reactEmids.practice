import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import './index.css'
import {
  Input,
  TextArea,
  SelectBox,
  ProfileModalPopup,
  ModalPopup, ScreenCover,
  ProfileImage,
  ImageCropView
} from '../../../components'
import ImageModal from './ImageModal';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  getArrayLength,
  getLength,
} from '../../../utils/validations'
import { formatPhoneNumber } from '../../../utils/formatName'
import { SETTING } from '../../../constants/config'
import { SCREENS, PERMISSIONS } from '../../../constants/constants';
import { formatContactNumber, formatContactNumberValue } from '../../../utils/validations'
import { emptyString } from '../../../utils/arrayUtility'
import { ImageInstruction } from '../Components/ImageInstruction'

class PersonalDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,
      isAlertModalOpen: false,
      isValidPhoneNumber: true,
      isStateInvalid: true,
      isCityInvalid: true,
      isZipInvalid: true,
      isStreetInvalid: true,
      selectedState: '',
      ModalOrg: true,
      src: null,
      isAlertSaveModalOpen: false,
      crop: SETTING.CROP_DEFAULT,
      city: '',
      streetAddress: '',
      zipCode: ''
    };
    this.isImageSave = false;
    this.isChangePhoto = false
  }

  componentDidMount() {
    this.props.getPersonalDetail()
    this.props.getAffiliationDetail()
    this.props.getCityDetail()
    this.props.getImage()
    this.props.getGender()
  }

  componentWillReceiveProps(nextProps) {

    if (this.isImageSave === false) {
      this.setState({
        firstName: nextProps.personalDetail.firstName,
        lastName: nextProps.personalDetail.lastName,
        age: nextProps.personalDetail.age,
        genderName: nextProps.personalDetail.genderName,
        affiliationName: nextProps.personalDetail.affiliationName,
        organization: nextProps.personalDetail.organization,
        yearOfExperience: nextProps.personalDetail.yearOfExperience,
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
        state_id: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
          ? nextProps.personalDetail.address[0].state.id
          : '',
        isActive: false,
        selectedGender: {
          label: nextProps.personalDetail.genderName,
          value: nextProps.personalDetail.genderId + '-' + nextProps.personalDetail.genderName
        },
        selectedAffiliation: {
          label: nextProps.personalDetail.affiliationName,
          value: nextProps.personalDetail.affiliationId + '-' + nextProps.personalDetail.affiliationName
        },
        selectedState: {
          label: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
            ? nextProps.personalDetail.address[0].state.name
            : '',
          value: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
            ? nextProps.personalDetail.address[0].state.id
            : '-' + getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
              ? nextProps.personalDetail.address[0].state.name : ''
        },
        addressId: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].addressId != null
          ? nextProps.personalDetail.address[0].addressId : 0,
        addressTypeId: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].addressTypeId != null
          ? nextProps.personalDetail.address[0].addressTypeId : 2,
        affiliationList: this.props.affiliationList
      })
    };

    this.setState({
      imageProfile: nextProps.profileImgData.image,
      uploadedImageFile: nextProps.profileImgData.image
        ? nextProps.profileImgData.image
        : require('../../../assets/images/Blank_Profile_icon.png')
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
    this.states = getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
      ? nextProps.personalDetail.address[0].state.name
      : ''
  }

  handleChange = () => {
    this.setState({ uploadImage: true })
  }

  reUpload = e => {
    this.isChangePhoto = true
    if (e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
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

  onSubmit = () => {
    const { firstName, lastName, phoneNumber, age, yearOfExperience,
      hourlyRate, city, zipCode, streetAddress, selectedState } = this.state;
    this.isImageSave = false;
    if (
      firstName === '' ||
      lastName === '' ||
      phoneNumber === '' ||
      age === '' ||
      yearOfExperience === '' ||
      hourlyRate === '' ||
      // selectedAffiliation === '' || this.state.selectedAffiliation === null ||
      city === '' || this.state.city === null ||
      zipCode === '' || this.state.zipCode === null ||
      streetAddress === '' || this.state.streetAddress === null ||
      selectedState === '' || this.state.selectedState === null ||
      this.state.phoneNumberInvalid
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
        stateInvalid = true;
      }
      this.setState({ isValid: false, isStateInvalid: stateInvalid, isCityInvalid: cityInvalid, isZipInvalid: zipCodeInvalid, isStreetInvalid: streetInvalid })
    } else {
      this.props.updatePersonalDetail(this.state)
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
    this.isImageSave = true;
    this.isChangePhoto = false
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

  togglePersonalDetails = () => {
    let checkStatus = this.checkAffiliationValue(this.state.affiliationName);
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: !this.state.disabledSaveBtn,
      isActive: checkStatus,
      isStreetInvalid: false,
      isCityInvalid: false,
      isZipInvalid: false,
      isStateInvalid: false,
      ageInvaild: false,
      yearOfExpInvaild: false,
      zipCode: this.props.personalDetail && this.props.personalDetail.address[0] && this.props.personalDetail.address[0].zipCode,
      city: this.props.personalDetail && this.props.personalDetail.address[0] && this.props.personalDetail.address[0].city,
      streetAddress: this.props.personalDetail && this.props.personalDetail.address[0] && this.props.personalDetail.address[0].streetAddress,
      selectedState: {
        label: getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.name
          : '',
        value: getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.id
          : '-' + getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
            ? this.props.personalDetail.address[0].state.name : ''
      },
      // selectedAffiliation: {
      //   label: this.props.personalDetail && this.props.personalDetail.affiliationName,
      //   value: this.props.personalDetail && this.props.personalDetail.affiliationId + '-' + this.props.personalDetail && this.props.personalDetail.affiliationName
      // }
    })
    let old_data = {
      firstName: this.props.personalDetail.firstName,
      lastName: this.props.personalDetail.lastName,
      age: this.props.personalDetail.age,
      yearOfExperience: this.props.personalDetail.yearOfExperience,
      affiliationName: this.props.personalDetail.affiliationName,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber,
      city: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].city
        : '',
      streetAddress: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].streetAddress
        : '',
      zipCode: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].zipCode
        : '',
      state_id: getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
        ? this.props.personalDetail.address[0].state.id
        : ''
    }

    let updated_data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      yearOfExperience: this.state.yearOfExperience,
      affiliationName: this.state.affiliationName,
      description: this.state.description,
      hourlyRate: this.state.hourlyRate,
      phoneNumber: this.state.phoneNumber,
      city: emptyString(this.state.city),
      streetAddress: emptyString(this.state.streetAddress),
      zipCode: emptyString(this.state.zipCode),
      state_id: this.state.selectedState && emptyString(this.state.selectedState.value)
    }

    const fieldDifference = _.isEqual(old_data, updated_data)
    if (fieldDifference === true) {
      this.setState({ certificationModal: false, isDiscardModalOpen: false })
    } else {
      this.setState({ isDiscardModalOpen: true, EditPersonalDetailModal: true })
    }
  }

  checkAffiliationValue = value => {
    if (value !== '' && value !== null && value !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  textChangeContactNumber = (e) => {
    const onlyNums = formatContactNumber(e.target.value);
    if (onlyNums.length < 10) {
      this.setState({ phoneNumber: onlyNums, disabledSaveBtn: true, phoneNumberInvalid: false })
    } else if (onlyNums.length === 10) {
      const number = formatContactNumberValue(onlyNums);
      this.setState({
        phoneNumber: number,
        phoneNumberInvalid: false,
        disabledSaveBtn: false
      })
    }

  }

  reset = () => {
    this.isImageSave = false;
    this.setState({
      EditPersonalDetailModal: false,
      isDiscardModalOpen: false,
      firstName: this.props.personalDetail && this.props.personalDetail.firstName,
      lastName: this.props.personalDetail && this.props.personalDetail.lastName,
      age: this.props.personalDetail && this.props.personalDetail.age,
      yearOfExperience: this.props.personalDetail && this.props.personalDetail.yearOfExperience,
      affiliationName: this.props.personalDetail && this.props.personalDetail.affiliationName,
      affiliationId: this.props.personalDetail && this.props.personalDetail.affiliationId,
      description: this.props.personalDetail && this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail && this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail && this.props.personalDetail.phoneNumber,
      city: this.props.personalDetail && this.props.personalDetail.address[0] && this.props.personalDetail.address[0].city,
      streetAddress: this.props.personalDetail && this.props.personalDetail.address[0] && this.props.personalDetail.address[0].streetAddress,
      zipCode: this.props.personalDetail && this.props.personalDetail.address[0] && this.props.personalDetail.address[0].zipCode,
      firstNameInvaild: false,
      lastNameInvaild: false,
      phoneNumberInvalid: false,
      hourlyRateInvalid: false,
      disabledSaveBtn: false,
      isCityInvalid: false,
      isStreetInvalid: false,
      isStateInvalid: false,
      isZipInvalid: false,
      isActive: false,
      selectedState: {
        label: getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.name
          : '',
        value: getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.id
          : '-' + getArrayLength(this.props.personalDetail.address) > 0 && this.props.personalDetail.address[0].state != null
            ? this.props.personalDetail.address[0].state.name : ''
      },
      selectedAffiliation: {
        label: this.props.personalDetail && this.props.personalDetail.affiliationName,
        value: this.props.personalDetail && this.props.personalDetail.affiliationId + '-' + this.props.personalDetail && this.props.personalDetail.affiliationName
      },
    })
  }

  render() {

    let modalContent
    let modalTitle = 'Edit Personal Details'
    let modalType = ''
    const cityDetail = this.props.cityDetail && this.props.cityDetail.map((city, i) => {
      return { label: city.name, value: city.id + '-' + city.name }
    });

    const genderDetail = this.props.genderList && this.props.genderList.map((gender, i) => {
      return { label: gender.name, value: gender.id + '-' + gender.name }
    })
    const affiliationDetail = this.props.affiliationList && this.props.affiliationList.map((affiliation, i) => {
      return { label: affiliation.name, value: affiliation.affiliationId + '-' + affiliation.name }
    })


    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail, genderDetail, affiliationDetail)}
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
          toggle={() => this.togglePersonalDetails()}
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
              isDiscardModalOpen: false,
              disabledSaveBtn: false,
              isActive: true
            })}
        />
        <ModalPopup
          isOpen={this.state.isAlertModalOpen}
          toggle={this.reset}
          ModalBody={<span>Please insert a image less than 2 MB and should be in the format of JPEG, PNG, GIF.</span>}
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

  onCropChange = crop => {
    this.setState({ crop });
  };

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
    return (
      <div className='col-md-12 card CardWidget SPDetails'>
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
        <span className="rating-blockcustome">
          <i class="Icon iconFilledStar"></i>
          {this.props.personalDetail && Math.round(this.props.personalDetail.rating * 10) / 10}
        </span>
        <div className={'SPDetailsContainer SPNameWidget'}>
          <div className={'d-flex'}>
            <div className={'col-md-7 p-0'}>
              <h3 className={'SPName'}>
                {this.props.personalDetail &&
                  `${this.props.personalDetail.firstName || ''} ${this.props.personalDetail.lastName || ''} `}
              </h3>
              <p className={'SPsubTitle'}>
                <span>
                  {this.props.personalDetail &&
                    this.props.personalDetail.genderName}
                </span>
                <span>
                  {this.props.personalDetail && this.props.personalDetail.age}
                  {' '}
                  Yrs Old
                </span>
                <span>
                  {this.props.personalDetail &&
                    this.props.personalDetail.yearOfExperience}
                  {' '}
                  Yrs Exp
                </span>
              </p>
            </div>
            <div className={'col p-0'}>
              <h3 className={'ratePerHour primaryColor'}>
                <span>
                  {this.props.personalDetail &&
                    this.props.personalDetail.hourlyRate}
                </span>
              </h3>
            </div>
          </div>
          <div className={'width100'}>
            <div className={'SPAffiliatedList'}>
              {this.props.personalDetail &&
                this.props.personalDetail.affiliationName &&
                <span className={'AffiliatedList'}>
                  Affiliated to In
                {' '}
                  <bd>
                    {this.props.personalDetail &&
                      this.props.personalDetail.affiliationName}
                  </bd>
                </span>}
            </div>
          </div>
          <div className={'width100 description-block-profile'}>
          <span className={'primaryColor'}>Description</span>

            <span>{(this.props.personalDetail && this.props.personalDetail.description !== '') ? this.props.personalDetail.description
              : <span className={'SPDescriptionNone'} onClick={this.togglePersonalDetails()}>Edit your profile here</span>}</span>
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
                {this.props.personalDetail && this.streetAddress}
              </span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>City</span>
              <span className='AddressContentText'>{this.props.personalDetail && this.city}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>State</span>
              <span className='AddressContentText'>{this.props.personalDetail && this.states}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>Zip</span>
              <span className='AddressContentText'>{this.props.personalDetail && this.zipCode}</span>
            </div>
          </div>
          <div className={'SPAddressContent'}>
            <div className={'width100 SPAddressTitle d-flex'}>
              <span className={'SPAddressText primaryColor'}>Phone</span>
            </div>
            <div className={'width100 d-flex'}>
              <span>
                {this.props.personalDetail &&
                  formatPhoneNumber(this.props.personalDetail.phoneNumber)}
              </span>
            </div>
          </div>
        </div>
        {this.props.isUser &&
          <i
            name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
            className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
            onClick={this.togglePersonalDetails()}
          />}
      </div>
    )
  }
  getModalContent = (stateDetail, genderDetail, affiliationDetail) => {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h4 className='primaryColor text-left editProfileHeader'>
            Introduction
          </h4>
        </div>
        <div className='col-md-4 mb-2 editProfileImageContainer'>
          <div className='profileImage'>
            <img alt="NO"
              className={'SPdpImage'}
              src={
                this.state.imageProfile
                  ? this.state.imageProfile
                  : require('../../../assets/images/Blank_Profile_icon.png')
              }
            />
            <span className='editDpImage' />
            <div className='uploadWidget' name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}>
              <i className='addImageBtn' onClick={this.handleChange} />
            </div>
          </div>
        </div>
        <div className='col-md-8 mb-2 editProfileDetailsContainer'>
          <div className='row'>
            <div className='col-md-6 mb-2'>
              <Input
                name='firstName'
                label='First Name'
                autoComplete='off'
                required='required'
                type='text'
                maxlength='100'
                value={this.state.firstName}
                className={"form-control custome-placeholder " + (this.state.firstNameInvaild && 'inputFailure')}
                textChange={e => {
                  this.setState({
                    firstName: e.target.value,
                    firstNameInvaild: false,
                    disabledSaveBtn: false
                  })
                }}

                onBlur={(e) => {
                  if (!checkTextNotStartWithNumber(e.target.value)) {
                    this.setState({
                      firstNameInvaild: true
                    })
                  }

                }}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.firstNameInvaild && 'Please enter valid First Name'}
              </small>
            </div>
            <div className='col-md-6 mb-2'>
              <Input
                name='LastName'
                label='Last Name'
                autoComplete='off'
                type='text'
                maxlength='100'
                value={this.state.lastName}
                className={"form-control custome-placeholder " + (this.state.lastNameInvaild && 'inputFailure')}
                textChange={e => {
                  this.setState({
                    lastName: e.target.value,
                    lastNameInvaild: false,
                    disabledSaveBtn: false
                  })
                }}

                onBlur={(e) => {
                  if (!checkTextNotStartWithNumber(e.target.value)) {
                    this.setState({
                      lastNameInvaild: true
                    })
                  }

                }}
              />

              <small className="text-danger d-block OnboardingAlert">
                {this.state.lastNameInvaild && 'Please enter valid Last Name'}
              </small>
            </div>
            <div className='col-md-6 mb-2'>
              <div className='form-group'>
                <label className="m-0"> Gender</label>
                <SelectBox
                  options={genderDetail}
                  simpleValue
                  placeholder='Select Gender'
                  onChange={value => {
                    this.setState({
                      selectedGender: value,
                      disabledSaveBtn: false
                    })
                  }}
                  selectedValue={this.state.selectedGender}
                  className='inputFailure ServiceRequestSelect'
                />
              </div>
            </div>
            <div className='col-md-6 mb-2'>
              <Input
                name='Age'
                label='Age'
                autoComplete='off'
                type='text'
                maxLength='3'
                value={this.state.age}
                textChange={e => {
                  const re = /^[0-9\b]+$/
                  if (
                    (e.target.value === '' || re.test(e.target.value)) &&
                    getLength(e.target.value) <= 3 && (e.target.value) <= 100
                  ) {
                    this.setState({
                      age: e.target.value,
                      disabledSaveBtn: false,
                      ageInvaild: false
                    })
                  }
                }}
                onBlur={e => {
                  if (!e.target.value) {
                    this.setState({ ageInvaild: true })
                  }
                }}
                className={"form-control " + (this.state.ageInvaild && 'inputFailure')}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.ageInvaild && 'Please enter valid Age'}
              </small>
            </div>
            <div className='col-md-6 mb-2'>
              <Input
                name='YearsExperience'
                label='Years of Experience'
                autoComplete='off'
                required='required'
                type='text'
                maxlength='2'
                value={this.state.yearOfExperience}
                textChange={e => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({ yearOfExperience: e.target.value, disabledSaveBtn: false, yearOfExpInvaild: false })
                  }
                }}
                onBlur={e => {
                  if (!e.target.value) {
                    this.setState({ yearOfExpInvaild: true })
                  }
                }}
                className={"form-control " + (this.state.yearOfExpInvaild && 'inputFailure')}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.yearOfExpInvaild && 'Please enter valid Year of Experience'}
              </small>
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-2'>
          <label className="dark-font">Affiliation</label>
        </div>
        <div className='col-md-12'>
          <div className="form-check mb-2">
            <label className='form-check-label'>
              Certified member of organization(s)
            <input
                className='form-check-input'
                type='checkbox'
                maxLength='100'
                onClick={e => {
                  this.setState({ isActive: e.target.checked, disabledSaveBtn: false, selectedAffiliation: '' })
                }}
                checked={this.state.isActive}
                defaultChecked={this.state.isActive}
              />
              <span className="CheckboxIcon" />
            </label>
          </div>
        </div>

        <div
          className='col-md-12 mb-2'
          style={{ visibility: this.state.isActive ? 'visible' : 'hidden' }}
        >
          <div className='form-group'>
            <SelectBox
              options={affiliationDetail}
              simpleValue
              placeholder='Select the Organization'
              onChange={value => {
                let data = value.split('-');
                this.setState({ selectedAffiliation: value, disabledSaveBtn: false, affiliationName: data[1] })
              }}
              selectedValue={this.state.selectedAffiliation}
              className='inputFailure ServiceRequestSelect'
            />
          </div>

        </div>

        <div className='col-md-12 mb-2'>
          <TextArea
            name='Description'
            // placeholder='I am a 34 year enthusiast who is ready to serve the people in need. I have a total of 7 years of experience in providing home care to the patients. I also help in transportation, generally on the weekends. I hope I will be a great help to you.'
            placeholder='Tell us about yourself'
            className='form-control'
            rows='5'
            value={this.state.description}
            maxlength={'500'}
            textChange={e => {
              this.setState({ description: e.target.value, disabledSaveBtn: false, descriptionInvaild: false })
            }}
            onBlur={e => {
              if (!e.target.value) {
                this.setState({ descriptionInvaild: true })
              }
            }}
          />
          <small className="text-danger d-block OnboardingAlert">
            {this.state.descriptionInvaild && 'Please enter valid Description'}
          </small>
        </div>
        <div className='col-md-4'>
          <Input
            name='hourlyRate'
            label='Hourly Rate ($/hr)'
            placeholder="000.00"
            autoComplete='off'
            type='text'
            value={this.state.hourlyRate}
            maxlength='7'
            textChange={e => {
              let onlyNums = e.target.value.replace(/[^0-9.]/g, '')
              let values = onlyNums.split('.');
              if (values[0].length <= 3 || (values[1] && values[1].length <= 2)) {
                if (onlyNums.length < 6) {
                  this.setState({ hourlyRate: onlyNums, disabledSaveBtn: false, hourlyRateInvalid: false })
                  if (onlyNums.indexOf(".") > -1) {
                    if (values[1].length > 1) {
                      let len = onlyNums.indexOf(".") + 3
                      this.setState({
                        hourlyRate: onlyNums.substr(0, len),
                        disabledSaveBtn: false, hourlyRateInvalid: false
                      })
                    }
                  }
                } else if (onlyNums.length === 6) {
                  if (onlyNums.indexOf(".") > -1) {
                    if ((onlyNums.split('.')[1].length > 1)) {
                      let len = onlyNums.indexOf(".") + 3
                      this.setState({
                        hourlyRate: onlyNums.substr(0, len),
                        disabledSaveBtn: false, hourlyRateInvalid: false
                      })
                    }
                  } else {
                    this.setState({
                      hourlyRate: onlyNums.substr(0, 3),
                      disabledSaveBtn: false, hourlyRateInvalid: false
                    })
                  }
                }

              }

            }
            }
            onBlur={e => {
              if (
                (!e.target.value) ||
                getLength(e.target.value) < 1
              ) {
                this.setState({ hourlyRateInvalid: true })
              }
            }}
            className={"form-control " + (this.state.hourlyRateInvalid && 'inputFailure')}
          />
          <small className="text-danger d-block OnboardingAlert">
            {this.state.hourlyRateInvalid && 'Please enter valid Hourly Rate'}
          </small>
        </div>
        <div className='hrLine' />
        <div className='col-md-12 mb-2'>
          <div className='row'>
            <div className='col-md-12'>
              <h4 className='primaryColor text-left editProfileHeader'>
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
                      className={"form-control " + (this.state.isStreetInvalid && 'inputFailure')}
                    />
                    <small className="text-danger d-block OnboardingAlert">
                      {this.state.isStreetInvalid && <span>Please enter valid {'Street'}</span>}
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
                      className={"form-control " + (this.state.isCityInvalid && 'inputFailure')}
                    />
                    <small className="text-danger d-block OnboardingAlert">
                      {this.state.isCityInvalid && <span>Please enter valid {'City'}</span>}
                    </small>
                  </div>
                </div>
                <div className='col-md-12 mb-2'>
                  <div className='row'>
                    <div className='col-md-6 mb-2'>
                      <div className='form-group'>
                        <label className="m-0">State</label>
                        <SelectBox
                          options={stateDetail}
                          simpleValue
                          placeholder='Select the state'
                          onChange={value => {
                            this.setState({ selectedState: value, disabledSaveBtn: false, isStateInvalid: false })
                          }
                          }
                          onBlur={(e) => {
                            if (this.state.selectedState === '') {
                              this.setState({ isStateInvalid: true })
                            }
                          }}
                          selectedValue={this.state.selectedState}
                          className='inputFailure ServiceRequestSelect'
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
                            this.setState({ zipCode: e.target.value, disabledSaveBtn: false, isZipInvalid: false })
                          }
                        }}
                        onBlur={e => {
                          if (!e.target.value || getLength(e.target.value) < 5) {
                            this.setState({ isZipInvalid: true })
                          }
                        }}
                        className={"form-control " + (this.state.isZipInvalid && 'inputFailure')}
                      />
                      <small className="text-danger d-block OnboardingAlert">
                        {this.state.isZipInvalid && <span>Please enter valid {'Zipcode'}</span>}
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
              <h4 className='primaryColor text-left editProfileHeader'>
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
                    maxlength='10'
                    type='text'
                    value={formatContactNumberValue(this.state.phoneNumber)}
                    className={"form-control custome-placeholder " + (this.state.phoneNumberInvalid && 'inputFailure')}
                    textChange={this.textChangeContactNumber}
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
}

function mapDispatchToProps(dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    getAffiliationDetail: () => dispatch(action.getAffiliationDetail()),
    updatePersonalDetail: data => dispatch(action.updatePersonalDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail()),
    uploadImg: data => dispatch(action.uploadImg(data)),
    getImage: () => dispatch(action.getImage()),
    getGender: () => dispatch(action.getGender()),
  }
}

function mapStateToProps(state) {
  return {
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    updatePersonalDetailSuccess: state.profileState.PersonalDetailState
      .updatePersonalDetailSuccess,
    cityDetail: state.profileState.PersonalDetailState.cityDetail,
    profileImgData: state.profileState.PersonalDetailState.imageData,
    genderList: state.profileState.PersonalDetailState.genderList,
    affiliationList: state.profileState.PersonalDetailState.affiliationList,
    isLoading: state.loadingState.isLoading,
    isUser: state.profileState.PersonalDetailState.isUser,
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
)
