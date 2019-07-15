import React, { Fragment } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { SelectField, Select, Item } from '@zendeskgarden/react-select'
import _ from 'lodash'
import { getFieldsNoSeperater } from '../../../utils/validations'
import { ORG_SERVICE_PROVIDER_TYPE_ID, ENTITY_USER } from '../../../constants/constants';
import { isEntityServiceProvider, getUserInfo } from '../../../utils/userUtility';
import { isFutureDay } from '../../../utils/dateUtility'
import { SERVICE_VISIT_STATUS,START_VISIT } from '../../../redux/constants/constants';
import { DATE_FORMATS } from '../../../constants/constants'

export const ShowIndicator = props => {
  if (props.count === 1) {
    return <React.Fragment>
      <i className='indicator'/> 
      </React.Fragment>
  } else if (props.count === 2) {
    return (
      <React.Fragment> 
        <i className='indicator' /><i className='indicator' />
      </React.Fragment>
    )
  } else if (props.count >= 3) {
    return (
      <React.Fragment>
        <i className='indicator' />
        <i className='indicator' />
        <i className='indicator' />
      </React.Fragment>
    )
  } else {
    return ' '
  }
}

export const splitSlots = (togglePersonalDetails, data, type, handleClick, props) => {
  let newData = _.reduce(
    data,
    function (arr, el) {
      if (el.visitDate === type) {
        arr.push(el)
      }
      return arr
    },
    []
  )

  return serviceCalendar(togglePersonalDetails, newData, handleClick, props)
}

export const onClickServiceCalendarItems = (props,conversations) => {
  (!isFutureDay(conversations.visitDate) && conversations.visitStatusId === START_VISIT) ? '' : props.goToServiceVisits(conversations)
}

export const serviceCalendar = (
  togglePersonalDetails,
  newData,
  handleClick,
  props
) => {
  if (newData.length > 0) {
    return newData.map((conversations, index) => {  
      let visitList = SERVICE_VISIT_STATUS.filter((data) =>{
        return data.id === conversations.visitStatusId
    })
    let list = visitList.length > 0 ? visitList[0] : SERVICE_VISIT_STATUS[0]
      let options = [];
      
      if(isEntityServiceProvider()){
        options = [
          <Item disabled={(!isFutureDay(conversations.visitDate) && conversations.visitStatusId === START_VISIT)} className='ListItem CTDashboard' key='item-4' 
            onClick={(e) => onClickServiceCalendarItems(props,conversations)}>
            <i className={conversations.visitStatusId ? list.iconImage: list.iconImage} /> {list.label}
          </Item>,
          <Item className='ListItem CTDashboard' key='item-1'
          onClick={(e) => { props.handlePhoneNumber(conversations) }}>
            <i className='iconPhone' /> Phone Call
          </Item>
        ];
      } else {
        const commonOptions = [<Item className='ListItem CTDashboard' key='item-1'
        onClick={(e) => { props.handlePhoneNumber(conversations) }}>
          <i className='iconPhone' /> Phone Call
        </Item>,
        <Item className='ListItem CTDashboard' key='item-2'
          onClick={(e) => { props.onClickConversation(conversations) }}>
          <i className='iconConversation' /> Conversation
      </Item>,
        <Item className='ListItem CTDashboard' key='item-3'
          onClick={(e) => { props.onClickVideoConference(conversations) }}>
          <i className='iconVideoCon' /> Video Conference
      </Item>]
      
        !(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID) ? 
        options = [ 
          <Item disabled={(!isFutureDay(conversations.visitDate) && conversations.visitStatusId === START_VISIT)} className='ListItem CTDashboard' key='item-4' 
          onClick={(e) => onClickServiceCalendarItems(props,conversations)}>
                <i className={conversations.visitStatusId ? list.iconImage: list.iconImage} /> {list.label}
          </Item>,   
          ...commonOptions,    
        ]
        :
        options = commonOptions;
      }      

      
      return (
        <Fragment>
          <li
            key={index}
            className={'list-group-item ProfileServicesVisitContent ' + (getUserInfo().serviceProviderTypeId === ENTITY_USER && "EntityUDashboard") }
          >
            <div className="ProfileViewTime">
              <span>
              {moment(conversations.visitStartTime).format(DATE_FORMATS.hhMinSession)}                 
              </span>
            </div>
            <div
              className='ProfileServices'              
            >
            <span className="ServicesCalendarWidget" onClick={() => {
                handleClick(conversations)
              }}>
              <span className='ServicesTitle'>
                {conversations.serviceTypes &&
                  conversations.serviceTypes.join(', ')}
              </span>
              {/* <span className='ServicesDesc' >
                {conversations.serviceCategory && conversations.serviceCategory}
              </span> */}
              </span>
              {getUserInfo().serviceProviderTypeId === ENTITY_USER &&
              <div className="EntityUServiceProf">
               {isFutureDay(conversations.visitDate) ? conversations.providerId === getUserInfo().serviceProviderId ? 
               <span><i className="assignSPLink"
                  onClick={e =>{
                    togglePersonalDetails({
                      serviceRequestId: conversations.serviceRequestId,
                      serviceRequestVisitid: conversations.serviceRequestVisitId,
                      patientId: conversations.patientId,
                      visitDate:conversations.visitDate
                    })}
                  }
                >
                  Assign Service Provider
                  </i>
                </span> :
              <React.Fragment>
                <div className='ProfileCardImageContainer' 
                onClick={() => {
                props.goToESPProfile(conversations.providerId);
            }}>
              <img
                alt={'NO_IMAGE'}
                key={index}
                className='avatarImage avatarImageBorder'
                src={
                  conversations.providerImage
                    ? conversations.providerImage
                    : require('../../../assets/images/Blank_Profile_icon.png')
                }
              />
            </div>
            <div className='ProfileCardNameContainer' onClick={() => {
              props.goToESPProfile(conversations.providerId);
            }}>
              <span>
                {conversations.providerFirstName &&
                  conversations.providerFirstName +
                  ' '}
                {' '}
                {conversations.providerLastName && conversations.providerLastName}
              </span>
            </div>
            </React.Fragment>:''}
              </div>
                }
            </div>
      {/*Patient Profile*/}
            <div className='ProfileCardImageContainer' 
            onClick={() => {
              props.goToPatientProfile(conversations.patientId);
            }}>
              <img
                alt={'NO_IMAGE'}
                key={index}
                className='avatarImage avatarImageBorder'
                src={
                  conversations.patientImage
                    ? conversations.patientImage
                    : require('../../../assets/images/Blank_Profile_icon.png')
                }
              />
            </div>
            <div className='ProfileCardNameContainer' onClick={() => {
              props.goToPatientProfile(conversations.patientId);
            }}>
              <span>
                {conversations.patientFirstName &&
                  conversations.patientFirstName +
                  ' '}
                {' '}
                {conversations.patientLastName && conversations.patientLastName}
              </span>
            </div>
            <div className="options">
              <ThemeProvider>
                <SelectField>
                  <Select
                    placement='auto'
                    options={options}
                    className='SelectDropDown CTDashboard'
                  />
                </SelectField>
              </ThemeProvider>
            </div>
          </li>
        </Fragment>
      )
    })
  } else {
    return (
      <Fragment>
        <li className='list-group-item ProfileServicesVisitContent'>
          <div className='NoProfileServices'>
            <i className='NoInformationIcon' /><span>No Visits</span>
          </div>
        </li>
      </Fragment>
    )
  }
}

export const ServiceCalendarList = props => {
    let  dateVal = [...new Set(getFieldsNoSeperater(props.Servicelist,'visitDate'))]
    return (
      <React.Fragment>
        {
          dateVal.map( data => {
            return (
              <React.Fragment>
                  <h6 className='VisitScheduleTitle'> 
                  <Moment format="MMM DD, dddd">
                            {data}
                  </Moment>
                  </h6>
                  <ul className='list-group ProfileServicesVisitList'>
                    {
                      splitSlots(
                        props.togglePersonalDetails,
                        props.Servicelist,
                        data,
                        props.handleClick,
                        props
                      )
                    }
                  </ul>  
              </React.Fragment>
            )
          })
        }
      </React.Fragment>
    )
  }