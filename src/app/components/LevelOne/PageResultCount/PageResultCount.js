import React from "react";

export const PageResultCount = props => {
    return (
        <div className="-pagination rowPerPage-pagniation pagination-block"><div class="-center"><span className="-pageInfo p-0">
            {"Showing "}
            <span className="-rowMin">{props.rowMin}</span>
            {" - "}
            <span className="-rowMax">{props.rowMax}</span>
            {" of "}
            <span className="-rowCount">{props.rowCount}</span>
            {" results"}
        </span></div></div>
    )
}