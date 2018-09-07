import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import { ProfileHeader } from '../../../components'
import ServiceOffered from "../ServiceOffered/index";
import Languages from "../Languages/index";
import Certification from "../Certification/index";
import Education from "../Education/index";
import PersonalDetail from "../PersonalDetail";
import Organization from "../Organization"
import WorkHistory from "../WorkHistory";
import Skills from "../Skills/index";
import {Path} from '../../../routes';
import { getProfilePercentage } from '../../../redux/profile/ProgressIndicator/actions'
import Availability from "../Availability/index";
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'

import './styles.css';

class Profile extends Component {
    
    componentDidMount() {
        this.props.getProfilePercentage();
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
                                    <Link className='BrandLink' to={Path.dashboard}>
                                    <i className="Icon icon-back" /></Link>
                                        Profile
                                    </h4>
                                </div>
                                {/* Added for story number CH-302 */}
                                {SERVICE_PROVIDER_TYPE_ID === 1 ?
                                    <PersonalDetail
                                        profilePercentage={this.props.profilePercentage} /> :
                                    <Organization
                                        profilePercentage={this.props.profilePercentage} />}
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

                                <div className="col-md-12 card CardWidget SPCertificate">
                                  <Availability />
                                </div>

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
        getProfilePercentage: () => dispatch(getProfilePercentage()),
    }
};

function mapStateToProps(state) {
    return {
        profilePercentage: state.profileState.progressIndicatorState.profilePercentage
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
