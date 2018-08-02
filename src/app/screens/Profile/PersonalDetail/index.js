import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactCrop from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'
import 'react-image-crop/lib/ReactCrop.scss'

import {
  Input,
  TextArea,
  SelectBox,
  ProfileModalPopup,
  ModalPopup
} from '../../../components'
import BlackoutModal from '../../../components/LevelOne/BlackoutModal'
import * as action from '../../../redux/profile/PersonalDetail/actions'
import { checkLengthRemoveSpace } from '../../../utils/validations'

class PersonalDetail extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
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
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      firstName: nextProps.personalDetail.firstName,
      lastName: nextProps.personalDetail.lastName,
      age: nextProps.personalDetail.age,
      genderName: nextProps.personalDetail.genderName,
      organization: nextProps.personalDetail.organization,
      yearOfExperience: nextProps.personalDetail.yearOfExperience,
      description: nextProps.personalDetail.description,
      hourlyRate: nextProps.personalDetail.hourlyRate,
      city: nextProps.personalDetail.address &&
        nextProps.personalDetail.address[0].city,
      streetAddress: nextProps.personalDetail.address &&
        nextProps.personalDetail.address[0].streetAddress,
      zipCode: nextProps.personalDetail.address &&
        nextProps.personalDetail.address[0].zipCode,
      phoneNumber: nextProps.personalDetail.address &&
        nextProps.personalDetail.phoneNumber,
      state_id: nextProps.personalDetail.address &&
        nextProps.personalDetail.address[0].state.id
    })
  }

  togglePersonalDetails (action, e) {
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal,
      isValid: true,
      disabledSaveBtn: false
    })
  }

  handleChange = e => {
    this.setState({
      uploadedImageFile: URL.createObjectURL(e.target.files[0]),
      uploadImage: !this.state.uploadImage
    })
  }

  reUpload = e => {
    this.setState({
      uploadedImageFile: URL.createObjectURL(e.target.files[0])
    })
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

  onImageLoaded = image => {
    console.log('onCropComplete', image)
  }

  onCropComplete = crop => {
    console.log('onCropComplete', crop)
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onSubmit = () => {
    if (
      checkLengthRemoveSpace(this.state.firstName) === 0 ||
      checkLengthRemoveSpace(this.state.lastName) === 0 ||
      checkLengthRemoveSpace(this.state.phoneNumber) === 0
    ) {
      this.setState({ isValid: false })
      this.setState({
        EditPersonalDetailModal: !this.state.EditPersonalDetailModal
      })
      this.props.updatePersonalDetail(this.state)
    }
  }

  street = this.props.personalDetail.map((person, i) => (
    <span key={i}>{person}</span>
  ))

  render () {
    let modalContent
    let modalTitle = 'Edit Personal Detials'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      city.label = city.name
      city.value = city.id
      return city
    })

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail)}
        <BlackoutModal
          isOpen={this.state.uploadImage}
          toggle={this.CloseImageUpload}
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
      </React.Fragment>
    )
  }

  getBlackModalContent = () => {
    return (
      <div className={'UploadProfileImageWidget'}>
        <div className={'width100 UploadProfileImageContainer'}>
          <ReactCrop
            src={this.state.uploadedImageFile}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
          {/* <img className={'UploadedImage'} src={this.state.uploadedImageFile} /> */}
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

  getModalContent = stateDetail => {
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
              alt='profile-image'
              className={'SPdpImage'}
              src='http://lorempixel.com/1500/600/abstract/1'
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
                value={this.state.firstName}
                className={
                  'form-control ' +
                    (!this.state.isValid &&
                      !this.state.firstName &&
                      'inputFailure')
                }
                textChange={e =>
                  this.setState({
                    firstName: e.target.value
                  })}
              />
              {!this.state.isValid &&
                !this.state.firstName &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter {this.state.firstName === '' && ' First Name'}
                </span>}
            </div>
            <div className='col-md-6 mb-2'>
              <Input
                name='LastName'
                label='Last Name'
                autoComplete='off'
                required='required'
                type='text'
                value={this.state.lastName}
                className={
                  'form-control ' +
                    (!this.state.isValid &&
                      !this.state.lastName &&
                      'inputFailure')
                }
                textChange={e =>
                  this.setState({
                    lastName: e.target.value
                  })}
              />
              {!this.state.isValid &&
                !this.state.lastName &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                  Please enter {this.state.lastName === '' && ' Last Name'}
                </span>}

            </div>
            <div className='col-md-6 mb-2'>
              <div className='form-group'>
                <label>Select Gender</label>
                <SelectBox
                  options={[
                    { label: 'Female', value: '1' },
                    { label: 'Male', value: '6' }
                  ]}
                  simpleValue
                  placeholder='Select Gender'
                  onChange={value => {
                    this.setState({ genderName: value })
                  }}
                  selectedValue={this.state.genderName === 'Male' ? 6 : 1}
                  className={'inputFailure'}
                />
              </div>
            </div>
            <div className='col-md-6 mb-2'>
              <Input
                name='Age'
                label='Age'
                autoComplete='off'
                required='required'
                type='number'
                maxLength='2'
                value={this.state.age}
                textChange={e =>
                  this.setState({
                    age: e.target.value,
                    disabledSaveBtn: false
                  })}
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
                value={this.state.yearOfExperience}
                textChange={e =>
                  this.setState({
                    yearOfExperience: e.target.value,
                    disabledSaveBtn: false
                  })}
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-2'>
          <div className='form-group'>
            <label>Affiliation</label>
            <label>Certified member of organization(s)</label>
            <SelectBox
              options={[
                {
                  label: 'AABB (formerly American Association of Blood Banks)',
                  value: '1'
                },
                {
                  label: 'Academy of International Business (AIB)',
                  value: '2'
                },
                { label: 'Academy of Management (AOM)', value: '3' },
                {
                  label: 'Association for the Advancement of Cost Engineering (AACE International)',
                  value: '4'
                },
                {
                  label: 'Association for Volunteer Administration (AVA)',
                  value: '5'
                },
                {
                  label: 'Association of Information Technology Professionals (AITP)',
                  value: '6'
                },
                {
                  label: 'Chartered Global Management Accountant (CGMA)',
                  value: '7'
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
            textChange={e =>
              this.setState({
                description: e.target.value
              })}
          />
        </div>
        <div className='col-md-4'>
          <Input
            name='hourlyRate'
            label='Hourly Rate ($/hr)'
            autoComplete='off'
            required='required'
            type='text'
            value={this.state.hourlyRate}
            textChange={e =>
              this.setState({
                hourlyRate: e.target.value
              })}
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
                        this.setState({ state_id: value })
                      }}
                      selectedValue={this.state.state_id}
                      className={'inputFailure'}
                    />
                  </div>
                </div>
                <div className='col-md-6 mb-2'>
                  <div className='form-group'>
                    <label>City</label>
                    <Input
                      name='city'
                      label='City'
                      autoComplete='off'
                      required='required'
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
                  <Input
                    name='Street'
                    label='Street'
                    autoComplete='off'
                    required='required'
                    type='text'
                    value={this.state.streetAddress}
                    textChange={e =>
                      this.setState({
                        streetAddress: e.target.value
                      })}
                    className='form-control'
                  />
                </div>
                <div className='col-md-6'>
                  <Input
                    name='Zip'
                    label='Zip'
                    autoComplete='off'
                    required='required'
                    type='number'
                    maxLength='8'
                    value={this.state.zipCode}
                    textChange={e =>
                      this.setState({
                        zipCode: e.target.value
                      })}
                    className='form-control'
                  />
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
                    required='required'
                    maxLength='10'
                    type='number'
                    value={this.state.phoneNumber}
                    className={
                      'form-control ' +
                        (!this.state.isValid &&
                          !this.state.phoneNumber &&
                          'inputFailure')
                    }
                    textChange={e =>
                      this.setState({
                        phoneNumber: e.target.value
                      })}
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
            {/* <img className={"SPdpImage"} src={imagePath("./avatar/user-5.jpg")}/> */}
            {/* <img alt="profile-image" className={"SPdpImage"} src="http://lorempixel.com/1500/600/abstract/1" /> */}
          </div>
          <span className={'SPRating'}>
            <i className={'Icon iconFilledStar'} />4.2
          </span>
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
                {' '}
                <bd>
                  {this.props.personalDetail &&
                    this.props.personalDetail.affiliationName}
                </bd>
              </span>
            </div>
          </div>
          <div className={'width100'}>
            {this.props.personalDetail && this.props.personalDetail.description}
            {this.state.useEllipsis
              ? <div>
                {/* <ResponsiveEllipsis
                                    text={text}
                                    maxLine='3'
                                    ellipsis='...'
                                    trimRight
                                    className="SPDesc"
                                /> */}
                <i
                  className={'readMore primaryColor'}
                    // onClick={this.onTextClick.bind(this)}
                  >
                  {' '}<small>read more</small>
                </i>
              </div>
              : <div className={'SPDesc'}>
                {text}
                {' '}
                <i
                  className={'readMore primaryColor'}
                  onClick={this.onTextClick.bind(this)}
                  >
                  <small>Show less</small>
                </i>
              </div>}
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
                {this.props.personalDetail && this.state.streetAddress}
              </span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>City</span>
              <span>{this.props.personalDetail && this.state.city}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>State</span>
              <span>{this.props.personalDetail && this.state.state}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>ZIP</span>
              <span>{this.props.personalDetail && this.state.zipCode}</span>
            </div>
          </div>
          <div className={'SPAddressContent'}>
            <div className={'width100 SPAddressTitle d-flex'}>
              <span className={'SPAddressText primaryColor'}>Phone</span>
            </div>
            <div className={'width100 d-flex'}>
              <span>{this.props.personalDetail && this.state.phoneNumber}</span>
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
}

function mapDispatchToProps (dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    updatePersonalDetail: data => dispatch(action.updatePersonalDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail())
  }
}

function mapStateToProps (state) {
  return {
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    updatePersonalDetailSuccess: state.profileState.PersonalDetailState
      .updatePersonalDetailSuccess,
    cityDetail: state.profileState.PersonalDetailState.cityDetail
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
)
