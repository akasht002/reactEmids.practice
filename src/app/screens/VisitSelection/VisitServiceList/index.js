import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import _ from 'lodash'
import { getVisitServiceList, getServiceRequestCount, formDirtyVisitList, clearVisitServiceList, keywordSearchServiceRequest, setPageNumber }
    from '../../../redux/visitSelection/VisitServiceList/actions';
import { getServiceRequestId, setActiveTab, resetServiceDetails } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { Scrollbars } from '../../../components';
import Search from './Search'
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import {
    VISIT_SERVICE_STATUS_OPEN,
    VISIT_SERVICE_STATUS_APPLIED,
    VISIT_SERVICE_STATUS_INVITED,
    VISIT_SERVICE_STATUS_HIRED,
    VISIT_SERVICE_STATUS_NOT_HIRED,
    DEFAULT_FROM_DATE,
    DEFAULT_TO_DATE,
    DEFAULT_PAGE_NUMBER,
    SERVICE_REQ_STATUS,
    NEW_SERVICE_REQUEST_STATUS
} from '../../../constants/constants'
import { uniqElementOfArray } from '../../../utils/arrayUtility'
import { getFieldsNoSeperater } from '../../../utils/validations.js'
import {
    getServiceCategory, getServiceType, ServiceRequestStatus, getServiceRequestListByFilter, getServiceArea,
    clearServiceCategory, clearServiceType, clearServiceArea, clearServiceRequestStatus, checkAllServiceRequestStatus,
    getServiceRequestListByFilterCount, formDirty, setDefaultFilteredStatus, getSearchDataCount,getSearchDataCountSuccess
} from "../../../redux/visitSelection/ServiceRequestFilters/actions";
import { formattedDateMoment, formattedDateChange, getServiceTypeImage, getStatusTextBasedOnStatus } from "../../../utils/validations";
import Filter from "./ServiceRequestFilters";
import { getSort } from "../../../redux/visitSelection/ServiceRequestSorting/actions";
// import Sorting from "../ServiceRequestSorting";
import { setPatient } from '../../../redux/patientProfile/actions';
import { push } from '../../../redux/navigation/actions';
import Pagination from 'react-js-pagination';
import './style.css'
import { Path } from "../../../routes";
import {
    SHOW_IMAGES_SERVICE_REQUEST, PAGE_NO,
    SERVICE_REQUEST_PAGE_SIZE,DEFAULT_SEARCH_COUNT, DATE_FORMATS
} from '../../../constants/constants';
import { getUserInfo } from '../../../services/http';
import { Preloader } from '../../../components';
export class VisitServiceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceRequestId: '',
            isOpen: false,
            filterOpen: false,
            startDate: DEFAULT_FROM_DATE,
            endDate: DEFAULT_TO_DATE,
            serviceStatus: [],
            isValid: true,
            selectedOption: null,
            ServiceCategoryId: '',
            serviceTypes: [],
            isSortOpen: false,
            PostedDate: false,
            VisitDate: false,
            Newest: false,
            Oldest: false,
            serviceArea: '',
            coverageArea: '',
            lat: '',
            lon: '',
            ServiceAreas: {},
            isChecked: false,
            activePage: PAGE_NO,
            pageNumber: PAGE_NO,
            pageSize: SERVICE_REQUEST_PAGE_SIZE,
            sort: 'false',
            sortByOrder: 'DESC',
            selectedKey: 'item-1',
            serviceRequestList: [],
            searchOpen: false,
            searchKeyword: ''
        };
        this.sort = false
        this.defaultStatus = ["Open", "Invited", "Applied", "Hired", "Not Hired", "Completed", "Cancelled", "Not Interested"]
        this.isStatusChanged = false
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleSearch = () => {
        this.setState({
            searchOpen: !this.state.searchOpen,
            searchKeyword: '',
        })
    }
    componentDidMount() {        
        let filterData = this.getFilterData(true)
        this.props.getFilter(filterData)
        this.props.getFilterDataCount(filterData)        
        this.props.getServiceCategory();
        this.props.ServiceRequestStatus()
        this.props.getServiceArea();
        this.props.clearServiceType();
        this.props.resetData();
    }

    componentWillReceiveProps(nextProps) {
        let serviceRequestStatus = []
        if (nextProps.ServiceStatus !== this.props.ServiceStatus) {
            nextProps.ServiceStatus.forEach(function (status) {
                if (status.keyValue !== 'ALL') serviceRequestStatus.push(status.keyValue)
            })
            this.setState({
                serviceStatus: serviceRequestStatus,
                serviceRequestList: nextProps.ServiceStatus
            })
        }
        this.setState({
            serviceRequestList: nextProps.ServiceStatus
        })
    }

    componentWillUnmount() {
        this.props.clearVisitServiceList()
        this.props.setDefaultFilteredStatus()
        this.props.formDirty()
        this.props.resetData()
    }

    handleClick = (requestId, patientId) => {
        this.props.getServiceRequestId(requestId);
        this.props.goToServiceRequestDetailsPage();
        this.props.setPatient(patientId)
        this.props.setActiveTab('1')
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
        else if (status === VISIT_SERVICE_STATUS_NOT_HIRED) {
            return 'BlockProfileMatching';
        }
        else {
            return 'BlockProfileMatching';
        }
    }

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

    getStatus = () => {
        let status = [];
        typeof this.props.status !== 'string' ?
        this.props.ServiceStatus.forEach(obj => {
            if (obj.isChecked) {
                status.push(obj.id)
            }
          })
        :
        status = NEW_SERVICE_REQUEST_STATUS[this.props.status]
       
        return status
      }

    applyFilter = () => {
        let data = this.getFilterData();
        this.props.getFilter(data)
        this.props.getFilterDataCount(data)
        this.setState({
            filterOpen: !this.state.filterOpen,
            activePage: 1
        })
        this.props.formDirtyVisitList()
        this.props.getSearchDataCountSuccess()
        this.props.setPageNumber(1)
    }

    handleSortFilterChange = pageNumber => {
        let status = this.getStatus();
        this.setState({ pageNumber: pageNumber });
        let serviceProviderId = getUserInfo().serviceProviderId;
        let data;
        if (this.props.isDashboardFilteredStatus && this.props.status !== 'All') {
            data = {
                startDate: DEFAULT_FROM_DATE,
                endDate: DEFAULT_TO_DATE,
                serviceStatus: status,
                ServiceCategoryId: '',
                serviceTypes: [],
                ServiceAreas: {},
                serviceProviderId: getUserInfo().serviceProviderId,
                FromPage: PAGE_NO,
                ToPage: SERVICE_REQUEST_PAGE_SIZE,
            };
        }
        else {
            data = {
                startDate: this.state.startDate === '' ? DEFAULT_FROM_DATE : this.state.startDate,
                endDate: this.state.endDate === '' ? DEFAULT_TO_DATE : this.state.endDate,
                serviceStatus: status,
                ServiceCategoryId: this.state.ServiceCategoryId,
                serviceTypes: uniqElementOfArray(this.state.serviceTypes),
                ServiceAreas: this.state.ServiceAreas,
                serviceProviderId: serviceProviderId,
                FromPage: pageNumber,
                ToPage: SERVICE_REQUEST_PAGE_SIZE,
            };
        }
        this.props.getFilter(data)
        this.props.getFilterDataCount(data)
        this.setState({ activePage: pageNumber });
        this.props.formDirtyVisitList()
        this.props.setPageNumber(pageNumber)
    };

    applyReset = () => {
        this.setState({
            startDate: '',
            endDate: '',
            serviceStatus: [],
            ServiceCategoryId: '',
            serviceTypes: [],
            isValid: true,
            selectedOption: '',
            activePage: 1,
            ServiceAreas: {},
            filterOpen: false
        })
        this.isStatusChanged = false
        this.props.clearServiceCategory(this.props.ServiceType);
        this.props.clearServiceArea(this.props.ServiceAreaList);
        this.props.clearServiceRequestStatus(this.props.ServiceStatus)
        this.props.clearServiceType([])
        let data = {
            pageNumber: PAGE_NO,
            pageSize: SERVICE_REQUEST_PAGE_SIZE
        }
        if(!this.state.searchOpen) {
            this.props.getVisitServiceList(data);
        }
        this.props.formDirty()
    }

    handleChangeServiceCategory = (selectedOption) => {
        this.setState({
            ServiceCategoryId: selectedOption.value,
            selectedOption: selectedOption,
        });
        this.props.getServiceType(selectedOption)
        this.setState({ serviceTypes: [] })
    }

    handleserviceType = (item, e) => {
        let serviceType = this.state.serviceTypes
        if (e.target.checked) {
            serviceType.push(item.serviceTypeId)
        }
        else {
            serviceType.splice(serviceType.findIndex(function (item, index) {
                return true;
            }), 1);
        }
        this.setState({
            serviceTypes: serviceType
        })
    }

    handleAllServiceStatus = (item, e) => {
        let service = this.state.serviceStatus
        this.setState({
            isChecked: !this.state.isChecked
        })
        if (e.target.checked) {
            this.props.checkAllServiceRequestStatus(e.target.checked, this.props.ServiceStatus)
            this.props.ServiceStatus.forEach(function (status) {
                if (status.keyValue !== 'All')
                    service.push(status.keyValue)
            });
        } else {
            this.props.checkAllServiceRequestStatus(e.target.checked, this.props.ServiceStatus)
            service = [];
        }
        this.setState({
            serviceStatus: service,
            isStatusChanged: true
        })
    }

    handleChangeserviceStatus = (item, e) => {
        let service = this.state.serviceStatus
        if (e.target.checked) {
            service.push(item.id)
        } else {
            let index = service.indexOf(item.id);
            if (index > -1) {
                service.splice(index, 1);
            }
        }
        this.isStatusChanged = true;
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
            'Locations': locations,
            'Zip': item.zipCode
        };
        this.setState({
            ServiceAreas: serviceAreaObj
        })
    }

    handleSortPageChange = pageNumber => {
        this.setState({ pageNumber: pageNumber });
        let data = {
            sortByOrder: this.state.selectedKey,
            sortByColumn: "MODIFIEDDATE",
            pageNumber: pageNumber,
            PageSize: SERVICE_REQUEST_PAGE_SIZE
        }
        this.props.getSort(data);
        this.setState({ activePage: pageNumber });
        this.props.formDirtyVisitList()
        this.props.setPageNumber(pageNumber)
    };

    handlePageChange = pageNumber => {
        this.setState({ pageNumber: pageNumber });
        let data = {
            pageNumber: pageNumber,
            pageSize: this.state.pageSize
        };
        this.props.getVisitServiceList(data);
        this.setState({ activePage: pageNumber });
        this.props.formDirtyVisitList()
        this.props.setPageNumber(pageNumber)
    };

    handleSearchPageChange = pageNumber => {
        this.setState({ 
            pageNumber: pageNumber,
            activePage: pageNumber 
        });
        let data = {
            searchKeyword: this.state.searchKeyword,
            pageNumber: pageNumber,
            pageSize: this.state.pageSize
        }
        this.props.keywordSearchServiceRequest(data)
        this.props.formDirtyVisitList()
        this.props.setPageNumber(pageNumber)
    };

    selectedSort = (selectedKey) => {
        this.sort = true
        this.setState({ selectedKey: selectedKey })
        var data = {
            sortByOrder: selectedKey,
            sortByColumn: "MODIFIEDDATE",
            pageNumber: this.state.pageNumber,
            PageSize: SERVICE_REQUEST_PAGE_SIZE
        }
        this.props.getSort(data);
        this.props.formDirtyVisitList();
    }

    handleSearchkeyword = e => {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    getFilterData = (isdefault=false)=>{
        let commonData = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            serviceProviderId: getUserInfo().serviceProviderId,
            ToPage: SERVICE_REQUEST_PAGE_SIZE,
            searchKeyword:this.state.searchKeyword,
            FromPage:  this.state.activePage
        }
        let statusData ;
        isdefault ? 
            statusData = { 
                    serviceStatus:  this.props.status,
                    ServiceCategoryId: '',
                    serviceTypes: [],
                    ServiceAreas:  {}
                }
            :statusData = { 
                serviceStatus:  this.getStatus(),
                ServiceCategoryId: this.state.ServiceCategoryId,
                serviceTypes: uniqElementOfArray(this.state.serviceTypes),
                ServiceAreas: this.state.ServiceAreas
            }
        return {...commonData,...statusData}
    }

    handleSearchData = (e) => {
        e.preventDefault();
        this.props.formDirtyVisitList()        
        let data = this.getFilterData();
        this.props.getFilter(data)
        this.props.getFilterDataCount(data)
        this.applyReset();
        this.props.setPageNumber(1)
    }

    closeSearch = () => {
        let data = {
            pageNumber: DEFAULT_PAGE_NUMBER,
            pageSize: this.state.pageSize
        }
        this.setState({
            searchOpen: !this.state.searchOpen,
            searchKeyword: '',   
            activePage: DEFAULT_PAGE_NUMBER       
          })
        if (this.props.isDashboardFilteredStatus && this.props.status !== 'All') {
             data = {
                startDate: DEFAULT_FROM_DATE,
                endDate: DEFAULT_TO_DATE,
                serviceStatus: [this.props.status],
                ServiceCategoryId: '',
                serviceTypes: [],
                ServiceAreas: {},
                serviceProviderId: getUserInfo().serviceProviderId,
                FromPage: PAGE_NO,
                ToPage: SERVICE_REQUEST_PAGE_SIZE,
            };
            this.props.getFilter(data)
            this.props.getFilterDataCount(data)
        }
        else {
            this.props.getVisitServiceList(data);
            this.props.getServiceRequestCount()
        }
    }

    render() {
        let visitList = this.props.visitServiceList && this.props.visitServiceList.length > 0 ? (
            this.props.visitServiceList.map(serviceList => {
                let serviceTypeIds = serviceList.serviceTypes && getFieldsNoSeperater(serviceList.serviceTypes,"type");
                let serviceImage = getServiceTypeImage(serviceTypeIds && serviceTypeIds[0]);
                let patientImage = '';
                let patientLastName = '';
                if (_.indexOf(SHOW_IMAGES_SERVICE_REQUEST, serviceList.statusId) !== -1) {
                    patientImage = serviceList && serviceList.patientImage ? serviceList.patientImage : require('../../../assets/images/Blank_Profile_icon.png');
                    patientLastName = serviceList && serviceList.patientLastName;
                } else {
                    patientLastName = serviceList && serviceList.patientLastName;
                    patientImage = require('../../../assets/images/Blank_Profile_icon.png');
                }
                return (
                    <div className='ServiceRequestBoard' key={serviceList.serviceRequestId}>
                        <div className='card'>
                            <div className="BlockImageContainer" onClick={() =>
                                this.handleClick(serviceList.servicerequestId, serviceList.patientId)}>
                                <img src={require(`../../../assets/ServiceTypes/${serviceImage}`)} className="ServiceImage" alt="categoryImage" />
                                <div className='BlockImageDetails'>
                                    <div className='BlockImageDetailsName'>
                                        <span className="default-444">{serviceList.serviceTypes && getFieldsNoSeperater(serviceList.serviceTypes,"type").join(", ")}</span>
                                    </div>
                                    <div className='BlockImageDetailsDate'>
                                        {serviceList.recurringPatternDescription}
                                        <span className='DetailsDateSeperator'>|</span>
                                        Posted on <Moment format={DATE_FORMATS.monDD}>{serviceList.postedDate}</Moment>                                      
                                    </div>
                                </div>
                            </div>
                            <div className={"BlockProfileContainer " + (serviceList.statusId === SERVICE_REQ_STATUS.HIRED ? '' : 'noArrow')} onClick={() => {
                                if (serviceList.statusId === SERVICE_REQ_STATUS.HIRED) {
                                    this.props.setPatient(serviceList.patientId)
                                    this.props.goToPatientProfile()
                                }
                            }}>
                                <img className="ProfileImage" src={patientImage} alt="" />
                                <div className='BlockProfileDetails'>
                                    <div className='BlockProfileDetailsName'>
                                        <span>{serviceList.patientFirstname} {serviceList && serviceList.patientLastname && serviceList.patientLastname.charAt(0)}</span>
                                        {(serviceList.deceasedInd || !serviceList.isActive) && <span>{` (${getStatusTextBasedOnStatus(serviceList)})`}</span>}
                                    </div>
                                </div>
                                <div className='BlockProfileDetailsStatus'>
                                    {
                                        <span className={`${this.renderStatusClassName(serviceList.serviceRequestStatus)}`}>{
                                            serviceList.serviceRequestStatus
                                        }</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
                <span className="no-resultblock">No results found for the current criteria</span>
            )

        return (
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>               
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='theme-primary m-0'>View Requests</h5>
                    </div>
                    <div className='ProfileHeaderOptions'>
                        {/* <ThemeProvider>
                            <SelectField>
                                <Select
                                    selectedKey={this.state.selectedKey}
                                    placement='auto'
                                    onChange={selectedKey => {
                                        this.setState({ sortByOrder: selectedKey }),
                                            this.selectedSort(selectedKey)
                                    }}
                                    options={[
                                        <Item disabled className='ListItem disabled' key='item-1'>
                                            Posted Date
                                        </Item>,
                                        <Item className='ListItem' key='DESC'>Newest</Item>,
                                        <Item className='ListItem' key='ASC'>Oldest</Item>
                                    ]}
                                    className='SelectDropDown sorting'
                                >
                                    {this.state.selectedKey}
                                </Select>
                            </SelectField>
                        </ThemeProvider> */}
                        <Search
                            toggleSearch={this.toggleSearch}
                            searchOpen={this.state.searchOpen}
                            searchKeyword={this.state.searchKeyword}
                            handleSearchkeyword={this.handleSearchkeyword}
                            handleSearchData={this.handleSearchData}
                            closeSearch={this.closeSearch}
                        />
                        <span className='theme-primary ProfileHeaderFilter' onClick={this.toggleFilter}>Filters</span>
                    </div>
                </div>
                {this.props.isLoading && <Preloader />}
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='ServiceRequestsWidget'>
                    <div className='BoardContainer'>
                        {visitList}
                    </div>
                    {this.props.visitServiceList.length > 0 && !this.sort && (!this.props.FilterDataCount || this.props.SearchDataCount) && (
                        <div className="col-md-12 p-0 AsyncConversationPagination theme-primary">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.pageSize}
                                totalItemsCount={this.state.searchOpen ? this.props.SearchDataCount : this.props.serviceRequestCount}
                                onChange={this.state.searchOpen ? this.handleSearchPageChange : this.handlePageChange}
                                itemClass="PaginationItem"
                                itemClassFirst="PaginationIcon First"
                                itemClassPrev="PaginationIcon Prev"
                                itemClassNext="PaginationIcon Next"
                                itemClassLast="PaginationIcon Last"
                            />
                        </div>
                    )}
                    {this.props.visitServiceList.length > 0 && this.sort && !this.props.FilterDataCount && (
                        <div className="col-md-12 p-0 AsyncConversationPagination theme-primary">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.pageSize}
                                totalItemsCount={this.props.visitServiceList[0].dataCount}
                                onChange={this.handleSortPageChange}
                                itemClass="PaginationItem"
                                itemClassFirst="PaginationIcon First"
                                itemClassPrev="PaginationIcon Prev"
                                itemClassNext="PaginationIcon Next"
                                itemClassLast="PaginationIcon Last"
                            />
                        </div>
                    )}
                    {this.props.visitServiceList.length > 0 && this.props.FilterDataCount && (
                        <div className="col-md-12 p-0 AsyncConversationPagination theme-primary">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.pageSize}
                                totalItemsCount={this.props.FilterDataCount}
                                onChange={this.handleSortFilterChange}
                                itemClass="PaginationItem"
                                itemClassFirst="PaginationIcon First"
                                itemClassPrev="PaginationIcon Prev"
                                itemClassNext="PaginationIcon Next"
                                itemClassLast="PaginationIcon Last"
                            />
                        </div>
                    )}
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
                    ServiceStatus={this.state.serviceRequestList}
                    handleChangeserviceStatus={this.handleChangeserviceStatus}
                    ServiceAreaList={this.props.ServiceAreaList}
                    handleServiceArea={this.handleServiceArea}
                    serviceArea={this.state.serviceArea}
                    checked={this.state.isChecked}
                    handleAllServiceStatus={this.handleAllServiceStatus}
                />
            </AsideScreenCover>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceList: (data) => dispatch(getVisitServiceList(data)),
        getServiceRequestId: (data) => dispatch(getServiceRequestId(data)),
        goToServiceRequestDetailsPage: () => dispatch(push(Path.visitServiceDetails)),
        getServiceCategory: () => dispatch(getServiceCategory()),
        ServiceRequestStatus: () => dispatch(ServiceRequestStatus()),
        getServiceType: (data) => dispatch(getServiceType(data)),
        getFilter: (data) => dispatch(getServiceRequestListByFilter(data)),
        getSort: (data) => dispatch(getSort(data)),
        getServiceArea: (data) => dispatch(getServiceArea(data)),
        clearServiceCategory: (data) => dispatch(clearServiceCategory(data)),
        clearServiceArea: (data) => dispatch(clearServiceArea(data)),
        clearServiceRequestStatus: (data) => dispatch(clearServiceRequestStatus(data)),
        clearServiceType: (data) => dispatch(clearServiceType(data)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        getServiceRequestCount: () => dispatch(getServiceRequestCount()),
        getFilterDataCount: (data) => dispatch(getServiceRequestListByFilterCount(data)),
        formDirty: () => dispatch(formDirty()),
        formDirtyVisitList: () => dispatch(formDirtyVisitList()),
        checkAllServiceRequestStatus: (checked, data) => dispatch(checkAllServiceRequestStatus(checked, data)),
        clearVisitServiceList: () => dispatch(clearVisitServiceList()),
        setDefaultFilteredStatus: () => dispatch(setDefaultFilteredStatus()),
        keywordSearchServiceRequest: data => dispatch(keywordSearchServiceRequest(data)),
        getSearchDataCount: data => dispatch(getSearchDataCount(data)),
        getSearchDataCountSuccess: () => dispatch(getSearchDataCountSuccess(DEFAULT_SEARCH_COUNT)),
        setActiveTab: data => dispatch(setActiveTab(data)),
        resetData: () => dispatch(resetServiceDetails()),
        setPageNumber: data => dispatch(setPageNumber(data))
    }
};

export function mapStateToProps(state) {

    return {
        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
        isLoading: state.visitSelectionState.VisitServiceListState.isLoading,
        profileImgData: state.profileState.PersonalDetailState.imageData,
        ServiceCategory: state.visitSelectionState.ServiceRequestFilterState.ServiceCategory,
        ServiceStatus: state.visitSelectionState.ServiceRequestFilterState.ServiceStatus,
        ServiceType: state.visitSelectionState.ServiceRequestFilterState.ServiceType,
        ServiceAreaList: state.visitSelectionState.ServiceRequestFilterState.ServiceAreaList,
        serviceRequestCount: state.visitSelectionState.VisitServiceListState.serviceRequestCount,
        FilterDataCount: state.visitSelectionState.ServiceRequestFilterState.FilterDataCount,
        status: state.visitSelectionState.ServiceRequestFilterState.status,
        isDashboardFilteredStatus: state.visitSelectionState.ServiceRequestFilterState.isDashboardFilteredStatus,
        SearchDataCount: state.visitSelectionState.ServiceRequestFilterState.SearchDataCount,
        pageNumber: state.visitSelectionState.VisitServiceListState.pageNumber
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));