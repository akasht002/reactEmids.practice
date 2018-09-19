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
        this.card_name = ''
    }
    render() {
        return (
            <form className="row" onSubmit={(e) => {
                e.preventDefault();
                this.props.stripe.createToken({ name: this.card_name }).then(payload => {
                    if (payload) {
                        const data = {
                            "patientId": 1,
                            "token": payload.token.id,
                            "cardNumberChanged": payload.token.card.last4,
                            "amount": 500,
                            "cardType": payload.token.card.brand,
                            "isSaveCard": false
                        }
                        this.props.token(data)
                    }
                })
            }}>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="m-0">Card Number</label>
                        <CardNumberElement {...createOptions()} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="m-0">Cardholder Name</label>
                        <input
                            id="card-name"
                            onChange={(e) => this.card_name = e.target.value}
                            className="form-control"
                            placeholder="Dan Wilson"
                            autocomplete="off" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="m-0">Expiry Date</label>
                        <CardExpiryElement {...createOptions()} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mt-0">
                        <label className="m-0">CVC</label>
                        <CardCVCElement {...createOptions()} />
                    </div>
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
                    <CardForm token={this.chargeData} />
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

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm));