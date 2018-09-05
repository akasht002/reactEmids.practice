import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalPopup } from "../../../components";
import { formattedDateMoment } from "../../../utils/validations";
import { TextArea } from "../../../components";
import { Calendar } from "../../../components";
import moment from "moment";
import { compare } from "../../../utils/comparerUtility";

class BlackoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackoutData: {
        fromDate: "",
        toDate: "",
        remarks: "",
        serviceProviderBlackoutDayId: "",
        isDiscardModalOpen: false
      }
    };
    this.fromMinDate = moment(new Date());
    this.toMinDate = moment(new Date());
    this.fromDateProps = "";
    this.toDateProps = "";
    this.remarksProps = "";
  }

  fromDateChanged = date => {
    const formattedDate = formattedDateMoment(date);
    this.toMinDate = moment(new Date(date));
    this.stateChange = true;
    this.setState(prevState => ({
      blackoutData: {
        ...prevState.blackoutData,
        fromDate: formattedDate
      }
    }));
  };

  toDateChanged = date => {
    const formattedDate = formattedDateMoment(date);
    this.stateChange = true;
    this.setState(prevState => ({
      blackoutData: {
        ...prevState.blackoutData,
        toDate: formattedDate
      }
    }));
  };

  remarksChange = e => {
    let value = e.target.value;
    this.stateChange = true;
    this.setState(prevState => ({
      blackoutData: {
        ...prevState.blackoutData,
        remarks: value
      }
    }));
  };

  saveData = () => {
    this.props.saveBlackout(this.state.blackoutData);
  };

  componentWillReceiveProps(nextProps) {
    const fromDate = formattedDateMoment(nextProps.itemData.startDate);
    const toDate = formattedDateMoment(nextProps.itemData.endDate);
    const remarks = nextProps.itemData.remarks;
    const serviceProviderBlackoutDayId = nextProps.itemData.serviceProviderBlackoutDayId;
    this.fromDateProps = nextProps.itemData.startDate;
    this.toDateProps = nextProps.itemData.endDate;
    this.remarksProps = nextProps.itemData.remarks;
    this.setState(prevState => ({
      blackoutData: {
        ...prevState.blackoutData,
        fromDate: fromDate,
        toDate: toDate,
        remarks: remarks,
        serviceProviderBlackoutDayId: serviceProviderBlackoutDayId
      }
    }));
  }

  toggleCheck = () => {
    const propObj = {
      fromDate: this.fromDateProps,
      toDate: this.toDateProps,
      remarks: this.remarksProps
    };

    const stateObj = {
      fromDate: this.state.blackoutData.fromDate,
      toDate: this.state.blackoutData.toDate,
      remarks: this.state.blackoutData.remarks
    };

    const fieldDifference = compare(propObj, stateObj);

    if (fieldDifference === true) {
      this.setState({
        isDiscardModalOpen: false,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        remarks: this.state.remarks
      });
      this.props.closeBlackoutModal();
    } else {
      this.setState({ isDiscardModalOpen: true });
    }
  };

  reset = () => {
      this.setState({
          isDiscardModalOpen: false,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          remarks: this.state.remarks
      });
      this.props.closeBlackoutModal();
  }

  render() {
    const { fromDate, toDate, remarks } = this.state.blackoutData;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isOpen}
          className={this.props.className}
          centered={this.props.centered}
        >
          <ModalHeader
            toggle={this.toggleCheck}
            className={"font-weight-light asyncModalHeader"}
          >
            {this.props.modalTitle}
          </ModalHeader>
          <ModalBody>
            <form className="form my-2 my-lg-0">
              <div className="row">
                <div className="col-md-6 MonthlyPicker mb-2">
                  <Calendar
                    dateFormat="LL"
                    placeholder="MM DD, YYYY"
                    onDateChange={this.fromDateChanged}
                    value={fromDate}
                    disabled={this.props.disabledStartDate}
                    minDate={this.fromMinDate}
                    className={
                      "form-control datePicker " +
                      (!this.state.isValid &&
                        !this.state.toDate &&
                        "inputFailure")
                    }
                  />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                  <Calendar
                    dateFormat="LL"
                    placeholder="MM DD, YYYY"
                    onDateChange={this.toDateChanged}
                    value={toDate}
                    minDate={this.toMinDate}
                    className={
                      "form-control datePicker " +
                      (!this.state.isValid &&
                        !this.state.toDate &&
                        "inputFailure")
                    }
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <div className="form-group">
                    <TextArea
                      name="remarks"
                      placeholder="Remarks"
                      className="form-control"
                      rows="5"
                      textChange={this.remarksChange}
                      maxlength={"500"}
                      value={remarks}
                    />
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter className={this.props.headerFooter}>
            <Button className="" color="primary" onClick={this.saveData}>
              Save
            </Button>
          </ModalFooter>
        </Modal>

        <ModalPopup
          isOpen={this.state.isDiscardModalOpen}
          ModalBody={<span>Do you want to discard the changes?</span>}
          btn1="YES"
          btn2="NO"
          className="modal-sm"
          headerFooter="d-none"
          centered={true}
          onConfirm={() => this.reset()}
          onCancel={() =>
            this.setState({
              isDiscardModalOpen: false
            })
          }
        />
      </React.Fragment>
    );
  }
}

export default BlackoutModal;
