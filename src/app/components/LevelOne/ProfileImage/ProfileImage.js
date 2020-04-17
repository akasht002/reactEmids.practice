import React from 'react';
import './style.css';
import { getUserTypeInitials } from '../../../utils/validations';

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
                <img className={props.profileImage} src={props.src ? props.src : require('../../../assets/images/Blank_Profile_icon.png')} alt="user"/>
                <div className={`memberType memT-${getUserTypeInitials()}`}>{getUserTypeInitials()}</div>
            </div>
        </div>

    );
};

export default ProfileImage;