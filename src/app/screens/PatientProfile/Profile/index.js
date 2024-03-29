import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PersonalDetail from '../PersonalDetail'
import PointService from '../PointService'
import Languages from '../Languages'
import ClinicalCondition from '../ClinicalCondition'
import { ScreenCover, Header, ModalPopup, Preloader } from '../../../components';
import {clearInvitaion, joinVideoConference} from '../../../redux/telehealth/actions';
import {goBack, push} from '../../../redux/navigation/actions';
import Help from '../../../assets/HelpDoc/Help.pdf';
import CoreoInformation from '../CoreoInformation'
import './styles.css'
import { Path } from '../../../routes';
import {clearState} from '../../../redux/patientProfile/actions';
import { USERTYPES} from '../../../constants/constants';
import EmergencyAttorneyContact from '../EmergencyAttorneyContact';
import MyConnections from '../MyConnections';

export class Profile extends Component {

  componentDidMount() {
    if (!this.props.patientId) { 
      this.props.goToDashboard();
    }
  }

  navigateProfileHeader = (link) => {
    switch (link) {
        case 'contact':
            this.helpDocEl.click();
            break;
        default: 
            this.setState({selectedLink: link})
            break;
    };
  };

  render() {
    return (
      <ScreenCover isLoading={this.props.isLoading}>
        <div className='container-fluid p-0'>
          <Header
           onClick = {(link) => this.navigateProfileHeader(link)}
           menuArray={['contact']}
          />
          <a ref={(el) => {this.helpDocEl = el}} href = {Help} target = "_blank"></a>
          <div className='width100 mainWidgetProfile mainWidgetOverflow'>
            {this.props.isLoading && <Preloader/>}
            <div className='width100 topWidgetBG theme-primary-gradient' />
            <div className='container mainProfileContent bgWhite'>
              <div className='row d-flex justify-content-center m-auto'>
                <div className='col-md-12'>
                  <h4 className='my-3 text-white SPTitleText'>
                    <span onClick={() => {
                      this.props.goBack()
                      this.props.clearState()
                    }}> <i className='Icon icon-back' /> </span>
                    Profile
                  </h4>
                </div>
                { (this.props.userType === USERTYPES.GUARDIAN || this.props.userType === USERTYPES.PATIENT_AND_GUARDIAN) ? 
                <PersonalDetail /> : <div>
                  <PersonalDetail />
                  <CoreoInformation />
                  <ClinicalCondition />
                  <PointService />
                  <Languages />
                </div>}
                {
                  (this.props.personalDetail && (this.props.personalDetail.userType === USERTYPES.PATIENT)) &&
                  <MyConnections />
                }
                <EmergencyAttorneyContact />
              </div>
            </div>
          </div>
        </div>
        <ModalPopup
            isOpen={this.props.showTelehealthInvite}
            ModalBody={<span>You have a new video conference invite.</span>}
            btn1="Accept"
            btn2="Decline"
            className="zh"
            headerFooter="d-none"
            centered={true}
            onConfirm={this.props.joinVideoConference}
            onCancel={this.props.clearInvitaion}
        />
      </ScreenCover>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    clearInvitaion: () => dispatch(clearInvitaion()),
    joinVideoConference: () => dispatch(joinVideoConference()),
    goBack: () => dispatch(goBack()),
    goToDashboard: () => dispatch(push(Path.dashboard)),
    clearState: () => dispatch(clearState())
  }
};

export function mapStateToProps(state) {
  return {
    showTelehealthInvite: state.telehealthState.isInvitationCame,
    patientId: state.patientProfileState.patientId,
    isLoading: state.loadingState.isLoading,
    userType: state.patientProfileState.userType,
    personalDetail: state.patientProfileState.personalDetail
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
