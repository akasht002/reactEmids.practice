import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/visitList.css'

class VisitList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='card mainProfileCard'>
     
        <div className='visitListWidget'>
          <div className='visitListContainerLeft'>
            <div className='visitListTop'>
              <div className='visitListTime'>
                <span>Sun, 24 Aug, Morning</span>
                <span>01:45 hrs</span>
              </div>
            </div>
            <div className='visitListBottom'>
              <div className='visitListContent'>
                <div className='visitListImageContainer'>
                  <img
                    className='visitListImage'
                    src={require('../../assets/images/Blank_Profile_icon.png')}
                  />
                </div>
                <div className='visitListNameContainer'>
                  <div className='visitListType'>
                    Bathing, Grooming, Nursing
                  </div>
                  <div className='visitListCategory'>
                    Activities of Daily Living
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
            <Link className='visitListNavigation' to='/' />
          </div>
        </div>
      </div>
    )
  }
}

export default VisitList
