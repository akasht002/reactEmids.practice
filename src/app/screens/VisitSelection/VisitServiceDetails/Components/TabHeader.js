import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export const TabHeader = props => {
    return (
        <Nav tabs className='tab_view_list'>
            <li>
                <span onClick={() => props.goBack()}>
                    <a class="back_btn"></a>
                </span>
            </li>
            {
                props.list.map(item => {
                    return (
                        <NavItem>
                            <NavLink
                                className={classnames({ 'active-tabview': props.activeTab === item.id })}
                                onClick={() => { props.toggle(item.id) }}
                            >
                                {item.label}
                            </NavLink>
                        </NavItem>
                    )
                })
            }
        </Nav>
    )
}
