import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card } from 'reactstrap';
import Moment from 'react-moment';
import { getPerformTasksList, addPerformedTask } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import { LeftSideMenu, ProfileHeader, Scrollbars, Wizard } from '../../../../components';
import './style.css'

class PerformTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            taskList: {},
            checkedCount: 0,
            checkedData: '',
            isOpen: false
        };
        this.checkedTask = [];
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    componentDidMount() {
        this.props.getPerformTasksList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ taskList: nextProps.PerformTasksList })
    }

    handleChange = (taskList) => {
        this.checkedTask.push(taskList)
        console.log(this.checkedTask)
        this.setState({ checkedData: this.checkedTask })
    }

    onClickNext = () => {
        const data = {
            serviceRequestVisitId: this.state.taskList.serviceRequestVisitId,
            serviceRequestId: this.state.taskList.serviceRequestId,
            visitStatusId: this.state.taskList.visitStatusId,
            serviceProviderId: this.state.taskList.serviceProviderId,
            visitDate: this.state.taskList.visitDate,
            isActive: true,
            serviceRequestTypeTaskVisits: this.checkedTask
        }
        this.props.addPerformedTask(data);
    }

    render() {

        return (            
            <section className = "d-flex" >
                <LeftSideMenu isOpen={this.state.isOpen} />
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.toggle.bind(this)} />
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)} />
                    <div className='ProfileRightContainer'>
                        <div className='ProfileHeaderWidget'>
                            <div className='ProfileHeaderTitle'>
                                <h5 className='primaryColor m-0'>Service Requests <span>/ {this.state.taskList.serviceRequestId}</span></h5>
                            </div>
                        </div>
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                            className='ProfileContentWidget'>
                            <div className='card mainProfileCard'>
                                <div className='CardContainers TitleWizardWidget'>
                                    <div className='TitleContainer'>
                                        <Link className="TitleContent backProfileIcon" to="/" />
                                        <div className='requestContent'>
                                            <div className='requestNameContent'>
                                                <span><i className='requestName'><Moment format="DD MMM">{this.state.taskList.visitDate}</Moment>, {this.state.taskList.slot}</i>{this.state.taskList.serviceRequestId}</span>
                                            </div>
                                            <div className='requestImageContent'>
                                                <span>
                                                    {/* <img
                                                    src={imagePath("./avatar/user-10.jpg")}
                                                    className="avatarImage avatarImageBorder" /> */}
                                                    <i className='requestName'>Christopher W</i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers WizardWidget'>
                                    <div className="row">
                                        <div className="col col-md-9 WizardContent">
                                            <Wizard />
                                        </div>
                                        <div className="col col-md-3 rightTimerWidget">
                                            <div className="row rightTimerContainer">
                                                <div className="col-md-5 rightTimerContent">
                                                    <span className="TimerContent">01<i>:</i>45</span>
                                                </div>
                                                <div className="col-md-7 rightTimerContent">
                                                    <Link className="btn btn-primary" to="/">Stop Service</Link>
                                                    <span className="TimerStarted">Started at 12:30 pm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers ServiceCategoryWidget'>
                                    <form className='ServiceContent'>
                                        {this.props.PerformTasksList.serviceRequestTypeVisits && this.props.PerformTasksList.serviceRequestTypeVisits.map((serviceType) => {
                                            return (
                                                <div className="TabContainerWidget" key={serviceType.serviceRequestTypeDetailsId}>
                                                    <div id={'toggle' + serviceType.serviceRequestTypeDetailsId} className={"TabContainer"} onClick={this.toggleCollapse}>
                                                        {/* <img src={imagePath("./Bathing_Purple.svg")} className="ServiceTasksImg" /> */}
                                                        <div className="TabHeaderContent">
                                                            <span className="TabHeaderText">{serviceType.serviceTypeDescription}</span>
                                                            <span><i className="SelectedTask">{this.state.checkedCount}</i>
                                                                <i className="TotalTasks">/{(serviceType.serviceRequestTypeTaskVisits).length}</i> tasks completed</span>
                                                        </div>
                                                    </div>
                                                    <Collapse toggler={'#toggle' + serviceType.serviceRequestTypeDetailsId} isOpen={this.state.isOpen}>
                                                        <Card>
                                                            <CardBody>
                                                                {serviceType.serviceRequestTypeTaskVisits.map((taskList) => {
                                                                    return (
                                                                        <div className='ServiceList' key={taskList.serviceRequestTypeTaskDetailsId}>
                                                                            <input
                                                                                id={taskList.serviceRequestTypeTaskVisitId}
                                                                                type='checkbox'
                                                                                className='ServicesInput'
                                                                                name='serviceType'
                                                                                value={taskList.serviceRequestTypeTaskVisitId}
                                                                                onChange={(e) => this.handleChange(taskList)}
                                                                            />
                                                                            <label className='ServicesLink' htmlFor={taskList.serviceRequestTypeTaskVisitId}>
                                                                                <div className='servicesDesc'>
                                                                                    <span className='serviceName'>{taskList.serviceTaskDescription}</span>
                                                                                </div>
                                                                            </label>
                                                                            <span className='ServiceIndicatorBottom' />
                                                                        </div>
                                                                    )
                                                                })}
                                                            </CardBody>
                                                        </Card>
                                                    </Collapse>
                                                </div>
                                            )
                                        })}

                                        <div className='bottomButton'>
                                            <div className='col-md-5 d-flex mr-auto bottomTaskbar'>
                                                <span className="bottomTaskName">Tasks</span>
                                                <span className="bottomTaskRange">
                                                    <i style={{ width: '83.3%' }} className="bottomTaskCompletedRange" />
                                                </span>
                                                <span className="bottomTaskPercentage">83.3%</span>
                                            </div>
                                            <Link className='btn btn-primary ml-auto' to='' onClick={this.onClickNext}>Next</Link>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className='cardBottom' />
                        </Scrollbars>
                    </div>
                </div>
            </section >

            // <div className="container">
            //     <div className="card">
            //         <div className="card-header">Request ID: {this.state.taskList.ServiceRequestId}</div>
            //         <div className="card-body">
            //             {this.props.PerformTasksList.ServiceTypes && this.props.PerformTasksList.ServiceTypes.map((serviceType) => {
            //                 return (
            //                     <Accordion>
            //                         <AccordionItem>
            //                             <AccordionItemTitle>
            //                                 {serviceType.ServiceTypeDescription}
            //                             </AccordionItemTitle>
            //                             <AccordionItemBody>
            //                                 {serviceType.ServiceTasks && serviceType.ServiceTasks.map((serviceTask) => {
            //                                     return (
            //                                         <li>
            //                                             {serviceTask.ServiceTaskDescription}
            //                                             <input
            //                                                 type="checkbox"
            //                                                 id={serviceTask.ServiceTaskId}
            //                                                 onChange={(e) => this.handleChange(e)}
            //                                                 checked={this.state.checked}
            //                                             />
            //                                         </li>
            //                                     )
            //                                 })}
            //                             </AccordionItemBody>
            //                         </AccordionItem>
            //                     </Accordion>
            //                 )
            //             })}
            //         </div>
            //     </div>
            // </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPerformTasksList: () => dispatch(getPerformTasksList()),
        addPerformedTask: (data) => dispatch(addPerformedTask(data))
    }
};

function mapStateToProps(state) {
    return {
        PerformTasksList: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformTasks));