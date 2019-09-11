import React from 'react';
import Moment from 'react-moment';
import { DATE_FORMATS } from '../../../../constants/constants';
import { getServiceTypeImage, getFields } from '../../../../utils/validations';

export const Item = props => {
    let serviceTypeId = props.item.serviceTypes && props.item.serviceTypes.length > 0 && props.item.serviceTypes[0].serviceTypeId;
    let serviceImage = getServiceTypeImage(serviceTypeId);
    return (
        <div onClick={() => props.handelDetails(props.item.serviceRequestId)}>
            <div class="card_view_block">
                <div class={props.serviceRequestId === props.item.serviceRequestId ? "card_view_visit active-card-view" : "card_view_visit"}>
                    <div class="visit_iconview">
                        <img src={require(`../../../../assets/ServiceTypes/${serviceImage}`)} className="ServiceImage" alt="categoryImage" />
                    </div>
                    <div class="service_status_name">
                        <div class="cate_name">
                            <span>
                                {props.item.serviceTypes &&
                                    getFields(
                                        props.item.serviceTypes,
                                        'serviceTypeDescription'
                                    )}
                            </span>
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
