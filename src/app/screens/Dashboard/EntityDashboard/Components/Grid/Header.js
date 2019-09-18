import React from 'react';

export const Header = props => {
    return (
        <thead>
            {
                Object.keys(props.header).map(key => {
                    return <th>{props.header[key]}</th>
                })
            }
        </thead>
    )
}