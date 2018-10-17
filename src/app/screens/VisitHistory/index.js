import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { SelectField, Select, Item } from '@zendeskgarden/react-select'
import { Scrollbars } from '../../components'
import {
  getVisitServiceLists,
  getVisitServiceHistoryByIdDetail,
  getAllServiceProviders,
  getVisitServiceListSort,
  clearServiceProviders,
  getServiceCategory,
  getServiceType,
  clearServiceTypes,
  getFilteredData
} from '../../redux/visitHistory/VisitServiceDetails/actions'
import { VisitList } from './VisitList'
import Filter from './VisitHistoryFilter'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'

import '../Dashboard/styles/ServiceTasks.css'
import './visitList.css'
import '../../styles/SelectDropdown.css'

class VisitHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      filterOpen: false,
      selectedKey: 'item-1',
      serviceTypeIds: []
    }
  }

  componentDidMount() {
    this.props.getVisitServiceLists()
    this.props.getAllServiceProviders()
    this.props.getServiceCategory()
  }

  componentWillReceiveProps(nextProps) { }

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

  handleClick = requestId => {
    this.props.getVisitServiceHistoryByIdDetail(requestId)
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
    const data = {
      fromDate: selectedData.searchData.startDate,
      toDate: selectedData.searchData.endDate,
      serviceCategory: this.state.serviceCategoryId,
      serviceTypeList: this.state.serviceTypeIds,
      status: [],
      serviceProviderList: selectedData.serviceProviderArray,
      serviceProviderId: 0
    }
    this.props.getFilteredData(data)
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  applyReset = () => {
    this.setState({ selectedOption: '', serviceTypeIds: [] })
    this.props.clearServiceTypes();
    this.props.clearServiceProviders(this.props.serviceProviders);
    this.props.getVisitServiceLists();
  }

  render() {
    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>Visit History</h5>
          </div>
          <div className='ProfileHeaderRight'>
            <ThemeProvider>
              <SelectField>
                <Select
                  selectedKey={this.state.selectedKey}
                  placement='auto'
                  onChange={selectedKey => {
                    this.setState({ selectedKey })
                    this.props.getVisitServiceListSort({ sortByOrder: this.state.selectedKey, sortByColumn: 'modifieddate' });
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
            </ThemeProvider>
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
          />
          <div className='cardBottom' />
        </Scrollbars>
        <Filter
          serviceProviders={this.props.serviceProviders}
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
      </AsideScreenCover>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getVisitServiceLists: () => dispatch(getVisitServiceLists()),
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    getAllServiceProviders: () => dispatch(getAllServiceProviders()),
    getServiceCategory: () => dispatch(getServiceCategory()),
    getVisitServiceListSort: (data) => dispatch(getVisitServiceListSort(data)),
    getServiceType: (data) => dispatch(getServiceType(data)),
    clearServiceTypes: () => dispatch(clearServiceTypes()),
    clearServiceProviders: (data) => dispatch(clearServiceProviders(data)),
    getFilteredData: (data) => dispatch(getFilteredData(data)),
  }
}

function mapStateToProps(state) {
  return {
    VisitServiceHistory: state.visitHistoryState.vistServiceHistoryState
      .VisitServiceHistory,
    VisitServiceDetails: state.visitHistoryState.vistServiceHistoryState
      .VisitServiceDetails,
    serviceProviders: state.visitHistoryState.vistServiceHistoryState
      .serviceProviders,
    serviceCategories: state.visitHistoryState.vistServiceHistoryState
      .serviceCategories,
    serviceType: state.visitHistoryState.vistServiceHistoryState.typeList
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitHistory)
)