import React from 'react';

class Preloader extends React.Component {
    render() {
        return(
            <div className="preloader">
                <img alt="preloader" src={require('../../../assets/images/Spinner-1s-100px.gif')} width="50%" height="50%" className="preloader-img"></img>
            </div>
        );
    }
}

export default Preloader;