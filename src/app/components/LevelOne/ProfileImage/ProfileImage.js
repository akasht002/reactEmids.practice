import React from 'react';
import './style.css';

function ProfileImage(props) {
    return (
        <div className={props.profileImageWidget} onClick={props.onClick}>
            <div className={props.profileImageContainer}>
                <svg viewBox="1.55 1.55 33 33" className={props.cicularChart}>
                    <path className={props.circle}
                        strokeDasharray={`${props.profilePercentage},100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <img className={props.profileImage} src={props.src} alt="user"/>
            </div>
        </div>

    );
};

export default ProfileImage;