import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    Elements,
    injectStripe
} from 'react-stripe-elements';
import { createCharge } from '../../../../redux/visitSelection/VisitServiceProcessing/Payments/actions';

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#444444',
                height: '100%'
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};

class _CardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardErrorMessage: '',
            expErrorMessage: '',
            cvcErrorMessage: '',
        };
    }

    handleChangeCardNumber = () => {
        this.setState({ cardErrorMessage: '' })
    }

    handleChangeExpDate = () => {
        this.setState({ expErrorMessage: '' })
    }

    handleChangeCVC = () => {
        this.setState({ cvcErrorMessage: '' })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.stripe.createToken().then(payload => {
            if (payload.token) {
                const data = {
                    "patientId": this.props.data.SummaryDetails.patient.patientId,
                    "token": payload.token.id,
                    "cardNumberChanged": payload.token.card.last4,
                    "amount": Math.ceil(this.props.data.CalculationsData.grandTotalAmount),
                    "cardType": payload.token.card.brand,
                    "serviceRequestId": this.props.data.SummaryDetails.serviceRequestId,
                    "serviceRequestVisitId": this.props.data.SummaryDetails.serviceRequestVisitId,
                }
                this.props.token(data);
                this.props.claimSubmission();
            } else {
                if (payload.error.code === 'incomplete_number') {
                    this.setState({ cardErrorMessage: payload.error.message, expErrorMessage: '', cvcErrorMessage: '' })
                } else if (payload.error.code === 'incomplete_expiry') {
                    this.setState({ expErrorMessage: payload.error.message, cardErrorMessage: '', cvcErrorMessage: '' })
                } else if (payload.error.code === 'incomplete_cvc') {
                    this.setState({ cvcErrorMessage: payload.error.message, cardErrorMessage: '', expErrorMessage: '' })
                }
            }
        })
    }

    render() {
        return (
            <form className="row" onSubmit={this.handleSubmit}>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="m-0">Card Number</label>
                        <CardNumberElement
                            onChange={this.handleChangeCardNumber}
                            placeholder={'Enter Card Number'}
                            {...createOptions()}
                        />
                        <small className="text-danger d-block OnboardingAlert mt-2">
                            {this.state.cardErrorMessage}
                        </small>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="m-0">Expiry Date</label>
                        <CardExpiryElement onChange={this.handleChangeExpDate} {...createOptions()} />
                        <small className="text-danger d-block OnboardingAlert mt-2">
                            {this.state.expErrorMessage}
                        </small>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mt-0">
                        <label className="m-0">CVC / CVV</label>
                        <CardCVCElement
                            onChange={this.handleChangeCVC}
                            placeholder={'Enter CVC / CVV'}
                            {...createOptions()}
                        />
                        <small className="text-danger d-block OnboardingAlert mt-2">
                            {this.state.cvcErrorMessage}
                        </small>
                    </div>
                    <p><strong>Note:</strong> Information provided above is secure</p> 
                </div>
                <div id="card-errors" role="alert"></div>
                <div className='col-md-12 mt-3'>
                    <div className='text-right'>
                        <button className='btn btn-primary'>Pay</button>
                    </div>
                </div>
            </form>
        )
    }
}
const CardForm = injectStripe(_CardForm)

class CheckoutForm extends React.Component {

    chargeData = (data) => {
        this.props.createCharge(data);
    }

    render() {
        return (
            <div className="col-md-12">
                <Elements>
                    <CardForm
                        token={this.chargeData}
                        data={this.props.summaryAmount}
                        claimSubmission={this.props.claimSubmission}
                    />
                </Elements>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createCharge: (data) => dispatch(createCharge(data)),
    }
};

function mapStateToProps(state) {
    return {
        summaryAmount: state.visitSelectionState.VisitServiceProcessingState.SummaryState,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm));