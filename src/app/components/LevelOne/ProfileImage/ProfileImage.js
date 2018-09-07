import React from 'react';
import './style.css';

function ProfileImage(props) {
    return (
        <div className='ProfileImageWidget'>
            <div className='ProfileImageContainer'>
                <svg viewBox="1.55 1.55 33 33" className="circular-chart">
                    <path className="circle"
                        strokeDasharray="80, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <img alt="NO" className="ProfileImage" src={require('../../../assets/images/avatar/user-5.jpg')} />
            </div>
        </div>

    );
};

export default ProfileImage;