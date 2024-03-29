import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Input,
  ProfileModalPopup,
  ModalPopup,
  SelectBox
} from '../../../components'
import { getCityDetail } from '../../../redux/profile/PersonalDetail/actions'
import * as action from '../../../redux/profile/serviceArea/action'
import { getLength } from '../../../utils/validations'
import { SCREENS, PERMISSIONS } from '../../../constants/constants';
import { authorizePermission } from '../../../utils/roleUtility';
import { Details } from './Details'
import './style.css';

export class ServiceArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceAreaModal: false,
      street: '',
      city: '',
      state_id: '',
      zip: '',
      addressId: 0,
      showModalOnDelete: false,
      isAdd: false,
      isValid: true,
      disabledSaveBtn: false,
      isDiscardModalOpen: false,
      coverageArea: 0,
      isChanged: false
    };
    this.countValue = 0;
  }

  componentDidMount() {
    this.props.getServiceArea()
    this.props.getCityDetail()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      street: nextProps.ServiceAreaFieldDetails.streetAddress,
      state_id: nextProps.ServiceAreaFieldDetails.stateId +
        '-' +
        nextProps.ServiceAreaFieldDetails.stateName,
      city: nextProps.ServiceAreaFieldDetails.city,
      coverageArea: nextProps.ServiceAreaFieldDetails.coverageArea ? nextProps.ServiceAreaFieldDetails.coverageArea : 0,
      zip: nextProps.ServiceAreaFieldDetails.zipCode,
      addressId: nextProps.ServiceAreaFieldDetails.addressId ?
        nextProps.ServiceAreaFieldDetails.addressId : 0,
      selectedState: {
        label: nextProps.ServiceAreaFieldDetails
          ? nextProps.ServiceAreaFieldDetails.stateName
          : '',
        value: nextProps.ServiceAreaFieldDetails
          ? nextProps.ServiceAreaFieldDetails.stateId + '-' + nextProps.ServiceAreaFieldDetails.stateName
          : ''
      },
    })
  }

  reset = () => {
    this.setState({
      isChanged: false,
      serviceAreaModal: false,
      street: '',
      state_id: '',
      city: '',
      zip: '',
      coverageArea: 0,
      addressId: 0,
      disabledSaveBtn: false,
      isDiscardModalOpen: false,
      streetInvalid: false,
      cityInvalid: false,
      state_idInvalid: false,
      stateInvalid: false,
      zipInvalid: false,
      isAdd: true,
      isValid: true,
      selectedState: {
        label: '',
        value: 0
      }
    })
  }

  toggleServiceArea = () => {
    let coverageArea = this.state.coverageArea ? this.state.coverageArea : 0;
    this.setState({
      serviceAreaModal: !this.state.serviceAreaModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: false,
      coverageArea: coverageArea,
    })
    this.onClose()
    if (!this.state.isChanged) {
      this.setState({
        serviceAreaModal: false, isDiscardModalOpen: false
      });
    } else {
      this.setState({
        isDiscardModalOpen: true, serviceAreaModal: true
      });
    }
  }

  onClose = () => {
    if (
      getLength(this.state.street) > 0 ||
      getLength(this.state.city) > 0 ||
      getLength(this.state.state_id) > 0 ||
      getLength(this.state.zip) > 0
    )
      this.setState({ isDiscardModalOpen: true, serviceAreaModal: true })
    else
      this.reset()
  }
  addServiceArea = () => {
    if (
      this.state.street === '' ||
      this.state.city === '' ||
      this.state.selectedState.value === '' ||
      this.state.zip === ''|| this.state.zipInvalid)
      this.setState({
        isValid: false
      })
    else {
      this.props.addServiceArea(this.state)
      this.reset()
    }
  }

  showModalOnDelete = e => {
    this.setState({
      showModalOnDelete: !this.state.showModalOnDelete,
      addressId: e.target.id
    })
  }

  editServiceArea = e => {
    this.setState({
      serviceAreaModal: true,
      isAdd: false,
      addressId: e.target.id,
      disabledSaveBtn: true
    })
    this.props.editServiceArea(e.target.id)
  }

  updateServiceArea = () => {
    this.addServiceArea()
  }

  deletePointService = () => {
    this.props.deletePointService(this.state.addressId)
    this.setState({ showModalOnDelete: !this.state.showModalOnDelete })
  }

  textChangeValue = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 5) {
      this.setState({
        zip: onlyNums,
        zipInvalid: false,
        disabledSaveBtn: false,
        isChanged: true
      })
    }
    this.checkFieldsOnEdit(onlyNums)
  }

  rangeChangeValue = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 3) {
      this.setState({
        coverageArea: onlyNums,
        coverageAreaInvalid: false,
        disabledSaveBtn: false,
        isChanged: true
      })
    }
    this.checkFieldsOnEdit(onlyNums)
  }

  onClickHandleIncr = () => {
    if (this.state.coverageArea !== 0) {
      this.countValue = this.state.coverageArea;
    } else {
      this.countValue = 0;
    }
    if (this.countValue >= 0) {
      this.countValue = this.countValue + 1;
    }
    this.setState({
      coverageArea: this.countValue,
      disabledSaveBtn: false,
      isChanged: true
    });
  }

  onClickHandleDecr = () => {
    if (this.state.coverageArea !== 0) {
      this.countValue = this.state.coverageArea;
    } else {
      this.countValue = 0;
    }
    if (this.countValue > 0) {
      this.countValue = this.countValue - 1;
    }
    this.setState({
      coverageArea: this.countValue,
      disabledSaveBtn: false,
      isChanged: true
    });
  }

  checkLength = (value) => {
    return value && value.length > 0;
  }

  checkZipLength = (value) => {
    return value && value.length > 4;
  }

  checkFiledLengths = () => {
    const { city, selectedState, street, zip } = this.state
    let
      cityValidation = this.checkLength(city),
      state_idValidation = this.checkLength(selectedState),
      streetValidation = this.checkLength(street),
      zipValidation = this.checkZipLength(zip)
    return cityValidation && state_idValidation && streetValidation && zipValidation
  }

  checkFieldsOnEdit = (value) => {
    if (value === '') {
      this.setState({ disabledSaveBtn: true })
    }
    else {
      this.setState({ disabledSaveBtn: false })
    }
  }

  render() {
    authorizePermission(SCREENS.PROFILE);
    let modalContent
    let modalTitle
    const stateDetail = this.props.stateDetail &&
      this.props.stateDetail.map((city, i) => {
        return {
          label: city.name,
          value: city.id + '-' + city.name
        }
      })
    const serviceAreaModalContent = (
      <form className='form my-2 my-lg-0'>
        <div className='row'>
          <div className='col-md-12 mb-2'>
            <Input
              name='street'
              label='Street'
              autoComplete='off'
              type='text'
              placeholder='Enter Street Name'
              className={"form-control custome-placeholder " + (this.state.streetInvalid && 'inputFailure')}
              value={this.state.street}
              maxlength={'500'}
              textChange={e => {
                this.setState({
                  street: e.target.value,
                  streetInvalid: false,
                  isChanged: true
                })
                this.checkFieldsOnEdit(e.target.value)
              }}
              onBlur={(e) => {
                if (e.target.value === '') {
                  this.setState({
                    streetInvalid: true
                  })
                }
              }}
            />
            <small className="text-danger d-block OnboardingAlert">
              {this.state.streetInvalid && 'Please enter street'}
            </small>
          </div>
          <div className={'col-md-6 mb-2'}>
            <Input
              name='city'
              label='City'
              autoComplete='off'
              type='text'
              placeholder='Enter City Name'
              className={"form-control custome-placeholder " + (this.state.cityInvalid && 'inputFailure')}
              value={this.state.city}
              maxlength={'500'}
              textChange={e => {
                this.setState({
                  city: e.target.value,
                  cityInvalid: false,
                  isChanged: true
                })
                this.checkFieldsOnEdit(e.target.value)
              }}
              onBlur={(e) => {
                if (e.target.value === '') {
                  this.setState({
                    cityInvalid: true
                  })
                }
              }}
            />
            <small className="text-danger d-block OnboardingAlert">
              {this.state.cityInvalid && 'Please enter city'}
            </small>
          </div>
          <div className={'col-md-6 mb-2'}>
            <div className="form-group">
              <label className="m-0">State</label>
              <SelectBox
                className='ServiceRequestSelect'
                options={stateDetail}
                placeholder='Select the state'
                onChange={value => {
                  this.setState({
                    selectedState: value,
                    stateInvalid: false,
                    isChanged: true
                  })
                  this.checkFieldsOnEdit(value)
                }}
                selectedValue={this.state.selectedState}
                onBlur={(e) => {
                  if (this.state.selectedState.value === '') {
                    this.setState({
                      stateInvalid: true
                    })
                  }
                }}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.stateInvalid && 'Please enter state'}
              </small>
            </div>
          </div>
          <div className='col-md-6 mb-2'>
            <Input
              name='zip'
              label='Zip'
              className={"form-control custome-placeholder " + (this.state.zipInvalid && 'inputFailure')}
              autoComplete='off'
              type='text'
              placeholder='Enter Zip Code'
              value={this.state.zip}
              textChange={this.textChangeValue}
              onBlur={(e) => {
                if (getLength(e.target.value) < 5) {
                  this.setState({
                    zipInvalid: true
                  })
                }
              }}
            />
            <small className="text-danger d-block OnboardingAlert">
              {this.state.zipInvalid && 'Please enter zip code'}
            </small>
          </div>
          <div className='col-md-6 mb-2'>
            <Input
              name='range_miles'
              label='Range(in miles)'
              className={"form-control custome-placeholder " + (this.state.coverageAreaInvalid && 'inputFailure')}
              autoComplete='off'
              type='text'
              placeholder='Enter Coverage Area'
              value={this.state.coverageArea}
              textChange={this.rangeChangeValue}
              onBlur={(e) => {
                if (getLength(e.target.value) === 0) {
                  this.setState({
                    coverageAreaInvalid: true
                  })
                }
              }}
            />
            <small className="text-danger d-block OnboardingAlert">
              {this.state.coverageAreaInvalid && 'Please enter Coverage Area'}
            </small>
          </div>
          {/*
         
          <div className='col-md-6'>
            <div className="form-group">
              <label className="m-0">Range (in miles)</label>
              <div className='InputInDeWidget'>
              <span className='IncreDecreBTN minus'
                  onClick={this.onClickHandleDecr}>-</span>
                <input className="form-control" 
                  value={this.state.coverageArea} />
                <span className='IncreDecreBTN plus'
                  onClick={this.onClickHandleIncr}>+</span>
              </div>
            </div>
          </div> */}
        </div>
      </form>
    )
    const ServiceAreaList = <Details ServiceAreaList={this.props.ServiceAreaList}
      editServiceArea={this.editServiceArea} showModalOnDelete={this.showModalOnDelete} 
      isUser={this.props.isUser}
      />
    if (this.state.serviceAreaModal) {
      if (this.state.isAdd) {
        modalTitle = 'Add Service Area'
      } else {
        modalTitle = 'Edit Service Area'
      }
      modalContent = serviceAreaModalContent
    }
    return (
      <div className='col-md-12 card CardWidget SPCertificate'>
        <div className='SPCardTitle d-flex'>
          <h4 className='theme-primary'>Service Areas</h4>
          {this.props.isUser && <i
            name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}
            className='SPIconLarge SPIconAdd'
            onClick={() => {
              this.reset()
              this.setState({ serviceAreaModal: true, isAdd: true })
            }}
          />}
        </div>
        <div className='SPCertificateContainer width100'>
          <ul className='SPCertificateList theme-primary'>
            {this.props.ServiceAreaList.length > 0
              ? <div>
                {ServiceAreaList}
              </div>
              : this.props.isUser && <div>
                <div className='SPNoInfo'>
                  <div className='SPNoInfoContent'>
                    <div className='SPInfoContentImage' />
                    <span className='SPNoInfoDesc'>
                      Click
                      {' '}
                      <i
                        className='SPIconMedium SPIconAddGrayScale'
                        onClick={() =>
                          this.setState({
                            serviceAreaModal: true,
                            isAdd: true
                          })}
                      />
                      {' '}
                      to add Service Area
                    </span>
                  </div>
                </div>
              </div>}
          </ul>
        </div>

        <ProfileModalPopup
          isOpen={this.state.serviceAreaModal}
          toggle={this.toggleServiceArea}
          ModalBody={modalContent}
          className='modal-lg asyncModal serviceAreaModal'
          modalTitle={modalTitle}
          disabled={this.state.isAdd ? !this.checkFiledLengths() : this.state.disabledSaveBtn}
          centered
          onClick={
            this.state.isAdd ? this.addServiceArea : this.updateServiceArea
          }
        />
        <ModalPopup
          isOpen={this.state.isDiscardModalOpen}
          toggle={this.reset}
          ModalBody={<span>Do you want to discard the changes?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          centered
          onConfirm={() => this.reset()}
          onCancel={() =>
            this.setState({
              isDiscardModalOpen: false
            })}
        />

        <ModalPopup
          isOpen={this.state.showModalOnDelete}
          ModalBody={
            <span>Do you really want to remove this Service Area?</span>
          }
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          centered
          onConfirm={() => this.deletePointService()}
          onCancel={() =>
            this.setState({
              showModalOnDelete: !this.state.showModalOnDelete
            })}
        />

        <ModalPopup
          isOpen={this.props.showModalOnPOS}
          ModalBody={<span>{this.props.posInvalidAddressErrorMessage}</span>}
          btn1='Ok'
          className='modal-sm'
          headerFooter='d-none'
          footer='d-none'
          centered
          onConfirm={() => this.props.clearPOSErrorMessage()}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceArea: () => dispatch(action.getServiceArea()),
    addServiceArea: data => dispatch(action.addServiceArea(data)),
    editServiceArea: data => dispatch(action.editServiceArea(data)),
    updateServiceArea: data => dispatch(action.updateServiceArea(data)),
    deletePointService: data => dispatch(action.deletePointService(data)),
    getCityDetail: () => dispatch(getCityDetail()),
    clearPOSErrorMessage: () => dispatch(action.clearPOSErrorMessage()),
  }
}

function mapStateToProps(state) {
  return {
    ServiceAreaList: state.profileState.ServiceAreaState.ServiceAreaList,
    stateDetail: state.profileState.PersonalDetailState.cityDetail,
    addServiceAreaSuccess: state.profileState.ServiceAreaState
      .addServiceAreaSuccess,
    ServiceAreaFieldDetails: state.profileState.ServiceAreaState
      .ServiceAreaFieldDetails,
    isUser: state.profileState.PersonalDetailState.isUser,
    posInvalidAddressErrorMessage:
    state.profileState.ServiceAreaState.posInvalidAddressErrorMessage,
    showModalOnPOS: state.profileState.ServiceAreaState.showModalOnPOS
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceArea)
)
