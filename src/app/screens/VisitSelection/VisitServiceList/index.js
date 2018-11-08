import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { getVisitServiceList, getServiceRequestCount } from '../../../redux/visitSelection/VisitServiceList/actions';
import { getServiceRequestId } from '../../../redux/visitSelection/VisitServiceDetails/actions';
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
import { uniqElementOfArray } from '../../../utils/arrayUtility'
import { getServiceCategory, getServiceType, ServiceRequestStatus, getFilter, getServiceArea, clearServiceCategory, clearServiceArea, clearServiceRequestStatus } from "../../../redux/visitSelection/ServiceRequestFilters/actions";
import { formattedDateMoment, formattedDateChange, getServiceTypeImage } from "../../../utils/validations";
import Filter from "./ServiceRequestFilters";
import { getSort } from "../../../redux/visitSelection/ServiceRequestSorting/actions";
import Sorting from "../ServiceRequestSorting"
import { setPatient } from '../../../redux/patientProfile/actions';
import { push } from '../../../redux/navigation/actions';
import Pagination from 'react-js-pagination';

import './style.css'
import { Path } from "../../../routes";
import { HIRED_STATUS_ID,RECURRING_PATTERN } from '../../../constants/constants';

class VisitServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceRequestId: '',
            isOpen: false,
            filterOpen: false,
            startDate: '',
            endDate: '',
            serviceStatus: [],
            isValid: true,
            selectedOption: null,
            ServiceCategoryId: '',
            serviceTypes: [],
            isSortOpen: false,
            PostedDate:false,
            VisitDate:false,
            Newest:false,
            Oldest:false,
            serviceArea: '',
            coverageArea: '',
            lat: '',
            lon: '',
            ServiceAreas: {},
            isChecked: false,
            activePage: 1,
            pageNumber: 1,
            pageSize: 9 
        };
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        let data = {
            pageNumber:this.state.pageNumber,
            pageSize:this.state.pageSize
        }
        this.props.getVisitServiceList(data);
        this.props.getServiceCategory();
        this.props.ServiceRequestStatus()
        this.props.getServiceArea();
        this.props.getServiceRequestCount()
    }

    handleClick = (requestId) => {
        this.props.getServiceRequestId(requestId);
        this.props.goToServiceRequestDetailsPage();
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
            return 'btn btn-invited';
        }
        /*else if (status === VISIT_SERVICE_STATUS_NOT_HIRED) {
            return 'BlockProfileMatching';
        }*/
        else {
            return 'BlockProfileMatching';
        }
    }

    /* filter code */
    toggleFilter = () => {
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

    applyFilter = () => {

        let data = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            serviceStatus: uniqElementOfArray(this.state.serviceStatus),
            ServiceCategoryId: this.state.ServiceCategoryId,
            serviceTypes: uniqElementOfArray(this.state.serviceTypes),
            ServiceAreas: this.state.ServiceAreas
        };
        this.props.getFilter(data)
        this.setState({
            filterOpen: !this.state.filterOpen
        })

    }

    applyReset = () => {
        this.setState({
            startDate: '',
            endDate: '',
            serviceStatus: [],
            ServiceCategoryId: '',
            serviceTypes: [],
            isValid: true,
            selectedOption: ''
        })
        this.props.clearServiceCategory(this.props.ServiceType);
        this.props.clearServiceArea(this.props.ServiceAreaList);
        this.props.clearServiceRequestStatus(this.props.ServiceStatus)
    }

    handleChangeServiceCategory = (selectedOption) => {
        this.setState({
            ServiceCategoryId: selectedOption.label,
            selectedOption: selectedOption
        });
        this.props.getServiceType(selectedOption)
    }

    handleserviceType = (item) => {
        let serviceType = this.state.serviceTypes
        serviceType.push(item.serviceTypeDescription)
        this.setState({
            serviceTypes: serviceType
        })
    }

    handleChangeserviceStatus = (item, e) => {
        let service = this.state.serviceStatus
        if (e.target.checked) {
            service.push(item.keyValue)
        } else {
            let index = service.indexOf(item.keyValue);
            if (index > -1) {
                service.splice(index, 1);
            }
        }

        this.setState({
            serviceStatus: service,
        });

    }
    handleServiceArea = (item) => {

        const locations = {
            'lat': item.lat,
            'lon': item.lon,
        }
        const serviceAreaObj = {
            'CoverageArea': item.coverageArea,
            'Locations': locations
        };
        this.setState({
            ServiceAreas: serviceAreaObj
        })
    }

    /* sorting */
    toggleclass = (e) => {
        var element = document.getElementsByClassName("dropdown-menu")[1];
        element.classList.add("show");
        var element1 = document.getElementsByClassName("dropdown-item")[0];
        element1.classList.add("dropdown-item-checked");
    }

    setStatusSort = (selectedElement) =>{
        console.log(selectedElement)
        if(selectedElement === 'PostedDate') { this.PostedDate = !this.PostedDate; this.VisitDate = !this.PostedDate }
        if(selectedElement === 'VisitDate')  {this.VisitDate = !this.VisitDate; this.PostedDate = !this.VisitDate }
        if(selectedElement === 'Newest')  {this.Newest = !this.Newest;this.Oldest = !this.Newest}
        if(selectedElement === 'Oldest')  {this.Oldest = !this.Oldest;this.Newest = !this.Oldest}
    }

    onSortChange = (e,posted, newest) => {
        let selectedElement = e.target.innerHTML.replace(/ /g,'');
        this.setStatusSort(selectedElement)
        var data = {
            sortByOrder: this.Newest ? "ASC" : "DESC",
            sortByColumn: this.PostedDate ? "MODIFIEDDATE" : "VISITDATE",
            fromDate: null,
            toDate: null,
            status: 0
        }
        this.props.getSort(data);
        let element = document.getElementsByClassName("dropdown-menu")[1];
        element.classList.remove("show");
        element.classList.add("hide");
        this.setState({
            PostedDate: this.PostedDate,
            VisitDate: this.VisitDate,
            Newest: this.Newest,
            Oldest: this.Oldest
        });
    };

    handlePageChange = pageNumber => {
        this.setState({ pageNumber: pageNumber });
        let data = {
          pageNumber: pageNumber,
          pageSize: this.state.pageSize
        };
        this.props.getVisitServiceList(data);
        this.setState({ activePage: pageNumber });
      };

    render() {
        let visitList = this.props.visitServiceList && this.props.visitServiceList.map(serviceList => {
            let serviceTypeIds = serviceList.typeId && serviceList.typeId.split(",");
            let serviceImage = getServiceTypeImage(serviceTypeIds && serviceTypeIds[0]);
            let patientImage = '';
            let patientLastName = '';
            if(serviceList.statusId === HIRED_STATUS_ID) {
                patientImage = serviceList && serviceList.patientImage ? serviceList.patientImage : require('../../../assets/images/Blank_Profile_icon.png');
                patientLastName = serviceList && serviceList.patientLastName;
            } else {
                patientLastName = serviceList && serviceList.patientLastName.charAt(0);
                patientImage = require('../../../assets/images/Blank_Profile_icon.png');
            }
            return (
                <div class='ServiceRequestBoard' key={serviceList.serviceRequestId}>
                    <div className='card'>
                        <div className="BlockImageContainer" onClick={() => 
                            this.handleClick(serviceList.serviceRequestId)}>
                            <img src={require(`../../../assets/ServiceTypes/${serviceImage}`)} className="ServiceImage" alt="categoryImage" />
                            <div className='BlockImageDetails'>
                                <div className='BlockImageDetailsName'>
                                    <span className="default-444">{serviceList.type}</span>
                                </div>
                                <div className='BlockImageDetailsActivity'>
                                    {serviceList.serviceCategoryDescription}
                                </div>
                                <div className='BlockImageDetailsDate'>
                                    {serviceList.recurring} 
                                    <span className='DetailsDateSeperator'>|</span> 
                                    <Moment format="MMM DD">{serviceList.startDate}</Moment> 
                                    {serviceList.recurring !== RECURRING_PATTERN && <React.Fragment>  - <Moment format="MMM DD">{serviceList.endDate}</Moment> </React.Fragment>}
                                </div>
                            </div>
                        </div>
                        <div className={"BlockProfileContainer " + (serviceList.serviceRequestStatus === 'Hired' ? '' : 'noArrow')} onClick={() => {
                            if (serviceList.serviceRequestStatus === 'Hired') {
                                this.props.setPatient(serviceList.patientId)
                                this.props.goToPatientProfile()
                            }
                        }}>
                            <img className="ProfileImage" src={patientImage} alt="" />
                            <div className='BlockProfileDetails'>
                                <div className='BlockProfileDetailsName'>
                                    <span>{serviceList.patientFirstName} {patientLastName}</span>
                                </div>
                                <div className='BlockProfileDetailsActivity'>
                                    <span>Posted on <Moment format="DD MMM">{serviceList.createDate}</Moment></span>
                                </div>
                            </div>
                            <div class='BlockProfileDetailsStatus'>
                                {
                                    <span className={`${this.renderStatusClassName(serviceList.serviceRequestStatus)}`}>{
                                        serviceList.serviceRequestStatus === VISIT_SERVICE_STATUS_NOT_HIRED ?
                                            serviceList.matchPercentage : serviceList.serviceRequestStatus
                                    }</span>
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
                            PostedDate={this.state.PostedDate}
                            VisitDate={this.state.VisitDate}
                            Newest={this.state.Newest}
                            Oldest={this.state.Oldest}
                            toggleclass={this.toggleclass}
                        />
                        <span className='primaryColor ProfileHeaderFilter' onClick={this.toggleFilter}>Filters</span>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='ServiceRequestsWidget'>
                    <div className='BoardContainer'>
                        {visitList}
                    </div>
                    {this.props.visitServiceList && <div class="col-md-12 p-0 AsyncConversationPagination"> 
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.pageSize}
                                totalItemsCount={this.props.serviceRequestCount}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                itemClass="PaginationItem"
                                itemClassFirst="PaginationIcon First"
                                itemClassPrev="PaginationIcon Prev"
                                itemClassNext="PaginationIcon Next"
                                itemClassLast="PaginationIcon Last"
                                />
                        </div>
                    }
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
                    isValid={this.state.isValid}
                    ServiceCategory={this.props.ServiceCategory}
                    handleChangeServiceCategory={this.handleChangeServiceCategory}
                    ServiceCategoryId={this.state.ServiceCategoryId}
                    selectedOption={this.state.selectedOption}
                    ServiceType={this.props.ServiceType}
                    handleserviceType={this.handleserviceType}
                    ServiceStatus={this.props.ServiceStatus}
                    handleChangeserviceStatus={this.handleChangeserviceStatus}
                    serviceStatus={this.state.serviceStatus}
                    ServiceAreaList={this.props.ServiceAreaList}
                    handleServiceArea={this.handleServiceArea}
                    serviceArea={this.state.serviceArea}
                    checked={this.state.isChecked}
                />
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceList: (data) => dispatch(getVisitServiceList(data)),
        getServiceRequestId: (data) => dispatch(getServiceRequestId(data)),
        goToServiceRequestDetailsPage: () => dispatch(push(Path.visitServiceDetails)),
        getServiceCategory: () => dispatch(getServiceCategory()),
        ServiceRequestStatus: () => dispatch(ServiceRequestStatus()),
        getServiceType: (data) => dispatch(getServiceType(data)),
        getFilter: (data) => dispatch(getFilter(data)),
        getSort: (data) => dispatch(getSort(data)),
        getServiceArea: (data) => dispatch(getServiceArea(data)),
        clearServiceCategory: (data) => dispatch(clearServiceCategory(data)),
        clearServiceArea: (data) => dispatch(clearServiceArea(data)),
        clearServiceRequestStatus: (data) => dispatch(clearServiceRequestStatus(data)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        getServiceRequestCount: () => dispatch(getServiceRequestCount()),
    }
};

function mapStateToProps(state) {

    return {

        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
        profileImgData: state.profileState.PersonalDetailState.imageData,
        ServiceCategory: state.visitSelectionState.ServiceRequestFilterState.ServiceCategory,
        ServiceStatus: state.visitSelectionState.ServiceRequestFilterState.ServiceStatus,
        ServiceType: state.visitSelectionState.ServiceRequestFilterState.ServiceType,
        ServiceAreaList: state.visitSelectionState.ServiceRequestFilterState.ServiceAreaList,
        serviceRequestCount:state.visitSelectionState.VisitServiceListState.serviceRequestCount
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));