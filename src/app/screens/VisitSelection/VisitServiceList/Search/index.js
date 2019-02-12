import React,{Fragment} from "react";

function Search(props){
    return(
        <Fragment>
        <span className='ProfileIconSearch' onClick={props.toggleSearch}/>
        <div className={'ProfileSearchContainer form-group ' + props.searchOpen}>
        <form onSubmit={(e)=>props.handleSearchData(e)}>
                <input className='form-control' type='text' value={props.searchKeyword} 
                 onChange={(e)=>props.handleSearchkeyword(e)} placeholder='Type here to Search'
                />
                <input className='btn btn-primary' type='button' onClick={(e)=>props.handleSearchData(e)}
                 value="Search"/>
                <i className='closeBtn' onClick={props.toggleSearch}/>
            </form>
        </div>
        </Fragment>
    )
}
export default Search;