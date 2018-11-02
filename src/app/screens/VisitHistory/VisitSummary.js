import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Scrollbars } from '../../components'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'
import {Path } from '../../routes'
import {
  getVisitServiceHistoryByIdDetail
} from '../../redux/visitHistory/VisitServiceDetails/actions'
import './VisitSummary.css'
import 'react-accessible-accordion/dist/fancy-example.css'
import Summary from './Summary'
import './visitProcessing.css'

class VisitSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      modal: false
    }
    this.FeedbackModal = () => {
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

  componentWillMount () {
    this.props.ServiceRequestId
      ? this.props.getVisitServiceHistoryByIdDetail(this.props.ServiceRequestId)
      : this.props.history.push(Path.visitHistory)
  }

  componentDidMount () {}

  render () {
    let visitSummary = this.props.Visits.VisitServiceDetails

    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle}>
          <div className='ProfileHeaderWidget'>
            <div className='ProfileHeaderTitle'>
              <h5 className='primaryColor m-0'>
                Service Request
                {' '}
                <span>/ {visitSummary.serviceRequestId}</span>
              </h5>
            </div>
          </div>
          <Scrollbars
            speed={2}
            smoothScrolling
            horizontal={false}
            className='ProfileContentWidget'
          >
            <div className='card mainProfileCard'>
              <div className='CardContainers TitleWizardWidget'>
                <div className='TitleContainer'>
                  <Link
                    className='TitleContent backProfileIcon'
                    to='/visitHistory'
                  />
                  <div className='requestContent'>
                    <div className='requestNameContent'>
                      <span>
                        <i className='requestName'>Sun, 24 Aug, Morning</i>
                        {visitSummary.serviceRequestVisitId}
                      </span>
                    </div>
                    <div className='requestImageContent'>
                      <span className='IndividualName'>
                        <img
                          alt={'NO_IMAGE'}
                          src={
                            visitSummary.patient &&
                              visitSummary.patient.imageString
                          }
                          className='avatarImage avatarImageBorder'
                        />
                        <i className='requestName'>
                          {visitSummary.patient &&
                            visitSummary.patient.firstName}
                          {' '}
                          {' '}
                          {visitSummary.patient &&
                            visitSummary.patient.lastName}
                        </i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='CardContainers'>
                <Summary
                  SummaryDetails={visitSummary}
                  FeedbackModal={this.FeedbackModal}
                />
              </div>
            </div>
            <div className='cardBottom' />
          </Scrollbars>
      </AsideScreenCover>
    )
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getVisitServiceHistoryByIdDetail: data =>
      dispatch(getVisitServiceHistoryByIdDetail(data))
  }
}

function mapStateToProps (state) {
  return {
    Visits: state.visitHistoryState.vistServiceHistoryState,
    ServiceRequestId: state.visitHistoryState.vistServiceHistoryState
      .ServiceRequestId
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitSummary)
)
