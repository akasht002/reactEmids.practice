import React,{Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input ,TextArea,ProfileModalPopup, ModalPopup } from "../../../components";
import {getWorkHistory} from "../../../redux/profile/WorkHistory/actions";
import "./styles.css";

class WorkHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WorkHistoryModal: false,
            workHistoryId:'',
        }
    }
    componentDidMount() {
        //WorkHistory
        this.props.getWorkHistory(this.props.workHistoryId);
    }

    toggleWorkHistory(action, e){
        this.setState({
            EducationModal: !this.state.WorkHistoryModal,
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

    render(){
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
                    />
                </div>
                <div className="col-md-6 MonthlyPicker mb-2">
                    <div className="form-group">
                        <label>From Date</label>
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
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
                    />
                </div>
            </div>
        </form>
        return(
            <div className="SPCardTitle d-flex">
            <h4 className="primaryColor">Work History</h4>
            <i className="SPIconLarge SPIconAdd"
                onClick={this.toggleWorkHistory.bind(this, 'add')} />
        </div>
        )
    }


}

function mapDispatchToProps(dispatch) {
    return {
        getWorkHistory: () => dispatch(getWorkHistory())
    }
};

function mapStateToProps(state) {
    return {
        
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkHistory));