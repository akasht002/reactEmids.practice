import React from "react";
import Header from "primary_path/components/Dashboard/ProfileHeader";
import {Link} from "react-router-dom";
import Scrollbars from 'primary_path/components/CSB';
import ProfileSidePanel from "primary_path/components/Dashboard/ProfileSidePanel";
import Summary from "primary_path/components/Dashboard/VisitHistory/Summary";
import ServiceProviderModalTemplate from "primary_path/components/ProfileModal";
import Feedback from "primary_path/components/Dashboard/VisitProcessing/FeedbackContent";

import 'primary_path/components/Dashboard/styles/dashboard.css'
import 'primary_path/components/Dashboard/styles/visitProcessing.css'

const images = require.context('primary_path/assets/img', true);
const imagePath = (name) => images(name, true);

class VisitSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
        };
        this.FeedbackModal = () => {
            this.setState({
                modal: !this.state.modal
            });
        };
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        let ModalContent = '';

        if (this.state.modal) {
            ModalContent = <Feedback/>;
        }

        return (
            <section className="d-flex">
                <ProfileSidePanel isOpen={this.state.isOpen}/>
                <div className="container-fluid ProfileRightWidget">
                    <Header toggle={this.toggle.bind(this)}/>
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)}/>
                    <div className='ProfileRightContainer'>
                        <div className='ProfileHeaderWidget'>
                            <div className='ProfileHeaderTitle'>
                                <h5 className='primaryColor m-0'>Service Request <span>/ VID97531</span></h5>
                            </div>
                        </div>
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                                    className='ProfileContentWidget'>
                            <div className='card mainProfileCard'>
                                <div className='CardContainers TitleWizardWidget'>
                                    <div className='TitleContainer'>
                                        <Link className="TitleContent backProfileIcon" to="/"/>
                                        <div className='requestContent'>
                                            <div className='requestNameContent'>
                                                <span><i className='requestName'>Sun, 24 Aug, Morning</i>VID97531</span>
                                            </div>
                                            <div className='requestImageContent'>
                                            <span className="IndividualName"><img
                                                src={imagePath("./avatar/user-10.jpg")}
                                                className="avatarImage avatarImageBorder"/><i className='requestName'>Christopher W</i>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers ServiceCategoryWidget'>
                                    <Summary FeedbackModal={this.FeedbackModal} />
                                </div>
                            </div>
                            <div className='cardBottom'/>
                        </Scrollbars>
                        <ServiceProviderModalTemplate
                            isOpen={this.state.modal}
                            toggle={this.FeedbackModal}
                            ModalBody={ModalContent}
                            className="modal-lg FeedbackModal"
                            modalTitle="Feedback"
                            centered="centered"
                        />
                    </div>
                </div>
            </section>
        )
    }
}

export default VisitSummary;