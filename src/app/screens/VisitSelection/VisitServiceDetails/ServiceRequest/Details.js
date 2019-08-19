import React, { Fragment } from 'react';
import { Carousel } from '../../../../components';
import {
    RECURRING_PATTERN,
} from '../../../../constants/constants';
import Moment from 'react-moment';

export const Details = props => {

    function recurringPattern() {
        if (props.details.occurence !== 0) {
            return '- ' + props.details.occurence + ' occurrences'
        } else {
            return (
                <React.Fragment>
                    &nbsp;
                    -
                    &nbsp;
              <Moment format='MM/DD/YYYY'>
                        {props.details.endDate}
                    </Moment>
                </React.Fragment>
            )
        }
    }

    let sliderTypes =
        props.details && props.details.serviceRequestTypeDetails &&
        props.details.serviceRequestTypeDetails.map(
            (serviceTypes, index) => {
                let catNum = index + 1
                return (
                    <div className='ServiceTypeList'>
                        <input
                            id={serviceTypes.serviceRequestTypeDetailsId}
                            type='radio'
                            defaultChecked={true}
                            className='ServiceTypeInput'
                            name='serviceType'
                            value={catNum}
                            // onChange={e => this.selectedServiceType(e)}
                        />
                        <label
                            className='ServiceTypeLink'
                            htmlFor={serviceTypes.serviceRequestTypeDetailsId}
                        >
                            <span
                                className={`ServiceTypeIcon SPIconServices${serviceTypes.serviceTypeId}`}
                            />
                            <div className='serviceTypeDesc'>
                                <span className='serviceName'>
                                    {serviceTypes.serviceTypeDescription}
                                </span>
                            </div>
                        </label>
                        <span className='ServiceIndicatorBottom' />
                    </div>
                )
            }
        )

    return (
        <Fragment>
            <form className='ServiceContent'>
                <div className='ServiceCategoryContent'>
                    <h2 className='ServicesTitle'>Service Category</h2>
                    <p className='ScheduleTypeTitle'>
                        {props.details.serviceCategoryDescription}
                    </p>
                    <h2 className='ServicesTitle mt-4'>Service Types</h2>
                    <div className='ServiceType visit-srq-slider WhiteBG'>
                        <div className='ServiceTypesSlider Summary'>
                            <Carousel className="ServiceTypesSlider">
                                {sliderTypes}
                            </Carousel>
                        </div>
                    </div>
                    <h2 className='ServicesTitle'>
                        Additional Information
                          </h2>
                    <p className='AdditionInfo mt-3 mb-4'>
                        {props.details.serviceRequestDescription}
                    </p>
                    <h2 className='ServicesTitle'>
                        Schedule and Frequency
                          </h2>
                    <div className='ContentTitle Summary mt-3 mb-4'>
                        <span>
                            <div className='ContentTitle Summary mt-3 mb-4'>
                                <span className='ContentTitle Summary'>
                                    {props.details
                                        .recurringPatternDescription ===
                                        RECURRING_PATTERN
                                        ? props.details
                                            .recurringPatternDescription + ' '
                                        : 'Recurring '}
                                    Schedule
                            </span>
                                <span>
                                    {props.details.startDate &&
                                        <Moment format='MM/DD/YYYY'>
                                            {props.details.startDate}
                                        </Moment>}

                                    {props.details
                                        .recurringPatternDescription !==
                                        RECURRING_PATTERN &&
                                        recurringPattern()
                                    }
                                </span>
                                {props.details
                                    .recurringPatternDescription !==
                                    RECURRING_PATTERN &&
                                    <React.Fragment>
                                        <span className='ContentTitle Summary'>
                                            Recurring Pattern
                                </span>
                                        <span>
                                            {
                                                props.details
                                                    .recurringPatternDescription
                                            }
                                        </span>
                                    </React.Fragment>}

                            </div>
                        </span>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
