import React, { Fragment } from 'react';
import { Header } from './Header';
import { Body } from './Body';

export const Grid = props => {
    return (
        <Fragment>
            <table className={`table-responsive individuals-tableblock ${props.header.className}`} cellpadding="4" cellspacing="4">
                <Header {...props} />
                <Body {...props} />
            </table>
        </Fragment>
    )
}