import React, { Fragment } from 'react';
import { Carousel } from '../../../../components';

import { ServiceCategory } from '../Components/ServiceCategory';
import { RECURRING_PATTERN, MORNING, AFTERNOON, EVENING, DATE_FORMATS} from '../../../../constants/constants';
import Moment from 'react-moment';
import { unique } from '../../../../utils/arrayUtility';

export const getServiceTypeSlider = (props) =>{    
        return props.details && props.details.serviceRequestTypeDetails &&
        props.details.serviceRequestTypeDetails.map(
            (serviceTypes, index) => {
                let catNum = index + 1
                return ( serviceTypes.serviceCategoryId === props.checkedServiceCategoryId &&
                    <div className='ServiceTypeList' key={`ServiceTypeListId_${index}`}>
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
    }       

export const Details = props => {
    let serviceCategories = props.details && unique(props.details.serviceCategories,"serviceCategoryDescription").join(', ')

    function recurringPattern() {
        if (props.details.occurence !== 0) {
            return `- ${props.details.occurence} occurrences`;
        } else {
            return (
                <React.Fragment>
                    &nbsp;
                    -
                    &nbsp;
              <Moment format= {DATE_FORMATS.mm_dd_yyy}>
                        {props.details.endDate}
                    </Moment>
                </React.Fragment>
            )
        }
    }

   
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

    let availDays =
        modifiedDays &&
        modifiedDays.map((days, index) => {
            return (
                <div className={'SPAvailContainer Available'} key={`SPAvailContainer AvailableId_${index}`}>
                    <div className={'SPAvailTitle'}>
                        <label className='SPAvailTitleText'>{days.day}</label>
                    </div>
                    <div className={'SPAvailContent theme-primary-light'}>
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
                    <h2 className='ServicesTitle theme-primary'>Service Category</h2>
                    <p className='ScheduleTypeTitle'>
                        {serviceCategories}
                    </p>
                    <div className="d-block">
                        <ServiceCategory
                            categoryList={props.details.serviceCategories}
                            handleServiceCategory={props.handleServiceCategory}
                            checkedServiceCategoryId={props.checkedServiceCategoryId}
                        />
                    </div>
                   
                    <h2 className='ServicesTitle theme-primary'>Service Types</h2>
                    <div className='ServiceType visit-srq-slider WhiteBG'>
                        <div className='ServiceTypesSlider Summary'>
                            <Carousel className="ServiceTypesSlider">
                                {getServiceTypeSlider(props)}
                            </Carousel>
                        </div>
                    </div>
                    
                    <h2 className='ServicesTitle theme-primary'>
                        Additional Information
                          </h2>
                    <p className='AdditionInfo  mb-4'>
                        {props.details.serviceRequestDescription}
                    </p>
                    <h2 className='ServicesTitle theme-primary'>
                        Schedule and Frequency
                          </h2>
                    <div className='ContentTitle Summary'>
                        <span>
                            <div className='ContentTitle Summary mb-4'>
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
                            {availDays}
                        </div>
                    </div>
                    <h2 className='ServicesTitle theme-primary'>Point of Service</h2>
                    <div className='SummaryContent POS mb-4'>
                        {props.details.patient &&
                            props.details.patient
                            ? address.map((pointofservice,index) => {
                                return (
                                    <Fragment  key={`addresstypeId_${index}`}>
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
