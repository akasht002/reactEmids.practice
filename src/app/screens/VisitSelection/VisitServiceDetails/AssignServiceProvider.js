import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setESP } from "../../../redux/patientProfile/actions";
import { ModalPopup, Input } from '../../../components'
import { getEntityServiceProviderListSearch } from "../../../redux/dashboard/Dashboard/actions";
import { Path } from "../../../routes";
import { push } from "../../../redux/navigation/actions";
import { SERVICE_REQ_STATUS } from '../../../constants/constants'
import _ from 'lodash'

class AssignServiceProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditPersonalDetailModal: false,
      selectedServiceProviderId: "",
    }
    this.selectedServiceProviderId = ""
    this.data = ""
  }

  onchangeSearchServiceProvider = e => {
    this.props.getEntityServiceProviderListSearch(e.target.value)
  }

  getModalContent = (serviceProviderList) => {
    return (
      <form className="assign-serviceproblock">
        <Input
          id='participantsSearch'
          autoComplete='false'
          required='required'
          type='text'
          placeholder='Enter keyword to Search'
          className='form-control searchParticipants'
          textChange={(e) => {
            this.onchangeSearchServiceProvider(e)
          }}
        />
        <div className="participantsSearchList">
          {serviceProviderList.map((item, index) => {
            return (
              <fieldset>
                <div className="CheckboxSet" key={item.id}>
                  <input
                    className="ServiceCheckbox"
                    name={"ServiceStatus"}
                    id={item.serviceProviderId}
                    type="radio"
                    value={item.serviceProviderId}
                    onChange={e => this.handleserviceType(item, e)}
                  />
                  <div className={"avatarContainer"}>
                    <img
                      alt={'NO_IMAGE'}
                      key={index}
                      className='avatarImage avatarImageBorder'
                      src={item.thumbnail ? item.thumbnail : require('../../../assets/images/Blank_Profile_icon.png')}
                    />
                  </div>
                  <label htmlFor={item.serviceProviderId}>
                    {item.firstName + " " + item.lastName}
                  </label>
                </div>
              </fieldset>)
          })}
        </div>
      </form>
    )
  }

  handleserviceType = (item, e) => {
    if (e.target.checked) {
      this.selectedServiceProviderId = item.serviceProviderId
      this.setState({ selectedServiceProviderId: item.serviceProviderId });
    }
  };

  togglePersonalDetails = (action, e) => {
    this.data = action;
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal
    });
  };

  onSubmit = () => {
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal
    });
    let data = {
      servicePlanVisitId: this.props.getServicePlanVisitId,
      assignedServiceProviderId: this.selectedServiceProviderId
    }
    this.props.onSubmit(data);
    this.selectedServiceProviderId = ''
  }

  goToESPProfile = (data) => {
    this.props.setESP(data);
    this.props.goToESPProfile();
  }

  isStatusInArray = data => {
    let statusArray = [SERVICE_REQ_STATUS.HIRED]
    if (_.indexOf(statusArray, data) !== -1) return true
    return false
  }

  render() {
    let modalTitle = "Assign Service Provider";
    let modalType = "";
    let modalContent = this.getModalContent(this.props.entityServiceProvidersList)
    return (
      <div className='EntityUServiceProf'>
        {
          this.props.visitList.assignedServiceProviderId ?
            <Fragment>
              <div
                className='ProfileCardImageContainer'
                onClick={() => {
                  this.goToESPProfile(this.props.visitList.assignedServiceProviderId)
                }}
              >
                <img
                  alt={'NO_IMAGE'}
                  key={'SP_IMAGE'}
                  className='avatarImage avatarImageBorder'
                  src={
                    this.props.visitList.assignedServiceProviderImage
                      ? this.props.visitList.assignedServiceProviderImage
                      : require('../../../assets/images/Blank_Profile_icon.png')
                  }
                />
              </div>
              <div
                className='ProfileCardNameContainer'
                onClick={() => {
                  this.goToESPProfile(this.props.visitList.assignedServiceProviderId)
                }}
              >
                <span>
                  {this.props.visitList.assignedServiceProviderFirstName &&
                    this.props.visitList.assignedServiceProviderFirstName + ' '}{' '}
                  {this.props.visitList.assignedServiceProviderLastName &&
                    this.props.visitList.assignedServiceProviderLastName}
                </span>
              </div>
            </Fragment>
            :
            <span className="SP-viewplantable theme-primary"  onClick={this.togglePersonalDetails}>
              <img alt="" src={require('../../../assets/images/Blank_Profile_icon.png')}></img>
              <span><a>Assign Provider</a></span>
            </span>
        }
        <ModalPopup
          isOpen={this.state.EditPersonalDetailModal}
          toggle={() => this.togglePersonalDetails(this, modalType)}
          ModalBody={modalContent}
          className="modal-lg asyncModal CertificationModal"
          modalTitle={modalTitle}
          showHeader={true}
          centered="centered"
          headerFooter='d-none'
          btn1='Assign'
          btn1Disable={!this.state.selectedServiceProviderId}
          btn2='Cancel'
          onConfirm={this.onSubmit}
          onCancel={() => {
            this.setState({
              EditPersonalDetailModal: false
            })
          }
          }
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setESP: data => dispatch(setESP(data)),
    goToESPProfile: () => dispatch(push(Path.ESPProfile)),
    getEntityServiceProviderListSearch: (data) => dispatch(getEntityServiceProviderListSearch(data)),
  }
}

function mapStateToProps(state) {
  return {
    serviceProviderList: state.dashboardState.dashboardState.serviceProviderList,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AssignServiceProvider)
)
