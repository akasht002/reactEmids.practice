import React from 'react';
import { TabPane } from 'reactstrap';
import { List } from './List';
import { Details } from './Details';
import { isEntityUser, isEntityServiceProvider } from '../../../../utils/userUtility';
import { VISIT_STATUS } from '../../../../constants/constants';

export const RequestTab = props => {
    let isEntity = isEntityUser();
    let isEntitySP = isEntityServiceProvider();
    let statusName = props.VisitServiceDetails.statusName;
    return (
        <TabPane tabId='1' className='TabBody'>
            <div class="tab_content_block">
                <div class="row">
                    {isEntity &&
                        <div class="left-block-view">
                            <List
                                list={props.visitServiceList}
                                handelDetails={props.handelDetails}
                            />
                        </div>
                    }
                    <div class="right-block-view">
                        {statusName === VISIT_STATUS.requested.keyValue &&
                            <div>
                                <button class="right_statusview" onClick={() => props.handelReject(props.VisitServiceDetails.serviceRequestId)}>Reject</button>
                                <button class="right_statusview" onClick={() => props.handelAccept(props.VisitServiceDetails.serviceRequestId)}>Accept</button>
                            </div>
                        }
                        {statusName === VISIT_STATUS.open.keyValue &&
                            <button class="right_statusview" onClick={() => props.handelEngage(props.VisitServiceDetails.serviceRequestId)}>Engage</button>
                        }
                        {statusName === VISIT_STATUS.engaged.keyValue && !isEntitySP &&
                            <button class="right_statusview" disabled={props.VisitServiceDetails.visitInProgress} onClick={() => props.handelCancel(props.VisitServiceDetails.serviceRequestId)}>Cancel Request</button>
                        }
                        <Details
                            details={props.VisitServiceDetails}
                        />
                    </div>
                </div>
            </div>
        </TabPane>
    )
}
