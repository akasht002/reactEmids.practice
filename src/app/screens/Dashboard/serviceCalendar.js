import React from "react";
import moment from "moment";
import Select from "react-select";
import _ from 'lodash'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars, Input } from "../../components";
import "./ProfileMainPanel.css";
import { convertStringToDate } from "../../utils/validations";
import { formatPhoneNumber } from "../../utils/formatName"
import {
  getServiceProviderVists,
  getServiceVisitCount,
  getEntityServiceProviderList,
  updateEntityServiceVisit,
  getEntityServiceProviderListSearch,
  setServiceVisitDate
} from "../../redux/dashboard/Dashboard/actions";
import { getServiceRequestId, setEntityServiceProvider }
  from "../../redux/visitSelection/VisitServiceDetails/actions";
import { ServiceCalendarDefault, ShowIndicator } from "./ServiceInfo";
import { getUserInfo } from "../../services/http";
import { Path } from "../../routes";
import { setPatient, setESP } from "../../redux/patientProfile/actions";
import { push } from "../../redux/navigation/actions";
import { USERTYPES, CONTACT_NOT_FOUND, PHONE_NUMBER_TEXT } from "../../constants/constants";
import { onCreateNewConversation } from "../../redux/asyncMessages/actions";
import { createVideoConference, saveContextData } from "../../redux/telehealth/actions";
import { ModalPopup } from '../../components'
import { MAX_MONTH_LIMIT, IN_MAX_ARRAY, COUNT_BASED_MONTH, LAST_MONTH_ARRAY, END_MONTH,DEFAULT_TIME} from '../../constants/constants'
import { PREVIOUS_MONTH,NEXT_MONTH } from './constant'
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
      selectedServiceProviderId: null,
      DateLabelClass: "DatePickerDisabled",
      EditPersonalDetailModal: false,
      reportDay: moment(today).format(),
      selectedMonth: {
        label: moment(today).format("MMM") + ' ' + moment(today).format("YYYY"),
        value: moment(today).format("MMM")
      },
      showMore: false,
      verticalScroll: true,
      width: window.innerWidth,
      isAlertModalOpen: false,
      phoneNumber: '',
      selectedMonths: moment(today).format('M')
    };

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
    // this.initialCall()
    setTimeout(() => {
      this.props.getServiceProviderVists(moment(this.data.visitDate).format("YYYY-MM-DD"));
    }, DEFAULT_TIME)

    
  };


  getYear = (selectMonth) => {
    let current_year = moment().year()
    let current_month = parseInt(moment().month(), 10)
    if (_.includes(IN_MAX_ARRAY, parseInt(selectMonth, 10)) && _.includes(END_MONTH, current_month))
      return current_year + 1
    else if (_.includes(LAST_MONTH_ARRAY, parseInt(selectMonth, 10)))
      return parseInt(current_year, 10) - 1
    else
      return current_year
  }

  MonthChange = e => {
    let selectMonth = moment().month(e.value).format("M")
    let year = this.getYear(selectMonth)
    let curDate = moment(year + '-' + moment().month(e.value).format("M") + '- 01', "YYYY-MM-DD")
    this.setState({
      startDate: moment(curDate).format(),
      reportDay: moment(curDate).format(),
      selectedMonth: e.value,
      startYear: year,
      selectedMonths: moment().month(e.value).format("M")
    })
    this.startDateCalendar = moment(curDate).format('DD')
    this.endDateCalendar = moment(curDate).format('DD')
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
    let prev_month = parseInt(moment(this.state.startDate).format('MM'), 10)
    let next_month = parseInt(moment(updatedDay).format('MM'), 10)

    prev_month === next_month ? this.setState({
      startDate: updatedDay.format(),
      startYear: updatedDay.format("YYYY"),
      reportDay: updatedDay.format(),
      startMonth: updatedDay.format("MMM"),
      selectedMonths: updatedDay.format("M"),
      selectedMonth: {
        label: updatedDay.format("MMM") + ' ' + updatedDay.format('YYYY'),
        value: updatedDay.format("MMM")
      }
    }) : this.setState({
      startDate: moment(this.state.startDate).endOf('month').format(),
      startYear: moment(this.state.startDate).format('YYYY'),
      reportDay: moment(this.state.startDate).format(),
      startMonth: moment(this.state.startDate).format('MMM'),
      selectedMonths: moment(this.state.startDate).format("M"),
      selectedMonth: {
        label: moment(this.state.startDate).format('MMM') + ' ' + moment(this.state.startDate).format('YYYY'),
        value: moment(this.state.startDate).format('MMM')
      }
    })
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
      selectedMonths: updatedDay.format("M"),
      selectedMonth: {
        label: updatedDay.format("MMM") + ' ' + updatedDay.format('YYYY'),
        value: updatedDay.format("MMM")
      }
    })
  };

  todayDate = () => {
    let selectMonth = moment().month(today).format("M")
    let current_year = moment().year()
    let year = _.includes(IN_MAX_ARRAY, parseInt(selectMonth, 10)) ?
      parseInt(current_year, 10) + 1 : current_year
    this.setState({
      startYear: moment(today).format("YYYY"),
      startDate: moment(today).format(),
      reportDay: moment(today).format(),
      startMonth: moment(today).format("MMM"),
      currentDate: moment().format("DD"),
      selectedMonths: moment(today).format("M"),
      selectedMonth: {
        label: moment(today).format("MMM") + ' ' + year,
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
        label: getDate.format("MMM") + ' ' + getDate.format("YYYY"),
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
    let utc = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "-");
    let d = new Date(utc);
    d.setMonth(d.getMonth() - 3);
    const date_range = {
      start_date: moment().subtract(3, 'months').format('YYYY-MM-DD'),
      end_date: moment().add(3, 'months').format('YYYY-MM-DD')
    }
    if (this.props.serviceVisitDate) {
      utc = this.props.serviceVisitDate.format('YYYY-MM-DD');
      this.setState({
        startYear: this.props.serviceVisitDate.format('YYYY'),
        startDate: this.props.serviceVisitDate.format(),
        reportDay: this.props.serviceVisitDate.format(),
        startMonth: this.props.serviceVisitDate.format('MMM'),
        currentDate: this.props.serviceVisitDate.format('DD'),
        selectedMonth: {
          label: this.props.serviceVisitDate.format("MMM") + ' ' + this.props.serviceVisitDate.year(),
          value: this.props.serviceVisitDate.format("MMM")
        },
        selectedMonths: this.props.serviceVisitDate.format("M"),
      })
    }
    this.props.getServiceProviderVists(utc);
    this.props.getServiceVisitCount(date_range)
    this.props.setServiceVisitDate(null)
  }

  handlePhoneNumber = data => {
    this.setState({
      isAlertModalOpen: !this.state.isAlertModalOpen,
      phoneNumber: formatPhoneNumber(data.phoneNumber)
    })
  }

  reset = () => {
    this.setState({ isAlertModalOpen: !this.state.isAlertModalOpen })
  }


  componentDidMount() {
    this.initialCall();
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

  SelectOnBlur(e) { }

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
    this.props.setServiceVisitDate(moment(this.state.reportDay))
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
    this.props.setServiceVisitDate(moment(this.state.reportDay))
    if (item) {
      let selectedParticipants = [
        {
          userId: item.coreoHomeUserId,
          participantType: USERTYPES.PATIENT,
          participantId: item.patientId
        }
      ];
      let data = {
        participantList: selectedParticipants,
        title: "",
        context: item.patientId
      };
      this.props.createNewConversation(data);
    }
  };

  onClickVideoConference = item => {
    this.props.setServiceVisitDate(moment(this.state.reportDay))
    if (item) {
      let selectedParticipants = [
        {
          userId: item.coreoHomeUserId,
          participantType: USERTYPES.PATIENT,
          participantId: item.patientId,
          firstName: item.patientFirstName,
          lastName: item.patientLastName,
          thumbNail: item.patientImage
        }
      ];
      this.props.saveContextData(item.patientId);
      this.props.createDataStore(selectedParticipants);
    }
  };

  onchangeSearchServiceProvider = e => {
    this.props.getEntityServiceProviderListSearch(e.target.value)
  }

  getModalContent = (serviceProviderList) => {
    return (
      <form className="assign-serviceproblock">
        <Input
          id='participantsSearch'
          autoComplete='false'
          required='required'
          type='text'
          placeholder='Search By First Name'
          className='form-control searchParticipants'
          textChange={(e) => {
            this.onchangeSearchServiceProvider(e)
          }}
        />
        <div className="participantsSearchList">
          {serviceProviderList.map((item, index) => {
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
                  <div className={"avatarContainer"}>
                    <img
                      alt={'NO_IMAGE'}
                      key={index}
                      className='avatarImage avatarImageBorder'
                      src={item.thumbnail ? item.thumbnail : require('../../assets/images/Blank_Profile_icon.png')}
                    />
                  </div>
                  <label htmlFor={item.serviceProviderId}>
                    {item.firstName + " " + item.lastName}
                  </label>
                </div>
              </fieldset>)
          })}
        </div>
      </form>
    )
  }

  getDates = selectedDate => {
    // let dates = [];

    if (this.state.width > '1280')
      return [
        {
          day: moment(selectedDate).subtract(3, 'days'),
          date: moment(selectedDate).subtract(3, 'days')
        },
        {
          day: moment(selectedDate).subtract(2, 'days'),
          date: moment(selectedDate).subtract(2, 'days')
        },
        {
          day: moment(selectedDate).subtract(1, 'days'),
          date: moment(selectedDate).subtract(1, 'days')
        },
        {
          day: moment(selectedDate),
          date: moment(selectedDate)
        },
        {
          day: moment(selectedDate).add(1, 'days'),
          date: moment(selectedDate).add(1, 'days')
        },
        {
          day: moment(selectedDate).add(2, 'days'),
          date: moment(selectedDate).add(2, 'days')
        },
        {
          day: moment(selectedDate).add(3, 'days'),
          date: moment(selectedDate).add(3, 'days')
        }
      ]
    else
      return [
        {
          day: moment(selectedDate).subtract(2, 'days'),
          date: moment(selectedDate).subtract(2, 'days')
        },
        {
          day: moment(selectedDate).subtract(1, 'days'),
          date: moment(selectedDate).subtract(1, 'days')
        },
        {
          day: moment(selectedDate),
          date: moment(selectedDate)
        },
        {
          day: moment(selectedDate).add(1, 'days'),
          date: moment(selectedDate).add(1, 'days')
        },
        {
          day: moment(selectedDate).add(2, 'days'),
          date: moment(selectedDate).add(2, 'days')
        }
      ]
  }


  render() {
    // let selectedDate = this.state.startDate;
    const visitCount = this.props.serviceVistCount;
    let dates = this.getDates(this.state.startDate)
    let optionChecked = this.state.reportDay
    let count = this.state.width > '1280' ? 7 : 5

    let current_month = new Date().getMonth();
    let pervious_month = moment.months().splice(current_month - 3, PREVIOUS_MONTH);
    let next_month_list = moment.months().splice(current_month - 1, NEXT_MONTH);

    let nextYearMonth = current_month > MAX_MONTH_LIMIT && moment.months("MMM YYYY").splice(0, COUNT_BASED_MONTH[parseInt(current_month, 10)])
    let nextMonthLists = current_month > MAX_MONTH_LIMIT ? next_month_list.concat(nextYearMonth) : next_month_list

    let monthLists = pervious_month.concat(nextMonthLists)

    let monthList = monthLists.map(month => {
      let selectMonth = moment().month(month).format("M")
      let year = this.getYear(selectMonth)
      return { label: month.substring(0, 3) + ' ' + year, value: month };
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

    let start_day_month = parseInt(dates[0].date.format('MM'), 10)
    let end_day_month = parseInt(dates[(count - 1)].date.format('MM'), 10)
    let selectedMonth = parseInt(this.state.selectedMonths, 10)
    let visitData = (
      <ServiceCalendarDefault
        onClickConversation={data => this.onClickConversation(data)}
        onClickVideoConference={data => this.onClickVideoConference(data)}
        Servicelist={serviceVist}
        togglePersonalDetails={this.togglePersonalDetails}
        handleClick={requestId => this.handleClick(requestId)}
        onClick={link => this.navigateProfileHeader(link)}
        goToPatientProfile={data => {
          this.props.setServiceVisitDate(moment(this.state.reportDay))
          this.props.setPatient(data);
          this.props.goToPatientProfile();
        }}
        goToESPProfile={
          data => {
            this.props.setESP(data);
            this.props.goToESPProfile();
          }
        }
        handlePhoneNumber={this.handlePhoneNumber}
      />
    );

    let modalTitle = "Assign Service Provider";
    let modalType = "";
    let modalContent = this.getModalContent(this.props.serviceProviderList)
    return (
      <div
        className={
          this.state.showMore ? 'card ProfileCard extended' : 'card ProfileCard'
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
              {/* <span>{this.state.startYear}</span> */}
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
              {start_day_month === selectedMonth && <span
                className='ProfileCalendarCaret CaretPrev'
                onClick={this.clickPrevWeek.bind(this)}
              />}
              <div onChange={this.handleDayChange} className="datesList">
                {dateList}
              </div>
              {end_day_month === selectedMonth && <span
                className='ProfileCalendarCaret CaretNext'
                onClick={this.clickNextWeek.bind(this)}
              />}
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
        <ModalPopup
          isOpen={this.state.EditPersonalDetailModal}
          toggle={() => this.togglePersonalDetails(this, modalType)}
          ModalBody={modalContent}
          className="modal-lg asyncModal CertificationModal"
          modalTitle={modalTitle}
          showHeader={true}
          centered="centered"
          headerFooter='d-none'
          btn1='Assign'
          btn1Disable={!this.state.selectedServiceProviderId}
          btn2='Cancel'
          onConfirm={this.onSubmit}
          onCancel={() => {
            this.setState({
              EditPersonalDetailModal: false
            })
          }
          }
        />
        <ModalPopup
          isOpen={this.state.isAlertModalOpen}
          toggle={this.reset}
          ModalBody={<span>{this.state.phoneNumber
            === null
            ? CONTACT_NOT_FOUND
            : `${PHONE_NUMBER_TEXT}
            ${this.state.phoneNumber}`}</span>}
          btn1='OK'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() => {
            this.setState({
              isAlertModalOpen: false,
              phoneNumber: ''
            })
          }
          }
          onCancel={() => {
            this.setState({
              isAlertModalOpen: false,
              phoneNumber: ''
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
    setEntityServiceProvider: data => dispatch(setEntityServiceProvider(data)),
    setESP: data => dispatch(setESP(data)),
    goToESPProfile: () => dispatch(push(Path.ESPProfile)),
    getEntityServiceProviderListSearch: (data) => dispatch(getEntityServiceProviderListSearch(data)),
    setServiceVisitDate: (data) => dispatch(setServiceVisitDate(data)),
    saveContextData: (data) => dispatch(saveContextData(data))
  };
}

function mapStateToProps(state) {
  return {
    serviceVist: state.dashboardState.dashboardState.serviceVist,
    serviceVistCount: state.dashboardState.dashboardState.serviceVistCount,
    serviceProviderList:
      state.dashboardState.dashboardState.serviceProviderList,
    loggedInUser: state.authState.userState.userData.userInfo,
    serviceVisitDate: state.dashboardState.dashboardState.serviceVisitDate
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(serviceCalendar)
);
