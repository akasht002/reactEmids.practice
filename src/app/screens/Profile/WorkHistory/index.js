import React,{Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input ,TextArea,ProfileModalPopup, ModalPopup } from "../../../components";
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
            isChecked:true
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
            workHistoryId:nextProps.workhistoyFieldDetails.workHistoryId
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
            degree:'',
            location:'',
            company:'',
            fromDate:'',
            toDate:'',
            description:''
        })
    }
    addWorkhistory = () => {
        if (!this.state) {
            const data = {
                designation: this.state.designation,
                degree: this.state.degree,
                location: this.state.location,
                company:this.state.company,
                fromDate:this.state.fromDate,
                toDate:this.state.toDate,
                description:this.state.description,
                workHistoryId:this.state.workHistoryId
            };
            this.props.getWorkHistory(data);
            this.setState({ 
                modalSaveAction: this.addEducation, 
                WorkHistoryModal: !this.state.WorkHistoryModal, 
                designation: '', 
                degree: '', 
                location:'',
                company: '',  
                fromDate:'',
                toDate:'',
                description:''
            });
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
                school: this.state.school,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                startYear: this.state.startYear,
                endYear: this.state.endYear,
                workHistoryId: this.state.workHistoryId
            };
            this.props.updateEducation(data);
            this.setState({ WorkHistoryModal: !this.state.WorkHistoryModal, school: '', degree: '', fieldOfStudy: '',startYear:'',endYear:''});
        }
    }

    deleteWorkHistory = () => {
        this.props.deleteWorkHistory(this.state.workHistoryId);
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete });
    }

    toggleCheckbox() {
        this.setState({
            isChecked: !this.state.isChecked,
        });
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
                        className="form-control"
                        maxlength={"100"}
                    />
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="CompanyName"
                        label="Company Name"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. Home Supportive SVC"
                        className="form-control"
                        maxlength={"100"}
                    />
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="Location"
                        label="Location"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. San Francisco Bay Area"
                        className="form-control"
                        maxlength={"100"}
                    />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>From Date</label>
                    </div>
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                <div className="form-group">
                    <label>To Date</label>
                </div>
            </div>
                <div className="col-md-12 mb-3">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                            onClick={this.toggleCheckbox.bind(this)}/>
                            I am currently working here
                            <span className="CheckboxIcon"/>
                        </label>
                    </div>
                </div>
                <div className="col-md-12">
                    <TextArea
                        name='Description'
                        placeholder='Write your Description'
                        className='form-control'
                        rows='5'
                        value='Description'
                        maxlength={"100"}
                    />
                </div>
            </div>
        </form>

        
        const workhistoryList = this.props.workhistoryList && this.props.workhistoryList.map((WorkHistoryList, i) => {
            return (
                <li className="SPWorkHistoryItems" key={WorkHistoryList.company}>
                    <div className="SPCertificateContent">
                    <div className="width100 d-flex">
                        <h5 className="SPCertificateHeader">{WorkHistoryList.description}
                            <span>{WorkHistoryList.description}</span>
                            <span className="ml-auto SPWorkYear"></span>
                        </h5>
                    <span className={'ml-auto SPWorkYear'}>{WorkHistoryList.fromDate} - {WorkHistoryList.toDate}</span>
                    </div>
                    <span className={'SPEducationDesc'}>{WorkHistoryList.degree} {WorkHistoryList.description}</span>
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
                <h4 className="primaryColor">WorkHistory</h4>
                <i className="SPIconLarge SPIconAdd"
                onClick={this.toggleWorkHistory.bind(this, 'add')} />
            </div>

            <div className="SPCertificateContainer width100">
                    
                    {this.props.workhistoryList.length > 0 ? <ul className="SPCertificateList"> {workhistoryList} </ul> :
                    <ul className="SPCertificateList">
                        <div className='SPNoInfo'>
                            <div className='SPNoInfoContent'>
                                <div className='SPInfoContentImage' />
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.toggleWorkHistory.bind(this, 'add')} /> to add Services Offered</span>
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