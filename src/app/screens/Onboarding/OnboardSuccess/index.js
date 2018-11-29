import React from "react";
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import { ScreenCover } from '../../../components'
import { onLogin } from '../../../redux/auth/login/actions';
import './styles.css';
import '../styles.css';

class OnboardSuccess extends React.Component {

    onLoginPress = () => {
        this.props.onLogin();
    }

    render() {
        const menus = ["login"];
        return (
            <ScreenCover menus={menus}>
                <div className="container-fluid p-0">
                    <div className="width100 onBoardingWidget">
                        <div className="container-fluid onBoardingContent">
                            <div className="row">
                                <div className="onBoardingHeader">
                                    <Link className="brandName text-uppercase" to="/">
                                        <img src={require('../../../assets/images/logo/CoreoHomeWhite.png')} alt="coreoLogo" />
                                    </Link>
                                </div>
                                <div className="onBoardSuccessWidget">
                                    <div className="onBoardSuccessContainer">
                                        <span className="onBoardSuccessIcon"/>
                                        <span className="onBoardSuccessText my-3 mb-4">You are successfully onboarded!</span>
                                        <button type="button" class="onBoardSuccessBtn btn btn-primary" onClick={this.onLoginPress}>Continue</button>
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
};

function mapStateToProps(state) {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnboardSuccess));