import React from "react";

function RowPerPage(props){
        return (
            <div className="select-wrap-dahboard">
                <span>Rows Per Page</span>
                <select onChange={e => props.pageSizeChange(Number(e.target.value))} value={props.pageSize}>
                    {props.pageSizeOption.map((option, i) => (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
}

export default RowPerPage;