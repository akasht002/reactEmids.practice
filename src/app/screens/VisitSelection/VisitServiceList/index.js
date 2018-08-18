import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getVisitServiceList } from '../../../redux/visitSelection/VisitServiceList/actions';
import { getVisitServiceDetails } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import Moment from 'react-moment';
import { LeftSideMenu, ProfileHeader, Scrollbars, Wizard } from '../../../components';
import './style.css'

class VisitServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = { serviceRequestId: '', isOpen: false };
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.props.getVisitServiceList();
    }

    handleClick = (requestId) => {
        this.props.getVisitServiceDetails(requestId)
    }

    render() {

        let visitList = this.props.visitServiceList && this.props.visitServiceList.map(serviceList => {
            return (
                <div class='ServiceRequestBoard' key={serviceList.serviceRequestId}>
                    <div className='card' onClick={() => this.handleClick(serviceList.serviceRequestId)}>
                        <div className="BlockImageContainer">
                            <img className="ProfileImage" src="https://portal.propertyhandling.com/assets/images/default-avatar.png" />
                            <div className='BlockImageDetails'>
                                <div className='BlockImageDetailsName'>
                                    {serviceList.serviceRequestTypeDetails && serviceList.serviceRequestTypeDetails.map((serviceType) => {
                                        return (
                                            <span key={serviceType.serviceTypeId}>{serviceType.serviceTypeDescription}, </span>
                                        )
                                    })
                                    }
                                </div>
                                <div className='BlockImageDetailsActivity'>
                                    {serviceList.serviceRequestDescription}
                                </div>
                                <div className='BlockImageDetailsDate'>
                                    {serviceList.recurringPatternDescription} <span className='DetailsDateSeperator'>|</span> <Moment format="MMM DD">{serviceList.startDate}</Moment> - <Moment format="MMM DD">{serviceList.endDate}</Moment>
                                </div>
                            </div>
                        </div>
                        <div className="BlockProfileContainer">
                            <img className="ProfileImage" src="https://portal.propertyhandling.com/assets/images/default-avatar.png" />
                            {/* <img className="ProfileImage" src={"data:image/png;base64," + serviceList.patientImage} alt="patientImage" /> */}
                            <div className='BlockProfileDetails'>
                                <div className='BlockProfileDetailsName'>
                                    {serviceList.patientName}
                                </div>
                                <div className='BlockProfileDetailsActivity'>
                                    Posted on <Moment format="DD MMM">{serviceList.requestDate}</Moment>
                                </div>
                            </div>
                            <div class='BlockProfileDetailsStatus'>
                                {serviceList.statusName === 'Open' ?
                                    <a className='btn btn-hired' to='/'>{serviceList.statusName}</a>
                                    :
                                    ''
                                }
                                {serviceList.statusName === 'Applied' ?
                                    <a className='btn btn-applied' to='/'>{serviceList.statusName}</a>
                                    :
                                    ''
                                }
                                {serviceList.statusName === 'Invited' ?
                                    <a className='btn btn-outline-primary btn-invited' to='/'>{serviceList.statusName}</a>
                                    :
                                    ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <section className="d-flex">
                <LeftSideMenu isOpen={this.state.isOpen} />
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.toggle.bind(this)} />
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)} />
                    <div className='ProfileRightContainer'>
                        <div className='ProfileHeaderWidget'>
                            <div className='ProfileHeaderTitle'>
                                <h5 className='primaryColor m-0'>Service Requests</h5>
                            </div>
                            <div className='ProfileHeaderOptions'>
                                <a className='primaryColor ProfileHeaderSort' to=''>Sort</a>
                                <a className='primaryColor' to=''>Filters</a>
                            </div>
                        </div>
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='ServiceRequestsWidget'>
                            <div className='BoardContainer'>
                                {visitList}
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </section>
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
