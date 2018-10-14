import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Input,
  ProfileModalPopup,
  ModalPopup,
  SelectBox
} from '../../../components'
import { compare } from '../../../utils/comparerUtility'
import { getCityDetail } from '../../../redux/profile/PersonalDetail/actions'
import * as action from '../../../redux/profile/serviceArea/action'
import { getLength } from '../../../utils/validations'
import { SCREENS, PERMISSIONS } from '../../../constants/constants';
import { authorizePermission } from '../../../utils/roleUtility';
import {Details} from './Details'
import './style.css'

class ServiceArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceAreaModal: false,
      addressType: '',
      street: '',
      city: '',
      state_id: '',
      zip: '',
      serviceAreaId: 0,
      showModalOnDelete: false,
      isAdd: false,
      isValid: true,
      disabledSaveBtn: true,
      isDiscardModalOpen: false,
      isPrimaryAddress: false,
    }
  }

  componentDidMount() {
    this.props.getServiceArea()
    this.props.getCityDetail()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      //addressType: nextProps.PointServiceFieldDetails.addressTypeId,
      street: nextProps.ServiceAreaFieldDetails.streetAddress,
      state_id: nextProps.ServiceAreaFieldDetails.stateId +
        '-' +
        nextProps.ServiceAreaFieldDetails.stateName,
      city: nextProps.ServiceAreaFieldDetails.city,
      zip: nextProps.ServiceAreaFieldDetails.zipCode,
      serviceAreaId: nextProps.ServiceAreaFieldDetails.addressId
    })
  }

  reset = () => {
    this.setState({
      serviceAreaModal: false,
      addressType: '',
      street: '',
      state_id: '',
      city: '',
      zip: '',
      serviceAreaId: '',
      disabledSaveBtn: true,
      isDiscardModalOpen: false,
      addressTypeInvalid: false,
      streetInvalid: false,
      cityInvalid: false,
      state_idInvalid: false,
      zipInvalid: false,
      isAdd: true,
      isValid: true
    })
  }

  toggleServiceArea = () => {
    this.setState({
      serviceAreaModal: !this.state.serviceAreaModal,
      isDiscardModalOpen: false,
      isValid: true,
      disabledSaveBtn: true
    })
    this.onClose()
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
      this.state.state_id === '' ||
      this.state.zip === '' ) 
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
      addressTypeId: e.target.id
    })
  }

  editServiceArea = e => {
    this.setState({
      serviceAreaModal: true,
      isAdd: false,
      addressTypeId: e.target.id

    })
    this.props.editServiceArea(e.target.id)
  }

  updateServiceArea = () => {
    this.addServiceArea()
  }

  deletePointService = () => {
    this.props.deletePointService(this.state.addressTypeId)
    this.setState({ showModalOnDelete: !this.state.showModalOnDelete })
  }

  textChangeValue = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 5) {
      this.setState({
        zip: onlyNums,
        zipInvalid: false,

      })
    }
  }
  HandleIncreDecre(IncDec) {
    let IncreDecre = this.state.IncreDecreVal;
    if (IncDec === 'I') { IncreDecre++ } else if (IncDec === 'D') { IncreDecre-- }
    if (IncreDecre < this.state.LowRange) { IncreDecre = this.state.LowRange }
    else if (IncreDecre > this.state.HighRange) { IncreDecre = this.state.HighRange }
    this.setState({ IncreDecreVal: IncreDecre });
  }

  checkLength = (value) => {
    return value && value.length > 0
  }

  checkFiledLengths = () => {
    const { city, state_id, street, zip } = this.state
    let
      cityValidation = this.checkLength(city),
      state_idValidation = this.checkLength(state_id),
      streetValidation = this.checkLength(street),
      zipValidation = this.checkLength(zip)

    return cityValidation && state_idValidation && streetValidation && zipValidation
  }

  render() {
    console.log(this.props.ServiceAreaList)
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
              placeholder=''
              className={"form-control custome-placeholder " + (this.state.streetInvalid && 'inputFailure')}

              value={this.state.street}
              maxlength={'500'}
              textChange={e =>
                this.setState({
                  street: e.target.value,
                  streetInvalid: false


                })}
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
              placeholder=''
              className={"form-control custome-placeholder " + (this.state.cityInvalid && 'inputFailure')}

              value={this.state.city}
              maxlength={'500'}
              textChange={e =>
                this.setState({
                  city: e.target.value,
                  cityInvalid: false


                })}
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
                    state_id: value,
                    stateInvalid: false

                  })
                }}
                selectedValue={this.state.state_id}

                onBlur={(e) => {
                  if (e.target.value === '') {
                    this.setState({
                      state_idInvalid: true
                    })
                  }
                }}
              />
              <small className="text-danger d-block OnboardingAlert">
                {this.state.state_idInvalid && 'Please enter state'}
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
              placeholder=''

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

          <div className='col-md-6'>
            <div className="form-group">
              <label className="m-0">Range (in miles)</label>
              <div className='InputInDeWidget'>
                <span className='IncreDecreBTN'
                  onClick={this.HandleIncreDecre.bind(this, 'D')}>-</span>
                <input className="form-control" placeholder='4'
                  value={this.state.IncreDecreVal} />
                <span className='IncreDecreBTN'
                  onClick={this.HandleIncreDecre.bind(this, 'I')}>+</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    )

    const ServiceAreaList = <Details ServiceAreaList={this.props.ServiceAreaList}
    editServiceArea={this.editServiceArea} showModalOnDelete={this.showModalOnDelete}/>
    
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
          <h4 className='primaryColor'>Service Area</h4>
          <i
            name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}
            className='SPIconLarge SPIconAdd'
            onClick={() =>
              this.setState({ serviceAreaModal: true, isAdd: true })}
          />
        </div>
        <div className='SPCertificateContainer width100'>
          <ul className='SPCertificateList'>
            {this.props.ServiceAreaList.length > 0
              ? <div>
                {ServiceAreaList}
              </div>
              : <div className='SPNoInfo'>
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
              </div>}
          </ul>
        </div>

        <ProfileModalPopup
          isOpen={this.state.serviceAreaModal}
          toggle={this.toggleServiceArea}
          ModalBody={modalContent}
          className='modal-lg asyncModal serviceAreaModal'
          modalTitle={modalTitle}
          disabled={!this.checkFiledLengths()}
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
            <span>Do you really want to remove this Service Area detail ?</span>
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
    getCityDetail: () => dispatch(getCityDetail())
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
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceArea)
)
