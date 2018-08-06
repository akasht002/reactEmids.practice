import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LanguagesMultiSelect, ProfileModalPopup, ModalPopup } from "../../../components"
import { getLanguages, getSelectedLanguages, addLanguages } from '../../../redux/profile/Languages/actions';
import {compare,difference} from "../../../utils/comparerUtility";

class Languages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectedLanguage: [],
            selectedLanguageIds: '',
            disabledSaveBtn: true,
            isAdd: false,
            newlySelectedLanguages: '',
            newValue: '',
            isDiscardModalOpen: false
        };
        this.oldSelectedValue = '';
        this.previouslySelectedValues = ''
    };

    componentDidMount() {
        this.props.getLanguages();
        this.props.getSelectedLanguages();
    }

    componentWillReceiveProps(nextProps) {
        this.oldSelectedValue = nextProps.selectedLanguagesList.languages;
        let selectedLanguageIds = '';
        let newlySelectedLanguages = ''

        if (nextProps.selectedLanguagesList && nextProps.selectedLanguagesList.languages) {
            for (const language of nextProps.selectedLanguagesList.languages) {
                if (selectedLanguageIds === '') {
                    selectedLanguageIds = language.id;
                } else {
                    selectedLanguageIds = selectedLanguageIds + ',' + language.id;
                    newlySelectedLanguages = language.id;
                }
            }
        }
        this.setState({ selectedLanguage: selectedLanguageIds, newlySelectedLanguages: newlySelectedLanguages });
    }

    toggleLanguages = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })

        const previouslySelectedValues = this.oldSelectedValue && this.oldSelectedValue.map(function (elem) {
            return elem.id;
        }).join(",");

        let previosObj = {
                selectedLanguage: previouslySelectedValues
        }
        

        let selectStateObject = {
                selectedLanguage: this.state.selectedLanguage
        }
    

        const fieldDifference = compare(previosObj, selectStateObject);

        if (fieldDifference === true) {
            
        } else{
            this.setState({ isModalOpen: true, isDiscardModalOpen: true })
        }
    }

    onChangeLanguage = (value) => {
        this.setState({ selectedLanguage: value, disabledSaveBtn: false });
        if (value) {
            this.setState({ disabledSaveBtn: false, newValue: value });
        }
    }

    addLanguages = () => {
        this.props.addLanguages(this.state.selectedLanguage);
        this.setState({ isModalOpen: !this.state.isModalOpen, disabledSaveBtn: true })
    }

    editLanguages = () => {
        this.setState({ isModalOpen: true, isAdd: false });
    }

    reset = () => {

        const previosValue = [];
        const newValue = [];

        const previouslySelectedValues = this.oldSelectedValue && this.oldSelectedValue.map(function (elem) {
            return previosValue.push(elem.id);
        }).join(",");


        const newlySelectedValues = this.state.selectedLanguage;
        newValue.push(newlySelectedValues);

        const result = difference(previosValue, newValue)

        this.setState({ selectedLanguage: result, isModalOpen: false, isDiscardModalOpen: false, disabledSaveBtn: true });
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
                placeholder='Select languages'
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
                        < i className="SPIconLarge SPIconAdd" onClick={() => this.setState({isModalOpen: true,isAdd:true})} />
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
                                <span className='SPNoInfoDesc'>Click <i className="SPIconMedium SPIconAddGrayScale" onClick={() => this.setState({isModalOpen: true,isAdd: true})}/> to add Languages Spoken</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleLanguages}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal LanguagesModal"
                    modalTitle={modalTitle}
                    disabled={this.state.disabledSaveBtn}
                    centered={true}
                    onClick={this.state.isAdd ?
                        this.addLanguages
                        :
                        this.updateLanguages
                    }
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
                    })}
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
