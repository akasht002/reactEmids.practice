import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup, ModalPopup } from "../../../components";
import ServiceOfferedContent from '../ServiceOffered/serviceOfferedContent'
import { getServiceOffered, addServiceOfferd, editServiceOffered } from '../../../redux/profile/ServiceOffered/actions';

class ServiceOffered extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isDiscardModalOpen: false,
            disabledSaveBtn: true,
            isAdd: false,
            serviceType: [],
        };
    };

    componentDidMount() {
        this.props.getServiceOffered();
    }

    toggleServiceOffered = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            disabledSaveBtn: true,
        })
    }

    addIconServiceOffered = () => {
        this.props.editServiceOffered();
        this.setState({ isModalOpen: true, isAdd: true });
    }

    editServiceOffered = () => {
        this.props.editServiceOffered();
        this.setState({ isModalOpen: true, isAdd: false });
    }

    oncheckedServices = (serviceType, category) => {
        this.setState({
            serviceType: serviceType,
            disabledSaveBtn: false,
        })
    }

    addServiceOfferd = () => {
        const data = [
            {
                serviceType: this.state.serviceType
            }
        ]
        this.props.addServiceOfferd(data);
        this.setState({
            isModalOpen: false,
            disabledSaveBtn: true
        });
    }

    reset = () => {
        this.setState({
            isModalOpen: false,
            isDiscardModalOpen: false,
            disabledSaveBtn: true
        });
    }

    render() {

        let modalContent;
        let modalTitle;

        let listOfServicesOffered = this.props.serviceOfferedList && this.props.serviceOfferedList.map((serviceList) => {
            const services = [];
            serviceList.serviceTypeModel && serviceList.serviceTypeModel.forEach(element => {
                services.push(element.serviceTypeDescription);
            });

            return (
                {
                    label: serviceList.serviceCategoryDescription,
                    services: services,
                    id: serviceList.serviceCategoryId
                }
            )
        });


        {
            listOfServicesOffered ?
                modalContent =
                <ServiceOfferedContent
                    handleClick={this.oncheckedServices}
                    name={this.props.serviceOfferedDetails}
                    type={'edit'}
                />
                :
                ''
        }

        {
            this.state.isModalOpen && this.state.isAdd ?
                modalTitle = 'Add Skills and Experience'
                :
                modalTitle = 'Edit Skills and Experience'
        }

        return (
            <div>

                <div className={"SPCardTitle d-flex"}>
                    <h4 className={"primaryColor"}>Services Offered</h4>
                    {this.props.serviceOfferedList && this.props.serviceOfferedList.length > 0 ?
                        <i className="SPIconMedium SPIconEdit" onClick={this.editServiceOffered} />
                        :
                        < i className="SPIconLarge SPIconAdd" onClick={this.addIconServiceOffered} />
                    }
                </div>
                <div className="SPCertificateContainer width100">
                    {this.props.serviceOfferedList.length > 0 ?
                        <div>
                            <ServiceOfferedContent
                                name={this.props.serviceOfferedList}
                                type={'view'}
                            />
                        </div>
                        :
                        <div className='SPNoInfo'>
                            <div className='SPNoInfoContent'>
                                <div className='SPInfoContentImage' />
                                <span className='SPNoInfoDesc'>click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.addIconServiceOffered} /> to Services Offered</span>
                            </div>
                        </div>
                    }
                </div>

                <ProfileModalPopup
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleServiceOffered}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal ModalPadding0"
                    modalTitle={modalTitle}
                    disabled={this.state.disabledSaveBtn}
                    centered="true"
                    onClick={this.addServiceOfferd}
                />

                <ModalPopup
                    isOpen={this.state.isDiscardModalOpen}
                    toggle={this.reset}
                    ModalBody={<span>Do you want to discard the changes?</span>}
                    btn1="YES"
                    btn2="NO"
                    className="modal-sm"
                    headerFooter="d-none"
                    centered="true"
                    onConfirm={() => this.reset()}
                    onCancel={() => this.setState({
                        isDiscardModalOpen: false,
                        isModalOpen: true
                    })}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServiceOffered: () => dispatch(getServiceOffered()),
        addServiceOfferd: (data) => dispatch(addServiceOfferd(data)),
        editServiceOffered: () => dispatch(editServiceOffered())
    }
};

function mapStateToProps(state) {
    return {
        serviceOfferedList: state.profileState.serviceOfferedState.serviceOfferedList,
        serviceOfferedDetails: state.profileState.serviceOfferedState.serviceOfferedDetails
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceOffered));
