import React, { PureComponent } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Button } from '../../components';
import { onLogin } from '../../redux/auth/login/actions';
import { onLogout } from '../../redux/auth/logout/actions';
import  '../../styles/onBoarding.css';
import { loadData } from '../../utils/storage';
import { slider } from '../../data/HomeScreen'

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = ({
            slider: slider,
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
        window.addEventListener('resize', this.updateWindowDimensions());
        let test = loadData("userData");
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        window.removeEventListener('resize', this.updateWindowDimensions());
    }

    updateWindowDimensions = () => {
        this.setState({sliderWidth: window.innerWidth, sliderHeight: window.innerHeight});
    }

    onLoginPress = () => {
        this.props.onLogin();
    }

    onLogOutPress = () => {
        this.props.onLogout();
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
                                    <Button
                                            type="submit"
                                            classname="btn btn-primary"
                                            label={this.props.user ? "Log Out" : "Log In"}
                                            onClick={this.props.user ? this.onLogOutPress : this.onLoginPress}/>
                                </div>
                                <div className="sliderWrapper" style={style3}>
                                    <div className="sliderContainer">
                                        <div className="slider" style={style2}>
                                            {this.state.slider.map(function (item, index) {
                                                const style1 = {
                                                    /*left: this.state.left,*/
                                                    width: this.state.sliderWidth + 'px',
                                                    height: this.state.sliderHeight + 'px',
                                                    backgroundImage: 'linear-gradient(rgba(60, 16, 83, .35), rgba(102, 48, 127, .35)), url("../assets/images/home/coverImg'+ (index+1) +'.jpg")'
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

function mapDispatchToProps(dispatch) {
  return {
      onLogin: () => dispatch(onLogin()),
      onLogout: () => dispatch(onLogout())
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
