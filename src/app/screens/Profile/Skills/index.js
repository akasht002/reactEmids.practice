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
            skillsModal: false,
            modalSaveAction: '',
            selectedSkills: [],
            selectedSkillIds: '',
            disabledSaveBtn: true,
            add: false,
        };
    };

    componentDidMount() {
        this.props.getSkills();
        this.props.getSelectedSkills();
    }

    componentWillReceiveProps(nextProps) {
        let selectedSkillIds = '';

        if (nextProps.selectedSkillsList && nextProps.selectedSkillsList.languages) {
            for (const language of nextProps.selectedSkillsList.languages) {
                if (selectedSkillIds === '') {
                    selectedSkillIds = language.id;
                } else {
                    selectedSkillIds = selectedSkillIds + ',' + language.id;
                }
            }
        }
        this.setState({ selectedSkills: selectedSkillIds });
    }

    toggleLanguages = () => {
        this.setState({
            skillsModal: !this.state.skillsModal,
            modalSaveAction: this.addSkills,
            add: true
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
        this.setState({ skillsModal: !this.state.skillsModal, modalSaveAction: this.addSkills, disabledSaveBtn: true })
    }

    editLanguages = () => {
        this.setState({ modalSaveAction: this.updateSkills, skillsModal: true, add: false });
    }

    updateSkills = () => {
        this.props.addSkills(this.state.selectedSkills);
        this.setState({ skillsModal: false, disabledSaveBtn: true })
    }

    render() {

        let modalTitle;
        let modalContent;
        let extension = "svg";

        const skillsOptions = this.props.LanguagesList && this.props.LanguagesList.map((skillsList, i) => {
            skillsList.label = skillsList.name;
            skillsList.value = skillsList.id;
            return skillsList;
        });

        const SkillsModalContent =
            <SkillsMultiSelect
                onselect={this.onChangeLanguage}
                listItems={skillsOptions}
                value={this.state.selectedSkills}
                multi={true}
                closeOnSelect={true}
                placeholder='Select Individual'
            />;

        const selectedItems = this.props.selectedSkillsList.languages && this.props.selectedSkillsList.languages.map(item => {
            return (
                <li className={'SPSkillsItems CountryIcon ' + item.name} key={item.id}>
                    {item.name}
                </li>
            )
        })

        if (this.state.skillsModal) {
            if (this.state.add) {
                modalTitle = 'Add Languages Spoken';
            } else {
                modalTitle = 'Edit Languages Spoken';
            }
            modalContent = SkillsModalContent;
        }

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Languages Spoken</h4>
                    {this.props.selectedSkillsList.languages && this.props.selectedSkillsList.languages.length > 0 ?
                        <i className="SPIconMedium SPIconEdit" onClick={this.editLanguages} />
                        :
                        < i className="SPIconLarge SPIconAdd" onClick={this.toggleLanguages} />
                    }
                </div>
                <div className="SPCertificateContainer width100">
                    {this.props.selectedSkillsList.languages && this.props.selectedSkillsList.languages.length > 0 ?
                        <ul className="SPSkillsList">
                            {selectedItems}
                        </ul>
                        :
                        <div className='SPNoInfo'>
                            <div className='SPNoInfoContent'>
                                <div className='SPInfoContentImage' />
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.toggleLanguages} /> to add Languages Spoken</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.skillsModal}
                    toggle={this.toggleLanguages}
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
