import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './ProfileMainPanel.css'
import {
  getServiceProviderDetail
} from '../../redux/dashboard/Dashboard/actions'

class MyServiceProviders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {     
      selectedValue: { label: 'Favourites', value: 'favorite' }
    }
  }  
  componentDidMount () {
    this.props.getServiceProviderDetail(this.state.selectedValue.value)
  } 

  optionChanged = (e) =>{
    this.setState({
      selectedValue: e
    })
    this.props.getServiceProviderDetail(e.value)
  }

  render () {
    let serviceProvider = this.props.serviceProvider
    let providers = ''
    if (serviceProvider) {
      providers = serviceProvider.map((sp, index) => {
        return (
          <li className='list-group-item mySPContainer'>
            <div className='mySPContent'>
              <div className='SPAvatarWidget'>
                <div className='SPAvatarContainer'>
                  <img alt={"NO_IMAGE"}
                    key={index}
                    src={
                      sp.image
                        ? sp.image
                        : require('../../assets/images/Blank_Profile_icon.png')
                    }
                    className='SPAvatarImage avatarImageBorder'
                  />
                </div>
                <span className='SPMemRating'>
                  <i className='iconFilledStar' />{sp.rating ? sp.rating : ''}
                </span>
              </div>
              <div className='SPThreadContent'>
                <span className='SPIndiTitle text-capitalize'>
                  {this.props.serviceProvider &&
                    `${sp.firstName || ''} ${sp.lastName || ''} `}
                </span>
                <div className='SPContent'>
                  <span className='text-capitalize'>{sp.gender}</span>
                  <span>{sp.age} years</span>
                  <span>{sp.yearOfExperience} exp</span>
                </div>
                <span className='SPSkills' />
              </div>
              <div className='SPCount'>
                <div className='SPRate'>
                  <span>{sp.rating ? sp.rating : ''}</span>
                </div>
                {this.state.selectedValue.value === 'favorite'?
                 <span className='SPFavouriteIcon' />: ''}
               
              </div>
            </div>
            <span className='options' />
          </li>
        )
      })
    }

    // let providers = ''

    return (
      <div className='card ProfileCard'>
        <div className='ProfileCardBody'>
          <div className='ProfileCardHeader'>
            <span className='ProfileCardHeaderTitle theme-primary'>
              Service Providers
            </span>
            <Link className='ProfileCardHeaderLink theme-primary' to='/'>View all</Link>
          </div>
          <div className='topPalette theme-primary'>
            <div className='monthPalette'>
              <Select
                id='ProfileMonth'
                multiple={false}
                placeholder='Male'
                className='ProfileMonthList'
                searchable={false}
                onChange={this.optionChanged}
                options={[
                  { label: 'Favourites', value: 'favorite' } ,
                  { label: 'Recent', value: 'recent' } ,
                ]}
                value={this.state.selectedValue}
              />
            </div>
          </div>
          <div className='topPalette ProfileConversation'>
            <ul className='list-group ProfileConversationWidget'>
              {providers}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getServiceProviderDetail: (data) => dispatch(getServiceProviderDetail(data))
  }
}

function mapStateToProps (state) {
  return {
    serviceProvider: state.dashboardState.dashboardState.serviceProvider,
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyServiceProviders)
)

