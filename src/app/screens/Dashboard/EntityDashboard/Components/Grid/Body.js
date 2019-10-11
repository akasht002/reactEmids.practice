import React from 'react';
import { HEADER_ACTIONS } from './constants';
import { omit } from 'lodash'

export const Body = props => {
    let updatedHeader = omit(props.header,[HEADER_ACTIONS.className])
    return (
        <tbody>
            {props.data.length > 0 ? props.data.map(item => {
                return <tr>
                    {Object.keys(updatedHeader).map(key => {
                        switch (key) {
                            case HEADER_ACTIONS.button:
                                return <td><span className="life-map-btn"><button className="btn btn-outline-primary">Life Map</button></span></td>
                            case HEADER_ACTIONS.icon:
                                return <td><span className="actions-block"><i className="iconLogInto" onClick={() => props.impersinate(item)}></i></span></td>
                            case HEADER_ACTIONS.task:
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
                                return <td title={item[key]}>{item[key]}</td>
                        }
                    })}
                </tr>
            }) : <span className="no-recoord-table">{props.noRecordsFound}</span>}
        </tbody>
    )
}