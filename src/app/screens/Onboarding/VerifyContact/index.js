import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { sendTemporaryPasscode, verifyTempPasscode, setPasscodeError, onCancelClick } from '../../../redux/onboarding/actions';
import { Input, Button, ScreenCover, CoreoWizScreen, CoreoWizFlow, ModalTemplate } from '../../../components';
import { checkSpace } from '../../../utils/validations'

class VerifyContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: 'd-block',
            invisible: 'd-none',
            temporaryPassCode: '',
            passCodeSentMsg: false,
            isPasscodeNotMatch: false,
            showModalOnCancel: false,
            
            mobileNumber: this.props.serviceProviderDetails.mobileNumber.substring(this.props.serviceProviderDetails.mobileNumber.length - 4)
        };
    };

    onClickSendPasscode = () => {
        this.setState({
            visible: 'd-none',
            invisible: 'd-block',
            passCodeSentMsg: true
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
        // if(this.props.isPasscodeNotMatch){
        //     this.setState({ isPasscodeNotMatch: true });
        // }
        this.setState({ passCodeSentMsg: false });
        this.props.verifyPasscode(data);
    };

    validatePasscode = () => {
        this.setState({ passCodeSentMsg: false });
    }

    onClickButtonCancel = () => {
        this.setState({ showModalOnCancel: true });
    };

    onClickButtonPrevious = () => {
        this.props.onClickPrevious();
    };

    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen menus={ContactMenu} activeCoreoWiz={1} displayNextButton={true} displayPrevButton={false} isNextDisabled={!this.state.temporaryPassCode} onNextClick={this.onClickButtonNext} onPreviousClick={this.onClickButtonPrevious} onCancelClick={this.onClickButtonCancel}>
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

                                    <form className="form my-2 my-lg-0">
                                        <Input
                                            id="passcode"
                                            autoComplete="off"
                                            required="required"
                                            type="password"
                                            label="Enter temporary passcode"
                                            className={"form-control mr-sm-2 " + (this.props.isPasscodeMatch ? 'inputSuccess' : this.props.isPasscodeNotMatch && 'inputFailure')}
                                            value={checkSpace(this.state.temporaryPassCode)}                                   
                                            textChange={(e) => this.setState({ temporaryPassCode: e.target.value, isPasscodeNotMatch: false })}
                                        />
                                    </form>
                                </div>
                                {(this.state.isPasscodeNotMatch || this.props.isPasscodeNotMatch) && <span className="text-danger d-block mb-3 width100 MsgWithIcon MsgWrongIcon">Please enter valid Passcode.</span>}
                            </div>
                        </div>
                        <div className="row mt-auto">
                            {this.state.passCodeSentMsg && <span className="text-success d-block mb-3 width100 MsgWithIcon MsgSuccessIcon">The temporary passcode has been sent to your registered Contact Number.</span>}
                            <span className="d-block mb-3 width100 receivePass">Haven't received your passcode yet? <Link className="primaryColor px-1" to="/verifycontact">Click here</Link> to resend or Contact <Link to="/verifycontact" className="primaryColor px-1">Support</Link></span>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={1} />
                <ModalTemplate
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

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
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
        isPasscodeNotMatch: state.onboardingState.isPasscodeNotMatch,
        isPasscodeMatch: state.onboardingState.isPasscodeMatch
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyContact));