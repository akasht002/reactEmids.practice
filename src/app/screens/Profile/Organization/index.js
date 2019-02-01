import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import ImageCrop from 'react-image-crop-component'
import 'react-image-crop-component/style.css'

import 'react-image-crop/dist/ReactCrop.css'
import 'react-image-crop/lib/ReactCrop.scss'
import './index.css'
import {
  Input,
  TextArea,
  SelectBox,
  ProfileModalPopup,
  ModalPopup,
  ScreenCover,
  ProfileImage
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
import { SCREENS, PERMISSIONS } from '../../../constants/constants';
import { SETTING } from '../../../services/api'

class Organization extends React.PureComponent {
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
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }
    }
    this.isImageSave = false;
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
    if (
      e.target.files[0].size <= SETTING.FILE_UPLOAD_SIZE &&
      e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)
    ) {
      this.setState({
        uploadedImageFile: URL.createObjectURL(e.target.files[0])
      })
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result
          }),
        false
      )
      reader.readAsDataURL(e.target.files[0])
    } else {
      this.setState({
        isAlertModalOpen: !this.state.isAlertModalOpen
      })
    }
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result
          }),
        false
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  onSubmit = () => {
    const { organizationNameInvaild, phoneNumberInvalid, urlInvaild, city, zipCode, streetAddress, selectedState } = this.state;
    this.isImageSave = false;
    if (
      organizationNameInvaild ||
      phoneNumberInvalid ||
      urlInvaild ||
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
    this.setState({
      uploadImage: !this.state.uploadImage
    })
  }

  saveImageUpload = () => {
    this.isImageSave = true;
    this.setState({
      uploadImage: !this.state.uploadImage
    })
    this.props.uploadImg(this.state.src)
  }

  onCroppeds = e => {
    let image = e.image
    this.setState({
      croppedImage: image
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
              Please insert a image less than 2 MB and should be in the format of JPEG,PNG, Gif)
            </span>
          }
          btn1='OK'
          // btn2='OK'
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
      </ScreenCover>
    )
  }

  getBlackModalContent = () => {
    return (
      <div className={'UploadProfileImageWidget'}>
        <div className={'width100 UploadProfileImageContainer'}>
          <div style={{ width: '300px', height: '300px' }}>
            <ImageCrop
              src={this.state.uploadedImageFile}
              setWidth={300}
              setHeight={300}
              square={false}
              resize
              border={'dashed #ffffff 2px'}
              onCrop={this.onCroppeds}
              watch={this.watch}
            />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8'}>
            <ul className={'UploadedImageLimitation'}>
              <li>Click on Change Photo</li>
              <li>Select the image from your desktop/gallery</li>
              <li>The image should not exceed beyond 2MB.</li>
              <li>The image should be either of PNG or JPEG/JPG type only.</li>
              <li>Once select you can crop the image by dragging the cursor the image</li>
              <li>Click on Save</li>
            </ul>
          </div>
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
  getBlackModalContent = () => {
    return (
      <div className={'UploadProfileImageWidget'}>
        <div className={'width100 UploadProfileImageContainer'}>
          <div style={{ width: '300px', height: '300px' }}>
            <ImageCrop
              src={this.state.uploadedImageFile}
              setWidth={300}
              setHeight={300}
              square={false}
              resize
              border={'dashed #ffffff 2px'}
              onCrop={this.onCroppeds}
              watch={this.watch}
            />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-8'}>
            <ul className={'UploadedImageLimitation'}>
              <li>1. Click on the Change Photo Button. </li>
              <li>2. Select the image from your desktop/ gallery.</li>
              {/* <li>3. Click and drag the curser across the image to crop.</li> */}
              <li className="pd-10"><strong>Note:</strong>&nbsp;Image should not exceed 2 MB either a PNG/JPEG/JPG format</li>
            </ul>
          </div>
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
        <div className={'SPDetailsContainer SPNameWidget'}>
          <div className={'d-flex'}>
            <div className={'col-md-7 p-0'}>
              <h3 className={'SPName'}>
                {this.props.personalDetail && this.props.personalDetail.entity &&
                  `${this.props.personalDetail.entity.organization || ''} `}
              </h3>

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

          <div className={'width100 url-separator'}>
            <h3 className={'webUrl'}>
              {(this.props.personalDetail && this.props.personalDetail.entity) && this.props.personalDetail.entity.websiteUrl ?
                <a href={'https://' + this.props.personalDetail.entity.websiteUrl} target="_blank">{this.props.personalDetail.entity.websiteUrl}</a> : ''}
            </h3>
          </div>
          <div className={'width100'}>
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
              <span className={'SPAddressText primaryColor'}>Phone</span>
            </div>
            <div className={'width100 d-flex'}>
              <span>
                {this.props.personalDetail.phoneNumber &&
                  formatPhoneNumber(this.props.personalDetail.phoneNumber)}
              </span>
            </div>
          </div>
        </div>
        <i
          name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
          className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
          onClick={this.togglePersonalDetails.bind(this)}
        />
      </div>
    )
  }
  getModalContent = stateDetail => {

    console.log('getModalContent state value............', this.state.selectedState)
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h4 className='primaryColor text-left editProfileHeader'>
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
              <i className='addImageBtn' onClick={this.handleChange} />
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
            <div className='col-md-12'>
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
            </div>
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
            textChange={e => {
              if (getLength(e.target.value) <= 500) {
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
      phoneNumber: this.props.personalDetail.phoneNumber
    }

    let updated_data = {
      organizationName: this.state.organizationName
        ? this.state.organizationName
        : '',
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
      organizationName: this.props.personalDetail.organization,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber,
      organizationNameInvaild: false,
      phoneNumberInvalid: false
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    updateOrganizationDetail: data =>
      dispatch(action.updateOrganizationDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail()),
    uploadImg: data => dispatch(action.uploadImg(data)),
    getImage: () => dispatch(action.getImage())
  }
}

function mapStateToProps(state) {
  return {
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    updatePersonalDetailSuccess: state.profileState.PersonalDetailState
      .updatePersonalDetailSuccess,
    cityDetail: state.profileState.PersonalDetailState.cityDetail,
    profileImgData: state.profileState.PersonalDetailState.imageData
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Organization)
)
