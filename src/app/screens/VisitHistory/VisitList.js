import React from 'react'
import { Link } from 'react-router-dom'
import { getFields } from '../../utils/validations'
import Moment from 'react-moment';


export const VisitList = (props) => {
  let visitHistoryList = props.visitHistoryList
    let visitHistoryListItem = ''
    if (visitHistoryList) {
      visitHistoryListItem = visitHistoryList.map((vistList, index) => {
        return (
         
             <div className='card mainProfileCard'  key={index}>
        <div className='visitListWidget' key={index}>
        <div className='visitListContainerLeft'>
          <div className='visitListTop'>
            <div className='visitListTime'>
            <span>
              <Moment format="ddd, DD MMM">
              {vistList.visitDate}
            </Moment>  {vistList.slotDescription} </span>
              {/*
              <span>01:45 hrs</span> */}
            </div>
          </div>
          <div className='visitListBottom'>
            <div className='visitListContent'>
              <div className='visitListImageContainer'>                
              <img alt={'NO_IMAGE'}
                key={index} 
                className='visitListImage' src={require('../../assets/images/Bathing_Purple.svg')}/> 
              </div>
              <div className='visitListNameContainer'>
                <div className='visitListType'>
                {vistList.serviceTypes && getFields(vistList.serviceTypes,"serviceTypeDescription")}
                </div>
                <div className='visitListCategory'>
                  {vistList.serviceCategory}
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
        <i className='visitListNavigation'onClick={() => props.handleClicks(vistList.serviceRequestVisitId)}/>
          {/* <Link className='visitListNavigation' to={'/visitSummary/'+vistList.serviceRequestVisitId} /> */}
        </div>
      </div>
      
      </div>
        )
      })
    }
  return (
   

      visitHistoryListItem
     
  
  )
}


