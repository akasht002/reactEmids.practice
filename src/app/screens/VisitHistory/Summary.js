import React, { Fragment } from "react";
import ReactToPrint from "react-to-print";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "react-accessible-accordion/dist/fancy-example.css";
import { getFields, getLength, getStatus, getServiceTypeImage, isNull, getFieldsFirstValue, calculateDistanceFromCoordinates } from "../../utils/validations";
import { ProfileModalPopup, AlertPopup, StarRating } from "../../components";
import { getUserInfo } from "../../services/http";
import {
  getQuestionsList,
  saveAnswerFeedback
} from "../../redux/visitSelection/VisitServiceProcessing/Feedback/actions";
import {
  getServiceProviderRating, getVisitFeedBack
} from '../../redux/visitHistory/VisitServiceDetails/actions'
import { Path } from '../../routes'
import { push } from '../../redux/navigation/actions';
import { ORG_SERVICE_PROVIDER_TYPE_ID, VISIT_TYPE, entityDashboardTab, ENTITY_DASHBOARD_STATUS, ERROR_MESSAGE, QUESTION_TYPE } from '../../constants/constants'
import Moment from 'react-moment'
import { Assessment } from "./assessment";
import { caseInsensitiveComparer } from "../../utils/comparerUtility";
import { setServiceProviderFeedbackTab } from "../../redux/dashboard/EntityDashboard/ServiceProvider/actions";
import { getFullName } from "../../utils/stringHelper";
import { isEntityUser } from "../../utils/userUtility";
import { CustomTextArea } from "../../components/Base";
import PrintView from "./PrintView";
import { removeValueFromString } from "../../utils/arrayUtility";

export class VistSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      EducationModal: false,
      rating: "",
      answerList: "",
      textareaValue: "",
      textareaData: "",
      EditFeedbackDetailModal: false,
      ViewFeedbackDetailModal: false,
      disabled: true,
      isAlertModalOpen: false,
      isSubmitButtonClicked: false
    };
    this.selectedAnswers = []
    this.normalizedSelectedAnswers = {}
  }

  componentDidMount() {
    if (this.props.SummaryDetails.serviceRequestVisitId) {
      this.props.getQuestionsList();
      this.props.getVisitFeedBack(this.props.SummaryDetails.serviceRequestVisitId)
      this.props.getServiceProviderRating(this.props.SummaryDetails.serviceRequestVisitId)
    } else {
      this.props.history.push(Path.visitHistory)
    }
  }


  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  toggleHiddenScreen = () => {
    this.setState({
      isOpen: false,
      filterOpen: false
    });
  };

  onConfirm = () => {
    this.setState({ ViewFeedbackDetailModal: false })
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    });
  };

  getServiceList = datas => {
    if (getLength(datas) > 0) {
      return datas.map((list, index) => {
        return (
          <div key={index} className="ServiceList Individual Summary">
            <label className="ServicesLink active" htmlFor="Services1">
              <div className="servicesDesc">
                <span className={"serviceName " + (list.statusId === 45 ? 'completedtask' : 'non_completedtask')} >
                  {list.serviceTaskDescription}
                </span>
              </div>
            </label>
            <span className="ServiceIndicatorBottom" />
          </div>
        );
      });
    } else {
      return <div>No Content</div>;
    }
  };

  getServiceDetails = lists => {
    if (lists) {
      return lists.map((list, index) => {
        let image_url = getServiceTypeImage(list.serviceRequestTypeTaskVisits && list.serviceRequestTypeTaskVisits.length > 0 && list.serviceRequestTypeTaskVisits[0].serviceTypeId);
        return (
          <AccordionItem>
            <AccordionItemTitle className="TabContainer">
              <img
                alt={"NO_IMAGE"}
                className="ServiceTasksImg"
                src={require(`../../assets/ServiceTypes/${image_url}`)}
              />{" "}
              <div className="TabHeaderContent">
                <span className="TabHeaderText">
                  {list.serviceTypeDescription}
                </span>
                <span>
                  <i className="SelectedTask">
                    {getLength(list.serviceRequestTypeTaskVisits) > 0 &&
                      getStatus(
                        list.serviceRequestTypeTaskVisits,
                        "statusId",
                        45
                      )}
                  </i>
                  <i className="TotalTasks">
                    /{getLength(list.serviceRequestTypeTaskVisits)}
                  </i>{" "}
                  task(s) completed
                </span>
              </div>
            </AccordionItemTitle>

            <AccordionItemBody>
              {this.getServiceList(list.serviceRequestTypeTaskVisits)}
            </AccordionItemBody>
          </AccordionItem>
        );
      });
    }
  };

  togglePersonalDetails() {
    this.setState({
      EditFeedbackDetailModal: !this.state.EditFeedbackDetailModal,
      disabled: true,
      isSubmitButtonClicked: false,
      isAlertModalOpen: false
    });
    this.normalizedSelectedAnswers = {}
    this.selectedAnswers = []
  }

  toggleShowFeedbackDetails(action, e) {
    this.setState({
      ViewFeedbackDetailModal: !this.state.ViewFeedbackDetailModal
    })
  }

  handleSelected = (answer, id) => {
    let answers = { feedbackQuestionnaireId: id, answerName: answer, id: 0 };
    let filteredData = this.selectedAnswers.filter(answer => {
      return answer.feedbackQuestionnaireId !== id;
    });
    filteredData.push(answers);
    this.selectedAnswers = filteredData;
    this.normalizedSelectedAnswers = {
      ...this.normalizedSelectedAnswers,
      [id]: id
    }
    this.setState({ answerList: filteredData });
  };

  handleMultiSelected = (e, answer, id) => {
    let selectedMultiAnswers = ''
    if (e.target.checked) {
        this.selectedAnswers.length > 0 ? this.selectedAnswers.map((item) => {
            if (id === item.feedbackQuestionnaireId) {
                return selectedMultiAnswers = item.answerName + ", " + answer
            } else {
                return selectedMultiAnswers = answer
            }
        }) : selectedMultiAnswers = answer
    } else {
        this.selectedAnswers.map((item) => {
            if (id === item.feedbackQuestionnaireId) {
                return selectedMultiAnswers = removeValueFromString(item.answerName, answer)
            }
        })
    }

    let answers = {
        feedbackQuestionnaireId: id,
        answerName: selectedMultiAnswers
    }
    let filteredData = this.selectedAnswers.filter((answer) => {
        return answer.feedbackQuestionnaireId !== id
    });
    filteredData.push(answers);
    this.selectedAnswers = filteredData;
}


  handleTextarea = (value, id) => {
    this.setState({
      textareaValue: value,
      textareaData: {
        feedbackQuestionnaireId: id,
        answerName: this.state.textareaValue
      }
    });
  };

  handleSelectedRating = e => {
    this.setState({ rating: e.target.value });
  };

  onClickNext = () => {
    if (this.props.QuestionsList.length === this.selectedAnswers.length) {
      this.onSubmit();
    } else {
      this.setState({ isAlertModalOpen: true, isSubmitButtonClicked: true })
    }
  };

  onSubmit = () => {
    this.props.getVisitFeedBack(this.props.SummaryDetails.serviceRequestVisitId)
    const data = {
      serviceRequestVisitId: this.props.SummaryDetails.serviceRequestVisitId,
      serviceRequestId: this.props.SummaryDetails.serviceRequestId,
      patientId: getUserInfo().serviceProviderId,
      answers: this.selectedAnswers,
      path: "visitHistory"
    };
    this.props.saveAnswerFeedback(data);
    this.setState({
      EditFeedbackDetailModal: !this.state.EditFeedbackDetailModal,
      isModalOpen: false
    });
    this.props.onSubmitFeedback();
  };

  getQuestionHiglight = (isAlerted) => {
    if (isAlerted
      && ((this.props.entityDashboardActiveTab === entityDashboardTab.serviceProviders)
        || caseInsensitiveComparer(this.props.activeSubTab, ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.feedBack))
      ) {
      return `FeedbackQuestion question-higlight`
    }
      return `FeedbackQuestion`
  }

  getFeedback = () => {
    return (
      <div className="FeedbackWidget py-4">
        <div className='FeedbackRating'>
          {this.props.SummaryDetails && this.props.SummaryDetails.patient
            ? <p>
              Please share your experience in engaging with
                {' '}
              {this.props.SummaryDetails.patient.firstName}
              {' '}
              {this.props.SummaryDetails.patient.lastName &&
                this.props.SummaryDetails.patient.lastName
              }
            </p>
            : ''}
        </div>
        {this.props.QuestionsList.length > 0 ? (
          <Fragment>
            {this.props.QuestionsList &&
              this.props.QuestionsList.map((questionList, i) => {
                let showError = this.state.isSubmitButtonClicked && isNull(this.normalizedSelectedAnswers[questionList.feedbackQuestionnaireId])
                if (questionList.answerTypeDescription === "ChoiceBased") {
                  return (
                    <div
                      key={questionList.feedbackQuestionnaireId}
                      className="FeedbackQuestionWidget pb-0"
                    >
                      <p className={showError ? 'alertedQuestionnaire' : 'FeedbackQuestion'}>
                        {i + 1}. {questionList.question}
                      </p>
                      <div className="FeedbackAnswerWidget">
                        {questionList.answers.map((answer, j) => {
                          return (
                            <div
                              className="form-radio col-md-4"
                              key={answer.id}
                            >
                              <input
                                className="form-radio-input"
                                id={answer.id}
                                type="radio"
                                value={answer.answerName}
                                name={"text" + i}
                                onChange={e =>
                                  this.handleSelected(
                                    answer.answerName,
                                    questionList.feedbackQuestionnaireId
                                  )
                                }
                              />
                              <label
                                className="form-radio-label"
                                htmlFor={answer.id}
                              >
                                {answer.answerName}
                                <span className="RadioBoxIcon" />
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if (questionList.answerTypeDescription === QUESTION_TYPE.MultiSelect) {
                  return (
                      <div key={questionList.feedbackQuestionnaireId} className="FeedbackQuestionWidget">
                          <p className={'FeedbackQuestion'}>
                              {i + 1}. {questionList.question}
                          </p>
                          <div className='FeedbackAnswerWidget'>
                              {questionList.answers.map((answer) => {
                                  this.props.VisitFeedback.map((feedback) => {
                                      let multipleCheckboxOption = feedback.selectedAnswer && feedback.selectedAnswer.split(',');
                                      multipleCheckboxOption && multipleCheckboxOption.map((item) => {
                                          if ((item).trim() === answer.answerName) {
                                              answer.checked = true;
                                          }
                                      })
                                  });
                                  return (
                                      <div className="form-check pr-3" key={answer.id}>
                                          <label className='form-check-label'>
                                              <input className="form-check-input"
                                                  id={answer.id}
                                                  type="checkbox"
                                                  value={answer.answerName}
                                                  name={questionList.feedbackQuestionnaireId}
                                                  checked={answer.checked}
                                                  disabled={this.props.VisitFeedback.length}
                                                  onChange={(e) => {
                                                      answer.checked = e.target.checked;
                                                      this.handleMultiSelected(e, answer.answerName, questionList.feedbackQuestionnaireId)
                                                  }}
                                              />
                                              {answer.answerName}
                                              <span className='CheckboxIcon' /></label>
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  )
              }

                if (questionList.answerTypeDescription === "OpenText") {
                  return (
                    <div
                      className="FeedbackQuestionWidget"
                      key={questionList.feedbackQuestionnaireId}
                    >
                      <p className="FeedbackQuestion">
                        {i + 1}. {questionList.question}
                      </p>
                      <div className="FeedbackAnswerWidget">
                        {questionList.answers.map((answer, i) => {
                          return (
                            <div key={answer.id} className="feedbackForm">
                              <CustomTextArea
                                  id={answer.id}
                                  rows={4}
                                  value={this.state.textareaValue}
                                  textChange={(e) => this.handleTextarea(
                                    e.target.value,
                                    questionList.feedbackQuestionnaireId
                                  )}
                                  maxlength={256}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return questionList;
              })}
          </Fragment>
        ) : (
            ""
          )}
      </div>
    );
  };

  getFeedbackContent = data => {
    return (
      <div className='FeedbackWidget'>
      {(isEntityUser() && !this.props.isServiceProviderFeedbackTab) &&
          <div className='FeedbackRating'>
            {this.props.summaryDetails.serviceProvider
              ? <p>
                Rated
                {` ${getFullName(this.props.summaryDetails.serviceProvider.firstName, 
                 this.props.summaryDetails.serviceProvider.lastName)}`}
              </p>
              : ''}
            <StarRating
              rating={getLength(this.props.VisitFeedback) > 0 &&
                getFieldsFirstValue(this.props.VisitFeedback, 'rating')}
            />
          </div>}
        {this.props.VisitFeedback.length > 0
          ? <div>
            {this.props.VisitFeedback &&
              this.props.VisitFeedback.map((questionList, i) => {
                return (
                  <div className='FeedbackQuestionWidget pb-0' key={i}>
                    <p className={this.getQuestionHiglight(questionList.feedbackAlertStatus)}>
                      {i + 1}. {questionList.question}
                    </p>
                    <div className='FeedbackAnswerWidget'>
                      {questionList.answers.map((answer, i) => {
                        let selectedAnswer = questionList.selectedAnswer && questionList.selectedAnswer.split(',')
                        selectedAnswer && selectedAnswer.map((item) => {
                          if ((item).trim() === answer.answerName) {
                              answer.checked = true;
                          }
                      })
                        return (
                          <div
                            className='form-radio col-md-4'
                            key={answer.id}
                          >
                            <input
                              className='form-radio-input'
                              id={answer.id}
                              type={questionList.answerTypeDescription === QUESTION_TYPE.ChoiceBased ? 'radio' : 'checkbox'}
                              value={answer.answerName}
                              name={questionList.feedbackQuestionnaireId}
                              onChange={e =>
                                this.handleSelected(
                                  answer.answerName,
                                  questionList.feedbackQuestionnaireId
                                )}
                              checked={answer.checked}
                              disabled={true}
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
              })}
          </div>
          : ''}

      </div>
    )
  }

  calculate = (totalTaskCompleted, totalTask) => {
    if (totalTaskCompleted !== 0 && totalTask !== 0) {
      return Math.round((totalTaskCompleted / totalTask) * 100);
    } else if (totalTask === 0) {
      return 0;
    } else {
      return 0;
    }
  };

  render() {
    let summaryDetail = this.props.SummaryDetails;
    let modalContent = this.getFeedback();
    let modalTitle = "Feedback";
    let modalType = "";
    let feedbackContent = this.getFeedbackContent(this.props.VisitFeedback)
    let isAssessment = this.props.savedScheduleType === VISIT_TYPE.assessment;
    let isEntity = getUserInfo().isEntityServiceProvider || getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID;
    let startPointToPOS = summaryDetail && ((summaryDetail.startLatitude === 0) && (summaryDetail.startLongitude === 0)) ? ERROR_MESSAGE.noLocationData : `${calculateDistanceFromCoordinates(summaryDetail.latitude, summaryDetail.longitude, summaryDetail.startLatitude, summaryDetail.startLongitude).toFixed(2)} (Miles)`
    let stopPointToPOS = summaryDetail && ((summaryDetail.endLatitude === 0) && (summaryDetail.endLongitude === 0)) ? ERROR_MESSAGE.noLocationData : `${calculateDistanceFromCoordinates(summaryDetail.latitude, summaryDetail.longitude, summaryDetail.endLatitude, summaryDetail.endLongitude).toFixed(2)} (Miles)`
    let radiusIndicator = (Number.parseFloat(this.props.thresholdRadius) >= Number.parseFloat(startPointToPOS)) ? 'inside-radius-indicator' : 'outside-radius-indicator'
    return (
      <React.Fragment>
        <form className="ServiceContent">
          <div className="VisitSummaryWidget">
            <div className={isAssessment ? "col-md-12 full-view-details" : "LeftWidget"}>
              <div className="LeftContent">
              <div className="d-flex">
              <div className="col-md-6 pl-0 pr-0 pb-2">
                <p className="SummaryContentTitle theme-primary">Service Details</p>
                </div>
                {isEntity && isAssessment &&
                <div className="col-md-6 pl-0 pr-0 pb-2">
                <span className='d-block'>
                  <ReactToPrint
                    trigger={() => <a href="#" className='btn btn-primary pull-right'>Print</a>}
                    content={() => this.componentRef}
                    pageStyle="@page { size: A4 portrait;}"
                  />
                  <div style={{ display: "none" }}>
                  <PrintView 
                    ref={el => (this.componentRef = el)} 
                    questionsList={this.props.assessmentQuestionsList}
                    userFeedbackInfo={this.props.userFeedbackInfo}
                  />
                  </div>
               </span>
               </div>
                }
               </div>
                <div className="row mb-3">
                  <div className="col-md-12 SummaryContentTable">
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">
                        Service Type(s)
                      </span>
                      {isAssessment ?
                        <span className='CategoryTitle'>
                          Assessment
                        </span>
                        :
                        <span className='CategoryTitle'>
                          {this.props.SummaryDetails.serviceRequestTypeVisits &&
                            getFields(
                              this.props.SummaryDetails.serviceRequestTypeVisits,
                              'serviceTypeDescription'
                            )}
                        </span>
                      }
                    </p>
                    {/* It may required in future */}
                    {/* {!isEntity &&
                      <p>
                        <span className="SummaryContentTableTitle">
                          Service Category
                      </span>
                        <span>
                          {summaryDetail.serviceCategoryDescription &&
                            summaryDetail.serviceCategoryDescription}
                        </span>
                      </p>} */}
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">Actual Visit Date</span>
                      <span>
                        <Moment format="ddd, DD MMM">{summaryDetail.visitStartTime}</Moment>
                      </span>
                    </p>
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">
                        Visit Duration (HH:MM)
                      </span>
                      <span>{summaryDetail.billedTotalDuration && summaryDetail.billedTotalDuration.substring(0, 5)}</span>
                    </p>
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">Tasks</span>
                      <div className="SummaryRange SummaryRangeWidget">
                        <span className="bottomTaskRange theme-primary">
                          <i
                            style={{
                              width:
                                this.calculate(
                                  summaryDetail.totalTaskCompleted,
                                  summaryDetail.totalTask
                                ) + "%"
                            }}
                            className="bottomTaskCompletedRange"
                          />
                        </span>
                        <span className="bottomTaskPercentage">
                          {this.calculate(
                            summaryDetail.totalTaskCompleted,
                            summaryDetail.totalTask
                          )}
                          %
                        </span>
                      </div>
                    </p>
                    {isEntityUser() &&
                    <React.Fragment>
                      <p className="m-0">
                        <span className={`SummaryContentTableTitle ${radiusIndicator}`}>Start Point to POS</span>
                        <span>{startPointToPOS}</span>
                      </p>
                      <p className="m-0">
                        <span className={`SummaryContentTableTitle ${radiusIndicator}`}>Stop Point to POS</span>
                        <span>{stopPointToPOS}</span>
                      </p>
                    </React.Fragment>
                    }
                  </div>
                </div>

                <div className="TabContainerWidget Individual">
                  {isAssessment ?
                    <Assessment questionsList={this.props.assessmentQuestionsList} />
                    :
                    <Accordion>
                      {this.getServiceDetails(
                        summaryDetail.serviceRequestTypeVisits
                      )}
                    </Accordion>
                  }
                </div>
              </div>
            </div>
            <div className="RightWidget">
              <div className="RightContent">
                {!isEntity &&
                  <Fragment>
                    <p className="SummaryContentTitle theme-primary">Payment Details</p>
                    <div className="row CostTableWidget">
                      <div className="col-md-8 CostTableContainer Label">
                        <p>
                          <span>Payment Date</span>
                          <span>Billable Time (HH:MM)</span>
                          <span>Hourly Rate</span>
                        </p>
                        <p className="TaxLabel">
                          <span>Total Visit Cost </span>
                          <span>Taxes and Fees</span>
                        </p>
                      </div>
                      <div className="col-md-4 CostTableContainer Cost">
                        <p>
                          <span><Moment format="ddd, DD MMM">{summaryDetail.paymentDate}</Moment></span>
                          <span>{summaryDetail.billedTotalDuration && summaryDetail.billedTotalDuration.substring(0, 5)}</span>
                          <span>
                            ${summaryDetail.hourlyRate && summaryDetail.hourlyRate.toFixed(2)}
                          </span>
                        </p>
                        <p className="TaxCost">
                          {summaryDetail.billedPerService || summaryDetail.billedPerService === 0 ?
                            <span>
                              $
                            {(summaryDetail.billedPerService && summaryDetail.billedPerService).toFixed(2)}
                            </span>
                            :
                            ''
                          }
                          {summaryDetail.taxPaid || summaryDetail.taxPaid === 0 ?
                            <span>${(summaryDetail.taxPaid).toFixed(2)}</span>
                            :
                            ''
                          }
                        </p>
                      </div>
                      <div className="col-md-12 CostTableContainer Total">
                        <p className="TotalLabel">
                          <span>Total Cost </span>
                        </p>
                        <p className="TotalCost">
                          {summaryDetail.billedPerService || summaryDetail.billedPerService === 0 ?
                            <span>
                              ${(summaryDetail.billedPerService + summaryDetail.taxPaid).toFixed(2)}
                            </span>
                            :
                            ''
                          }
                        </p>
                      </div>
                    </div>
                    <div className="row EstimatedCostWidget m-0 mb-4 theme-primary">
                      <div className="col-md-8 EstimatedCostContainer Label">
                        <p>
                          <span>Estimated Claim</span>
                          <span>Credit Card Payment</span>
                        </p>
                      </div>
                      <div className="col-md-4 EstimatedCostContainer Cost">
                        <p>
                          {summaryDetail.estimatedClaim === 0 ?
                            <span>$0.00</span>
                            :
                            <span>
                              ${summaryDetail.estimatedClaim &&
                                summaryDetail.estimatedClaim.toFixed(2)}
                            </span>
                          }
                          <span>
                            $
                        {summaryDetail.outOfPocketAmount &&
                              summaryDetail.outOfPocketAmount.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Fragment>
                }


                {!isAssessment && <Fragment>
                <p className="SummaryContentTitle mb-4 theme-primary">Feedback</p>
                <div className="feedbackContainer">
                {getLength(this.props.VisitFeedback) > 0 && (isEntityUser() && !this.props.isServiceProviderFeedbackTab) &&
                    <p>
                      Submitted rating:
                    {' '}
                      <span className='SPRating'>
                        <i className='Icon iconFilledStar' />{getLength(this.props.VisitFeedback) > 0 &&
                          getFieldsFirstValue(this.props.VisitFeedback, 'rating')}
                      </span>
                    </p>
                  }
                  {getLength(this.props.VisitFeedback) > 0 ? (
                    <span
                      className="FeedbackLink theme-primary"
                      onClick={this.toggleShowFeedbackDetails.bind(this)}
                    >
                      Show Feedback
                    </span>
                  ) : (
                      <p>
                        Your feedback is pending. Click{" "}
                        <span
                          className="FeedbackLink"
                          onClick={this.togglePersonalDetails.bind(this)}
                        >
                          HERE
                      </span>{" "}
                        to submit feedback.
                    </p>
                    )}
                </div>
                </Fragment>
                }
              </div>
            </div>
          </div>
        </form>
        <ProfileModalPopup
          isOpen={this.state.EditFeedbackDetailModal}
          toggle={this.togglePersonalDetails.bind(this, modalType)}
          ModalBody={modalContent}
          className="modal-lg FeedbackModal"
          modalTitle={modalTitle}
          centered="centered"
          onClick={this.onClickNext}
          discardBtn={true}
          discardbuttonLabel={'Cancel'}
          onDiscard={() => this.setState({ EditFeedbackDetailModal: false, isAlertModalOpen: false })}
        />
        <ProfileModalPopup
          isOpen={this.state.ViewFeedbackDetailModal}
          toggle={this.toggleShowFeedbackDetails.bind(this, modalType)}
          ModalBody={feedbackContent}
          className='modal-lg FeedbackModal'
          modalTitle={modalTitle}
          centered='centered'
          onClick={this.onConfirm}
          buttonLabel={'OK'}
          disabled={this.state.disabledSaveBtn}
        />
        <AlertPopup
          message='Please answer all the above questionnaire.'
          isOpen={this.state.isAlertModalOpen}
          onAcceptClick={() => this.setState({ isAlertModalOpen: false })}
        />
      </React.Fragment>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    getQuestionsList: () => dispatch(getQuestionsList()),
    saveAnswerFeedback: data => dispatch(saveAnswerFeedback(data)),
    getServiceProviderRating: data => dispatch(getServiceProviderRating(data)),
    getVisitFeedBack: data => dispatch(getVisitFeedBack(data)),
    goToSummary: () => dispatch(push(Path.summary)),
    setServiceProviderFeedbackTab: data => dispatch(setServiceProviderFeedbackTab(data))
  };
}

export function mapStateToProps(state) {
  const {thresholdRadius} = state.authState.userState
  const {ServiceRequestId, VisitFeedback, assessmentQuestionsList} = state.visitHistoryState.vistServiceHistoryState

  return {
    QuestionsList:
      state.visitSelectionState.VisitServiceProcessingState.FeedbackState
        .QuestionsList,
    patientDetails:
      state.visitSelectionState.VisitServiceProcessingState.PerformTasksState
        .PerformTasksList,
    isLoading: state.visitHistoryState.vistServiceHistoryState.isLoading,
    savedScheduleType: state.visitSelectionState.VisitServiceDetailsState.savedScheduleType,
    isPaymentAvailable: state.visitSelectionState.VisitServiceDetailsState.isPaymentAvailable,
    entityDashboardActiveTab: state.dashboardState.individualsListState.activeTab,
    activeSubTab: state.dashboardState.VisitServiceProviderState.activeSubTab,
    summaryDetails: state.visitHistoryState.vistServiceHistoryState.VisitServiceDetails,
    isServiceProviderFeedbackTab: state.dashboardState.VisitServiceProviderState.isServiceProviderFeedbackTab,
    thresholdRadius,
    ServiceRequestId,
    VisitFeedback,
    assessmentQuestionsList,
    userFeedbackInfo: state.visitHistoryState.vistServiceHistoryState.userFeedbackInfo
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VistSummary)
);
