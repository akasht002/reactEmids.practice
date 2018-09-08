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
  ModalPopup,ScreenCover
} from '../../../components'
import BlackoutModal from '../../../components/LevelOne/BlackoutModal'
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  getArrayLength,
  getLength
} from '../../../utils/validations'

import { SETTING } from '../../../services/api'

class Organization extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,      
      isAlertModalOpen:false,
      ModalOrg:true,
      src: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }
    }
  }

  componentDidMount () {
    this.props.getPersonalDetail()
    this.props.getCityDetail()
    this.props.getImage()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      imageProfile: nextProps.profileImgData.image,
      organizationName: nextProps.personalDetail.organization,
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
      getLength(this.state.organizationName) === 0  ||
      getLength(this.state.phoneNumber) === 0
    ) {
      this.setState({ isValid: false })
    } else {
      this.props.updateOrganizationDetail(this.state)
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
    this.props.uploadImg(this.state.src)
  }

  onCroppeds = e => {
    let image = e.image
    this.setState({
      croppedImage: image
    })
  } 

  render () {
    let modalContent
    let modalTitle = 'Edit Organization Detials'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      city.label = city.name
      city.value = city.id+'-'+city.name
      return city
    }
  ) 

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail)}
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
          ModalBody={<span>Please insert a image less than 2 MB and should be in the format of JPEG,PNG, Gif)</span>}
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
    return (
      <div className='col-md-12 card CardWidget SPDetails'>
        <div className={'SPDetailsContainer SPdpWidget'}>
          <div className={'SPdpContainer'}>
            <svg viewBox='0 0 36 36' className='circular-chart'>
              <path
                className='circle'
                strokeDasharray={`${this.props.profilePercentage},100`}
                d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
              />
            </svg>

            <img alt="profile_image"
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
                  `${this.props.personalDetail.organizationName || ''} `}
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
                 
          <div className={'width100'}>
          {(this.props.personalDetail && this.props.personalDetail.description !=='')?this.props.personalDetail.description
          :<span className={'SPDescriptionNone'}  onClick={this.togglePersonalDetails.bind(this)}>Edit your profile here</span>}            
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
  getModalContent = (stateDetail) => {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h4 className='primaryColor text-left editProfileHeader'>
            Introduction
          </h4>
        </div>
        <div className='col-md-4 mb-2 editProfileImageContainer'>
          <div className='profileImage'>
            <img alt="profile_image"
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
            <div className='col-md-6 mb-2'>
              <Input
                name='organizationName'
                label='Organization Name'
                autoComplete='off'
                required='required'
                type='text'
                maxlength='100'
                value={this.state.organizationName}
                className={
                  'form-control ' +
                    (!this.state.isValid &&
                      !this.state.organizationName &&
                      'inputFailure')
                }
                textChange={e => {
                  this.setState({ organizationName: e.target.value })
                  if (!checkTextNotStartWithNumber(this.state.organizationName)) {
                    this.setState({
                      organizationNameInvaild: true,
                      disabledSaveBtn: true
                    })
                  } else {
                    this.setState({
                      organizationNameInvaild: false,
                      disabledSaveBtn: false
                    })
                  }
                }}
              />
              {!this.state.isValid &&
                !this.state.organizationName &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter  {this.state.organizationName === '' && ' First Name'}
                </span>}
              {this.state.organizationNameInvaild &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter vaild Organization name
                </span>}
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
              if  (e.target.value === '' || re.test(e.target.value)) {
                this.setState({ hourlyRate: e.target.value })
              }
            }}
            className='form-control'
          />
        </div>          
           
           
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
                        console.log(value);
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
        

  togglePersonalDetails (action, e) {
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: false
    })
    let old_data = {
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      organizationName: this.props.personalDetail.organizationName?this.props.personalDetail.organizationName:'',
      phoneNumber: this.props.personalDetail.phoneNumber
    }

    let updated_data = {
      organizationName: this.state.organizationName?this.state.organizationName:'',
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
      organizationName: this.props.personalDetail.organization,
      description: this.props.personalDetail.description,
      hourlyRate: this.props.personalDetail.hourlyRate,
      phoneNumber: this.props.personalDetail.phoneNumber
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    updateOrganizationDetail: data => dispatch(action.updateOrganizationDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail()),
    uploadImg: data => dispatch(action.uploadImg(data)),
    getImage: () => dispatch(action.getImage())
  }
}

function mapStateToProps (state) {
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
