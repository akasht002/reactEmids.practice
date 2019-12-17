import React, { Fragment } from "react";
import { PageResultCount } from "../PageResultCount/PageResultCount";

function RowPerPage(props) {
    return (
        <Fragment>
            <div className="select-wrap-dahboard">
                <span>Rows Per Page</span>
                <select test-select="test-select" onChange={e => props.pageSizeChange(Number(e.target.value))} value={props.pageSize}>
                    {props.pageSizeOption.map((option, i) => (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            {
                props.isEnabled &&
                <PageResultCount {...props} />
            }
        </Fragment>
    )
}

export default RowPerPage;