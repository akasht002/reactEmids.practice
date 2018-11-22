import React from "react";
import moment from "moment";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars, ProfileModalPopup } from "../../components";
import "./ProfileMainPanel.css";
import { convertStringToDate } from "../../utils/validations";
import {
  getServiceProviderVists,
  getServiceVisitCount,
  getEntityServiceProviderList,
  updateEntityServiceVisit
} from "../../redux/dashboard/Dashboard/actions";
import { getServiceRequestId,setEntityServiceProvider } from "../../redux/visitSelection/VisitServiceDetails/actions";
import { ServiceCalendarDefault, ShowIndicator } from "./ServiceInfo";
import { getUserInfo } from "../../services/http";
import { Path } from "../../routes";
import { setPatient } from "../../redux/patientProfile/actions";
import { push } from "../../redux/navigation/actions";
import { USERTYPES } from "../../constants/constants";
import { onCreateNewConversation } from "../../redux/asyncMessages/actions";
import { createVideoConference } from "../../redux/telehealth/actions";
import {  ModalPopup } from '../../components'
const today = new Date();

class serviceCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(today).format(),
      startMonth: moment(today).format("MMM"),
      startYear: moment(today).format("YYYY"),
      currentDate: moment().format("DD"),
      changedDate: "",
      DateDisable: false,
      selectedServiceProviderId: "",
      DateLabelClass: "DatePickerDisabled",
      EditPersonalDetailModal: false,
      reportDay: moment(today).format(),
      selectedMonth: {
        label: moment(today).format("MMM"),
        value: moment(today).format("MMM")
      },
      showMore: false,
      verticalScroll: true,
      width: window.innerWidth,
      isAlertModalOpen : false,
      phoneNumber:''
    };
    this.data = "";
  }

  togglePersonalDetails = (action, e) => {
    this.data = action;
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal
    });
  };

  onSubmit = () => {
    this.setState({
      EditPersonalDetailModal: !this.state.EditPersonalDetailModal
    });
    let model = {
      serviceRequestId: this.data.serviceRequestId,
      serviceRequestVisitId: this.data.serviceRequestVisitid,
      entityId: getUserInfo().entityId,
      patientId: this.data.patientId,
      visitAssignment: [
        {
          serviceProviderId: this.state.selectedServiceProviderId
        }
      ]
    };   
    this.props.updateEntityServiceVisit(model);
    this.initialCall()
    this.props.getServiceProviderVists(moment(this.data.visitDate).format("YYYY-MM-DD"));
  };

  MonthChange = e => {
    let curDate = moment(this.state.startYear + '-' + moment().month(e.value).format("M") + '- 01',"YYYY-MM-DD")

    this.setState({
      startDate: moment(curDate).format(),
      reportDay: moment(curDate).format(),
      selectedMonth: e.value
    });
    this.props.getServiceProviderVists(moment(curDate).format("YYYY-MM-DD"));
  };

  clickNextWeek = () => {
    let updatedDay = "";
    if (this.state.width > "1280") {
      updatedDay = moment(this.state.startDate).add(7, "days");
      this.props.getServiceProviderVists(updatedDay.format("YYYY-MM-DD"));
    } else {
      updatedDay = moment(this.state.startDate).add(5, "days");
      this.props.getServiceProviderVists(updatedDay.format("YYYY-MM-DD"));
    }
    this.setState({
      startDate: updatedDay.format(),
      startYear: updatedDay.format("YYYY"),
      reportDay: updatedDay.format(),
      startMonth: updatedDay.format("MMM"),
      selectedMonth: {
        label: updatedDay.format("MMM"),
        value: updatedDay.format("MMM")
      }
    });
  };

  clickPrevWeek = () => {
    let updatedDay = "";
    if (this.state.width > "1280") {
      updatedDay = moment(this.state.startDate).subtract(7, "days");
      this.props.getServiceProviderVists(updatedDay.format("YYYY-MM-DD"));
    } else {
      updatedDay = moment(this.state.startDate).subtract(5, "days");
      this.props.getServiceProviderVists(updatedDay.format("YYYY-MM-DD"));
    }
    this.setState({
      startDate: updatedDay.format(),
      startYear: updatedDay.format("YYYY"),
      reportDay: updatedDay.format(),
      startMonth: updatedDay.format("MMM"),
      selectedMonth: {
        label: updatedDay.format("MMM"),
        value: updatedDay.format("MMM")
      }
    });
  };

  todayDate = () => {
    this.setState({
      startYear: moment(today).format("YYYY"),
      startDate: moment(today).format(),
      reportDay: moment(today).format(),
      startMonth: moment(today).format("MMM"),
      currentDate: moment().format("DD"),
      selectedMonth: {
        label: moment(today).format("MMM"),
        value: moment(today).format("MMM")
      }
    });

    this.props.getServiceProviderVists(moment().format("YYYY-MM-DD"));
  };

  handleDayChange = e => {
    let getDate = moment(e.target.getAttribute("data-date"));
    this.setState({
      reportDay: e.target.getAttribute("data-date"),
      startYear: getDate.format("YYYY"),
      startMonth: getDate.format("MMM"),
      selectedMonth: {
        label: getDate.format("MMM"),
        value: getDate.format("MMM")
      },
      currentDate: getDate.format("DD")
    });
  };

  clickShowMore = () => {
    this.setState({
      showMore: !this.state.showMore,
      verticalScroll: !this.state.verticalScroll
    });
  };

  optionChanged = e => {
    this.setState({
      selectedValue: e
    });
  };

  initialCall = () => {   
    const date_range = {
      start_date:moment().subtract(3, 'months').format('YYYY-MM-DD'),
      end_date: moment().add(3, 'months').format('YYYY-MM-DD')
    }    
    this.props.getServiceVisitCount(date_range)
  }

  handlePhoneNumber = data =>{
    this.setState({isAlertModalOpen:!this.state.isAlertModalOpen,
                  phoneNumber:data.phoneNumber})
  }

  reset = () => {
    this.setState({isAlertModalOpen:!this.state.isAlertModalOpen})
  }


  componentDidMount() {
    let utc = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "-");
    this.props.getServiceProviderVists(utc);
    let d = new Date(utc);
    d.setMonth(d.getMonth() - 3);
    let start_date = d.toLocaleDateString();
    let d2 = new Date(utc);
    d2.setMonth(d2.getMonth() + 3);
    let end_date = d2.toLocaleDateString();
    const date_range = {
      start_date: start_date,
      end_date: end_date
    };
    this.props.getServiceVisitCount(date_range);
    this.props.getEntityServiceProviderList();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  SelectOnBlur(e) {}

  optionClicked = e => {
    let testDiv = document.getElementsByClassName("Select-menu-outer");
    testDiv.offsetBottom = testDiv.offsetTop + testDiv.offsetHeight;
  };

  showServiceProviderList = data => {
    let date = convertStringToDate(data.target.value);
    this.props.getServiceProviderVists(date);
  };

  handleserviceType = (item, e) => {
    if (e.target.checked) {
      this.setState({ selectedServiceProviderId: item.serviceProviderId });
    }
  };

  handleClick = requestId => {
    this.props.getServiceRequestId(requestId.serviceRequestId);
    getUserInfo().isEntityServiceProvider && this.props.setEntityServiceProvider(requestId.serviceProviderId)
    this.props.goToServiceRequestDetailsPage();
  };

  navigateProfileHeader = link => {
    switch (link) {
      case "conversationsummary":
        this.props.navigateProfileHeader(link);
        break;
      default:
        this.setState({ selectedLink: link });
        break;
    }
  };

  onClickConversation = item => {
    if (item) {
      let selectedParticipants = [
        {
          userId: item.patientId,
          participantType: USERTYPES.PATIENT
        }
      ];
      let userId = this.props.loggedInUser.serviceProviderId;
      let loggedInUser = {
        userId: userId,
        participantType: USERTYPES.SERVICE_PROVIDER
      };
      selectedParticipants.push(loggedInUser);
      let data = {
        participantList: selectedParticipants,
        createdBy: userId,
        createdByType: USERTYPES.SERVICE_PROVIDER,
        title: "",
        context: item.patientId
      };
      this.props.createNewConversation(data);
    }
  };

  onClickVideoConference = item => {
    if (item) {
      let selectedParticipants = [
        {
          userId: item.patientId,
          participantType: USERTYPES.PATIENT
        }
      ];
      this.props.createVideoConference(selectedParticipants);
    }
  };

  render() {
    let selectedDate = this.state.startDate;
    const visitCount = this.props.serviceVistCount;

    let dates = [
      {
        day: moment(selectedDate).subtract(2, "days"),
        date: moment(selectedDate).subtract(2, "days")
      },
      {
        day: moment(selectedDate).subtract(1, "days"),
        date: moment(selectedDate).subtract(1, "days")
      },
      {
        day: moment(selectedDate),
        date: moment(selectedDate)
      },
      {
        day: moment(selectedDate).add(1, "days"),
        date: moment(selectedDate).add(1, "days")
      },
      {
        day: moment(selectedDate).add(2, "days"),
        date: moment(selectedDate).add(2, "days")
      }
    ];

    if (this.state.width > "1280") {
      dates = [
        {
          day: moment(selectedDate).subtract(3, "days"),
          date: moment(selectedDate).subtract(3, "days")
        },
        {
          day: moment(selectedDate).subtract(2, "days"),
          date: moment(selectedDate).subtract(2, "days")
        },
        {
          day: moment(selectedDate).subtract(1, "days"),
          date: moment(selectedDate).subtract(1, "days")
        },
        {
          day: moment(selectedDate),
          date: moment(selectedDate)
        },
        {
          day: moment(selectedDate).add(1, "days"),
          date: moment(selectedDate).add(1, "days")
        },
        {
          day: moment(selectedDate).add(2, "days"),
          date: moment(selectedDate).add(2, "days")
        },
        {
          day: moment(selectedDate).add(3, "days"),
          date: moment(selectedDate).add(3, "days")
        }
      ];
    }

    let optionChecked = this.state.reportDay;

    let current_month = new Date().getMonth();
    let pervious_month = moment.months().splice(current_month - 3, 3);
    let next_month_list = moment.months().splice(current_month, 3);

    let monthLists = pervious_month.concat(next_month_list);

    let monthList = monthLists.map(month => {
      return { label: month.substring(0, 3), value: month };
    });
    let dateList = dates.map((daysMapping, i) => {
      let className = "";
      if (daysMapping.date.format() === moment(today).format()) {
        className = " toDay";
      }
      let data = visitCount.find(
        obj =>
          obj.visitDate === daysMapping.date.format("YYYY-MM-DD") + "T00:00:00"
      )
        ? visitCount.find(
            obj =>
              obj.visitDate ===
              daysMapping.date.format("YYYY-MM-DD") + "T00:00:00"
          ).visits
        : 0;
      return (
        <div className={"dateRow" + className}>
          <input
            id={"date" + daysMapping.date.format("DD")}
            data-date={daysMapping.date.format()}
            className="form-control"
            type="radio"
            name="profileDate"
            checked={optionChecked === daysMapping.date.format()}
            value={daysMapping.date.format("DDMMYYYY")}
            onClick={e => this.showServiceProviderList(e)}
          />
          <label
            htmlFor={"date" + daysMapping.date.format("DD")}
            className="dateLabel"
          >
            <span className="dayElement">{daysMapping.date.format("ddd")}</span>
            <span className="dateElement">{daysMapping.day.format("D")}</span>
          </label>
          <div className="eventIndicator">
            <ShowIndicator count={data} />
          </div>
        </div>
      );
    });

    let serviceVist = this.props.serviceVist;
    let visitData = (
      <ServiceCalendarDefault
        onClickConversation={data => this.onClickConversation(data)}
        onClickVideoConference={data => this.onClickVideoConference(data)}
        Servicelist={serviceVist}
        togglePersonalDetails={this.togglePersonalDetails}
        handleClick={requestId => this.handleClick(requestId)}
        onClick={link => this.navigateProfileHeader(link)}
        goToPatientProfile={data => {
          this.props.setPatient(data);
          this.props.goToPatientProfile();
        }}        
        handlePhoneNumber={this.handlePhoneNumber}
      />
    );

    let modalTitle = "Assign Service Provider";
    let modalType = "";
    let modalContent = this.props.serviceProviderList.map((item, index) => {
      let catNum = index + 1;
      return (
        <fieldset>
          <div className="CheckboxSet" key={item.id}>
            <input
              className="ServiceCheckbox"
              name={"ServiceStatus"}
              id={item.serviceProviderId}
              type="radio"
              value={item.serviceProviderId}
              onChange={e => this.handleserviceType(item, e)}
            />
            <label htmlFor={item.serviceProviderId}>
              {item.firstName + " " + item.lastName}
            </label>
          </div>
        </fieldset>
      );
    });

    return (
      <div
        className={
          this.state.showMore ? "card ProfileCard extended" : "card ProfileCard"
        }
      >
        <div className="ProfileCardBody">
          <div className="ProfileCardHeader">
            <span className="ProfileCardHeaderTitle primaryColor">
              Service Visits
            </span>
          </div>
          <div className="topPalette">
            <div className="monthPalette Center">
              <Select
                id="ProfileMonth"
                multiple={false}
                className="ProfileMonthList MonthName"
                searchable={false}
                options={monthList}
                onChange={this.MonthChange}
                value={this.state.selectedMonth}
              />
              <span>{this.state.startYear}</span>
            </div>
            <div className="todayPalette">
              <span
                className="btn ProfileCardTodayLink"
                onClick={this.todayDate}
              >
                Today
              </span>
            </div>
          </div>
          <div className="middlePalette">
            <div className="datePalette">
              <span
                className="ProfileCalendarCaret CaretPrev"
                onClick={this.clickPrevWeek}
              />
              <div onChange={this.handleDayChange} className="datesList">
                {dateList}
              </div>
              <span
                className="ProfileCalendarCaret CaretNext"
                onClick={this.clickNextWeek}
              />
            </div>
          </div>
          <Scrollbars
            speed={2}
            smoothScrolling
            horizontal={false}
            vertical={this.state.verticalScroll}
            className="bottomPalette"
          >
            <ul className="list-group ProfileServicesVisitList">{visitData}</ul>
          </Scrollbars>
        </div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item ProfileShowMore"
            onClick={this.clickShowMore}
          >
            Show more <i className="ProfileIconShowMore" />
          </li>
        </ul>
        <ProfileModalPopup
          isOpen={this.state.EditPersonalDetailModal}
          toggle={() => this.togglePersonalDetails(this, modalType)}
          ModalBody={modalContent}
          className="modal-lg asyncModal CertificationModal"
          modalTitle={modalTitle}
          centered="centered"
          onClick={this.onSubmit}
          disabled={this.state.disabledSaveBtn}
        />
         <ModalPopup
          isOpen={this.state.isAlertModalOpen}
          toggle={this.reset}
          ModalBody={<span>Phone Number : {this.state.phoneNumber}</span>}
          btn1='OK'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() =>{
            this.setState({
              isAlertModalOpen: false,
              phoneNumber:''
            })
          }
           }
          onCancel={() =>{
            this.setState({
              isAlertModalOpen: false,
              phoneNumber:''
            })
          }
           }
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getServiceProviderVists: data => dispatch(getServiceProviderVists(data)),
    getServiceVisitCount: data => dispatch(getServiceVisitCount(data)),
    getEntityServiceProviderList: () =>
      dispatch(getEntityServiceProviderList()),
    updateEntityServiceVisit: data => dispatch(updateEntityServiceVisit(data)),
    getServiceRequestId: data => dispatch(getServiceRequestId(data)),
    setPatient: data => dispatch(setPatient(data)),
    goToPatientProfile: () => dispatch(push(Path.patientProfile)),
    createNewConversation: data => dispatch(onCreateNewConversation(data)),
    createVideoConference: data => dispatch(createVideoConference(data)),
    goToServiceRequestDetailsPage: () =>
      dispatch(push(Path.visitServiceDetails)),
    setEntityServiceProvider:data =>dispatch(setEntityServiceProvider(data))
  };
}

function mapStateToProps(state) {
  return {
    serviceVist: state.dashboardState.dashboardState.serviceVist,
    serviceVistCount: state.dashboardState.dashboardState.serviceVistCount,
    serviceProviderList:
      state.dashboardState.dashboardState.serviceProviderList,
    loggedInUser: state.authState.userState.userData.userInfo
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(serviceCalendar)
);
