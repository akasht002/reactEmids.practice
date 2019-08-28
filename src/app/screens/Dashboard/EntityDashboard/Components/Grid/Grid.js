import React, { Fragment } from 'react';

export const Grid = props => {
    return (
        <Fragment>
            <table className="table-responsive individuals-tableblock" cellpadding="4" cellspacing="4">
                <thead>
                    {
                        Object.keys(props.header).map(key => {
                            return <th>{props.header[key]}</th>
                        })
                    }
                </thead>
                <tbody>
                    {props.data.length > 0 ? props.data.map(item => {
                        return <tr>
                            {Object.keys(props.header).map(key => {
                                switch (key) {
                                    case 'button':
                                        return <td><span className="life-map-btn"><button className="btn btn-outline-primary">Life Map</button></span></td>
                                    case 'icon':
                                        return <td><span className="actions-block"><i className="iconLogInto" onClick={() => props.impersinate(item)}></i></span></td>
                                    case 'task':
                                        return <td>
                                            <div className='SPTableTask'>
                                                <div className='SPTableTaskWidget'>
                                                    <span className='SPTableTaskBarDown'>
                                                        <span
                                                            className='SPTableTaskBarUp'
                                                            style={{
                                                                width: `${item[key]}%`
                                                            }}
                                                        />
                                                    </span>
                                                </div>
                                                {`${item[key]} %`}
                                            </div></td>
                                    default:
                                        return <td>{item[key]}</td>
                                }
                            })}
                        </tr>
                    }) : <span className="no-recoord-table">{props.noRecordsFound}</span>}
                </tbody>
            </table>
        </Fragment>
    )
}



