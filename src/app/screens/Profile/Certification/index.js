import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup, ModalPopup } from "../../../components";
import { checkSpace, checkTrim } from "../../../utils/validations"
import { getCertification, addCertification, editCertification, updateCertification, deleteCertification } from '../../../redux/profile/Certification/actions';
import SyncValidationForm  from './certiticationForm'
import RemoteSubmitButton from './certificationButton'

class Certification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            certificationModal: false,
            CertificationName: '',
            CertificationAuthority: '',
            CertificateLicenceNumber: '',
            certificationId: '',
            showModalOnDelete: false,
            modalSaveAction: '',
            add: false,
            edit: false,
            isValid: true
        };
    };

    componentDidMount() {
        this.props.getCertification();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            CertificationName: nextProps.certificationFieldDetails.certificationName,
            CertificationAuthority: nextProps.certificationFieldDetails.authority,
            CertificateLicenceNumber: nextProps.certificationFieldDetails.licenceNumber,
            certificationId: nextProps.certificationFieldDetails.certificationId
        })
    }

    reset() {
        this.setState({
            certificationModal: !this.state.certificationModal,
            CertificationName: '',
            CertificationAuthority: '',
            CertificateLicenceNumber: '',
            certificationId: ''
        })
    }
   

    toggleCertification(action, e) {
        this.setState({
            certificationModal: !this.state.certificationModal,
            modalSaveAction: this.addCertification,
            CertificationName: '',
            CertificationAuthority: '',
            CertificateLicenceNumber: '',
            certificationId: '',
            add: true,
            edit: false,
            isValid: true
        })
    }

    addCertification = (data) => {
        console.log(data)
        // if (checkSpace(this.state.CertificationName) && checkSpace(this.state.CertificationAuthority)) {
        //     const data = {
        //         certificationName: this.state.CertificationName.trim(),
        //         authority: this.state.CertificationAuthority.trim(),
        //         licenceNumber: this.state.CertificateLicenceNumber.trim()
        //     };
        //     this.props.addCertification(data);
        //     this.setState({ modalSaveAction: this.addCertification });
        //     this.reset();
        // } else {
        //     this.setState({ isValid: false });
        // }
        this.props.addCertification(data);
        this.setState({
            certificationModal: !this.state.certificationModal,
        })
        
    }

    showModalOnDelete = (e) => {
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete, certificationId: e.target.id });
    }

    editCertification = (e) => {
        this.setState({ modalSaveAction: this.updateCertification, certificationModal: true, add: false, edit: true, certificationId: e.target.id });
        this.props.editCertification(e.target.id);
    }

    updateCertification = () => {
        if (this.state.CertificationName && this.state.CertificationAuthority) {
            const data = {
                certificationName: this.state.CertificationName.trim(),
                authority: this.state.CertificationAuthority.trim(),
                licenceNumber: this.state.CertificateLicenceNumber.trim(),
                certificationId: this.state.certificationId
            };
            this.props.updateCertification(data);
            this.setState({ certificationModal: !this.state.certificationModal });
            this.reset();
        } else {
            this.setState({ isValid: false });
        }
    }

    deleteCertification = () => {
        this.props.deleteCertification(this.state.certificationId);
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete });
    }

    render() {

        let modalContent;
        let modalTitle;
        let modalType = '';
        let modalFooter = '';
        

        

        const certificationList = this.props.certificationList && this.props.certificationList.map((certificateList, i) => {
            return (
                <li className='SPSCertificateItems' key={certificateList.certificationId}>
                    <div className='SPCertificateContent'>
                        <h5 className='SPCertificateHeader'>{certificateList.certificationName}</h5>
                        <span className='SPCertificateDesc'>{certificateList.authority}</span>
                    </div>
                    <i className="SPIconMedium SPIconDelete mr-3" id={certificateList.certificationId}
                        onClick={(e) => this.showModalOnDelete(e)} />
                    <i className="SPIconMedium SPIconEdit" id={certificateList.certificationId}
                        onClick={(e) => this.editCertification(e)} />
                </li>
            )
        });

        if (this.state.certificationModal) {
            if (this.state.add) {
                modalTitle = 'Add Certification';
                modalType = 'add';
            } else if (this.state.edit) {
                modalTitle = 'Edit Certification';
                modalType = 'edit';
            }
            modalContent = <SyncValidationForm onSubmit={this.addCertification}/>;
            
        }
         // modalFooter = <RemoteSubmitButton/>

        return (
            <div>
                
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Certification</h4>
                    <i className="SPIconLarge SPIconAdd"
                        onClick={this.toggleCertification.bind(this, 'add')} />
                </div>
                <div className="SPCertificateContainer width100">
                    <ul className="SPCertificateList">
                        {this.props.certificationList.length > 0 ?
                            <div>
                                {certificationList}
                            </div>
                            :
                            <div className='SPNoInfo'>
                                <div className='SPNoInfoContent'>
                                    <div className='SPInfoContentImage' />
                                    <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.toggleCertification.bind(this, 'add')} /> to add Services Offered</span>
                                </div>
                            </div>
                        }
                    </ul>
                </div>

                <ProfileModalPopup
                    isOpen={this.state.certificationModal}
                    toggle={this.toggleCertification.bind(this, modalType)}
                    ModalBody={modalContent}
                    ModalFooter={modalFooter}
                    className="modal-lg asyncModal CertificationModal"
                    modalTitle={modalTitle}
                    centered="centered"
                    onClick={this.state.modalSaveAction}
                />

                <ModalPopup
                    isOpen={this.state.showModalOnDelete}
                    ModalBody={<span>Do you really want to remove the Certification details?</span>}
                    btn1="YES"
                    btn2="NO"
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={() => this.deleteCertification()}
                    onCancel={() => this.setState({
                        showModalOnDelete: !this.state.showModalOnDelete,
                    })}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCertification: () => dispatch(getCertification()),
        addCertification: (data) => dispatch(addCertification(data)),
        editCertification: (data) => dispatch(editCertification(data)),
        updateCertification: (data) => dispatch(updateCertification(data)),
        deleteCertification: (data) => dispatch(deleteCertification(data))
    }
};

function mapStateToProps(state) {
    return {
        certificationList: state.profileState.CertificationState.certificationList,
        addCertificationSuccess: state.profileState.CertificationState.addCertificationSuccess,
        certificationFieldDetails: state.profileState.CertificationState.certificationFieldDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Certification));
