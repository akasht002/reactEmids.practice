import React,{Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input ,ProfileModalPopup, ModalPopup } from "../../../components";
import "./styles.css";

class WorkHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){
        return(
            <h1>WorkHistory</h1>
        )
    }


}

function mapDispatchToProps(dispatch) {
    return {

    }
};

function mapStateToProps(state) {
    return {
        
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkHistory));