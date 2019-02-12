import React,{Fragment} from "react";

function Search(props){
    return(
        <Fragment>
        <span className='ProfileIconSearch' onClick={props.toggleSearch}/>
        <div className={'ProfileSearchContainer form-group ' + props.searchOpen}>
            <div>
                <input className='form-control' type='text' value={props.searchKeyword} 
                 onChange={(e)=>props.handleSearchkeyword(e)} placeholder='Type here to Search'  onKeyPress={(e) =>props.handleSearchkeywordPress(e)}
                />
                <input className='btn btn-primary' type='button' onClick={()=>props.handleSearchData()}
                 value="Search"/>
                <i className='closeBtn' onClick={props.toggleSearch}/>
            </div>
        </div>
        </Fragment>
    )
}
export default Search;