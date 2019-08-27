import React from 'react';
import Moment from 'react-moment';
import { DATE_FORMATS } from '../../../../constants/constants';

export const Item = props => {
    return (
        <div onClick={() => props.handelDetails(props.item.serviceRequestId)}>
            <div class="card_view_block">
                <div class={props.serviceRequestId === props.item.serviceRequestId ? "card_view_visit active-card-view"  : "card_view_visit"}>
                    <div class="visit_iconview">
                        <img alt="" src="images/ADL Ambulation & Mobility.svg" />
                    </div>
                    <div class="service_status_name">
                        <div class="cate_name">
                            {props.item.serviceTypes.map(type => {
                                return (
                                    <span>{type.serviceTypeDescription}</span>
                                )
                            })}
                        </div>
                        <div class="posted_dateview">
                            <span class="daywise_post">{props.item.recurringPattern}</span>
                            <span class="separater_view">|</span>
                            <span class="datewise_post">Posted on <Moment format={DATE_FORMATS.monDD}>{props.item.postedOn}</Moment></span>
                        </div>
                    </div>

                    <div class="status_view_arrow">
                        <div class="label_viewstatus">
                            <span class="btn btn-hired">{props.item.serviceRequestStatus}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
