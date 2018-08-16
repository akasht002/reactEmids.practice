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
import './style.css'
import { Link } from "react-router-dom";
import {Collapse, CardBody, Card} from 'reactstrap';

class PerformTasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            taskList: {},
            checked: false
        };
    };

    toggle() {
        this.setState({collapse: !this.state.collapse});
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

            <form className='ServiceContent'>
                <div className="TabContainerWidget">
                    <div className={"TabContainer " + this.state.collapse} onClick={this.toggle.bind(this)}>
                        {/* <img src={imagePath("./Bathing_Purple.svg")} className="ServiceTasksImg" /> */}
                        <div className="TabHeaderContent">
                            <span className="TabHeaderText">Bathing</span>
                            <span><i className="SelectedTask">3</i><i
                                className="TotalTasks">/4</i> tasks completed</span>
                        </div>
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <div className='ServiceList'>
                                    <input id='Services1' type='checkbox' className='ServicesInput' name='serviceType'
                                        value="2" />
                                    <label className='ServicesLink' htmlFor='Services1'>
                                        <div className='servicesDesc'>
                                            <span className='serviceName'>Collect Clothes</span>
                                        </div>
                                    </label>
                                    <span className='ServiceIndicatorBottom' />
                                </div>
                                <div className='ServiceList'>
                                    <input id='Services2' type='checkbox' className='ServicesInput' name='serviceType'
                                        value="2" />
                                    <label className='ServicesLink' htmlFor='Services2'>
                                        <div className='servicesDesc'>
                                            <span
                                                className='serviceName'>Help the individual to reach the bathroom</span>
                                        </div>
                                    </label>
                                    <span className='ServiceIndicatorBottom' />
                                </div>
                                <div className='ServiceList'>
                                    <input id='Services3' type='checkbox' className='ServicesInput' name='serviceType'
                                        value="2" />
                                    <label className='ServicesLink' htmlFor='Services3'>
                                        <div className='servicesDesc'>
                                            <span className='serviceName'>Help in bathing</span>
                                        </div>
                                    </label>
                                    <span className='ServiceIndicatorBottom' />
                                </div>
                                <div className='ServiceList'>
                                    <input id='Services4' type='checkbox' className='ServicesInput' name='serviceType'
                                        value="2" />
                                    <label className='ServicesLink' htmlFor='Services4'>
                                        <div className='servicesDesc'>
                                            <span className='serviceName'>Help the individual in changing clothes</span>
                                        </div>
                                    </label>
                                    <span className='ServiceIndicatorBottom' />
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
                <div className='bottomButton'>
                    <div className='col-md-5 d-flex mr-auto bottomTaskbar'>
                        <span className="bottomTaskName">Tasks</span>
                        <span className="bottomTaskRange">
                            <i style={{ width: '83.3%' }} className="bottomTaskCompletedRange" />
                        </span>
                        <span className="bottomTaskPercentage">83.3%</span>
                    </div>
                    <Link className='btn btn-primary ml-auto' to='/schedulerequest'>Next</Link>
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
        getPerformTasksList: () => dispatch(getPerformTasksList())
    }
};

function mapStateToProps(state) {
    return {
        PerformTasksList: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PerformTasks));