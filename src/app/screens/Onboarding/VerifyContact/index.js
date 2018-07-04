import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { sendTemporaryPasscode, verifyTempPasscode } from '../../../redux/onboarding/actions';
import { Input, Button, ScreenCover, CoreoWizScreen, CoreoWizFlow } from '../../../components';


class VerifyContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: 'd-block',
            invisible: 'd-none',
            temporaryPassCode: ''
        };
    };

    handleClick = () => {
        //API Call not there as of now
        this.setState({
            visible: 'd-none',
            invisible: 'd-block'
        }); 
        debugger;
        let data = this.props;
        this.props.sendPassCode(this.props.serviceProviderDetails);
    };

    onClickButtonNext = () => {
        this.props.verifyPasscode(this.props.serviceProviderDetails);
    }

    onClickButtonCancel = () => {
        this.props.onClickCancel();
    }

    onClickButtonPrevious = () => {
        this.props.onClickPrevious();
    }

    render() {
        const menus = ["Contact"];

        return (
            <ScreenCover>
                <CoreoWizScreen menus={menus} activeCoreoWiz={1} displayNextButton={true} displayPrevButton={true} isNextDisabled={!this.state.temporaryPassCode} onNextClick={this.onClickButtonNext} onPreviousClick={this.onClickButtonPrevious} onCancelClick={this.onClickButtonCancel}>
                    <h4 className="font-weight-normal mb-4">Verify My Mobile Number</h4>
                    <p className="m-0">Your Registered Contact Number</p>
                    <p className="contactNumber">{this.props.serviceProviderDetails.mobileNumber}</p>
                    <div className={"my-5 tempPassword " + this.state.visible}>
                        <Button
                            type="button"
                            classname="btn btn-primary"
                            label="Send Temporary Passcode"
                            onClick={this.handleClick}
                        />
                        <span className="d-block my-3 text-muted">A temporary passcode will be sent to your registered Contact Number</span>
                    </div>
                    <div className={"tempPassForm " + this.state.invisible}>

                        <form className="form my-2 px-0 my-lg-0 col-md-6">
                            <Input
                                id="passcode"
                                autoComplete="off"
                                required="required"
                                type="text"
                                label="Enter temporary passcode"
                                className="form-control"
                                value={this.state.temporaryPassCode}
                                textChange={(e) => this.setState({ temporaryPassCode: e.target.value })}
                            />
                        </form>
                        <span className="text-success MsgWithIcon MsgSuccessIcon">The temporary password has been sent to your registered Contact Number.</span>
                        <div className="m-0 font-weight-bold receivePass">Didn’t receive your password yet? <Link className="primaryColor px-1" to="/">Click here</Link> to resend.</div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={CoreoWizNavigationData} activeFlowId={1} />
            </ScreenCover>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(push("/")),
        onClickNext: () => dispatch(push("/setPassword")),
        onClickPrevious: () => dispatch(push("/verifyemail")),
        sendPassCode: (data) =>(dispatch(sendTemporaryPasscode(data))),
        verifyPasscode: (data)=>(dispatch(verifyTempPasscode(data)))
    }
};

function mapStateToProps(state){
    return{
        serviceProviderDetails: state.onboardingState.serviceProviderDetails,
        isPasscodeSent : state.onboardingState.isPasscodeSent
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyContact));