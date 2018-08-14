import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import classnames from 'classnames';
import Moment from 'react-moment';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { LeftSideMenu, ProfileHeader, Scrollbars } from '../../../components'
import { push } from '../../../redux/navigation/actions';
import { Path } from '../../../routes';
import { getVisitServiceDetails, getVisitServiceSchedule } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import '../../../screens/VisitSelection/VisitServiceDetails/dashboard.css'


class VisitServiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verticalScroll: false,
            width: window.innerWidth,
            activeTab: '1',
            visitServiceDetails: '',
            visitServiceSchedule: ''
        };
    };

    componentDidMount() {
        this.props.getVisitServiceDetails();
        this.props.getVisitServiceSchedule();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visitServiceDetails: nextProps.VisitServiceDetails });
        this.setState({ visitServiceSchedule: nextProps.VisitServiceSchedule })
    }

    visitService = () => {
        this.props.visitService()
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        console.log(this.state.visitServiceSchedule)

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
                        </div>
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='ServiceRequestsWidget'>
                            <div className='card mainProfileCard'>
                                <div className='CardContainers'>
                                    <div>
                                        <section className='ProfileCardHeader'>
                                            <div className='primaryColor'>
                                                <span className='HeaderBackWrapper'>
                                                    <a href='/' className='HeaderBackButton' />
                                                </span>
                                                <span className='HeaderRequestLabel'>
                                                    Request ID
                                            </span>
                                                <span className='HeaderRequestLabelID'>
                                                    {/* id value */}
                                                </span>
                                            </div>
                                            <div className='ProfileHeaderButton'>
                                                <Link className='btn btn-outline-primary' to='/'>Cancel Service</Link>
                                            </div>
                                        </section>
                                        <section class="LeftPalette">
                                            <div className='primaryColor LeftPaletteHeader'>
                                                Request ID
                                        </div>
                                            <div class='LeftPostedBy'>
                                                <div class="PostedByImageContainer">
                                                    <img class="ProfileImage" src="../dist/img/user-5.jpg" />
                                                    <div class='PostedByProfileDetails'>
                                                        <div class='ProfileDetailsName'>
                                                            Dan Smith
                                                    </div>
                                                        <div class='ProfileDetailsDate'>
                                                            Posted on 02 Jul
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className='PostedByImageContainer'>
                                                    <i class="ProfileIcon IconCall"></i>
                                                    <div class='PostedByProfileDetails'>
                                                        <div class='ProfileIconDetails'>
                                                            Phone Call
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className='PostedByImageContainer'>
                                                    <i class="ProfileIcon IconConversations"></i>
                                                    <div class='PostedByProfileDetails'>
                                                        <div class='ProfileIconDetails'>
                                                            Conversations
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className='PostedByImageContainer'>
                                                    <i class="ProfileIcon IconVideo"></i>
                                                    <div class='PostedByProfileDetails'>
                                                        <div class='ProfileIconDetails'>
                                                            Video Call
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="rightPalette">
                                            <div className="container-fluid">
                                                <Nav tabs className='PaletteTabs'>
                                                    <NavItem>
                                                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                                            Details
                                                    </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                                            Schedule
                                                    </NavLink>
                                                    </NavItem>
                                                </Nav>
                                                <TabContent activeTab={this.state.activeTab}>
                                                    <TabPane tabId="1" className='TabBody'>
                                                    </TabPane>
                                                    <TabPane tabId="2" className='TabBody'>
                                                        <div className='ScheduleTableHeader primaryColor'>
                                                            <div>
                                                                <span>Date</span>
                                                            </div>
                                                            <div>
                                                                <span>Time Slot</span>
                                                            </div>
                                                            <div>
                                                                <span>Visit Status</span>
                                                            </div>
                                                            <div>
                                                                <span>Visit Length</span>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                        {this.state.visitServiceSchedule && this.state.visitServiceSchedule.map((ScheduleList) => {
                                                            return (
                                                                <div className='ScheduleTableRow'>
                                                                    <div>
                                                                        <span><Moment format="DD MMM">{ScheduleList.visitDate}</Moment></span>
                                                                    </div>
                                                                    <div>
                                                                        <span>{ScheduleList.slotName}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span>Completed</span>
                                                                    </div>
                                                                    <div>
                                                                        {ScheduleList.originalTotalDuration ?
                                                                            <span>{ScheduleList.originalTotalDuration}Hrs</span>
                                                                            :
                                                                            <span> - </span>
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        <div class='ScheduleRowButton'>
                                                                            <a className='btn btn-outline-primary' to='/'>Summary</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        }
                                                    </TabPane>
                                                </TabContent>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </section>


            // <div>
            //     <div className="row">
            //         <div className="container">
            //             <div className="card">
            //                 <div className="card-header"><span><h1 onClick={this.visitService}> X </h1> Request ID  {this.state.visitServiceDetails.ServiceRequestId}</span></div>
            //                 <div className="card-body">
            //                     <div className="row">
            //                         <div className="col-md-3">
            //                             <div className="card-header">
            //                                 <h6>Posted By</h6>
            //                                 <p>{this.state.visitServiceDetails.PostedBy}</p>
            //                                 <p>{this.state.visitServiceDetails.PostedOn}</p>
            //                                 <br />
            //                                 <br />
            //                                 <button type="button" className="btn btn-primary">Click to Begin</button>
            //                             </div>
            //                         </div>
            //                         <div className="col-md-9">
            //                             <div className="card-header">
            //                                 <h6>Service Category</h6>
            //                                 <p>{this.state.visitServiceDetails.ServiceCategory}</p>
            //                                 <br />
            //                                 <br />
            //                                 <h6>Service Types</h6>
            //                                 {this.state.visitServiceDetails && this.state.visitServiceDetails.ServiceTypes.map(serviceType => {
            //                                     return (
            //                                         <p key={serviceType.id}>{serviceType.name}</p>
            //                                     )
            //                                 })}
            //                                 <br />
            //                                 <br />
            //                                 {this.state.visitServiceDetails && this.state.visitServiceDetails.ServiceTasks.map(task => {
            //                                     return (
            //                                         <li key={task.id}>{task.name}</li>
            //                                     )
            //                                 })}
            //                                 <br />
            //                                 <br />
            //                                 <h6>Description</h6>
            //                                 <p>{this.state.visitServiceDetails.ServiceRequestDescription}</p>
            //                                 <br />
            //                                 <br />
            //                                 <h6>Special Care Considerations</h6>
            //                                 <br />
            //                                 <br />
            //                                 {this.state.visitServiceDetails && this.state.visitServiceDetails.SpecialCareConsiderations.map(scd => {
            //                                     return (
            //                                         <p key={scd.id}>{scd.name}</p>
            //                                     )
            //                                 })}
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceDetails: () => dispatch(getVisitServiceDetails()),
        getVisitServiceSchedule: () => dispatch(getVisitServiceSchedule()),
        visitService: () => dispatch(push(Path.visitServiceList))
    }
};

function mapStateToProps(state) {
    return {
        VisitServiceDetails: state.visitSelectionState.VisitServiceDetailsState.VisitServiceDetails,
        VisitServiceSchedule: state.visitSelectionState.VisitServiceDetailsState.VisitServiceSchedule,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails));
