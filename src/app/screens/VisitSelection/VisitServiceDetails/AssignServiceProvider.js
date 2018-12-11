import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserInfo } from '../../../utils/userUtility'
import { setESP } from "../../../redux/patientProfile/actions";
import {  ModalPopup,Input } from '../../../components'
import {    
    getEntityServiceProviderList,
    updateEntityServiceVisit
  } from "../../../redux/dashboard/Dashboard/actions";
  import {
    getVisitServiceDetails,
    getVisitServiceSchedule
  } from '../../../redux/visitSelection/VisitServiceDetails/actions'
  import { Path } from "../../../routes";
import { push } from "../../../redux/navigation/actions";

class AssignServiceProvider extends Component {
  constructor (props) {
    super(props);
    this.state = {
        EditPersonalDetailModal: false,
        selectedServiceProviderId: "",
    }
    this.data = ""
  }

  componentDidMount() {
    this.props.getEntityServiceProviderList();
  }

  getModalContent = (serviceProviderList) => {
    return (
    <form className="assign-serviceproblock">
      <Input
          id='participantsSearch'
          autoComplete='false'
          required='required'
          type='text'
          placeholder='search'
          className='form-control searchParticipants'
      />
      <div className="participantsSearchList">
              {serviceProviderList.map((item, index) => {
      // let catNum = index + 1;
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
                src={require('../../../assets/images/Blank_Profile_icon.png')}
                />
            </div>
            <label htmlFor={item.serviceProviderId}>
              {item.firstName + " " + item.lastName}
            </label>
          </div>
        </fieldset>)  })}
       </div>
      </form>
              )
  }

  handleserviceType = (item, e) => {
    if (e.target.checked) {
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
    let model = {
      serviceRequestId: this.data.serviceRequestId,
      serviceRequestVisitId: this.data.serviceRequestVisitid,
      entityId: getUserInfo().entityId,
      patientId: this.data.patientId,
      visitAssignment: [
        {
          serviceProviderId: this.state.selectedServiceProviderId
        }
      ]
    };   
    this.props.updateEntityServiceVisit(model);
    this.props.getVisitServiceSchedule(this.data.serviceRequestId);
  }

  goToESPProfile = (data) => {
    this.props.setESP(data);
    this.props.goToESPProfile();
  }

  render () {
      console.log(this.props.sp)
    let modalTitle = "Assign Service Provider";
    let modalType = "";
    let modalContent = this.getModalContent(this.props.serviceProviderList)    
    return (
      <div className='EntityUServiceProf'>
        {this.props.sp.entityServiceProviderId === getUserInfo().serviceProviderId ? (
          <span>
            <i
              className='assignSPLink'
              onClick={e => {
                this.togglePersonalDetails({
                  serviceRequestId: this.props.sp.serviceRequestId,
                  serviceRequestVisitid: this.props.sp.serviceRequestVisitId,
                  patientId: this.data.patient?this.data.patient.patientId:0,
                  visitDate: this.props.sp.visitDate
                })
              }}
            >
              Assign Service Provider
            </i>
          </span>
        ) : (
          <Fragment>
            <div
              className='ProfileCardImageContainer'
              onClick={() => {
                this.goToESPProfile(this.props.sp.entityServiceProviderImage)
              }}
            >
              <img
                alt={'NO_IMAGE'}
                key={'SP_IMAGE'}
                className='avatarImage avatarImageBorder'
                src={
                  this.props.sp.entityServiceProviderImage
                    ? this.props.sp.entityServiceProviderImage
                    : require('../../../assets/images/Blank_Profile_icon.png')
                }
              />
            </div>
            <div
              className='ProfileCardNameContainer'
              onClick={() => {
                this.goToESPProfile(this.props.sp.entityServiceProviderImage)
              }}
            >
              <span>
                {this.props.sp.entityServiceProviderFirstName &&
                  this.props.sp.entityServiceProviderFirstName + ' '}{' '}
                {this.props.sp.entityServiceProviderLastName &&
                  this.props.sp.entityServiceProviderLastName}
              </span>
            </div>
          </Fragment>
        )}

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
          btn2='Cancel'
          onConfirm={this.onSubmit}
          onCancel={() =>{
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

function mapDispatchToProps (dispatch) {
  return {
    getEntityServiceProviderList: () =>dispatch(getEntityServiceProviderList()),
    updateEntityServiceVisit: data => dispatch(updateEntityServiceVisit(data)),
    setESP:data=>dispatch(setESP(data)),
    goToESPProfile:()=>dispatch(push(Path.ESPProfile)),
    getVisitServiceSchedule: data => dispatch(getVisitServiceSchedule(data)),
  }
}

function mapStateToProps (state) {
  return {
    serviceProviderList:state.dashboardState.dashboardState.serviceProviderList,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AssignServiceProvider)
)
