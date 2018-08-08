import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { Path } from '../../../routes';
import { getVisitServiceList } from '../../../redux/visitSelection/VisitServiceList/actions';

class VisitServiceList extends Component {

    componentDidMount() {
        this.props.getVisitServiceList();
    }

    visit = () => {
        this.props.visitServiceDetails()
    }

    render() {

        let visitList = this.props.visitServiceList && this.props.visitServiceList.map(serviceList => {
            return (
                <div className="col-md-4" key={serviceList.ServiceRequestId}>
                    <div className="card">
                        <div className="card-body" onClick={this.visit}>
                            <p>{serviceList.ServiceTypes}</p>
                            <p>{serviceList.ServiceCategory}</p>
                            <p>{serviceList.RecurringPattern} | {serviceList.DateRange}</p>
                        </div>
                        <div className="card-footer">
                            <p>{serviceList.PostedBy}</p>
                            <p>Posted On {serviceList.PostedOn}</p>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div className="row">
                    {visitList}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceList: () => dispatch(getVisitServiceList()),
        visitServiceDetails: () => dispatch(push(Path.visitServiceDetails))
    }
};

function mapStateToProps(state) {
    return {
        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));
