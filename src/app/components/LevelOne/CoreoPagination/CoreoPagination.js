import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import './style.css';

class CoreoPagination extends Component {
    render() {
        return(
            <div className='col-md-12 p-0 CoreoPagination'>
                <Pagination
                    activePage={this.props.activePage}
                    itemsCountPerPage={this.props.itemsCountPerPage}
                    totalItemsCount={this.props.totalItemsCount}
                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                    onChange={this.props.onChange}
                    itemClass='PaginationItem'
                    itemClassFirst='PaginationIcon First'
                    itemClassPrev='PaginationIcon Prev'
                    itemClassNext='PaginationIcon Next'
                    itemClassLast='PaginationIcon Last'
                />
            </div>
        );
    }
}

export default CoreoPagination;