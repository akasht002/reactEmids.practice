import React, { Component } from "react";
import { ProfileHeader, ScreenCover } from '../../../components'
import ServiceOffered from "../ServiceOffered/index";
import Languages from "../Languages/index";
import Certification from "../Certification/index";
import Education from "../Education/index";
import PersonalDetail from "../PersonalDetail";
import Organization from "../Organization"
import WorkHistory from "../WorkHistory";
import Skills from "../Skills/index";
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'

import './styles.css';

class Profile extends Component {

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <ScreenCover>
                <div className="container-fluid p-0">
                    <ProfileHeader />
                    <div className="width100 mainWidgetProfile mainWidgetOverflow">
                        <div className="width100 topWidgetBG" />
                        <div className="container mainProfileContent bgWhite">
                            <div className="row d-flex justify-content-center m-auto">
                                <div className="col-md-12">
                                    <h4 className="my-3 text-white SPTitleText">
                                        <a><i className="Icon icon-back" /></a>
                                        Profile
                                    </h4>
                                </div>
                                {/* Added for story number CH-302 */}
                                {SERVICE_PROVIDER_TYPE_ID === 1 ? <PersonalDetail /> : <Organization/> }
                                <div className="col-md-12 card CardWidget SPCertificate">
                                    <ServiceOffered />
                                </div>
                                <div className="col-md-12 card CardWidget SPCertificate">
                                    <Skills />
                                </div>
                                <div className="col-md-12 card CardWidget SPLanguages">
                                    <Languages />
                                </div>
                                <div className="col-md-12 card CardWidget SPCertificate">
                                    <Certification />
                                </div>

                                <WorkHistory />
                                <Education />

                            </div>
                        </div>
                    </div>
                </div>
            </ScreenCover>
        )
    }
}

export default Profile;
