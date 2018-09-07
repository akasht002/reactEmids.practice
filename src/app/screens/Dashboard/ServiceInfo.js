import React, { Fragment } from 'react'
import Select from 'react-select'
import Moment from 'react-moment'
import TimeAgo from 'timeago-react'
import { getFields } from '../../utils/validations'

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
            // value={this.state.selectedValue}
          />
        </li>
      </Fragment>
    )
  })
}

export const ServiceCalendarDefault = props => {
  return (
    <React.Fragment>
       <h6 className='VisitScheduleTitle'>Morning</h6>
      <ul className='list-group ProfileServicesVisitList'>
        <li className='list-group-item ProfileServicesVisitContent'>
        <div className='NoProfileServices'>
            <i className='NoInformationIcon' /><span>No Visits</span>
          </div>
          {/* <div className='ServicesTimeContainer'>
                                    <i className='ServicesTime Morning'/>
                                </div> */}
          {/* <div className='ProfileServices'>
            <span className='ServicesTitle'>Bathing, Grooming, Nursing</span>
            <span className='ServicesDesc'>Activity of Daily Living</span>
          </div>
          <div className='ProfileCardImageContainer'>
            <img alt="NO"
              className='ProfileImage'
              src={ require('../assets/images/Morning.png')}
            />
          </div>
          <div className='ProfileCardNameContainer'>
            <span>Anya Lee</span>
          </div>
          <Select
            id='ProfileMonth'
            onBlurResetsInput={false}
            multiple={false}
            className='ProfileSubOptions ProfileMonthList'
            searchable={false}
            options={[
              { label: 'Hired', value: '1' },
              { label: 'Alaska', value: '2' },
              { label: 'Arizona', value: '3' }
            ]}
            value={this.state.selectedValue}
          /> */}
        </li>
      </ul>
      <h6 className='VisitScheduleTitle'>Afternoon</h6>
      <ul className='list-group ProfileServicesVisitList'>
        <li className='list-group-item ProfileServicesVisitContent'>
        <div className='NoProfileServices'>
            <i className='NoInformationIcon' /><span>No Visits</span>
          </div>
          {/* <div className='ServicesTimeContainer'>
                                    <i className='ServicesTime Afternoon'/>
                                </div> */}
          {/* <div className='ProfileServices'>
            <span className='ServicesTitle'>Bathing, Grooming, Nursing</span>
            <span className='ServicesDesc'>Activity of Daily Living</span>
          </div>
          <div className='ProfileCardImageContainer'>
            <img
              className='ProfileImage'
              src={ require('../assets/images/Morning.png')}
            />
          </div>
          <div className='ProfileCardNameContainer'>
            <span>Anya Lee</span>
          </div>
          <Select
            id='ProfileMonth'
            onBlurResetsInput={false}
            multiple={false}
            className='ProfileSubOptions ProfileMonthList'
            searchable={false}
            options={[
              { label: 'Hired', value: '1' },
              { label: 'Alaska', value: '2' },
              { label: 'Arizona', value: '3' }
            ]}
            value={this.state.selectedValue}
          /> */}
        </li>
      </ul>
      <h6 className='VisitScheduleTitle'>Evening</h6>
      <ul className='list-group ProfileServicesVisitList'>
        <li className='list-group-item ProfileServicesVisitContent'>
          <div className='NoProfileServices'>
            <i className='NoInformationIcon' /><span>No Visits</span>
          </div>
        </li>
      </ul>
    </React.Fragment>
  )
}

export const ServiceRequestDefault = () => {
  return (
    <div className='NoInformationServiceProvider'>
      <span><i className='SPNoInfoDashboard' /></span>
      <span className='NoInfoText'>
        Click HERE to add a new Service Request
      </span>
    </div>
  )
}

export const ServiceProviderRequestDetails = props => {
  return props.serviceRequest.slice(0, 3).map((sp, index) => {
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

          <div className='ProfileApplicationNumbers'>
            <img
              alt='NO'
              className='avatarImage avatarImageBorder'
              src={
                sp.image
                  ? sp.image
                  : require('../../assets/images/Blank_Profile_icon.png')
              }
            />
            {' '}
            <span>
              {sp.patientFirstName && sp.patientFirstName}
              {' '}
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
  return conversation.slice(0, 3).map((conversations, index) => {
    return (
      <Fragment>
        <li key={index} className='list-group-item myConversationContainer'>
          <div className={'myConversationContent ' + MsgClass}>
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
              <span className={'float-right count' + MsgClass}>{1}</span>
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
      <div className='NoInformationServiceProvider'>
        <span><i className='SPNoInfo' /></span>
        <span className='NoInfoText'>
          Click HERE to add a new Service Request
        </span>
      </div>
    </Fragment>
  )
}