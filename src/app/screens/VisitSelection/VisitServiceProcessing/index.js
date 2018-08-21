import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { LeftSideMenu, ProfileHeader, Scrollbars } from '../../../components';
import './style.css'

class VisitServiceProcessing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return (
            <section className="d-flex">
                <LeftSideMenu isOpen={this.state.isOpen} />
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.toggle} />
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)} />
                    <div className='ProfileRightContainer'>
                        <div className='ProfileHeaderWidget'>
                            <div className='ProfileHeaderTitle'>
                                <h5 className='primaryColor m-0'>Service Requests <span>/ VID97531</span></h5>
                            </div>
                        </div>
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                            className='ProfileContentWidget'>
                            <div className='card mainProfileCard'>
                                <div className='CardContainers TitleWizardWidget'>
                                    <div className='TitleContainer'>
                                        <Link className="TitleContent backProfileIcon" to="/" />
                                        <div className='requestContent'>
                                            <div className='requestNameContent'>
                                                <span><i className='requestName'>Sun, 24 Aug, Morning</i>VID97531</span>
                                            </div>
                                            <div className='requestImageContent'>
                                                <span>
                                                    <i className='requestName'>Christopher W</i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers WizardWidget'>
                                    <div className="row">
                                        <div className="col col-md-9 WizardContent">
                                        </div>
                                        <div className="col col-md-3 rightTimerWidget">
                                            <div className="row rightTimerContainer">
                                                <div className="col-md-5 rightTimerContent">
                                                    <span className="TimerContent">01<i>:</i>45</span>
                                                </div>
                                                <div className="col-md-7 rightTimerContent">
                                                    <Link className="btn btn-primary" to="/">Stop Service</Link>
                                                    <span className="TimerStarted">Started at 12:30 pm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers ServiceCategoryWidget'>
                                </div>
                            </div>
                            <div className='cardBottom' />
                        </Scrollbars>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(connect(VisitServiceProcessing));
