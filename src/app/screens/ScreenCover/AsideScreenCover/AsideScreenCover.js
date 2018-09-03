import React from "react";
import Select from "react-select"
import { Link } from "react-router-dom"
// import { ACTIVE, VISITED } from "../../../../constants/constants";
import { AsideMenu, ProfileHeader, ProfileImage } from '../../../components';
import { MenuData } from '../../../data/MenuData';

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
        /*window.location = '/dashboard';*/
    };

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
                    />
                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                            <p>John Smith</p>
                            {/* <div className="form-group">
                        
                            <Select
                                id="ProfileName"
                                multiple={false}
                                className="SelectFormControl"
                                searchable={false}
                                options={[
                                    {label: "John Smith", value: '1'},
                                    {label: "Brett Smith", value: '2'},
                                ]}
                                onChange={this.optionChanged.bind(this)}
                                value={this.state.selectedValue}
                            />
                        </div> */}
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

export default AsideScreenCover;