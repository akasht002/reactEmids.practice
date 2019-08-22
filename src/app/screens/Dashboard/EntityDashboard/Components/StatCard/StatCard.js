import React from "react";
import { entityCardImage } from '../../../../../constants/constants'

class StatCard extends React.Component {

    render() {
        let cardList = this.props.countList && this.props.countList.map((item) => {
            let image_url = entityCardImage[`${item.subtext}${item.statusName}`] ?  entityCardImage[`${item.subtext}${item.statusName}`] :'visits_in_period.svg'
            return (
                <div className="filter-card-content">
                    <input id={item.statusName + item.subtext} name={item.subtext} className="card-filter-input" type="radio" value={item.statusName}
                        onClick={this.props.getTable} checked={this.props.status === item.statusName}/>
                    <label htmlFor={item.statusName + item.subtext} className="card-filter-label">
                        <div className="filter-label-content">
                            <span className="filter-label-title"><i>{item.totalCount}</i> {item.subtext}</span>
                            <span className="filter-label-sub">{item.label}</span>
                        </div>
                        <div className="top-tabicons-block">
                            <img alt="" src={require(`../../../../../assets/images/entityDashboard/${image_url}`)}/>
                        </div>
                    </label>
                </div>
            )
        });
        return (
            cardList
        )
    }
}

export default StatCard;