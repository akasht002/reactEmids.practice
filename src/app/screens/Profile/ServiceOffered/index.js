import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfileModalPopup, ModalPopup } from "../../../components";
import ServiceOfferedContent from '../ServiceOffered/serviceOfferedContent'
import { getServiceOffered, addServiceOfferd, editServiceOffered, toggleCollapseCategory, toggleCollapseDetails } from '../../../redux/profile/ServiceOffered/actions';
import {SCREENS, PERMISSIONS} from '../../../constants/constants';
import _ from 'lodash'


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
        const data =  this.state.serviceType
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
            serviceList.serviceTypeModel && _.forEach(serviceList.serviceTypeModel, element => {
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
                    toggleCollapse={(category) => { this.props.toggleCollapseDetails(category) }}
                />
                :
                ''
        }

        {
            this.state.isModalOpen && this.state.isAdd ?
                modalTitle = 'Add Services Offered'
                :
                modalTitle = 'Edit Services Offered'
        }

        return (
            <div>

                <div className={"SPCardTitle d-flex"}>
                    <h4 className={"primaryColor"}>Services Offered</h4>
                    {this.props.serviceOfferedList && this.props.serviceOfferedList.length > 0 ?
                        <i name={SCREENS.PROFILE + '_' + PERMISSIONS.UPDATE} className="SPIconMedium SPIconEdit" onClick={this.editServiceOffered} />
                        :
                        <i name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE} className="SPIconLarge SPIconAdd" onClick={this.addIconServiceOffered} />
                    }
                </div>
                <div className="SPCertificateContainer width100">
                    {this.props.serviceOfferedList.length > 0 ?
                        <div>
                            <ServiceOfferedContent
                                name={this.props.serviceOfferedList}
                                type={'view'}
                                toggleCollapse={(category) => { this.props.toggleCollapseCategory(category) }}
                            />
                        </div>
                        :
                        <div className='SPNoInfo'>
                            <div className='SPNoInfoContent'>
                                <div className='SPInfoContentImage' />
                                <span className='SPNoInfoDesc' name={SCREENS.PROFILE + '_' + PERMISSIONS.CREATE}>Click <i className="SPIconMedium SPIconAddGrayScale" onClick={this.addIconServiceOffered} /> to Services Offered</span>
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
        editServiceOffered: () => dispatch(editServiceOffered()),
        toggleCollapseCategory: (data) => dispatch(toggleCollapseCategory(data)),
        toggleCollapseDetails: (data) => dispatch(toggleCollapseDetails(data))
    }
};

function mapStateToProps(state) {
    return {
        serviceOfferedList: state.profileState.serviceOfferedState.serviceOfferedList,
        serviceOfferedDetails: state.profileState.serviceOfferedState.serviceOfferedDetails
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceOffered));