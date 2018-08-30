import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from "react";
import { ThemeProvider } from '@zendeskgarden/react-theming';
import {SelectField, Select, Item} from '@zendeskgarden/react-select';


import { LeftSideMenu, ProfileHeader, Scrollbars } from '../../components';
import { getVisitServiceDetails } from '../../redux/visitHistory/VisitServiceDetails/actions';
import {VisitList} from "./VisitList"
import VisitFilter from "../VisitHistoryFilter";

import '../../styles/dashboard.css'
import '../../styles/SelectDropDown.css'

class VisitHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            filterOpen: false,
            selectedKey: 'item-1'
        };
    };

    componentDidMount () {
        this.props.getVisitServiceDetails()
        
      }
    
      componentWillReceiveProps (nextProps) {
      }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleFilter(){
        this.setState({
            filterOpen: !this.state.filterOpen,
            /*isOpen: !this.state.isOpen*/
        })
    }

    toggleHiddenScreen(){
        this.setState({
            isOpen: false,
            filterOpen: false
        })
    }

    render() {
        return (           
            <section className="d-flex">
                <LeftSideMenu isOpen={this.state.isOpen}/>
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.toggle.bind(this)}/>
                    <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggleHiddenScreen.bind(this)}/>
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
                                            placement="auto"
                                            onChange={selectedKey => this.setState({selectedKey})}
                                            options={[
                                                <Item disabled className='ListItem disabled' key="item-1">Visit Date</Item>,
                                                <Item className='ListItem' key="item-2">Newest</Item>,
                                                <Item className='ListItem' key="item-3">Oldest</Item>
                                            ]}
                                            className='SelectDropDown sorting'
                                        >{this.state.selectedKey}</Select>
                                    </SelectField>
                                </ThemeProvider>
                                <span className='primaryColor' onClick={this.toggleFilter.bind(this)}>Filters</span>
                            </div>
                        </div>
                        <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                                    className='ProfileContentWidget'>
                            <VisitList visitHistoryList = {this.props.VisitServiceDetails}/>
                            <div className='cardBottom'/>
                        </Scrollbars>
                        <VisitFilter isOpen={this.state.filterOpen} toggle={this.toggleFilter.bind(this)}/>
                    </div>
                </div>
            </section>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceDetails: () => dispatch(getVisitServiceDetails())
    }
};

function mapStateToProps(state) {
    return {
        VisitServiceDetails: state.visitHistoryState.vistServiceHistoryState.VisitServiceHistory
    };
};

  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(VisitHistory)
  )