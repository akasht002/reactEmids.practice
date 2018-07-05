import React from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setPassword, onCancelClick } from '../../../redux/onboarding/actions';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { ContactMenu } from '../../../data/HeaderMenu';
import { Input, ScreenCover, CoreoWizScreen, CoreoWizFlow, CheckBox } from '../../../components';

class SetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirmPassword: null,
            userAgreement: false,
            passwordMatch: true
        };
    };

    onClickSubmit = () => {
        if (this.state.password === this.state.confirmPassword) {
            const data = {
                username: this.props.serviceProviderDetails.emailId,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            };
            this.props.onSetPassword(data);
        } else {
            this.setState({ passwordMatch: false });
        }
    };

    onClickCancel = () => {
        this.props.onClickCancel();
    };

    onClickButtonPrevious = () => {
        this.props.onClickPrevious();
    };

    onChangeConfirmPassword = (e) => {
        this.setState({ confirmPassword: e.target.value });
        if(!this.state.passwordMatch && e.target.value.length === 0){
            this.setState({ passwordMatch: true });
        };
    };

    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen
                    menus={ContactMenu}
                    activeCoreoWiz={2}
                    displayPrevButton={true}
                    displaySubmitButton={true}
                    isSubmitDisabled={!this.state.password || !this.state.confirmPassword || !this.state.userAgreement}
                    onSubmitClick={this.onClickSubmit}
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
                                                className={`${!this.state.passwordMatch ? "form-control inputFailure" : "form-control"}`}
                                                value={this.state.password}
                                                textChange={(e) => this.setState({ password: e.target.value })}
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
                                                className={`${!this.state.passwordMatch ? "form-control inputFailure" : "form-control"}`}
                                                value={this.state.confirmPassword}
                                                textChange={this.onChangeConfirmPassword}
                                            />
                                            {!this.state.passwordMatch && <span className="d-block text-danger MsgWithIcon MsgWrongIcon">Passwords not matching.</span>}
                                        </div>
                                    </div>
                                    <CheckBox
                                        value={this.state.userAgreement}
                                        id="userAgreement"
                                        onChange={(e) => this.setState({ userAgreement: e.target.checked })}>
                                        By clicking on Submit, I agree that I have read and accepted the <Link className="primaryColor" to="/setPassword">End User License Agreement</Link>.
                                    </CheckBox>
                                </form>
                            </div>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={2} />
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