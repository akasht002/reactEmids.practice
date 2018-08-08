import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from '../../../redux/navigation/actions';
import { Path } from '../../../routes';
import { getVisitServiceDetails } from '../../../redux/visitSelection/VisitServiceDetails/actions';

class VisitServiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { visitServiceDetails: '' }
    };

    componentDidMount() {
        this.props.getVisitServiceDetails();

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visitServiceDetails: nextProps.VisitServiceDetails })
    }

    visitService = () => {
        this.props.visitService()
    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="container">
                        <div className="card">
                            <div className="card-header"><span><h1 onClick={this.visitService}> X </h1> Request ID  {this.state.visitServiceDetails.ServiceRequestId}</span></div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="card-header">
                                            <h6>Posted By</h6>
                                            <p>{this.state.visitServiceDetails.PostedBy}</p>
                                            <p>{this.state.visitServiceDetails.PostedOn}</p>
                                            <br />
                                            <br />
                                            <button type="button" className="btn btn-primary">Click to Begin</button>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-header">
                                            <h6>Service Category</h6>
                                            <p>{this.state.visitServiceDetails.ServiceCategory}</p>
                                            <br />
                                            <br />
                                            <h6>Service Types</h6>
                                            {this.state.visitServiceDetails && this.state.visitServiceDetails.ServiceTypes.map(st => {
                                                return (
                                                    <p key={st.id}>{st.name}</p>
                                                )
                                            })}
                                            <br />
                                            <br />
                                            {this.state.visitServiceDetails && this.state.visitServiceDetails.ServiceTasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.name}</li>
                                                )
                                            })}
                                            <br />
                                            <br />
                                            <h6>Description</h6>
                                            <p>{this.state.visitServiceDetails.ServiceRequestDescription}</p>
                                            <br />
                                            <br />
                                            <h6>Special Care Considerations</h6>
                                            <br />
                                            <br />
                                            {this.state.visitServiceDetails && this.state.visitServiceDetails.SpecialCareConsiderations.map(scd => {
                                                return (
                                                    <p key={scd.id}>{scd.name}</p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
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
        getVisitServiceDetails: () => dispatch(getVisitServiceDetails()),
        visitService: () => dispatch(push(Path.visitServiceList))
    }
};

function mapStateToProps(state) {
    return {
        VisitServiceDetails: state.visitSelectionState.VisitServiceDetailsState.VisitServiceDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails));
