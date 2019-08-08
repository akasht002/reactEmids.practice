import React from 'react';
import { TabPane } from 'reactstrap';
import { List } from './List';
import { Details } from './Details';

export const RequestTab = props => {
    return (
        <TabPane tabId='1' className='TabBody'>
            <div class="tab_content_block">
                <div class="row">
                    <div class="left-block-view">
                        <a class="filter_viewlink">Filters</a>
                        <List
                            list={props.visitServiceList}
                            handelDetails={props.handelDetails}
                        />
                    </div>
                    <div class="right-block-view">
                        <span class="right_statusview">Engage</span>
                        <Details
                            details={props.VisitServiceDetails}
                        />
                    </div>
                </div>
            </div>
        </TabPane>
    )
}
