import React from "react";
import {Link} from "react-router-dom";
import 'primary_path/components/Dashboard/styles/VisitSummary.css';
import NumericInput from 'react-numeric-input';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const images = require.context('primary_path/assets/img', true);
const imagePath = (name) => images(name, true);

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
    };

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {

        return (
            <form className='ServiceContent'>
                <div className="VisitSummaryWidget">
                    <div className="LeftWidget">
                        <div className="LeftContent">
                            <p className="SummaryContentTitle">Service Visit Details</p>
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="CategoryName"><span className="CategoryTitle">Bathing, Grooming, Nursing</span>
                                        <span className="CategorySub">Activities of Daily Living</span></p>
                                </div>
                                <div className="col-md-4">
                                    <div className="SummaryTime">
                                        <span>Visit Length</span>
                                        <span className="SummaryTotalTime">01:45 hrs</span>
                                    </div>
                                    <div className="SummaryRange">
                                        <span className="bottomTaskName">Tasks</span>
                                        <span className="bottomTaskRange">
                                        <i style={{width: '83.3%'}} className="bottomTaskCompletedRange"/>
                                    </span>
                                        <span className="bottomTaskPercentage">83.3%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="TabContainerWidget Individual">
                                <Accordion>
                                    <AccordionItem expanded={true}>
                                        <AccordionItemTitle className="TabContainer">
                                            <img src={imagePath("./Bathing_Purple.svg")}
                                                 className="ServiceTasksImg"/>
                                            <div className="TabHeaderContent">
                                                <span className="TabHeaderText">Bathing</span>
                                                <span><i className="SelectedTask">3</i><i
                                                    className="TotalTasks">/4</i> tasks completed</span>
                                            </div>
                                        </AccordionItemTitle>

                                        <AccordionItemBody>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink active' htmlFor='Services1'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Collect Clothes</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink' htmlFor='Services2'>
                                                    <div className='servicesDesc'>
                                            <span
                                                className='serviceName'>Help the individual to reach the bathroom</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink' htmlFor='Services3'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Help in bathing</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink' htmlFor='Services4'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Help the individual in changing clothes</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                        </AccordionItemBody>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionItemTitle className="TabContainer">
                                            <img src={imagePath("./Bathing_Purple.svg")}
                                                 className="ServiceTasksImg"/>
                                            <div className="TabHeaderContent">
                                                <span className="TabHeaderText">Bathing</span>
                                                <span><i className="SelectedTask">3</i><i
                                                    className="TotalTasks">/4</i> tasks completed</span>
                                            </div>
                                        </AccordionItemTitle>

                                        <AccordionItemBody>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink active' htmlFor='Services1'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Collect Clothes</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink' htmlFor='Services2'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Help the individual to reach the bathroom</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink' htmlFor='Services3'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Help in bathing</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                            <div className='ServiceList Individual Summary'>
                                                <label className='ServicesLink' htmlFor='Services4'>
                                                    <div className='servicesDesc'>
                                                        <span className='serviceName'>Help the individual in changing clothes</span>
                                                    </div>
                                                </label>
                                                <span className='ServiceIndicatorBottom'/>
                                            </div>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <div className="RightWidget">
                        <div className="RightContent">
                            <p className="SummaryContentTitle">Payment Details</p>

                            <div className="row CostTableWidget">
                                <div className="col-md-8 CostTableContainer Label">
                                    <p><span>Total Chargeable Time</span>
                                        <span>Hourly Rate</span></p>
                                    <p className="TaxLabel"><span>Total Visit Cost </span>
                                        <span>Taxes and Fees</span></p>
                                </div>
                                <div className="col-md-4 CostTableContainer Cost">
                                    <p><span>01:45 hrs</span>
                                        <span>$12/hr</span></p>
                                    <p className="TaxCost"><span>$23.00</span>
                                        <span>$9.50</span></p>
                                </div>
                                <div className="col-md-12 CostTableContainer Total">
                                    <p className="TotalLabel"><span>Total Cost </span></p>
                                    <p className="TotalCost"><span>$32.50</span></p>
                                </div>
                            </div>

                            <div className="row EstimatedCostWidget m-0 mb-4">
                                <div className="col-md-8 EstimatedCostContainer Label">
                                    <p><span>Submitted Claim</span>
                                        <span>Out of Pocket Amount</span></p>
                                </div>
                                <div className="col-md-4 EstimatedCostContainer Cost">
                                    <p><span>$20.00</span>
                                        <span>$12.50</span></p>
                                </div>
                            </div>
                            <p className="SummaryContentTitle mb-4">Feedback</p>
                            <div className="feedbackContainer">
                                <p>Rating obtained <span className="SPRating"><i className="Icon iconFilledStar"/>4.2</span></p>
                                <span className='FeedbackLink' onClick={this.props.FeedbackModal}>Show Feedback</span>
                                <p>Your feedback is pending. Click <span className='FeedbackLink' onClick={this.props.FeedbackModal}>Here</span> to submit feedback.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}

export default Summary;