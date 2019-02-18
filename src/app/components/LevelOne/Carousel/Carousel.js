import React, { Component } from 'react';
import Slider from "react-slick";
import { PropTypes } from 'prop-types';
import "./styles.css";
class Carousel extends Component {
    render(){
        const  ServiceTypeSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            variableWidth: true
        }
        return(
            <Slider className={this.props.className} {...ServiceTypeSettings}>
                {this.props.children}
            </Slider>
        )
    }
}

Carousel.propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object
    
}

export default Carousel;