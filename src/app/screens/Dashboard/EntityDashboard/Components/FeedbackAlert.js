import React, { Fragment } from "react";
import ReactTable from 'react-table';
import moment from 'moment';
import { Preloader, CoreoPagination } from '../../../../components';
import { DATE_FORMAT } from '../../../../constants/constants';

export const FeedbackAlert = (props) => {
    const columnsData = [
        {
            Header: 'SR #',
            id: 'serviceRequestNumber',
            accessor: 'serviceRequestNumber',
            width: 'auto!important',
            minWidth: '4%',
            sortable: false
        },
        {
            Header: 'Service Category',
            id: 'serviceCategory',
            accessor: 'serviceCategory',
            Cell: row => <span title={row.value}>{row.value && row.value}</span>,
            width: 'auto!important',
            minWidth: '15%',
            sortable: false
        },
        {
            Header: 'Service Type',
            id: 'serviceTypes',
            accessor: 'serviceTypes',
            Cell: row => <span title={row.value.join(', ')}>{row.value && row.value.join(', ')}</span>,
            width: 'auto!important',
            minWidth: '15%',
            sortable: false
        },
        {
            Header: 'Visit Date',
            id: 'visitDate',
            accessor: 'visitDate',
            Cell: row => (moment(row.value && row.value).format(DATE_FORMAT)),
            sortable: false,
            filterable: false,
            width: 'auto!important',
            minWidth: '6%'
        },
        {
            Header: 'Visit #',
            id: 'serviceRequestVisitNumber',
            accessor: 'serviceRequestVisitNumber',
            sortable: false,
            filterable: false,
            width: 'auto!important',
            minWidth: '4%'
        },
        {
            Header: 'Actions',
            id: 'actions',
            width: 'auto!important',
            minWidth: '4%',
            Cell: row => (
                <i className='iconLogInto'
                    onClick={e => { props.goToVisitSummary(row.original) }
                    }
                />)
        }
    ]

    return (
        <Fragment>
            {props.isLoaded && <Preloader />}
            <ReactTable
                pageSize={props.feedbackServiceVisits.length}
                data={props.feedbackServiceVisits}
                columns={columnsData}
                showPagination={false}
                defaultSorted={[]}
                className='tableview-feedbackalert'
                style={{
                    minHeight: 'calc(100vh - 240px)',
                    maxHeight: 'calc(100vh - 380px)'
                }}
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