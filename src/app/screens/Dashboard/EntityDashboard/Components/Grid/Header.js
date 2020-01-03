import React from 'react';
import { omit } from 'lodash'
import { HEADER_ACTIONS } from './constants';

export const Header = props => {
    let data = omit(props.header,[HEADER_ACTIONS.className])
    return (
        <thead>
            {
                Object.keys(data).map(key => {
                    return <th>{data[key]}</th>
                })
            }
        </thead>
    )
}