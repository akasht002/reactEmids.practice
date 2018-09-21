import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Progressbar} from '../../components'
import moment from 'moment'
import 'react-accessible-accordion/dist/fancy-example.css'
import { getFields, getLength } from '../../utils/validations'
import { ProfileModalPopup, ModalPopup, StarRating } from '../../components'
import { getFirstCharOfString } from '../../utils/stringHelper'
import { getUserInfo } from '../../services/http'
import {
  getQuestionsList,
  saveAnswers
} from '../../redux/visitSelection/VisitServiceProcessing/Feedback/actions'


class VistSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapse: false,
      EducationModal: false,
      rating: '',
      answerList: '',
      textareaValue: '',
      textareaData: ''
    }
    this.selectedAnswers = []
  }

  componentDidMount () {
    this.props.getQuestionsList()    
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  toggleHiddenScreen = () => {
    this.setState({
      isOpen: false,
      filterOpen: false
    })
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }

  getServiceList = datas => {
    if (getLength(datas) > 0) {
      return datas.map((list, index) => {
        return (
          <div key={index} className='ServiceList Individual Summary'>
            <label className='ServicesLink active' htmlFor='Services1'>
              <div className='servicesDesc'>
                <span className='serviceName'>
                  {list.serviceTaskDescription}
                </span>
              </div>
            </label>
            <span className='ServiceIndicatorBottom' />
          </div>
        )
      })
    } else {
      return <div>No Content</div>
    }
  }

  getServiceDetails = lists => {
    if (lists) {
      return lists.map((list, index) => {
        return (
          <AccordionItem>
            <AccordionItemTitle className='TabContainer'>
              <img
                alt={'NO_IMAGE'}
                className='ServiceTasksImg'
                src={require('../../assets/images/Bathing_Purple.svg')}
              />
              {' '}
              <div className='TabHeaderContent'>
                <span className='TabHeaderText'>
                  {list.serviceTypeDescription}
                </span>
                <span>
                  <i className='SelectedTask'>0</i>
                  <i className='TotalTasks'>
                    /{getLength(list.serviceRequestTypeTaskVisits)}
                  </i>
                  {' '}
                  tasks completed
                </span>
              </div>
            </AccordionItemTitle>

            <AccordionItemBody>
              {this.getServiceList(list.serviceRequestTypeTaskVisits)}

            </AccordionItemBody>
          </AccordionItem>
        )
      })
    }
  }

  togglePersonalDetails (action, e) {
    this.setState({
      EditFeedbackDetailModal: !this.state.EditFeedbackDetailModal
    })
  }
 

  handleSelected = (answer, id) => {
    let answers = { feedbackQuestionnaireId: id, answerName: answer, id: 0 }
    let filteredData = this.selectedAnswers.filter(answer => {
      return answer.feedbackQuestionnaireId !== id
    })
    filteredData.push(answers)
    this.selectedAnswers = filteredData
    this.setState({ answerList: filteredData })
  }

  handleTextarea = (e, id) => {
    this.setState({
      textareaValue: e.target.value,
      textareaData: {
        feedbackQuestionnaireId: id,
        answerName: this.state.textareaValue
      }
    })
  }

  handleSelectedRating = e => {
    this.setState({ rating: e.target.value })
  }

  onClickNext = () => {
    if (this.state.textareaData) {
      this.selectedAnswers.push(this.state.textareaData)
    }
    if (this.props.QuestionsList.length === this.selectedAnswers.length) {
      this.onSubmit()
    } else {
      this.setState({ isModalOpen: true })
    }
  }

  onSubmit = () => {
    const data = {
      serviceRequestVisitId: this.props.patientDetails.serviceRequestVisitId,
      serviceRequestId: this.props.patientDetails.serviceRequestId,
      patientId: getUserInfo().serviceProviderId,
      rating: this.state.rating,
      answers: this.selectedAnswers,
      path:'visitHistory'
    }
    this.props.saveAnswers(data)
    this.setState({
      EditFeedbackDetailModal: !this.state.EditFeedbackDetailModal,
      isModalOpen: false
    })
  }

  getFeedback = () => {
    return (
      <div className='FeedbackWidget'>
        <div className='FeedbackRating'>
          {this.props.patientDetails.serviceProvider
            ? <p>
                Rate
                {' '}
              {this.props.patientDetails.serviceProvider.firstName}
              {' '}
              {this.props.patientDetails.serviceProvider.lastName &&
                  getFirstCharOfString(
                    this.props.patientDetails.serviceProvider.lastName
                  )}
            </p>
            : ''}
          <StarRating
            handleSelectedRating={e => this.handleSelectedRating(e)}
          />
        </div>
        {this.props.QuestionsList.length > 0
          ? <div>
            {this.props.QuestionsList &&
                this.props.QuestionsList.map((questionList, i) => {
                  if (questionList.answerTypeDescription === 'ChoiceBased') {
                    return (
                      <div
                        key={questionList.feedbackQuestionnaireId}
                        className='FeedbackQuestionWidget'
                      >
                        <p className='FeedbackQuestion'>
                          {i + 1}. {questionList.question}
                        </p>
                        <div className='FeedbackAnswerWidget'>
                          {questionList.answers.map((answer, i) => {
                            return (
                              <div
                                className='form-radio col-md-3'
                                key={answer.id}
                              >
                                <input
                                  className='form-radio-input'
                                  id={answer.id}
                                  type='radio'
                                  value={answer.answerName}
                                  name={questionList.feedbackQuestionnaireId}
                                  onChange={e =>
                                    this.handleSelected(
                                      answer.answerName,
                                      questionList.feedbackQuestionnaireId
                                    )}
                                />
                                <label
                                  className='form-radio-label'
                                  htmlFor={answer.id}
                                >
                                  {answer.answerName}
                                </label>
                                <span className='RadioBoxIcon' />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }

                  if (questionList.answerTypeDescription === 'OpenText') {
                    return (
                      <div
                        className='FeedbackQuestionWidget'
                        key={questionList.feedbackQuestionnaireId}
                      >
                        <p className='FeedbackQuestion'>
                          {i + 1}. {questionList.question}
                        </p>
                        <div className='FeedbackAnswerWidget'>
                          {questionList.answers.map((answer, i) => {
                            return (
                              <div key={answer.id} className='feedbackForm'>
                                <textarea
                                  id={answer.id}
                                  rows={4}
                                  className='form-control'
                                  value={this.state.textareaValue}
                                  onChange={e =>
                                    this.handleTextarea(
                                      e,
                                      questionList.feedbackQuestionnaireId
                                    )}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                  return questionList
                })}
          </div>
          : ''}

      </div>
    )
  }

  getFeedbackContent = (data) => {
    
  }

  render () {
    let summaryDetail = this.props.SummaryDetails
    let startdate = moment(summaryDetail.visitStartTime)
    let enddate = moment(summaryDetail.visitEndTime)
    let duration = moment.duration(enddate.diff(startdate))
    let hours = duration.hours()
    let modalContent = this.getFeedback()
    let modalTitle = 'Feedback'
    let modalType = ''
    let feedbackContent = []
    let progress_bar  = summaryDetail.totalTask !== 0 && summaryDetail.totalTask !==0 ?(this.props.taskCompleted/this.props.totaltask) * 100:0
    return (
      <React.Fragment>
        <form className='ServiceContent'>
          <div className='VisitSummaryWidget'>
            <div className='LeftWidget'>
              <div className='LeftContent'>
                <p className='SummaryContentTitle'>Service Visit Details</p>
                <div className='row'>
                  <div className='col-md-8'>
                    <p className='CategoryName'>
                      <span className='CategoryTitle'>
                        {summaryDetail.serviceRequestTypeVisits &&
                          getFields(
                            summaryDetail.serviceRequestTypeVisits,
                            'serviceTypeDescription'
                          )}
                      </span>
                      <span className='CategorySub'>
                        {summaryDetail.serviceCategoryDescription &&
                          summaryDetail.serviceCategoryDescription}
                      </span>
                    </p>
                  </div>
                  <div className='col-md-4'>
                    <div className='SummaryTime'>
                      <span>Visit Length</span>
                      <span className='SummaryTotalTime'>
                        {summaryDetail.originalTotalDuration} hrs
                      </span>
                    </div>
                    <div className='SummaryRange'>
                      <span className='bottomTaskName'>Tasks</span>
                      <span className='bottomTaskRange'>
                        <i
                          style={{ width: progress_bar }}
                          className='bottomTaskCompletedRange'
                        />
                      </span>
                      <span className='bottomTaskPercentage'>{progress_bar}%</span>
                    </div>
                  </div>
                </div>

                <div className='TabContainerWidget Individual'>
                  <Accordion>
                    {this.getServiceDetails(
                      summaryDetail.serviceRequestTypeVisits
                    )}

                  </Accordion>
                </div>
              </div>
            </div>
            <div className='RightWidget'>
              <div className='RightContent'>
                <p className='SummaryContentTitle'>Payment Details</p>

                <div className='row CostTableWidget'>
                  <div className='col-md-8 CostTableContainer Label'>
                    <p>
                      <span>Total Chargeable Time</span>
                      <span>Hourly Rate</span>
                    </p>
                    <p className='TaxLabel'>
                      <span>Total Visit Cost </span>
                      <span>Taxes and Fees</span>
                    </p>
                  </div>
                  <div className='col-md-4 CostTableContainer Cost'>
                    <p>
                      <span>{summaryDetail.originalTotalDuration} hrs</span>
                      <span>${summaryDetail.hourlyRate}/hr</span>
                    </p>
                    <p className='TaxCost'>
                      <span>${summaryDetail.totalCost}</span>
                      <span>${summaryDetail.taxAmount}</span>
                    </p>
                  </div>
                  <div className='col-md-12 CostTableContainer Total'>
                    <p className='TotalLabel'><span>Total Cost </span></p>
                    <p className='TotalCost'><span>${summaryDetail.totalCost}</span></p>
                  </div>
                </div>

                <div className='row EstimatedCostWidget m-0 mb-4'>
                  <div className='col-md-8 EstimatedCostContainer Label'>
                    <p>
                      <span>Submitted Claim</span>
                      <span>Out of Pocket Amount</span>
                    </p>
                  </div>
                  <div className='col-md-4 EstimatedCostContainer Cost'>
                    <p>
                      <span>$ {summaryDetail.estimatedClaim&&
                          summaryDetail.estimatedClaim}</span>
                      <span>
                        {summaryDetail.outOfPocketAmount &&
                          summaryDetail.outOfPocketAmount}
                      </span>
                    </p>
                  </div>
                </div>
                <p className='SummaryContentTitle mb-4'>Feedback</p>
                <div className='feedbackContainer'>
                  <p>
                    Rating obtained
                    {' '}
                    <span className='SPRating'>
                      <i className='Icon iconFilledStar' />4.2
                    </span>
                  </p>
                  {getLength(this.props.VisitFeedback)>0
                  ? <span
                  className='FeedbackLink'
                  onClick={this.props.FeedbackModal}
                >
                  Show Feedback
                </span> :  <p>
                    Your feedback is pending. Click
                    {' '}
                    <span
                      className='FeedbackLink'
                      onClick={this.togglePersonalDetails.bind(this)}
                    >
                      Here
                    </span>
                    {' '}
                    to submit feedback.
                  </p> }
                  
                 
                </div>
              </div>
            </div>
          </div>

        </form>
        <ProfileModalPopup
          isOpen={this.state.EditFeedbackDetailModal}
          toggle={this.togglePersonalDetails.bind(this, modalType)}
          ModalBody={modalContent}
          className='modal-lg asyncModal CertificationModal'
          modalTitle={modalTitle}
          centered='centered'
          onClick={this.onSubmit}
          disabled={this.state.disabledSaveBtn}
        />
         <ProfileModalPopup
          isOpen={this.state.ViewFeedbackDetailModal}
          toggle={this.togglePersonalDetails.bind(this, modalType)}
          ModalBody={modalContent}
          className='modal-lg asyncModal CertificationModal'
          modalTitle={modalTitle}
          centered='centered'
          onClick={this.onSubmit}
          disabled={this.state.disabledSaveBtn}
        />
      </React.Fragment>
    )
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getQuestionsList: () => dispatch(getQuestionsList()),
    saveAnswers: data => dispatch(saveAnswers(data))
  }
}

function mapStateToProps (state) {
  return {
    QuestionsList: state.visitSelectionState.VisitServiceProcessingState
      .FeedbackState.QuestionsList,
    patientDetails: state.visitSelectionState.VisitServiceProcessingState
      .PerformTasksState.PerformTasksList,
    ServiceRequestId: state.visitHistoryState.vistServiceHistoryState
      .ServiceRequestId,
      VisitFeedback:state.visitHistoryState.vistServiceHistoryState
      .VisitFeedback
    }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VistSummary)
)
