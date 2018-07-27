import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup } from "../../../components";
import { SkillsMultiSelect } from "../../../components"
import { getSkills, addSkills, getSelectedSkills } from '../../../redux/profile/Skills/actions';

class Skills extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSkillsModalOpen: false,
            modalSaveAction: '',
            selectedSkills: [],
            selectedSkillIds: '',
            disabledSaveBtn: true,
            isAdd: false,
        };
    };

    componentDidMount() {
        this.props.getSkills();
        this.props.getSelectedSkills();
    }

    componentWillReceiveProps(nextProps) {
        let selectedSkillIds = '';

        if (nextProps.selectedSkillsList && nextProps.selectedSkillsList.skills) {
            for (const skills of nextProps.selectedSkillsList.skills) {
                if (selectedSkillIds === '') {
                    selectedSkillIds = skills.id;
                } else {
                    selectedSkillIds = selectedSkillIds + ',' + skills.id;
                }
            }
        }
        this.setState({ selectedSkills: selectedSkillIds });
    }

    toggleSkills = () => {
        this.setState({
            isSkillsModalOpen: !this.state.isSkillsModalOpen,
            modalSaveAction: this.addSkills,
            isAdd: true
        })
    }

    onChangeLanguage = (value) => {
        this.setState({ selectedSkills: value, disabledSaveBtn: false });
        if (value) {
            this.setState({ disabledSaveBtn: false });
        }
    }

    addSkills = () => {
        this.props.addSkills(this.state.selectedSkills);
        this.setState({ isSkillsModalOpen: !this.state.isSkillsModalOpen, modalSaveAction: this.addSkills, disabledSaveBtn: true })
    }

    editLanguages = () => {
        this.setState({ modalSaveAction: this.updateSkills, isSkillsModalOpen: true, isAdd: false });
    }

    updateSkills = () => {
        this.props.addSkills(this.state.selectedSkills);
        this.setState({ isSkillsModalOpen: false, disabledSaveBtn: true })
    }

    render() {

        let modalTitle;
        let modalContent;

        let skillsOptions = this.props.SkillsList && this.props.SkillsList.map((skillsList, i) => {
            skillsList.label = skillsList.name;
            skillsList.value = skillsList.id;
            return skillsList;
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

        if (this.state.isSkillsModalOpen) {
            if (this.state.isAdd) {
                modalTitle = 'Add Skills and Experience';
            } else {
                modalTitle = 'Edit Skills and Experience';
            }
            modalContent = SkillsModalContent;
        }

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Skills and Experience</h4>
                    {this.props.selectedSkillsList.skills && this.props.selectedSkillsList.skills.length > 0 ?
                        <i className="SPIconMedium SPIconEdit" onClick={this.editLanguages} />
                        :
                        < i className="SPIconLarge SPIconAdd" onClick={this.toggleSkills} />
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
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" /> to add Skills and Experience</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.isSkillsModalOpen}
                    toggle={this.toggleSkills}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal LanguageModal"
                    modalTitle={modalTitle}
                    centered="centered"
                    onClick={this.state.modalSaveAction}
                    disabled={this.state.disabledSaveBtn}
                />
            </div >
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
