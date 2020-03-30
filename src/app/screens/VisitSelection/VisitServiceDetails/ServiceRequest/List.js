import React, { Fragment } from 'react';
import { Item } from './Item'

export const List = props => {
    return (
        <Fragment>
            {
                props.list.map((item,index) => {
                    return (
                        <Item
                            key={`serviceRequestListId_${index}`}
                            item={item}
                            handelDetails={props.handelDetails}
                            serviceRequestId={props.serviceRequestId}
                        />
                    )
                })
            }
        </Fragment>
    )
}
