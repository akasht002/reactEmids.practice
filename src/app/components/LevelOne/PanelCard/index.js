import React from 'react';
import './styles.css';


const PanelCard = (props) => {
    return (
        <form class="form my-2 my-lg-0" >
            <div class="form-group">
                {props.children}
            </div>
        </form>
    );
};


export default PanelCard;