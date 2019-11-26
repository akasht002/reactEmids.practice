import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { getUserData, sendTemporaryPasscode, verifyTempPasscode, formDirty, onCancelClick, getEntityUserData } from '../../../redux/onboarding/VerifyContact/actions';
import { Input, Button, ScreenCover, CoreoWizScreen, CoreoWizFlow, ModalPopup } from '../../../components';
import { checkSpace } from '../../../utils/validations'
import Help from '../../../assets/HelpDoc/Help.pdf';
import '../styles.css';
import { USERTYPES } from "../../../constants/constants";

export class VerifyContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: 'd-block',
            invisible: 'd-none',
            temporaryPassCode: '',
            passCodeSentMsg: false,
            showModalOnCancel: false,
            mobileNumber: '',
            clickHereResent: false
        };
    };

    componentDidMount() {
        if (this.props.match.params.type === USERTYPES.ENTITY_USER) {
            this.props.getEntityUserData({
                serviceProviderId: this.props.match.params.id,
                token: this.props.match.params.token,
                userType: this.props.match.params.type
            });
        } else {
            this.props.getUserData();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.serviceProviderDetails.mobileNumber) {
            this.setState({ mobileNumber: nextProps.serviceProviderDetails.mobileNumber.substring(nextProps.serviceProviderDetails.mobileNumber.length - 4) })
        }
    }

    onClickSendPasscode = () => {
        this.setState({
            visible: 'd-none',
            invisible: 'd-block',
            passCodeSentMsg: true,
            temporaryPassCode: '',
            clickHereResent: false
        });
        this.props.sendPassCode(this.props.serviceProviderDetails);
        this.props.formDirty();
    };

    onClickReSendPasscode = () => {
        this.setState({
            visible: 'd-none',
            invisible: 'd-block',
            passCodeSentMsg: true,
            temporaryPassCode: '',
            clickHereResent: true
        });
        this.props.sendPassCode(this.props.serviceProviderDetails);
        this.props.formDirty();
    };

    onClickButtonNext = () => {
        let data = {
            serviceProviderId: this.props.serviceProviderDetails.serviceProviderId,
            passcode: this.state.temporaryPassCode
        }
        this.setState({ passCodeSentMsg: false });
        this.props.verifyPasscode(data);
    };

    validatePasscode = () => {
        this.setState({ passCodeSentMsg: false });
    }

    onClickButtonCancel = () => {
        this.setState({ showModalOnCancel: true });
    };

    onChangePassword = (e) => {
        this.setState({ temporaryPassCode: e.target.value })
        this.props.formDirty();
    }

    render() {
        let navigationData = CoreoWizNavigationData;
        if (this.props.match.params.type === USERTYPES.ENTITY_USER) {
            navigationData = CoreoWizNavigationData.filter((data) => {
                return data.id !== 0;
            });
        } 
        return (
            <ScreenCover isLoading={this.props.isLoading} test-verifyContact='test-verifyContact'>
                <CoreoWizScreen menus={ContactMenu} activeCoreoWiz={1} displayNextButton={true} displayPrevButton={false} isNextDisabled={!this.state.temporaryPassCode} onNextClick={this.onClickButtonNext} onPreviousClick={this.onClickButtonPrevious} onCancelClick={this.onClickButtonCancel}>
                    <div className="container-fluid mainContent px-5 d-flex align-items-start flex-column">
                        <div className="row d-block">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4 verify-title">Verify My Mobile Number</h4>
                                <p className="m-0 default-444">Your registered Contact Number</p>
                                <p className="contactNumber default-444">XXX XXX {this.state.mobileNumber}</p>
                                <div className={"my-5 tempPassword " + this.state.visible}>
                                    <Button
                                        type="button"
                                        classname="btn btn-primary"
                                        label="Send Temporary Passcode"
                                        onClick={this.onClickSendPasscode}
                                    />
                                    <span className="d-block my-3 text-muted">A temporary passcode will be sent to your registered Contact Number</span>
                                </div>
                                <div className={"tempPassForm " + this.state.invisible}>
                                    <div className="form my-2 my-lg-0">
                                        <Input
                                            id="passcode"
                                            autoComplete="off"
                                            type="password"
                                            label="Enter temporary passcode"
                                            maxlength="6"
                                            className={"form-control mr-sm-2 " + (this.props.isPasscodeMatch ? '' : this.props.isPasscodeNotMatch && 'inputFailure')}
                                            value={checkSpace(this.state.temporaryPassCode)}
                                            textChange={(e) => this.onChangePassword(e)}
                                        />
                                    </div>
                                </div>
                                {this.props.isPasscodeNotMatch && <span className="text-danger d-block mb-3 width100 MsgWithIcon MsgWrongIcon">Please enter valid Passcode.</span>}
                                {this.props.isPasscodeExpired && <span className="text-danger d-block mb-3 width100 MsgWithIcon MsgWrongIcon">Your passcode is been expired, please regenerate the passcode</span>}
                            </div>
                        </div>
                        <div className="row mt-auto verify-msgie11">
                            {this.state.passCodeSentMsg && <span className="text-success d-block mb-3 width100 MsgWithIcon MsgSuccessIcon">The temporary passcode has been {this.state.clickHereResent && <span>re</span>}sent to your registered Contact Number.</span>}
                            <span className={"mb-3 width100 " + this.state.invisible}>Haven't received your passcode yet? <Link className="theme-primary px-1" onClick={this.onClickReSendPasscode} to="/verifycontact">Click here</Link> to resend or Contact <a href = {Help} target = "_blank" className="theme-primary px-1">Support</a></span>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={navigationData} activeFlowId={1} />
                <ModalPopup
                    isOpen={this.state.showModalOnCancel}
                    ModalBody={<span>Do you want to cancel the onboarding process?</span>}
                    btn1="YES"
                    btn2="NO"
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={() => this.props.onClickCancel()}
                    onCancel={() => this.setState({
                        showModalOnCancel: !this.state.showModalOnCancel
                    })}
                />
            </ScreenCover>
        )
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        sendPassCode: (data) => (dispatch(sendTemporaryPasscode(data))),
        verifyPasscode: (data) => (dispatch(verifyTempPasscode(data))),
        getUserData: () => (dispatch(getUserData())),
        formDirty: () => dispatch(formDirty()),
        getEntityUserData: (data) => dispatch(getEntityUserData(data))
    }
};

export function mapStateToProps(state) {
    return {
        serviceProviderDetails: state.onboardingState.verifyContactState.serviceProviderDetails,
        isPasscodeSent: state.onboardingState.verifyContactState.isPasscodeSent,
        isLoading: state.onboardingState.verifyContactState.loading,
        isPasscodeNotMatch: state.onboardingState.verifyContactState.isPasscodeNotMatch,
        isPasscodeMatch: state.onboardingState.verifyContactState.isPasscodeMatch,
        isPasscodeExpired: state.onboardingState.verifyContactState.isPasscodeExpired,
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyContact));