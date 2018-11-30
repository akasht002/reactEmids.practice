import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { weekdays } from '../../../data/Profle_Availability/weekdays';
import './AvailabilityStyles.css';
import BlackoutDays from './BlackoutDays';

class AvailabilityEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            edit: false,
            availabeDays: [],
            availableList: [],
            updatedAvailableDays: [],
            lookupDays: [],
            lookupSlots: [],
            isSetData: false
        };
    }

    toggleCheckbox = (day, slot, e) => {
        let tempDay = {};
        let tempUpdatedAvailableDays = [...this.state.updatedAvailableDays];
        let index = tempUpdatedAvailableDays.findIndex(data => data.dayName === day.dayName);
        let dayIndex = this.state.lookupDays.findIndex( data => data.dayName === day.dayName);
        let slotIndex = this.state.lookupSlots.findIndex( data => data.slotName === slot.slotName);
        tempDay = tempUpdatedAvailableDays[index];
        tempDay.dayId = this.state.lookupDays[dayIndex].dayId;
        if (e.target.checked) {
            tempDay.slots.map(selectedSlot => {
                if (selectedSlot.slotName === slot.slotName) {
                    selectedSlot.isActive = true;
                    selectedSlot.slotId = this.state.lookupSlots[slotIndex].slotId;
                    selectedSlot.availabilityId = slot.availabilityId ? slot.availabilityId : 0;
                    selectedSlot.slotName = slot.slotName;
                    selectedSlot.dayId = tempDay.dayId;
                    this.state.availableList.push(selectedSlot);
                }   
            });
        } else {
            tempDay.slots.map(selectedSlot => {
                if (selectedSlot.slotName === slot.slotName) {
                    selectedSlot.isActive = false;
                    selectedSlot.availabilityId = slot.availabilityId ? slot.availabilityId : 0;
                    selectedSlot.slotId = this.state.lookupSlots[slotIndex].slotId;
                    selectedSlot.dayId = tempDay.dayId;
                    if(selectedSlot.availabilityId !== 0) {
                        this.state.availableList.push(selectedSlot);
                    }
                }
            });
        }
        tempUpdatedAvailableDays[index] = tempDay;
        this.setState({ updatedAvailableDays: tempUpdatedAvailableDays });
        this.props.storeData(this.state.availableList);
    };

    componentWillMount() {
        const slots = weekdays[0].slots;
        const lookupDays = weekdays;
        this.setState({
            updatedAvailableDays: weekdays,
            lookupDays: lookupDays,
            lookupSlots: slots
        });
    };

    componenDidMount() {
        const { router } = this.props;
        router.setRouteLeaveHook(router.routes[1], () => {
          if (!this.state.submitted) {
            return 'You have unsaved changes. Exit the page?';
          }
        });
    };

    getSlots = (day, i) => {
        return day.slots.map((slot, index) => {
            let isChecked = '', className = '';
            isChecked = slot.isActive ? 'checked' : '';
            className = slot.isActive ? 'SPAvailItems active' : 'SPAvailItems';
            return (
                <div key={index}>
                    <input type={'checkbox'} className={'availabilityCheck'}
                        onChange={this.toggleCheckbox.bind(this, day, slot)}
                        checked={isChecked}
                        value={(i + 1)}
                        id={'checked' + i + (index + 1)}
                        name={'checked' + i + (index + 1)}
                    />
                    <label className={className} htmlFor={'checked' + i + (index + 1)}>{slot.slotName}
                    </label>
                </div>
            )
        })
    };

    checkBoxValue = (day) => {
      let slots = day.slots;
      let value =  slots.some((slot) => slot.isActive === true);
      return value;
    }

    getAllAvailableDays = () => {
        if (this.state.updatedAvailableDays && this.state.updatedAvailableDays.length > 0) {
            return this.state.updatedAvailableDays.map((day, i) => {
               let value = this.checkBoxValue(day);
                return (
                    <div className={'SPAvailContainer ' + value + 'Available'}>
                        <div className={'SPAvailTitle'}>
                            <span className={'SPAvailTitleText'}>{day.dayName}</span>
                        </div>
                        <div className={'SPAvailContent'}>
                            {this.getSlots(day, i)}
                        </div>
                    </div>
                )
            })
        }
    };

    combineExistingAvailableData = () => {
        if (!this.state.isSetData && this.state.updatedAvailableDays && this.state.updatedAvailableDays.length > 0) {
            let tempAvailableData = [...this.state.updatedAvailableDays];
            tempAvailableData.map(data => {
                this.props.existingAvailableDays.days.map(day => {
                    if (data.dayName === day.dayName) {
                        data.dayId = day.dayId;
                        data.slots.map(currentSlot => {
                            day.slots.map( slot => {
                                if (slot.slotName === currentSlot.slotName) {
                                    currentSlot.availabilityId = slot.availabilityId;
                                    currentSlot.isActive = slot.isActive;
                                    currentSlot.slotId = slot.slotId;
                                } 
                            })
                        })
                    }
                })
            });
            this.setState({ updatedAvailableDays: tempAvailableData, isSetData: true });
        };
    };

    render() {
        if (this.props.existingAvailableDays && this.props.existingAvailableDays.days && this.props.existingAvailableDays.days.length > 0) {
           this.combineExistingAvailableData();
        };
        let availableDays = this.getAllAvailableDays();
        return (
           <React.Fragment>
             <div className={'AvailabilityWidget'}>
                <div className={"SPCardTitle"}>
                    <h4 className={"primaryColor"}>Available Days</h4>
                </div>
                <div className={'width100 SPAvailWidget'}>
                    {availableDays}
                </div>
                <div className={'SPAvailBlackOutWidget'}>
                    <BlackoutDays/>
                </div>
             </div>
           </React.Fragment>     
        );
    }
}

const mapStateToProps = state => {
    return {
         existingAvailableDays: state.profileState.AvailabilityState.availableDays
    } 
};

export default withRouter(connect(mapStateToProps, null)(AvailabilityEdit));
