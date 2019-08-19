import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import moment from 'moment'
import Pagination from 'react-js-pagination';
import { Scrollbars, Preloader } from '../../components'
import {
  getVisitServiceLists,
  getVisitServiceHistoryByIdDetail,
  getAllServiceProviders,
  getVisitServiceListSort,
  clearServiceProviders,
  getServiceCategory,
  getServiceType,
  clearServiceTypes,
  getFilteredData,
  getHistoryListCount,
  getAllPatientForServiceProviders,
  clearPatientForServiceProviders
} from '../../redux/visitHistory/VisitServiceDetails/actions'
import { VisitList } from './VisitList'
import Filter from './VisitHistoryFilter'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'
import { setPatient } from '../../redux/patientProfile/actions';
import '../Dashboard/styles/ServiceTasks.css'
import './visitList.css'
import '../../styles/SelectDropdown.css'
import { push } from '../../redux/navigation/actions';
import { Path } from "../../routes";
import { getTimeZoneOffset } from '../../utils/dateUtility';
import { getServiceRequestId }
  from "../../redux/visitSelection/VisitServiceDetails/actions";
import {DEFAULT_FROM_DATE, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from '../../constants/constants'
export class VisitHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      filterOpen: false,
      selectedKey: 'item-1',
      serviceTypeIds: [],
      activePage: DEFAULT_PAGE_NUMBER,
      sortByOrder: 'asc',
      pageNumber: DEFAULT_PAGE_NUMBER,
      isFilterApplied: false
    }
    this.selectedData = ''
  }

  componentDidMount() {
    const data = this.getModel({
      fromDate: null,
      toDate: null,
      serviceTypeList: [],
      serviceProviderList: [],
      individualList: [],
      pageNumber: DEFAULT_PAGE_NUMBER,
    })
    this.props.getFilteredData(data)
    this.props.getAllServiceProviders()
    this.props.getAllPatientForServiceProviders(data)
    this.props.getServiceCategory()
    this.props.getHistoryListCount()
  }

  getModel = (data) => {
    return ({
      fromDate: data.fromDate,
      toDate: data.toDate,
      serviceTypeList: data.serviceTypeList,
      status: [],
      serviceProviderList: data.serviceProviderList,
      individualList: data.individualList,
      serviceProviderId: 0,
      pageNumber: data.pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      offset: getTimeZoneOffset()
    })
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  toggleHiddenScreen = () => {
    this.setState({
      isOpen: false,
      filterOpen: false
    })
  }

  handleClick = data => {
    let serviceRequestVisitId = (data.serviceRequestVisitId === 0) ? data.servicePlanVisitId : data.serviceRequestVisitId
    this.props.getServiceRequestId(data.serviceRequestId)
    this.props.getVisitServiceHistoryByIdDetail(serviceRequestVisitId)
  }

  handleChangeServiceCategory = (selectedOption) => {
    this.setState({
      serviceCategoryId: selectedOption.value,
      selectedOption: selectedOption
    });
    this.props.getServiceType(selectedOption.value)
  }

  handleserviceType = (item, e) => {
    let serviceType = this.state.serviceTypeIds
    if (e.target.checked) {
      serviceType.push(item.serviceTypeId)
    } else {
      let index = serviceType.indexOf(item.serviceTypeId);
      if (index > -1) {
        serviceType.splice(index, 1);
      }
    }
    this.setState({
      serviceTypeIds: serviceType
    });
  }

  applyFilter = (selectedData) => {
    this.selectedData = selectedData;
    const data = this.getModel({
      fromDate: selectedData.searchData.startDate ? selectedData.searchData.startDate : DEFAULT_FROM_DATE,
      toDate: selectedData.searchData.endDate ? selectedData.searchData.endDate : moment().toDate(),
      serviceCategory: this.state.serviceCategoryId,
      serviceTypeList: this.state.serviceTypeIds,
      serviceProviderList: selectedData.serviceProviderArray,
      individualList: selectedData.individualList,
      pageNumber: DEFAULT_PAGE_NUMBER,
    })
    this.props.getFilteredData(data)
    this.setState({
      filterOpen: !this.state.filterOpen,
      isFilterApplied: true,
      activePage: DEFAULT_PAGE_NUMBER
    })
  }

  handlePageChange = async (pageNumber) => {
    await this.setState({ pageNumber: pageNumber, activePage: pageNumber })
    let data = {}
    this.state.isFilterApplied ?
     data = this.getModel({
      fromDate: this.selectedData.searchData.startDate ? this.selectedData.searchData.startDate : DEFAULT_FROM_DATE,
      toDate: this.selectedData.searchData.endDate ? this.selectedData.searchData.endDate : moment().toDate(),
      serviceCategory: this.state.serviceCategoryId,
      serviceTypeList: this.state.serviceTypeIds,
      serviceProviderList: this.selectedData.serviceProviderArray,
      individualList: this.selectedData.individualList,
      pageNumber: pageNumber
    }) :
    data = this.getModel({
      fromDate: null,
      toDate: null,
      serviceTypeList: [],
      serviceProviderList: [],
      individualList: [],
      pageNumber: pageNumber,
    })
    await this.props.getFilteredData(data)
  }

  handlePageChangeList = (pageNumber) => {
    this.setState({ pageNumber: pageNumber, activePage: pageNumber })
    let data = {
      pageNumber: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      sortOrder: this.state.sortByOrder,
      sortName: 'visitdate'
    }
    this.props.getVisitServiceLists(data)
  }

  applyReset = () => {
    this.setState({ selectedOption: '', serviceTypeIds: [], isFilterApplied: false, activePage: DEFAULT_PAGE_NUMBER })
    this.props.clearServiceTypes();
    this.props.clearServiceProviders(this.props.serviceProviders);
    this.props.clearPatientForServiceProviders(this.props.PatientForServiceproviders);
    const data = this.getModel({
      fromDate: null,
      toDate: null,
      serviceTypeList: [],
      serviceProviderList: [],
      individualList: [],
      pageNumber: DEFAULT_PAGE_NUMBER,
    })
    this.props.getFilteredData(data)
  }

  selectedSort = (selectedKey) => {
    let data = {
      pageNumber: this.state.pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      sortOrder: selectedKey,
      sortName: 'visitdate'
    }
    this.props.getVisitServiceLists(data);
  }

  handelPatientProfile = (data) => {
    this.props.setPatient(data)
    this.props.goToPatientProfile()
  }

  render() {
    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>Visit History</h5>
          </div>
          <div className='ProfileHeaderRight'>
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
                      Visit Date
                      </Item>,
                    <Item className='ListItem' key='asc'>Newest</Item>,
                    <Item className='ListItem' key='desc'>Oldest</Item>
                  ]}
                  className='SelectDropDown sorting'
                >
                  {this.state.selectedKey}
                </Select>
              </SelectField>
            </ThemeProvider> */}
            <span
              className='primaryColor'
              onClick={this.toggleFilter}
            >
              Filters
              </span>
          </div>
        </div>
        <Scrollbars
          speed={2}
          smoothScrolling
          horizontal={false}
          className='ProfileContentWidget'
        >
          <VisitList
            visitHistoryList={this.props.VisitServiceHistory}
            handleClicks={this.handleClick}
            handelPatientProfile={this.handelPatientProfile}
          />
          {this.props.VisitServiceHistory.length > 0 && (
            <div class="col-md-12 p-0 AsyncConversationPagination">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={DEFAULT_PAGE_SIZE}
                totalItemsCount={this.props.VisitServiceHistory[0].dataCount}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="PaginationItem"
                itemClassFirst="PaginationIcon First"
                itemClassPrev="PaginationIcon Prev"
                itemClassNext="PaginationIcon Next"
                itemClassLast="PaginationIcon Last"
              />
            </div>
          )}
          <div className='cardBottom' />
        </Scrollbars>
        <Filter
          serviceProviders={this.props.serviceProviders}
          AllPatientForserviceProviders={this.props.PatientForServiceproviders}
          serviceCategory={this.props.serviceCategories}
          isOpen={this.state.filterOpen}
          toggle={this.toggleFilter}
          serviceType={this.props.serviceType}
          handleChangeServiceCategory={this.handleChangeServiceCategory}
          selectedOption={this.state.selectedOption}
          handleserviceType={this.handleserviceType}
          applyFilter={this.applyFilter}
          applyReset={this.applyReset}
        />
        {this.props.isLoading && <Preloader />}
      </AsideScreenCover>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceLists: (data) => dispatch(getVisitServiceLists(data)),
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    getAllServiceProviders: () => dispatch(getAllServiceProviders()),
    getServiceCategory: () => dispatch(getServiceCategory()),
    getVisitServiceListSort: (data) => dispatch(getVisitServiceListSort(data)),
    getServiceType: (data) => dispatch(getServiceType(data)),
    clearServiceTypes: () => dispatch(clearServiceTypes()),
    clearServiceProviders: (data) => dispatch(clearServiceProviders(data)),
    getFilteredData: (data) => dispatch(getFilteredData(data)),
    getHistoryListCount: () => dispatch(getHistoryListCount()),
    getAllPatientForServiceProviders: () => dispatch(getAllPatientForServiceProviders()),
    clearPatientForServiceProviders: (data) => dispatch(clearPatientForServiceProviders(data)),
    setPatient: (data) => dispatch(setPatient(data)),
    goToPatientProfile: () => dispatch(push(Path.patientProfile)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data))
  }
}

export function mapStateToProps(state) {
  return {
    VisitServiceHistory: state.visitHistoryState.vistServiceHistoryState
      .VisitServiceHistory,
    VisitServiceDetails: state.visitHistoryState.vistServiceHistoryState
      .VisitServiceDetails,
    serviceProviders: state.visitHistoryState.vistServiceHistoryState
      .serviceProviders,
    serviceCategories: state.visitHistoryState.vistServiceHistoryState
      .serviceCategories,
    serviceType: state.visitHistoryState.vistServiceHistoryState.typeList,
    historyListCount: state.visitHistoryState.vistServiceHistoryState
      .historyListCount,
    PatientForServiceproviders: state.visitHistoryState.vistServiceHistoryState
      .PatientForServiceproviders,
    isLoading: state.visitHistoryState.vistServiceHistoryState.isLoading,
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitHistory)
)