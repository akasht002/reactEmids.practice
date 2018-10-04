import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Collapse, CardBody, Card } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from "react-router-dom";
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData'
import { getPerformTasksList, addPerformedTask, startOrStopService } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import { Scrollbars, DashboardWizFlow, ModalPopup, StopWatch, Button } from '../../../../components';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { convertTime24to12, getFirstCharOfString } from '../../../../utils/stringHelper';
import './style.css'
class PerformTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            taskList: {},
            checkedCount: 0,
            checkedData: '',
            isOpen: false,
            isCollapseOpen: true,
            startService: true,
            startedTime: '',
            isModalOpen: false,
            disabled: true,
            taskCount: '',
            stopTime: false,
            isStopModalOpen: false,
            disableCheckbox: true,
            caret: false,
            percentageCompletion: 0,
            backDisabled: false
        };
        this.checkedTask = [];
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.props.getPerformTasksList(this.props.ServiceRequestVisitId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ taskList: nextProps.PerformTasksList })
    }

    handleChange = (taskList, e) => {
        let percentageCalculation
        if (e.target.checked) {
            this.checkedTask.push(taskList)
            percentageCalculation = ((this.checkedTask).length / this.state.taskList.totalTask) * 100;
        }
        else {
            this.checkedTask.splice(this.checkedTask.findIndex(function (item, index) {
                return item.serviceRequestTypeTaskVisitId === parseInt(e.target.value, 0);
            }), 1);
            percentageCalculation = ((this.checkedTask).length / this.state.taskList.totalTask) * 100;
        }
        this.setState({
            checkedData: this.checkedTask,
            percentageCompletion: percentageCalculation,
            taskCount: (this.state.taskList.totalTask - (this.checkedTask).length)
        });
    }

    startService = (data, visitId) => {
        let startServiceAction = 1;
        let current_time;
        if (data === startServiceAction) {
            current_time = new moment().format("HH:mm");
            this.setState({ startedTime: current_time, disabled: false, disableCheckbox: false, backDisabled: true })
        } else {
            current_time = this.state.startedTime;
            this.setState({ stopTime: true })
        }
        this.setState({ startService: !this.state.startService, disabled: false, backDisabled: true })
        this.props.startOrStopService(data, visitId, convertTime24to12(current_time));
    }

    onClickNext = () => {
        this.setState({ taskCount: (this.state.taskList.totalTask - (this.checkedTask).length) })
        if (!this.state.startService) {
            this.setState({ isStopModalOpen: true })
        } else if (this.state.taskCount > 0) {
            this.setState({ isModalOpen: true })
        } else if (this.state.taskCount === 0) {
            this.saveData();
        }
    }

    saveData = () => {
        let taskList = this.state.taskList
        let data = {
            serviceRequestVisitId: taskList.serviceRequestVisitId,
            serviceRequestId: taskList.serviceRequestId,
            visitStatusId: taskList.visitStatusId,
            serviceProviderId: taskList.serviceProviderId,
            visitDate: taskList.visitDate,
            isActive: true,
            serviceRequestTypeTaskVisits: this.checkedTask
        }
        this.props.addPerformedTask(data);
    }

    render() {
        let startService = 1;
        let stopService = 0;
        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
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
                                {!this.state.backDisabled ?
                                    <Link to="/visitServiceDetails" className="TitleContent backProfileIcon" />
                                    :
                                    <i className="TitleContent backProfileIcon" />
                                }

                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.state.taskList.visitDate}</Moment>, {this.state.taskList.slot}</i>{this.state.taskList.serviceRequestId}</span>
                                    </div>
                                    <div className='requestImageContent'>
                                        <span>
                                            <img
                                                src={this.state.taskList.patient && this.state.taskList.patient.imageString}
                                                className="avatarImage avatarImageBorder" alt="patientImage" />
                                            <i className='requestName'>{this.state.taskList.patient && this.state.taskList.patient.firstName} {(this.state.taskList.patient && getFirstCharOfString(this.state.taskList.patient.lastName))}</i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers WizardWidget'>
                            <div className="row">
                                <div className="col col-md-8 WizardContent">
                                    <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={0} />
                                </div>

                                {this.state.stopTime ?
                                    <div className="col col-md-4 rightTimerWidget running">
                                        <div className="row rightTimerContainer">
                                            <div className="col-md-7 rightTimerContent FeedbackTimer">
                                                <span className="TimerContent running">{this.props.SummaryDetails.originalTotalDuration}</span>
                                            </div>
                                            <div className="col-md-5 rightTimerContent FeedbackTimer">
                                                <span className="TimerStarted running">Started at {this.props.startedTime && this.props.startedTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="col col-md-4 rightTimerWidget">
                                        <div className="row rightTimerContainer">
                                            <div className="col-md-7 rightTimerContent">
                                                <span className="TimerContent">
                                                    <StopWatch ref={instance => { this.child = instance; }} />
                                                </span>
                                            </div>
                                            <div className="col-md-5 rightTimerContent">
                                                {this.state.startService ?
                                                    <a className="btn btn-primary" onClick={() => { this.startService(startService, this.state.taskList.serviceRequestVisitId); this.child.handleStartClick(); }}>Start Service</a>
                                                    :
                                                    <a className="btn btn-primary" onClick={() => { this.startService(stopService, this.state.taskList.serviceRequestVisitId); this.child.handleStopClick(); }}>Stop Service</a>
                                                }
                                                {this.state.startedTime ?
                                                    <span className="TimerStarted">Started at {this.props.startedTime && this.props.startedTime}</span>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='CardContainers'>
                            <div className='ServiceContent'>
                                {this.props.PerformTasksList.serviceRequestTypeVisits && this.props.PerformTasksList.serviceRequestTypeVisits.map((serviceType) => {
                                    return (
                                        <div className={"TabContainerWidget"} key={serviceType.serviceRequestTypeDetailsId}>
                                            <div onClick={() => {
                                                serviceType.collapse = !serviceType.collapse;
                                                this.setState({ collapse: !this.state.collapse });
                                            }} id={'toggle' + serviceType.serviceRequestTypeDetailsId} className={"TabContainer " + serviceType.collapse}>
                                                <img src={require("../../../../assets/images/Bathing_Purple.svg")} className="ServiceTasksImg" alt="categoryImage" />
                                                <div className="TabHeaderContent">
                                                    <span className="TabHeaderText">{serviceType.serviceTypeDescription}</span>
                                                    <span><i className="SelectedTask">{serviceType.serviceRequestTypeTaskVisits.filter((taskList) => {
                                                        return taskList.checked
                                                    }).length}</i>
                                                        <i className="TotalTasks">/{(serviceType.serviceRequestTypeTaskVisits).length}</i> tasks completed</span>
                                                </div>
                                            </div>
                                            <Collapse isOpen={serviceType.collapse}>
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
                                                                        checked={this.state.isChecked}
                                                                        onChange={(e) => {
                                                                            taskList.checked = e.target.checked;
                                                                            this.handleChange(taskList, e);
                                                                        }}
                                                                        disabled={this.state.disableCheckbox}
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
                                            <i style={{ width: this.state.percentageCompletion + '%' }} className="bottomTaskCompletedRange" />
                                        </span>
                                        <span className="bottomTaskPercentage">{this.state.percentageCompletion}%</span>
                                    </div>
                                    <Button
                                        classname='btn btn-primary ml-auto'
                                        onClick={this.onClickNext}
                                        disable={this.state.disabled}
                                        label={'Next'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardBottom' />
                    <ModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={<span>You have not completed {this.state.taskCount} no of task. Are you sure you want to proceed to the next step?</span>}
                        btn1="Confirm"
                        btn2="Cancel"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.saveData()}
                        onCancel={() => this.setState({
                            isModalOpen: !this.state.isModalOpen,
                        })}
                    />

                    <ModalPopup
                        isOpen={this.state.isStopModalOpen}
                        ModalBody={<span>Please stop the service to proceed</span>}
                        btn1="OK"
                        btn2="Cancel"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.setState({
                            isStopModalOpen: !this.state.isStopModalOpen,
                        })}
                        onCancel={() => this.setState({
                            isStopModalOpen: !this.state.isStopModalOpen,
                        })}
                    />
                </Scrollbars>
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPerformTasksList: (data) => dispatch(getPerformTasksList(data)),
        addPerformedTask: (data) => dispatch(addPerformedTask(data)),
        startOrStopService: (data, visitId, startedTime) => dispatch(startOrStopService(data, visitId, startedTime))
    }
};

function mapStateToProps(state) {
    return {
        PerformTasksList: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformTasks));