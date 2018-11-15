import React from 'react';
import TimeAgo from 'timeago-react'
import moment from 'moment';

export function NotificationDetails(props) {
    let NotificationTemplate = props.visitNotification && props.visitNotification.map((notification, index) => {
        return (
            <div className='NotificationsMiddleContentList'>
                <h6 className='NotificationsTitle'>{notification.customDate}</h6>
                <div className='NotificationsListDetails'>
                    <div className='NotificationsListDetailsName'>
                        {notification.messageContent}
                                    </div>
                    <div className='NotificationsListDetailsActivity'>
                    <TimeAgo datetime={moment.utc(notification.createDate).local().format()} />
                                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="NotificationsMiddleContent">
            {NotificationTemplate}
        </div>
    )
}

export default NotificationDetails;