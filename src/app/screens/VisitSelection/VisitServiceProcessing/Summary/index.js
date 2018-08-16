import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.css'
import { Link } from "react-router-dom";
import { Collapse, CardBody, Card } from 'reactstrap';
import NumericInput from 'react-numeric-input';

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            modal: false,
        };
    };

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    AdjustTime(){
        this.setState({
            modal: !this.state.modal
        });
    }


    render() {

        let ModalContent = '';

        if (this.state.modal) {
            ModalContent = <form className="AdjustTimeForm">
                <p className="AdjustTimeText">
                    Time taken to complete the service
                </p>
                <p className="AdjustTimeContent">
                    HH <NumericInput min={0} max={12} value={12} className="NumericInput"/> MM <NumericInput min={0} max={60} value={55} className="NumericInput"/>
                </p>
            </form>
        }

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
                                <div className="col-md-4 SummaryRange">
                                    <span className="bottomTaskName">Tasks</span>
                                    <span className="bottomTaskRange">
                                        <i style={{width: '83.3%'}} className="bottomTaskCompletedRange"/>
                                    </span>
                                    <span className="bottomTaskPercentage">83.3%</span>
                                </div>
                            </div>
                            <p className="SummaryContentTitle">Payment Details</p>

                            <div className="row CostTableWidget">
                                <span className="EditIcon" onClick={this.AdjustTime.bind(this)} />
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

                            <div className="row EstimatedCostWidget">
                                <div className="col-md-8 EstimatedCostContainer Label">
                                    <p><span>Estimated Claim</span>
                                        <span>Out of Pocket Amount</span></p>
                                </div>
                                <div className="col-md-4 EstimatedCostContainer Cost">
                                    <p><span>$20.00</span>
                                        <span>$6.50</span></p>
                                </div>
                            </div>
                            <p className="DisclaimerText">Disclaimer - I authorize this payment recognizing that this claim is an estimate pending the claim process</p>
                        </div>
                    </div>
                    <div className="RightWidget">
                        <div className="RightContent">
                            <p className="SummaryContentTitle">Customer Signature</p>
                            <p>Put your signature inside the box</p>
                            <div className="SignatureColumn"/>
                        </div>
                    </div>
                </div>
                <div className='bottomButton'>
                    <div className='ml-auto'>
                        <Link className='btn btn-outline-primary mr-3' to='/VisitProcessing'>Previous</Link>
                        <Link className='btn btn-primary' to='/schedulerequest'>Proceed to Payment</Link>
                    </div>
                </div>

                {/* <ServiceProviderModalTemplate
                    isOpen={this.state.modal}
                    toggle={this.AdjustTime.bind(this)}
                    ModalBody={ModalContent}
                    className="modal-lg"
                    modalTitle="Adjust Time"
                    centered="centered"
                /> */}

            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
};

function mapStateToProps(state) {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary));