import React from 'react'
import { NavItem, NavLink, Nav } from 'reactstrap'
import classnames from 'classnames'
import { dashboardTabs } from './dashboardTabs';

export const Tabs = props => {
    return (
        <Nav tabs className='tab-link'>
            {dashboardTabs.map(tab =>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: props.activeTab === tab.id
                        })}
                        onClick={() => props.toggleTabs(tab.id)}
                    >
                        {tab.name}
                    </NavLink>
                </NavItem>
            )}
        </Nav>
    )
} 