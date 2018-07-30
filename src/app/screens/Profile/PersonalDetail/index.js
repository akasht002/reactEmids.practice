import React from "react";

import { Input, ProfileModalPopup, ModalPopup } from "../../../components";

// import './styles.css';

// let ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
// const images = require.context('../assets/img', true);
// const imagePath = (name) => images(name, true);

class PersonalDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            useEllipsis: true,
            EducationModal: false
        }
    }
    toggleEducation(action, e){
        this.setState({
            EducationModal: !this.state.EducationModal
        })
    }
    render() {
        let modalContent;
        let modalTitle;
        let modalType = '';
        const EducationModalContent = <div>Hi</div>
        let text = 'I am a 34 year enthusiast who is ready to serve the people in need. I have a total of 7 years of experience in providing home care to the patients. I also help in transportation, generally on the weekends. I hope I will be a great help to you.';
        return (
            <React.Fragment>
                <div className="col-md-12 card CardWidget SPDetails">
                    <div className={"SPDetailsContainer SPdpWidget"}>
                        <div className={"SPdpContainer"}>
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle"
                                    strokeDasharray="80, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            {/* <img className={"SPdpImage"} src={imagePath("./avatar/user-5.jpg")}/> */}
                            <img alt="profile-image" className={"SPdpImage"} src="http://lorempixel.com/1500/600/abstract/1" />
                        </div>
                        <span className={"SPRating"}><i
                            className={"Icon iconFilledStar"} />4.2</span>
                    </div>
                    <div className={"SPDetailsContainer SPNameWidget"}>
                        <div className={"d-flex"}>
                            <div className={"col-md-7 p-0"}>
                                <h3 className={"SPName"}>Adam Gibson</h3>
                                <p className={"SPsubTitle"}>
                                    <span>Male</span><span>34 years</span><span>7 years exp</span>
                                </p>
                            </div>
                            <div className={"col p-0"}>
                                <h3 className={"ratePerHour primaryColor"}><span>18</span></h3>
                            </div>
                        </div>
                        <div className={"width100"}>
                            <div className={"SPAffiliatedList"}>
                                <span className={"AffiliatedList"}>Affiliated to In <bd>Home Supportive Svc</bd></span>
                            </div>
                        </div>
                        <div className={"width100"}>
                            {this.state.useEllipsis
                                ? (
                                    <div>
                                        {/* <ResponsiveEllipsis
                                                            text={text}
                                                            maxLine='3'
                                                            ellipsis='...'
                                                            trimRight
                                                            className="SPDesc"
                                                        /> */}
                                        <i className={'readMore primaryColor'}
                                        // onClick={this.onTextClick.bind(this)}
                                        > <small>read more</small></i>
                                    </div>
                                )
                                : <div className={'SPDesc'}>{text} <i className={'readMore primaryColor'} onClick={this.onTextClick.bind(this)}><small>Show less</small></i></div>
                            }
                        </div>
                    </div>
                    <div className={"SPDetailsContainer SPAddressWidget"}>
                        <div className={"SPAddressContent"}>
                            <div className={"width100 SPAddressTitle d-flex"}>
                                <span className={"SPAddressText primaryColor"}>Address</span>
                            </div>
                            <div className={"width100 d-flex"}>
                                <span className={"AddressContentLabel"}>Street</span>
                                <span>3343 Kooter Lane</span>
                            </div>
                            <div className={"width100 d-flex"}>
                                <span className={"AddressContentLabel"}>City</span>
                                <span>Farmington</span>
                            </div>
                            <div className={"width100 d-flex"}>
                                <span className={"AddressContentLabel"}>State</span>
                                <span>West Virginia</span>
                            </div>
                            <div className={"width100 d-flex"}>
                                <span className={"AddressContentLabel"}>ZIP</span>
                                <span>26571</span>
                            </div>
                        </div>
                        <div className={"SPAddressContent"}>
                            <div className={"width100 SPAddressTitle d-flex"}>
                                <span className={"SPAddressText primaryColor"}>Phone</span>
                            </div>
                            <div className={"width100 d-flex"}>
                                <span>681-059-8197</span>
                            </div>
                        </div>
                    </div>
                    <i className={"SPIconMedium SPIconEdit SPIconEditPersonalDetails"}
                    //    onClick={this.togglePersonalDetails.bind(this)}
                    />
                </div>
                <ProfileModalPopup
                    isOpen={this.state.EducationModal}
                    toggle={this.toggleEducation.bind(this, modalType)}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal CertificationModal"
                    modalTitle={modalTitle}
                    centered="centered"
                    onClick={this.state.modalSaveAction}
                    disabled={this.state.disabledSaveBtn}
                />
            </React.Fragment>
        )
    }

}
export default PersonalDetail