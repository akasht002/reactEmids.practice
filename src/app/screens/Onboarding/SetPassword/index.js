import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setPassword, onCancelClick, getUserData } from '../../../redux/onboarding/SetPassword/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { Input, ScreenCover, CoreoWizScreen, CoreoWizFlow, ModalUserAgreement, ModalPopup } from '../../../components';
import { checkPassword } from '../../../utils/validations'
import '../styles.css';
import { USERTYPES } from "../../../constants/constants";
import {getEulaContent} from '../../../redux/auth/UserAgreement/actions'

export class SetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            userAgreement: false,
            passwordMatch: true,
            passwordCombination: true,
            agreementModal: false,
            showModalOnCancel: false,
            passMatch: false
        };
    };

    componentDidMount(){
        this.props.getUserData()
        this.props.getEulaContent();
    }

    validatePassword = () => {
        if (checkPassword(this.state.password) || this.state.password === '') {
            if (this.state.password === this.state.confirmPassword) {
                this.setState({ passwordMatch: true, passMatch: true });
            }
             else if(this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== ''){
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
                username: this.props.userEmail,
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

    render() {
        let navigationData = CoreoWizNavigationData;
        if (this.props.userType === USERTYPES.ENTITY_USER) {
            navigationData = CoreoWizNavigationData.filter((data) => {
                return data.id !== 0;
            });
        } 
        return (
            <ScreenCover isLoading={this.props.isLoading} test-setPassword="test-setPassword">
                <CoreoWizScreen
                    menus={ContactMenu}
                    activeCoreoWiz={2}
                    displayPrevButton={false}
                    displaySubmitButton={true}
                    isSubmitDisabled={this.state.password === '' || this.state.confirmPassword === '' || !this.state.passMatch || !this.state.userAgreement}
                    onSubmitClick={this.onClickButtonSubmit}
                    onCancelClick={this.onClickCancel}
                    >
                    <div className="container-fluid mainContent px-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4 defaualt-purple theme-primary">Set My Password</h4>
                                <form className="form tempPassForm my-2 my-lg-0">
                                    <div className="form-group my-4">
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 my-3">
                                            <Input
                                                id="newPass"
                                                autoComplete="off"                                               
                                                type="password"
                                                label="Enter New Password"
                                                maxlength={25}
                                                className="form-control"
                                                value={this.state.password}
                                                textChange={(e) => this.setState({
                                                    password: e.target.value,
                                                    passwordMatch: true,
                                                    passwordCombination: true,
                                                    passMatch: false,
                                                    
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
                                                type="password"
                                                label="Confirm New password"
                                                maxlength={25}
                                                className="form-control"
                                                value={this.state.confirmPassword}                                                                                          
                                                textChange={(e) => this.setState({ 
                                                    confirmPassword: e.target.value, 
                                                    passwordMatch: true,
                                                    passwordCombination : true,
                                                    passMatch: false,
                                                })}
                                                onBlur={this.validatePassword}
                                                onCopy={(e) => { e.preventDefault() }}
                                                onPaste={(e) => { e.preventDefault() }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            {!this.state.passwordMatch && <span className="text-danger d-block mt-4 mb-2 MsgWithIcon MsgWrongIcon">Passwords do not match.</span>}
                                            <div>
                                                <span className="d-block mt-4 mb-2">Password should contain a combination of upper case, lower case, special characters, numbers and should be at least 8 characters.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label license-agreespan">
                                            <input className="form-check-input" type="checkbox" value={this.state.userAgreement} id="defaultCheck1" onChange={(e) => this.setState({ userAgreement: e.target.checked })} />
                                            <span className="CheckboxIcon"></span>
                                            By clicking on Submit, I agree that I have read and accepted the <Link to={this.props.match.url} className="theme-primary" onClick={() =>this.setState({agreementModal: true})}>End User License Agreement</Link>.
                                        </label>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={navigationData} activeFlowId={2} />
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
                        showModalOnCancel: !this.state.showModalOnCancel,
                    })}
                />
                <ModalUserAgreement
                    isOpen={this.state.agreementModal}
                    ModalBody={<div dangerouslySetInnerHTML={{ __html: this.props.eulaContent }} />}
                    className="modal-lg EULA"
                    modalTitle="End User License Agreement"
                    onClick={() => this.setState({
                        agreementModal: !this.state.agreementModal
                    })}
                />
            </ScreenCover>
        )
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onSetPassword: (data) => dispatch(setPassword(data)),
        getUserData: () => dispatch(getUserData()),
        getEulaContent: () => dispatch(getEulaContent())
    }
};


export function mapStateToProps(state) {
    return {
        userEmail: state.onboardingState.setPasswordState.userEmail,
        isLoading: state.onboardingState.setPasswordState.loading,
        userType: state.onboardingState.verifyContactState.serviceProviderDetails.userType,
        eulaContent: state.authState.userAgreementState.eulaContent
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetPassword));