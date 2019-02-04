import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ScreenCover, Button } from '../../components';
import { onLogin } from '../../redux/auth/login/actions';
import {SLIDER_TIME} from '../../constants/config';
import './styles.css';

const images = require.context('../../assets/images/home', true);
const imagePath = (name) => images(name, true);

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            slider: [
                {
                    title: 'Your Caring Companion',
                    label: 'Instantly matching Service Providers to seamlessly fulfill your needs',
                },
                {
                    title: 'Your Caring Compassion',
                    label: 'Instantly matching Service Providers to seamlessly fulfill your needs',
                },
                {
                    title: 'Your Caring Companion',
                    label: 'Instantly matching Service Providers to seamlessly fulfill your needs',
                }
            ],
            activeIndex: 1,
            left: 0,
            sliderWidth: window.innerWidth,
            sliderHeight: window.innerHeight,
        });
        this.interval = setInterval(() => {
            this.nextSlide();
        }, SLIDER_TIME);
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
    };

    clickIndicator(e) {
        this.setState({
            activeIndex: parseInt(e.target.textContent, 10),
            left: this.state.sliderWidth - parseInt(e.target.textContent, 10) * this.state.sliderWidth
        });
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({ sliderWidth: window.innerWidth, sliderHeight: window.innerHeight });
    }

    onLoginPress = () => {
        this.props.onLogin();
    }

    render() {
        const menus = ["login"];
        const style2 = {
            width: (this.state.sliderWidth * this.state.slider.length) + 'px',
        };
        const style3 = {
            width: this.state.sliderWidth
        };
        return (
            <ScreenCover menus={menus}>
                <div className="container-fluid p-0">
                    <div className="width100 onBoardingWidget">
                        <div className="container-fluid onBoardingContent">
                            <div className="row">
                                <div className="onBoardingHeader">
                                    <span className="brandName text-uppercase">
                                        <img src={require('../../assets/images/logo/CoreoHomeWhite.png')} alt="coreoLogo" />
                                    </span>
                                    {/* text-uppercase  */}
                                    <Button type="button" onClick={this.onLoginPress} classname="btn btn-outline-primary LoginButton change-f" label={"Login"} />
                                </div>
                                <div className="sliderWrapper" style={style3}>
                                    <div className="sliderContainer">
                                        <div className="slider" style={style2}>
                                            {this.state.slider.map((item, index) => {
                                                const style1 = {
                                                    width: this.state.sliderWidth + 'px',
                                                    height: this.state.sliderHeight + 'px',
                                                    backgroundImage: 'linear-gradient(rgba(60, 16, 83, .35), rgba(102, 48, 127, .35)), url(' + imagePath("./coverImg" + this.state.activeIndex + ".jpg") + ')'
                                                };
                                                return (
                                                    <div style={style1}
                                                        className={index + 1 === this.state.activeIndex ? 'sliderItem slide1' : 'hide slide1'}>
                                                        <div className="sliderInnerContent">
                                                            <h1 className="sliderTitleText">{item.title}</h1>
                                                            <span className="sliderLabelText">{item.label}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
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
                                    {/*  text-uppercase */}
                                        <Link className="btn btn-outline-primary" to="/verifyemail">Get Started</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: () => dispatch(onLogin())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Welcome));
