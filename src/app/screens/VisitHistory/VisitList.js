import React from 'react'
import { Link } from 'react-router-dom'
import './visitList.css'
import { getFields } from '../../utils/validations'
import Moment from 'react-moment';

export const VisitList = (props) => {
  console.log(props.visitHistoryList)
  let visitHistoryList = props.visitHistoryList
    let visitHistoryListItem = ''
    if (visitHistoryList) {
      visitHistoryListItem = visitHistoryList.map((vistList, index) => {
        return (
          <div className='visitListWidget' key={index}>
        <div className='visitListContainerLeft'>
          <div className='visitListTop'>
            <div className='visitListTime'>
            <span>
              <Moment parse="DD-MM">
              {vistList.requestDate}
            </Moment></span>
              {/* <span>Sun, 24 Aug, Morning</span>
              <span>01:45 hrs</span> */}
            </div>
          </div>
          <div className='visitListBottom'>
            <div className='visitListContent'>
              <div className='visitListImageContainer'>                
                 <img alt={"NO_IMAGE"}
                            key={index}
                            className='visitListImage'
                            src={
                              vistList.image
                                ? vistList.image
                                : require('../../assets/images/Blank_Profile_icon.png')
                            }
                          />
              </div>
              <div className='visitListNameContainer'>
                <div className='visitListType'>
                {vistList.serviceRequestTypeDetails && getFields(vistList.serviceRequestTypeDetails,"serviceTypeDescription")}
                </div>
                <div className='visitListCategory'>
                  {vistList.serviceCategoryDescription}
                </div>
                <div className='visitListTask'>
                  <span className='bottomTaskName'>Tasks</span>
                  <span className='bottomTaskRange'>
                    <i
                      style={{ width: '83.3%' }}
                      className='bottomTaskCompletedRange'
                    />
                  </span>
                  <span className='bottomTaskPercentage'>83.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='visitListContainerRight'>
          <Link className='visitListNavigation' to={'/visitSummary/'+vistList.serviceRequestId} />
        </div>
      </div>
        )
      })
    }
  return (
    <div className='card mainProfileCard'>

      {visitHistoryListItem}
     
    </div>
  )
}


