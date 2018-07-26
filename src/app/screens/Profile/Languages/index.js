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
            LanguagesModal: false,
            selectedLaguage: []
        };
    };

    componentDidMount() {
        this.props.getLanguages();
        this.props.getSelectedLanguages();
    }

    componentWillReceiveProps(nextProps) {

    }

    toggleLanguages = () => {
        this.setState({ LanguagesModal: !this.state.LanguagesModal })
    }

    onChangeLanguage = (value) => {
        this.setState({ selectedLaguage: value });
    }

    addLanguages = () => {
        this.props.addLanguages(this.state.selectedLaguage);
    }

    render() {

        let modalContent;
        let modalTitle;

        let src = "/static/media/";
        let extension = "svg";

        const LanguagesOptions = this.props.LanguagesList && this.props.LanguagesList.map((LanguageList, i) => {
            LanguageList.label = LanguageList.name;
            LanguageList.value = LanguageList.id;
            LanguageList.src = src;
            LanguageList.extension = extension;
            return LanguageList;
        });

        const LanguagesModalContent = <LanguagesMultiSelect onselect={this.onChangeLanguage} listItems={LanguagesOptions} multi={true} closeOnSelect={true} placeholder='Select Individual'
            className="" />;

        if (this.state.LanguagesModal) {
            modalContent = LanguagesModalContent;
        }

        const selectedItems = this.props.selectedLanguagesList.languages && this.props.selectedLanguagesList.languages.map(item => {
            return (
                <div key={item.id}>
                    <li className='SPSkillsItems CountryIcon english'>{item.name}</li>
                </div>
            )
        })

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Languages Spoken</h4>
                    <i className="SPIconLarge SPIconAdd"
                        onClick={this.toggleLanguages} />
                </div>
                <div className="SPCertificateContainer width100">
                    <ul className="SPCertificateList">
                        {selectedItems}
                    </ul>
                </div>

                <ProfileModalPopup
                    isOpen={this.state.LanguagesModal}
                    toggle={this.toggleLanguages}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal LanguageModal"
                    modalTitle='Edit Languages Spoken'
                    centered="centered"
                    onClick={this.addLanguages}
                />
            </div>
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
