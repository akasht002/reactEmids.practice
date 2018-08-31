import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Collapse, CardBody, Card, UncontrolledCollapse  } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from "react-router-dom";
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData'
import { getPerformTasksList, addPerformedTask, startOrStopService } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import { Scrollbars, DashboardWizFlow, ModalPopup, StopWatch, GeneralModalPopup, Button } from '../../../../components';
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
            caret: false
        };
        this.checkedTask = [];
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    aaa = () => {
        this.setState({
            caret: !this.state.caret
        });
    }

    componentDidMount() {
        this.props.getPerformTasksList(this.props.ServiceRequestVisitId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ taskList: nextProps.PerformTasksList })
    }

    handleChange = (taskList) => {
        this.checkedTask.push(taskList)
        this.setState({ checkedData: this.checkedTask })
    }

    startService = (data, visitId) => {
        let startServiceAction = 1;
        let current_time;
        if (data === startServiceAction) {
            current_time = new moment().format("HH:mm");
            this.setState({ startedTime: current_time, disabled: false, disableCheckbox: false })
        } else {
            current_time = this.state.startedTime;
            this.setState({ stopTime: true, disableCheckbox: true })
        }
        this.setState({ startService: !this.state.startService, disabled: false, isStopModalOpen: !this.state.startService })
        this.props.startOrStopService(data, visitId, convertTime24to12(current_time));
    }

    onClickNext = () => {
        if (this.state.startService) {
            this.setState({ isModalOpen: true })
        } else {
            this.setState({ isStopModalOpen: true })
        }
    }

    onSubmit = () => {
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
                                <Link to="/visitServiceDetails" className="TitleContent backProfileIcon" />
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
                                <div className="col col-md-9 WizardContent">
                                    <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={0} />
                                </div>

                                {this.state.stopTime ?
                                    <div className="col col-md-3 rightTimerWidget running">
                                        <div className="row rightTimerContainer">
                                            <div className="col-md-5 rightTimerContent FeedbackTimer">
                                                <span className="TimerContent running">{this.props.SummaryDetails.originalTotalDuration}</span>
                                            </div>
                                            <div className="col-md-7 rightTimerContent FeedbackTimer">
                                                <span className="TimerStarted running">Started at {this.props.startedTime && this.props.startedTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="col col-md-3 rightTimerWidget">
                                        <div className="row rightTimerContainer">
                                            <div className="col-md-5 rightTimerContent">
                                                <span className="TimerContent">
                                                    <StopWatch ref={instance => { this.child = instance; }} />
                                                </span>
                                            </div>
                                            <div className="col-md-7 rightTimerContent">
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
                        <div className='CardContainers ServiceCategoryWidget'>
                            <form className='ServiceContent'>
                                {this.props.PerformTasksList.serviceRequestTypeVisits && this.props.PerformTasksList.serviceRequestTypeVisits.map((serviceType) => {
                                    return (
                                        <div className={"TabContainerWidget"} key={serviceType.serviceRequestTypeDetailsId}>
                                            <div onClick={this.aaa} id={'toggle' + serviceType.serviceRequestTypeDetailsId} className={"TabContainer " + this.state.caret}>
                                                <img src={require("../../../../assets/images/Bathing_Purple.svg")} className="ServiceTasksImg" alt="categoryImage" />
                                                <div className="TabHeaderContent">
                                                    <span className="TabHeaderText">{serviceType.serviceTypeDescription}</span>
                                                    <span><i className="SelectedTask">{serviceType.serviceRequestTypeTaskVisits.filter((taskList) => {
                                                        return taskList.checked
                                                    }).length}</i>
                                                        <i className="TotalTasks">/{(serviceType.serviceRequestTypeTaskVisits).length}</i> tasks completed</span>
                                                </div>
                                            </div>
                                            <UncontrolledCollapse toggler={'#toggle' + serviceType.serviceRequestTypeDetailsId}>
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
                                                                        onChange={(e) => {
                                                                            taskList.checked = e.target.checked;
                                                                            this.handleChange(taskList);
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
                                            </UncontrolledCollapse>
                                        </div>
                                    )
                                })}

                                <div className='bottomButton'>
                                    {/* <div className='col-md-5 d-flex mr-auto bottomTaskbar'>
                                                <span className="bottomTaskName">Tasks</span>
                                                <span className="bottomTaskRange">
                                                    <i style={{ width: '83.3%' }} className="bottomTaskCompletedRange" />
                                                </span>
                                                <span className="bottomTaskPercentage">83.3%</span>
                                            </div> */}
                                    <Button
                                        classname='btn btn-primary ml-auto'
                                        onClick={this.onClickNext}
                                        disable={this.state.disabled}
                                        label={'Next'} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='cardBottom' />
                    <ModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={<span>You have not completed {this.state.taskCount} .Are you sure you want to proceed to the next step?</span>}
                        btn1="Confirm"
                        btn2="Cancel"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.onSubmit()}
                        onCancel={() => this.setState({
                            isModalOpen: !this.state.isModalOpen,
                        })}
                    />
                    {/* <GeneralModalPopup
                        isOpen={this.state.isStopModalOpen}
                        ModalBody={<span>Please stop the service to proceed</span>}
                        className="modal-lg"
                        centered={true}
                        label={'OK'}
                        onClick={() => {
                            this.setState({
                                isStopModalOpen: !this.state.isStopModalOpen,
                            })
                        }}
                    /> */}

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