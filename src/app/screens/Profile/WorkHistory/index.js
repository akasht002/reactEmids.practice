import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Input, TextArea, ProfileModalPopup, ModalPopup } from "../../../components";
import { Calendar } from "../../../components/LevelOne/index";
import { checkSpace, checkDateFormatNumber, formateStateDate, formatDateValue as formatMoment } from "../../../utils/validations";
import { compare } from "../../../utils/comparerUtility";
import {
    formatDate,
    changeDateFormat,
    formatDateValue
} from '../../../utils/dateUtility';

import { getWorkHistory, addWorkHistory, editWorkHistory, updateWorkHistory, deleteWorkHistory } from "../../../redux/profile/WorkHistory/actions";
import { SCREENS, PERMISSIONS, DATE_FORMAT } from '../../../constants/constants';
import "./styles.css";
import EllipsisText from "react-ellipsis-text";
import {
    getLength
} from '../../../utils/validations'

class WorkHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkHistoryModalOpen: false,
            workHistoryId: '',
            designation: '',
            company: '',
            location: '',
            fromDate: '',
            toDate: '',
            isWorking: false,
            currentlyWorking: false,
            description: '',
            isOnDeleteModalOpen: false,
            isAdd: false,
            isValid: true,
            disabledSaveBtn: true,
            isValidDate: true,
            isDiscardModalOpen: false,
            designationInvalid: false,
            companyInvalid: false,
            locationInvalid: false,
            fromDateInvalid: false,
            toDateInvalid: false
        };
        this.isDisableCurrentlyWorking = true;
    }

    componentDidMount() {
        this.props.getWorkHistory();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.workhistoyFieldDetails.currentlyWorking) {
            this.setState({ currentlyWorking: false })
        } else {
            this.setState({ currentlyWorking: nextProps.workhistoyFieldDetails.currentlyWorking })
        }
        this.setState({
            designation: nextProps.workhistoyFieldDetails.designation || "",
            company: nextProps.workhistoyFieldDetails.company || "",
            location: nextProps.workhistoyFieldDetails.location || "",
            fromDate: nextProps.workhistoyFieldDetails.fromDate || null,
            toDate: nextProps.workhistoyFieldDetails.toDate || null,
            description: nextProps.workhistoyFieldDetails.description || "",
            currentlyWorking: nextProps.workhistoyFieldDetails.currentlyWorking,
            workHistoryId: nextProps.workhistoyFieldDetails.workHistoryId
        })
    }

    reset() {
        this.setState({
            isWorkHistoryModalOpen: false,
            designation: '',
            company: '',
            location: '',
            fromDate: null,
            toDate: null,
            description: '',
            currentlyWorking: false,
            disabledSaveBtn: true,
            isDiscardModalOpen: false,
            isAdd: true,
            isValid: true,
            workHistoryId: '',
            designationInvalid: false,
            companyInvalid: false,
            locationInvalid: false,
            fromDateInvalid: false,
            toDateInvalid: false
        })
    }

    toggleWorkHistory = (e) => {
        this.setState({
            isWorkHistoryModalOpen: !this.state.isWorkHistoryModalOpen,
            isValid: true,
            disabledSaveBtn: true,
            isDiscardModalOpen: false,
            designationInvalid: false,
            companyInvalid: false,
            locationInvalid: false,
            fromDateInvalid: false,
            toDateInvalid: false
        })
        let workHistory = this.props.workhistoyFieldDetails;
        let workhistoryFielObject = {
            designation: workHistory.designation,
            company: workHistory.company,
            location: workHistory.location,
            fromDate: workHistory.fromDate,
            toDate: workHistory.toDate,
            description: workHistory.description,
            isWorking: workHistory.isWorking,
            currentlyWorking: workHistory.currentlyWorking
        }

        let stateObject = {
            designation: this.state.designation,
            company: this.state.company,
            location: this.state.location,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            description: this.state.description,
            isWorking: this.state.isWorking,
            currentlyWorking: this.state.currentlyWorking
        }

        const fieldDifference = compare(workhistoryFielObject, stateObject);
        if (fieldDifference === true) {
            this.setState({
                isWorkHistoryModalOpen: false,
                isDiscardModalOpen: false,
                designation: '',
                company: '',
                location: '',
                fromDate: null,
                toDate: null,
                description: '',
                isWorking: false,
                currentlyWorking: false
            })
        } else {
            let status = this.checkValidation(this.state.isAdd, this.state.designation,
                this.state.company, this.state.location, this.state.fromDate, this.state.toDate, this.state.description);
            this.setState({ isDiscardModalOpen: status, isWorkHistoryModalOpen: status })
        }
    }

    checkValidation = (isAdd, designation, company, location, fromDate, toDate, description) => {
        if (isAdd && designation === '' && company === '' && location === '' &&
            fromDate === null && toDate === null && description === '') {
            return false;
        } else {
            return true;
        }
    }

    addWorkhistory = () => {
        this.setState({ workHistoryId: 0 })
        if (checkSpace(this.state.designation) && checkSpace(this.state.company) && (this.state.fromDate) && ((this.state.toDate || this.state.currentlyWorking))) {

            const data = {
                workHistoryId: 0,
                company: this.state.company.trim(),
                designation: this.state.designation.trim(),
                location: this.state.location.trim(),
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                isWorking: this.state.isWorking,
                description: this.state.description && this.state.description.trim(),
                currentlyWorking: this.state.currentlyWorking
            };
            this.props.addWorkHistory(data);
            this.reset();
        } else {
            this.setState({ isValid: false });
        }
    }

    isOnDeleteModalOpen = (e) => {
        this.setState({ isOnDeleteModalOpen: !this.state.isOnDeleteModalOpen, workHistoryId: e.target.id });
    }

    editWorkHistory = (e) => {
        this.setState({ isWorkHistoryModalOpen: true, isAdd: false, workHistoryId: e.target.id });
        this.props.editWorkHistory(e.target.id);
    }

    updateWorkHistory = () => {
        if (this.state.designation && this.state.company && this.state.fromDate && (this.state.toDate || this.state.currentlyWorking)) {
            this.state.currentlyWorking ?
                this.setState({ toDate: '' })
                :
                this.setState({ toDate: this.state.toDate })
            const data = {
                designation: this.state.designation,
                company: this.state.company,
                location: this.state.location,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                description: this.state.description,
                workHistoryId: this.state.workHistoryId,
                isWorking: this.state.isWorking,
                currentlyWorking: this.state.currentlyWorking
            };
            this.props.updateWorkHistory(data);
            this.setState({ isWorkHistoryModalOpen: !this.state.isWorkHistoryModalOpen, disabledSaveBtn: true });
            this.reset();
        } else {
            this.setState({ isValid: false });
        }
    }

    deleteWorkHistory = () => {
        this.props.deleteWorkHistory(this.state.workHistoryId);
        this.setState({ isOnDeleteModalOpen: !this.state.isOnDeleteModalOpen });
    }

    dateChanged = (date) => {
        const formattedDate = date ? formatDateValue(date, DATE_FORMAT) : null;
        this.setState({ fromDate: formattedDate, disabledSaveBtn: false });
    };

    dateChangedRaw = (event) => {
        if (event.target.value && (!checkDateFormatNumber(event.target.value) || event.target.value.length > 10)) {
            event.preventDefault();
        } else {
            let dobVal = document.getElementById('fromDate');
            dobVal.value = changeDateFormat(event.target.value);
            const formattedDate = dobVal.value ? formatDate(dobVal.value, DATE_FORMAT) : null;
            if (!formattedDate) {
                this.setState({
                    fromDate: formattedDate
                })
            }
        }
    }

    todateChanged = (date) => {
        const formattedDate = date ? formatDateValue(date, DATE_FORMAT) : null;
        this.setState({ toDate: formattedDate, disabledSaveBtn: false });

    }

    todateChangedRaw = (event) => {
        if (event.target.value && (!checkDateFormatNumber(event.target.value) || event.target.value.length > 10)) {
            event.preventDefault();
        } else {
            let dobVal = document.getElementById('toDate');
            dobVal.value = changeDateFormat(event.target.value);
            const formattedDate = dobVal.value ? formatDate(dobVal.value, DATE_FORMAT) : null;
            if (!formattedDate) {
                this.setState({
                    toDate: formattedDate
                })
            }
        }
    }

    render() {
        let modalContent;
        let modalTitle;

        if (this.state.isAdd) {
            this.isDisableCurrentlyWorking = this.props.workhistoryList.every(history => {
                return history.currentlyWorking === false;
            });
        } else {
            let working = this.props.workhistoryList.every(history => {
                return history.currentlyWorking === false;
            });
            if (working) {
                this.isDisableCurrentlyWorking = true;
            } else {
                this.isDisableCurrentlyWorking = this.props.workhistoyFieldDetails.currentlyWorking;
            }

        }
        const WorkHistoryModalContent = <form className="form my-2 my-lg-0">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <Input
                        name="Designation"
                        label="Designation / Title"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. Car Provider"
                        className={"form-control " + (!this.state.isValid && !this.state.designation && 'inputFailure')} value={this.state.designation}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            designation: e.target.value,
                            disabledSaveBtn: false
                        })}
                        onBlur={(e) => {
                            if (!(e.target.value)) {
                                this.setState({
                                    designationInvalid: true,
                                })
                            }

                        }}
                    />
                    {!this.state.designation && (this.state.designationInvalid || !this.state.isValid) &&
                        <small className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                            Please enter Designation
                                </small>
                    }
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="CompanyName"
                        label="Company Name"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. Home Supportive SVC"
                        className={"form-control " + (!this.state.isValid && !this.state.company && 'inputFailure')}
                        value={this.state.company}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            company: e.target.value,
                            disabledSaveBtn: false
                        })}

                        onBlur={(e) => {
                            if (!(e.target.value)) {
                                this.setState({
                                    companyInvalid: true,
                                })
                            }

                        }}
                    />
                    {!this.state.company && (this.state.companyInvalid || !this.state.isValid) &&
                        <small className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                            Please enter Company Name
                                </small>
                    }
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="Location"
                        label="Location"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. San Francisco Bay Area"
                        className={"form-control " + (!this.state.isValid && !this.state.location && 'inputFailure')}
                        value={this.state.location}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            location: e.target.value,
                            disabledSaveBtn: false
                        })}
                        onBlur={(e) => {
                            if (!(e.target.value)) {
                                this.setState({
                                    locationInvalid: true,
                                })
                            }

                        }}
                    />
                    {!this.state.location && (this.state.locationInvalid || !this.state.isValid) &&
                        <small className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                            Please enter Location
                                </small>
                    }
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>From Date</label>
                        <Calendar
                            id="fromDate"
                            startDate={this.state.fromDate && moment(this.state.fromDate, DATE_FORMAT)}
                            onDateChange={this.dateChanged}
                            onDateChangeRaw={this.dateChangedRaw}
                            mandatory={true}
                            maxDate={!this.state.currentlyWorking ? formateStateDate(this.state.toDate) : ''}
                            value={this.state.fromDate}
                            className={"form-control datePicker " + (getLength(this.state.fromDate) === 0 && (!this.state.isValid ||
                                this.state.fromDateInvalid) &&
                                'inputFailure')
                            }

                            onBlur={() => {
                                if (!this.state.fromDate) {
                                    this.setState({ fromDateInvalid: true });
                                }
                            }}
                        />
                        {getLength(this.state.fromDate) === 0 && (this.state.fromDateInvalid
                            || !this.state.isValid) &&
                            <small className='text-danger d-block mt-2 mb-2 MsgWithIcon MsgWrongIcon'>
                                Please select 'From Date'
                                </small>
                        }
                    </div>
                </div>

                <div className="col-md-6 MonthlyPicker mb-2">
                    {!this.state.currentlyWorking && <div className="form-group">
                        <label>To Date</label>
                        <Calendar
                            id="toDate"
                            startDate={this.state.toDate && moment(this.state.toDate, DATE_FORMAT)}
                            onDateChange={this.todateChanged}
                            onDateChangeRaw={this.todateChangedRaw}
                            mandatory={true}
                            minDate={this.state.fromDate && formateStateDate(this.state.fromDate)}
                            maxDate={moment()}
                            value={this.state.toDate}
                            className={"form-control datePicker " + (getLength(this.state.toDate) === 0 && (!this.state.isValid ||
                                this.state.toDateInvalid) &&
                                'inputFailure')
                            }
                            onBlur={() => {
                                if (!this.state.toDate) {
                                    this.setState({ toDateInvalid: true });
                                }
                            }}
                        />
                        {getLength(this.state.toDate) === 0 && (this.state.toDateInvalid
                            || !this.state.isValid) &&
                            <small className='text-danger d-block mt-2 mb-2 MsgWithIcon MsgWrongIcon'>
                                Please select 'To Date'
                                </small>
                        }

                    </div>}
                </div>
                {
                    <div className="col-md-12 mb-3">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" disabled={!this.isDisableCurrentlyWorking} checked={this.state.currentlyWorking} id="defaultCheck1"
                                    onChange={(e) =>
                                        this.setState({ currentlyWorking: e.target.checked, disabledSaveBtn: false, toDate: '' }
                                        )}
                                />
                                I am currently working here
                            <span className="CheckboxIcon" />
                            </label>
                        </div>
                    </div>
                }

                <div className="col-md-12">
                    <TextArea
                        name='Description'
                        label="Description"
                        placeholder='Write your Description'
                        className='form-control'
                        rows='5'
                        required={false}
                        value={this.state.description}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            description: e.target.value,
                            disabledSaveBtn: false
                        })}
                    />
                </div>
            </div>
        </form>


        const workhistoryList = this.props.workhistoryList && this.props.workhistoryList.map((WorkHistoryList) => {
            return (
                <li className="SPWorkHistoryItems" key={WorkHistoryList.company}>
                    <div className="SPCertificateContent">
                        <div className="width100 d-flex">
                            <h5 className="SPCertificateHeader">
                                {
                                    WorkHistoryList.company && <EllipsisText className='SPCertificateDesc' text={WorkHistoryList.company} length={"50"} />
                                }
                            </h5>
                            <span className="ml-auto SPWorkYear">
                                <span>
                                    {formatMoment(WorkHistoryList.fromDate, 'MM-DD-YYYY', 'DD MMM YYYY')}
                                </span>

                                <span> - </span>
                                {WorkHistoryList.currentlyWorking === true ?
                                    <span>Present</span>
                                    :
                                    <span> { /* to do change removing className="ml-2" */}
                                        {formatMoment(WorkHistoryList.toDate, 'MM-DD-YYYY', 'DD MMM YYYY')}
                                    </span>
                                }
                            </span>
                        </div>
                        <h5>
                            {
                                WorkHistoryList.designation && <EllipsisText className='SPCertificateDesc' text={WorkHistoryList.designation} length={"50"} />
                            }
                            </h5>
                            <span className="SPCertificateSubtle">{WorkHistoryList.location}</span>
                            {
                                WorkHistoryList.description && <EllipsisText className='SPCertificateDesc' text={WorkHistoryList.description} length={"50"} />
                            }
                    </div>
                        {this.props.isUser && <i name={SCREENS.PROFILE + '_' + PERMISSIONS.DELETE} className="SPIconMedium SPIconDelete mr-3" id={WorkHistoryList.workHistoryId}
                            onClick={(e) => this.isOnDeleteModalOpen(e)} />}
                        {this.props.isUser && <i name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE} className="SPIconMedium SPIconEdit" id={WorkHistoryList.workHistoryId}
                            onClick={(e) => this.editWorkHistory(e)} />}
                </li>
                    )
                });
        
        if (this.state.isWorkHistoryModalOpen) {
            if (this.state.isAdd) {
                        modalTitle = 'Add Work History';
                    } else {
                        modalTitle = 'Edit Work History';
                    }
                    modalContent = WorkHistoryModalContent;
                }
        
        
                return (
            <div className="col-md-12 card CardWidget SPWorkHistory">
                        <div className="SPCardTitle d-flex">
                            <h4 className="theme-primary">Work History</h4>
                            {this.props.isUser &&
                                <i className="SPIconLarge SPIconAdd" name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}
                                    onClick={() => this.setState({ isWorkHistoryModalOpen: true, isAdd: true })} />}
                        </div>

                        <div className="SPCertificateContainer width100">

                            {this.props.workhistoryList.length > 0 ? <ul className="SPCertificateList theme-primary"> {workhistoryList} </ul> :
                                <ul className="SPCertificateList theme-primary">
                                    <div className='SPNoInfo'>
                                        <div className='SPNoInfoContent'>
                                            <div className='SPInfoContentImage' />
                                            <span className='SPNoInfoDesc' name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}> Click <i className="SPIconMedium SPIconAddGrayScale" onClick={() => this.setState({ isWorkHistoryModalOpen: true, isAdd: true })} /> to add Work History</span>
                                        </div>
                                    </div>
                                </ul>
                            }
                        </div>

                        <ProfileModalPopup
                            isOpen={this.state.isWorkHistoryModalOpen}
                            toggle={this.toggleWorkHistory}
                            ModalBody={modalContent}
                            className="modal-lg asyncModal CertificationModal"
                            modalTitle={modalTitle}
                            centered={true}
                            disabled={this.state.disabledSaveBtn}
                            onClick={this.state.isAdd ?
                                this.addWorkhistory :
                                this.updateWorkHistory
                            }
                        />

                        <ModalPopup
                            isOpen={this.state.isDiscardModalOpen}
                            toggle={this.reset}
                            ModalBody={<span>Do you want to discard the changes?</span>}
                            btn1="YES"
                            btn2="NO"
                            className="modal-sm"
                            headerFooter="d-none"
                            centered={true}
                            onConfirm={() => this.reset()}
                            onCancel={() => this.setState({
                                isDiscardModalOpen: false,
                                disabledSaveBtn: false
                            })}
                        />

                        <ModalPopup
                            isOpen={this.state.isOnDeleteModalOpen}
                            ModalBody={<span>Do you want to remove the Work History Details?</span>}
                            btn1="YES"
                            btn2="NO"
                            className="modal-sm"
                            headerFooter="d-none"
                            centered={true}
                            onConfirm={() => this.deleteWorkHistory()}
                            onCancel={() => this.setState({
                                isOnDeleteModalOpen: !this.state.isOnDeleteModalOpen
                            })}
                        />
                    </div>
                    )
                }
            }
            
function mapDispatchToProps(dispatch) {
    return {
                        getWorkHistory: () => dispatch(getWorkHistory()),
                    addWorkHistory: (data) => dispatch(addWorkHistory(data)),
                    editWorkHistory: (data) => dispatch(editWorkHistory(data)),
                    updateWorkHistory: (data) => dispatch(updateWorkHistory(data)),
                    deleteWorkHistory: (data) => dispatch(deleteWorkHistory(data))
                }
            };
            
function mapStateToProps(state) {
    return {
                        workhistoryList: state.profileState.WorkHistoryState.workhistoryList,
                    addeworkhistorySuccess: state.profileState.WorkHistoryState.addeworkhistorySuccess,
                    workhistoyFieldDetails: state.profileState.WorkHistoryState.workhistoyFieldDetails,
                    serviceProviderId: state.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId,
                    isUser: state.profileState.PersonalDetailState.isUser,
                }
            };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkHistory));