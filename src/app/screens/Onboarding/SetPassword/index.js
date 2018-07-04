import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPassword, onCancelClick } from '../../../redux/onboarding/actions';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
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

    onSubmit = () => {
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

    onCancel = () => {
        this.props.onClickCancel();
    }

    onClickButtonPrevious = () => {
        this.props.onClickPrevious();
    }

    render() {
        const menus = ["Contact"];

        return (
            <ScreenCover>
                <CoreoWizScreen
                    menus={menus}
                    activeCoreoWiz={2}
                    displayPrevButton={true}
                    displaySubmitButton={true}
                    isSubmitDisabled={!this.state.password || !this.state.confirmPassword || !this.state.userAgreement}
                    onSubmitClick={this.onSubmit}
                    onCancelClick={this.onCancel}
                    onPreviousClick={this.onClickButtonPrevious}>
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
                                    className="form-control"
                                    value={this.state.confirmPassword}
                                    textChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                />
                            </div>
                            {!this.state.passwordMatch && <div>Password not matching</div>}
                        </div>
                        <CheckBox
                            value={this.state.userAgreement}
                            id="userAgreement"
                            onChange={ (e) => this.setState({userAgreement : e.target.checked})}>
                            By clicking on Submit, I agree that I have read and accepted the <a className="primaryColor" onClick={this.toggle}>End User License Agreement</a>.
                        </CheckBox>
                    </form>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={2} />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onSetPassword: (data) => dispatch(setPassword(data)),
        onClickPrevious: () => dispatch(push("/verifycontact"))
    }
}


function mapStateToProps(state) {
    return {
        serviceProviderDetails: state.onboardingState.serviceProviderDetails
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetPassword));