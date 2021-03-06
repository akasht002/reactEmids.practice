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
  ScreenCover
} from '../../../components'
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  getArrayLength,
  getLength
} from '../../../utils/validations'
import { Details, ProfileImageDetail } from './Details'
import { SETTING } from '../../../constants/config'
import { SCREENS, PERMISSIONS } from '../../../constants/constants';
import { formatPhoneNumber } from '../../../utils/formatName'
import ImageModal from '../PersonalDetail/ImageModal';
import { CustomTextArea } from '../../../components/Base';

export class EntityPersonalDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,
      isAlertModalOpen: false,
      isValidPhoneNumber: true,
      isStateInvalid: false,
      isCityInvalid: false,
      isZipInvalid: false,
      isStreetInvalid: false,
      ModalOrg: true,
      src: null,
      isAlertSaveModalOpen: false,
      crop: SETTING.CROP_DEFAULT
    };
    this.isImageSave = false;
    this.isChangePhoto = false
  }

  componentDidMount() {
    this.props.getPersonalDetail()
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
        organization: nextProps.personalDetail.organization,
        description: nextProps.personalDetail.description,
        hourlyRate: nextProps.personalDetail.hourlyRate,
        url: nextProps.personalDetail.entity && nextProps.personalDetail.entity.websiteUrl,
        assigned_by: nextProps.personalDetail.entity && nextProps.personalDetail.entity.assignedBy,
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
        isActive: false,
        selectedGender: {
          label: nextProps.personalDetail.genderName,
          value: nextProps.personalDetail.genderId +
            '-' +
            nextProps.personalDetail.genderName
        },
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
        },
        addressId: getArrayLength(nextProps.personalDetail.address) > 0 &&
          nextProps.personalDetail.address[0].addressId != null
          ? nextProps.personalDetail.address[0].addressId
          : 0,
        addressTypeId: getArrayLength(nextProps.personalDetail.address) > 0 &&
          nextProps.personalDetail.address[0].addressTypeId != null
          ? nextProps.personalDetail.address[0].addressTypeId
          : 2
      })
    }
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

  onSubmit = () => {
    const { firstName, lastName, phoneNumber, city, zipCode, streetAddress, selectedState } = this.state;
    this.isImageSave = false;
    if (
      getLength(firstName) === 0 ||
      getLength(lastName) === 0 ||
      getLength(phoneNumber) < 10 ||
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
        stateInvalid = true;
      }
      this.setState({ isValid: false, isStateInvalid: stateInvalid, isCityInvalid: cityInvalid, isZipInvalid: zipCodeInvalid, isStreetInvalid: streetInvalid })
    } else {
      this.props.updateEntityDetail(this.state)
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

  onCropChange = crop => {
    this.setState({ crop });
  };

  changeCroppedImage = (croppedImage) => {
    this.setState({croppedImageUrl: croppedImage})
  }

  render() {
    let modalContent
    let modalTitle = 'Edit Personal Details'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      return { label: city.name, value: city.id + '-' + city.name }
    })

    const genderDetail = this.props.genderList && this.props.genderList.map((gender, i) => {
      return { label: gender.name, value: gender.id + '-' + gender.name }
    })

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail, genderDetail)}
        <ImageModal
          isOpen={this.state.uploadImage}
          toggle={this.closeImageUpload}
          ModalBody={
            <ProfileImageDetail
              uploadedImageFile={this.state.uploadedImageFile}
              crop={this.state.crop}
              changeCroppedImage={this.changeCroppedImage}
              onCropChange={this.onCropChange}
              reUpload={this.reUpload}
            />}
          className='modal-lg asyncModal BlackoutModal'
          modalTitle='Edit Profile Image'
          centered='centered'
          saveImage={this.saveImageUpload}
          buttonDisable={!this.state.croppedImageUrl}
        />
      </form>
    )
    modalContent = EducationModalContent

    return (
      <ScreenCover isLoading={this.props.isLoading}>
        <Details
          personalDetail={this.props.personalDetail}
          image={this.state.imageProfile}
          profilePercentage={this.props.profilePercentage}
          togglePersonalDetails={this.togglePersonalDetails}
          streetAddress={this.streetAddress}
          city={this.city}
          states={this.states}
          zipCode={this.zipCode}
          isUser={this.props.isUser}
        />
        <ProfileModalPopup
          isOpen={this.state.EditPersonalDetailModal}
          toggle={() => this.togglePersonalDetails(this, modalType)}
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

  getModalContent = (stateDetail, genderDetail) => {
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
              alt='NO'
              className={'SPdpImage'}
              src={
                this.state.imageProfile
                  ? this.state.imageProfile
                  : require('../../../assets/images/Blank_Profile_icon.png')
              }
            />
            <span className='editDpImage' />
            <div className='uploadWidget' name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}>
              <i className='addImageBtn theme-primary' onClick={this.handleChange} />
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
                className={
                  'form-control ' +
                  (!this.state.isValid &&
                    !this.state.firstName &&
                    'inputFailure')
                }
                textChange={e => {
                  this.setState({
                    firstName: e.target.value,
                    firstNameInvaild: false,
                    disabledSaveBtn: false
                  })
                }}
                onBlur={e => {
                  if (!checkTextNotStartWithNumber(e.target.value)) {
                    this.setState({ firstNameInvaild: true })
                  }
                }}
              />
              <small className='text-danger d-block OnboardingAlert'>
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
                className={
                  'form-control ' +
                  (!this.state.isValid &&
                    !this.state.lastName &&
                    'inputFailure')
                }
                textChange={e => {
                  this.setState({
                    lastName: e.target.value,
                    lastNameInvaild: false,
                    disabledSaveBtn: false
                  })
                }}
                onBlur={e => {
                  if (!checkTextNotStartWithNumber(e.target.value)) {
                    this.setState({ lastNameInvaild: true })
                  }
                }}
              />
              <small className='text-danger d-block OnboardingAlert'>
                {this.state.lastNameInvaild && 'Please enter valid Last Name'}
              </small>

            </div>
            <div className='col-md-6 mb-2'>
              <div className='form-group'>
                <label className="m-0">Gender</label>
                <SelectBox
                  options={genderDetail}
                  placeholder='Select Gender'
                  onChange={value => {
                    this.setState({
                      selectedGender: value,
                      disabledSaveBtn: false
                    })
                  }}
                  selectedValue={this.state.selectedGender}
                  className='ServiceRequestSelect inputFailure'
                  searchable={false}
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
                    getLength(e.target.value) <= 3 &&
                    e.target.value <= 100
                  ) {
                    this.setState({
                      age: e.target.value,
                      disabledSaveBtn: false
                    })
                  }
                }}
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='col-md-12'>
          <Input
            name='assigned_by'
            label='Assigned By'
            autoComplete='off'
            required='required'
            type='text'
            maxlength='100'
            disabled={true}
            value={this.state.assigned_by}
            textChange={e => {
              this.setState({
                assigned_by: e.target.value,
                disabledSaveBtn: false
              })
            }}
            className='form-control'
          />
        </div>
        <div className='col-md-12'>
          <Input
            name='url'
            label='URL'
            autoComplete='off'
            required='required'
            type='text'
            maxlength='40'
            value={this.state.url}
            disabled={true}
            textChange={e => {
              this.setState({
                url: e.target.value,
                disabledSaveBtn: false
              })
            }}
            className='form-control'
          />
        </div>

        <div className='col-md-12 mb-2'>
          <CustomTextArea
            name='Description'
            placeholder='Tell us about yourself'
            className='form-control'
            rows='5'
            value={this.state.description}
            maxlength={'2000'}
            textChange={e => {
              this.setState({
                description: e.target.value,
                disabledSaveBtn: false
              })
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
                        <label className="m-0">State</label>
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
                        {this.state.isZipInvalid && <span>Please enter valid {(this.state.zipCode === '' || this.state.zipCode === null) && 'Zipcode'}</span>}
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
                    autoComplete='off'
                    maxlength='15'
                    type='text'
                    value={formatPhoneNumber(this.state.phoneNumber)}
                    className={
                      'form-control ' +
                      (!this.state.isValid &&
                        !this.state.phoneNumber &&
                        'inputFailure')
                    }
                    PhoneInput="PhoneInput"
                    textChange={e => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                      if (onlyNums.length < 10) {
                        this.setState({
                          phoneNumber: onlyNums,
                          isValidPhoneNumber: getArrayLength(
                            this.state.phoneNumber
                          ) < 10,
                          disabledSaveBtn: false
                        })
                      } else if (onlyNums.length === 10) {
                        const number = onlyNums.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          '$1-$2-$3'
                        )
                        this.setState({
                          phoneNumber: number,
                          isValidPhoneNumber: getArrayLength(
                            this.state.phoneNumber
                          ) < 10,
                          disabledSaveBtn: false
                        })
                      }
                    }}
                  />
                  {!this.state.isValid &&
                    !getLength(this.state.phoneNumber) > 10 &&
                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                      Please enter
                      {' '}
                      {this.state.phoneNumber === '' && ' Phone Number'}
                    </span>}
                  {!this.state.isValidPhoneNumber &&
                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                      Please enter vaild Phone Number
                    </span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  togglePersonalDetails = (action, e) => {
    this.isImageSave = false;
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: !this.state.disabledSaveBtn,
      isStreetInvalid: false,
      isCityInvalid: false,
      isZipInvalid: false,
      isStateInvalid: false,
      city: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].city
        : '',
      streetAddress: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].streetAddress
        : '',
      zipCode: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].zipCode
        : '',
      selectedState: {
        label: getArrayLength(this.props.personalDetail.address) > 0 &&
          this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.name
          : '',
        value: getArrayLength(this.props.personalDetail.address) > 0 &&
          this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.id
          : '-' + getArrayLength(this.props.personalDetail.address) > 0 &&
            this.props.personalDetail.address[0].state != null
            ? this.props.personalDetail.address[0].state.name
            : ''
      }
    })
    let old_data = {
      firstName: this.props.personalDetail.firstName,
      lastName: this.props.personalDetail.lastName,
      age: this.props.personalDetail.age,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber
    }

    let updated_data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      description: this.state.description,
      hourlyRate: this.state.hourlyRate,
      phoneNumber: this.state.phoneNumber
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
      firstName: this.props.personalDetail.firstName,
      lastName: this.props.personalDetail.lastName,
      age: this.props.personalDetail.age,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber,
      isStreetInvalid: false,
      isCityInvalid: false,
      isZipInvalid: false,
      isStateInvalid: false,
      city: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].city
        : '',
      streetAddress: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].streetAddress
        : '',
      zipCode: getArrayLength(this.props.personalDetail.address) > 0
        ? this.props.personalDetail.address[0].zipCode
        : '',
      selectedState: {
        label: getArrayLength(this.props.personalDetail.address) > 0 &&
          this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.name
          : '',
        value: getArrayLength(this.props.personalDetail.address) > 0 &&
          this.props.personalDetail.address[0].state != null
          ? this.props.personalDetail.address[0].state.id
          : '-' + getArrayLength(this.props.personalDetail.address) > 0 &&
            this.props.personalDetail.address[0].state != null
            ? this.props.personalDetail.address[0].state.name
            : ''
      }
    })
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    updateEntityDetail: data => dispatch(action.updateEntityDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail()),
    uploadImg: data => dispatch(action.uploadImg(data)),
    getImage: () => dispatch(action.getImage()),
    getGender: () => dispatch(action.getGender())
  }
}

export function mapStateToProps(state) {
  return {
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    updatePersonalDetailSuccess: state.profileState.PersonalDetailState
      .updatePersonalDetailSuccess,
    cityDetail: state.profileState.PersonalDetailState.cityDetail,
    profileImgData: state.profileState.PersonalDetailState.imageData,
    genderList: state.profileState.PersonalDetailState.genderList,
    isLoading: state.loadingState.isLoading,
    isUser: state.profileState.PersonalDetailState.isUser,
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntityPersonalDetail)
)
