import React from 'react'
import { SERVICE_STATES } from '../../../../../constants/constants'
import { Button } from '../../../../../components';

export const Footer = (props) => {
    return (
        <div className='bottomButton'>
            <div className='col-md-5 d-flex mr-auto bottomTaskbar'>
                <span className="bottomTaskName">Tasks</span>
                <span className="bottomTaskRange">
                    <i style={{ width: props.percentageCompletion + '%' }} className="bottomTaskCompletedRange" />
                </span>
                <span className="bottomTaskPercentage">{props.percentageCompletion && props.percentageCompletion}%</span>
            </div>
            <div className='ml-auto'>
            <Button
            classname='btn btn-primary ml-auto'
            onClick={props.onClickNext}
            disable={props.visitStatus === SERVICE_STATES.IN_PROGRESS || props.visitStatus === SERVICE_STATES.YET_TO_START}
            label={'Next'} />
                </div>
        </div>
    )
}