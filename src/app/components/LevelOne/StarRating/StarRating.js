import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';

class StarRating extends React.Component {
    render() {
        return (
            <div className="FeedbackContent">
                <fieldset className="rating" onChange={(e) => this.handleSelectedRating(e)}>
                    <input type="radio" id="star5" name="rating" value="5" />
                    <label className="full" htmlFor="star5" />
                    <input type="radio" id="star4" name="rating" value="4" />
                    <label className="full" htmlFor="star4" />
                    <input type="radio" id="star3" name="rating" value="3" />
                    <label className="full" htmlFor="star3" />
                    <input type="radio" id="star2" name="rating" value="2" />
                    <label className="full" htmlFor="star2" />
                    <input type="radio" id="star1" name="rating" value="1" />
                    <label className="full" htmlFor="star1" />
                </fieldset>
            </div>
        );
    }
};

export default withRouter(connect(StarRating));

