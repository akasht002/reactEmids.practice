import React from 'react'

export const Tabs = props => {
    return (
        <div className="FilterMiddleContent FilterMiddleLeft">
            {props.filterTabs.map(tab =>
                <span className={props.activeTab === tab.id ? 'active' : ''}
                    onClick={() => {
                        props.toggleTabs(tab.id);
                    }}>
                    {tab.name}
                </span>
            )}
        </div>)
} 