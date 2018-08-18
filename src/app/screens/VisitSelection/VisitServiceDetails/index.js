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
            visitServiceSchedule: '',
            ServicesTypes: ["Bathing", "Meal Preparation"],
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

        const Days = ["Sunday", "Monday"];
        const workingHrs = ["Morning", "Afternoon", "Evening"];

        let sliderTypes = this.state.visitServiceDetails.serviceRequestTypeDetails && this.state.visitServiceDetails.serviceRequestTypeDetails.map((serviceTypes, index) => {
            let catNum = index + 1;
            return (
                <div className='ServiceTypeList'>
                    <input id={'ServiceType' + catNum} type='radio' className='ServiceTypeInput' name='serviceType'
                        value={catNum} />
                    <label className='ServiceTypeLink' htmlFor={'ServiceType' + catNum}>
                        <span className={'ServiceTypeIcon SPIconServices' + catNum} />
                        <div className='serviceTypeDesc'>
                            <span className='serviceName'>{serviceTypes.serviceTypeDescription}</span>
                        </div>
                    </label>
                    <span className='ServiceIndicatorBottom' />
                </div>
            )
        });

        let description = this.state.visitServiceDetails.serviceRequestTypeDetails && this.state.visitServiceDetails.serviceRequestTypeDetails.map((b, index) => {
            return (
                <div>
                    {b.serviceRequestTypeTaskDetails.map((aaaa, i) => {
                        return (
                            <li><i>{i + 1}</i>{aaaa.serviceTaskDescription}</li>
                        )
                    })}
                </div>
            )
        })
        // let WorkinHours = '';
        // let AvailDays = Days.map((days, i) => {
        //     let DayCount = 'Days' + (i + 1);
        //     let Count = '';
        //     this.state.availableList.map((checkbox, i) => {
        //         if (checkbox.name === DayCount) {
        //             if (checkbox.count) {
        //                 Count = 'true'
        //             } else {
        //                 Count = '';
        //             }
        //         }
        //     });
        //     return (
        //         <div className={'SPAvailContainer ' + Count + 'Available'}>
        //             <div className={'SPAvailTitle'}>
        //                 <label className="SPAvailTitleText">{days}
        //                     {/*<input type={'checkbox'} className={'availabilityCheck'} onChange={this.toggleCheckbox}
        //                            value={(i + 1)}/>*/}
        //                 </label>
        //             </div>
        //             <div className={'SPAvailContent'}>
        //                 {
        //                     WorkinHours = workingHrs.map((workHrs, index) => {
        //                         return (
        //                             <div>
        //                                 <input type={'checkbox'} className={'availabilityCheck'} checked
        //                                     value={(i + 1)} id={'checked' + i + (index + 1)}
        //                                     name={'checked' + i + (index + 1)} />
        //                                 <label className="SPAvailItems" htmlFor={'checked' + i + (index + 1)}>{workHrs}
        //                                 </label>
        //                             </div>
        //                         )
        //                     })}
        //             </div>
        //         </div>
        //     )
        // });

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
                                    <section className='ProfileCardHeader'>
                                        <div className='primaryColor'>
                                            <span className='HeaderBackWrapper'>
                                                <a href='/' className='HeaderBackButton' />
                                            </span>
                                            <span className='HeaderRequestLabel'>
                                                Request ID
                                                </span>
                                            <span className='HeaderRequestLabelID'>
                                                {this.state.visitServiceDetails.serviceRequestId}
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
                                                {/* <img class="ProfileImage" src="../dist/img/user-5.jpg" /> */}
                                                {/* <img class="ProfileImage" src={"data:image/png;base64," + this.state.visitServiceDetails.patientImage} alt="patientImage" /> */}
                                                <img className="ProfileImage" src="https://portal.propertyhandling.com/assets/images/default-avatar.png" />
                                                <div class='PostedByProfileDetails'>
                                                    <div class='ProfileDetailsName'>
                                                        {this.state.visitServiceDetails.patientName}
                                                    </div>
                                                    <div class='ProfileDetailsDate'>
                                                        Posted on <Moment format="DD MMM">{this.state.visitServiceDetails.requestDate}</Moment>
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
                                                    <form className='ServiceContent'>
                                                        <div className='ServiceCategoryContent'>
                                                            <h2 className='ServicesTitle'>Service Category</h2>
                                                            <p className='ScheduleTypeTitle'>{this.state.visitServiceDetails.serviceCategoryDescription}</p>
                                                            <h2 className='ServicesTitle mt-4'>Service Types</h2>

                                                            <div className='ServiceType'>
                                                                <div className="ServiceTypesSlider Summary">
                                                                    {sliderTypes}
                                                                </div>
                                                            </div>
                                                            <div className='ServiceTasks Summary'>
                                                                <ul className='SelectedTask'>
                                                                    {/* <li><i>1</i> Ut ornare lectus sit amet</li>
                                                                        <li><i>2</i> Odio pellentesque diam volutpat commodo</li>
                                                                        <li><i>3</i> Ut ornare lectus sit amet</li>
                                                                        <li><i>4</i> Nunc consequat interdum varius sit amet mattis vulputate enim nulla</li>
                                                                        <li><i>5</i> Purus ut faucibus pulvinar elementum integer enim neque volutpat</li>
                                                                        <li><i>6</i> Semper auctor neque vitae tempus quam pellentesque. Ipsum dolor sit amet
                                                                            consectetur adipiscing elit duis tristique sollicitudin.
                                                                        </li> */}

                                                                    {description}

                                                                </ul>
                                                            </div>
                                                            <h2 className='ServicesTitle'>Additional Information</h2>
                                                            <p className="AdditionInfo mt-3 mb-5">{this.state.visitServiceDetails.serviceRequestDescription}</p>
                                                            <h2 className='ServicesTitle'>Schedule and Frequency</h2>
                                                            <div className="ContentTitle Summary mt-3 mb-4">
                                                                <span className='ContentTitle Summary'>Recurring Schedule</span>
                                                                <span><Moment format="DD MMM YYYY">{this.state.visitServiceDetails.startDate}</Moment> - till {this.state.visitServiceDetails.recurringPattern} occurences</span>
                                                                <span className='ContentTitle Summary'>Recurring Pattern</span>
                                                                <span>{this.state.visitServiceDetails.recurringPatternDescription}</span>
                                                            </div>
                                                            <div className='AvailabilityWidget'>
                                                                <div className='SPAvailWidget Summary mb-4'>
                                                                    {/* {AvailDays} */}
                                                                </div>
                                                            </div>
                                                            <h2 className='ServicesTitle'>Point of Service</h2>
                                                            <div className="SummaryContent POS mt-3 mb-5">
                                                                <p className='ContentTitle Summary'>Home</p>
                                                                <p><span>Street</span>3343 Kooter Lane, 59 College Avenue</p>
                                                                <p><span>City</span>Farmington</p>
                                                                <p><span>State</span>West Virginia</p>
                                                                <p><span>ZIP</span>26571</p>
                                                            </div>
                                                        </div>
                                                    </form>
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
                                                                    <span>{ScheduleList.slot}</span>
                                                                </div>
                                                                <div>
                                                                    <span>{ScheduleList.visitStatusName}</span>
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
                                                                        {ScheduleList.visitStatusName === 'Completed' ?
                                                                            <a className='btn btn-outline-primary' to='/'>Summary</a>
                                                                            :
                                                                            ''
                                                                        }
                                                                        {ScheduleList.visitStatusName === 'Scheduled' ?
                                                                            <a className='btn btn-outline-primary' to='/'>Start Visit</a>
                                                                            :
                                                                            ''
                                                                        }
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
