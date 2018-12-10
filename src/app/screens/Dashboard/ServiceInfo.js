import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { SelectField, Select, Item } from '@zendeskgarden/react-select'
import _ from 'lodash'
import TimeAgo from 'timeago-react'
import moment from 'moment';
import { getFields } from '../../utils/validations'
import { formatName } from '../../utils/formatName';
import { getUserInfo } from '../../services/http'
import { MORNING, AFTERNOON, EVENING } from '../../redux/constants/constants'
import { HIRED_STATUS_ID } from '../../constants/constants';
import { ENTITY_USER } from '../../constants/constants';
import { MessageTypes } from '../../data/AsyncMessage';
import { isEntityServiceProvider } from '../../utils/userUtility';

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
      let options = [
        <Item className='ListItem CTDashboard' key='item-1'
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
      </Item>
      ];
      if(isEntityServiceProvider()){
        options = [
          <Item className='ListItem CTDashboard' key='item-1'
          onClick={(e) => { props.handlePhoneNumber(conversations) }}>
            <i className='iconPhone' /> Phone Call
          </Item>
        ];
      };
      return (
        <Fragment>
          <li
            key={index}
            className={'list-group-item ProfileServicesVisitContent ' + (getUserInfo().serviceProviderTypeId === ENTITY_USER && "EntityUDashboard") }
          >
            {/* <div className='ServicesTimeContainer'>
              <i className={'ServicesTime ' + conversations.slotDescription} />
            </div> */}
            <div
              className='ProfileServices'              
            >
            <span className="ServicesCalendarWidget" onClick={() => {
                handleClick(conversations)
              }}>
              <span className='ServicesTitle'>
                {conversations.serviceTypes &&
                  conversations.serviceTypes.toString()}
              </span>
              <span className='ServicesDesc' >
                {conversations.serviceCategory && conversations.serviceCategory}
              </span>
              </span>
              {getUserInfo().serviceProviderTypeId === ENTITY_USER &&
              <div className="EntityUServiceProf">
               {conversations.providerId === getUserInfo().serviceProviderId ? 
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
                    : require('../../assets/images/Blank_Profile_icon.png')
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
            </React.Fragment>}
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
      let patientImage = '';
      let patientLastName = '';
      if (sp.statusId === HIRED_STATUS_ID) {
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
              if (sp.statusId !== 35) {
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
  let MsgClass = ''
  MsgClass = 'readMsgs'
  let conversation = props.conversation
  let unreadMessages = ''
  let msgClass = ''
  let msgHeader = '';
  return conversation.slice(0, 4).map((conversations, index) => {
    !conversations.title ? msgHeader = getPartcipitantHeader(conversations.participantList) : msgHeader = conversations.title;
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
                      <div key={index} className='avatarImage totalMembers'>
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
              <span className={'float-right count' + MsgClass}>
                {unreadMessages}
              </span>
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
    </Fragment>
  )
}
