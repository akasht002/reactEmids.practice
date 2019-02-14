import React, { Fragment } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "react-accessible-accordion/dist/fancy-example.css";
import { getFields, getLength, getStatus, getServiceTypeImage } from "../../utils/validations";
import { ProfileModalPopup } from "../../components";
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
import { ORG_SERVICE_PROVIDER_TYPE_ID } from '../../constants/constants'
class VistSummary extends React.Component {
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
      disabled: true
    };
    this.selectedAnswers = [];
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

  togglePersonalDetails(action, e) {
    this.setState({
      EditFeedbackDetailModal: !this.state.EditFeedbackDetailModal,
      disabled: true
    });
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
    this.setState({ answerList: filteredData });
    if (this.props.QuestionsList.length === this.selectedAnswers.length) {
      this.setState({ disabled: false });
    }
  };

  handleTextarea = (e, id) => {
    this.setState({
      textareaValue: e.target.value,
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
      this.onClickConfirm();
    }
  };

  onClickConfirm = () => {
    this.selectedAnswers = [];
    this.togglePersonalDetails();
  }

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

  getFeedback = () => {
    return (
      <div className="FeedbackWidget py-4">
        <div className='FeedbackRating'>
          {this.props.SummaryDetails && this.props.SummaryDetails.patient
            ? <p>
              Please share your experience in engaging
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
                if (questionList.answerTypeDescription === "ChoiceBased") {
                  return (
                    <div
                      key={questionList.feedbackQuestionnaireId}
                      className="FeedbackQuestionWidget"
                    >
                      <p className="FeedbackQuestion">
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
                              <textarea
                                id={answer.id}
                                rows={4}
                                className="form-control"
                                value={this.state.textareaValue}
                                onChange={e =>
                                  this.handleTextarea(
                                    e,
                                    questionList.feedbackQuestionnaireId
                                  )
                                }
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
        <div className='FeedbackRating'>
        </div>
        {this.props.VisitFeedback.length > 0
          ? <div>
            {this.props.VisitFeedback &&
              this.props.VisitFeedback.map((questionList, i) => {
                return (
                  <div className='FeedbackQuestionWidget' key={i}>
                    <p className='FeedbackQuestion'>
                      {i + 1}. {questionList.question}
                    </p>
                    <div className='FeedbackAnswerWidget'>
                      {questionList.answers.map((answer, i) => {
                        return (
                          <div
                            className='form-radio col-md-4'
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
                              checked={questionList.selectedAnswer === answer.answerName ? true : false}
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

    return (
      <React.Fragment>
        <form className="ServiceContent">
          <div className="VisitSummaryWidget">
            <div className="LeftWidget">
              <div className="LeftContent">
                <p className="SummaryContentTitle">Service Visit Details</p>
                <div className="row mb-3">
                  <div className="col-md-12 SummaryContentTable">
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">
                        Service Type(s)
                      </span>
                      <span>
                        {summaryDetail.serviceRequestTypeVisits &&
                          getFields(
                            summaryDetail.serviceRequestTypeVisits,
                            "serviceTypeDescription"
                          )}
                      </span>
                    </p>
                    <p>
                      <span className="SummaryContentTableTitle">
                        Service Category
                      </span>
                      <span>
                        {summaryDetail.serviceCategoryDescription &&
                          summaryDetail.serviceCategoryDescription}
                      </span>
                    </p>
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">
                        Visit Length (HH:MM)
                      </span>
                      <span>{summaryDetail.billedTotalDuration && summaryDetail.billedTotalDuration.substring(0, 5)}</span>
                    </p>
                    <p className="m-0">
                      <span className="SummaryContentTableTitle">Tasks</span>
                      <div className="SummaryRange SummaryRangeWidget">
                        <span className="bottomTaskRange">
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
                  </div>
                </div>

                <div className="TabContainerWidget Individual">
                  <Accordion>
                    {this.getServiceDetails(
                      summaryDetail.serviceRequestTypeVisits
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="RightWidget">
              <div className="RightContent">
                {getUserInfo().isEntityServiceProvider || getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID ?
                  ''
                  :
                  <Fragment>
                    <p className="SummaryContentTitle">Payment Details</p>
                    <div className="row CostTableWidget">
                      <div className="col-md-8 CostTableContainer Label">
                        <p>
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
                    <div className="row EstimatedCostWidget m-0 mb-4">
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



                <p className="SummaryContentTitle mb-4">Feedback</p>
                <div className="feedbackContainer">
                  {getLength(this.props.VisitFeedback) > 0 ? (
                    <span
                      className="FeedbackLink"
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
                          Here
                      </span>{" "}
                        to submit feedback.
                    </p>
                    )}
                </div>
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
          disabled={this.state.disabled}
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
      </React.Fragment>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getQuestionsList: () => dispatch(getQuestionsList()),
    saveAnswerFeedback: data => dispatch(saveAnswerFeedback(data)),
    getServiceProviderRating: data => dispatch(getServiceProviderRating(data)),
    getVisitFeedBack: data => dispatch(getVisitFeedBack(data)),
    goToSummary: () => dispatch(push(Path.summary))
  };
}

function mapStateToProps(state) {
  return {
    QuestionsList:
      state.visitSelectionState.VisitServiceProcessingState.FeedbackState
        .QuestionsList,
    patientDetails:
      state.visitSelectionState.VisitServiceProcessingState.PerformTasksState
        .PerformTasksList,
    ServiceRequestId:
      state.visitHistoryState.vistServiceHistoryState.ServiceRequestId,
    VisitFeedback: state.visitHistoryState.vistServiceHistoryState
      .VisitFeedback,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VistSummary)
);
