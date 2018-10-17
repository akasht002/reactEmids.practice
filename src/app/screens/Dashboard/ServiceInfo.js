import React, { Fragment } from 'react'
import Select from 'react-select'
import Moment from 'react-moment'
import _ from 'lodash'
import TimeAgo from 'timeago-react'
import { getFields } from '../../utils/validations'
import { getUserInfo } from '../../services/http'
import {MORNING,AFTERNOON,EVENING} from '../../redux/constants/constants'

export const splitSlots = (togglePersonalDetails, data, type) => {
  let newData = _.reduce(
    data,
    function (arr, el) {
      if (el.slotDescription === type) {
        arr.push(el)
      }
      return arr
    },
    []
  )

  return serviceCalendar(togglePersonalDetails, newData)
}

export const serviceCalendar = (togglePersonalDetails, newData) => {
  if (newData.length > 0) {
    return newData.slice(0, 3).map((conversations, index) => {
      return (
        <Fragment>
          <li
            key={index}
            className='list-group-item ProfileServicesVisitContent'
          >
            <div className='ServicesTimeContainer'>
              <i className={'ServicesTime ' + conversations.slotDescription} />
            </div>
            <div className='ProfileServices'>
              <span className='ServicesTitle'>
                {conversations.serviceTypes &&
                  conversations.serviceTypes.toString()}
              </span>
              <span className='ServicesDesc'>
                {conversations.serviceCategory && conversations.serviceCategory}
              </span>
              {getUserInfo().isEntityServiceProvider &&
                <span
                  onClick={e =>
                    togglePersonalDetails({
                      serviceRequestId: conversations.serviceRequestId,
                      serviceRequestVisitid: conversations.serviceRequestVisitid,
                      patientId: conversations.patientId
                    })}
                >
                  Assign Service Provider
                </span>}
            </div>
            <div className='ProfileCardImageContainer'>
              <img
                alt={'NO_IMAGE'}
                key={index}
                className='avatarImage avatarImageBorder'
                src={
                  conversations.patientImage
                    ? conversations.patientImage
                    : require('../../assets/images/Blank_Profile_icon.png')
                }
              />
            </div>
            <div className='ProfileCardNameContainer'>
              <span>
                {conversations.patientFirstName &&
                  conversations.patientFirstName}
                {' '}
                {conversations.patientLastName && conversations.patientLastName}
              </span>
            </div>
            <Select
              id='ProfileMonth'
              onBlurResetsInput={false}
              multiple={false}
              className='ProfileSubOptions ProfileMonthList'
              searchable={false}
              options={[
                { label: 'Call', value: '1' },
                { label: 'Message', value: '2' },
                { label: 'Video', value: '3' }
              ]}
            />
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

export const ServiceCalendarInfo = props => {
  return props.Servicelist.slice(0, 3).map((conversations, index) => {
    return (
      <Fragment>
        <li key={index} className='list-group-item ProfileServicesVisitContent'>
          <div className='ServicesTimeContainer'>
            <i className={'ServicesTime ' + conversations.slotDescription} />
          </div>
          <div className='ProfileServices'>
            <span className='ServicesTitle'>
              {conversations.serviceTypes &&
                conversations.serviceTypes.toString()}
            </span>
            <span className='ServicesDesc'>
              {conversations.serviceCategory && conversations.serviceCategory}
            </span>
          </div>
          <div className='ProfileCardImageContainer'>
            <img
              alt={'NO_IMAGE'}
              key={index}
              className='avatarImage avatarImageBorder'
              src={
                conversations.patientImage
                  ? conversations.patientImage
                  : require('../../assets/images/Blank_Profile_icon.png')
              }
            />
          </div>
          <div className='ProfileCardNameContainer'>
            <span>
              {conversations.patientFirstName && conversations.patientFirstName}
              {' '}
              {conversations.patientLastName && conversations.patientLastName}
            </span>
          </div>
          <Select
            id='ProfileMonth'
            onBlurResetsInput={false}
            multiple={false}
            className='ProfileSubOptions ProfileMonthList'
            searchable={false}
            options={[
              { label: 'Call', value: '1' },
              { label: 'Message', value: '2' },
              { label: 'Video', value: '3' }
            ]}
          />
        </li>
      </Fragment>
    )
  })
}

export const calendarData = data => {}

export const ServiceCalendarDefault = props => {
  return (
    <React.Fragment>
      <h6 className='VisitScheduleTitle'>Morning</h6>
      <ul className='list-group ProfileServicesVisitList'>
        {splitSlots(props.togglePersonalDetails, props.Servicelist, MORNING)}
      </ul>
      <h6 className='VisitScheduleTitle'>Afternoon</h6>
      <ul className='list-group ProfileServicesVisitList'>
        {splitSlots(
          props.togglePersonalDetails,
          props.Servicelist,
          AFTERNOON
        )}
      </ul>
      <h6 className='VisitScheduleTitle'>Evening</h6>
      <ul className='list-group ProfileServicesVisitList'>
        {splitSlots(props.togglePersonalDetails, props.Servicelist, EVENING)}
      </ul>
    </React.Fragment>
  )
}

export const ServiceRequestDefault = () => {
  return (
    <div className='NoInformationServiceProvider'>
      <span>
        <img src={require("../../assets/images/NoServiceRequest.svg")}/>
      </span>
      <span className='NoSRText'>
        Browse Service Request
      </span>
    </div>
  )
}

export const ServiceProviderRequestDetails = props => {
  return props.serviceRequest.slice(0, 2).map((sp, index) => {
    return (
      <Fragment>
        <li key={index} className='list-group-item ProfileServicesVisitContent'>
          <div className='ServicesTypeContainer'>
            <i className='ServicesType Bathing' />
          </div>
          <div className='ProfileSkillServices'>
            <span className='ServicesTitle'>
              {sp.serviceRequestTypeDetails &&
                getFields(
                  sp.serviceRequestTypeDetails,
                  'serviceTypeDescription'
                )}
            </span>
            <span className='ServicesDesc'>
              {sp.serviceCategoryDescription}
            </span>
            <span>
              {sp.recurringPattern === 0 ? 'One Time' : 'Recurring'}
              {' '}
              |
              {' '}
              <Moment format='DD MMM'>
                {sp.startDate}
              </Moment>
            </span>
          </div>

          <div className='ProfileApplicationNumbers Avatar'>
            <div className='ProfileApplicationWidget'>
              <div className='avatarContainer'>
                <img
                  alt='NO'
                  className='avatarImage avatarImageBorder'
                  src={
                    sp.image
                      ? sp.image
                      : require('../../assets/images/Blank_Profile_icon.png')
                  }
                />
              </div>
            </div>
            <span className='AvatarName'>
              {sp.patientFirstName && sp.patientFirstName}
              {sp.patientLastName && sp.patientLastName}
            </span>
          </div>
        </li>
      </Fragment>
    )
  })
}

export const MyConversionDetail = props => {
  let MsgClass = ''
  MsgClass = 'readMsgs'
  let conversation = props.conversation
  let unreadMessages = "";
  let msgClass = "";
  return conversation.slice(0, 3).map((conversations, index) => {
    if (props.getUnreadMsgCounts.length > 0) {
      unreadMessages = "";
      msgClass = "readMsgs";
      props.getUnreadMsgCounts.map(unreadMsgCount => {
          if (conversations.conversationId === unreadMsgCount.conversationId) {
              msgClass = "";
              return unreadMessages = <span className={"float-right count" + msgClass}>{unreadMsgCount.unreadMessageCount}</span>
          }
      });
  };
    return (
      <Fragment>
        <li key={index} className='list-group-item myConversationContainer'>
          <div className='myConversationContent' onClick={props.gotoConversations.bind(this, conversations)}>
            <div className='avatarWidget'>
              {conversations.participantList.map((chatMem, index) => {
                let zIndex = conversations.participantList.length - index
                let zIndexStyle = { zIndex: zIndex }
                if (index <= 1) {
                  return (
                    <div className='avatarContainer' style={zIndexStyle}>
                      <img
                        alt={'NO_IMAGE'}
                        key={index}
                        className='avatarImage avatarImageBorder'
                        src={
                          chatMem.image
                            ? chatMem.image
                            : require('../../assets/images/Blank_Profile_icon.png')
                        }
                      />
                    </div>
                  )
                } else if (index === 2) {
                  return (
                    <div className='avatarContainer'>
                      <div key={index} className='avatarImage totalMembers'>
                        {'+' + (conversations.participantList.length - 2)}
                      </div>
                    </div>
                  )
                } else {
                }
              })}
            </div>
            <div className='MsgThreadContent mr-auto'>
              <span className='MsgIndiTitle'>{conversations.title}</span>
              <p className='m-0 MsgContent'>
                {conversations.messageText}
              </p>
            </div>
            <div className='MsgCount ml-auto'>
              <span className={'float-right count' + MsgClass}>{unreadMessages}</span>
              <span className='width100 d-block float-right MsgTime'>
                <TimeAgo datetime={conversations.createdDate} />
              </span>
            </div>
          </div>
        </li>
      </Fragment>
    )
  })
}

export const MyConversionDefault = () => {
  return (
    <Fragment>
      <li className='list-group-item NoInformation myConversationContainer'>
        <div className='myConversationContent'>
          <div className='avatarWidget'>
            <div className='avatarContainer' />
          </div>
          <div className='MsgThreadContent m-auto'>
            <div className='NoProfileServices'>
              <i className='NoInformationIcon' /><span>No Conversations</span>
            </div>
          </div>
        </div>
      </li>
      <li className='list-group-item NoInformation myConversationContainer'>
        <div className='myConversationContent'>
          <div className='avatarWidget'>
            <div className='avatarContainer' />
          </div>
          <div className='MsgThreadContent m-auto'>
            <div className='NoProfileServices'>
              <i className='NoInformationIcon' /><span>No Conversations</span>
            </div>
          </div>
        </div>
      </li>
      <li className='list-group-item NoInformation myConversationContainer'>
        <div className='myConversationContent'>
          <div className='avatarWidget'>
            <div className='avatarContainer' />
          </div>
          <div className='MsgThreadContent m-auto'>
            <div className='NoProfileServices'>
              <i className='NoInformationIcon' /><span>No Conversations</span>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  )
}