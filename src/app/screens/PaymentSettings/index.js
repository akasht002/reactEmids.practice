import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Scrollbars, ProfileModalPopup } from '../../components';
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import PaymentCards from './PaymentsCards'
import CheckoutForm from './stripe';
import { StripeProvider } from 'react-stripe-elements';

class PaymentSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {

    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    addCard = () => {
        this.setState({ isModalOpen: true })
    }

    render() {
        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Payments<span></span></h5>
                    </div>
                    <div className="ProfileHeaderButton">
                        <span onClick={this.addCard} className="btn btn-outline-primary NewCardButton">+ Add New Card</span>
                    </div>
                </div>
                <Scrollbars
                    speed={2}
                    smoothScrolling={true}
                    horizontal={false}
                    className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>
                        <div className='CardContainers PaymentWidget'>
                            <PaymentCards />
                        </div>
                    </div>
                    <ProfileModalPopup
                        isOpen={this.state.isModalOpen}
                        toggle={this.toggleModal}
                        ModalBody={
                            <StripeProvider apiKey="pk_test_n70bkOns9PqUMG4go5E77356">
                                <CheckoutForm />
                            </StripeProvider>
                        }
                        className="modal-lg asyncModal CertificationModal"
                        modalTitle='Add New Card'
                        centered="centered"
                    />
                </Scrollbars>
            </AsideScreenCover>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
};

function mapStateToProps(state) {
    return {
        QuestionsList: state.visitSelectionState.VisitServiceProcessingState.FeedbackState.QuestionsList,
        patientDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        startedTime: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.startedTime,
        SummaryDetails: state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.SummaryDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentSettings));