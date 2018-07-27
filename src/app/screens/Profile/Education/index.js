import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment  from 'moment';
import { Input ,ProfileModalPopup, ModalPopup } from "../../../components";
import { getEducation, addEducation, editEducation, updateEducation, deleteEducation } from '../../../redux/profile/Education/actions';

import "./styles.css";
class Education extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EducationModal: false,
            educationId:'',
            school:'',
            degree:'',
            fieldOfStudy:'',
            startYear:'',
            endYear:'',
            showModalOnDelete: false,
            modalSaveAction: '',
            add: false,
            edit: false,
            isValid: true,
            disabledSaveBtn: true
        };
    };
    componentDidMount() {
        this.props.getEducation(this.props.educationId);
    }
    componentWillReceiveProps(nextProps){
     this.setState({
        school: nextProps.educationFieldDetails.school,
        degree: nextProps.educationFieldDetails.degree,
        fieldOfStudy: nextProps.educationFieldDetails.fieldOfStudy,
        startYear: nextProps.educationFieldDetails.startYear,
        endYear: nextProps.educationFieldDetails.endYear,
        educationId:nextProps.educationFieldDetails.educationId
     })


    }
    toggleEducation(action, e){
        this.setState({
            EducationModal: !this.state.EducationModal,
            modalSaveAction: this.addEducation,
            add: true,
            edit: false,
            isValid: true,
            school:'',
            degree:'',
            fieldOfStudy:'',
            startYear:'',
            endYear:''
        })
    }
    addEducation = () => {
        if ((this.state.school) && (this.state.degree) && (this.state.fieldOfStudy) && (this.state.startYear) && (this.state.endYear)) {
            const data = {
                school: this.state.school,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                startYear:this.state.startYear,
                endYear:this.state.endYear,
                educationId:this.state.educationId
            };
            this.props.addEducation(data);
            this.setState({ 
                modalSaveAction: this.addEducation, 
                EducationModal: !this.state.EducationModal, 
                school: '', 
                degree: '', 
                fieldOfStudy: '',  
                startYear:'',
                endYear:''
            });
        } else {
            this.setState({ isValid: false });
        }
    }

    showModalOnDelete = (e) => {
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete, educationId: e.target.id });
    }

    editEducation = (e) => {
        this.setState({ modalSaveAction: this.updateEducation, EducationModal: true, add: false, edit: true, educationId: e.target.id });
        this.props.editEducation(e.target.id);
    }

    updateEducation = () => {
        if (this.state) {
            const data = {
                school: this.state.school,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                startYear: this.state.startYear,
                endYear: this.state.endYear,
                educationId: this.state.educationId
            };
            this.props.updateEducation(data);
            this.setState({ EducationModal: !this.state.EducationModal, school: '', degree: '', fieldOfStudy: '',startYear:'',endYear:''});
        }
    }

    deleteEducation = () => {
        this.props.deleteEducation(this.state.educationId);
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete });
    }
    YearList() {
        var year = [];
        var selectedYear = "2018";
        var curYear = moment().format('YYYY');
        year.push(<option value="" disabled selected>YYYY</option>)
        for (var i = '1901'; i <= curYear; i++) {
            var selectedOption = 'false';
            if (i === selectedYear) {
                selectedOption = 'selected'
                
            }
            year.push(<option value={i} selected={selectedOption}>{i}</option>)
        }
        return year;
    };
    YearListCal(){
        //console.log(this.state.startYear);
        var year = [];
        var selectedYear = "2018";
        var curYear = moment().format('YYYY');
        year.push(<option value="" disabled selected>YYYY</option>)
        for (var i = this.state.startYear; i <= curYear; i++) {
            var selectedOption = 'false';
            if (i === selectedYear) {
                selectedOption = 'selected'
                
            }
            year.push(<option value={i} selected={selectedOption}>{i}</option>)
        }
        return year;
    }
    render() {
        let modalContent;
        let modalTitle;
        let modalType = '';

        const EducationModalContent = <form className="form my-2 my-lg-0">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <Input
                        name="School"
                        label="School/University"
                        autoComplete="off"
                        
                        type="text"
                        placeholder="e.g. San Francisco University"
                        className={"form-control"}
                        value={this.state.school}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            school: e.target.value,
                            disabledSaveBtn:false
                        })}
                    />
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="Degree"
                        label="Degree"
                        autoComplete="off"
                        
                        type="text"
                        placeholder="e.g. Master of Science (M.S.)"
                        className={"form-control"}
                        value={this.state.degree}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            degree: e.target.value,
                            disabledSaveBtn:false
                        })}
                    />
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="FieldOfStudy"
                        label="Field of Study"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. Speech Language Pathology / Pathologist"
                        className={"form-control"}
                        value={this.state.fieldOfStudy}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            fieldOfStudy: e.target.value,
                            disabledSaveBtn:false
                        })}
                    />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>From Year</label>
                        <select  className={"form-control"}
                        value={this.state.startYear}
                        onChange={(e) => this.setState({
                            startYear: e.target.value
                        })}>
                        {this.YearList()}
                        </select>
                    </div>
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>To Year (or Expected)</label>
                        <select  className={"form-control"}
                        value={this.state.endYear}
                        onChange={(e) => this.setState({
                            endYear: e.target.value,
                            disabledSaveBtn:false
                        })}>
                        {this.YearListCal()}                            
                        </select>
                    </div>
                </div>
                
            </div>
        </form>

        const educationList = this.props.educationList && this.props.educationList.map((EducationList, i) => {
            return (
                <li className='SPEducationItems' key={EducationList.educationId}>
                    <div className='SPCertificateContent'>
                    <div className={'width100 d-flex'}>
                    <h5 className={'SPCertificateHeader'}>{EducationList.school}</h5>
                    <span className={'ml-auto SPWorkYear'}>{EducationList.startYear} - {EducationList.endYear}</span>
                    </div>
                    <span className={'SPEducationDesc'}>{EducationList.degree} {EducationList.fieldOfStudy}</span>
                    </div>
                    <i className="SPIconMedium SPIconDelete mr-3" id={EducationList.educationId}
                        onClick={(e) => this.showModalOnDelete(e)} />
                    <i className="SPIconMedium SPIconEdit" id={EducationList.educationId}
                        onClick={(e) => this.editEducation(e)} />
                </li>
            )
        });

        if (this.state.EducationModal) {
            if (this.state.add) {
                modalTitle = 'Add Education';
                modalType = 'add';
            } else if (this.state.edit) {
                modalTitle = 'Edit Education';
                modalType = 'edit';
            }
            modalContent = EducationModalContent;
        }
        
        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Education</h4>
                    <i className="SPIconLarge SPIconAdd"
                        onClick={this.toggleEducation.bind(this, 'add')} />
                </div>
                <div className="SPCertificateContainer width100">
                    
                        {this.props.educationList.length > 0 ? <ul className="SPEducationList"> {educationList} </ul> :
                        <ul className="SPEducationList">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                    <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" /> to add Services Offered</span>
                                </div>
                            </div>
                            </ul>
                        }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.EducationModal}
                    toggle={this.toggleEducation.bind(this, modalType)}
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
                    onConfirm={() => this.deleteEducation()}
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
        getEducation: () => dispatch(getEducation()),
        addEducation: (data) => dispatch(addEducation(data)),
        editEducation: (data) => dispatch(editEducation(data)),
        updateEducation: (data) => dispatch(updateEducation(data)),
        deleteEducation: (data) => dispatch(deleteEducation(data))

    }
};

function mapStateToProps(state) {
    return {
        educationList: state.profileState.EducationState.educationList,
        addeducationSuccess: state.profileState.EducationState.addeducationSuccess,
        educationFieldDetails: state.profileState.EducationState.educationFieldDetails,
        serviceProviderId: state.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Education));