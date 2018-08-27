import React,{Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SkillsMultiSelect, ModalPopup, ProfileModalPopup } from "../../../components"
import { getSkills, addSkills, getSelectedSkills } from '../../../redux/profile/Skills/actions';
import {compare,difference} from "../../../utils/comparerUtility";

class Skills extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isSkillsModalOpen: false,
            selectedSkills: [],
            selectedSkillIds: '',
            disabledSaveBtn: true,
            isAdd: false,
            isDiscardModalOpen: false
        };
        this.oldSelectedValue = '';
    };

    componentDidMount() {
        this.props.getSkills();
        this.props.getSelectedSkills();
    }

    componentWillReceiveProps(nextProps) {
        this.oldSelectedValue = nextProps.selectedSkillsList.skills;
        let selectedSkillIds = '';

        if (nextProps.selectedSkillsList && nextProps.selectedSkillsList.skills) {
            for (const skills of nextProps.selectedSkillsList.skills) {
                {
                    selectedSkillIds === '' ?
                        selectedSkillIds = skills.id
                        :
                        selectedSkillIds = selectedSkillIds + ',' + skills.id
                }
            }
        }
        this.setState({ selectedSkills: selectedSkillIds });
    }

    toggleSkills = () => {
        this.setState({
            isSkillsModalOpen: !this.state.isSkillsModalOpen,
        })
        const previouslySelectedValues = this.oldSelectedValue && this.oldSelectedValue.map(function (elem) {
            return elem.id;
        }).join(",");

        let previousValue = {
            selectedSkills: previouslySelectedValues
        }

        let staeSelectValue = {
            selectedSkills: this.state.selectedSkills
        }
        
        const fieldDifference = compare(previousValue, staeSelectValue);

        if (fieldDifference === true || previousValue == NaN) {
            this.setState({ isSkillsModalOpen: false, isDiscardModalOpen: false })
        } else {
            this.setState({ isSkillsModalOpen: true, isDiscardModalOpen: true })
        }
    }

    onChangeLanguage = (value) => {
        this.setState({ selectedSkills: value, disabledSaveBtn: false });
        if (value) {
            this.setState({ disabledSaveBtn: false });
        }
    }

    addSkills = () => {
        this.props.addSkills(this.state.selectedSkills);
        this.setState({ isSkillsModalOpen: !this.state.isSkillsModalOpen,
             disabledSaveBtn: true })
    }

    editSkills = () => {
        this.setState({ 
            isSkillsModalOpen: true, 
            isAdd: false 
        });
    }

    updateSkills = () => {
        this.props.addSkills(this.state.selectedSkills);
        this.setState({ isSkillsModalOpen: false, disabledSaveBtn: true })
    }

    reset = () => {

        const previosInitValue = [];

        const previouslySelectedValues = this.oldSelectedValue && this.oldSelectedValue.map(function (elem) {
            return previosInitValue.push(elem.id);
        }).join(",");

        const newlyInitValue = [];

        const newlySelectedValues = this.state.selectedSkills;
        newlyInitValue.push(newlySelectedValues);

        const result = difference(previosInitValue, newlyInitValue)

        this.setState({ selectedSkills: result, isSkillsModalOpen: false, isDiscardModalOpen: false, disabledSaveBtn: true });
    }

    render() {

        let modalTitle;
        let modalContent;

        let skillsOptions = this.props.SkillsList && this.props.SkillsList.map((skillsList) => {
            return {
                label: skillsList.name,
                value: skillsList.id
            }
        });

        let SkillsModalContent =
            <SkillsMultiSelect
                onselect={this.onChangeLanguage}
                listItems={skillsOptions}
                value={this.state.selectedSkills}
                multi={true}
                closeOnSelect={true}
                placeholder='Select your skills'
            />;

        let selectedItems = this.props.selectedSkillsList.skills && this.props.selectedSkillsList.skills.map(item => {
            return (
                <li className={'SPSkillsItems'} key={item.id}>
                    {item.name}
                </li>
            )
        })

        {
            this.state.isSkillsModalOpen && this.state.isAdd ?
                modalTitle = 'Add Skills and Experience'
                :
                modalTitle = 'Edit Skills and Experience'
        }

        modalContent = SkillsModalContent;

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Skills and Experience</h4>
                    {this.props.selectedSkillsList.skills && this.props.selectedSkillsList.skills.length > 0 ?
                        <i className="SPIconMedium SPIconEdit" onClick={this.editSkills} />
                        :
                        < i className="SPIconLarge SPIconAdd" onClick={() => this.setState({isSkillsModalOpen: true,isAdd:true})} />
                    }
                </div>
                <div className="SPCertificateContainer width100">
                    {this.props.selectedSkillsList.skills && this.props.selectedSkillsList.skills.length > 0 ?
                        <ul className="SPSkillsList">
                            {selectedItems}
                        </ul>
                        :
                        <div className='SPNoInfo'>
                            <div className='SPNoInfoContent'>
                                <div className='SPInfoContentImage' />
                                <span className='SPNoInfoDesc'>Click <i className="SPIconMedium SPIconAddGrayScale" onClick={() => this.setState({isSkillsModalOpen: true,isAdd: true})} /> to add Skills and Experience</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.isSkillsModalOpen}
                    toggle={this.toggleSkills}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal LanguagesModal"
                    modalTitle={modalTitle}
                    centered={true}
                    onClick={this.state.isAdd ?
                        this.addSkills
                        :
                        this.updateSkills
                    }
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
                        isDiscardModalOpen: false
                    })}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSkills: () => dispatch(getSkills()),
        getSelectedSkills: () => dispatch(getSelectedSkills()),
        addSkills: (data) => dispatch(addSkills(data))
    }
};

function mapStateToProps(state) {
    return {
        SkillsList: state.profileState.SkillsState.SkillsList,
        selectedSkillsList: state.profileState.SkillsState.selectedSkillsList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skills));
