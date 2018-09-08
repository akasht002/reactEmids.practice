import React from 'react'
import { Link } from 'react-router-dom'
// import { ACTIVE, VISITED } from "../../../../constants/constants";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideMenu, ProfileHeader, ProfileImage, ScreenCover } from '../../../components';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import { getProfilePercentage } from '../../../redux/profile/ProgressIndicator/actions';
import { MenuData } from '../../../data/MenuData';
import { Path } from '../../../routes/';
import { getUserInfo, updateEula } from '../../../redux/auth/UserAgreement/actions';
import { ModalUserAgreement } from '../../../components';

import './style.css'

class AsideScreenCover extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: { label: 'Brett Smith', value: '2' }
    }
  }

  optionChanged (e) {
    this.setState({
      selectedValue: e
    })
  }

  componentDidMount () {
    this.props.getProfilePercentage()
    this.props.getImage()
    this.props.getUserInfo();
  }

  onClickOk = () => {
    this.props.onClickOk();
    }

    render() {
        return (
            <ScreenCover>
                <div className={"ProfileLeftWidget " + this.props.isOpen}>
                    <div className='BrandNameWidget'>
                        <div className='BrandName'>
                            <Link className='BrandLink' to='/'>Coreo Home</Link>
                        </div>
                    </div>
                    <ProfileImage
                        src={this.props.profileImgData.image ? this.props.profileImgData.image
                            : require('../../../assets/images/Blank_Profile_icon.png')}
                        profilePercentage={this.props.profilePercentage}
                        profileImageWidget='ProfileImageWidget'
                        profileImageContainer='ProfileImageContainer'
                        cicularChart='circular-chart'
                        circle='SPdpCircle'
                        profileImage='ProfileImage'
                    />

                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                            <Link className='BrandLink' to={Path.profile}> <p>John Smith</p></Link>
                        </div>
                    </div>
                    <AsideMenu menuData={MenuData} />
                </div>
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.props.toggle} />
                    <div className={'hiddenScreen ' + this.props.isOpen} onClick={this.props.toggle} />
                    <div className='ProfileRightContainer'>
                        {this.props.children}
                    </div>
                </div>
                <ModalUserAgreement
                    isOpen={this.props.isEulaUpdated}
                    ModalBody={<div dangerouslySetInnerHTML={{ __html: this.props.eulaContent }} />}
                    className="modal-lg"
                    modalTitle="User Agreement has been updated, please accept to proceed."
                    onClick={this.onClickOk}
                />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfilePercentage: () => dispatch(getProfilePercentage()),
        getImage: () => dispatch(action.getImage()),
        getUserInfo: () => dispatch(getUserInfo()),
        onClickOk: () => dispatch(updateEula())
    }
};

function mapStateToProps(state) {
    return {
        profilePercentage: state.profileState.progressIndicatorState.profilePercentage,
        profileImgData: state.profileState.PersonalDetailState.imageData,
        isEulaUpdated: state.authState.userAgreementState.isEulaUpdated,
        eulaContent: state.authState.userAgreementState.eulaContent,
    };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AsideScreenCover)
)
