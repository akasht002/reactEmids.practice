import React, { Component } from 'react';
import Slider from "react-slick";
import { PropTypes } from 'prop-types';
import "./styles.css";
class DashboardCarousel extends Component {
    render(){
        return(
            <Slider className={this.props.className} settings = {this.props.settings}>
                {this.props.children}
            </Slider>
        )
    }
}

DashboardCarousel.propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object
    
}

export default DashboardCarousel;