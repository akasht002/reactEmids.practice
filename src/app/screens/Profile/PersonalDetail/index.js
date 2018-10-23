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
  ModalPopup,ScreenCover,
  ProfileImage
} from '../../../components'
import BlackoutModal from '../../../components/LevelOne/BlackoutModal'
import { OrganizationData } from '../../../data/OrganizationData';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  getArrayLength,
  getLength,
  checkhourlyRate,
  checkPhoneNumber
} from '../../../utils/validations'
import { PHONE_NUMBER_CONST } from '../../../constants/constants';
import { SETTING } from '../../../services/api'
import {SCREENS, PERMISSIONS} from '../../../constants/constants';

class PersonalDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,
      isAlertModalOpen:false,
      isValidPhoneNumber:true,
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
    this.props.getAffiliationDetail()
    this.props.getCityDetail()
    this.props.getImage()
    this.props.getGender()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imageProfile: nextProps.profileImgData.image,
      uploadedImageFile: nextProps.profileImgData.image
        ? nextProps.profileImgData.image
        : require('../../../assets/images/Blank_Profile_icon.png'),
      firstName: nextProps.personalDetail.firstName,
      lastName: nextProps.personalDetail.lastName,
      age: nextProps.personalDetail.age,
      genderName: nextProps.personalDetail.genderName,
      affiliationName:nextProps.personalDetail.affiliationName,
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
      selectedAffiliation: {
        label: nextProps.personalDetail.affiliationName,
        value: nextProps.personalDetail.affiliationId + '-'+nextProps.personalDetail.affiliationName
      },
      selectedState: {
        label: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
        ? nextProps.personalDetail.address[0].state.name
        : '',
        value: getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
        ? nextProps.personalDetail.address[0].state.id
        : '' + '-' +getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].state != null
        ? nextProps.personalDetail.address[0].state.name:''
      },
      addressId:getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].addressId != null
      ? nextProps.personalDetail.address[0].addressId:0,
      addressTypeId:getArrayLength(nextProps.personalDetail.address) > 0 && nextProps.personalDetail.address[0].addressTypeId != null
      ? nextProps.personalDetail.address[0].addressTypeId:2
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
    if (e.target.files[0].size <= SETTING.FILE_UPLOAD_SIZE && e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
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
    if (
     this.state.firstNameInvaild ||
     this.state.lastNameInvaild ||
     this.state.phoneNumberInvalid
    ) {
      
      this.setState({ isValid: false})
    } else {
      this.props.updatePersonalDetail(this.state)
      this.setState({
        EditPersonalDetailModal: !this.state.EditPersonalDetailModal
      })
    }
  }
 

  closeImageUpload = () => {
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
    let modalTitle = 'Edit Personal Detials'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      return {label :  city.name ,value:city.id + '-' + city.name}
    })
    const genderDetail = this.props.genderList.map((gender, i) => {
      return {label :  gender.name ,value:gender.id + '-' + gender.name}
    })
    const affiliationDetail = this.props.affiliationList.map((affiliation, i) => {
      return {label :  affiliation.name ,value:affiliation.affiliationId + '-' + affiliation.name}
    })
   

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail, genderDetail,affiliationDetail)}
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
      <ScreenCover isLoading={this.props.isLoading}>
        {ProfileDetail}
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
          ModalBody={<span>Please insert a image less than 2 MB and should be in the format of JPEG,PNG, Gif)</span>}
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
              <span className={'AddressContentLabel'}>ZIP</span>
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
                PHONE_NUMBER_CONST + this.props.personalDetail.phoneNumber}
              </span>
            </div>
          </div>
        </div>
        <i
          name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE}
          className={'SPIconMedium SPIconEdit SPIconEditPersonalDetails'}
          onClick={this.togglePersonalDetails}
        />
      </div>
    )
  }
  getModalContent = (stateDetail, genderDetail,affiliationDetail) => {
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
                      firstName:e.target.value,
                      firstNameInvaild: false,
                      disabledSaveBtn: false
                    })
                  }}
          
                onBlur={(e)=>{
                  if(!checkTextNotStartWithNumber(e.target.value)){
                    this.setState({
                      firstNameInvaild:true
                    })
                  }

                }}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.firstNameInvaild && 'Please enter valid first name'}
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
                    lastName:e.target.value,
                    lastNameInvaild: false,
                    disabledSaveBtn: false
                  })
                }}
        
                onBlur={(e)=>{
                  if(!checkTextNotStartWithNumber(e.target.value)){
                    this.setState({
                      lastNameInvaild:true
                    })
                  }

                }}
              />
            
                <small className="text-danger d-block OnboardingAlert">
                {this.state.lastNameInvaild && 'Please enter valid last name'}
            </small>
            </div>
            <div className='col-md-6 mb-2'>
              <div className='form-group'>
                <label> Gender</label>
                <SelectBox
                  options={genderDetail}
                  simpleValue
                  placeholder='Select Gender'
                  onChange={value  => {
                    this.setState({
                      selectedGender: value,
                      disabledSaveBtn: false 
                    })
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
                    getLength(e.target.value) <= 3 && (e.target.value)<=100
                  ) {
                    this.setState({ age: e.target.value,  disabledSaveBtn: false })
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
                    this.setState({ yearOfExperience: e.target.value, disabledSaveBtn: false })
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
                  this.setState({ isActive: e.target.checked, disabledSaveBtn: false })
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
              options={affiliationDetail}
              simpleValue
              placeholder='Select the Organization'
              onChange={value => {
                this.setState({ selectedAffiliation: value,disabledSaveBtn: false })
              }}
              selectedValue={this.state.selectedAffiliation}
              className={'inputFailure'}
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
                this.setState({ description: e.target.value,disabledSaveBtn: false })
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
            maxlength='6'
            textChange={e => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, '')
              if (onlyNums.length < 5) {
                this.setState({ hourlyRate: onlyNums })
              } else if (onlyNums.length === 5) {
                const number = onlyNums.replace(
                  /(\d{3})(\d{2})/,
                  '$1.$2'
                )
                this.setState({ hourlyRate: number,
                 disabledSaveBtn:false })
              }
            }
          }
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
                        this.setState({ selectedState: value,disabledSaveBtn: false })
                      }                      
                    }                      
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
                          city: e.target.value,
                          disabledSaveBtn: false
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
                              streetAddress: e.target.value,
                              disabledSaveBtn: false
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
                            this.setState({ zipCode: e.target.value ,disabledSaveBtn: false})
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
                    maxlength='10'
                    type='text'
                    value={this.state.phoneNumber}
                    className={"form-control custome-placeholder " + (this.state.phoneNumberInvalid && 'inputFailure')}

                    textChange={e =>{
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                      if (onlyNums.length < 10) {
                        this.setState({ phoneNumber: onlyNums })
                      } else if (onlyNums.length === 10) {
                        const number = onlyNums.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          '$1-$2-$3'
                        )
                        this.setState({ phoneNumber: number,
                          phoneNumberInvalid: false,
                          disabledSaveBtn:false })
                      }
                    }
                  }
                  onBlur={(e) => {
                    if (getLength(e.target.value) < 10 ) {
                        this.setState({phoneNumberInvalid: true});
                    }
                }}
                      />
                        <small className="text-danger d-block OnboardingAlert">
                        {this.state.phoneNumberInvalid && 'Please enter valid phone number'}
                    </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  togglePersonalDetails = (action, e) => {
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: !this.state.disabledSaveBtn
    })
    let old_data = {
      firstName: this.props.personalDetail.firstName,
      lastName: this.props.personalDetail.lastName,
      age: this.props.personalDetail.age,
      yearOfExperience: this.props.personalDetail.yearOfExperience,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
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
      phoneNumber: this.props.personalDetail.phoneNumber,
      firstNameInvaild:false,
      lastNameInvaild:false,
      phoneNumberInvalid:false
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    getAffiliationDetail:()=>dispatch(action.getAffiliationDetail()),
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
    affiliationList:state.profileState.PersonalDetailState.affiliationList,
    isLoading:state.loadingState.isLoading
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
)
