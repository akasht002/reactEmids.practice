import React from "react";
import './AboutUs.css';

export default class AboutContent extends React.Component {
    render() {
        return (
            <div className="AboutModalWidget">
                <span className="closeAboutModal" onClick={this.props.toggle}/>
                <div className='AboutModalTitle'>
                    <div className="AboutModalImg">
                        <img src={require('../../assets/images/logo/CoreoHomeGray.png')} alt="aboutUs" />
                    </div>
                </div>
                {this.props.aboutUsContent}
            </div>
        )
    }
}