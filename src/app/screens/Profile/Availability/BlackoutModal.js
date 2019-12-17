import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from 'moment'
import { ModalPopup } from "../../../components";
import { TextArea } from "../../../components";
import { Calendar } from "../../../components";
import { compare } from "../../../utils/comparerUtility";
import { changeDateFormat, formatDate } from '../../../utils/dateUtility';
import { checkEmpty, getLength } from '../../../utils/validations'
import { DATE_FORMAT } from '../../../constants/constants';
import { formattedDateMoment, formattedDateMomentValue, newDate, newDateValue, checkDateFormatNumber, checkFormatDate, formateStateDateValue } from '../../../utils/validations';

export class BlackoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackoutData: {
        fromDate: "",
        toDate: "",
        remarks: "",
        serviceProviderBlackoutDayId: "",
        isDiscardModalOpen: false
      },
      isValid: false,
      isFormDateInvalid: false,
      isToDateInvalid: false,
    };
    this.fromMinDate = newDate();
    this.toMinDate = newDate();
    this.fromDateProps = "";
    this.toDateProps = "";
    this.remarksProps = "";

  }

  dateChanged = (dateType, date) => {
    const formattedDate = formattedDateMomentValue(date);
    this.stateChange = true;

    if (dateType === 'fromDate') {
      this.toMinDate = newDateValue(date);
      this.setState(prevState => ({
        blackoutData: {
          ...prevState.blackoutData,
          fromDate: formattedDate
        }, isValid: true
      }));
    } else {
      this.fromMaxDate = newDateValue(date);
      this.setState(prevState => ({
        blackoutData: {
          ...prevState.blackoutData,
          toDate: formattedDate,
        }, isValid: true
      }));
    }
  }

  dateChangedRaw = (dateType, event) => {
    if (event.target.value && (!checkDateFormatNumber(event.target.value))) {
      event.preventDefault();
    } else {
      let fromDateVal = changeDateFormat(event.target.value);
      let checkValue = checkFormatDate(fromDateVal);
      const formattedDate = fromDateVal ? formatDate(fromDateVal, DATE_FORMAT) : null;
      if (dateType === 'fromDate') {
        this.toMinDate = newDateValue(fromDateVal);
        if (checkValue) {
          this.setState({ blackoutData: { ...this.state.blackoutData, fromDate: formattedDate } });
        }
      } else {
        this.fromMaxDate = newDateValue(fromDateVal);
        if (checkValue) {
          this.setState({ blackoutData: { ...this.state.blackoutData, toDate: formattedDate } });
        }
      }
    }
  }

  remarksChange = e => {
    let value = e.target.value;
    this.stateChange = true;
    this.setState(prevState => ({
      blackoutData: {
        ...prevState.blackoutData,
        remarks: value
      },
      isValid: true
    }));
  };

  saveData = () => {
    if (checkEmpty(this.state.blackoutData.fromDate) ||
      checkEmpty(this.state.blackoutData.toDate)) {
      this.setState({
        isFormDateInvalid: checkEmpty(this.state.blackoutData.fromDate),
        isToDateInvalid: checkEmpty(this.state.blackoutData.toDate),
      })
    } else {
      this.props.saveBlackout(this.state.blackoutData);
    }

  };

  componentWillReceiveProps(nextProps) {
    const fromDate = formattedDateMoment(nextProps.itemData.startDate);
    const toDate = formattedDateMoment(nextProps.itemData.endDate);
    const remarks = nextProps.itemData.remarks;
    const serviceProviderBlackoutDayId = nextProps.itemData.serviceProviderBlackoutDayId;
    this.fromDateProps = formattedDateMoment(nextProps.itemData.startDate);
    this.toDateProps = formattedDateMoment(nextProps.itemData.endDate);
    this.fromMaxDate = newDateValue(this.toDateProps);
    this.remarksProps = nextProps.itemData.remarks;
    this.setState(prevState => ({
      blackoutData: {
        ...prevState.blackoutData,
        fromDate: fromDate,
        toDate: toDate,
        remarks: remarks,
        serviceProviderBlackoutDayId: serviceProviderBlackoutDayId
      },
      isValid: false,
      isFormDateInvalid: false,
      isToDateInvalid: false
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
      <Fragment>
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
                    label="From Date"
                    startDate={fromDate && formateStateDateValue(fromDate)}
                    onDateChange={this.dateChanged.bind(this, 'fromDate')}
                    onDateChangeRaw={this.dateChangedRaw.bind(this, 'fromDate')}
                    value={fromDate}
                    disabled={this.props.disabledStartDate}
                    minDate={this.fromMinDate}
                    maxDate={moment(fromDate).isBefore(moment(new Date(), "MM-DD-YYYY")) ? fromDate && formateStateDateValue(fromDate) : this.fromMaxDate}
                    className={"form-control datePicker " + (this.state.isFormDateInvalid  && 'inputFailure')}
                    onBlur={() => {
                      if (fromDate) {
                        this.setState({ isFormDateInvalid: false });
                      } else {
                        this.setState({ isFormDateInvalid: true });
                      }
                    }}
                  />
                  <small className="text-danger d-block OnboardingAlert">
                    {getLength(fromDate) === 0 && this.state.isFormDateInvalid && 'Please enter from date'}
                  </small>
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                  <Calendar
                    label="To Date"
                    dateFormat="LL"
                    startDate={toDate && formateStateDateValue(toDate)}
                    onDateChange={this.dateChanged.bind(this, 'toDate')}
                    onDateChangeRaw={this.dateChangedRaw.bind(this, 'toDate')}
                    value={toDate}
                    minDate={this.toMinDate}
                    className={"form-control datePicker " + (this.state.isToDateInvalid  && 'inputFailure')}
                    onBlur={() => {
                      if (toDate) {
                        this.setState({ isToDateInvalid: false });
                      } else {
                        this.setState({ isToDateInvalid: true });
                      }
                    }}
                  />
                  <small className="text-danger d-block OnboardingAlert">
                    {getLength(toDate) === 0 && this.state.isToDateInvalid && 'Please enter to date'}
                  </small>
                </div>
                <div className="col-md-12 mb-2">
                  <div className={"form-group"}>
                    <TextArea
                      name="Remarks"
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
            <Button className="" color="primary" onClick={this.saveData}
              disabled={!this.state.isValid}>
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
      </Fragment>
    );
  }
}

export default BlackoutModal;
