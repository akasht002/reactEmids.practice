import React, { Fragment } from 'react';
import { getStartRatings } from '../../../../utils/arrayUtility';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Select, Item } from '@zendeskgarden/react-select';

export const AssignServiceProvider = props => {
    return (
        props.entityServiceProvidersList.length > 0 ?
            <Fragment>
                <div className="assign-sp-block">
                    {
                        props.entityServiceProvidersList.map((item,index) => {
                            let espImage = item.thumbnail ? item.thumbnail : require('../../../../assets/images/Blank_Profile_icon.png');
                            return (
                                <Fragment>
                                    <div className="assign-SP-card" key={`assign-SP-card_id${index}`}>
                                        <div className="card">
                                            <fieldset className={item.selected === true && 'selected-box-border'}>
                                                <div className="checkblock">
                                                    <input
                                                        type="radio"
                                                        className="form-radio-input"
                                                        checked={item.selected === true}
                                                        id={item.serviceProviderId + "ESPId"}
                                                        name={'form-radio-input'}
                                                        value={item.serviceProviderId}
                                                        onChange={(e) => { props.handleAssignServiceProvider(e.target.value) }}
                                                    />
                                                    <label className="" htmlFor={item.serviceProviderId + "ESPId"}><span className="RadioBoxIcon" /></label>
                                                </div>
                                                <div className="Spname-image-block">
                                                    <img className="ProfileImage" src={espImage} alt="espImage" />
                                                    <div className="SP-nameblock">
                                                        <label htmlFor={"ServiceStatus" + item.serviceProviderId}>
                                                            {item.firstName + ' '}
                                                            {item.lastName}</label>
                                                        <span>
                                                            {getStartRatings(item.rating)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className='options'>
                                            <ThemeProvider>
                                                <SelectField>
                                                    <Select
                                                        placement='auto'
                                                        options={[
                                                            <Item className='ListItem CTDashboard' key='phone' onClick={() => { props.showPhoneNumber(item.phoneNumber) }}>
                                                                <i className='iconPhone' /> Phone Call
                                                    </Item>
                                                        ]}
                                                        className='SelectDropDown Dashboard'
                                                    />
                                                </SelectField>
                                            </ThemeProvider>
                                        </div>
                                    </div>

                                </Fragment>
                            )
                        })
                    }
                </div>
            </Fragment>
            :
            <p>No results found</p>
    )
}
