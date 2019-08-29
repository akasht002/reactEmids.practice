import React, { Fragment } from "react";
import { Preloader, CoreoPagination } from '../../../../../components';
import { feedBackAlert } from './gridHeader'
import {Grid} from '../Grid/Grid'
import { NO_RECORDS_FOUND } from '../../../../../constants/constants'

export const FeedbackAlert = (props) => {
    return (
        <Fragment>
            {props.isLoaded && <Preloader />}
            <Grid
                data={props.feedbackServiceVisits}
                header={feedBackAlert}
                impersinate={props.goToVisitSummary}
                noRecordsFound={NO_RECORDS_FOUND}
            />
            <CoreoPagination
                activePage={props.activePageFeedback}
                itemsCountPerPage={10}
                totalItemsCount={props.pageCount}
                pageRangeDisplayed={10}
                onChange={props.pageNumberChangeFeedback}
                itemClass='PaginationItem'
                itemClassFirst='PaginationIcon First'
                itemClassPrev='PaginationIcon Prev'
                itemClassNext='PaginationIcon Next'
                itemClassLast='PaginationIcon Last'
            />
        </Fragment>
    )

}


export default FeedbackAlert;