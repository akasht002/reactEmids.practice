import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ScreenCover } from '../../../components'
import { continueToProfile } from '../../../redux/onboarding/OnboardSuccess/actions';

class OnboardSuccess extends React.Component {

    continueToProfile = () => {
        this.props.continueToProfile();
    }

    render() {
        const menus = ["login"];
        return (
            <ScreenCover menus={menus}>
                <div className="container mainContent">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 d-flex justify-content-center">
                            <h4 className="font-weight-normal mb-4 text-success">You are successfully onboarded!!</h4>
                        </div>
                        <button type="button" class="btn btn-success" onClick={this.continueToProfile}>CONTINUE</button>
                    </div>
                </div>
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        continueToProfile: () => dispatch(continueToProfile()),
        navigateToScreenMainStack: (url) => dispatch(url),
        onLogout: () => dispatch()
    }
};

function mapStateToProps(state) {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnboardSuccess));