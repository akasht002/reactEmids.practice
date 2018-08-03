import React,{Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input ,TextArea,ProfileModalPopup, ModalPopup } from "../../../components";
import {Calendar} from "../../../components/LevelOne/index";
import { checkSpace,formattedDateMoment,formattedDateChange,formateStateDate } from "../../../utils/validations";
import {compare} from "../../../utils/comparerUtility";
import {getWorkHistory, addWorkHistory,editWorkHistory, updateWorkHistory, deleteWorkHistory} from "../../../redux/profile/WorkHistory/actions";
import "./styles.css";

class WorkHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkHistoryModalOpen: false,
            workHistoryId:'',
            designation:'',
            company:'',
            location:'',
            fromDate:'',
            toDate:'',
            isWorking:false,
            description:'',
            isOnDeleteModalOpen: false,
            isAdd: false,
            isValid: true,
            disabledSaveBtn: true,
            isValidDate:true,
            isDiscardModalOpen:false
        }
    }

    componentDidMount() {
        this.props.getWorkHistory();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            designation: nextProps.workhistoyFieldDetails.designation,
            company: nextProps.workhistoyFieldDetails.company,
            location: nextProps.workhistoyFieldDetails.location,
            fromDate: nextProps.workhistoyFieldDetails.fromDate,
            toDate: nextProps.workhistoyFieldDetails.toDate,
            description:nextProps.workhistoyFieldDetails.description,
            isWorking:nextProps.workhistoyFieldDetails.isWorking,
            workHistoryId:nextProps.workhistoyFieldDetails.workHistoryId
            
        })
    }

    reset() {
        this.setState({
            isWorkHistoryModalOpen: false,
            designation: '',
            company: '',
            location: '',
            fromDate: '',
            toDate: '',
            description: '',
            isWorking: '',
            disabledSaveBtn: true,
            isDiscardModalOpen:false,
            isAdd:true,
            isValid:true
        })
    }

    toggleWorkHistory=(e)=>{
        this.setState({
            isWorkHistoryModalOpen: !this.state.isWorkHistoryModalOpen,
            isValid: true,
            disabledSaveBtn:true,
            isDiscardModalOpen:false
        })
        let workhistoryFielObject = {
            designation: this.props.workhistoyFieldDetails.designation,
            company: this.props.workhistoyFieldDetails.company,
            location: this.props.workhistoyFieldDetails.location,
            fromDate: this.props.workhistoyFieldDetails.fromDate,
            toDate: this.props.workhistoyFieldDetails.toDate,
            description: this.props.workhistoyFieldDetails.description,
            isWorking:this.props.workhistoyFieldDetails.isWorking
        }
        
         let stateObject = {
            designation: this.state.designation,
            company: this.state.company,
            location: this.state.location,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            description: this.state.description,
            isWorking:this.state.isWorking
        }
        
         const fieldDifference = compare(workhistoryFielObject, stateObject);
         if (fieldDifference === true) {
            this.setState({ isWorkHistoryModalOpen: false,
                isDiscardModalOpen: false,
                designation:'',
                company:'',
                location:'',
                fromDate:'',
                toDate:'',
                description:'',
                isWorking:''
            })
        } else {
            this.setState({ isDiscardModalOpen: true, isWorkHistoryModalOpen: true })
        }
        this.reset();
    }
    addWorkhistory = () => {
        if (checkSpace(this.state.designation) && checkSpace(this.state.company) && (this.state.fromDate)) {
           
            const data = {
                workHistoryId:this.state.workHistoryId,
                company:this.state.company.trim(),
                designation: this.state.designation.trim(),
                location: this.state.location.trim(),
                fromDate:this.state.fromDate,
                toDate:this.state.toDate,
                isWorking:this.state.isWorking,
                description:this.state.description.trim()
            };
            if(data.isWorking){
                const data ={
                    fromDate:""
                }
            }else {
                const data ={
                    fromDate:this.state.fromDate
                }
            }
            
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
        if (this.state.designation && this.state.company && this.state.fromDate && this.state.toDate) {
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
            this.setState({ isWorkHistoryModalOpen: !this.state.isWorkHistoryModalOpen,  disabledSaveBtn: true});
            this.reset();
        }else {
            this.setState({ isValid: false });
        }
    }

    deleteWorkHistory = () => {
        this.props.deleteWorkHistory(this.state.workHistoryId);
        this.setState({ isOnDeleteModalOpen: !this.state.isOnDeleteModalOpen });
    }

    dateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({  
            fromDate: formattedDate,
            disabledSaveBtn:false 
        });

    }
    
    dateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({  
            fromDate: formattedDate
        });
 
    }

    todateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({  
            toDate: formattedDate,
            disabledSaveBtn:false
         });

    }

    todateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
            this.setState({  
                toDate: formattedDate
            });
      
    }

    render() {
        let modalContent;
        let modalTitle;
       

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
                        startDate={this.state.fromDate && formateStateDate(this.state.fromDate)}
                        onDateChange={this.dateChanged}
                        onDateChangeRaw={this.dateChangedRaw}
                        mandatory={true}
                        maxDate={this.state.toDate && formateStateDate(this.state.toDate)}
                        value={this.state.fromDate}
                        className={"form-control datePicker " + (((!this.state.isValid && !this.state.fromDate )) && 'inputFailure')}
                    />
                    {!this.state.isValid && (!this.state.fromDate ) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please select {this.state.fromDate === '' ? 'From Date' : 'From Date'}</span>}
                    </div>
                </div>
                
                <div className="col-md-6 MonthlyPicker mb-2">
                {!this.state.isWorking && <div className="form-group">
                    <label>To Date</label>
                    <Calendar 
                        startDate={this.state.toDate && formateStateDate(this.state.toDate)}
                        onDateChange={this.todateChanged}
                        onDateChangeRaw={this.todateChangedRaw}
                        mandatory={true}
                        minDate={this.state.fromDate && formateStateDate(this.state.fromDate)}
                        value={this.state.toDate}
                        className={"form-control datePicker " + (((!this.state.isValid && !this.state.toDate)) && 'inputFailure')}
                    />
                    {!this.state.isValid && (!this.state.toDate ) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please select {this.state.toDate === '' ? 'To Date' :'To Date'}</span>}
                    
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
                        required={false}
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
                            </h5>
                            <span className="ml-auto SPWorkYear">{WorkHistoryList.fromDate} - {WorkHistoryList.toDate}</span>

                        </div>
                        <span className="SPCertificateSubtle">{WorkHistoryList.location}</span>
                        <span className="SPCertificateDesc">{WorkHistoryList.description}</span>
                    </div>
                    <i className="SPIconMedium SPIconDelete mr-3" id={WorkHistoryList.workHistoryId}
                        onClick={(e) => this.isOnDeleteModalOpen(e)} />
                    <i className="SPIconMedium SPIconEdit" id={WorkHistoryList.workHistoryId}
                        onClick={(e) => this.editWorkHistory(e)} />
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


        return(
            <div className="col-md-12 card CardWidget SPWorkHistory">
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Work History</h4>
                    <i className="SPIconLarge SPIconAdd"
                    onClick={() => this.setState({ isWorkHistoryModalOpen: true,isAdd: true })} />
                </div>

                <div className="SPCertificateContainer width100">
                        
                        {this.props.workhistoryList.length > 0 ? <ul className="SPCertificateList"> {workhistoryList} </ul> :
                        <ul className="SPCertificateList">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                    <span className='SPNoInfoDesc'> click <i className="SPIconMedium SPIconAddGrayScale" onClick={() => this.setState({ isWorkHistoryModalOpen: true,isAdd: true })}/> to add Work History</span>
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
                centered="centered"
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
            centered="centered"
            onConfirm={() => this.reset()}
            onCancel={() => this.setState({
                isDiscardModalOpen: false,
            })}
        />

            <ModalPopup
                isOpen={this.state.isOnDeleteModalOpen}
                ModalBody={<span>Do you really want to remove the Work History details</span>}
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
        serviceProviderId: state.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkHistory));