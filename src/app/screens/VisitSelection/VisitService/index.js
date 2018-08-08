import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVisitServiceList } from '../../../redux/visitSelection/VisitService/actions';

class VisitService extends Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.getVisitServiceList();
    }

    render() {
        console.log(this.props.visitServiceList)
        return (
            <div>
                <div className="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h1>Bathing, Grooming, Nursing</h1>
                                <h2>Activity of daily living</h2>
                                <h3>One Time | 08 Aug</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h1>Bathing, Grooming, Nursing</h1>
                                <h2>Activity of daily living</h2>
                                <h3>One Time | 08 Aug</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h1>Bathing, Grooming, Nursing</h1>
                                <h2>Activity of daily living</h2>
                                <h3>One Time | 08 Aug</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceList: () => dispatch(getVisitServiceList()),
    }
};

function mapStateToProps(state) {
    return {
        visitServiceList: state.visitSelectionState.VisitServiceState.visitServiceList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitService));
