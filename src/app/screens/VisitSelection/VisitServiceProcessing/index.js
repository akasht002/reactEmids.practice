import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { Path } from '../../../routes';
import PerformTasks from './PerformTasks/index'
// import { getVisitServiceList } from '../../../redux/visitSelection/VisitServiceList/actions';

class VisitServiceProcessing extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <PerformTasks />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
};

function mapStateToProps(state) {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceProcessing));
