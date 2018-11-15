import React from 'react';

export function NotificationCheckBox(props) {
    return (
        <div className='NotificationsSettingsContents'>
            <div className='NotificationsSettingsDetailsName'>
                {props.nList.applicationModuleDescription}
            </div>
            <div className='NotificationsSettingsDetailsActivity'>
                {props.nList.moduledescription}
            </div>
            <span className="NotificationsActionImage CheckboxSet">
                <input className="ServiceCheckbox"
                    type="checkbox"
                    checked={props.nList.isChecked}
                    value={props.nList.userPrefrencesApplicationModuleID}
                    id={props.nList.userPrefrencesApplicationModuleID}
                    name="ServiceStatus"
                    onChange={(e) => {
                        props.nList.isChecked = e.target.checked;
                        props.nList.userId = props.userId;
                        props.handleChange(props.nList);
                    }}
                />
                <label htmlFor={props.nList.userPrefrencesApplicationModuleID} />
            </span>
        </div>
    )
}

export default NotificationCheckBox;