// import Scrollbars from 'primary_path/components/CSB';
// import DatePickerComp from 'primary_path/components/DatePickerComp'
import { TabContent, TabPane } from 'reactstrap'

import {ThemeProvider} from '@zendeskgarden/react-theming';
import {SelectField, Label, Hint, Select, Item} from '@zendeskgarden/react-select';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Scrollbars  } from '../../components'

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

  render () {
    const selectRecurringPattern = [
      { label: 'Activity of Daily Living', value: 1 },
      { label: 'Weekly', value: 2 },
      { label: 'Bi-weekly', value: 3 },
      { label: 'Monthly', value: 4 }
    ]

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
                      <div className='CheckboxSet CheckboxSetImage'>
                        <input
                          className='ServiceCheckbox'
                          type='checkbox'
                          value='4'
                          id='ServiceStatus4'
                          name='ServiceStatus'
                        />
                        <label
                          htmlFor='ServiceStatus4'
                          className='ServiceCheckboxLabel'
                        >
                          <img
                            className='ServiceCheckboxImage'
                            src={require('../../assets/images/Blank_Profile_icon.png')}
                          />
                          <span className='ServiceCheckboxName'>
                            Samantha Turner
                          </span>
                        </label>
                      </div>
                      <div className='CheckboxSet CheckboxSetImage'>
                        <input
                          className='ServiceCheckbox'
                          type='checkbox'
                          value='4'
                          id='ServiceStatus4'
                          name='ServiceStatus'
                        />
                        <label
                          htmlFor='ServiceStatus4'
                          className='ServiceCheckboxLabel'
                        >
                          <img
                            className='ServiceCheckboxImage'
                            src={require('../../assets/images/Blank_Profile_icon.png')}
                          />
                          <span className='ServiceCheckboxName'>
                            Samantha Turner
                          </span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </TabPane>
                <TabPane tabId='2'>
                  <div className='form-group'>
                    <label>Select the Date range</label>
                  </div>
                  {/* <div className='col-md-12 mb-4 p-0'>
                    <DatePickerComp
                      dateFormat='D MMM YYYY'
                      placeholder='DD MMM YYYY'
                      className='form-control datePicker'
                      labelText='From Date'
                    />
                  </div>
                  <div className='col-md-12 mb-4 p-0'>
                    <DatePickerComp
                      dateFormat='D MMM YYYY'
                      placeholder='DD MMM YYYY'
                      className='form-control datePicker'
                      labelText='To Date'
                    />
                  </div> */}
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
                            this.setState({ selectedKey })}
                          options={[
                            <Item
                              className='ListItem'
                              key='Activity of Daily Living 1'
                            >
                              Activity of Daily Living
                            </Item>,
                            <Item
                              className='ListItem'
                              key='Activity of Daily Living 2'
                            >
                              Activity of Daily Living
                            </Item>,
                            <Item
                              className='ListItem'
                              key='Activity of Daily Living 3'
                            >
                              Activity of Daily Living
                            </Item>
                          ]}
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
