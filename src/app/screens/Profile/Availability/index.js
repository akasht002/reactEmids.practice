import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup } from "../../../components";
import AvailabilityEdit from './AvailabilityEdit';
import BlackoutDays from './BlackoutDays';
import { ModalPopup } from '../../../components';
import './AvailabilityStyles.css';
import {
    getAvailableDays,
    updateAvailabilityDays,
    getBlackOutDays
 } from '../../../redux/profile/Availability/actions';
 import {SCREENS, PERMISSIONS} from '../../../constants/constants';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availabilityModal: false,
            modalType: '',
            add: false,
            edit: false, 
            updatedData: [],
            isDiscardModalOpen: false,
            isBlackoutModalOpen: false,
            activeSlots: []          
        }
        this.disabled = "disabled";
        this.slotList = 0;
        this.availableDays = '';
        this.props.blackoutDays.blockOutDates = [];
    };

    toggleAvailability = (modalType, data) => {
        if (modalType === 'closeButton') {
            this.toggleCheck();
        } else {
            this.setState({
                availabilityModal: !this.state.availabilityModal,
                modalType: modalType
            });
        }
    };

    closeModal = (modalType) => {
        this.setState({
            availabilityModal: !this.state.availabilityModal,
            modalType: modalType
        });
    }

    onSubmit = () => {
       const updatedDataValue = this.state.updatedData;
       this.props.updateAvailabilityDays(updatedDataValue);
       this.setState({
            availabilityModal: !this.state.availabilityModal,
       })
    };

    componentDidMount(){
        this.props.getAvailableDays();
        this.props.getBlackOutDays();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            availableDays: nextProps.availableDays
        })
    }

    storeData = (data, changeAvailableDays) => {
        this.setState({
            updatedData: data
        });
        this.disabled = "";
    }

    reset = () => {
        this.setState({
            availabilityModal: !this.state.availabilityModal,
            isDiscardModalOpen: false
       })
    }

    toggleCheck = () => {
        if (this.disabled === 'disabled') {
            this.setState({
              isDiscardModalOpen: false,
              availabilityModal: !this.state.availabilityModal,
            });
          } else {
            this.setState({ isDiscardModalOpen: true });
          }
    }

    getAvailableDays = () => {
        return this.state.availableDays && this.state.availableDays.days && this.state.availableDays.days.map(day => {
           let slots = this.getSlots(day.slots);
           return (
               this.slotList < 1 ? '' :
                <div className={'SPAvailContainer'}>
                    <div className={'SPAvailTitle'}>
                         <span className={'SPAvailTitleText'}>{day.dayName}</span>              
                    </div>
                    <div className={'SPAvailContent'}>
                        {slots}
                    </div>
                </div>
            )
        })
    };

    getSlots = (slots) => {
        this.slotList = 0;
        return slots.map(slot => {
            if (slot.isActive) {
                this.slotList++;
            }
            let className = '';
            className = slot.isActive ? 'SPAvailItems active' : 'SPAvailItems';
            return (
                slot.isActive ? <li key={slot.availbilityId} className={'disabled ' + className}>{slot.slotName}</li> : ""
            )
        })
    };

    toggleBlackoutModal = () => {
        this.setState({
            isBlackoutModalOpen: !this.state.isBlackoutModalOpen
        })
    }

    render() {
        let availableDays = [], modalContent, modalTitle, availableSlot= '', blackoutModalContent='';
        if (this.props.availableDays.days && this.props.availableDays.days.length > 0) {
            availableDays = this.getAvailableDays();
            availableSlot = availableDays && availableDays.every(slot => {
                     if (slot === "") {
                         return true;
                     } else {
                         return false;
                     }
                }); 
        }

        if (!availableSlot && this.state.availabilityModal && this.props.availableDays.days && this.props.availableDays.days.length > 0) {
            modalTitle = 'Edit Availability';
        } else {
            modalTitle = 'Add Availability';
        }
        modalContent = <AvailabilityEdit storeData={this.storeData} closeModal={this.closeModal}/>;
        blackoutModalContent = <BlackoutDays showBalckout="true"/>
        return (
            <React.Fragment>
                <div className="col-md-12 card CardWidget SPAvailability">
                    <div className={"SPCardTitle d-flex"}>
                        <h4 className={"primaryColor"}>Availability</h4>
                        { this.props.isUser &&
                        <div>
                            { !availableSlot && this.props.availableDays.days && this.props.availableDays.days.length > 0 ?
                        <i name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE} className="SPIconMedium SPIconEdit" onClick={this.toggleAvailability.bind('edit', 'editButton')} />
                        :
                        <i name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE} className={"SPIconLarge SPIconAdd"} onClick={this.toggleAvailability.bind('add', 'addButton')} />}
                        </div>
                        }
                    </div>
                     <div className={'width100 SPAvailWidget'}>
                        { availableDays && !availableSlot ? availableDays : 
                            <ul className="SPEducationList width100">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                    <span className='SPNoInfoDesc' name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}>  Click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.toggleAvailability.bind('add')}/> to add Availability</span>
                                </div>
                            </div>
                            </ul>
                        }
                     </div>
                     {
                         this.props.blackoutDays && this.props.blackoutDays.blockOutDates.length > 0 ? 
                         <p className={"primaryColor indexColor"} onClick={this.toggleBlackoutModal}>Show Blackout Days</p> : ''
                     }
   
                </div>
                <ProfileModalPopup
                    isOpen={this.state.availabilityModal}
                    toggle={this.toggleAvailability.bind('close', 'closeButton')}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal availabilityModal"
                    modalTitle={modalTitle}
                    centered="centered"
                    onClick={this.onSubmit}
                    onClose={this.onClose}
                    disabled={this.disabled}
                    data1={this.props.availableDays}
                />
                <ModalPopup
                isOpen={this.state.isDiscardModalOpen}
                toggle={this.toggleCheck}
                ModalBody={<span>Do you want to discard the changes?</span>}
                btn1='YES'
                btn2='NO'
                className='modal-sm'
                headerFooter='d-none'
                centered='centered'
                onConfirm={() => this.reset()}
                onCancel={() =>
                this.setState({
                    isDiscardModalOpen: false
                })}
              />
              <ProfileModalPopup
                isOpen={this.state.isBlackoutModalOpen}
                toggle={this.toggleBlackoutModal}
                ModalBody={blackoutModalContent}
                className='modal-lg asyncModal availabilityModal'
                headerFooter='d-none'
                centered='centered'
                modalTitle={"Blackout Days"}
              />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        availableDays: state.profileState.AvailabilityState.availableDays,
        blackoutDays: state.profileState.AvailabilityState.blackoutDays,
        isUser: state.profileState.PersonalDetailState.isUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateAvailabilityDays: data => dispatch(updateAvailabilityDays(data)),
        getAvailableDays: () => dispatch(getAvailableDays()),
        getBlackOutDays: () => dispatch(getBlackOutDays()),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Availability));
