import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Scrollbars } from '../../../components'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import { getVisitNotificationSettings, updateVisitNotificationSettings, handlePushChange, handleEmailChange } from '../../../redux/visitProcessingNotification/VisitNotificationSettings/actions';
import './VisitNotificationSettings.css';
import { NotificationCheckBox } from './NotificationCheckBox';
import { setIsFormDirty } from '../../../redux/auth/user/actions';
import { Preloader } from "../../../components"
class VisitNotificationSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            checkedPushData: [],
            checkedEmailData: [],
        };
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.props.getVisitNotificationSettings();
    }

    handlePushChange = (pList) => {
        this.props.setIsFormDirty(true);
        this.props.handlePushChange(pList);
        this.setState({ checkedPushData: this.props.pushNotification });
    }

    handleEmailChange = (eList) => {
        this.props.setIsFormDirty(true);
        this.props.handleEmailChange(eList);
        this.setState({ checkedEmailData: this.props.emailNotification });
    }

    onClickSave = () => {
        this.props.setIsFormDirty(false);
        this.props.updateVisitNotificationSettings({
            pushNotification: this.props.pushNotification,
            emailNotification: this.props.emailNotification
        });
    }

    render() {
        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                <div className='ProfileCardBody NotificationsSettingsBody'>
                    <div className='ProfileCardHeader'>
                        <span className='NotificationsHeaderTitle primaryColor'>My Settings</span>
                    </div>
                    <div className='NotificationsSettingsContainer'>
                        <h6 className='NotificationsListHeader'>Notifications</h6>
                        {this.props.isLoading && <Preloader/>}
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='NotificationsSettingsWidget'>
                            <div className='card NotificationsSettingsListBox'>
                                <div className='NotificationsSettingsListItems'>
                                    <h6>
                                        Push Notifications
                                </h6>
                                    {this.props.pushNotification && this.props.pushNotification.map((pList) => {
                                        return (<NotificationCheckBox
                                            nList={pList}
                                            handleChange={this.handlePushChange}
                                            userId={this.props.userId}
                                        />
                                        )
                                    })}
                                </div>
                                <div className='NotificationsSettingsListItems'>
                                    <h6>
                                        Email Notifications
                                </h6>
                                    {this.props.emailNotification && this.props.emailNotification.map((eList) => {
                                        return (<NotificationCheckBox
                                            nList={eList}
                                            handleChange={this.handleEmailChange}
                                            userId={this.props.userId}
                                        />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='bottomButton'>
                                <a className='btn btn-primary ml-auto' onClick={this.onClickSave}>Save</a>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitNotificationSettings: () => dispatch(getVisitNotificationSettings()),
        updateVisitNotificationSettings: (data) => dispatch(updateVisitNotificationSettings(data)),
        handlePushChange: (data) => dispatch(handlePushChange(data)),
        handleEmailChange: (data) => dispatch(handleEmailChange(data)),
        setIsFormDirty: (data) => dispatch(setIsFormDirty(data))  
    }
};

function mapStateToProps(state) {
    return {
        pushNotification: state.visitNotificationState.VisitNotificationSettingsState.pushNotification,
        emailNotification: state.visitNotificationState.VisitNotificationSettingsState.emailNotification,
        userId: state.authState.userState.userData.userInfo.serviceProviderId,
        isLoading:state.visitNotificationState.VisitNotificationSettingsState.isLoading
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitNotificationSettings));