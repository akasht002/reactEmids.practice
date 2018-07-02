import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { FloatLabelInput, Button, ScreenCover, CoreoWizScreen, CoreoWizFlow } from '../../../components';


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
        this.setState({
            visible: 'd-none',
            invisible: 'd-block'
        });
    };

    onClickButtonNext = () => {
        this.props.onClickNext();
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
                    <p className="contactNumber">XXXXXXX8541</p>
                    <div className={"my-5 tempPassword " + this.state.visible}>
                        <Button
                            type="button"
                            classname="btn btn-primary"
                            label="Send Temporary Passcode"
                            onClick={this.handleClick}
                        />
                        <span className="text-muted">A temporary passcode will be sent to your registered Contact Number</span>
                    </div>
                    <div className={"tempPassForm " + this.state.invisible}>

                        <form className="form my-2 px-0 my-lg-0 col-md-6">
                            <FloatLabelInput
                                id="userId"
                                autoComplete="off"
                                required="required"
                                type="email"
                                placeholder="Enter temporary passcode"
                                label="Enter temporary passcode"
                                className="mr-sm-2"
                                value={this.state.temporaryPassCode}
                                onChange={(e) => this.setState({ temporaryPassCode: e.target.value })}
                            />
                        </form>
                        <span className="text-success d-block my-5">The temporary password has been sent to your registered Contact Number.</span>
                        <div className="m-0 font-weight-bold receivePass">Didn’t receive your password yet? <Link className="px-1" to="/"> Click here </Link> to resend.</div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow activeCoreoWiz={1} />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(push("/")),
        onClickNext: () => dispatch(push("/setPassword")),
        onClickPrevious: () => dispatch(push("/verifyemail"))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(VerifyContact));