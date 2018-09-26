import React from 'react'
import { getFields, serviceTypeImages } from '../../utils/validations'
import Moment from 'react-moment'
import { Progressbar } from '../../components'

export const VisitList = props => {
  let visitHistoryList = props.visitHistoryList
  let visitHistoryListItem = ''
  if (visitHistoryList) {
    visitHistoryListItem = visitHistoryList.map((vistList, index) => {
      return (
        <div className='card mainProfileCard' key={index}>
          <div className='visitListWidget' key={index}>
            <div className='visitListContainerLeft'>
              <div className='visitListTop'>
                <div className='visitListTime'>
                  <span>
                    <Moment format='ddd, DD MMM'>
                      {vistList.visitDate}
                    </Moment> {vistList.slotDescription}{' '}
                  </span>
                </div>
              </div>
              <div className='visitListBottom'>
                <div className='visitListContent'>
                  <div className='visitListImageContainer'>
                    <img
                      alt={'NO_IMAGE'}
                      key={index}
                      className='visitListImage'
                      src={
                        serviceTypeImages.Bathing
                          ? require(serviceTypeImages.Bathing)
                          : require('../../assets/images/Bathing_Purple.svg')
                      }
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
                    <div className='visitListCategory'>
                      {vistList.serviceCategory}
                    </div>
                    <Progressbar
                      totaltask={vistList.totalTask}
                      taskCompleted={vistList.totalTaskCompleted}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='visitListContainerRight'>
              <i
                className='visitListNavigation'
                onClick={() =>
                  props.handleClicks(vistList.serviceRequestVisitId)}
              />
            </div>
          </div>

        </div>
      )
    })
  }
  return visitHistoryListItem
}
