import React from "react";
import { Link } from "react-router-dom"
import './style.css'

function AsideMenu(props) {
    let path = props.url.location.pathname;
    const menuList = props.menuData.map(
        (menu) => {
            return (
                <li className={'profileSideNavigationList'}>
                    <Link className={'profileSideNavigationLink ' + (path === menu.link ? 'active' : '')} to={menu.link}><i className={menu.iconName} />
                        <span>{menu.title}</span></Link>
                </li>
            )
        }
    );
    return (
        <ul className="ProfileSideNavigation">
            {menuList}
        </ul>
    )
}

export default AsideMenu;