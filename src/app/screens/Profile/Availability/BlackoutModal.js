import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalPopup } from "../../../components";
import { TextArea } from "../../../components";
import { Calendar } from "../../../components";
import { compare } from "../../../utils/comparerUtility";
import { changeDateFormat, formatDate } from '../../../utils/dateUtility';
import { DATE_FORMAT } from '../../../constants/constants';
import { formattedDateMoment, formattedDateMomentValue, newDate, newDateValue, checkDateFormatNumber, checkFormatDate, formateStateDate } from '../../../utils/validations';

class BlackoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackoutData: {
        fromDate: "",
        toDate: "",
        remarks: "",
        serviceProviderBlackoutDayId: "",
        isDiscardModalOpen: false,
        isDisabledSaveBtn: true
      },
      isValid: true
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
          fromDate: formattedDate,
          isDisabledSaveBtn: false
        }
      }));
     } else {
      this.fromMaxDate  = newDateValue(date);
      this.setState(prevState => ({
        blackoutData: {
          ...prevState.blackoutData,
          toDate: formattedDate,
          isDisabledSaveBtn: false
        }
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
        remarks: value,
        isRemarkInvalid: false,
        isDisabledSaveBtn: false
      }
    }));
  };

  saveData = () => {
    const { fromDate, toDate, remarks } = this.state.blackoutData;
    let disabledSave = false;
    if ((fromDate === undefined || fromDate === '' || fromDate === null) ||
    (toDate === undefined || toDate === '' || toDate === null) || 
    (remarks === undefined || remarks === '' || remarks === null)) {
      disabledSave = true;
      this.setState(prevState => ({
        blackoutData: {
          ...prevState.blackoutData,
          isDisabledSaveBtn: disabledSave
        },
        isValid: false
      }));
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
    this.fromMaxDate  = newDateValue(this.toDateProps);
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
          remarks: this.state.remarks,
          isRemarkInvalid: true
      });
      this.props.closeBlackoutModal();
  }

  render() {
    const { fromDate, toDate, remarks, isDisabledSaveBtn } = this.state.blackoutData;
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
                    label="From Date"
                    startDate={fromDate && formateStateDate(fromDate)}
                    onDateChange={this.dateChanged.bind(this, 'fromDate')}
                    onDateChangeRaw={this.dateChangedRaw.bind(this, 'fromDate')}
                    value={fromDate}
                    disabled={this.props.disabledStartDate}
                    minDate={this.fromMinDate}
                    maxDate={this.fromMaxDate}
                    className={
                      "form-control datePicker " 
                    }
                  />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                  <Calendar
                    label="To Date"
                    dateFormat="LL"
                    startDate={toDate && formateStateDate(toDate)}
                    onDateChange={this.dateChanged.bind(this, 'toDate')}
                    onDateChangeRaw={this.dateChangedRaw.bind(this, 'toDate')}
                    value={toDate}
                    minDate={this.toMinDate}
                    className={
                      "form-control datePicker "
                    }
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <div className={"form-group"}>
                    <TextArea
                      name="Remarks"
                      placeholder="Remarks"
                      className={"form-control " + (!this.state.isValid && !remarks && 'inputFailure')}
                      rows="5"
                      textChange={this.remarksChange}
                      maxlength={"500"}
                      value={remarks}
                      onBlur={e => {
                        if(!e.target.value) {
                          this.setState({isRemarkInvalid: true})
                        }
                      }}
                    />
                  </div>
                  
                  {!this.state.isValid && (!remarks) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please enter Valid {(remarks === '' || remarks === undefined) && ' Remark'}</span>}
                 
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter className={this.props.headerFooter}>
            <Button className="" color="primary" onClick={this.saveData} disabled={isDisabledSaveBtn}>
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
