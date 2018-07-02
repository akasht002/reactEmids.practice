import React from 'react';
import './styles.css';

const Footer = ({onPress}) =>{
    return(
        <footer className="page-footer font-small cyan darken-3 mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 py-5">
                        <div className="mb-5 flex-center">
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2018 Copyright: 
                <a href="https://www.navvishealthcare.com"> NavvisHelthcare.com</a>
            </div>
        </footer>
    );
}

export default Footer;