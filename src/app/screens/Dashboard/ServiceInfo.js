import React, { Fragment } from 'react'
import Moment from 'react-moment'
import {  Select } from '@zendeskgarden/react-select'
import TimeAgo from 'timeago-react'
import moment from 'moment';
import { getFields } from '../../utils/validations'
import { formatName } from '../../utils/formatName';
import { SERVICE_REQUEST } from '../../constants/constants';
import { MessageTypes } from '../../data/AsyncMessage';
import { Link } from 'react-router-dom'

export const ServiceCalendarInfo = props => {
  return props.Servicelist.slice(0, 3).map((conversations, index) => {
    return (
      <Fragment>
        <li key={index} className='list-group-item ProfileServicesVisitContent'>
          <div className='ServicesTimeContainer'>
            <i className={'ServicesTime ' + conversations.slotDescription} />
          </div>
          <div className='ProfileServices'>
            <span className='ServicesTitle theme-primary'>
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

export const ServiceProviderRequestDetails = props => {
  return props.serviceRequest
    .slice(props.minVal, props.maxVal)
    .map((sp, index) => {
      let patientImage = '';
      let patientLastName = '';
      if (sp.statusId === SERVICE_REQUEST.hiredId) {
        patientImage = sp && sp.image ? sp.image : require('../../assets/images/Blank_Profile_icon.png');
        patientLastName = sp && sp.patientLastName;
      } else {
        patientLastName = sp && sp.patientLastName && sp.patientLastName.charAt(0);
        patientImage = require('../../assets/images/Blank_Profile_icon.png');
      }
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
              <span className='ServicesTitle theme-primary'>
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
                {sp.recurringPattern === 0 ? 'One Time' : sp.recurringPatternDescription}
                {' '}
                |
                {' '}
                <Moment format='DD MMM'>
                  {sp.startDate}
                </Moment>
                {sp.recurringPattern !== 0 && <React.Fragment>
                  { ' - '}
                  <Moment format='DD MMM'>
                  {sp.endDate}
                </Moment>
                </React.Fragment>}
              </span>
            </div>

            <div className='ProfileApplicationNumbers Avatar'  onClick={() => {
              if (sp.statusId === SERVICE_REQUEST.hiredId) {
                props.goToPatientProfile(sp.patientId);
              }
            }}>
              <div className='ProfileApplicationWidget'>
                <div className='avatarContainer'>
                  <img
                    alt='NO'
                    className='avatarImage'
                    src={
                      patientImage                        
                    }
                  />
                </div>
              </div>
              <span className='AvatarName'>
                {sp.patientFirstName &&
                  sp.patientFirstName + ' '}
                {patientLastName}
              </span>
            </div>
          </li>
        </Fragment>
      )
    })
}

function getPartcipitantHeader(participants) {
  let header = "";
  if (participants && participants.length > 0) {
    participants.map(participant => {
      header += (participant.firstName && participant.firstName.length > 0) ? formatName(participant.firstName) : '';
      return '';
    });
    header = header.slice(0, -2);
  }
  return header;
};

export const MyConversionDetail = props => {
  let conversation = props.conversation
  let msgClass = ''
  let msgHeader = '';
  return conversation.slice(0, 4).map((conversations, index) => {
    !conversations.title ? msgHeader = getPartcipitantHeader(conversations.participantList) : msgHeader = conversations.title;
    if (props.getUnreadMsgCounts.length > 0) {
      msgClass = 'readMsgs'
      props.getUnreadMsgCounts.map(unreadMsgCount => {
        if (conversations.conversationId === unreadMsgCount.conversationId) {
          msgClass = ''
          return (
            <span className={'float-right count' + msgClass}>
              {unreadMsgCount.unreadMessageCount}
            </span>
          )
        }
        return '';
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
                      <div key={index} className='avatarImage totalMembers theme-primary-light'>
                        {'+' + (conversations.participantList.length - 2)}
                      </div>
                    </div>
                  )
                }
                return '';
              })}
            </div>
            <div className='MsgThreadContent mr-auto'>
              <span className='MsgIndiTitle'>{msgHeader}</span>
              <p className='m-0 MsgContent'>
              {conversations.messageType === MessageTypes.image &&
                  <span className="chatHeaderText"><i className='addAttachmentBtn d-inline-block' />
                    Image
                  </span>}
              {conversations.messageType === MessageTypes.text &&
                  <span className="chatHeaderText">{conversations.messageText}</span>}
              </p>
            </div>
            <div className='MsgCount ml-auto'>
             { conversations.unreadCount > 0 && <span className={'float-right count' + msgClass}>
                {conversations.unreadCount}
              </span> }
              <span className='width100 d-block float-right MsgTime'>
                <TimeAgo datetime={moment.utc(conversations.createdDate).local().format()} />
              </span>
            </div>
          </div>
        </li>
      </Fragment>
    )
  })
}

export const MyConversionDefault = (props) => {
  let style = {
    display: 'none'
  };
  return (
    <Fragment>
      <li className='list-group-item NoInformation myConversationContainer'>
        <div className='myConversationContent'>
          <div className='avatarWidget' style={style}>
            <div className='avatarContainer' />
          </div>
          <div className='MsgThreadContent m-auto'>
          <Link to='/messagesummary'>
          <div class="no-blockinfo-top">
          <div className="NoProfileServices No-Coverastion-Block theme-primary-light">
          <span class="NoInfoText"><span class="NoServiceInfoLink theme-primary">New Conversation</span></span>
          </div>
           </div>
           </Link>
          </div>
        </div>
      </li>
    </Fragment>
  )
}
