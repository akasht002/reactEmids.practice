import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCertification } from '../../../redux/profile/Certification/actions';

class VisitService extends Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-body">
                        <h1>Bathing, Grooming, Nursing</h1>
                        <h2>Activity of daily living</h2>
                        <h3>One Time | 08 Aug</h3>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getCertification: () => dispatch(getCertification()),

    }
};

function mapStateToProps(state) {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitService));
