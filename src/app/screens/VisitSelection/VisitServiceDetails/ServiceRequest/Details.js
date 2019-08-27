import React, { Fragment } from 'react';
import { Carousel } from '../../../../components';
import { RECURRING_PATTERN, MORNING, AFTERNOON, EVENING} from '../../../../constants/constants';
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

    let defaultCheck = ''
    let sliderTypes =
        props.details && props.details.serviceRequestTypeDetails &&
        props.details.serviceRequestTypeDetails.map(
            (serviceTypes, index) => {
                index === 0 ? (defaultCheck = true) : (defaultCheck = false)
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

    let modifiedDays = []

    props.daysType &&
        props.daysType.map(day => {
            let checkDay = {
                day: day.keyValue,
                slotDescription: []
            }
            props.details && props.details.serviceRequestSlot &&
                props.details.serviceRequestSlot.map(slotDay => {
                    if (day.id === slotDay.dayOfWeek) {
                        checkDay.slotDescription.push(slotDay.slotDescription)
                    }
                    return '';
                })
            if (checkDay.slotDescription.length > 0) {
                modifiedDays.push(checkDay)
            }
            return '';
        })

    let AvailDays =
        modifiedDays &&
        modifiedDays.map((days, index) => {
            let Count = ''
            return (
                <div className={'SPAvailContainer ' + Count + 'Available'}>
                    <div className={'SPAvailTitle'}>
                        <label className='SPAvailTitleText'>{days.day}</label>
                    </div>
                    <div className={'SPAvailContent'}>
                        <label className={'SPAvailItems ' + (days.slotDescription.includes(MORNING) ? 'active' : '')}>{MORNING}</label>
                        <label className={'SPAvailItems ' + (days.slotDescription.includes(AFTERNOON) ? 'active' : '')}>{AFTERNOON}</label>
                        <label className={'SPAvailItems ' + (days.slotDescription.includes(EVENING) ? 'active' : '')}>{EVENING}</label>
                </div>
                </div>
            )
        })

    let address =
        props.details && props.details.patient &&
        props.details.patient.patientAddresses.filter(obj => {
            return obj.isPrimaryAddress === true
        })

    return (
        <Fragment>
            <div className='ServiceContent'>
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
                    <div className='AvailabilityWidget'>
                        <div className='SPAvailWidget Summary'>
                            {AvailDays}
                        </div>
                    </div>
                    <h2 className='ServicesTitle'>Point of Service</h2>
                    <div className='SummaryContent POS mt-3 mb-4'>
                        {props.details.patient &&
                            props.details.patient
                            ? address.map(pointofservice => {
                                return (
                                    <Fragment>
                                        {pointofservice.addressTypeId &&
                                            <p>
                                                <span className="addresstype">Address Type</span>
                                                {pointofservice.addressTypeId}
                                            </p>
                                        }
                                        <p>
                                            <span>Street</span>
                                            {pointofservice.streetAddress}
                                        </p>

                                        <p>
                                            <span>City</span>
                                            {pointofservice.city}
                                        </p>

                                        <p>
                                            <span>State</span>
                                            {pointofservice.stateName}
                                        </p>

                                        <p>
                                            <span>Zip</span>
                                            {pointofservice.zipCode}
                                        </p>
                                    </Fragment>
                                )
                            })
                            : ''}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
