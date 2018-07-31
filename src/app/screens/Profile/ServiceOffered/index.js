import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Input, ProfileModalPopup, ModalPopup } from "../../../components";
import { checkSpace } from "../../../utils/validations"
import ServicesCheckbox from '../ServiceOffered/ServicesCheckbox'
import { getServiceOffered, editServiceOffered } from '../../../redux/profile/ServiceOffered/actions';

class ServiceOffered extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            disabledSaveBtn: true,
            isAdd: false
        };
    };

    componentDidMount() {
        this.props.getServiceOffered();
    }

    componentWillReceiveProps(nextProps) {

    }

    toggleServiceOffered = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    editServiceOffered = () => {
        this.props.editServiceOffered();
        this.setState({ isModalOpen: true, isAdd: false });
    }

    render() {

        let modalContent;
        let modalTitle;

        let Services = [
            {
                label: "Activities of Daily Living",
                services: ["Bathing", "Meal Preparation", "Medication"]
            },
            {
                label: "Social Service and Socialization",
                services: ["Counselling", "Organizing Meetings"]
            },
            {
                label: "Financial and Legal",
                services: ["Counselling", "Organizing Meetings"]
            },
            {
                label: "Food",
                services: ["Bathing", "Food", "Medication"]
            },
            {
                label: "Transportation",
                services: ["Counselling", "Organizing Meetings"]
            }
        ]

        // let listOfServicesOfferedSelected = this.props.serviceOfferedDetails && this.props.serviceOfferedDetails.map((ServiceList) => {
        //     const services = [];
        //     ServiceList.serviceTypeModel && ServiceList.serviceTypeModel.forEach(element => {
        //         services.push(element.serviceTypeDescription);
        //     });

        //     return (
        //         {
        //             label: ServiceList.serviceCategoryDescription,
        //             services: services
        //         }
        //     )
        // });

        let listOfServicesOffered = this.props.serviceOfferedList && this.props.serviceOfferedList.map((ServiceList) => {
            const services = [];
            ServiceList.serviceTypeModel && ServiceList.serviceTypeModel.forEach(element => {
                services.push(element.serviceTypeDescription);
            });

            return (
                {
                    label: ServiceList.serviceCategoryDescription,
                    services: services
                }
            )
        });

        modalContent = <ServicesCheckbox name={Services} type={'edit'} />

        return (
            <div>
                <div className="col-md-12 card CardWidget SPServices">
                    <div className={"SPCardTitle d-flex"}>
                        <h4 className={"primaryColor"}>Services Offered</h4>
                        <i className={"SPIconLarge SPIconEdit"} onClick={this.editServiceOffered} />
                    </div>
                    <ServicesCheckbox
                        name={listOfServicesOffered}
                        type={'view'}
                    />
                </div>

                <ProfileModalPopup
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleServiceOffered}
                    ModalBody={modalContent}
                    className="modal-lg asyncModal ModalPadding0"
                    modalTitle={modalTitle}
                    disabled={this.state.disabledSaveBtn}
                    centered="centered"
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServiceOffered: () => dispatch(getServiceOffered()),
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
