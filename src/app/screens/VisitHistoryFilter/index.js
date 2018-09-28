// import Scrollbars from 'primary_path/components/CSB';
// import DatePickerComp from 'primary_path/components/DatePickerComp'
import { TabContent, TabPane } from 'reactstrap'

import { ThemeProvider } from '@zendeskgarden/react-theming'
import {
  SelectField,
  Label,
  Hint,
  Select,
  Item
} from '@zendeskgarden/react-select'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Scrollbars,Calendar } from '../../components'
import { getArrayLength } from '../../utils/validations'

import './VisitFilter.css'

class VisitFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: '1'
    }
  }

  toggle (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  getServiceProvider = serviceProviders => {
    return serviceProviders.map((serviceProviders, index) => {
      return (
        <div key={index} className='CheckboxSet CheckboxSetImage'>
          <input
            className='ServiceCheckbox'
            type='checkbox'
            value='4'
            id={
              'ServiceStatus' + serviceProviders.serviceProviderId &&
                serviceProviders.serviceProviderId
            }
            name='ServiceStatus'
          />
          <label
            htmlFor={
              'ServiceStatus' + serviceProviders.serviceProviderId &&
                serviceProviders.serviceProviderId
            }
            className='ServiceCheckboxLabel'
          >
            <img
              alt='NO'
              className='ServiceCheckboxImage'
              src={
                serviceProviders.image
                  ? serviceProviders.image
                  : require('../../assets/images/Blank_Profile_icon.png')
              }
            />
            <span className='ServiceCheckboxName'>
              {serviceProviders.firstName && serviceProviders.firstName}
              {' '}
              {serviceProviders.lastName && serviceProviders.lastName}
            </span>
          </label>
        </div>
      )
    })
  }

  getserviceCategories = serviceCategories => {
    
    if(getArrayLength(serviceCategories)>0){
      return serviceCategories.map((serviceCategory, index) => {
        return (
          <Item className='ListItem' key={serviceCategory.serviceCategoryDescription}>
           {serviceCategory.serviceCategoryDescription}
          </Item>
        )
      })
    }     
      return (
        <Item className='ListItem' key='Activity of Daily Living 1'>
          Activity of Daily Living
        </Item>
      )
   
  }

  render () {    
    const serviceCategoriesList = this.getserviceCategories(
      this.props.serviceCategories
    )
    return (
      <div className={'FilterWidget ' + this.props.isOpen}>
        <form className='FilterWidgetForm'>
          <div className='FilterContainer FilterTop'>
            <span>Filters</span>
            <span className='FilterCloseIcon' onClick={this.props.toggle} />
          </div>

          <div className='FilterContainer FilterMiddle'>
            <div className='FilterMiddleContent FilterMiddleLeft'>
              <span
                className={this.state.activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  this.toggle('1')
                }}
              >
                Service Providers
              </span>
              <span
                className={this.state.activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  this.toggle('2')
                }}
              >
                Date Range
              </span>
              <span
                className={this.state.activeTab === '3' ? 'active' : ''}
                onClick={() => {
                  this.toggle('3')
                }}
              >
                Service Categories
              </span>
            </div>
            <Scrollbars
              speed={2}
              smoothScrolling
              horizontal={false}
              className='FilterMiddleContent FilterMiddleRight'
            >
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='1'>
                  <div className='form-group'>
                    <label>Select Service Providers</label>
                  </div>
                  <div className='ServiceProvider'>
                    <fieldset>
                      {getArrayLength(this.props.serviceProviders) > 0 &&
                        this.getServiceProvider(this.props.serviceProviders)}

                    </fieldset>
                  </div>
                </TabPane>
                <TabPane tabId='2'>
                  <div className='form-group'>
                    <label>Select the Date range</label>
                  </div>
                  <div className='col-md-12 mb-4 p-0'>
                    <Calendar
                      dateFormat='D MMM YYYY'
                      placeholder='DD MMM YYYY'
                      className='form-control datePicker'
                      labelText='From Date'
                    />
                  </div>
                  <div className='col-md-12 mb-4 p-0'>
                    <Calendar
                      dateFormat='D MMM YYYY'
                      placeholder='DD MMM YYYY'
                      className='form-control datePicker'
                      labelText='To Date'
                    />
                  </div>
                </TabPane>
                <TabPane tabId='3'>
                  <div className='form-group'>
                    <label>Select the Service Category</label>
                  </div>
                  <div className='form-group'>
                    <ThemeProvider>
                      <SelectField>
                        <Select
                          selectedKey={this.state.selectedKey}
                          placement='auto'
                          onChange={selectedKey =>
                           {
                            this.setState({ selectedKey })
                            console.log(this.state.selectedKey)
                           } 
                          }
                            options={serviceCategoriesList}                         
                          className='FilterDropDown'
                        >
                          {this.state.selectedKey}
                        </Select>
                      </SelectField>
                    </ThemeProvider>
                  </div>
                </TabPane>
              </TabContent>
            </Scrollbars>
          </div>
          <div className='FilterContainer FilterBottom'>
            <Link to='/' className='btn btn-outline-primary mr-2'>Reset</Link>
            <Link to='/' className='btn btn-primary'>Apply</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default VisitFilter
