import React,{Fragment} from "react";

function Search(props){
    return(
        <Fragment>
        <span className='profile-icon-search' onClick={props.toggleSearch}/>
        <div className={'search-container-block ' + props.searchOpen}>
            <form onSubmit={(e)=>props.handleSearchData(e)} className="form-block">
                <input className='form-control' type='text' value={props.searchKeyword} 
                 onChange={(e)=>props.handleSearchkeyword(e)} placeholder='Enter keyword for global search'  //onKeyPress={(e) =>props.handleSearchkeywordPress(e)}
                 maxLength='256'
                />
                <input className='btn btn-primary' type='button' onClick={(e)=>props.handleSearchData(e)}
                 value="Search"/>
                <i className='close-btn' onClick={() => props.closeSearch()}/>
            </form>
        </div>
        </Fragment>
    )
}
export default Search;