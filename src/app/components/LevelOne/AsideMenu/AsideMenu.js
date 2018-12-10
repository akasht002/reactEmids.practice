import React from "react";
import {PERMISSIONS} from '../../../constants/constants';
import './style.css'

function AsideMenu(props) {
    let path = props.url.location.pathname;
    const menuList = props.menuData.map(
        (menu) => {
            return (
                <li className={'profileSideNavigationList CursorPointer'}>
                    <div name={menu.name + '_' + PERMISSIONS.READ} 
                        className={'profileSideNavigationLink ' + (path === menu.link ? 'active' : '')} 
                        onClick={() => {props.onClick(menu.link)}} >
                        <i className={menu.iconName} />
                        <span>{menu.title}</span>
                    </div>
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