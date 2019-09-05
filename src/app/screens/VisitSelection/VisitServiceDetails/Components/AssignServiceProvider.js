import React, { Fragment } from 'react';
import { getStartRatings } from '../../../../utils/arrayUtility';

export const AssignServiceProvider = props => {
    return (
        <Fragment>
            <div className="assign-sp-block">
                {
                    props.entityServiceProvidersList.map(item => {
                        let espImage = item.thumbnail ? item.thumbnail : require('../../../../assets/images/Blank_Profile_icon.png');
                        return (
                            <div className="assign-SP-card">
                                <div className="card">
                                    <fieldset>
                                        <div className="checkblock">
                                            <input
                                                type="radio"
                                                className="form-radio-input"
                                                checked={item.selected === true}
                                                id={item.serviceProviderId}
                                                name={'form-radio-input'}
                                                value={item.serviceProviderId}
                                                onChange={(e) => { props.handleAssignServiceProvider(e.target.id) }}
                                            />
                                            <label className="" htmlFor={item.serviceProviderId}><span className="RadioBoxIcon" /></label>
                                        </div>
                                        <div className="Spname-image-block">
                                            <img className="ProfileImage" src={espImage} alt="espImage" />
                                            <div className="SP-nameblock">
                                                <label htmlFor={"ServiceStatus" + item.serviceProviderId}>
                                                    {item.firstName && item.firstName + ' '}{' '}
                                                    {item.lastName && item.lastName}</label>
                                                <span>
                                                    {getStartRatings(item.rating)}
                                                </span>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}
