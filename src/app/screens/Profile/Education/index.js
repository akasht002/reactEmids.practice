import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment  from 'moment';
import _ from 'lodash';
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
            isAdd: false,
            isValid: true,
            disabledSaveBtn: true,
            isDiscardModalOpen:false
        };
    };
    componentDidMount() {
        this.props.getEducation();
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
    reset = () => {
        this.setState({
            EducationModal: false,
            school: '',
            degree: '',
            fieldOfStudy: '',
            certificationId: '',
            startYear: '',
            endYear: '',
            disabledSaveBtn:true,
            isDiscardModalOpen: false,
            isAdd: true,
            isValid: true
        })
    }

    toggleEducation= () => {
        this.setState({
            EducationModal: !this.state.EducationModal,
            isAdd: true,
            isValid: true,
            disabledSaveBtn: true,
            isDiscardModalOpen:false
        })
        let educationFielarray = [
            {
                school: this.props.educationFieldDetails.school,
                degree: this.props.educationFieldDetails.degree,
                fieldOfStudy: this.props.educationFieldDetails.fieldOfStudy,
                startYear:this.props.educationFieldDetails.startYear,
                endYear:this.props.educationFieldDetails.endYear

            }
        ]
         let stateArray = [
            {
                school: this.state.school,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                startYear: this.setState.startYear,
                endYear: this.setState.endYear

            }
        ]
         const fieldDifference = _.isEqual(educationFielarray, stateArray);
         if (fieldDifference === true) {
            this.setState({ EducationModal: false, isDiscardModalOpen: false })
        } else {
            this.setState({ isDiscardModalOpen: true, EducationModal: true })
        }
    }
    addEducation = () => {
        if ((this.state.school) && (this.state.degree)) {
            const data = {
                school: this.state.school,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                startYear:this.state.startYear,
                endYear:this.state.endYear,
                educationId:this.state.educationId
            };
            this.props.addEducation(data);
            this.reset();
        } else {
            this.setState({ isValid: false });
        }
    }

    showModalOnDelete = (e) => {
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete, educationId: e.target.id });
    }

    editEducation = (e) => {
        this.setState({EducationModal: true, isAdd: false, educationId: e.target.id });
        this.props.editEducation(e.target.id);
    }

    updateEducation = () => {
        if (this.state.school && this.state.degree ) {
            const data = {
                school: this.state.school,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                startYear: this.state.startYear,
                endYear: this.state.endYear,
                educationId: this.state.educationId
            };
            this.props.updateEducation(data);
            this.setState({ EducationModal: !this.state.EducationModal, disabledSaveBtn: true});
            this.reset();
        }else {
            this.setState({ isValid: false });
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

        const EducationModalContent = <form className="form my-2 my-lg-0">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <Input
                        name="School"
                        label="School/University"
                        autoComplete="off"
                        
                        type="text"
                        placeholder="e.g. San Francisco University"
                        className={"form-control " + (!this.state.isValid && !this.state.school && 'inputFailure')}
                        value={this.state.school}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            school: e.target.value,
                            disabledSaveBtn:false
                        })}
                    />
                    {!this.state.isValid && (!this.state.school) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please enter {this.state.school === '' && ' School/University'}</span>}

                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="Degree"
                        label="Degree"
                        autoComplete="off"
                        
                        type="text"
                        placeholder="e.g. Master of Science (M.S.)"
                        className={"form-control " + (!this.state.isValid && !this.state.degree && 'inputFailure')}
                        value={this.state.degree}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            degree: e.target.value,
                            disabledSaveBtn:false
                        })}
                    />
                    {!this.state.isValid && (!this.state.degree) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please enter {this.state.degree === '' && ' Degree'}</span>}
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
                            fieldOfStudy: e.target.value
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
                            endYear: e.target.value
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
            if (this.state.isAdd) {
                modalTitle = 'Add Education';
            } else {
                modalTitle = 'Edit Education';
            }
            modalContent = EducationModalContent;
        }
        
        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Education</h4>
                    <i className="SPIconLarge SPIconAdd"
                        onClick={() => this.setState({ EducationModal: true })} />
                </div>
                <div className="SPCertificateContainer width100">
                    
                        {this.props.educationList.length > 0 ? <ul className="SPEducationList"> {educationList} </ul> :
                        <ul className="SPEducationList">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                    <span className='SPNoInfoDesc'> to add Education</span>
                                </div>
                            </div>
                            </ul>
                        }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.EducationModal}
                    toggle={this.toggleEducation}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal CertificationModal"
                    modalTitle={modalTitle}
                    centered="centered"
                    onClick={this.state.isAdd ? this.addEducation : this.updateEducation}
                    disabled={this.state.disabledSaveBtn}
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