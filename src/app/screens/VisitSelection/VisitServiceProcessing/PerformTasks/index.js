import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Collapse, CardBody, Card } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { getPerformTasksList, addPerformedTask, startOrStopService, getSummaryDetails } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import { Scrollbars, DashboardWizFlow, ModalPopup, StopWatch, Button, Preloader } from '../../../../components';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { convertTime24to12 } from '../../../../utils/stringHelper';
import { SERVICE_STATES } from '../../../../constants/constants';
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import { Path } from '../../../../routes';
import { push, goBack } from '../../../../redux/navigation/actions';
import { getServiceTypeImage } from '../../../../utils/validations';
import { setPatient } from '../../../../redux/patientProfile/actions';
import './style.css'
import { getUserInfo } from "../../../../services/http";
import { visitProcessingNavigationData } from "../../../../utils/arrayUtility";

export class PerformTasks extends Component {

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
            backDisabled: false,
            stopTimer: false
        };
        this.checkedTask = [];
        this.checkedTaskInitial = [];
        this.taskCount = '';
        this.percentageCompletion = 0;
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        if (this.props.ServiceRequestVisitId) {
            this.props.getPerformTasksList(this.props.ServiceRequestVisitId, true);
            this.props.getSummaryDetails(this.props.ServiceRequestVisitId);
        } else {
            this.props.history.push(Path.visitServiceList)
        }

        if (this.props.PerformTasksList.visitStatus === SERVICE_STATES.COMPLETED || this.props.PerformTasksList.visitStatus === SERVICE_STATES.PAYMENT_PENDING) {
            this.setState({ stopTimer: true, disableCheckbox: false })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.PerformTasksList !== nextProps.PerformTasksList) {
            nextProps.PerformTasksList.serviceRequestTypeVisits.map((serviceType) => {
                serviceType.serviceRequestTypeTaskVisits.map((taskList) => {
                    if (taskList.statusId === 90) {
                        taskList.checked = taskList.statusId === 90;
                        this.handleChange(taskList, {
                            target: {
                                checked: true,
                                value: taskList.serviceRequestTypeTaskVisitId
                            }
                        })
                        taskList.statusId = 45;
                    }
                    this.checkedTaskInitial = taskList;
                    return taskList;
                });
                return serviceType;
            });
        }
        this.setState({
            taskList: nextProps.PerformTasksList,
            isLoading: nextProps.isLoading
        })
    }

    handelPatientProfile = (data) => {
        this.props.setPatient(data)
        this.props.goToPatientProfile()
    }

    handleChange = (taskList, e) => {
        let percentageCalculation
        if (e.target.checked) {
            this.checkedTask.push(taskList)
            percentageCalculation = Math.round(((this.checkedTask).length / this.state.taskList.totalTask) * 100);
        }
        else {
            this.checkedTask.splice(this.checkedTask.findIndex(function (item, index) {
                return item.serviceRequestTypeTaskVisitId === parseInt(e.target.value, 0);
            }), 1);
            percentageCalculation = Math.round(((this.checkedTask).length / this.state.taskList.totalTask) * 100);
        }
        this.setState({
            checkedData: this.checkedTask,
            percentageCompletion: percentageCalculation,
            taskCount: (this.state.taskList.totalTask - (this.checkedTask).length)
        });
        this.taskCount = (this.state.taskList.totalTask - (this.checkedTask).length);
        this.percentageCompletion = percentageCalculation;
    }

    startService = (data, visitId) => {
        let startServiceAction = 1;
        let current_time;
        if (data === startServiceAction) {
            current_time = new moment().format("HH:mm");
            this.setState({ startedTime: current_time, disabled: false, disableCheckbox: false, backDisabled: true })
        } else {
            current_time = this.state.startedTime;
            this.setState({ stopTime: true, startService: true })
            this.saveData(data);
        }
        this.setState({ startService: !this.state.startService, disabled: false, backDisabled: true, stopTimer: !this.state.stopTimer })
        this.props.startOrStopService(data, visitId, convertTime24to12(current_time));
    }

    onClickNext = () => {
        this.setState({ taskCount: (this.state.taskList.totalTask - (this.checkedTask).length) })
        this.taskCount = (this.state.taskList.totalTask - (this.checkedTask).length);
        if (this.taskCount > 0) {
            this.setState({ isModalOpen: true })
        } else {
            this.saveData();
        }
    }

    saveData = (startServiceAction) => {
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
        this.props.addPerformedTask(data, startServiceAction);
    }

    render() {
        let startService = 1;
        let time = <span className="TimerContent running">HH<i>:</i>MM<i>:</i>SS</span>
        let timerBtn;
        const { visitStatus, visitStartTime, visitEndTime, visitTimeDuration } = this.props.PerformTasksList
        if (visitStatus === SERVICE_STATES.IN_PROGRESS || visitStatus === SERVICE_STATES.COMPLETED || visitStatus === SERVICE_STATES.PAYMENT_PENDING) {
            time = <StopWatch
                stopTimer={visitStatus === SERVICE_STATES.COMPLETED || visitStatus === SERVICE_STATES.PAYMENT_PENDING}
                startTime={visitStartTime}
                endTime={visitEndTime}
                duration={visitTimeDuration}
            />
         }

        if (visitStatus === SERVICE_STATES.YET_TO_START) {
            timerBtn = <a className="btn btn-primary" onClick={() => { this.startService(startService, this.state.taskList.serviceRequestVisitId) }}>Start Service</a>
        }

        if (visitStatus === SERVICE_STATES.IN_PROGRESS) {
            timerBtn = <a className="btn btn-primary" onClick={() => { this.setState({ isStopModalOpen: true }) }}>Stop Service</a>
        }

        let isEntity = getUserInfo().isEntityServiceProvider;
        let updatedIndicatorData = visitProcessingNavigationData(isEntity)

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle} >
                {this.state.isLoading && <Preloader />}
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='theme-primary m-0'>Service Requests</h5>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                    className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>
                        <div className='CardContainers TitleWizardWidget'>
                            <div className='TitleContainer'>
                                <span onClick={() => this.props.goBack()} className="TitleContent backProfileIcon theme-primary-light" />
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.state.taskList.visitDate}</Moment>, {this.state.taskList.slot}</i>{this.state.taskList.serviceRequestVisitNumber}</span>
                                    </div>
                                    <div className='requestImageContent' onClick={() => this.handelPatientProfile(this.state.taskList.patient && this.state.taskList.patient.patientId)}>
                                        <span>
                                            <img
                                                src={
                                                    this.state.taskList.patient && this.state.taskList.patient.imageString
                                                        ? this.state.taskList.patient.imageString
                                                        : require('../../../../assets/images/Blank_Profile_icon.png')
                                                }
                                                className="avatarImage avatarImageBorder" alt="patientImage" />
                                            <i className='requestName'>{this.state.taskList.patient && this.state.taskList.patient.firstName} {this.state.taskList.patient && this.state.taskList.patient.lastName}</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers WizardWidget'>
                            <div className="row">
                                <div className="col col-md-8 WizardContent">
                                    <DashboardWizFlow VisitProcessingNavigationData={updatedIndicatorData} activeFlowId={0} />
                                </div>

                                {visitStatus === SERVICE_STATES.PAYMENT_PENDING || visitStatus === SERVICE_STATES.COMPLETED ?
                                    <div className="col col-md-4 rightTimerWidget running">
                                        <div className="row rightTimerContainer">
                                            <div className="col-md-7 rightTimerContent FeedbackTimer">
                                                <span className="TimerContent running">{this.props.SummaryDetails.originalTotalDuration}</span>
                                            </div>
                                            <div className="col-md-5 rightTimerContent FeedbackTimer">
                                                <span className="TimerStarted running">Started at {getUTCFormatedDate(this.props.PerformTasksList.visitStartTime, "hh:mm A")}</span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="col col-md-4 rightTimerWidget">
                                        <div className="row rightTimerContainer">
                                            <div className="col-md-7 rightTimerContent">
                                                <span className="TimerContent">
                                                    {time}
                                                </span>
                                            </div>
                                            <div className="col-md-5 rightTimerContent">
                                                {timerBtn}
                                                {visitStatus === SERVICE_STATES.IN_PROGRESS ?
                                                    <span className="TimerStarted">Started at {getUTCFormatedDate(this.props.PerformTasksList.visitStartTime, "hh:mm a")}</span>
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
                                    let image_url = getServiceTypeImage(serviceType.serviceRequestTypeTaskVisits && serviceType.serviceRequestTypeTaskVisits.length > 0 && serviceType.serviceRequestTypeTaskVisits[0].serviceTypeId);
                                    return (
                                        <div className={"TabContainerWidget"} key={serviceType.serviceRequestTypeDetailsId}>
                                            <div onClick={() => {
                                                serviceType.collapse = !serviceType.collapse;
                                                this.setState({ collapse: !this.state.collapse });
                                            }} id={'toggle' + serviceType.serviceRequestTypeDetailsId} className={"TabContainer " + serviceType.collapse}>
                                                <img src={require(`../../../../assets/ServiceTypes/${image_url}`)} className="ServiceTasksImg" alt="categoryImage" />
                                                <div className="TabHeaderContent">
                                                    <span className="TabHeaderText">{serviceType.serviceTypeDescription}</span>
                                                    <span><i className="SelectedTask">{serviceType.serviceRequestTypeTaskVisits.filter((taskList) => {
                                                        return taskList.checked || taskList.statusId === 90
                                                    }).length}</i>
                                                        <i className="TotalTasks">/{(serviceType.serviceRequestTypeTaskVisits).length}</i> tasks completed</span>
                                                </div>
                                            </div>
                                            <Collapse isOpen={serviceType.collapse}>
                                                <Card>
                                                    <CardBody>
                                                        {serviceType.serviceRequestTypeTaskVisits.map((taskList) => {
                                                            if (taskList.statusId === 90) {
                                                                taskList.checked = taskList.statusId === 90;
                                                                taskList.statusId = 45;
                                                            }

                                                            return (
                                                                <div className='ServiceList' key={taskList.serviceRequestTypeTaskDetailsId}>
                                                                    <input
                                                                        id={taskList.serviceRequestTypeTaskVisitId}
                                                                        type='checkbox'
                                                                        className='ServicesInput'
                                                                        name='serviceType'
                                                                        value={taskList.serviceRequestTypeTaskVisitId}
                                                                        checked={taskList.checked}
                                                                        onChange={(e) => {
                                                                            taskList.checked = e.target.checked;
                                                                            taskList.statusId = e.target.checked ? 90 : 45;
                                                                            this.handleChange(taskList, e);
                                                                        }}
                                                                        disabled={visitStatus === SERVICE_STATES.YET_TO_START}
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
                                        <span className="bottomTaskRange theme-primary">
                                            <i style={{ width: this.percentageCompletion && this.percentageCompletion + '%' }} className="bottomTaskCompletedRange" />
                                        </span>
                                        <span className="bottomTaskPercentage">{this.percentageCompletion && this.percentageCompletion}%</span>
                                    </div>
                                    <Button
                                        classname='btn btn-primary ml-auto'
                                        onClick={this.onClickNext}
                                        disable={visitStatus === SERVICE_STATES.IN_PROGRESS || visitStatus === SERVICE_STATES.YET_TO_START}
                                        label={'Next'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardBottom' />
                    <ModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={<span>You have not completed {this.taskCount} task(s). Are you sure you want to proceed to the next step?</span>}
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
                        ModalBody={<span>Do you want to End the Service?</span>}
                        btn1="Yes"
                        btn2="No"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => { this.setState({ isStopModalOpen: !this.state.isStopModalOpen }); this.startService(0, this.state.taskList.serviceRequestVisitId) }}
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
        getPerformTasksList: (data) => dispatch(getPerformTasksList(data, true)),
        addPerformedTask: (data, startServiceAction) => dispatch(addPerformedTask(data, startServiceAction)),
        getSummaryDetails: (data) => dispatch(getSummaryDetails(data)),
        startOrStopService: (data, visitId, startedTime) => dispatch(startOrStopService(data, visitId, startedTime)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        goBack: () => dispatch(goBack())
    }
};

function mapStateToProps(state) {
    return {
        PerformTasksList: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        ServiceRequestVisitId: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.ServiceRequestVisitId,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
        isLoading: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.isLoading,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformTasks));