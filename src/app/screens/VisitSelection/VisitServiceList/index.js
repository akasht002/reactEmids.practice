import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { getVisitServiceList } from '../../../redux/visitSelection/VisitServiceList/actions';
import { getVisitServiceDetails, getVisitServiceSchedule } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { Scrollbars } from '../../../components';
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import { getFirstCharOfString } from '../../../utils/stringHelper'
import {
    VISIT_SERVICE_STATUS_OPEN,
    VISIT_SERVICE_STATUS_APPLIED,
    VISIT_SERVICE_STATUS_INVITED,
    VISIT_SERVICE_STATUS_HIRED,
    VISIT_SERVICE_STATUS_NOT_HIRED
} from '../../../constants/constants'
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
        this.props.getVisitServiceDetails(requestId);
        this.props.getVisitServiceSchedule(requestId);
    }

    renderStatusClassName = (status) => {
        if (status === VISIT_SERVICE_STATUS_OPEN) {
            return 'btn btn-open';
        }
        else if (status === VISIT_SERVICE_STATUS_APPLIED) {
            return 'btn btn-applied';
        }
        else if (status === VISIT_SERVICE_STATUS_HIRED) {
            return 'btn btn-hired';
        }
        else if (status === VISIT_SERVICE_STATUS_INVITED) {
            return 'btn btn-outline-primary btn-invited';
        }
        else if (status === VISIT_SERVICE_STATUS_NOT_HIRED) {
            return 'BlockProfileMatching';
        }
        else {
            return null;
        }
    }
    
    render() {

        let visitList = this.props.visitServiceList && this.props.visitServiceList.map(serviceList => {
            return (
                <div class='ServiceRequestBoard' key={serviceList.serviceRequestId}>
                    <div className='card' onClick={() => this.handleClick(serviceList.serviceRequestId)}>
                        <div className="BlockImageContainer">
                            <img src={require("../../../assets/images/Bathing_Purple.svg")} className="ProfileImage" alt="categoryImage" />
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
                                    {serviceList.serviceCategoryDescription}
                                </div>
                                <div className='BlockImageDetailsDate'>
                                    {serviceList.recurringPatternDescription} <span className='DetailsDateSeperator'>|</span> <Moment format="MMM DD">{serviceList.startDate}</Moment> - <Moment format="MMM DD">{serviceList.endDate}</Moment>
                                </div>
                            </div>
                        </div>
                        <div className="BlockProfileContainer">
                            <img className="ProfileImage" src={serviceList.image} alt="patientImage" />
                            <div className='BlockProfileDetails'>
                                <div className='BlockProfileDetailsName'>
                                    {serviceList.patientFirstName} {serviceList.patientLastName && getFirstCharOfString(serviceList.patientLastName)}
                                </div>
                                <div className='BlockProfileDetailsActivity'>
                                    Posted on <Moment format="DD MMM">{serviceList.requestDate}</Moment>
                                </div>
                            </div>
                            <div class='BlockProfileDetailsStatus'>
                                {
                                    <a className={`${this.renderStatusClassName(serviceList.statusName)}`} to='/'>{
                                        serviceList.statusName === VISIT_SERVICE_STATUS_NOT_HIRED ?
                                            serviceList.matchPercentage : serviceList.statusName
                                    }</a>
                                }
                                {serviceList.statusName === VISIT_SERVICE_STATUS_HIRED ?
                                    <a className='btn btn-outline-primary btn-hired' to='/'>{serviceList.statusName}</a>
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
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
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
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceList: () => dispatch(getVisitServiceList()),
        getVisitServiceDetails: (data) => dispatch(getVisitServiceDetails(data)),
        getVisitServiceSchedule: (data) => dispatch(getVisitServiceSchedule(data))
    }
};

function mapStateToProps(state) {
    return {
        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));
