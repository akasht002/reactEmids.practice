import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getESPEducation} from '../../../redux/patientProfile/actions'
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
            fromDateChange: false
        };
    };
    componentDidMount() {
        this.props.getEducation();
    }
    render() {

        const educationList = this.props.educationList && this.props.educationList.map((EducationList, i) => {
            return (
                <li className='SPEducationItems' key={EducationList.educationId}>
                    <div className='SPCertificateContent'>
                    <div className={'width100 d-flex'}>
                    <EllipsisText className='SPCertificateHeader' text={EducationList.school} length={"50"} />
                    <span className={'ml-auto SPWorkYear'}>{EducationList.startYear} - {EducationList.endYear}</span>
                    </div>
                    <span className={'SPEducationDesc'}><EllipsisText className='SPCertificateDesc' text={EducationList.degree} length={"50"} />
                        <EllipsisText className='SPCertificateDesc' text={EducationList.fieldOfStudy} length={"50"} /></span>
                    </div>                   
                </li>
            )
        });

       
        
        return (
            <div className="col-md-12 card CardWidget SPCertificate">
                <div className="SPCardTitle d-flex">
                    <h4 className="theme-primary">Education</h4>                    
                </div>
                <div className="SPCertificateContainer width100">
                    
                        {this.props.educationList.length > 0 ? <ul className="SPEducationList"> {educationList} </ul> :
                        <ul className="SPEducationList theme-primary">
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />                                  
                                </div>
                            </div>
                            </ul>
                        }
                </div>               
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getEducation: () => dispatch(getESPEducation())

    }
};

function mapStateToProps(state) {
    return {
        educationList: state.patientProfileState.espEducation,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Education));