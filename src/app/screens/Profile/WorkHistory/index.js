import React,{Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input ,TextArea,ProfileModalPopup, ModalPopup } from "../../../components";
import {Calendar} from "../../../components/LevelOne/index";
import moment from 'moment';
import { checkDate,checkSpace } from "../../../utils/validations"
import {getWorkHistory, addWorkHistory,editWorkHistory, updateWorkHistory, deleteWorkHistory} from "../../../redux/profile/WorkHistory/actions";
import "./styles.css";

class WorkHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            WorkHistoryModal: false,
            workHistoryId:'',
            designation:'',
            company:'',
            location:'',
            fromDate:'',
            toDate:'',
            isWorking:false,
            description:'',
            showModalOnDelete: false,
            modalSaveAction: '',
            add: false,
            edit: false,
            isValid: true,
            disabledSaveBtn: true,
            isValidDate:true
        }
    }

    componentDidMount() {
        this.props.getWorkHistory(this.props.workHistoryId);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            designation: nextProps.workhistoyFieldDetails.designation,
            company: nextProps.workhistoyFieldDetails.company,
            location: nextProps.workhistoyFieldDetails.location,
            fromDate: nextProps.workhistoyFieldDetails.fromDate,
            toDate: nextProps.workhistoyFieldDetails.toDate,
            description:nextProps.workhistoyFieldDetails.description,
            isWorking:nextProps.workhistoyFieldDetails.isWorking
            
        })
    }
    reset() {
        this.setState({
            WorkHistoryModal: !this.state.WorkHistoryModal,
            designation: '',
            company: '',
            location: '',
            description: ''
        })
    }
    toggleWorkHistory(action, e){
        this.setState({
            WorkHistoryModal: !this.state.WorkHistoryModal,
            modalSaveAction: this.addWorkhistory,
            add: true,
            edit: false,
            isValid: true,
            designation:'',
            location:'',
            company:'',
            fromDate:'',
            toDate:'',
            description:''
        })
    }
    addWorkhistory = () => {
        if (checkSpace(this.state.designation) && checkSpace(this.state.company) && (this.state.fromDate) && (this.state.toDate)) {
           
            const data = {
                workHistoryId:this.state.workHistoryId,
                company:this.state.company.trim(),
                designation: this.state.designation.trim(),
                location: this.state.location,
                fromDate:this.state.fromDate,
                toDate:this.state.toDate,
                isWorking:this.state.isWorking,
                description:this.state.description
            };
            this.props.addWorkHistory(data);
            this.setState({ 
                modalSaveAction: this.addCertification, 
                WorkHistoryModal: !this.state.WorkHistoryModal,
                company: '',
                designation: '', 
                location:'',
                fromDate:'',
                toDate:'',
                isWorking:'',
                description:''
            });
            //this.setState({ modalSaveAction: this.addCertification });
            //this.reset();
        } else {
            this.setState({ isValid: false });
        }
    }
    showModalOnDelete = (e) => {
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete, workHistoryId: e.target.id });
    }

    editWorkHistory = (e) => {
        this.setState({ modalSaveAction: this.updateWorkHistory, WorkHistoryModal: true, add: false, edit: true, workHistoryId: e.target.id });
        this.props.editWorkHistory(e.target.id);
    }

    updateWorkHistory = () => {
        if (this.state) {
            const data = {
                designation: this.state.designation,
                company: this.state.company,
                location: this.state.location,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                description:this.state.description,
                workHistoryId: this.state.workHistoryId
            };
            this.props.updateWorkHistory(data);
            this.setState({ WorkHistoryModal: !this.state.WorkHistoryModal, designation: '', company: '', location: '',fromDate:'',toDate:'',description:''});
        }
    }

    deleteWorkHistory = () => {
        this.props.deleteWorkHistory(this.state.workHistoryId);
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete });
    }

    // toggleCheckbox() {
    //     this.setState({
    //         isChecked: !this.state.isChecked,
    //     });
    // }

    dateChanged = (date) => {
        const formattedDate = date ? moment(new Date(date.toString())).format('MM/DD/YYYY') : null;
        this.setState({  
            fromDate: formattedDate,
            disabledSaveBtn:false 
        });
        //this.props.formDirty();
    }

    dateChangedRaw = (event) => {
        if (event.target.value.length === 10
            && checkDate(event.target.value)
            && new Date(event.target.value)
            && moment().isAfter(event.target.value)) {
            const formattedDate = event.target.value ? moment(new Date(event.target.value.toString())).format('MM/DD/YYYY') : null;
            this.setState({  
                fromDate: formattedDate
            });
        } 
        //this.props.formDirty();
    }

    todateChanged = (date) => {
        const formattedDate = date ? moment(new Date(date.toString())).format('MM/DD/YYYY') : null;
        this.setState({  toDate: formattedDate,
            disabledSaveBtn:false });
        //this.props.formDirty();
    }

    todateChangedRaw = (event) => {
        if (event.target.value.length === 10
            && checkDate(event.target.value)
            && new Date(event.target.value)
            && moment().isAfter(event.target.value)) {
            const formattedDate = event.target.value ? moment(new Date(event.target.value.toString())).format('MM/DD/YYYY') : null;
            this.setState({  toDate: formattedDate});
        } 
        //this.props.formDirty();
    }

    render() {
        let modalContent;
        let modalTitle;
        let modalType = '';

        const WorkHistoryModalContent = <form className="form my-2 my-lg-0">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <Input
                        name="Designation"
                        label="Designation / Title"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. Car Provider"
                        className={"form-control " + (!this.state.isValid && !this.state.designation && 'inputFailure')}
                        value={this.state.designation}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            designation: e.target.value,
                            disabledSaveBtn:false
                        })}
                        
                    />
                    {!this.state.isValid && (!this.state.designation ) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please select {this.state.designation === '' && ' Designation'}</span>}
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
                            disabledSaveBtn:false
                        })}
                    />
                    {!this.state.isValid && (!this.state.company ) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please select {this.state.company === '' && ' CompanyName'}</span>}

                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="Location"
                        label="Location"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. San Francisco Bay Area"
                        className="form-control"
                        value={this.state.location}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            location: e.target.value
                        })}
                    />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>From Date</label>
                    <Calendar 
                        startDate={this.state.fromDate && moment(this.state.fromDate)}
                        onDateChange={this.dateChanged}
                        onDateChangeRaw={this.dateChangedRaw}
                        mandatory={true}
                        maxDate={moment()}
                        value={this.state.fromDate}
                        className={"form-control datePicker " + (((!this.state.isValid && !this.state.fromDate )) && 'inputFailure')}
                    />
                    {!this.state.isValid && (!this.state.fromDate ) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please select {this.state.fromDate === '' && ' From Date '}</span>}
                    </div>
                </div>
                
                <div className="col-md-6 MonthlyPicker mb-2">
                {!this.state.isWorking && <div className="form-group">
                    <label>To Date</label>
                    <Calendar 
                        startDate={this.state.toDate && moment(this.state.toDate)}
                        onDateChange={this.todateChanged}
                        onDateChangeRaw={this.todateChangedRaw}
                        mandatory={true}
                        maxDate={moment()}
                        value={this.state.toDate}
                        className={"form-control datePicker " + (((!this.state.isValid && !this.state.toDate)) && 'inputFailure')}
                    />
                    {!this.state.isValid && (!this.state.toDate ) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please select {this.state.toDate === '' && ' To Date '}</span>}
                    
                </div>}
            </div>
                <div className="col-md-12 mb-3">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value={this.state.isWorking} id="defaultCheck1"
                            onChange={(e) => this.setState({ isWorking: e.target.checked })}
                           />
                            I am currently working here
                            <span className="CheckboxIcon"/>
                        </label>
                    </div>
                </div>
                <div className="col-md-12">
                    <TextArea
                        name='Description'
                        label="Description"
                        placeholder='Write your Description'
                        className='form-control'
                        rows='5'
                        value={this.state.description}
                        maxlength={"100"}
                        textChange={(e) => this.setState({
                            description: e.target.value
                        })}
                    />
                </div>
            </div>
        </form>

        
        const workhistoryList = this.props.workhistoryList && this.props.workhistoryList.map((WorkHistoryList, i) => {
            return (
                <li className="SPWorkHistoryItems" key={WorkHistoryList.company}>
                    <div className="SPCertificateContent">
                        <div className="width100 d-flex">
                            <h5 className="SPCertificateHeader">
                                {WorkHistoryList.description} - <span>{WorkHistoryList.company}</span>
                                <span className="ml-auto SPWorkYear">{WorkHistoryList.fromDate} - {WorkHistoryList.toDate}</span>
                            </h5>
                        </div>
                        <span className="SPCertificateSubtle">{WorkHistoryList.location}</span>
                        <span className="SPCertificateDesc">{WorkHistoryList.description}</span>
                    </div>
                    <i className="SPIconMedium SPIconDelete mr-3" id={WorkHistoryList.workHistoryId}
                        onClick={(e) => this.showModalOnDelete(e)} />
                    <i className="SPIconMedium SPIconEdit" id={WorkHistoryList.workHistoryId}
                        onClick={(e) => this.editWorkHistory(e)} />
                </li>
            )
        });

        if (this.state.WorkHistoryModal) {
            if (this.state.add) {
                modalTitle = 'Add Work History';
                modalType = 'add';
            } else if (this.state.edit) {
                modalTitle = 'Edit Work History';
                modalType = 'edit';
            }
            modalContent = WorkHistoryModalContent;
        }


        return(
            <div className="col-md-12 card CardWidget SPWorkHistory">
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Work History</h4>
                    <i className="SPIconLarge SPIconAdd"
                    onClick={this.toggleWorkHistory.bind(this, 'add')} />
                </div>

                <div className="SPCertificateContainer width100">
                        
                        {this.props.workhistoryList.length > 0 ? <ul className="SPCertificateList"> {workhistoryList} </ul> :
                        <ul className="SPCertificateList">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                    <span className='SPNoInfoDesc'> to add Work History</span>
                                </div>
                            </div>
                            </ul>
                        }
                </div>

            <ProfileModalPopup
                isOpen={this.state.WorkHistoryModal}
                toggle={this.toggleWorkHistory.bind(this, modalType)}
                ModalBody={modalContent}
                className="modal-lg asyncModal CertificationModal"
                modalTitle={modalTitle}
                centered="centered"
                onClick={this.state.modalSaveAction}
                disabled={this.state.disabledSaveBtn}
            />

            <ModalPopup
                isOpen={this.state.showModalOnDelete}
                ModalBody={<span>Do you really want to remove the Education details</span>}
                btn1="YES"
                btn2="NO"
                className="modal-sm"
                headerFooter="d-none"
                centered={true}
                onConfirm={() => this.deleteWorkHistory()}
                onCancel={() => this.setState({
                    showModalOnDelete: !this.state.showModalOnDelete,
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
        serviceProviderId: state.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkHistory));