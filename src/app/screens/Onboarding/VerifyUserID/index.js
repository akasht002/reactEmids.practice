import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { Button, ScreenCover, CoreoWizScreen, CoreoWizFlow, Input } from '../../../components';
import { onSetUserIdPrevious, sendVerificationLink, onCancelClick, onUserEmailNext } from '../../../redux/onboarding/actions';

class VerifyUserID extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null
        };
    };

    handleChange = (e) => {
        debugger;
        this.setState({
            email: e.target.value
        })
    };

    componentDidMount() {
        if (this.props.userEmail) {
            this.setState({ email: this.props.userEmail });
        }
    };

    onClickButtonNext = () => {
        this.props.onClickNext({ emailId: this.state.email });
    }

    onClickButtonCancel = () => {
        this.props.onClickCancel();
    }

    render() {
        const menus = ["Contact"];

        return (
            <ScreenCover>
                <CoreoWizScreen menus={menus} activeCoreoWiz={0} displayPrevButton={false} displayNextButton={true} isNextDisabled={!this.state.email} onNextClick={this.onClickButtonNext} onCancelClick={this.onClickButtonCancel}>
                    <h4 className="font-weight-normal mb-4">Verify My User ID</h4>
                    <form className="form my-2 px-0 my-lg-0 col-md-6">
                        <Input
                            id="userId"
                            autoComplete="off"
                            required="required"
                            type="email"
                            placeholder="eg. smith@gmail.com"
                            label="Enter Email ID"
                            className="form-control"
                            value={this.state.email}
                            textChange={this.handleChange}
                        />
                        <Button
                            type="button"
                            classname={"my-3 btn btn-primary " + this.state.visible}
                            label="Verify"
                            onClick={() => this.props.sendVerificationLink({ emailId: this.state.email })}
                            disable={!this.state.email}
                        />
                    </form>
                    {this.props.isSuccessLinkSent && <div className="MsgWithIcon MsgSuccessIcon">
                        <span className="text-success d-block mt-3 mb-2">Hi Adam Gibson, we found you.</span>
                    </div>}
                    {!this.props.isSuccessLinkSent && <div className={"MsgWithIcon MsgWrongIcon"}>
                        <span className="text-danger d-block mt-3 mb-2">We did not find your Email ID. Please retry or contact Support.</span>
                    </div>}
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={0} />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data) => dispatch(onUserEmailNext(data)),
        onClickPrevious: (data) => dispatch(onSetUserIdPrevious(data)),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data))
    }
}


function mapStateToProps(state) {
    return {
        isSuccessLinkSent: state.onboardingState.isLinkSent,
        userEmail: state.onboardingState.userEmail
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyUserID));