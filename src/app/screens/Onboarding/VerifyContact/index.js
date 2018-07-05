import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { sendTemporaryPasscode, verifyTempPasscode, setPasscodeError } from '../../../redux/onboarding/actions';
import { Input, Button, ScreenCover, CoreoWizScreen, CoreoWizFlow } from '../../../components';


class VerifyContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: 'd-block',
            invisible: 'd-none',
            temporaryPassCode: '',
            mobileNumber: this.props.serviceProviderDetails.mobileNumber.substring(this.props.serviceProviderDetails.mobileNumber.length - 4)
        };
    };

    onClickSendPasscode = () => {
        this.setState({
            visible: 'd-none',
            invisible: 'd-block'
        });
        this.props.sendPassCode(this.props.serviceProviderDetails);
    };

    onClickButtonNext = () => {
        let data = {
            serviceProviderId: this.props.serviceProviderDetails.serviceProviderId,
            emailId: this.props.serviceProviderDetails.emailId,
            mobileNumber: this.props.serviceProviderDetails.mobileNumber,
            passcode: this.state.temporaryPassCode
        }
        this.props.verifyPasscode(data);
    };

    onClickButtonCancel = () => {
        this.props.onClickCancel();
    };

    onClickButtonPrevious = () => {
        this.props.onClickPrevious();
    };

    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen menus={ContactMenu} activeCoreoWiz={1} displayNextButton={true} displayPrevButton={true} isNextDisabled={!this.state.temporaryPassCode} onNextClick={this.onClickButtonNext} onPreviousClick={this.onClickButtonPrevious} onCancelClick={this.onClickButtonCancel}>
                    <div className="container-fluid mainContent px-5 d-flex align-items-start flex-column">
                        <div className="row d-block">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4">Verify My Mobile Number</h4>
                                <p className="m-0">Your registered Contact Number</p>
                                <p className="contactNumber"> XXX XXX {this.state.mobileNumber}</p>
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

                                    <form className="form my-2">
                                        <Input
                                            id="passcode"
                                            autoComplete="off"
                                            required="required"
                                            type="password"
                                            label="Enter temporary passcode"
                                            className="form-control"
                                            value={this.state.temporaryPassCode}
                                            textChange={(e) => this.setState({ temporaryPassCode: e.target.value })}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={"row mt-auto " + this.state.invisible}>
                            <span className="text-success d-block mb-3 width100 MsgWithIcon MsgSuccessIcon">The temporary passcode has been sent to your registered Contact Number.</span>
                            {this.props.isPasscodeNotMatch && <span className="text-danger d-block mb-3 width100 MsgWithIcon MsgWrongIcon">Sorry, passcode entered is not matching.</span>}
                            <span className="d-block mb-3 width100 receivePass">Didn't receive your passcode yet? <Link className="primaryColor px-1" to="/verifycontact">Click here</Link> to resend or Contact <Link to="/verifycontact" className="primaryColor px-1">Support</Link></span>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={1} />
            </ScreenCover>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(push("/")),
        onClickNext: () => dispatch(push("/setPassword")),
        onClickPrevious: () => dispatch(setPasscodeError()),
        sendPassCode: (data) => (dispatch(sendTemporaryPasscode(data))),
        verifyPasscode: (data) => (dispatch(verifyTempPasscode(data)))
    }
};

function mapStateToProps(state) {
    return {
        serviceProviderDetails: state.onboardingState.serviceProviderDetails,
        isPasscodeSent: state.onboardingState.isPasscodeSent,
        isLoading: state.onboardingState.loading,
        isPasscodeNotMatch: state.onboardingState.isPasscodeNotMatch
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyContact));