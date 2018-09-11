import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { getVisitServiceList } from '../../../redux/visitSelection/VisitServiceList/actions';
import { getVisitServiceDetails, getVisitServiceSchedule } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { Scrollbars } from '../../../components';
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import { getFirstCharOfString } from '../../../utils/stringHelper'
import {
    VISIT_SERVICE_STATUS_OPEN,
    VISIT_SERVICE_STATUS_APPLIED,
    VISIT_SERVICE_STATUS_INVITED,
    VISIT_SERVICE_STATUS_HIRED,
    VISIT_SERVICE_STATUS_NOT_HIRED
} from '../../../constants/constants'
import {getServiceCategory,getServiceType,ServiceRequestStatus,getFilter} from "../../../redux/visitSelection/ServiceRequestFilters/actions";
import {formattedDateMoment,formattedDateChange } from "../../../utils/validations";
import Filter from "./ServiceRequestFilters";
import {getSort} from "../../../redux/visitSelection/ServiceRequestSorting/actions";
import Sorting from "../ServiceRequestSorting"

import './style.css'

class VisitServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            serviceRequestId: '', 
            isOpen: false,
            filterOpen: false,
            startDate:'',
            endDate:'',
            serviceStatus:[],
            isValid:true,
            selectedOption: null,
            ServiceCategoryId:'',
            serviceTypes:[],
            isSortOpen: false,
            newest: true,
            posted: true 
        };
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.props.getVisitServiceList();
        this.props.getServiceCategory();
        this.props.ServiceRequestStatus()
    }

    handleClick = (requestId) => {
        this.props.getVisitServiceDetails(requestId);
        this.props.getVisitServiceSchedule(requestId);
    }

    renderStatusClassName = (status) => {
        if (status === VISIT_SERVICE_STATUS_OPEN) {
            return 'btn btn-open';
        }
        else if (status === VISIT_SERVICE_STATUS_APPLIED) {
            return 'btn btn-applied';
        }
        else if (status === VISIT_SERVICE_STATUS_HIRED) {
            return 'btn btn-hired';
        }
        else if (status === VISIT_SERVICE_STATUS_INVITED) {
            return 'btn btn-outline-primary btn-invited';
        }
        else if (status === VISIT_SERVICE_STATUS_NOT_HIRED) {
            return 'BlockProfileMatching';
        }
        else {
            return null;
        }
    }
        /* filter code */ 
    toggleFilter=()=>{
        this.setState({
            filterOpen: !this.state.filterOpen
        })
    }
        
    dateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({  
            startDate: formattedDate
           
        });

    }
    
    dateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({  
            startDate: formattedDate
        });
 
    }
    todateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({  
            endDate: formattedDate
        });

    }

    todateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({  
            endDate: formattedDate
        });
    }

    applyFilter =() =>{
        if ((this.state.serviceTypes) && (this.state.ServiceCategoryId)) {
            let data = {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                serviceStatus: this.state.serviceStatus,
                ServiceCategoryId:this.state.ServiceCategoryId,
                serviceTypes:this.state.serviceTypes
            };
            this.props.getFilter(data)
            this.setState({
                filterOpen: !this.state.filterOpen
            })
        } else {
            this.setState({ isValid: false });
        }
    }

    applyReset =() =>{
        this.setState({
            startDate:'',
            endDate:'',
            serviceStatus:[],
            ServiceCategoryId:'',
            serviceTypes:[],
            isValid: true
        })
    
    }
   
    handleChangeServiceCategory=(selectedOption)=>{
        this.setState({ 
            ServiceCategoryId:selectedOption.label,
            selectedOption:selectedOption  
        });
        this.props.getServiceType(selectedOption.value)
    }

    handleserviceType =(item) =>{
        let serviceType = this.state.serviceTypes
        serviceType.push(item.serviceTypeDescription)
        this.setState({
            serviceTypes:serviceType
        })
    }

    handleChangeserviceStatus =(item) =>{
        let service = this.state.serviceStatus
        service.push(item.keyValue)
        this.setState({
            serviceStatus:service
        })
    }
    /* filter code */ 
    toggleFilter=()=>{
        this.setState({
            filterOpen: !this.state.filterOpen
        })
    }
        
    dateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({  
            startDate: formattedDate
            
        });

    }
    
    dateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({  
            startDate: formattedDate
        });
    
    }
    todateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({  
            endDate: formattedDate
        });

    }

    todateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({  
            endDate: formattedDate
        });
    }

    applyFilter =() =>{
        if ((this.state.serviceTypes) && (this.state.ServiceCategoryId)) {
            let data = {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                serviceStatus: this.state.serviceStatus,
                ServiceCategoryId:this.state.ServiceCategoryId,
                serviceTypes:this.state.serviceTypes
            };
            this.props.getFilter(data)
            this.setState({
                filterOpen: !this.state.filterOpen
            })
        } else {
            this.setState({ isValid: false });
        }
    }

    applyReset =() =>{
        this.setState({
            startDate:'',
            endDate:'',
            serviceStatus:[],
            ServiceCategoryId:'',
            serviceTypes:[],
            isValid: true
        })
    }
    /* sorting */
    onSortChange = (posted, newest) =>{
        var data={
            sortByOrder : newest ? "ASC" : "DESC",
            sortByColumn: posted ? "MODIFIEDDATE" : "VISITDATE",
            fromDate: null,
            toDate: null,
            status: 0
        }
        this.props.getSort(data);
        this.setState({
            newest: (newest !== null ? newest : this.state.newest),
            posted: (posted !== null ? posted : this.state.posted),
            isSortOpen: false
        });
    }
    
    
    
    handleChangeServiceCategory=(selectedOption)=>{
        this.setState({ 
            ServiceCategoryId:selectedOption.label,
            selectedOption:selectedOption  
        });
        this.props.getServiceType(selectedOption.value)
    }

    handleserviceType =(item) =>{
        let serviceType = this.state.serviceTypes
        serviceType.push(item.serviceTypeDescription)
        this.setState({
            serviceTypes:serviceType
        })
    }

    handleChangeserviceStatus =(item) =>{
        let service = this.state.serviceStatus
        service.push(item.keyValue)
        this.setState({
            serviceStatus:service
        })
    }
    render() {

        let visitList = this.props.visitServiceList && this.props.visitServiceList.map(serviceList => {
            return (
                <div class='ServiceRequestBoard' key={serviceList.serviceRequestId}>
                    <div className='card' onClick={() => this.handleClick(serviceList.serviceRequestId)}>
                        <div className="BlockImageContainer">
                            <img src={require("../../../assets/images/Bathing_Purple.svg")} className="ProfileImage" alt="categoryImage" />
                            <div className='BlockImageDetails'>
                                <div className='BlockImageDetailsName'>
                                    {serviceList.serviceRequestTypeDetails && serviceList.serviceRequestTypeDetails.map((serviceType) => {
                                        return (
                                            <span key={serviceType.serviceTypeId}>{serviceType.serviceTypeDescription}, </span>
                                        )
                                    })
                                    }
                                </div>
                                <div className='BlockImageDetailsActivity'>
                                    {serviceList.serviceCategoryDescription}
                                </div>
                                <div className='BlockImageDetailsDate'>
                                    {serviceList.recurringPatternDescription} <span className='DetailsDateSeperator'>|</span> <Moment format="MMM DD">{serviceList.startDate}</Moment> - <Moment format="MMM DD">{serviceList.endDate}</Moment>
                                </div>
                            </div>
                        </div>
                        <div className="BlockProfileContainer">
                            <img className="ProfileImage" src={serviceList.image} alt="patientImage" />
                            <div className='BlockProfileDetails'>
                                <div className='BlockProfileDetailsName'>
                                    {serviceList.patientFirstName} {serviceList.patientLastName && getFirstCharOfString(serviceList.patientLastName)}
                                </div>
                                <div className='BlockProfileDetailsActivity'>
                                    Posted on <Moment format="DD MMM">{serviceList.requestDate}</Moment>
                                </div>
                            </div>
                            <div class='BlockProfileDetailsStatus'>
                                {
                                    <a className={`${this.renderStatusClassName(serviceList.statusName)}`} to='/'>{
                                        serviceList.statusName === VISIT_SERVICE_STATUS_NOT_HIRED ?
                                            serviceList.matchPercentage : serviceList.statusName
                                    }</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}
                patientImage={this.props.profileImgData.image ? this.props.profileImgData.image
                    : require('./avatar/user-5.jpg')}>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Service Requests</h5>
                    </div>
                    <div className='ProfileHeaderOptions'>
                    <Sorting
                        onSortChange={this.onSortChange}
                        newest={this.state.newest}
                        posted={this.state.posted}
                    />
                    <span className='primaryColor' onClick={this.toggleFilter}>Filters</span>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='ServiceRequestsWidget'>
                    <div className='BoardContainer'>
                        {visitList}
                    </div>
                </Scrollbars>
                <Filter 
                    isOpen={this.state.filterOpen} 
                    toggle={this.toggleFilter} 
                    applyFilter={this.applyFilter}
                    applyReset={this.applyReset}
                    startDate={this.state.startDate}
                    dateChanged={this.dateChanged}
                    dateChangedRaw={this.dateChangedRaw}
                    todateChanged={this.todateChanged}
                    todateChangedRaw={this.todateChangedRaw}
                    endDate={this.state.endDate}
                    serviceStatus={this.state.serviceStatus}
                    isValid={this.state.isValid}
                    serviceStatus={this.state.serviceStatus}
                    ServiceCategory={this.props.ServiceCategory}
                    handleChangeServiceCategory={this.handleChangeServiceCategory}
                    ServiceCategoryId={this.state.ServiceCategoryId}
                    selectedOption={this.state.selectedOption}
                    ServiceType={this.props.ServiceType}
                    handleserviceType={this.handleserviceType}
                    ServiceStatus={this.props.ServiceStatus}
                    handleChangeserviceStatus={this.handleChangeserviceStatus}
                    serviceStatus={this.state.serviceStatus}
                />
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceList: () => dispatch(getVisitServiceList()),
        getVisitServiceDetails: (data) => dispatch(getVisitServiceDetails(data)),
        getVisitServiceSchedule: (data) => dispatch(getVisitServiceSchedule(data)),
        getServiceCategory: () => dispatch(getServiceCategory()),
        ServiceRequestStatus: () => dispatch(ServiceRequestStatus()),
        getServiceType: (data) => dispatch(getServiceType(data)),
        getFilter:(data)  => dispatch(getFilter(data)),
        getSort:(data)  => dispatch(getSort(data))
    }
};

function mapStateToProps(state) {
    return {
        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
        profileImgData: state.profileState.PersonalDetailState.imageData,
        ServiceCategory:state.visitSelectionState.ServiceRequestFilterState.ServiceCategory,
        ServiceStatus:state.visitSelectionState.ServiceRequestFilterState.ServiceStatus,
        ServiceType:state.visitSelectionState.ServiceRequestFilterState.ServiceType
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));
