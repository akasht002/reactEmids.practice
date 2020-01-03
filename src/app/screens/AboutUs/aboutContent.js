import React from "react";
import './AboutUs.css';

export class AboutContent extends React.Component {
    render() {
        return (
            <div className="AboutModalWidget">
                <span className="closeAboutModal" onClick={this.props.toggle}/>
                <div className='AboutModalTitle theme-primary-gradient'>
                    <img className="bgImage" src={require('./images/about_us_header_bg.png')} alt="aboutUSHeader" />
                    <div className="AboutTitleImage">
                        <img src={require('../../assets/images/logo/CoreoHomeWhite.png')} alt="logo" />
                    </div>
                </div>
                <div className='AboutModalContent theme-primary'>
                    <span class="version">Version: {this.props.buildVersion} - SP</span>
                    {this.props.aboutUsContent}
                    <div className='AboutContentContainer Right'>
                        <h4>Reach out to us at</h4>
                        <span className="LinkCard"><img src={require('./images/about_translation.svg')} alt="translation" />
                        <a rel="noopener noreferrer" href='https://www.navvishealthcare.com' target="_blank">www.navvishealthcare.com</a></span>
                        {/* <span className="LinkCard"><img src={require('./images/about_email.svg')} alt="email" />help@coreohomesupport.com</span>
                        <span className="LinkCard"><img src={require('./images/about_phone_call.svg')} alt="phoneCall" />+1 180 234 2300</span> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default  AboutContent