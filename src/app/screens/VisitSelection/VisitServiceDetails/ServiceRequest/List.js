import React, { Fragment } from 'react';
import { Item } from './Item'

export const List = props => {
    return (
        <Fragment>
            {
                props.list.map(item => {
                    return (
                        <Item
                            item={item}
                            handelDetails={props.handelDetails}
                        />
                    )
                })
            }
        </Fragment>
    )
}
