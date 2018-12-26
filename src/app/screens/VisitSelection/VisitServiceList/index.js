import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import _ from 'lodash'
import { getVisitServiceList, getServiceRequestCount, formDirtyVisitList, clearVisitServiceList }
    from '../../../redux/visitSelection/VisitServiceList/actions';
import { getServiceRequestId } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { Scrollbars } from '../../../components';
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import {
    VISIT_SERVICE_STATUS_OPEN,
    VISIT_SERVICE_STATUS_APPLIED,
    VISIT_SERVICE_STATUS_INVITED,
    VISIT_SERVICE_STATUS_HIRED,
    VISIT_SERVICE_STATUS_NOT_HIRED,
    DEFAULT_FROM_DATE,
    DEFAULT_TO_DATE
} from '../../../constants/constants'
import { uniqElementOfArray } from '../../../utils/arrayUtility'
import {
    getServiceCategory, getServiceType, ServiceRequestStatus, getFilter, getServiceArea,
    clearServiceCategory, clearServiceType, clearServiceArea, clearServiceRequestStatus, checkAllServiceRequestStatus,
    getFilterDataCount, formDirty
} from "../../../redux/visitSelection/ServiceRequestFilters/actions";
import { formattedDateMoment, formattedDateChange, getServiceTypeImage } from "../../../utils/validations";
import Filter from "./ServiceRequestFilters";
import { getSort } from "../../../redux/visitSelection/ServiceRequestSorting/actions";
// import Sorting from "../ServiceRequestSorting";
import { setPatient } from '../../../redux/patientProfile/actions';
import { push } from '../../../redux/navigation/actions';
import Pagination from 'react-js-pagination';
import moment from 'moment'
import './style.css'
import { Path } from "../../../routes";
import {
    SHOW_IMAGES_SERVICE_REQUEST, RECURRING_PATTERN, PAGE_NO,
    SERVICE_REQUEST_PAGE_SIZE,
} from '../../../constants/constants';
import { getUserInfo } from '../../../services/http';
import { Preloader } from '../../../components';
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
            activePage: 1,
            pageNumber: PAGE_NO,
            pageSize: SERVICE_REQUEST_PAGE_SIZE,
            sort: 'false',
            sortByOrder: 'DESC',
            selectedKey: 'item-1',
            serviceRequestList: []
        };
        this.sort = false
        this.defaultStatus = ["Open", "Invited", "Applied", "Hired", "Not Hired", "Completed", "Closed", "Cancelled", "Not Interested"]
        this.isStatusChanged = false
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        let data = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        this.props.getVisitServiceList(data);
        this.props.getServiceCategory();
        this.props.ServiceRequestStatus()
        this.props.getServiceArea();
        this.props.getServiceRequestCount()
        this.props.clearServiceType()
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
        console.log("Clock", "componentWillUnmount");
        this.props.clearVisitServiceList()
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

    applyFilter = () => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        let data = {
            startDate: this.state.startDate === '' ? DEFAULT_FROM_DATE : this.state.startDate,
            endDate: this.state.endDate === '' ? DEFAULT_TO_DATE: this.state.endDate,
            serviceStatus: this.isStatusChanged ? uniqElementOfArray(this.state.serviceStatus) : this.defaultStatus,
            ServiceCategoryId: this.state.ServiceCategoryId,
            serviceTypes: uniqElementOfArray(this.state.serviceTypes),
            ServiceAreas: this.state.ServiceAreas,
            serviceProviderId: serviceProviderId,
            FromPage: PAGE_NO,
            ToPage: SERVICE_REQUEST_PAGE_SIZE,
        };
        this.props.getFilter(data)
        this.props.getFilterDataCount(data)
        this.setState({
            filterOpen: !this.state.filterOpen,
            activePage: 1
        })
        this.props.formDirtyVisitList()
    }

    handleSortFilterChange = pageNumber => {
        this.setState({ pageNumber: pageNumber });
        // let number;
        // if (pageNumber === 1) {
        //     number = 0
        // } else {
        //     number = pageNumber
        // }
        let serviceProviderId = getUserInfo().serviceProviderId;
        let data = {
            startDate: this.state.startDate === '' ? DEFAULT_FROM_DATE : this.state.startDate,
            endDate: this.state.endDate === '' ? DEFAULT_TO_DATE : this.state.endDate,
            serviceStatus: uniqElementOfArray(this.state.serviceStatus),
            ServiceCategoryId: this.state.ServiceCategoryId,
            serviceTypes: uniqElementOfArray(this.state.serviceTypes),
            ServiceAreas: this.state.ServiceAreas,
            serviceProviderId: serviceProviderId,
            FromPage: pageNumber,
            ToPage: 15,
        };
        this.props.getFilter(data)
        this.props.getFilterDataCount(data)
        this.setState({ activePage: pageNumber });
        this.props.formDirtyVisitList()
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
            activePage: 1
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
        this.props.getVisitServiceList(data);
        this.props.formDirty()
        //this.props.formDirtyVisitList()
    }

    handleChangeServiceCategory = (selectedOption) => {
        this.setState({
            ServiceCategoryId: selectedOption.label,
            selectedOption: selectedOption,
        });
        this.props.getServiceType(selectedOption)
        this.setState({ serviceTypes: [] })
    }

    handleserviceType = (item, e) => {
        let serviceType = this.state.serviceTypes
        if (e.target.checked) {
            serviceType.push(item.serviceTypeDescription)
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
            service.push(item.keyValue)
        } else {
            let index = service.indexOf(item.keyValue);
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
            PageSize: 15
        }
        this.props.getSort(data);
        this.setState({ activePage: pageNumber });
        this.props.formDirtyVisitList()
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
    };

    selectedSort = (selectedKey) => {
        this.sort = true
        this.setState({ selectedKey: selectedKey })
        var data = {
            sortByOrder: selectedKey,
            sortByColumn: "MODIFIEDDATE",
            pageNumber: this.state.pageNumber,
            PageSize: 15
        }
        this.props.getSort(data);
        this.props.formDirtyVisitList();
    }

    render() {
        let visitList = this.props.visitServiceList && this.props.visitServiceList.length > 0 ? (
            this.props.visitServiceList.map(serviceList => {
                let serviceTypeIds = serviceList.typeId && serviceList.typeId.split(",");
                let serviceImage = getServiceTypeImage(serviceTypeIds && serviceTypeIds[0]);
                let patientImage = '';
                let patientLastName = '';
                if (_.indexOf(SHOW_IMAGES_SERVICE_REQUEST, serviceList.statusId) !== -1) {
                    patientImage = serviceList && serviceList.patientImage ? serviceList.patientImage : require('../../../assets/images/Blank_Profile_icon.png');
                    patientLastName = serviceList && serviceList.patientLastName;
                } else {
                    patientLastName = serviceList && serviceList.patientLastName.charAt(0);
                    patientImage = require('../../../assets/images/Blank_Profile_icon.png');
                }
                return (
                    <div className='ServiceRequestBoard' key={serviceList.serviceRequestId}>
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
            <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}
                patientImage={this.props.profileImgData.image ? this.props.profileImgData.image
                    : require('./avatar/user-5.jpg')}>
                {this.props.isLoading && <Preloader />}
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Service Requests</h5>
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
                        <span className='primaryColor ProfileHeaderFilter' onClick={this.toggleFilter}>Filters</span>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false} className='ServiceRequestsWidget'>
                    <div className='BoardContainer'>
                        {visitList}
                    </div>
                    {this.props.visitServiceList.length > 0 && !this.sort && !this.props.FilterDataCount && (
                        <div className="col-md-12 p-0 AsyncConversationPagination">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.pageSize}
                                totalItemsCount={this.props.serviceRequestCount}
                                onChange={this.handlePageChange}
                                itemClass="PaginationItem"
                                itemClassFirst="PaginationIcon First"
                                itemClassPrev="PaginationIcon Prev"
                                itemClassNext="PaginationIcon Next"
                                itemClassLast="PaginationIcon Last"
                            />
                        </div>
                    )}
                    {this.props.visitServiceList.length > 0 && this.sort && !this.props.FilterDataCount && (
                        <div className="col-md-12 p-0 AsyncConversationPagination">
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
                        <div className="col-md-12 p-0 AsyncConversationPagination">
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
        clearServiceType: (data) => dispatch(clearServiceType(data)),
        setPatient: (data) => dispatch(setPatient(data)),
        goToPatientProfile: () => dispatch(push(Path.patientProfile)),
        getServiceRequestCount: () => dispatch(getServiceRequestCount()),
        getFilterDataCount: (data) => dispatch(getFilterDataCount(data)),
        formDirty: () => dispatch(formDirty()),
        formDirtyVisitList: () => dispatch(formDirtyVisitList()),
        checkAllServiceRequestStatus: (checked, data) => dispatch(checkAllServiceRequestStatus(checked, data)),
        clearVisitServiceList: () => dispatch(clearVisitServiceList()),
    }
};

function mapStateToProps(state) {

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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisitServiceList));