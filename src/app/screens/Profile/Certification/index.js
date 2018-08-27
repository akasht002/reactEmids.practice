import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, ProfileModalPopup, ModalPopup } from "../../../components";
import { checkSpace } from "../../../utils/validations";
import {compare} from "../../../utils/comparerUtility";
import { getCertification, addCertification, editCertification, updateCertification, deleteCertification } from '../../../redux/profile/Certification/actions';

class Certification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            certificationModal: false,
            certificationName: '',
            certificationAuthority: '',
            certificateLicenceNumber: '',
            certificationId: '',
            showModalOnDelete: false,
            isAdd: false,
            isValid: true,
            disabledSaveBtn: true,
            isDiscardModalOpen: false
        };
    };

    componentDidMount() {
        this.props.getCertification();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            certificationName: nextProps.certificationFieldDetails.certificationName,
            certificationAuthority: nextProps.certificationFieldDetails.authority,
            certificateLicenceNumber: nextProps.certificationFieldDetails.licenceNumber,
            certificationId: nextProps.certificationFieldDetails.certificationId
        })
    }

    reset = () => {
        this.setState({
            certificationModal: false,
            certificationName: '',
            certificationAuthority: '',
            certificateLicenceNumber: '',
            certificationId: '',
            disabledSaveBtn: true,
            isDiscardModalOpen: false,
            isAdd: true,
            isValid: true,
        })
    }

    toggleCertification = () => {

        this.setState({
            certificationModal: !this.state.certificationModal,
            isDiscardModalOpen: false,
            isValid: true,
            disabledSaveBtn: true
        })

        let propObj = {
            authority: this.props.certificationFieldDetails.authority,
            certificationName: this.props.certificationFieldDetails.certificationName,
            licenceNumber: this.props.certificationFieldDetails.licenceNumber
        }
        

        let stateObj = {
            authority: this.state.certificationAuthority,
            certificationName: this.state.certificationName,
            licenceNumber: this.state.certificateLicenceNumber
        }
        

        const fieldDifference = compare(propObj, stateObj);

        if (fieldDifference === true) {
            this.setState({ certificationModal: false, isDiscardModalOpen: false,
                certificationAuthority:'',
                certificateLicenceNumber: '',
                certificationName: ''
             })
        } else {
            this.setState({ isDiscardModalOpen: true, certificationModal: true })
        }

    }

    addCertification = () => {
        if (checkSpace(this.state.certificationName) && checkSpace(this.state.certificationAuthority)) {
            const data = {
                certificationName: this.state.certificationName.trim(),
                authority: this.state.certificationAuthority.trim(),
                licenceNumber: this.state.certificateLicenceNumber.trim()
            };
            this.props.addCertification(data);
            this.reset();
        } else {
            this.setState({ isValid: false });
        }
    }

    showModalOnDelete = (e) => {
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete, certificationId: e.target.id });
    }

    editCertification = (e) => {
        this.setState({ certificationModal: true, isAdd: false, certificationId: e.target.id });
        this.props.editCertification(e.target.id);
    }

    updateCertification = () => {
        if (this.state.certificationName && this.state.certificationAuthority) {
            const data = {
                certificationName: this.state.certificationName.trim(),
                authority: this.state.certificationAuthority.trim(),
                licenceNumber: this.state.certificateLicenceNumber.trim(),
                certificationId: this.state.certificationId
            };
            this.props.updateCertification(data);
            this.setState({ certificationModal: !this.state.certificationModal, disabledSaveBtn: true });
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

        const CertificationModalContent = <form className="form my-2 my-lg-0">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <Input
                        name="Certification"
                        label="Certification"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. Home Care Aide Organization"
                        className={"form-control " + (!this.state.isValid && !this.state.certificationName && 'inputFailure')}
                        value={this.state.certificationName}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            certificationName: e.target.value,
                            disabledSaveBtn: false,
                        })}
                    />
                    {!this.state.isValid && (!this.state.certificationName) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please enter {this.state.certificationName === '' && ' Certification'}</span>}
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="certificationAuthority"
                        label="Certification Authority"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. California Associaion"
                        className={"form-control " + (!this.state.isValid && !this.state.certificationAuthority && 'inputFailure')}
                        value={this.state.certificationAuthority}
                        maxlength={'500'}
                        textChange={(e) => this.setState({
                            certificationAuthority: e.target.value,
                            disabledSaveBtn: false,
                        })}
                    />
                    {!this.state.isValid && (!this.state.certificationAuthority) && <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">Please enter {this.state.certificationAuthority === '' && ' Certification Authority'}</span>}
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="CertificateLicenceNum"
                        label="Certificate / License Number"
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. HCA7521698432"
                        className={"form-control"}
                        value={this.state.certificateLicenceNumber}
                        maxlength={'50'}
                        textChange={(e) => this.setState({
                            certificateLicenceNumber: e.target.value,
                        })}
                    />
                </div>
            </div>
        </form>;

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
            if (this.state.isAdd) {
                modalTitle = 'Add Certification';
            } else {
                modalTitle = 'Edit Certification';
            }
            modalContent = CertificationModalContent;
        }

        return (
            <div>
                <div className="SPCardTitle d-flex">
                    <h4 className="primaryColor">Certification</h4>
                    <i className="SPIconLarge SPIconAdd"
                        onClick={() => this.setState({ certificationModal: true, isAdd: true })} />
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
                                    <span className='SPNoInfoDesc'>Click <i className="SPIconMedium SPIconAddGrayScale" onClick={() => this.setState({ certificationModal: true,isAdd: true  })}/> to add Certification</span>
                                </div>
                            </div>
                        }
                    </ul>
                </div>

                <ProfileModalPopup
                    isOpen={this.state.certificationModal}
                    toggle={this.toggleCertification}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal CertificationModal"
                    modalTitle={modalTitle}
                    disabled={this.state.disabledSaveBtn}
                    centered={true}
                    onClick={this.state.isAdd ?
                        this.addCertification
                        :
                        this.updateCertification
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
        deleteCertification: (data) => dispatch(deleteCertification(data)),
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
