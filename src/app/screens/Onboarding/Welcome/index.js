import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ScreenCover, CarouselComp} from '../../../components'

const CarouselItems = [
    {
        src: 'https://dummyimage.com/640x480',
        altText: 'Live Health Councelling',
        caption: 'Connect with our guides with Telehealth and get solutions on your problem in few steps'
    },
    {
        src: 'https://dummyimage.com/640x480',
        altText: 'Live Health Councelling',
        caption: 'Connect with our guides with Telehealth and get solutions on your problem in few steps'
    },
    {
        src: 'https://dummyimage.com/640x480',
        altText: 'Live Health Councelling',
        caption: 'Connect with our guides with Telehealth and get solutions on your problem in few steps'
    },
    {
        src: 'https://dummyimage.com/640x480',
        altText: 'Live Health Councelling',
        caption: 'Connect with our guides with Telehealth and get solutions on your problem in few steps'
    }
];

class Welcome extends React.Component {
    render(){
        const menus = ["login"];
        return (
            <ScreenCover menus={menus}>
                <div className="container mainContent">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8 d-flex justify-content-center">
                            <CarouselComp CarouselItems={CarouselItems} />
                        </div>
                    </div>
                </div>
                <div className="container-fluid bottomFooterContent p-3">
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <Link className="text-uppercase btn btn-outline-primary" to="verifyemail">Skip and Get started</Link>
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
  }
  
  function mapStateToProps(state) {
    return {
  
    };
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
  