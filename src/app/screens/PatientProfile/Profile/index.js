import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PersonalDetail from '../PersonalDetail'
import PointService from '../PointService'
import Languages from '../Languages'
import ClinicalCondition from '../ClinicalCondition'
import { ScreenCover, Header, ModalPopup } from '../../../components';
import MyConnections from '../MyConnections';
import {clearInvitaion, joinVideoConference} from '../../../redux/telehealth/actions';
import {goBack} from '../../../redux/navigation/actions';
import './styles.css'

class Profile extends Component {

  render() {
    return (
      <ScreenCover>
        <div className='container-fluid p-0'>
          <Header
           onClick = {(link) => this.navigateProfileHeader(link)}
            menuArray={['contact']}
          />
          <div className='width100 mainWidgetProfile mainWidgetOverflow'>
            <div className='width100 topWidgetBG' />
            <div className='container mainProfileContent bgWhite'>
              <div className='row d-flex justify-content-center m-auto'>
                <div className='col-md-12'>
                  <h4 className='my-3 text-white SPTitleText'>
                    <span onClick={this.props.goBack}> <i className='Icon icon-back' /> </span>
                    Profile
                  </h4>
                </div>
                <PersonalDetail profilePercentage={this.props.profilePercentage} />
                <ClinicalCondition />
                <PointService />
                <Languages />
                <MyConnections />
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

function mapDispatchToProps(dispatch) {
  return {
    clearInvitaion: () => dispatch(clearInvitaion()),
    joinVideoConference: () => dispatch(joinVideoConference()),
    goBack: () => dispatch(goBack())
  }
};

function mapStateToProps(state) {
  return {
    showTelehealthInvite: state.telehealthState.isInvitationCame
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
