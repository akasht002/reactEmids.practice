import React from 'react'
import './style.css'

function Sorting (props) {
  return (
    <div>

      <div className='dropdown SortBlock SortDropDown'>
        <button
          type='button'
          className='btn btn-secondary dropdown-toggle'
          data-toggle='dropdown'
          onClick={e => props.toggleclass(e)}
        >
          Sort
        </button>
        <div className='dropdown-menu SortMenu'>
          <div
           className={props.PostedDate ? 'dropdown-item SortItem active' :'dropdown-item SortItem'}
            onClick={(e) => props.onSortChange(e,true, null)}
          >
            Posted Date
          </div>
          {/* <div
            className={props.VisitDate ? 'dropdown-item SortItem active' :'dropdown-item SortItem'}
            onClick={(e) => props.onSortChange(e,false, null)}
          >
            Visit Date
          </div> */}
          <hr />
          <div
            className={props.Newest ? 'dropdown-item SortItem active' :'dropdown-item SortItem'}
            onClick={(e) => props.onSortChange(e,null, true)}
          >
            Newest
          </div>
          <div
            className={props.Oldest ? 'dropdown-item SortItem active' :'dropdown-item SortItem'}
            onClick={(e) => props.onSortChange(e,null, false)}
          >
            Oldest
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sorting
