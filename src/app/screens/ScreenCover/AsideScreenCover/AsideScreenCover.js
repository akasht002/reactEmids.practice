import React from "react";
import { Link } from "react-router-dom"
// import { ACTIVE, VISITED } from "../../../../constants/constants";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideMenu, ProfileHeader, ProfileImage } from '../../../components';
import { getProfilePercentage } from '../../../redux/profile/ProgressIndicator/actions';
import { MenuData } from '../../../data/MenuData';
import {Path} from '../../../routes/';

import './style.css'

class AsideScreenCover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: { label: "Brett Smith", value: '2' },
        };
    };

    optionChanged(e) {
        this.setState({
            selectedValue: e
        });
    };

    componentDidMount() {
        this.props.getProfilePercentage();
    }

    render() {
        return (
            <section className="d-flex">
                <div className={"ProfileLeftWidget " + this.props.isOpen}>
                    <div className='BrandNameWidget'>
                        <div className='BrandName'>
                            <Link className='BrandLink' to='/'>Coreo Home</Link>
                        </div>
                    </div>
                   <ProfileImage
                        src={this.props.patientImage}
                        profilePercentage={this.props.profilePercentage}
                    /> 
                    
                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                        <Link className='BrandLink' to={Path.profile}> <p>John Smith</p></Link>
                        </div>
                    </div>
                    <AsideMenu menuData={MenuData} />
                </div>
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.props.toggle} />
                    <div className={'hiddenScreen ' + this.props.isOpen} onClick={this.props.toggle} />
                    <div className='ProfileRightContainer'>
                        {this.props.children}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AsideScreenCover));