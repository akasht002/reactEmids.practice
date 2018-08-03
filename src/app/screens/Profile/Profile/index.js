import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ProfileHeader } from '../../../components'
import ServiceOffered from "../ServiceOffered/index";
import Languages from "../Languages/index";
import Certification from "../Certification/index";
import Education from "../Education/index";
import PersonalDetail from "../PersonalDetail/index";
import WorkHistory from "../WorkHistory";
import Skills from "../Skills/index";

import './styles.css';

class Profile extends Component {

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <section className="d-flex">
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
                                <div className="col-md-12 card CardWidget SPCertificate">
                                    <PersonalDetail />                                   
                                </div>
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
            </section>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
};

function mapStateToProps(state) {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
