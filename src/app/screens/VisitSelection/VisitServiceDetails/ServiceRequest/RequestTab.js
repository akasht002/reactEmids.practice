import React from 'react';
import { TabPane } from 'reactstrap';
import { List } from './List';
import { Details } from './Details';
import { isEntityUser } from '../../../../utils/userUtility';
import { VISIT_STATUS, SERVICE_REQ_STATUS } from '../../../../constants/constants';
import { Preloader } from '../../../../components';

export const RequestTab = props => {
    let isEntity = isEntityUser();
    // let isEntitySP = isEntityServiceProvider(); //May Required in feature.
    let statusName = props.VisitServiceDetails.statusName;

    if(props.VisitServiceDetails.length === 0){
        return <Preloader />
    }else{
        return (
            <TabPane tabId='1' className='TabBody'>
                <div class="tab_content_block">
                    <div class="row">
                        {isEntity && props.VisitServiceDetails.statusId !== SERVICE_REQ_STATUS.CANCELLED &&
                            <div class="left-block-view">
                                <List
                                    list={props.visitServiceList}
                                    handelDetails={props.handelDetails}
                                    serviceRequestId={props.VisitServiceDetails.serviceRequestId}
                                />
                            </div>
                        }
                        <div class={isEntity ? "right-block-view" : "individual-spblock-full"}> 
                             <div className="btn-right-view">
                                {
                                    statusName === VISIT_STATUS.requested.keyValue &&
                                    <React.Fragment>
                                        <button test-reject='test-reject' class="btn btn-outline-primary right_statusview" onClick={() => props.handelReject(props.VisitServiceDetails.serviceRequestId)}>Reject</button>
                                        <button test-accept='test-accept' class="btn btn-primary right_statusview" onClick={() => props.handelAccept(props.VisitServiceDetails.serviceRequestId)}>Accept</button>
                                    </React.Fragment>
                                }
                                <button class="btn btn-outline-primary right_statusview" onClick={props.toggleQuestionareModalOpen}>Questionaire</button>                           
                             </div>
                            
                            {statusName === VISIT_STATUS.open.keyValue &&
                                <button test-engage='test-engage' class="btn btn-outline-primary right_statusview" onClick={() => props.handelEngage(props.VisitServiceDetails.serviceRequestId)}>Engage</button>
                            }
                                                        
                            {/* May Required in feature.*/}
                            {/* {statusName === VISIT_STATUS.engaged.keyValue && !isEntitySP &&
                                <button class="btn btn-outline-primary right_statusview" disabled={props.VisitServiceDetails.visitInProgress} onClick={() => props.handelCancel(props.VisitServiceDetails.serviceRequestId)}>Cancel Request</button>
                            } */}
                            <Details
                                details={props.VisitServiceDetails}
                                daysType={props.daysType}
                            />
                            {!isEntity &&
                                <div className="sr-feature-pic">
                                    <img src={require('../../../../assets/images/service-request-feature.png')} alt=""></img>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </TabPane>
        )
    }
}
