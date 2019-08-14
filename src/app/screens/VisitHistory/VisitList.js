import React from 'react'
import { getFields, getServiceTypeImage } from '../../utils/validations'
import Moment from 'react-moment'
import { Progressbar } from '../../components'

export const VisitList = props => {
  let visitHistoryList = props.visitHistoryList
  let visitHistoryListItem = ''
  if (visitHistoryList) {
    visitHistoryListItem = visitHistoryList.length > 0 ? visitHistoryList.map((vistList, index) => {
      let visitId = getServiceTypeImage(vistList.serviceTypes && vistList.serviceTypes.length > 0 && vistList.serviceTypes[0].serviceTypeId);
      return (
        <div className='card mainProfileCard' key={index}>
          <div className='visitListWidget' key={index}>
            <div className='visitListContainerLeft'>
              <div className='visitListTop'>
                <div className='visitListTime'>
                  <span>
                    <Moment format='ddd, DD MMM'>
                      {vistList.visitDate}
                    </Moment>, {vistList.slotDescription}
                  </span>
                  <span>{vistList.billedTotalDuration && vistList.billedTotalDuration.substring(0,5)} (HH:MM)</span>
                  <span>{vistList.serviceRequestVisitNumber}</span>
                </div>
              </div>
              <div className='visitListBottom'>
                <div className='visitListContent'>
                  <div className="row full-block">
                    <div className="col-md-8 col-sm-8 col-xs-12 d-flex p-0">
                      <div className='visitListImageContainer'>
                        <img
                          alt={'NO_IMAGE'}
                          key={index}
                          className='visitListImage'
                          src={require(`../../assets/ServiceTypes/${visitId}`)}
                        />
                      </div>
                      <div className='visitListNameContainer'>
                        <div className='visitListType'>
                          {vistList.serviceTypes &&
                            getFields(
                              vistList.serviceTypes,
                              'serviceTypeDescription'
                            )}
                        </div>
                        <Progressbar
                          totaltask={vistList.totalTask}
                          taskCompleted={vistList.totalTaskCompleted}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 d-flex padding-less align-items-center justify-content-end p-0">
                      <div className="visitUserPic-block right-uservisit-view" onClick={() => props.handelPatientProfile(vistList.patientId)}>
                        <div className="visitUserPic">
                          <div class="avatarContainer">
                            <img
                              alt={'NO_IMAGE'}
                              key={index}
                              className='avatarImage'
                              src={
                                vistList.patientImage
                                  ? vistList.patientImage
                                  : require('../../assets/images/Blank_Profile_icon.png')
                              }
                            />
                          </div>
                        </div>
                        <div className="visitUserName">
                          {vistList.patientFirstName && vistList.patientFirstName}
                          {' '}
                          {vistList.patientLastName && vistList.patientLastName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='visitListContainerRight'>
              <i
                className='visitListNavigation'
                onClick={() =>
                  props.handleClicks(vistList.serviceRequestVisitId === 0 ? vistList.servicePlanVisitId : vistList.serviceRequestVisitId)}
              />
            </div>
          </div>

        </div>
      )
    }) : 
        <span className="no-resultblock">No results found for the current criteria</span>
  }
  return visitHistoryListItem
}
