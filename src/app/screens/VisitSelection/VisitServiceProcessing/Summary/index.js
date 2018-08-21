import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
// import SignaturePad from 'react-signature-pad';
import SignaturePad from 'react-signature-pad-wrapper'
import { LeftSideMenu, ProfileHeader, Scrollbars, DashboardWizFlow } from '../../../../components';
import { getSummaryDetails } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData';
import './style.css'

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            modal: false,
            summaryDetails: {}
        };
    };

    componentDidMount(){
        this.props.getSummaryDetails();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ summaryDetails: nextProps.SummaryDetails })
        console.log(this.state.summaryDetails)
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    AdjustTime = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    saveSignature = () => {
        const data = this.signaturePad.toDataURL();
        console.log(data);
    }

    render() {

        let ModalContent = '';
        console.log(this.state.summaryDetails && this.state.summaryDetails)

        if (this.state.modal) {
            ModalContent = <form className="AdjustTimeForm">
                <p className="AdjustTimeText">
                    Time taken to complete the service
                </p>
                <p className="AdjustTimeContent">
                    HH
                </p>
            </form>
        }

        return (
            <section className="d-flex">
                <LeftSideMenu isOpen={this.state.isOpen} />
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.toggle} />
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)} />
                    <div className='ProfileRightContainer'>
                        <div className='ProfileHeaderWidget'>
                            <div className='ProfileHeaderTitle'>
                                <h5 className='primaryColor m-0'>Service Requests <span>/ VID97531</span></h5>
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
                                                <span><i className='requestName'>Sun, 24 Aug, Morning</i>VID97531</span>
                                            </div>
                                            <div className='requestImageContent'>
                                                <span>
                                                    <i className='requestName'>Christopher W</i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='CardContainers WizardWidget'>
                                    <div className="row">
                                        <div className="col col-md-9 WizardContent">
                                            <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={2} />
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
                                                                <i style={{ width: '83.3%' }} className="bottomTaskCompletedRange" />
                                                            </span>
                                                            <span className="bottomTaskPercentage">83.3%</span>
                                                        </div>
                                                    </div>
                                                    <p className="SummaryContentTitle">Payment Details</p>

                                                    <div className="row CostTableWidget">
                                                        <span className="EditIcon" onClick={this.AdjustTime} />
                                                        <div className="col-md-8 CostTableContainer Label">
                                                            <p><span>Total Chargeable Time</span>
                                                                <span>Hourly Rate</span></p>
                                                            <p className="TaxLabel"><span>Total Visit Cost </span>
                                                                <span>Taxes and Fees</span></p>
                                                        </div>
                                                        <div className="col-md-4 CostTableContainer Cost">
                                                            <p><span>01:45 hrs</span>
                                                                <span>${this.props.SummaryDetails.hourlyRate && this.props.SummaryDetails.hourlyRate}/hr</span></p>
                                                            <p className="TaxCost"><span>${this.props.SummaryDetails.totalCost && this.props.SummaryDetails.totalCost}</span>
                                                                <span>${this.props.SummaryDetails.taxPaid && this.props.SummaryDetails.taxPaid}</span></p>
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
                                                            <p><span>${this.props.SummaryDetails.estimatedClaim && this.props.SummaryDetails.estimatedClaim}</span>
                                                                <span>${this.props.SummaryDetails.outOfPocketAmount && this.props.SummaryDetails.outOfPocketAmount}</span></p>
                                                        </div>
                                                    </div>
                                                    <p className="DisclaimerText">Disclaimer - I authorize this payment recognizing that this claim is an estimate pending the claim process</p>
                                                </div>
                                            </div>
                                            <div className="RightWidget">
                                                <div className="RightContent">
                                                    <p className="SummaryContentTitle">Customer Signature</p>
                                                    <p>Put your signature inside the box</p>
                                                    <div className="SignatureColumn">
                                                        <SignaturePad width={420} height={320} ref={ref => this.signaturePad = ref} />
                                                    </div>
                                                    <button onClick={this.saveSignature}>log signature</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bottomButton'>
                                            <div className='ml-auto'>
                                                <Link className='btn btn-outline-primary mr-3' to='/VisitProcessing'>Previous</Link>
                                                <Link className='btn btn-primary' to='/schedulerequest'>Proceed to Payment</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='cardBottom' />
                        </Scrollbars>
                    </div>
                </div>
            </section>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSummaryDetails: () => dispatch(getSummaryDetails()),
    }
};

function mapStateToProps(state) {
    return {
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.SummaryState.SummaryDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary));