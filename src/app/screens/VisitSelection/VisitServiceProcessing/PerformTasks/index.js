import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData'
import { getPerformTasksList, addPerformedTask, startOrStopService } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import { LeftSideMenu, ProfileHeader, Scrollbars, DashboardWizFlow, ModalPopup } from '../../../../components';
import Stopwatch from './Stopwatch'
import { convertTime24to12, getFirstCharOfString } from '../../../../utils/validations'
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
            startService: true,
            startedTime: '',
            isModalOpen: false,
            disabled: true,
            taskCount: '',
            a:''
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
        this.setState({ checkedData: this.checkedTask })
    }

    startService = (data, visitId) => {
        if (data === 1) {
            let current_time = new moment().format("HH:mm");
            this.setState({ startedTime: current_time })
        }
        this.setState({ startService: !this.state.startService, disabled: false })
        this.props.startOrStopService(data, visitId);
    }

    onClickNext = () => {
        if (!this.state.startService) {
            // if()
            this.setState({ isModalOpen: true })
        }
    }

    onSubmit = () => {
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
            <section className="d-flex" >
                <LeftSideMenu isOpen={this.state.isOpen} />
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader />
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
                                        <a className="TitleContent backProfileIcon" />
                                        <div className='requestContent'>
                                            <div className='requestNameContent'>
                                                <span><i className='requestName'><Moment format="DD MMM">{this.state.taskList.visitDate}</Moment>, {this.state.taskList.slot}</i>{this.state.taskList.serviceRequestId}</span>
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
                                        <div className="col col-md-3 rightTimerWidget">
                                            <div className="row rightTimerContainer">
                                                <div className="col-md-5 rightTimerContent">
                                                    <span className="TimerContent">
                                                        <Stopwatch ref={instance => { this.child = instance; }} />
                                                    </span>
                                                </div>
                                                <div className="col-md-7 rightTimerContent">
                                                    {this.state.startService ?
                                                        <a className="btn btn-primary" onClick={() => { this.startService(1, this.state.taskList.serviceRequestVisitId); this.child.handleStartClick(); }}>Start Service</a>
                                                        :
                                                        <a className="btn btn-primary" onClick={() => { this.startService(0, this.state.taskList.serviceRequestVisitId); this.child.handleStopClick(); }}>Stop Service</a>
                                                    }
                                                    {this.state.startedTime ?
                                                        <span className="TimerStarted">Started at {convertTime24to12(this.state.startedTime)}</span>
                                                        :
                                                        ''
                                                    }
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
                                                        <img src={require("../../../../assets/images/Bathing_Purple.svg")} className="ServiceTasksImg" alt="categoryImage" />
                                                        <div className="TabHeaderContent">
                                                            <span className="TabHeaderText">{serviceType.serviceTypeDescription}</span>
                                                            <span><i className="SelectedTask">{serviceType.serviceRequestTypeTaskVisits.filter((taskList) => {
                                                                return taskList.checked
                                                            }).length}</i>
                                                                <i className="TotalTasks">/{(serviceType.serviceRequestTypeTaskVisits).length}</i> tasks completed</span>
                                                        </div>
                                                    </div>
                                                    <Collapse isOpen={this.state.isOpen} toggler={'#toggle' + serviceType.serviceRequestTypeDetailsId}>
                                                        <Card>
                                                            <CardBody>
                                                                {serviceType.serviceRequestTypeTaskVisits.map((taskList) => {
                                                                    console.log(taskList.length)
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
                                            {/* <div className='col-md-5 d-flex mr-auto bottomTaskbar'>
                                                <span className="bottomTaskName">Tasks</span>
                                                <span className="bottomTaskRange">
                                                    <i style={{ width: '83.3%' }} className="bottomTaskCompletedRange" />
                                                </span>
                                                <span className="bottomTaskPercentage">83.3%</span>
                                            </div> */}
                                            <a className='btn btn-primary ml-auto' onClick={this.onClickNext} disabled={this.state.disabled}>Next</a>
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
                        </Scrollbars>
                    </div>
                </div>
            </section >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPerformTasksList: () => dispatch(getPerformTasksList()),
        addPerformedTask: (data) => dispatch(addPerformedTask(data)),
        startOrStopService: (data, visitId) => dispatch(startOrStopService(data, visitId))
    }
};

function mapStateToProps(state) {
    return {
        PerformTasksList: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformTasks));