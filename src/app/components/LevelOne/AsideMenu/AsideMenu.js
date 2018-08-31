import React from "react";
import Select from "react-select"
import {Link} from "react-router-dom"

import './style.css'

// const images = require.context('primary_path/assets/img', true);
// const imagePath = (name) => images(name, true);
 function AsideMenu(props) {
        const menuList = props.menuData.map(
            (menu) => {
                return (
                    <li className='profileSideNavigationList'>
                        <Link className='profileSideNavigationLink' to={menu.link}><i className={menu.iconName}/>
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