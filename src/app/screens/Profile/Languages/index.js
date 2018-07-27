import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup } from "../../../components";
import { LanguagesMultiSelect } from "../../../components"
import { getLanguages, getSelectedLanguages, addLanguages } from '../../../redux/profile/Languages/actions';
// import flags from "../../../assets/images/Flags/flags/";

class Languages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            LanguagesModal: false,
            modalSaveAction: '',
            selectedLanguage: [],
            selectedLanguageIds: ''
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
            LanguagesModal: !this.state.LanguagesModal,
            modalSaveAction: this.addLanguages
        })
    }

    onChangeLanguage = (value) => {
        this.setState({ selectedLanguage: value });
    }

    addLanguages = () => {
        this.props.addLanguages(this.state.selectedLanguage);
        this.setState({ LanguagesModal: !this.state.LanguagesModal, modalSaveAction: this.addLanguages })
    }

    editLanguages = () => {
        this.setState({ modalSaveAction: this.updateLanguages, LanguagesModal: true });
    }

    updateLanguages = () => {
        this.props.addLanguages(this.state.selectedLanguage);
        this.setState({ LanguagesModal: false })
    }

    render() {

        let modalTitle;
        // let src = "/static/media/";
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
                className="" />;

        const selectedItems = this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.map(item => {
            return (
                <li className={'SPSkillsItems CountryIcon ' + item.name} key={item.id}>
                    {/* <img src={require('../../../assets/images/Flags/flags/' + item.name + '.' + 'svg')} /> */}
                    {item.name}
                </li >
            )
        })

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Languages Spoken</h4>
                    {this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.length > 0 ?
                        <i className="SPIconMedium SPIconEdit" onClick={(e) => this.editLanguages(e)} />
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
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.toggleLanguages.bind(this, 'add')} /> to add Services Offered</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.LanguagesModal}
                    toggle={this.toggleLanguages}
                    ModalBody={LanguagesModalContent}
                    className="modal-lg asyncModal LanguageModal"
                    modalTitle='Edit Languages Spoken'
                    centered="centered"
                    onClick={this.state.modalSaveAction}
                />
            </div >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLanguages: () => dispatch(getLanguages()),
        getSelectedLanguages: () => dispatch(getSelectedLanguages()),
        addLanguages: (data) => dispatch(addLanguages(data)),
        // editCertification: (data) => dispatch(editCertification(data)),
        // updateCertification: (data) => dispatch(updateCertification(data)),
        // deleteCertification: (data) => dispatch(deleteCertification(data))
    }
};

function mapStateToProps(state) {
    return {
        LanguagesList: state.profileState.LanguagesState.LanguagesList,
        selectedLanguagesList: state.profileState.LanguagesState.selectedLanguagesList,
        // certificationFieldDetails: state.profileState.CertificationState.certificationFieldDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Languages));
