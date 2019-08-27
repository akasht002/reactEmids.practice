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
                    {props.data.map(item => {
                        return <tr>
                            {Object.keys(props.header).map(key => {
                                if (key === "button") {
                                    return <td><span className="life-map-btn"><button className="btn btn-outline-primary">Life Map</button></span></td>
                                }
                                else if (key === "icon") {
                                    return <td><span className="actions-block"><i className="iconLogInto" onClick={() => props.impersinate(item)}></i></span></td>
                                }
                                else if (key === 'task') {
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
                                }
                                else {
                                    return <td>{item[key]}</td>
                                }
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}



