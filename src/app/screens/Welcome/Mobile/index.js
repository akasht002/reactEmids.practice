import React, { Component, Fragment } from 'react';
import './styles.css';

export class MobileLanding extends Component {

    render() {
        return (
            <Fragment>
                <div className="full-block-view">
                    <div className="innerview-bg">
                        <div className="info-view">
                            <img alt="" className="logo-coreo" src={require("../../../../app/assets/MobileBannerImages/CoreoHomeWhite.png")} />
                            <p>Download the app to instantly match</p>
                            <p>Service Providers who will seamlessly fullfill</p>
                            <p>your needs.</p>
                            <div className="view-appblock">
                                <ul>
                                    <li><a><img alt="" src={require("../../../../app/assets/MobileBannerImages/download_on_app_store.png")} /></a></li>
                                    <li><a><img alt="" src={require("../../../../app/assets/MobileBannerImages/download_on_play_store.png")} /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MobileLanding;