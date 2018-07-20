import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ProfileHeader } from '../../../components'
import { Input, ProfileModalPopup, ModalPopup } from "../../../components";
import { getCertification, addCertification, deleteCertification } from '../../../redux/profile/actions';
import './styles.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CertificationModal: false,
            CertificationName: '',
            CertificationAuthority: '',
            CertificateLicenceNumber: '',
            certificationId: '',
            showModalOnDelete: false,
            add: false,
            edit: false
        };
    };

    toggleCertification(action, e) {
        this.setState({
            CertificationModal: !this.state.CertificationModal,
            [action]: !this.state[action],
        })
    }

    componentDidMount() {
        this.props.getCertification();
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    addCertification = () => {
        if (this.state.CertificationName && this.state.CertificationAuthority && this.state.CertificateLicenceNumber) {
            const data = {
                certificationName: this.state.CertificationName,
                authority: this.state.CertificationAuthority,
                licenceNumber: this.state.CertificateLicenceNumber
            };
            this.props.addCertification(data);
            this.setState({ CertificationModal: !this.state.CertificationModal });
        }
    }

    showModalOnDelete = (e) => {
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete, certificationId: e.target.id });
    }

    deleteCertification = () => {
        this.props.deleteCertification(this.state.certificationId);
        this.setState({ showModalOnDelete: !this.state.showModalOnDelete });
    }


    render() {

        let modalContent;
        let modalTitle;
        let modalType = '';

        const CertificationModalContent = <form className="form my-2 my-lg-0">
            <div className="row">
                <div className="col-md-12 mb-2">
                    <Input
                        name="Certification"
                        label="Certification"
                        autoComplete="off"
                        required="required"
                        type="text"
                        placeholder="e.g. Home Care Aide Organization"
                        className="form-control"
                        value={this.state.CertificationName}
                        textChange={(e) => this.setState({
                            CertificationName: e.target.value,
                        })}
                    />
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="CertificationAuthority"
                        label="Certification Authority"
                        autoComplete="off"
                        required="required"
                        type="text"
                        placeholder="e.g. California Associaion"
                        className="form-control"
                        value={this.state.CertificationAuthority}
                        textChange={(e) => this.setState({
                            CertificationAuthority: e.target.value,
                        })}
                    />
                </div>
                <div className="col-md-12 mb-2">
                    <Input
                        name="CertificateLicenceNum"
                        label="Certificate / License Number"
                        autoComplete="off"
                        required="required"
                        type="text"
                        placeholder="e.g. HCA7521698432"
                        className="form-control"
                        value={this.state.CertificateLicenceNumber}
                        textChange={(e) => this.setState({
                            CertificateLicenceNumber: e.target.value,
                        })}
                    />
                </div>
            </div>
        </form>;

        const certificationList = this.props.certificationList && this.props.certificationList.map((certificateList, i) => {
            return (
                <li className='SPSCertificateItems'>
                    <div className='SPCertificateContent'>
                        <h5 className='SPCertificateHeader'>{certificateList.certificationName}</h5>
                        <span className='SPCertificateDesc'>{certificateList.authority}</span>
                    </div>
                    <i className="SPIconMedium SPIconDelete mr-3" id={certificateList.certificationId}
                        onClick={(e) => this.showModalOnDelete(e)} />
                    <i className="SPIconMedium SPIconEdit"
                        onClick={this.toggleCertification.bind(this, 'edit')} />
                </li>
            )
        });

        if (this.state.CertificationModal) {
            if (this.state.add) {
                modalTitle = 'Add Certification';
                modalType = 'add';
            } else if (this.state.edit) {
                modalTitle = 'Edit Certification';
                modalType = 'edit';
            }
            modalContent = CertificationModalContent;
        }

        return (
            <section className="d-flex">
                <div className="container-fluid p-0">
                    <ProfileHeader />
                    <div className="width100 mainWidgetProfile mainWidgetOverflow">
                        <div className="width100 topWidgetBG" />
                        <div className="container mainProfileContent bgWhite">
                            <div className="row d-flex justify-content-center m-auto">
                                <div className="col-md-12">
                                    <h4 className="my-3 text-white SPTitleText">
                                        <Link to="/"><i className="Icon icon-back" /></Link>
                                        Profile
                                    </h4>
                                </div>
                                <div className="col-md-12 card CardWidget SPCertificate">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProfileModalPopup
                    isOpen={this.state.CertificationModal}
                    toggle={this.toggleCertification.bind(this, modalType)}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal CertificationModal"
                    modalTitle={modalTitle}
                    centered="centered"
                    onClick={this.addCertification}
                />

                <ModalPopup
                    isOpen={this.state.showModalOnDelete}
                    ModalBody={<span>Do you really want to remove the Certification details</span>}
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
            </section>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCertification: () => dispatch(getCertification()),
        addCertification: (data) => dispatch(addCertification(data)),
        deleteCertification: (data) => dispatch(deleteCertification(data))
    }
};

function mapStateToProps(state) {
    return {
        certificationList: state.ProfileState.certificationList,
        addCertificationSuccess: state.ProfileState.addCertificationSuccess
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
