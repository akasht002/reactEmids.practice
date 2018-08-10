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
import { getPerformTasksList } from '../../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions';

class PerformTasks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskList: {},
            checked: false
        }
    }

    componentDidMount() {
        this.props.getPerformTasksList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ taskList: nextProps.PerformTasksList })
    }

    handleChange = (e) => {
        console.log(e.target.id)
        this.setState({ checked: !this.state.checked })
    }

    render() {

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Request ID: {this.state.taskList.ServiceRequestId}</div>
                    <div className="card-body">
                        {this.props.PerformTasksList.ServiceTypes && this.props.PerformTasksList.ServiceTypes.map((serviceType) => {
                            return (
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            {serviceType.ServiceTypeDescription}
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            {serviceType.ServiceTasks && serviceType.ServiceTasks.map((serviceTask) => {
                                                return (
                                                    <li>
                                                        {serviceTask.ServiceTaskDescription}
                                                        <input
                                                            type="checkbox"
                                                            id={serviceTask.ServiceTaskId}
                                                            onChange={(e) => this.handleChange(e)}
                                                            checked={this.state.checked}
                                                        />
                                                        {/* <input
                                                            id={this.props.service.serviceTypeId}
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value={this.props.service.serviceTypeDescription}
                                                            onChange={this.props.handleClick}
                                                            checked={this.props.service.isActive}
                                                            defaultChecked={this.props.service.isActive}
                                                        /> */}
                                                    </li>
                                                )
                                            })}
                                        </AccordionItemBody>
                                    </AccordionItem>
                                </Accordion>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPerformTasksList: () => dispatch(getPerformTasksList())
    }
};

function mapStateToProps(state) {
    return {
        PerformTasksList: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformTasks));