import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { SelectField, Select, Item } from '@zendeskgarden/react-select'
import _ from 'lodash'
import TimeAgo from 'timeago-react'
import { getFields } from '../../utils/validations'
import { formatName } from '../../utils/formatName';
import { getUserInfo } from '../../services/http'
import { MORNING, AFTERNOON, EVENING } from '../../redux/constants/constants'
import { ENTITY_USER } from '../../constants/constants'

export const ShowIndicator = props => {
  if (props.count === 1) {
    return <i className='indicator' />
  } else if (props.count === 2) {
    return (
      <React.Fragment>
        <i className='indicator' /><i className='indicator' />
      </React.Fragment>
    )
  } else if (props.count > 3) {
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
      if (el.slotDescription === type) {
        arr.push(el)
      }
      return arr
    },
    []
  )

  return serviceCalendar(togglePersonalDetails, newData, handleClick, props)
}

export const serviceCalendar = (
  togglePersonalDetails,
  newData,
  handleClick,
  props
) => {
  if (newData.length > 0) {
    return newData.slice(0, 3).map((conversations, index) => {
      return (
        <Fragment>
          <li
            key={index}
            className='list-group-item ProfileServicesVisitContent'
          >
            {/* <div className='ServicesTimeContainer'>
              <i className={'ServicesTime ' + conversations.slotDescription} />
            </div> */}
            <div
              className='ProfileServices'
              onClick={() => {
                handleClick(conversations.serviceRequestId)
              }}
            >
              <span className='ServicesTitle'>
                {conversations.serviceTypes &&
                  conversations.serviceTypes.toString()}
              </span>
              <span className='ServicesDesc'>
                {conversations.serviceCategory && conversations.serviceCategory}
              </span>
              {getUserInfo().serviceProviderTypeId === ENTITY_USER &&
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
            <div className='ProfileCardImageContainer' onClick={() => {
              props.goToPatientProfile(conversations.patientId);
            }}>
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
                    options={[
                      // <Item className='ListItem CTDashboard' key='item-1'>
                      //   <i className='iconPhone' /> Phone Call
                      // </Item>,
                      <Item className='ListItem CTDashboard' key='item-2'
                        onClick={(e) => { props.onClickConversation(conversations) }}>
                        <i className='iconConversation' /> Conversation
                    </Item>,
                      <Item className='ListItem CTDashboard' key='item-3'
                        onClick={(e) => { props.onClickVideoConference(conversations) }}>
                        <i className='iconVideoCon' /> Video Conference
                    </Item>
                    ]}
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

export const calendarData = data => { }

export const ServiceCalendarDefault = props => {
  return (
    <React.Fragment>
      <h6 className='VisitScheduleTitle'>Morning</h6>
      <ul className='list-group ProfileServicesVisitList'>
        {splitSlots(
          props.togglePersonalDetails,
          props.Servicelist,
          MORNING,
          props.handleClick,
          props
        )}
      </ul>
      <h6 className='VisitScheduleTitle'>Afternoon</h6>
      <ul className='list-group ProfileServicesVisitList'>
        {splitSlots(
          props.togglePersonalDetails,
          props.Servicelist,
          AFTERNOON,
          props.handleClick,
          props
        )}
      </ul>
      <h6 className='VisitScheduleTitle'>Evening</h6>
      <ul className='list-group ProfileServicesVisitList'>
        {splitSlots(
          props.togglePersonalDetails,
          props.Servicelist,
          EVENING,
          props.handleClick,
          props
        )}
      </ul>
    </React.Fragment>
  )
}

export const ServiceRequestDefault = () => {
  return (
    <div className='NoInformationServiceProvider'>
      <span>
        <img
          alt={'N'}
          src={require('../../assets/images/NoServiceRequest.svg')}
        />
      </span>
      <span className='NoSRText'>
        Browse Service Request
      </span>
    </div>
  )
}

export const ServiceProviderRequestDetails = props => {
  return props.serviceRequest
    .slice(props.minVal, props.maxVal)
    .map((sp, index) => {
      return (
        <Fragment>
          <li
            key={index}
            className='list-group-item ProfileServicesVisitContent'
          >
            <div className='ServicesTypeContainer'>
              <i className={`ServicesType DashboardSPIconServices${sp.serviceRequestTypeDetails && sp.serviceRequestTypeDetails.length > 0
                && sp.serviceRequestTypeDetails[0].serviceTypeId}`} />
            </div>
            <div
              className='ProfileSkillServices'
              onClick={() => {
                props.handleClick(sp.serviceRequestId)
              }}
            >
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
                    className='avatarImage'
                    src={
                      sp.image
                        ? sp.image
                        : require('../../assets/images/Blank_Profile_icon.png')
                    }
                  />
                </div>
              </div>
              <span className='AvatarName'>
                {sp.patientFirstName &&
                  sp.patientFirstName + ' '}
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
  let unreadMessages = ''
  let msgClass = ''

  return conversation.slice(0, 3).map((conversations, index) => {
    if (props.getUnreadMsgCounts.length > 0) {
      unreadMessages = ''
      msgClass = 'readMsgs'
      props.getUnreadMsgCounts.map(unreadMsgCount => {
        if (conversations.conversationId === unreadMsgCount.conversationId) {
          msgClass = ''
          return (unreadMessages = (
            <span className={'float-right count' + msgClass}>
              {unreadMsgCount.unreadMessageCount}
            </span>
          ))
        }
      })
    }
    return (
      <Fragment>
        <li key={index} className='list-group-item myConversationContainer'>
          <div
            className='myConversationContent'
            onClick={props.gotoConversations.bind(this, conversations)}
          >
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
                          chatMem.thumbNail &&
                            chatMem.thumbNail !== ''
                            ? chatMem.thumbNail
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
              <span className={'float-right count' + MsgClass}>
                {unreadMessages}
              </span>
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
