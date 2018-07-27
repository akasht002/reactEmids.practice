import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup } from "../../../components";
import { LanguagesMultiSelect } from "../../../components"
import { getLanguages, getSelectedLanguages, addLanguages } from '../../../redux/profile/Languages/actions';

class Languages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectedLanguage: [],
            selectedLanguageIds: '',
            disabledSaveBtn: true,
            isAdd: false,
        };
    };

    componentDidMount() {
        this.props.getLanguages();
        this.props.getSelectedLanguages();
    }

    componentWillReceiveProps(nextProps) {
        let selectedLanguageIds = '';

        if (nextProps.selectedLanguagesList && nextProps.selectedLanguagesList.languages) {
            for (const language of nextProps.selectedLanguagesList.languages) {
                if (selectedLanguageIds === '') {
                    selectedLanguageIds = language.id;
                } else {
                    selectedLanguageIds = selectedLanguageIds + ',' + language.id;
                }
            }
        }
        this.setState({ selectedLanguage: selectedLanguageIds });
    }

    toggleLanguages = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            isAdd: true
        })
    }

    onChangeLanguage = (value) => {
        this.setState({ selectedLanguage: value, disabledSaveBtn: false });
        if (value) {
            this.setState({ disabledSaveBtn: false });
        }
    }

    addLanguages = () => {
        this.props.addLanguages(this.state.selectedLanguage);
        this.setState({ isModalOpen: !this.state.isModalOpen, disabledSaveBtn: true })
    }

    editLanguages = () => {
        this.setState({ isModalOpen: true, isAdd: false });
    }

    updateLanguages = () => {
        this.props.addLanguages(this.state.selectedLanguage);
        this.setState({ isModalOpen: false, disabledSaveBtn: true })
    }

    render() {

        let modalTitle;
        let modalContent;
        let extension = "svg";

        let languagesOptions = this.props.LanguagesList && this.props.LanguagesList.map((languageList, i) => {
            return {
                label: languageList.name,
                value: languageList.id,
                src: languageList.name,
                extension: extension
            }
        });

        let languagesModalContent =
            <LanguagesMultiSelect
                onselect={this.onChangeLanguage}
                listItems={languagesOptions}
                value={this.state.selectedLanguage}
                multi={true}
                closeOnSelect={true}
                placeholder='Select Individual'
            />;

        let selectedItems = this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.map(item => {
            return (
                <li className={'SPSkillsItems CountryIcon ' + item.name} key={item.id}>
                    {item.name}
                </li>
            )
        })

        if (this.state.isModalOpen) {
            if (this.state.isAdd) {
                modalTitle = 'Add Languages Spoken';
            } else {
                modalTitle = 'Edit Languages Spoken';
            }
            modalContent = languagesModalContent;
        }

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Languages Spoken</h4>
                    {this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.length > 0 ?
                        <i className="SPIconMedium SPIconEdit" onClick={this.editLanguages} />
                        :
                        < i className="SPIconLarge SPIconAdd" onClick={this.toggleLanguages} />
                    }
                </div>
                <div className="SPCertificateContainer width100">
                    {this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.length > 0 ?
                        <ul className="SPSkillsList">
                            {selectedItems}
                        </ul>
                        :
                        <div className='SPNoInfo'>
                            <div className='SPNoInfoContent'>
                                <div className='SPInfoContentImage' />
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" /> to add Languages Spoken</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleLanguages}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal LanguageModal"
                    modalTitle={modalTitle}
                    disabled={this.state.disabledSaveBtn}
                    centered="centered"
                    onClick={this.state.isAdd ?
                        this.addLanguages
                        :
                        this.updateLanguages
                    }
                />
            </div >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLanguages: () => dispatch(getLanguages()),
        getSelectedLanguages: () => dispatch(getSelectedLanguages()),
        addLanguages: (data) => dispatch(addLanguages(data))
    }
};

function mapStateToProps(state) {
    return {
        LanguagesList: state.profileState.LanguagesState.LanguagesList,
        selectedLanguagesList: state.profileState.LanguagesState.selectedLanguagesList,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Languages));
