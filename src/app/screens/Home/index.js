import React from "react";
import {Link} from "react-router-dom";

import  '../../styles/onBoarding.css'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            slider: [
                {
                    title: 'Your Caring Companion',
                    label: 'Instantly matching Service Providers which seamlessly fulfill your care needs',
                },
                {
                    title: 'Your Caring Compassion',
                    label: 'Instantly matching Service Providers which seamlessly fulfill your care needs',
                },
                {
                    title: 'Your Caring Companion',
                    label: 'Instantly matching Service Providers which seamlessly fulfill your care needs',
                },
                {
                    title: 'Your Caring Compassion',
                    label: 'Instantly matching Service Providers which seamlessly fulfill your care needs',
                },
                {
                    title: 'Your Caring Companion',
                    label: 'Instantly matching Service Providers which seamlessly fulfill your care needs',
                },
            ],
            activeIndex: 1,
            left: 0,
            sliderWidth: window.innerWidth,
            sliderHeight: window.innerHeight,
        });
    };

    prevSlide() {
        this.setState({
            activeIndex: this.state.activeIndex - 1,
            left: this.state.left + this.state.sliderWidth,
        });
        if (this.state.activeIndex === 1) {
            this.setState({
                activeIndex: this.state.activeIndex + this.state.slider.length - 1,
                left: this.state.left - this.state.sliderWidth * (this.state.slider.length - 1),
            })
        }
    };

    nextSlide() {
        if (this.state.activeIndex === this.state.slider.length) {
            this.setState({
                activeIndex: this.state.activeIndex - this.state.slider.length + 1,
                left: 0,
            })
        } else {
            this.setState({
                activeIndex: this.state.activeIndex + 1,
                left: this.state.left - this.state.sliderWidth,
            });
        }
        console.log(this.state.sliderTimer);
    };

    clickIndicator(e) {
        this.setState({
            activeIndex: parseInt(e.target.textContent),
            left: this.state.sliderWidth - parseInt(e.target.textContent) * this.state.sliderWidth
        });
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({sliderWidth: window.innerWidth, sliderHeight: window.innerHeight});
    }

    render() {
        const style2 = {
            width: (this.state.sliderWidth * this.state.slider.length) + 'px',
        };
        const style3 = {
            width: this.state.sliderWidth
        };

        return (
            <section className="d-flex">
                <div className="container-fluid p-0">
                    <div className="width100 onBoardingWidget">
                        <div className="container-fluid onBoardingContent">
                            <div className="row">
                                <div className="onBoardingHeader">
                                    <Link className="brandName text-uppercase" to="/">Coreo Home</Link>
                                    <Link className="btn btn-primary text-uppercase" to="/">Login</Link>
                                </div>
                                <div className="sliderWrapper" style={style3}>
                                    <div className="sliderContainer">
                                        <div className="slider" style={style2}>
                                            {this.state.slider.map(function (item, index) {
                                                const style1 = {
                                                    /*left: this.state.left,*/
                                                    width: this.state.sliderWidth + 'px',
                                                    height: this.state.sliderHeight + 'px',
                                                    backgroundImage: 'linear-gradient(rgba(60, 16, 83, .35), rgba(102, 48, 127, .35)), url("../assets/img/coverImg'+ (index+1) +'.jpg")'
                                                };
                                                return (
                                                    <div style={style1}
                                                        className={index + 1 === this.state.activeIndex ? 'sliderItem' : 'hide'}>
                                                        <div className="sliderInnerContent">
                                                        <h1 className="sliderTitleText">{item.title}</h1>
                                                        <span className="sliderLabelText">{item.label}</span>
                                                        </div>
                                                        </div>
                                                )
                                            }, this)
                                            }
                                        </div>
                                    </div>
                                    {/*<div className="buttonsWrapper">
                                        <button className="prevButton" onClick={this.prevSlide.bind(this)}/>
                                        <button className="nextButton" onClick={this.nextSlide.bind(this)}/>
                                    </div>*/}
                                    <div className="indicatorsWrapper">
                                        <ul className="indicators">
                                            {this.state.slider.map(function (item, index) {
                                                return (
                                                    <li className={index + 1 === this.state.activeIndex ? 'activeIndicator' : ''}
                                                        onClick={this.clickIndicator.bind(this)}>{index + 1}</li>
                                                )
                                            }, this)
                                            }
                                        </ul>
                                    </div>
                                    <div className="GetStartedBtnContainer">
                                        <Link className="btn btn-outline-primary text-uppercase" to="verifyemail">Get started</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Home;