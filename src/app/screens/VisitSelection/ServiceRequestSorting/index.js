import React, { Component } from "react";
import "./style.css";

function  Sorting(props){
    return (<div>
            
            <span>SORT BY</span> 
            <div>
                <div
                    className={props.posted?'defaultCheck':'checked'}
                    onClick={() => props.onSortChange(true, null)}>
                    Posted Date
                </div>
                <div
                    className={!props.posted?'defaultCheck':'checked'}
                    onClick={() => props.onSortChange(false, null)}>
                    Visit Date
                </div>
                <div
                    className={props.newest?'defaultCheck':'checked'}
                    onClick={() => props.onSortChange(null, true)}>
                    Newest  
                </div>
                <div
                    className={!props.newest?'defaultCheck':'checked'}
                    onClick={() => props.onSortChange(null, false)}>
                    Oldest
                </div>
                
            </div>
                        
        </div>
    
)}

export default Sorting;