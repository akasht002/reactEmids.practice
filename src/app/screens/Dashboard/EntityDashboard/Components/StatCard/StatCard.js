import React from "react";
import { ENTITY_CARD_IMAGE } from '../../../../../constants/constants'
import { Avatar } from "../../../../../components";

export const StatCard = props => {
    let cardList = props.countList && props.countList.map((item) => {
        let image_url = ENTITY_CARD_IMAGE[`${item.subtext}${item.statusName}`] ? ENTITY_CARD_IMAGE[`${item.subtext}${item.statusName}`] : 'visits_in_period.svg'
        return (
            <div className="filter-card-content">
                <input id={item.statusName + item.subtext} name={item.subtext} className="card-filter-input" type="radio" value={item.statusName}
                    onClick={props.getTable} checked={props.status === item.statusName} />
                <label htmlFor={item.statusName + item.subtext} className="card-filter-label theme-primary-light">
                    <div className="filter-label-content">
                        <span className="filter-label-title theme-primary"><i>{item.totalCount}</i> {item.subtext}</span>
                        <span className="filter-label-sub">{item.label}</span>
                    </div>
                    <div className="top-tabicons-block">
                        <Avatar alt="statCard" src={require(`../../../../../assets/images/entityDashboard/${image_url}`)} />
                    </div>
                </label>
            </div>
        )
    });
    return (
        cardList
    )
}