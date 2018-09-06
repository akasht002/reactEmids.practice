import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { formateDate } from '../../../utils/validations';
import BlackoutModal from "./BlackoutModal";
import {
  getBlackOutDays,
  addBlackOutDay,
  updateBlackOutDay
} from "../../../redux/profile/Availability/actions";
import "./AvailabilityStyles.css";

class BlackoutDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackoutData: [],
      itemData: {},
      modalTypeValue: "",
      disabledStartDate: ""
    };
  }

  toggleBlackout(action, data, disabledEdit, e) {
    if (disabledEdit === "disabled") {
      e.stopPropagation();
    } else {
      let currentDate = new Date();
      if ( currentDate > new Date(data.startDate) && currentDate < new Date(data.endDate)) {
        this.setState({
          disabledStartDate: "disabled"
        });
      } else {
        this.setState({
          disabledStartDate: ""
        });
      }
      this.setState({
        IsBlackoutModalOpen: !this.state.IsBlackoutModalOpen,
        [action]: !this.state[action],
        itemData: data,
        modalTypeValue: action
      });
    }
  }

  saveBlackoutData = data => {
    if (this.state.modalTypeValue === "add") {
      this.props.addBlackOutDay(data);
    } else {
      this.props.updateBlackOutDay(data);
    }
    this.closeBlackoutModal();
  };

  closeBlackoutModal = () => {
    this.setState({
         IsBlackoutModalOpen: !this.state.IsBlackoutModalOpen
      });
  }

  componentDidMount() {
    this.props.getBlackOutDays();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      blackoutData: nextProps.blackoutDays.blockOutDates
    });
  }

  render() {
    let blackoutData = this.state.blackoutData && this.state.blackoutData.map(item => {
      let { isActive, startDate, endDate, remarks } = item;
      let indexId = item.serviceProviderBlackoutDayId;
      let day = formateDate(startDate, 'dddd');
      let dateStart = formateDate(startDate, 'MMM DD');
      let dateEnd = formateDate(endDate, 'MMM DD');
      let dateEqual = false;
      if (startDate === endDate) {
        dateEqual = true;
      }

      let currentDate = new Date(), disabledEdit = "";
     currentDate = new Date() > new Date(startDate) && currentDate > new Date(endDate) ? (disabledEdit='disabled') : ''; 


      return (
        <li id={indexId}>
          {isActive && (
            <div className={"bDayListLiContent SPBlackoutItems"}>
              <div className={"SPCertificateContent"}>
                <div className={"width100 d-flex bDayList"}>
                  <div className={"SPBlackoutDate"}>
                    <div className={"dateHolder"}>
                      <span className={"date"}>{dateStart}</span>
                      <span className={"day"}>{day}</span>
                    </div>
                    <div className={"dateHolder"}>
                      {!dateEqual && (
                        <div>
                          <span className={"date last"}>{dateEnd}</span>
                          <span className={"day"}>{day}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={"SPBlackoutDesc"}>
                    <span>{remarks}</span>
                  </div>
                </div>
              </div>
              {
                  !this.props.showBalckout && (
                    <i
                        className={"SPIconMedium SPIconEdit"}
                        onClick={this.toggleBlackout.bind(
                        this,
                        "edit",
                        item,
                        disabledEdit
                        )}
                    />
                  )
              }              
            </div>
          )}
        </li>
      );
    });

    let modalTitle = "";
    let modalType = "";
    if (this.state.IsBlackoutModalOpen) {
      if (this.state.add) {
        modalTitle = "Add Blackout Days";
        modalType = "add";
      } else if (this.state.edit) {
        modalTitle = "Edit Blackout Days";
        modalType = "edit";
      }
    }

    return (
      <React.Fragment>
        <div className={"SPAvailBlackOutWidget"}>
          <div className="col-md-12 card CardWidget SPBlackoutDays">
            <div className={"SPCardTitle d-flex"}>
              <h4 className={"primaryColor"}>Blackout Days</h4>
              {
                  !this.props.showBalckout && (
                    <i
                      className={"SPIconLarge SPIconAdd"}
                      onClick={this.toggleBlackout.bind(this, "add")}
                   />
                  )
              }
            </div>
            <div className={"SPCertificateContainer width100"}>
              <ul className={"SPCertificateList"}>{blackoutData}</ul>
            </div>
          </div>
        </div>

        <BlackoutModal
          isOpen={this.state.IsBlackoutModalOpen}
          toggle={this.toggleBlackout.bind(this, modalType)}
          className="modal-lg asyncModal BlackoutModal"
          itemData={this.state.itemData}
          modalTitle={modalTitle}
          saveBlackout={this.saveBlackoutData}
          disabledStartDate={this.state.disabledStartDate}
          onClickToggle={this.toggleCheck}
          closeBlackoutModal={this.closeBlackoutModal}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    blackoutDays: state.profileState.AvailabilityState.blackoutDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBlackOutDays: () => dispatch(getBlackOutDays()),
    addBlackOutDay: data => dispatch(addBlackOutDay(data)),
    updateBlackOutDay: data => dispatch(updateBlackOutDay(data))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlackoutDays)
);
