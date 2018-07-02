import React from 'react';
import './styles.css';


const InfoCard = ({ type, profile, index, onSelectProfile }) => {
    return (
        <div className="form-check form-check-inline ContentCheckbox">
            <input
                id={"checkbox" + index + 1}
                className="form-check-input"
                type={type}
                name="Checkbox"
                value={index + 1}
                onClick={onSelectProfile}
            />
            <label htmlFor={"checkbox" + index +1} className={`${profile.selected ? 'form-check-label checkedType ' + profile.name : 'form-check-label ' + profile.name}`}>
                <span className="text-capitalize">
                    {profile.name}
                    <small className={"text-muted " + profile.gender.toLocaleLowerCase()}>{profile.gender}</small>
                    <small className="text-muted dob">{profile.dob}</small>
                    <small className="text-muted hmsa">{profile.hmsa}</small>
                </span>
            </label>
        </div>
    );
};


export default InfoCard;