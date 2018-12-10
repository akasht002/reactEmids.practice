import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'react-image-crop-component/style.css'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-image-crop/lib/ReactCrop.scss'
import './index.css'
import {  
  ScreenCover
} from '../../../components'
import * as action from '../../../redux/patientProfile/actions'
import {
  getArrayLength
} from '../../../utils/validations'
import { Details } from './Details'
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
    this.props.getImage()
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
      assigned_by: nextProps.personalDetail.entity  && nextProps.personalDetail.entity.assignedBy,
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

  render () {
    
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
        
      </ScreenCover>
    )
  } 

  
}

function mapDispatchToProps (dispatch) {
  return {
    getPersonalDetail: () => dispatch(action.getESPPersonalDetail()),
    getImage: () => dispatch(action.getESPImage()),
  }
}

function mapStateToProps (state) {
  return {
    personalDetail: state.patientProfileState.espPatient,
    profileImgData: state.patientProfileState.espimageData,
    isLoading: state.loadingState.isLoading
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntityPersonalDetail)
)
