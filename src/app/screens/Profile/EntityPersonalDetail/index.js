import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
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
  ScreenCover
} from '../../../components'
import BlackoutModal from '../../../components/LevelOne/BlackoutModal'
import * as action from '../../../redux/profile/PersonalDetail/actions'
import {
  checkTextNotStartWithNumber,
  getArrayLength,
  getLength
} from '../../../utils/validations'
import { Details, ProfileImageDetail } from './Details'
import { SETTING } from '../../../services/api'

class EntityPersonalDetail extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      useEllipsis: true,
      EducationModal: false,
      isDiscardModalOpen: false,
      isAlertModalOpen: false,
      isValidPhoneNumber: true,
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

  componentDidMount () {
    this.props.getPersonalDetail()
    this.props.getCityDetail()
    this.props.getImage()
    this.props.getGender()
  }

  componentWillReceiveProps (nextProps) {
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
      url:nextProps.personalDetail.entity  && nextProps.personalDetail.entity.websiteUrl,
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
          : '' + '-' + getArrayLength(nextProps.personalDetail.address) > 0 &&
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
    if (
      getLength(this.state.firstName) === 0 ||
      getLength(this.state.lastName) === 0 ||
      getLength(this.state.phoneNumber) < 10
    ) {
      this.setState({ isValid: false })
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
    console.log(e.image)
    this.setState({
      croppedImage: image
    })
  }

  render () {
    let modalContent
    let modalTitle = 'Edit Personal Detials'
    let modalType = ''
    const cityDetail = this.props.cityDetail.map((city, i) => {
      return { label: city.name, value: city.id + '-' + city.name }
    })
    const genderDetail = this.props.genderList.map((gender, i) => {
      return { label: gender.name, value: gender.id + '-' + gender.name }
    })

    const EducationModalContent = (
      <form className='form my-2 my-lg-0' onSubmit={this.onSubmit}>
        {this.getModalContent(cityDetail, genderDetail)}
        <BlackoutModal
          isOpen={this.state.uploadImage}
          toggle={this.closeImageUpload}
          ModalBody={
            <ProfileImageDetail
              uploadedImageFile={this.state.uploadedImageFile}
              watch={this.watch}
              onCroppeds={this.onCroppeds}
              reUpload={this.reUpload}
            />
          }
          className='modal-lg asyncModal BlackoutModal'
          modalTitle='Edit Profile Image'
          centered='centered'
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
              alt='NO'
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
                {this.state.firstNameInvaild && 'Please enter valid first Name'}
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
                <label> Gender</label>
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
                    this.setState({
                      yearOfExperience: e.target.value,
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
            maxlength='2'
            value={this.state.url}
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
          <TextArea
            name='Description'
            placeholder='I am a 34 year enthusiast who is ready to serve the people in need. I have a total of 7 years of experience in providing home care to the patients. I also help in transportation, generally on the weekends. I hope I will be a great help to you.'
            className='form-control'
            rows='5'
            value={this.state.description}
            maxlength={'500'}
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
                        this.setState({
                          selectedState: value,
                          disabledSaveBtn: false
                        })
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
                            this.setState({
                              zipCode: e.target.value,
                              disabledSaveBtn: false
                            })
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
                      Please enter vaild last name
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
      phoneNumber: this.props.personalDetail.phoneNumber
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getPersonalDetail()),
    updatePersonalDetail: data => dispatch(action.updatePersonalDetail(data)),
    getCityDetail: () => dispatch(action.getCityDetail()),
    uploadImg: data => dispatch(action.uploadImg(data)),
    getImage: () => dispatch(action.getImage()),
    getGender: () => dispatch(action.getGender())
  }
}

function mapStateToProps (state) {
  return {
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    updatePersonalDetailSuccess: state.profileState.PersonalDetailState
      .updatePersonalDetailSuccess,
    cityDetail: state.profileState.PersonalDetailState.cityDetail,
    profileImgData: state.profileState.PersonalDetailState.imageData,
    genderList: state.profileState.PersonalDetailState.genderList,
    isLoading: state.loadingState.isLoading
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntityPersonalDetail)
)
