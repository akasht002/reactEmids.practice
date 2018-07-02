import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';

class ScreenCover extends React.Component {
    render() {
        return(
            <section className="d-flex">
               {this.props.children}
            </section>
        );
    }
};

ScreenCover.propTypes = {
    children: PropTypes.any,
    backgroundColor: PropTypes.string
}

function mapDispatchToProps(dispatch) {
    return{
      //onLogOut: () => dispatch(onLogOut)
    }
}

function mapStateToProps(state) {
    return {
  
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenCover));