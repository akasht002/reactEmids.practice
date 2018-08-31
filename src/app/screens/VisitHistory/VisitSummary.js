import React from 'react'
import { Link } from 'react-router-dom'

import {  ProfileHeader, Scrollbars } from '../../components'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';


import '../../styles/VisitSummary.css'
import 'react-accessible-accordion/dist/fancy-example.css'
import Summary from './Summary'
// import ServiceProviderModalTemplate from 'primary_path/components/ProfileModal'
import Feedback
  from './FeedbackContent'

import '../../styles/dashboard.css'
import '../../styles/visitProcessing.css'

class VisitSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      modal: false
    }
    this.FeedbackModal = () => {
        console.log("HI")
      this.setState({
        modal: !this.state.modal
      })
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentWillMount(){
    console.log(this.props.match.params.id)
  }

  render () {
    let ModalContent = ''

    if (this.state.modal) {
      ModalContent = <Feedback />
    }

    return (
      
       <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
        <div className="container-fluid ProfileRightWidget">
            <ProfileHeader toggle={this.toggle.bind(this)}/>
            <div className={'hiddenScreen ' + this.state.isOpen} onClick={this.toggle.bind(this)}/>
            <div className='ProfileRightContainer'>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Service Request <span>/ VID97531</span></h5>
                    </div>
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                            className='ProfileContentWidget'>
                    <div className='card mainProfileCard'>
                        <div className='CardContainers TitleWizardWidget'>
                            <div className='TitleContainer'>
                                <Link className="TitleContent backProfileIcon" to="/"/>
                                <div className='requestContent'>
                                    <div className='requestNameContent'>
                                        <span><i className='requestName'>Sun, 24 Aug, Morning</i>VID97531</span>
                                    </div>
                                    <div className='requestImageContent'>
                                    <span className="IndividualName">
                                    <img alt={'NO_IMAGE'}
                                        src={require('../../assets/images/Bathing_Purple.svg')}
                                        className="avatarImage avatarImageBorder"/>
                                        <i className='requestName'>Christopher W</i>
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='CardContainers ServiceCategoryWidget'>
                            <Summary FeedbackModal={this.FeedbackModal} />
                        </div>
                    </div>
                    <div className='cardBottom'/>
                </Scrollbars>
                {/* <ServiceProviderModalTemplate
                    isOpen={this.state.modal}
                    toggle={this.FeedbackModal}
                    ModalBody={ModalContent}
                    className="modal-lg FeedbackModal"
                    modalTitle="Feedback"
                    centered="centered"
                /> */}
            </div>
        </div>
    </AsideScreenCover>
    )
  }
}

export default VisitSummary
