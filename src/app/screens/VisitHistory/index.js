import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { SelectField, Select, Item } from '@zendeskgarden/react-select'
import '../Dashboard/styles/ServiceTasks.css'
import './visitList.css'
import '../../styles/SelectDropdown.css'
import { Scrollbars } from '../../components'
import {
  getVisitServiceLists,
  getVisitServiceHistoryByIdDetail,
  getAllServiceProviders,
  getServiceCategories,
  getVisitServiceListSort
} from '../../redux/visitHistory/VisitServiceDetails/actions'
import { VisitList } from './VisitList'
import VisitFilter from '../VisitHistoryFilter'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'

class VisitHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      filterOpen: false,
      selectedKey: 'item-1'
    }
  }

  componentDidMount () {
    this.props.getVisitServiceLists()
  }

  componentWillReceiveProps (nextProps) {}

  toggle = () =>{
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleFilter  = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  toggleHiddenScreen  = () => {
    this.setState({
      isOpen: false,
      filterOpen: false
    })
  }

  handleClick = requestId => {
    this.props.getVisitServiceHistoryByIdDetail(requestId)
  }

  render () {
    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className='ProfileRightContainer'>
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
                      console.log(this.state.selectedKey)
                      this.props.getVisitServiceListSort({sortByOrder:this.state.selectedKey,sortByColumn:'modifieddate'});
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
        </div>
      </AsideScreenCover>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getVisitServiceLists: () => dispatch(getVisitServiceLists()),
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data)),
    getAllServiceProviders: () => dispatch(getAllServiceProviders()),
    getServiceCategories: () => dispatch(getServiceCategories()),
    getVisitServiceListSort:(data) => dispatch(getVisitServiceListSort(data))

  }
}

function mapStateToProps (state) {
  return {
    VisitServiceHistory: state.visitHistoryState.vistServiceHistoryState
      .VisitServiceHistory,
    VisitServiceDetails: state.visitHistoryState.vistServiceHistoryState
      .VisitServiceDetails,
    serviceProviders: state.visitHistoryState.vistServiceHistoryState
      .serviceProviders,
    serviceCategories: state.visitHistoryState.vistServiceHistoryState
      .serviceCategories
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitHistory)
)
