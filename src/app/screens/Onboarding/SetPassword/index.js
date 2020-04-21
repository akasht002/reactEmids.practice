import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setPassword, onCancelClick, getUserData, getQuestions } from '../../../redux/onboarding/SetPassword/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { Input, ScreenCover, CoreoWizScreen, CoreoWizFlow, ModalUserAgreement, ModalPopup, Scrollbars } from '../../../components';
import { checkPassword } from '../../../utils/validations'
import '../styles.css';
import { USERTYPES } from "../../../constants/constants";
import { getEulaContent } from '../../../redux/auth/UserAgreement/actions';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Select, Item } from '@zendeskgarden/react-select';
import { PASSWORD_COMPLEXITY_MSG } from "../../../constants/message";

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
            passMatch: false,
            selectedQuestionName: '',
            selectedQuestionNameInvalid: true,
            securityAnswer: '',
            securityAnswerInvalid: true
        };
    };

    componentDidMount() {
        this.props.getUserData()
        this.props.getEulaContent();
        this.props.getQuestions()
    }

    validatePassword = () => {
        if (checkPassword(this.state.password) || this.state.password === '') {
            if (this.state.password === this.state.confirmPassword) {
                this.setState({ passwordMatch: true, passMatch: true });
            }
            else if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== '') {
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
                confirmPassword: this.state.confirmPassword,
                securityAnswer: this.state.securityAnswer,
                selectedQuestionName: this.state.selectedQuestionName
            };
            this.validate() && this.props.onSetPassword(data);
        }
    }

    onClickCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    };

    changeSelectedValue = (value) => {
        let selectedValue = '';
        let valueData = parseInt(value, 10);
        this.props.securityQuestion && this.props.securityQuestion.map((question) => {
            return question.oktaQuestionnaireId === valueData ? selectedValue = question.questions : ''
        })

        this.setState({
            questionId: valueData,
            selectedQuestionName: selectedValue
        });
    }

    handleTextChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    getQuestions = () => {
        return this.props.securityQuestion && this.props.securityQuestion.map((question, i) => {
            return <Item className='ListItem CTDashboard' key={question.oktaQuestionnaireId}>{question.questions}</Item>;
        });
    }

    validate = () => {
        this.setState({
            securityAnswerInvalid:this.state.securityAnswer.length > 0,
            selectedQuestionNameInvalid:this.state.selectedQuestionName.length > 0 
        })
        return this.state.securityAnswer.length > 0 && this.state.selectedQuestionName.length > 0 
    }

    handelPasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            passwordMatch: true,
            passwordCombination: true,
            passMatch: false
        })
    }

    handelConfirmPasswordChange = (e) => {
        this.setState({
            confirmPassword: e.target.value,
            passwordMatch: true,
            passwordCombination: true,
            passMatch: false,
        })
    }

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
                    <Scrollbars speed={2}
                    smoothScrolling
                    horizontal={false} className="container-fluid mainContent d-block">
                   
                        <div className="row d-block">
                            <div className="col-md-12 pt-5 p-r-l-30">
                                <h4 className="font-weight-normal mb-4 defaualt-purple theme-primary">Set My Password</h4>
                                <form className="form tempPassForm my-2 my-lg-0">
                                    <div className="form-group my-4">
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <Input
                                                id="newPass"
                                                autoComplete="off"
                                                type="password"
                                                label="Enter New Password"
                                                maxlength={25}
                                                className="form-control"
                                                value={this.state.password}
                                                textChange={(e) => this.handelPasswordChange(e)}
                                                onBlur={this.validatePassword}
                                                onCopy={(e) => { e.preventDefault() }}
                                                onPaste={(e) => { e.preventDefault() }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6  mb-3">
                                            <Input
                                                id="rePass"
                                                autoComplete="off"
                                                type="password"
                                                label="Confirm New password"
                                                maxlength={25}
                                                className="form-control"
                                                value={this.state.confirmPassword}
                                                textChange={(e) => this.handelConfirmPasswordChange(e)}
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
                                                <span className="d-block mt-4 mb-2">{PASSWORD_COMPLEXITY_MSG}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="mb-3 theme-primary">Security Question</label>
                                            <div className="full-block">
                                                <ThemeProvider>
                                                    <SelectField>
                                                        <Select
                                                            placement="auto"
                                                            options={this.getQuestions()}
                                                            onChange={this.changeSelectedValue}
                                                            selectedValue={this.state.selectedQuestionName}
                                                            className={'onBoardingSelect'}>
                                                            {this.state.selectedQuestionName ? this.state.selectedQuestionName : <span className="Select-placeholder pl-0">Select Question</span>}
                                                        </Select>
                                                    </SelectField>
                                                </ThemeProvider>
                                                <small className="text-danger d-block OnboardingAlert mt-3">
                                                    {!this.state.selectedQuestionNameInvalid && 'Please select the question'}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Input
                                                name="securityAnswer"
                                                label="Answer"
                                                autoComplete="off"
                                                type="text"
                                                placeholder=""
                                                maxlength={25}
                                                className={"form-control "}
                                                value={this.state.securityAnswer}
                                                textChange={this.handleTextChange}
                                                onCopy={(e) => { e.preventDefault() }}
                                                onPaste={(e) => { e.preventDefault() }}
                                            />
                                            <small className="text-danger d-block OnboardingAlert">
                                                {!this.state.securityAnswerInvalid && 'Please enter valid the value'}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="form-check pb-4">
                                        <label className="form-check-label license-agreespan">
                                            <input className="form-check-input" type="checkbox" value={this.state.userAgreement} id="defaultCheck1" onChange={(e) => this.setState({ userAgreement: e.target.checked })} />
                                            <span className="CheckboxIcon"></span>
                                            By clicking on Submit, I agree that I have read and accepted the <Link to={this.props.match.url} className="theme-primary" onClick={() => this.setState({ agreementModal: true })}><u>End User License Agreement</u></Link>.
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    
                    </Scrollbars>
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
        getEulaContent: () => dispatch(getEulaContent()),
        getQuestions: () => dispatch(getQuestions())
    }
};


export function mapStateToProps(state) {
    return {
        userEmail: state.onboardingState.setPasswordState.userEmail,
        isLoading: state.loadingState.isLoading,
        userType: state.onboardingState.verifyContactState.serviceProviderDetails.userType,
        eulaContent: state.authState.userAgreementState.eulaContent,
        securityQuestion: state.onboardingState.setPasswordState.securityQuestion
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetPassword));