import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { Button, ScreenCover, CoreoWizScreen, CoreoWizFlow, Input } from '../../../components';
import { sendVerificationLink, onCancelClick, onUserEmailNext } from '../../../redux/onboarding/actions';
import { setWorkflowDirty } from '../../../redux/wizard/actions';

class VerifyUserID extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            emailValid: true
        };
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    onClickSendVerificationLink = () => {
        if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            this.setState({ emailValid: true });
            this.props.sendVerificationLink({ emailId: this.state.email });
        } else {
            this.setState({ emailValid: false });
        }
    };

    componentDidMount() {
        if (this.props.serviceProviderDetails.emailId) {
            this.setState({ email: this.props.serviceProviderDetails.emailId });
        };
        this.props.setWorkflowDirty();
    };

    onClickButtonNext = () => {
        let email = this.state.email;
        if (this.props.serviceProviderDetails.email) {
            email = this.props.serviceProviderDetails.email
        };
        this.props.onClickNext({ emailId: email });
    };

    onClickButtonCancel = () => {
        this.props.onClickCancel();
    };

    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen menus={ContactMenu} activeCoreoWiz={0} displayPrevButton={false} displayNextButton={true} isNextDisabled={!this.props.isEmailExist} onNextClick={this.onClickButtonNext} onCancelClick={this.onClickButtonCancel}>
                    <div className="container-fluid mainContent px-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4">Verify My User ID</h4>
                                <form className="form my-2 px-0 my-lg-0 col-md-6">
                                    <Input
                                        id="userId"
                                        autoComplete="off"
                                        required="required"
                                        type="email"
                                        placeholder="eg. smith@gmail.com"
                                        label="Enter Email ID"
                                        className={`${this.props.isEmailExist ? "form-control inputSuccess" : (this.props.isEmailNotExist || !this.state.emailValid ? "form-control inputFailure" : "form-control")}`}
                                        value={this.state.email}
                                        textChange={this.onChangeEmail}
                                    />
                                    {!this.props.isEmailExist &&
                                        <Button
                                            type="button"
                                            classname={"my-3 btn btn-primary"}
                                            label="Verify"
                                            onClick={this.onClickSendVerificationLink}
                                            disable={!this.state.email}
                                        />}
                                </form>
                                {this.props.isEmailExist && <div className="MsgWithIcon MsgSuccessIcon">
                                    <span className="text-success d-block mt-4 mb-2">Hi {this.props.serviceProviderDetails.fullName}, we found you.</span>
                                </div>}
                                {this.props.isEmailNotExist && <div className={"MsgWithIcon MsgWrongIcon"}>
                                    <span className="text-danger d-block mt-4 mb-2">We did not find your Email ID. Please retry or contact Support.</span>
                                </div>}
                            </div>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={0} />
            </ScreenCover>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data) => dispatch(onUserEmailNext(data)),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data)),
        setWorkflowDirty: () => dispatch(setWorkflowDirty())
    }
};


function mapStateToProps(state) {
    return {
        isSuccessLinkSent: state.onboardingState.isLinkSent,
        userEmail: state.onboardingState.userEmail,
        isLoading: state.onboardingState.loading,
        isEmailExist: state.onboardingState.isEmailExist,
        isEmailNotExist: state.onboardingState.isEmailNotExist,
        serviceProviderDetails: state.onboardingState.serviceProviderDetails
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyUserID));