import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ScreenCover} from '../../../components'

class OnboardSuccess extends React.Component {
    render(){
        const menus = ["login"];
        return (
            <ScreenCover menus={menus}>
                <div className="container mainContent">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 d-flex justify-content-center">
                            <h4 className="font-weight-normal mb-4 text-success">You are successfully onboarded!!</h4>
                        </div>
                    </div>
                </div>
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
      navigateToScreenMainStack: (url) => dispatch(url),
      onLogout:()=>dispatch()
    }
  };
  
  function mapStateToProps(state) {
    return {
  
    };
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnboardSuccess));