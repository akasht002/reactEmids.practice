import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVisitServiceList } from '../../../redux/visitSelection/VisitServiceList/actions';
import { getVisitServiceDetails } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import Moment from 'react-moment';

class VisitServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = { serviceRequestId: '' };
    };

    componentDidMount() {
        this.props.getVisitServiceList();
    }

    handleClick = (requestId) => {
        // this.setState({
        //     serviceRequestId: requestId
        // })
        // //console.log('aaaaaa' + this.state.serviceRequestId)
        this.props.getVisitServiceDetails(requestId)
    }

    render() {

        let visitList = this.props.visitServiceList && this.props.visitServiceList.map(serviceList => {
            return (
                <div className="col-md-4" key={serviceList.serviceRequestId} >
                    <div className="card" onClick={() => this.handleClick(serviceList.serviceRequestId)}>
                        <div className="card-body">

                            {serviceList.serviceRequestTypeDetails && serviceList.serviceRequestTypeDetails.map((serviceType) => {
                                return (
                                    <p key={serviceType.serviceTypeId}>{serviceType.serviceTypeDescription}</p>
                                )
                            })
                            }
                            <p>{serviceList.serviceRequestDescription}</p>
                            <p>{serviceList.recurringPatternDescription} | <Moment format="MMM DD">{serviceList.startDate}</Moment> - <Moment format="MMM DD">{serviceList.endDate}</Moment></p>
                        </div>
                        <div className="card-footer">
                            <p>{serviceList.patientName}</p>
                            <p>Posted On: <Moment format="DD MMM">{serviceList.requestDate}</Moment></p>
                            <p>Status: {serviceList.statusName}</p>
                            <img src={"data:image/png;base64," + serviceList.patientImage} alt="patientImage" />
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
        getVisitServiceDetails: (data) => dispatch(getVisitServiceDetails(data))
    }
};

function mapStateToProps(state) {
    return {
        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));
