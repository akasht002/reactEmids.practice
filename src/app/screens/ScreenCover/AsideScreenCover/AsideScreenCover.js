import React from "react";
import { Link } from "react-router-dom"
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

    render() {
        return (
            <section className="d-flex">
                <div className={"ProfileLeftWidget " + this.props.isOpen}>
                    <div className='BrandNameWidget'>
                        <div className='BrandName'>
                            <Link className='BrandLink' to='/'>Coreo Home</Link>
                        </div>
                    </div>
                    <ProfileImage />
                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                            <p>John Smith</p>
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