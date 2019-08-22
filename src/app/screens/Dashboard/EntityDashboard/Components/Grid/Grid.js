import React, { Fragment } from 'react';
import Moment from 'react-moment';

export const Grid = props => {
    return (
        <Fragment>
            <table className="table-responsive individuals-tableblock" cellpadding="4" cellspacing="4">
                <thead>
                    {props.header.map(item => {
                        return <th>{item.label}</th>
                    })}
                </thead>
                <tbody>
                {props.data.map(item => {
                    return <tr>
                        <td>{item.mpi}</td>
                        <td>{`${item.firstName} ${item.lastName}`}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>{item.contracts}</td>
                        <td>{item.attributedProviders}</td>
                        <td>{item.cohorts}</td>
                        <td><span className="life-map-btn"><button className="btn btn-outline-primary">Life Map</button></span></td>
                        <td><span className="actions-block"><i className="iconLogInto"></i></span></td>
                    </tr>
                })}
                </tbody>
            </table>
        </Fragment>
    )
}



