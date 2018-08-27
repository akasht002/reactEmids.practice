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
  ModalPopup
} from '../../../components'
import BlackoutModal from '../../../components/LevelOne/BlackoutModal'
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  isDecimal,
  getArrayLength,
  getLength
} from '../../../utils/validations'

import { SETTING } from '../../../services/api'

class PersonalDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,
      ModalOrg: true,
      src: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }      
    }
  }

  componentDidMount() {
    this.props.getPersonalDetail()
    this.props.getCityDetail()
    this.props.getImage()
    this.props.getGender()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imageProfile: nextProps.profileImgData.image,
      firstName: nextProps.personalDetail.firstName,
      lastName: nextProps.personalDetail.lastName,
      age: nextProps.personalDetail.age,
      genderName: nextProps.personalDetail.genderName,
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
        value: nextProps.personalDetail.genderId + '-'+nextProps.personalDetail.genderName
      },
      selectedState: {
        label: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
        ? nextProps.personalDetail.address[0].state.name
        : '',
        value: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
        ? nextProps.personalDetail.address[0].state.id
        : '' + '-' +getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
        ? nextProps.personalDetail.address[0].state.name:''
      }
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

  handleChange = e => {
    console.log(e.target.files[0].size)
    console.log(SETTING.FILE_UPLOAD_SIZE)
    if (e.target.files[0].size <= SETTING.FILE_UPLOAD_SIZE) {
      this.setState({
        uploadedImageFile: URL.createObjectURL(e.target.files[0]),
        uploadImage: !this.state.uploadImage
      })
    } else {
      alert('Please insert a image less than 2 MB')
    }
  }

  reUpload = e => {
    if (e.target.files[0].size <= SETTING.FILE_UPLOAD_SIZE) {
      this.setState({
        uploadedImageFile: URL.createObjectURL(e.target.files[0])
      })
    } else {
      alert('Please insert a image less than 2 MB')
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
    if (
      getLength(this.state.firstName) === 0 ||
      getLength(this.state.lastName) === 0 ||
      getLength(this.state.phoneNumber) === 0
    ) {
      this.setState({ isValid: false })
    } else {
      this.props.updatePersonalDetail(this.state)
      this.setState({
        EditPersonalDetailModal: !this.state.EditPersonalDetailModal
      })
    }
  }

  street = this.props.personalDetail.map((person, i) => (
    <span key={i}>{person}</span>
  ))

  closeImageUpload = () => {
    this.setState({
      uploadImage: !this.state.uploadImage
    })
    console.log(this.state.croppedImage)
    this.props.uploadImg(this.state.croppedImage)
  }

  onCroppeds = e => {
    let image = e.image
    let image_data = e.data
    this.setState({
      croppedImage: image
    })
  }

  render() {
    let modalContent
    let modalTitle = 'Edit Personal Detials'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      city.label = city.name
      city.value = city.id + '-' + city.name
      return city
    }
    )
    const genderDetail = this.props.genderList.map((gender, i) => {
      gender.label = gender.name
      gender.value = gender.id + '-' + gender.name
      return gender
    })


    //console.log(this.props.genderList)

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail, genderDetail)}
        <BlackoutModal
          isOpen={this.state.uploadImage}
          toggle={this.closeImageUpload}
          ModalBody={this.getBlackModalContent()}
          className='modal-lg asyncModal BlackoutModal'
          modalTitle='Edit Profile Image'
          centered='centered'
        />
      </form>
    )
    modalContent = EducationModalContent

    const ProfileDetail = this.renderDetails()
    return (
      <React.Fragment>
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
      </React.Fragment>
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
              onChange={this.reUpload}
            />
          </div>
        </div>
      </div>
    )
  }
  renderDetails = () => {
    let text = ''
    return (
      <div className='col-md-12 card CardWidget SPDetails'>
        <div className={'SPDetailsContainer SPdpWidget'}>
          <div className={'SPdpContainer'}>
            <svg viewBox='0 0 36 36' className='circular-chart'>
              <path
                className='circle'
                strokeDasharray='80, 100'
                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
              />
            </svg>

            <img
              className={'SPdpImage'}
              src={
                this.state.imageProfile
                  ? this.state.imageProfile
                  : require('../../../assets/images/Blank_Profile_icon.png')
              }
            />
          </div>
          {/* <span className={'SPRating'}>
            <i className={'Icon iconFilledStar'} />4.2
          </span> */}
        </div>
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
                  {' '}
                  gender
                </span>
                <span>
                  {this.props.personalDetail && this.props.personalDetail.age}
                  {' '}
                  years
                </span>
                <span>
                  {this.props.personalDetail &&
                    this.props.personalDetail.yearOfExperience}
                  {' '}
                  years exp
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
              <span className={'AffiliatedList'}>
                Affiliated to In
                {' '}0
                <bd>
                  {this.props.personalDetail &&
                    this.props.personalDetail.affiliationName}
                </bd>
              </span>
            </div>
          </div>
          <div className={'width100'}>
            {(this.props.personalDetail && this.props.personalDetail.description !== '') ? this.props.personalDetail.description
              : <span className={'SPDescriptionNone'} onClick={this.togglePersonalDetails.bind(this)}>Edit your profile here</span>}
          </div>
        </div>
        <div className={'SPDetailsContainer SPAddressWidget'}>
          <div className={'SPAddressContent'}>
            <div className={'width100 SPAddressTitle d-flex'}>
              <span className={'SPAddressText primaryColor'}>Address</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>Street</span>
              <span>
                {this.props.personalDetail && this.streetAddress}
              </span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>City</span>
              <span>{this.props.personalDetail && this.city}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>State</span>
              <span>{this.props.personalDetail && this.states}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>ZIP</span>
              <span>{this.props.personalDetail && this.zipCode}</span>
            </div>
          </div>
          <div className={'SPAddressContent'}>
            <div className={'width100 SPAddressTitle d-flex'}>
              <span className={'SPAddressText primaryColor'}>Phone</span>
            </div>
            <div className={'width100 d-flex'}>
              <span>
                {this.props.personalDetail &&
                  this.props.personalDetail.phoneNumber}
              </span>
            </div>
          </div>
        </div>
        <i
          className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
          onClick={this.togglePersonalDetails.bind(this)}
        />
      </div>
    )
  }
  getModalContent = (stateDetail, genderDetail) => {
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
              className={'SPdpImage'}
              src={
                this.state.imageProfile
                  ? this.state.imageProfile
                  : require('../../../assets/images/Blank_Profile_icon.png')
              }
            />
            <span className='editDpImage' />
            <div className='uploadWidget'>
              <button className='addImageBtn' />
              <input
                className='addImageInput'
                type='file'
                onChange={this.handleChange}
              />
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
                  this.setState({ firstName: e.target.value })
                  if (!checkTextNotStartWithNumber(this.state.firstName)) {
                    this.setState({
                      firstNameInvaild: true,
                      disabledSaveBtn: true
                    })
                  } else {
                    this.setState({
                      firstNameInvaild: false,
                      disabledSaveBtn: false
                    })
                  }
                }}
              />
              {this.state.firstName === '' && !this.state.isValid &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter  the firstName
                </span>}
              {this.state.firstNameInvaild  &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter vaild first name
                </span>}
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
                  this.setState({ lastName: e.target.value })
                  if (!checkTextNotStartWithNumber(this.state.lastName)) {
                    this.setState({
                      lastNameInvaild: true,
                      disabledSaveBtn: true
                    })
                  } else {
                    this.setState({
                      lastNameInvaild: false,
                      disabledSaveBtn: false
                    })
                  }
                }}
              />
              {!this.state.isValid &&
                !this.state.lastName &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter {this.state.lastName === '' && ' Last Name'}
                </span>}
              {this.state.lastNameInvaild &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter vaild last name
                </span>}

            </div>
            <div className='col-md-6 mb-2'>
              <div className='form-group'>
                <label> Gender</label>
                <SelectBox
                  options={genderDetail}
                  simpleValue
                  placeholder='Select Gender'
                  onChange={e => {
                    this.setState({
                      selectedGender: e
                    })
                    console.log(this.state.selectedGender)
                  }}
                  selectedValue={this.state.selectedGender}
                  className={'inputFailure'}
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
                    getLength(e.target.value) <= 3
                  ) {
                    this.setState({ age: e.target.value })
                  }
                }}
                className='form-control'
              />
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
                  const re = /^[0-9\b]+$/
                  if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({ yearOfExperience: e.target.value })
                  }
                }}
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-2'>
          <label>Affiliation</label>
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
                  this.setState({ isActive: e.target.checked })
                }}
                defaultChecked={this.state.isActive}
              />
              <span class="CheckboxIcon" />
            </label>
          </div>
        </div>

        <div
          className='col-md-12 mb-2'
          style={{ visibility: this.state.isActive ? 'visible' : 'hidden' }}
        >
          <div className='form-group'>
            <SelectBox
              options={[
                {
                  label: 'AABB (formerly American Association of Blood Banks)',
                  value: '1-AABB'
                },
                {
                  label: 'Academy of International Business (AIB)',
                  value: '2-AABB'
                },
                { label: 'Academy of Management (AOM)', value: '3-AOM' },
                {
                  label: 'Association for the Advancement of Cost Engineering (AACE International)',
                  value: '4-AACE International'
                },
                {
                  label: 'Association for Volunteer Administration (AVA)',
                  value: '5-AVA'
                },
                {
                  label: 'Association of Information Technology Professionals (AITP)',
                  value: '6-AITP'
                },
                {
                  label: 'Chartered Global Management Accountant (CGMA)',
                  value: '7-CGMA'
                }
              ]}
              simpleValue
              placeholder='Select the Organization'
              onChange={value => {
                this.setState({ organization: value })
              }}
              selectedValue={this.state.organization}
              className={'inputFailure'}
            />
          </div>

        </div>

        <div className='col-md-12 mb-2'>
          <TextArea
            name='Description'
            placeholder='I am a 34 year enthusiast who is ready to serve the people in need. I have a total of 7 years of experience in providing home care to the patients. I also help in transportation, generally on the weekends. I hope I will be a great help to you.'
            className='form-control'
            rows='5'
            value={this.state.description}
            textChange={e => {
              if (getLength(e.target.value) <= 500) {
                this.setState({ description: e.target.value })
              }
            }}
          />
        </div>
        <div className='col-md-4'>
          <Input
            name='hourlyRate'
            label='Hourly Rate ($/hr)'
            autoComplete='off'
            type='text'
            value={this.state.hourlyRate}
            maxlength='7'
            textChange={e => {
              const re = /^\d*\.?\d{0,2}$/
              if (e.target.value === '' || re.test(e.target.value)) {
                this.setState({ hourlyRate: e.target.value })
              }
            }}
            className='form-control'
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
                    <label>State</label>
                    <SelectBox
                      options={stateDetail}
                      simpleValue
                      placeholder='Select the state'
                      onChange={value => {
                        this.setState({ selectedState: value })
                      }}
                      selectedValue={this.state.selectedState}
                      className={'inputFailure'}
                    />
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
                          city: e.target.value
                        })}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='col-md-12 mb-2'>
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
                              streetAddress: e.target.value
                            })}
                          className='form-control'
                        />
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
                            this.setState({ zipCode: e.target.value })
                          }
                        }}
                        className='form-control'
                      />
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
                    autoComplete='off'
                    maxlength='15'
                    type='text'
                    value={this.state.phoneNumber}
                    className={
                      'form-control ' +
                      (!this.state.isValid &&
                        !this.state.phoneNumber &&
                        'inputFailure')
                    }
                    textChange={e => {
                      const re = /^[0-9\b]+$/
                      if (
                        (e.target.value === '' || re.test(e.target.value)) &&
                        getLength(e.target.value) <= 15
                      ) {
                        this.setState({ phoneNumber: e.target.value })
                      }
                    }}
                  />
                  {!this.state.isValid &&
                    !this.state.phoneNumber &&
                    <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                      Please enter
                      {' '}
                      {this.state.phoneNumber === '' && ' Phone Number'}
                    </span>}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  togglePersonalDetails(action, e) {
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: false
    })
    let old_data = {
      firstName: this.props.personalDetail.firstName,
      lastName: this.props.personalDetail.lastName,
      age: this.props.personalDetail.age,
      yearOfExperience: this.props.personalDetail.yearOfExperience,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      lastName: this.props.personalDetail.lastName,
      phoneNumber: this.props.personalDetail.phoneNumber
    }

    let updated_data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      yearOfExperience: this.state.yearOfExperience,
      description: this.state.description,
      hourlyRate: this.state.hourlyRate,
      phoneNumber: this.state.phoneNumber
    }

    const fieldDifference = _.isEqual(old_data, updated_data)
    console.log(_.isEqual(old_data, updated_data))

    if (fieldDifference === true) {
      this.setState({ certificationModal: false, isDiscardModalOpen: false })
    } else {
      this.setState({ isDiscardModalOpen: true, EditPersonalDetailModal: true })
    }
  }

  reset = () => {
    this.setState({
      EditPersonalDetailModal: false,
      isDiscardModalOpen: false,
      firstName: this.props.personalDetail.firstName,
      lastName: this.props.personalDetail.lastName,
      age: this.props.personalDetail.age,
      yearOfExperience: this.props.personalDetail.yearOfExperience,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
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
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
)
