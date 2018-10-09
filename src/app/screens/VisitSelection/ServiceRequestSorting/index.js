import React from "react";
import "./style.css";

function Sorting(props) {
    return (

        <div>

            <div className="dropdown sort-block">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" onClick={(e) => props.toggleclass(e)}><span> Sort</span> </button>
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => props.onSortChange(true, null)}>Posted Date</div>
                    <div className="dropdown-item" onClick={() => props.onSortChange(false, null)}>Visit Date</div>
                    <hr></hr>
                    <div className="dropdown-item" onClick={() => props.onSortChange(null, true)}>Newest</div>
                    <div className="dropdown-item" onClick={() => props.onSortChange(null, false)}>Oldest</div>
                </div>
            </div>


        </div>



    )
}

export default Sorting;