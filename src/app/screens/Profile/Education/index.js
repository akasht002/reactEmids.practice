import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input ,ProfileModalPopup, ModalPopup } from "../../../components";
import {formateYearDate} from "../../../utils/validations";
import {compare} from "../../../utils/comparerUtility";
import { getEducation, addEducation, editEducation, updateEducation, deleteEducation } from '../../../redux/profile/Education/actions';
import {SCREENS, PERMISSIONS} from '../../../constants/constants';
import EllipsisText from "react-ellipsis-text";
import "./styles.css";
class Education extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsEducationModalOpen: false,
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
            isDiscardModalOpen:false,
            fromDateChange: false,
            isOnfocus: false,
            isToYearOnfocus: false
        };
        this.size = 1
    };
    componentDidMount() {
        this.props.getEducation();
    }
    componentWillReceiveProps(nextProps){
     this.setState({
        school: nextProps.educationalDetails.school,
        degree: nextProps.educationalDetails.degree,
        fieldOfStudy: nextProps.educationalDetails.fieldOfStudy,
        startYear: nextProps.educationalDetails.startYear,
        endYear: nextProps.educationalDetails.endYear,
        educationId:nextProps.educationalDetails.educationId
     })
    }
    reset = () => {
        this.setState({
            IsEducationModalOpen: false,
            school: '',
            degree: '',
            fieldOfStudy: '',
            certificationId: '',
            startYear: '',
            endYear: '',
            disabledSaveBtn:true,
            isDiscardModalOpen: false,
            isAdd: true,
            isValid: true,
            fromDateChange: false
        })
    }

    toggleEducation= () => {
        this.setState({
            IsEducationModalOpen: !this.state.IsEducationModalOpen,
            isValid: true,
            disabledSaveBtn: true,
            isDiscardModalOpen:false
        })
        let education = this.props.educationalDetails;
        let educationPropObject = {
            school: education.school,
            degree: education.degree,
            fieldOfStudy: education.fieldOfStudy,
            startYear:education.startYear,
            endYear:education.endYear

        };
        
        let stateObject = {
            school: this.state.school,
            degree: this.state.degree,
            fieldOfStudy: this.state.fieldOfStudy,
            startYear: this.state.startYear,
            endYear: this.state.endYear

        };
         const fieldDifference = compare(educationPropObject, stateObject);
         if (fieldDifference === true) {
            this.setState({ IsEducationModalOpen: false, 
                isDiscardModalOpen: false,
                school:'',
                degree:'',
                fieldOfStudy:'',
                startYear:'',
                endYear:''
             })
        } else {
            let status = this.checkValidation(this.state.isAdd, this.state.school, 
                this.state.degree, this.state.fieldOfStudy, this.state.startYear, this.state.endYear);
            this.setState({ isDiscardModalOpen: status, IsEducationModalOpen: status, fromDateChange: true })
        }
    }

    checkValidation = (isAdd, school, degree, fieldOfStudy, startYear, endYear) => {
        if(isAdd && school === '' && degree === '' && fieldOfStudy === '' && 
        startYear === '' && endYear === '') {
            return false;
        } else {
            return true;
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
        this.setState({IsEducationModalOpen: true, isAdd: false, educationId: e.target.id, fromDateChange: true });
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
            this.setState({ IsEducationModalOpen: !this.state.IsEducationModalOpen, disabledSaveBtn: true});
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
        let year = [];
        let selectedYear = formateYearDate();
        let defaultYear ="1901";
        let curYear = formateYearDate();
        year.push(<option value="" key= {curYear} disabled selected>YYYY</option>)
        for (let i = defaultYear; i <= curYear; i++) {
            let selectedOption = 'false';
            if (i === selectedYear) {
                selectedOption = 'selected'
                
            }
            year.push(<option key= {i} value={i} selected={selectedOption}>{i}</option>)
        }
        return year;
    };
    
    YearListCal(){
        let year = [];
        let selectedYear = formateYearDate();
       // let curYear = formateYearDate();
        let curYear = 2200; //To do confirm with BA
        if(this.state.fromDateChange) {
            year.push(<option value="" key= {curYear} disabled selected>YYYY</option>)
            for (var i = this.state.startYear; i <= curYear; i++) {
                var selectedOption = 'false';
                if (i === selectedYear) {
                    selectedOption = 'selected'
                    
                }
                year.push(<option  key= {i} value={i} selected={selectedOption}>{i}</option>)
            }
            return year;
        } else {
            year.push(<option value="" key= {curYear} disabled selected>YYYY</option>);
            return year;
        }
    }

    selectOnFocus = (e) => {
        e.target.size = 10
        this.setState({ isOnfocus: true })
    }

    selectOnBlur = (e) => {
        e.target.size = 1
        this.setState({ isOnfocus: false })
    }

    selectOnFocusTo = (e) => {
        e.target.size = 10
        this.setState({ isToYearOnfocus: true })
    }

    selectOnBlurTo = (e) => {
        e.target.size = 1
        this.setState({ isToYearOnfocus: false })
    }

    selectChange = (e) => {
        e.target.size = 1;
        e.target.blur();
        this.setState({
            startYear: e.target.value,
            disabledSaveBtn: false,
            fromDateChange: true,
            isOnfocus: false

        })
    }

    selectToYearChange = (e) => {
        e.target.size = 1;
        e.target.blur();
        this.setState({
            endYear: e.target.value,
            disabledSaveBtn: false,
            isToYearOnfocus: false
        })
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
                            fieldOfStudy: e.target.value,
                            disabledSaveBtn:false
                        })}
                    />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>From Year</label>
                        <select className={(this.state.isOnfocus ? "no-border": " ") + " form-control"}                            
                            size={this.size}                       
                            onFocus={(e) => this.selectOnFocus(e)}
                            onBlur={(e) => this.selectOnBlur(e)}
                        value={this.state.startYear}
                        onChange={(e) => this.selectChange(e)}
                        >
                        {this.YearList()}
                        </select>
                </div>
            </div>
            <div className="col-md-6 MonthlyPicker mb-2">
                <div className="form-group">
                    <label>To Year (or Expected)</label>
                    <select className={(this.state.isToYearOnfocus ? "no-border": " ") + " form-control"}
                        // disabled={!this.state.fromDateChange}
                        onFocus={(e) => this.selectOnFocusTo(e)}
                        onBlur={(e) => this.selectOnBlurTo(e)}
                        value={this.state.endYear}
                        onChange={(e) => this.selectToYearChange(e)}>
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
                    {
                        EducationList.school && <EllipsisText className='SPCertificateHeader' text={EducationList.school} length={"50"} />
                    }
                    
                    <span className={'ml-auto SPWorkYear'}>{EducationList.startYear} - {EducationList.endYear}</span>
                    </div>
                    <span className={'SPEducationDesc'}>{
                        EducationList.degree && <EllipsisText className='SPCertificateDesc' text={EducationList.degree} length={"50"} />
                    }
                    {
                        EducationList.fieldOfStudy && <EllipsisText className='SPCertificateDesc' text={EducationList.fieldOfStudy} length={"50"} />
                    }
                    </span>
                    </div>
                    {this.props.isUser && 
                        <i name={SCREENS.PROFILE + '_' + PERMISSIONS.DELETE} className="SPIconMedium SPIconDelete mr-3" id={EducationList.educationId}
                        onClick={(e) => this.showModalOnDelete(e)} />}
                    {this.props.isUser && <i name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE} className="SPIconMedium SPIconEdit" id={EducationList.educationId}
                        onClick={(e) => this.editEducation(e)} />
                    }
                    
                </li>
            )
        });

        if (this.state.IsEducationModalOpen) {
            if (this.state.isAdd) {
                modalTitle = 'Add Education';
            } else {
                modalTitle = 'Edit Education';
            }
            modalContent = EducationModalContent;
        }
        
        return (
            <div className="col-md-12 card CardWidget SPCertificate">
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Education</h4>
                    {this.props.isUser && 
                    <i className="SPIconLarge SPIconAdd" name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}
                        onClick={() => this.setState({IsEducationModalOpen: true,isAdd: true})} />}
                </div>
                <div className="SPCertificateContainer width100">
                    
                        {this.props.educationList.length > 0 ? <ul className="SPEducationList"> {educationList} </ul> :
                        <ul className="SPEducationList">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                      <span className='SPNoInfoDesc' name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}>  Click <i className="SPIconMedium SPIconAddGrayScale" onClick={() => this.setState({ IsEducationModalOpen: true , isAdd: true})}/> to add Education</span>
                                </div>
                            </div>
                            </ul>
                        }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.IsEducationModalOpen}
                    toggle={this.toggleEducation}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal CertificationModal educ-modpop"
                    modalTitle={modalTitle}
                    centered={true}
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
                    centered={true}
                    onConfirm={() => this.reset()}
                    onCancel={() => this.setState({
                        isDiscardModalOpen: false,
                        disabledSaveBtn: false
                    })}
                />


                <ModalPopup
                    isOpen={this.state.showModalOnDelete}
                    ModalBody={<span>Do you really want to remove the Education Details?</span>}
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
        educationalDetails: state.profileState.EducationState.educationalDetails,
        serviceProviderId: state.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId,
        isUser: state.profileState.PersonalDetailState.isUser,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Education));