import React from "react";
import { CoreoCheckBox } from '../../../../../components'

function EntitySp(props) {

    let entitySpList = props.entityServiceProvidersList.map((item, index) => {
        return (
            <div key={index + 1} className='CheckboxSet CheckboxSetImage'>
                <CoreoCheckBox
                    className='ServiceCheckbox'
                    value={item.serviceProviderId}
                    id={'ServiceStatus' + index + 1}
                    checked={item.isChecked}
                    name='ServiceStatus'
                    onChange={(e) => {
                        item.isChecked = e.target.checked;
                        props.handleEsp(item.serviceProviderId, e)
                    }}
                />
                <label htmlFor={'ServiceStatus' + index + 1} className='ServiceCheckboxLabel'>
                    <img
                        alt='NO'
                        className='ServiceCheckboxImage'
                        src={
                            item.thumbnail
                                ? item.thumbnail
                                : require('../../../../../assets/images/Blank_Profile_icon.png')
                        }
                    />
                    <span className='ServiceCheckboxName'>
                        {item.firstName && item.firstName}
                        {' '}
                        {item.lastName && item.lastName}
                    </span>
                </label>
            </div>
        )
    })

    return (
        <div className="form-group">
            {entitySpList}
        </div>
    )
}

export default EntitySp;