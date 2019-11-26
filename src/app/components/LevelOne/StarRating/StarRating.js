import React, { Fragment } from 'react';
import './styles.css';
import { ratingValues } from './ratingValues'

const StarRating = props => {
    return (
        <div className="FeedbackContent">
            <fieldset className="rating" onChange={props.handleSelectedRating}>
                {ratingValues.map(rating =>
                    <Fragment>
                        <input type="radio" id={rating.id} name="rating" value={rating.value} checked={props.rating === parseInt(rating.value, 10)} />
                        <label className="full" htmlFor={rating.id} />
                    </Fragment>
                )}
            </fieldset>
        </div>
    )
}

export default StarRating;

