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
            languagesModal: false,
            modalSaveAction: '',
            selectedLanguage: [],
            selectedLanguageIds: '',
            disabledSaveBtn: true,
            add: false,
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
            languagesModal: !this.state.languagesModal,
            modalSaveAction: this.addLanguages,
            add: true
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
        this.setState({ languagesModal: !this.state.languagesModal, modalSaveAction: this.addLanguages, disabledSaveBtn: true })
    }

    editLanguages = () => {
        this.setState({ modalSaveAction: this.updateLanguages, languagesModal: true, add: false });
    }

    updateLanguages = () => {
        this.props.addLanguages(this.state.selectedLanguage);
        this.setState({ languagesModal: false, disabledSaveBtn: true })
    }

    render() {

        let modalTitle;
        let modalContent;
        let extension = "svg";

        const languagesOptions = this.props.LanguagesList && this.props.LanguagesList.map((languageList, i) => {
            languageList.label = languageList.name;
            languageList.value = languageList.id;
            languageList.src = languageList.name;
            languageList.extension = extension;
            return languageList;
        });

        const LanguagesModalContent =
            <LanguagesMultiSelect
                onselect={this.onChangeLanguage}
                listItems={languagesOptions}
                value={this.state.selectedLanguage}
                multi={true}
                closeOnSelect={true}
                placeholder='Select Individual'
            />;

        const selectedItems = this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.map(item => {
            return (
                <li className={'SPSkillsItems CountryIcon ' + item.name} key={item.id}>
                    {item.name}
                </li>
            )
        })

        if (this.state.languagesModal) {
            if (this.state.add) {
                modalTitle = 'Add Languages Spoken';
            } else {
                modalTitle = 'Edit Languages Spoken';
            }
            modalContent = LanguagesModalContent;
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
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale"/> to add Languages Spoken</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.languagesModal}
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
