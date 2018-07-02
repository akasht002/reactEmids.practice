import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPassword, onCancelClick } from '../../../redux/onboarding/actions';
import { FloatLabelInput, ScreenCover, CoreoWizScreen, CoreoWizFlow } from '../../../components';

class SetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            confirmPass: '',
            userAgreement: false
        };
    };

    onSubmit = () => {
        debugger
            this.props.onSubmit(this.state.pass);
    }

    onCancel = () => {
        this.props.onClickCancel();
    }

    render() {
        const menus = ["Contact"];

        return (
            <ScreenCover>
                <CoreoWizScreen menus={menus} activeCoreoWiz={2} displayPrevButton={true} displaySubmitButton={true} isSubmitDisabled={!this.state.pass || !this.state.confirmPass || !this.state.userAgreement || (this.state.pass !== this.state.confirmPass)} onSubmitClick={this.onSubmit} onCancelClick={this.onCancel}>
                    <h4 className="font-weight-normal mb-4">Set My Password</h4>
                    <form className="form my-2 my-lg-0">
                        <div className="form-group my-4">
                        </div>
                        <div className="row">
                            <div className="col-md-6 my-3">
                                <FloatLabelInput
                                    id="newPass"
                                    autoComplete="off"
                                    required="required"
                                    type="password"
                                    label="Enter New Password"
                                    className="mr-sm-2 mb-4"
                                    value={this.state.pass}
                                    placeholder="Enter your new Password"
                                    onChange={(e) => this.setState({ pass: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 my-3">
                                <FloatLabelInput
                                    id="rePass"
                                    autoComplete="off"
                                    required="required"
                                    type="password"
                                    label="Confirm New password"
                                    className="mr-sm-2 mb-4"
                                    value={this.state.confirmPass}
                                    onChange={(e) => this.setState({ confirmPass: e.target.value })}
                                />
                            </div>
                            {(this.state.pass !== this.state.confirmPass) && <div>Password not matching</div>}
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value={this.state.userAgreement} id="defaultCheck1" onChange={(e) => this.setState({ userAgreement: e.target.value })} />
                            <label className="form-check-label">
                                By clicking on Submit, I agree that I have read and accepted the <a onClick={this.toggle}>End User License Agreement</a>.
                             </label>
                        </div>
                    </form>
                </CoreoWizScreen>
                <CoreoWizFlow activeCoreoWiz={2} />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onSubmit: (data) => dispatch(setPassword(data))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SetPassword));