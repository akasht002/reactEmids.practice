import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { StripeProvider } from 'react-stripe-elements';
import { VisitProcessingNavigationData } from '../../../../data/VisitProcessingWizNavigationData'
import { getFirstCharOfString } from '../../../../utils/stringHelper'
import { getpaymentsCardList, chargeByCustomerId, claimsSubmission, captureAmount } from '../../../../redux/visitSelection/VisitServiceProcessing/Payments/actions';
import { Scrollbars, DashboardWizFlow } from '../../../../components';
import { AsideScreenCover } from '../../../ScreenCover/AsideScreenCover';
import { SAVEDCARDS, NEWCARDS, AUTHORIZEDCARD } from '../../../../constants/constants'
import { STRIPE_KEY } from "../../../../constants/config"
import CheckoutForm from './stripe';
import './style.css'

class Payments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SelectedCard: '1',
            selectedCard: '',
            disabled: true
        };
    };

    toggleCardSelection = (e) => {
        this.setState({
            SelectedCard: e.target.value,
            disabled: true
        })
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        this.props.getpaymentsCardList(this.props.summaryAmount.SummaryDetails.patient.patientId);
    }

    handleChange = (e) => {
        this.setState({ selectedCard: e.target.id, disabled: false })
    }

    handleClick = () => {
        const data = {
            "paymentAmount": Math.ceil(this.props.summaryAmount.CalculationsData.copayAmount),
            "patientId": this.props.summaryAmount.SummaryDetails.patient.patientId,
            "coreoHomeStripeCustomerId": this.state.selectedCard,
            "serviceRequestId": this.props.summaryAmount.SummaryDetails.serviceRequestId,
            "serviceRequestVisitId": this.props.summaryAmount.SummaryDetails.serviceRequestVisitId
        }
        this.props.chargeByCustomerId(data);
        this.payByAuthorizedCard();
    }

    payByAuthorizedCardOption = () => {
        this.payByAuthorizedCard();
        this.captureAmount();
    }

    payByAuthorizedCard = () => {
        const data = {
            "serviceRequestId": this.props.summaryAmount.SummaryDetails.serviceRequestId,
            "claimOnsetDate": this.props.summaryAmount.SummaryDetails.visitDate,
            "claimServiceLinesChargeAmount": Math.ceil(this.props.summaryAmount.CalculationsData.estimatedClaim),
            "claimServiceLinesProcedureCode": "",
            "claimServiceLinesProcedureModifierCodes": "",
            "claimServiceLinesDiagnosisCodes": "",
            "claimServiceLinesServiceDate": this.props.summaryAmount.SummaryDetails.visitDate,
            "qualifier": "",
            "claimServiceLinesPlaceOfService": "",
            "claimServiceLinesUnitCount": "",
            "claimTotalChargeAmount": Math.ceil(this.props.summaryAmount.CalculationsData.grandTotalAmount),
            "claimPatientPaidAmount": Math.ceil(this.props.summaryAmount.CalculationsData.copayAmount),
            "billingProviderNPI": "",
            "billingProviderAddress": "",
            "billingProviderLastName": "",
            "billingProviderFirstName": ""
        }
        this.props.claimsSubmission(data);
    }

    captureAmount = () => {
        const data = {
            "serviceProviderId": this.props.summaryAmount.SummaryDetails.serviceProviderId,
            "serviceRequestId": this.props.summaryAmount.SummaryDetails.serviceRequestId,
            "serviceRequestVisitId": this.props.summaryAmount.SummaryDetails.serviceRequestVisitId,
            "patientId": this.props.summaryAmount.SummaryDetails.patient.patientId,
            "amount": Math.ceil(this.props.summaryAmount.CalculationsData.copayAmount),
            "customerId": "",
            "chargeId": 0,
        }
        this.props.captureAmount(data)
    }

    paymentsMethods = () => {
        if (this.state.SelectedCard === '1') {
            return (
                <div className="FeedbackQuestionWidget form-group m-0">
                    <label className="FeedbackQuestion">Choose the card</label>
                    <div className='FeedbackAnswerWidget CardTypeContent'>
                        {this.props.CardList && this.props.CardList.map((cardDetails) => {
                            return (
                                <div className="form-radio col-md-6">
                                    <input
                                        className="form-radio-input"
                                        name="CardType"
                                        id={cardDetails.coreoHomeStripeCustomerId}
                                        type="radio"
                                        value={cardDetails.coreoHomeStripeCustomerId}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <label className="form-radio-label" htmlFor={cardDetails.coreoHomeStripeCustomerId}>
                                        <div className="CardTypeContainer">
                                            <div className="CardTypeContainerLeft">
                                                <span>{cardDetails.ccNumber}</span>
                                            </div>
                                            <div className="CardTypeContainerRight">
                                                <img alt="card_image" src={require("../../../../assets/images/creditCards/" + cardDetails.ccType + ".png")} />
                                            </div>
                                        </div>
                                        <span className="RadioBoxIcon" /></label>
                                </div>
                            )
                        })}
                    </div>
                    <div className='text-right width100'>
                        <button disabled={this.state.disabled} className='btn btn-primary' onClick={this.handleClick}>Pay</button>
                    </div>
                </div>
            )
        } else if (this.state.SelectedCard === '2') {
            return (
                <div className="CardDetailsWidget m-0">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label className="m-0">Enter the card details</label>
                        </div>
                        <StripeProvider apiKey={STRIPE_KEY}>
                            <CheckoutForm claimSubmission={this.payByAuthorizedCard} />
                        </StripeProvider>
                    </div>
                </div>
            )
        } else if (this.state.SelectedCard === '3') {
            return (
                <div className='text-right width100'>
                    <button className='btn btn-primary' onClick={this.payByAuthorizedCardOption}>Pay</button>
                </div>
            )
        }
    }

    render() {

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Service Requests <span>/ {this.props.patientDetails.serviceRequestId}</span></h5>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                    className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>
                        <div className='CardContainers TitleWizardWidget'>
                            <div className='TitleContainer'>
                                <i className="TitleContent backProfileIcon" />
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'><Moment format="ddd, DD MMM">{this.props.patientDetails.visitDate}</Moment>, {this.props.patientDetails.slot}</i>{this.props.patientDetails.serviceRequestId}</span>
                                    </div>
                                    <div className='requestImageContent'>
                                        {this.props.patientDetails.patient ?
                                            <span>
                                                <img
                                                    src={this.props.patientDetails.patient && this.props.patientDetails.patient.imageString}
                                                    className="avatarImage avatarImageBorder" alt="patientImage" />
                                                <i className='requestName'>{this.props.patientDetails.patient.firstName} {this.props.patientDetails.patient.lastName && getFirstCharOfString(this.props.patientDetails.patient.lastName)}</i></span>
                                            :
                                            ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers WizardWidget'>
                            <div className="row">
                                <div className="col col-md-8 WizardContent">
                                    <DashboardWizFlow VisitProcessingNavigationData={VisitProcessingNavigationData} activeFlowId={3} />
                                </div>
                                <div className="col col-md-4 rightTimerWidget running">
                                    <div className="row rightTimerContainer">
                                        <div className="col-md-5 rightTimerContent FeedbackTimer">
                                            <span className="TimerContent running">{this.props.SummaryDetails.originalTotalDuration}</span>
                                        </div>
                                        <div className="col-md-7 rightTimerContent FeedbackTimer">
                                            <span className="TimerStarted running">Started at {this.props.startedTime && this.props.startedTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='CardContainers ServiceCategoryWidget'>
                            <div className='VisitPaymentContainer'>
                                <div className="VisitPaymentWidget">
                                    <p className="VisitPaymentContentTitle">Make Payment</p>
                                    <p className="VisitPaymentAmountPaid">Amount to be paid <i>${Math.ceil(this.props.summaryAmount.CalculationsData.copayAmount)}</i></p>
                                    <div className="FeedbackQuestionWidget form-group">
                                        <label className="FeedbackQuestion">Select the method of Payment</label>
                                        <div className='FeedbackAnswerWidget'>
                                            <div className="form-radio col-md-6">
                                                <input className="form-radio-input" name="CardSelect" id="CardSelect11" type="radio"
                                                    value={1} onClick={this.toggleCardSelection} checked={this.state.SelectedCard === SAVEDCARDS ? 'checked' : ''} />
                                                <label className="form-radio-label" htmlFor="CardSelect11">Saved Card
                                    <span className="RadioBoxIcon" /></label>
                                            </div>
                                            <div className="form-radio col-md-6">
                                                <input className="form-radio-input" name="CardSelect" id="CardSelect12" type="radio"
                                                    value={2} onClick={this.toggleCardSelection} checked={this.state.SelectedCard === NEWCARDS ? 'checked' : ''} />
                                                <label className="form-radio-label" htmlFor="CardSelect12">New Card
                                    <span className="RadioBoxIcon" /></label>
                                            </div>
                                            <div className="form-radio col-md-6">
                                                <input className="form-radio-input" name="CardSelect" id="CardSelect13" type="radio"
                                                    value={3} onClick={this.toggleCardSelection} checked={this.state.SelectedCard === AUTHORIZEDCARD ? 'checked' : ''} />
                                                <label className="form-radio-label" htmlFor="CardSelect13">Pay through pre authorized card
                                    <span className="RadioBoxIcon" /></label>
                                            </div>
                                        </div>
                                    </div>

                                    {this.paymentsMethods()}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardBottom' />
                </Scrollbars>
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getpaymentsCardList: (data) => dispatch(getpaymentsCardList(data)),
        chargeByCustomerId: (data) => dispatch(chargeByCustomerId(data)),
        claimsSubmission: (data) => dispatch(claimsSubmission(data)),
        captureAmount: (data) => dispatch(captureAmount(data))
    }
};

function mapStateToProps(state) {
    return {
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
        summaryAmount: state.visitSelectionState.VisitServiceProcessingState.SummaryState,
        CardList: state.visitSelectionState.VisitServiceProcessingState.PaymentsState.CardList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payments));