import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ModalPopup } from '../../../components';
import { getpaymentsCardList, deleteCard } from '../../../redux/paymentSettings/actions';
import './style.css'

class PaymentCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedCard: '',
            AddCard: false,
            cardId: '',
            showModalOnDelete: false
        };
    };

    componentDidMount() {
        this.props.getpaymentsCardList();
    }

    toggleCardSelection(e) {
        this.setState({
            SelectedCard: e.target.value
        });
    }

    onClickDelete = (id) => {
        this.setState({showModalOnDelete: true, cardId: id})
    }

    deleteCard = () => {
        this.props.deleteCard(this.state.cardId);
        this.setState({showModalOnDelete: !this.state.showModalOnDelete,})
    }

    render() {
        return (
            <div className='VisitPaymentContainer'>
                <div className="VisitPaymentWidget">
                    <p className="VisitPaymentContentTitle">Saved Cards</p>
                    <p className="VisitPaymentlabel">Please select a card to make it Primary</p>
                    <div className="PaymentCardWidget">
                        <div className='PaymentCardContainer'>
                            {this.props.CardList && this.props.CardList.map((cardDetails) => {
                                return (
                                    <div className="form-radio">
                                        <input className="form-radio-input" name="CardSelect" id="CardSelect11" type="radio"
                                            value="1" onClick={this.toggleCardSelection.bind(this)} />
                                        <label className="form-radio-label" htmlFor="CardSelect11">
                                            <div className="PaymentCardContent">
                                                <div className="PaymentCardNumberContainer">
                                                    <div className="PaymentCardImageContent">
                                                        <img alt="card_image" src={require("../../../assets/images/creditCards/Mastercard.png")}/>                                                   
                                                    </div>
                                                    <div className="PaymentCardNumberContent">
                                                        <span className="PaymentCardLabel">Card Number</span>
                                                        <span className="PaymentCardNumber">{cardDetails.ccNumber}</span>
                                                    </div>
                                                </div>
                                                {/* <div className="PaymentCardNameContainer">
                                                    <div className="PaymentCardNameContent">
                                                        <span className="PaymentCardLabel">Cardholder Name</span>
                                                        <span className="PaymentCardName">Dan Smith</span>
                                                    </div>
                                                    <div className="PaymentCardExpireContent">
                                                        <span className="PaymentCardLabel">Expires on</span>
                                                        <span className="PaymentCardName">08 - 2025</span>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </label>
                                        <span className="PaymentDeleteButton" onClick={() => this.onClickDelete(cardDetails.coreoHomeStripeCustomerId)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <ModalPopup
                        isOpen={this.state.showModalOnDelete}
                        ModalBody={<span>Are you sure you want to delete this card?</span>}
                        btn1="Confirm"
                        btn2="Cancel"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.deleteCard()}
                        onCancel={() => this.setState({
                            showModalOnDelete: !this.state.showModalOnDelete,
                        })}
                    />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getpaymentsCardList: () => dispatch(getpaymentsCardList()),
        deleteCard: (data) => dispatch(deleteCard(data))
    }
};

function mapStateToProps(state) {
    return {
        CardList: state.paymentsSettingsState.CardList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentCards));
