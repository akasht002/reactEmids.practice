import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import { getPerformTasksList, addPerformedTask } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';
import './style.css'
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card, UncontrolledCollapse } from 'reactstrap';
import Stopwatch from 'react-stopwatch';

class PerformTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            taskList: {},
            //checked: false
            checkedCount: 0,
            checkedData: ''
        };
        this.checkedTask = [];
    };

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
        //this.setState({ checkedCount:  })
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
                                        {/* <Stopwatch
                                            seconds={0}
                                            minutes={0}
                                            hours={0}
                                            limit={"00:10"}
                                            withLoop={true}
                                            onCallback={() => console.log('Finish')}
                                        /> */}
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