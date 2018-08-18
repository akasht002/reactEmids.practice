import React from "react";
import Select from "react-select"
import {Link} from "react-router-dom"
import "./styles.css";

class DashboardMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: {label: "Brett Smith", value: '2'},
            isOpen: false
        };
    };

    optionChanged(e){
        this.setState({
            selectedValue: e
        });
    };

    render(){
        return(
            <div className={"ProfileLeftWidget " + this.props.isOpen }>
            <div className='BrandNameWidget'>
                <div className='BrandName'>
                    <Link className='BrandLink' to='/'>Coreo Home</Link>
                </div>
            </div>
            <div className='ProfileImageWidget'>
                <div className='ProfileImageContainer'>
                    <svg viewBox="1.55 1.55 33 33" className="circular-chart">
                        <path className="circle"
                              strokeDasharray="80, 100"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <img className="ProfileImage" src={"../../../assets/images/avatar/user-5.jpg"}/>
                </div>
            </div>
            <div className='ProfileNameWidget'>
                <div className='ProfileNameContent'>
                    <div className="form-group">
                        <Select
                            id="ProfileName"
                            multiple={false}
                            className="SelectFormControl"
                            searchable={false}
                            options={[
                                {label: "John Smith", value: '1'},
                                {label: "Brett Smith", value: '2'},
                            ]}
                            onChange={this.optionChanged.bind(this)}
                            value={this.state.selectedValue}
                        />
                    </div>
                </div>
            </div>
            <ul className="ProfileSideNavigation">
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/'><i className='iconProfile iconProfileDashboard'/>
                        <span>Dashboard</span></Link>
                </li>
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/serviceRequest'>
                        <i className='iconProfile iconProfileServiceRequest'/><span>Service Requests</span></Link>
                </li>
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/'>
                        <i className='iconProfile iconProfileServiceVisits'/><span>Visit History</span></Link>
                </li>
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/'>
                        <i className='iconProfile iconProfileServiceProviders'/><span>Service Providers</span></Link>
                </li>
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/'>
                        <i className='iconProfile iconProfilePayments'/><span>Payments</span></Link>
                </li>
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/'>
                        <i className='iconProfile iconProfileMySettings'/><span>My Settings</span></Link>
                </li>
                <li className='profileSideNavigationList'>
                    <Link className='profileSideNavigationLink' to='/'>
                        <i className='iconProfile iconProfileMyConnections'/><span>My Connections</span></Link>
                </li>
            </ul>
        </div>
        )
    }
}
export default DashboardMenu;