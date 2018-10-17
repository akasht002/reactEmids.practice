import { TabContent, TabPane } from 'reactstrap'
import moment from 'moment';
import React, { Component } from 'react'
import { Scrollbars, Calendar, Button } from '../../../components'
import ServiceCategory from "./ServiceCategory";
import ServiceTypeList from "./ServiceTyplist";
import { getArrayLength } from '../../../utils/validations'
import {
  formatDate
} from '../../../utils/dateUtility';
import { DATE_FORMAT } from '../../../constants/constants';

import './VisitFilter.css'

class VisitFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      searchData: {
        startDate: null,
        endDate: null
      },
      isChecked: false
    }
    this.fromDateProps = ''
    this.toDateProps = ''
    this.serviceProviderArray = []
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  dateFromChanged = (date) => {
    const formattedDate = date ? formatDate(date, DATE_FORMAT) : null;
    this.setState({ searchData: { ...this.state.searchData, startDate: formattedDate }, dobValid: true });
  }
  dateToChanged = (date) => {
    const formattedDate = date ? formatDate(date, DATE_FORMAT) : null;
    this.setState({ searchData: { ...this.state.searchData, endDate: formattedDate }, dobValid: true });
  }

  getServiceProvider = serviceProviders => {
    return serviceProviders.map((serviceProviders, index) => {
      return (
        <div key={index} className='CheckboxSet CheckboxSetImage'>
          <input
            className='ServiceCheckbox'
            type='checkbox'
            value={serviceProviders.serviceProviderId}
            id={
              'ServiceStatus' + serviceProviders.serviceProviderId &&
              serviceProviders.serviceProviderId
            }
            checked={serviceProviders.isChecked}
            name='ServiceStatus'
            onChange={event => {
              serviceProviders.isChecked = event.target.checked;
              this.onCheckServiceProvider(
                serviceProviders.serviceProviderId,
                event.target.checked,
              )
            }}
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
                  : require('../../../assets/images/Blank_Profile_icon.png')
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

  onCheckServiceProvider = (data, status) => {
    let index = this.serviceProviderArray.indexOf(data);
    status
      ? this.serviceProviderArray.push(data)
      : this.serviceProviderArray.splice(index, 1);
      this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    const serviceCategories = this.props.serviceCategory && this.props.serviceCategory.map(function (type) {
      return { "label": type.serviceCategoryDescription, "value": type.serviceCategoryId };
    });
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
                Individuals
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
                      id='dob'
                      label='Start Date'
                      value={this.state.searchData.startDate}
                      startDate={
                        this.state.searchData.startDate &&
                        moment(this.state.searchData.startDate)
                      }
                      onDateChange={this.dateFromChanged}
                      onDateChangeRaw={this.dateChangedRaw}
                      mandatory
                      className={'form-control datePicker '}
                      onBlur={() => {
                        if (!this.state.searchData.startDate) {
                          this.setState({ dobValid: false })
                        }
                      }}
                    />
                  </div>
                  <div className='col-md-12 mb-4 p-0'>
                    <Calendar
                      id='dob1'
                      label='End Date'
                      value={this.state.searchData.endDate}
                      startDate={
                        this.state.searchData.endDate &&
                        moment(this.state.searchData.endDate)
                      }
                      onDateChange={this.dateToChanged}
                      onDateChangeRaw={this.dateChangedRaw}
                      mandatory
                      className={'form-control datePicker '}
                      onBlur={() => {
                        if (!this.state.searchData.endDate) {
                          this.setState({ dobValid: false })
                        }
                      }}
                    />
                  </div>
                </TabPane>
                <TabPane tabId='3'>
                  <div className='form-group'>
                    <label>Select the Service Category</label>
                  </div>
                  <div className="form-group">
                    <ServiceCategory
                      id="Service Category"
                      value={this.props.selectedOption}
                      closeOnSelect={true}
                      searchable={false}
                      placeholder="Select the Service Category"
                      className='ServiceRequestSelect col-md-12 mb-4 p-0'
                      options={serviceCategories}
                      onChange={this.props.handleChangeServiceCategory}
                    />
                  </div>
                  <ServiceTypeList
                    serviceType={this.props.serviceType}
                    handleserviceType={this.props.handleserviceType}
                  />
                </TabPane>
              </TabContent>
            </Scrollbars>
          </div>
          <div className='FilterContainer FilterBottom'>
            <Button
              type='button'
              classname="btn btn-outline-primary mr-2"
              label='Reset'
              onClick={() => {
                this.props.applyReset();
                this.serviceProviderArray = [];
                this.setState({ searchData: { ...this.state.searchData, startDate: null, endDate: null }, dobValid: false });
              }
              } />
            <Button
              type='button'
              classname='btn btn-primary'
              label='Apply'
              onClick={() => this.props.applyFilter({
                searchData: this.state.searchData,
                serviceProviderArray: this.serviceProviderArray
              })}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default VisitFilter