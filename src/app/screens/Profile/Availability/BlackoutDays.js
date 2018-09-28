import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formateDate } from '../../../utils/validations';
import BlackoutModal from "./BlackoutModal";
import { ModalPopup } from '../../../components';
import {
  getBlackOutDays,
  addBlackOutDay,
  updateBlackOutDay,
  deleteBlackoutDay
} from "../../../redux/profile/Availability/actions";
import "./AvailabilityStyles.css";
import { dateDifference, formattedDateMoment } from '../../../utils/validations';


class BlackoutDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackoutData: [],
      itemData: {},
      modalTypeValue: "",
      disabledStartDate: "",
      isDeleteModalOpen: false
    };
  }

  toggleBlackout = (action, data, disabledEdit, e) => {
    if (disabledEdit === "disabled") {
      e.stopPropagation();
    } else {
      let currentDate = new Date();
      if (currentDate > new Date(data.startDate) && currentDate < new Date(data.endDate)) {
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

  deleteBlackoutDays = (data) => {
    this.setState({
      isDeleteModalOpen: true,
      itemData: data
    });
  }

  delete = () => {
    let data = {
      ...this.state.itemData,
      fromDate: formattedDateMoment(this.state.itemData.startDate),
      toDate: formattedDateMoment(this.state.itemData.endDate)
    }
    this.props.deleteBlackoutDay(data);
    this.setState({
      isDeleteModalOpen: false
    });
  }

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
      let numberOfDays = dateDifference(dateStart,dateEnd);
      if (startDate === endDate) {
        dateEqual = true;
      }

      let currentDate = new Date(), disabledEdit = "";
      currentDate = new Date() > new Date(startDate) && currentDate > new Date(endDate) ? (disabledEdit = 'disabled') : '';

      return (
        <li id={indexId}>
          {isActive && (
            <div className={"bDayListLiContent SPBlackoutItems"}>
              <div className={"SPCertificateContent"}>
                <div className={"width100 d-flex bDayList"}>
                  <div className={"SPBlackoutDate"}>
                    {
                      !dateEqual &&  (
                        <div>
                           <span className={"date"}>{dateStart} - {dateEnd}</span>
                           <span className={"day"}>{numberOfDays} days</span>
                        </div>
                      )
                    }
                    {dateEqual && (
                        <div>
                          <span className={"date"}>{dateEnd}</span>
                          <span className={"day"}>{day}</span>
                        </div>
                      )}
                    </div>
                  <div className={"SPBlackoutDesc"}>
                    <span>{remarks}</span>
                  </div>
                </div>
              </div>
              {
                !this.props.showBalckout && (
                  <i
                    className={"SPIconMedium SPIconEdit mr-2"}
                    onClick={this.toggleBlackout.bind(
                      this,
                      "edit",
                      item,
                      disabledEdit
                    )}
                  />
                )
              }
              {
                !this.props.showBalckout && (
                  <i
                    className={"SPIconMedium SPIconDelete"}
                    onClick={this.deleteBlackoutDays.bind(this, item)}
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
      if (this.state.modalTypeValue === 'add') {
        modalTitle = "Add Blackout Days";
        modalType = "add";
      } else {
        modalTitle = "Edit Blackout Days";
        modalType = "edit";
      }
    }
    return (
      <React.Fragment>
        <div className={"SPAvailBlackOutWidget"}>
          <div className="col-md-12 card CardWidget SPBlackoutDays">
          { !this.props.showBalckout ? 
            <div className="SPCardTitle d-flex">
                 <h4 className={"primaryColor"}>Blackout Days</h4>
                  <i
                    className={"SPIconLarge SPIconAdd"}
                    onClick={this.toggleBlackout.bind(this, "add")}
                  />
            </div> :  ""
          }
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
        <ModalPopup
          isOpen={this.state.isDeleteModalOpen}
          toggle={this.toggleCheck}
          ModalBody={<span>Do you want to delete the blackout days?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() => this.delete()}
          onCancel={() =>
          this.setState({
            isDeleteModalOpen: false
          })}
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
    updateBlackOutDay: data => dispatch(updateBlackOutDay(data)),
    deleteBlackoutDay: data => dispatch(deleteBlackoutDay(data))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BlackoutDays)
);
