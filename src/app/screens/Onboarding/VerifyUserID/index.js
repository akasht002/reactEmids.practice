import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { Button, ScreenCover, CoreoWizScreen, CoreoWizFlow, Input, ModalPopup } from '../../../components';
import {
    onCancelClick,
    sendVerificationLink,
    onUserEmailNext,
    formDirty
} from '../../../redux/onboarding/VerifyUserID/actions';
import { setWorkflowDirty } from '../../../redux/wizard/actions';
import { checkEmail, checkSpace } from '../../../utils/validations'
import Help from '../../../assets/HelpDoc/Help.pdf';
import '../styles.css';

class VerifyUserID extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            emailValid: true,
            isEmailNotExist: false,
            isAlreadyOnboarded: false,
            showModalOnCancel: false,
        };
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            emailValid: true,
            isEmailNotExist: false
        });
        if (e.target.value === " ") {
            this.setState({ email: '' })
        }
        if (e.target.value.length === 0) {
            this.setState({ isEmailNotExist: false, isAlreadyOnboarded: false });
        }
        this.props.formDirty();
    };

    validateEmail = () => {
        if (this.state.email) {
            this.setState({ email: (this.state.email).trim() });
            if (checkEmail(this.state.email)) {
                this.setState({ emailValid: true });
            }else {
                this.setState({ emailValid: false });
            }
        }
        else {
            this.setState({ emailValid: false });
        }
    }

    onClickSendVerificationLink = () => {
        if (checkEmail(this.state.email)) {
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
        this.setState({ showModalOnCancel: true });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ isAlreadyOnboarded: nextProps.isAlreadyOnboarded });
    };

    render() {

        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen 
                    menus={ContactMenu} 
                    activeCoreoWiz={0} 
                    displayPrevButton={false} 
                    displayNextButton={true} 
                    isNextDisabled={!this.props.isEmailExist} 
                    onNextClick={this.onClickButtonNext} 
                    onCancelClick={this.onClickButtonCancel}>
                    <div className="container-fluid mainContent px-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4 verify-title">Verify My User ID</h4>
                                <form className="form my-2 px-0 my-lg-0 col-md-6">
                                    <Input
                                        id="userId"
                                        autoComplete="off"
                                        type="text"
                                        placeholder="e.g. johndoe@xyz.com"
                                        label="Enter Email ID"
                                        className={"form-control " + (this.props.isEmailExist ? 'inputSuccess' : (!this.state.emailValid || this.state.isEmailNotExist) && 'inputFailure')}
                                        disabled={this.props.isEmailExist}
                                        value={checkSpace(this.state.email)}
                                        textChange={this.onChangeEmail}
                                        onBlur={this.validateEmail}
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
                                    <span className="text-success d-block mb-2">Hi {this.props.serviceProviderDetails.fullName}, we found you.</span>
                                </div>}
                                {this.props.isEmailNotExist && <div className={"MsgWithIcon MsgWrongIcon"}>
                                    <span className="text-danger d-block mb-2">We did not find your Email ID. Please retry or contact <a className="primaryColor px-1" href = {Help} target = "_blank">Support</a>.</span>
                                </div>}
                                {!this.state.emailValid && <div className="MsgWithIcon MsgWrongIcon">
                                    <span className="text-danger d-block mb-2">Please enter a valid email address. e.g. abc@xyz.com</span>
                                </div>}
                                {this.state.isAlreadyOnboarded && <div className={"MsgWithIcon MsgWrongIcon"}>
                                    <span className="text-danger d-block mb-2">Sorry, you are already onboarded for this registered userId.</span>
                                </div>}
                            </div>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={0} />
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

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data) => dispatch(onUserEmailNext(data)),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data)),
        setWorkflowDirty: () => dispatch(setWorkflowDirty()),
        formDirty: () => dispatch(formDirty())
    }
};


function mapStateToProps(state) {
    return {
        isLoading: state.onboardingState.verifyUserIDState.loading,
        isEmailExist: state.onboardingState.verifyUserIDState.isEmailExist,
        isEmailNotExist: state.onboardingState.verifyUserIDState.isEmailNotExist,
        serviceProviderDetails: state.onboardingState.verifyUserIDState.serviceProviderDetails,
        isAlreadyOnboarded: state.onboardingState.verifyUserIDState.setIsAlreadyOnboarded
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyUserID));