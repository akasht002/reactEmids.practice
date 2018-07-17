import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setPassword, onCancelClick } from '../../../redux/onboarding/actions';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { Input, ScreenCover, CoreoWizScreen, CoreoWizFlow, CheckBox, ModalUserAgreement, ModalTemplate } from '../../../components';
import { checkPassword } from '../../../utils/validations'
import { endUserAgreement } from '../../../assets/templates/EndUserAgreement';

class SetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirmPassword: null,
            userAgreement: false,
            passwordMatch: true,
            passwordCombination: true,
            agreementModal: false,
            showModalOnCancel: false
        };
    };

    // validatePassword = () => {
    //     if (checkPassword(this.state.password) || this.state.password === '') {
    //         if (this.state.password === this.state.confirmPassword) {
    //             // const data = {
    //             //     username: this.props.serviceProviderDetails.emailId,
    //             //     password: this.state.password,
    //             //     confirmPassword: this.state.confirmPassword
    //             // };
    //             // this.props.onSetPassword(data);
    //             this.setState({ passwordMatch: true });
    //         } else {
    //             this.setState({ passwordMatch: false });
    //         }
    //     } else {
    //         this.setState({ passwordCombination: false });

    //     }
    // };

    validatePassword = () => {
        if (checkPassword(this.state.password) || !this.state.password === '') {
            if (this.state.password === this.state.confirmPassword) {
                this.setState({ passwordMatch: true });
            } else {
                this.setState({ passwordMatch: false });
            }
        }
        else {
            this.setState({ passwordCombination: false });
        }
    }

    onClickButtonSubmit = () => {
        if (this.state.passwordMatch && this.state.passwordCombination) {
            const data = {
                username: this.props.serviceProviderDetails.emailId,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            };
            this.props.onSetPassword(data);
        }
    }

    onClickCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    };

    onClickButtonPrevious = () => {
        this.props.onClickPrevious();
    };

    onChangeConfirmPassword = (e) => {
        this.setState({ confirmPassword: e.target.value, passwordCombination: true });
        if (!this.state.passwordMatch && e.target.value.length === 0) {
            this.setState({ passwordMatch: true });
        };
    };

    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen
                    menus={ContactMenu}
                    activeCoreoWiz={2}
                    displayPrevButton={false}
                    displaySubmitButton={true}
                    isSubmitDisabled={!this.state.password || !this.state.confirmPassword || !this.state.userAgreement}
                    onSubmitClick={this.onClickButtonSubmit}
                    onCancelClick={this.onClickCancel}
                    onPreviousClick={this.onClickButtonPrevious}>
                    <div className="container-fluid mainContent px-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4">Set My Password</h4>
                                <form className="form my-2 my-lg-0">
                                    <div className="form-group my-4">
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 my-3">
                                            <Input
                                                id="newPass"
                                                autoComplete="off"
                                                required="required"
                                                type="password"
                                                label="Enter New Password"
                                                className="form-control"
                                                value={this.state.password}
                                                textChange={(e) => this.setState({
                                                    password: e.target.value,
                                                    passwordMatch: true,
                                                    passwordCombination: true
                                                })}
                                                onBlur={this.validatePassword}
                                                onCopy={(e) => { e.preventDefault() }}
                                                onPaste={(e) => { e.preventDefault() }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 my-3">
                                            <Input
                                                id="rePass"
                                                autoComplete="off"
                                                required="required"
                                                type="password"
                                                label="Confirm New password"
                                                className="form-control"
                                                value={this.state.confirmPassword}                                                                                          
                                                textChange={(e) => this.setState({ 
                                                    confirmPassword: e.target.value, 
                                                    passwordMatch: true,
                                                    passwordCombination : true
                                                })}
                                                onBlur={this.validatePassword}
                                                onCopy={(e) => { e.preventDefault() }}
                                                onPaste={(e) => { e.preventDefault() }}
                                            />
                                        </div>
                                    </div>
                                    <CheckBox
                                        value={this.state.userAgreement}
                                        id="userAgreement"
                                        onChange={(e) => this.setState({ userAgreement: e.target.checked })}>
                                        By clicking on Submit, I agree that I have read and accepted the <Link className="primaryColor" to={this.props.match.url} onClick={() => this.setState({ agreementModal: true })}>End User License Agreement</Link>.
                                    </CheckBox>
                                    {!this.state.passwordMatch && <span className="text-danger d-block mt-4 mb-2 MsgWithIcon MsgWrongIcon">Passwords not matching.</span>}
                                    {!this.state.passwordCombination && <div className="MsgWithIcon MsgWrongIcon">
                                        <span className="text-danger d-block mt-4 mb-2">Password should contain a combination of upper case, lower case, special characters and number, and should be at least 8 characters.</span>
                                    </div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={2} />
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
                        showModalOnCancel: !this.state.showModalOnCancel,
                    })}
                />
                <ModalUserAgreement
                    isOpen={this.state.agreementModal}
                    ModalBody={endUserAgreement}
                    className="modal-lg"
                    modalTitle="End User License Agreement"
                    onClick={() => this.setState({
                        agreementModal: !this.state.agreementModal
                    })}
                />
            </ScreenCover>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onSetPassword: (data) => dispatch(setPassword(data)),
        onClickPrevious: () => dispatch(push("/verifycontact"))
    }
};


function mapStateToProps(state) {
    return {
        serviceProviderDetails: state.onboardingState.serviceProviderDetails,
        isLoading: state.onboardingState.loading
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetPassword));