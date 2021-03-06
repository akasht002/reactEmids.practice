import React, { Component,Fragment } from "react";
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
  setServiceVisitDate,
  goToServiceVisitProcessing
} from "../../redux/dashboard/Dashboard/actions";
import { getServiceRequestId, setEntityServiceProvider, setActiveTab }
  from "../../redux/visitSelection/VisitServiceDetails/actions";
import { ServiceCalendarList, ShowIndicator,ServiceVisitsDefault } from './Components/CalendarList'
import { CalendarDefault } from './Components/CalendarDefault'
import { getUserInfo } from "../../services/http";
import { Path } from "../../routes";
import { setPatient, setESP } from "../../redux/patientProfile/actions";
import { push } from "../../redux/navigation/actions";
import { USERTYPES, CONTACT_NOT_FOUND, PHONE_NUMBER_TEXT, STANDBY_MODE_MSG,M_FORMAT,DATE_FORMATS, PAGE_NO } from "../../constants/constants";
import { onCreateNewConversation } from "../../redux/asyncMessages/actions";
import { createVideoConference, saveContextData } from "../../redux/telehealth/actions";
import { ModalPopup } from '../../components'
import { IN_MAX_ARRAY, CALENDAR_DASHBOARD_LENGTH, LAST_MONTH_ARRAY, END_MONTH,DEFAULT_TIME} from '../../constants/constants'
import { START_VISIT, IN_PROGRESS } from './constant'
import { Preloader } from '../../components'
const today = new Date();

export class ServiceCalendar extends Component {

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
      editPersonalDetailModal: false,
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
      selectedMonths: moment(today).format('M'),
      standByModeAlertMsg: false,      
      pageNumber:1
    };

  }

  togglePersonalDetails = (action, e) => {
    this.data = action;
    this.setState({
      editPersonalDetailModal: !this.state.editPersonalDetailModal
    });
  };

  onSubmit = () => {
    this.setState({
      editPersonalDetailModal: !this.state.editPersonalDetailModal,
      pageNumber:1
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
      this.props.getServiceProviderVists(moment(this.data.visitDate).format(DATE_FORMATS.yyyy_mm_dd));
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
    let year = e.label.split(" ")[1];
    let curDate = moment(year + '-' + moment().month(e.value).format(M_FORMAT) + '- 01', DATE_FORMATS.yyyy_mm_dd)
    this.setState({
      startDate: moment(curDate).format(),
      reportDay: moment(curDate).format(),
      selectedMonth: e.value,
      startYear: year,
      selectedMonths: moment().month(e.value).format(M_FORMAT),
      pageNumber:1
    })
    this.startDateCalendar = moment(curDate).format('DD')
    this.endDateCalendar = moment(curDate).format('DD')
    this.props.getServiceProviderVists(moment(curDate).format(DATE_FORMATS.yyyy_mm_dd));
  };

  clickNextWeek = () => {
    let updatedDay = "";
    let days = this.state.width > "1280" ? 7 : 5;
    updatedDay = moment(this.state.startDate).add(days, DATE_FORMATS.days);
    this.props.getServiceProviderVists(updatedDay.format(DATE_FORMATS.yyyy_mm_dd))
    let prev_month = parseInt(moment(this.state.startDate).format(DATE_FORMATS.mm), 10)
    let next_month = parseInt(moment(updatedDay).format(DATE_FORMATS.mm), 10)

    this.setState({
      pageNumber:PAGE_NO,
      startDate:  prev_month === next_month ? updatedDay.format():moment(this.state.startDate).endOf(DATE_FORMATS.month).format(),
      startYear: prev_month === next_month ? updatedDay.format(DATE_FORMATS.yyyy): moment(this.state.startDate).format(DATE_FORMATS.yyyy),
      reportDay:  prev_month === next_month ? updatedDay.format():moment(this.state.startDate).format(),
      startMonth:  prev_month === next_month ? updatedDay.format(DATE_FORMATS.mmm):moment(this.state.startDate).format(DATE_FORMATS.mmm),
      selectedMonths:  prev_month === next_month ? updatedDay.format(M_FORMAT):moment(this.state.startDate).format(M_FORMAT),
      selectedMonth: {
        label:  prev_month === next_month ? updatedDay.format(DATE_FORMATS.mmm) + ' ' + updatedDay.format(DATE_FORMATS.yyyy):moment(this.state.startDate).format(DATE_FORMATS.mmm) + ' ' + moment(this.state.startDate).format(DATE_FORMATS.yyyy),
        value:  prev_month === next_month ? updatedDay.format(DATE_FORMATS.mmm) + ' ' + updatedDay.format(DATE_FORMATS.yyyy):moment(this.state.startDate).format(DATE_FORMATS.mmm)
      }
    })
  };

  clickPrevWeek = () => {
    let updatedDay = "";
    let days = this.state.width > "1280" ? 7 : 5;
    updatedDay = moment(this.state.startDate).subtract(days, "days");
    this.props.getServiceProviderVists(updatedDay.format(DATE_FORMATS.yyyy_mm_dd))
    this.setState({
      pageNumber:PAGE_NO,
      startDate: updatedDay.format(),
      startYear: updatedDay.format("YYYY"),
      reportDay: updatedDay.format(),
      startMonth: updatedDay.format("MMM"),
      selectedMonths: updatedDay.format(M_FORMAT),
      selectedMonth: {
        label: updatedDay.format("MMM") + ' ' + updatedDay.format('YYYY'),
        value: updatedDay.format("MMM")
      }
    })
  };

  todayDate = () => {
    let selectMonth = moment().month(today).format(M_FORMAT)
    let current_year = moment().year()
    let year = _.includes(IN_MAX_ARRAY, parseInt(selectMonth, 10)) ?
      parseInt(current_year, 10) + 1 : current_year
    this.setState({
      startYear: moment(today).format("YYYY"),
      startDate: moment(today).format(),
      reportDay: moment(today).format(),
      startMonth: moment(today).format("MMM"),
      currentDate: moment().format("DD"),
      selectedMonths: moment(today).format(M_FORMAT),
      selectedMonth: {
        label: moment(today).format("MMM") + ' ' + year,
        value: moment(today).format("MMM")
      }
    });

    this.props.getServiceProviderVists(moment().format(DATE_FORMATS.yyyy_mm_dd))
  };

  handleDayChange = e => {
    let getDate = moment(e.target.getAttribute("data-date"));
    this.setState({
      pageNumber:PAGE_NO,
      reportDay: e.target.getAttribute("data-date"),
      startYear: getDate.format(DATE_FORMATS.yyyy),
      startMonth: getDate.format(DATE_FORMATS.mmm),
      selectedMonth: {
        label: getDate.format(DATE_FORMATS.mmm) + ' ' + getDate.format(DATE_FORMATS.yyyy),
        value: getDate.format(DATE_FORMATS.mmm)
      },
      currentDate: getDate.format(DATE_FORMATS.dd)
    });
  };

  clickShowMore = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
      this.props.getServiceProviderVists(moment(this.state.reportDay).format(DATE_FORMATS.yyyy_mm_dd), this.state.pageNumber,true);
  })
  };

  optionChanged = e => {
    this.setState({
      selectedValue: e
    });
  };

  initialCall = () => {
    let utc = moment().format(DATE_FORMATS.yyyy_mm_dd);
    let d = new Date(utc);
    d.setMonth(d.getMonth() - 3);
    const date_range = {
      start_date: moment().subtract(3, 'months').format(DATE_FORMATS.yyyy_mm_dd),
      end_date: moment().add(3, 'months').format(DATE_FORMATS.yyyy_mm_dd)
    }
    if (this.props.serviceVisitDate) {
      let serviceVisitDate = moment(this.props.serviceVisitDate);
      utc = serviceVisitDate.format(DATE_FORMATS.yyyy_mm_dd);
      this.setState({
        startYear: serviceVisitDate.format('YYYY'),
        startDate: serviceVisitDate.format(),
        reportDay: serviceVisitDate.format(),
        startMonth: serviceVisitDate.format('MMM'),
        currentDate: serviceVisitDate.format('DD'),
        selectedMonth: {
          label: serviceVisitDate.format("MMM") + ' ' + serviceVisitDate.year(),
          value: serviceVisitDate.format("MMM")
        },
        selectedMonths: serviceVisitDate.format(M_FORMAT),
      })
    }
    this.props.getServiceProviderVists(utc)
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
    getUserInfo().isEntityServiceProvider && this.props.getEntityServiceProviderList();
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
    this.props.getServiceProviderVists(date)
  };

  handleserviceType = (item, e) => {
    if (e.target.checked) {
      this.setState({ selectedServiceProviderId: item.serviceProviderId });
    }
  };

  handleClick = (data, activeTab) => {
    this.props.setServiceVisitDate(moment(this.state.reportDay))
    this.props.getServiceRequestId(data.serviceRequestId);
    getUserInfo().isEntityServiceProvider && this.props.setEntityServiceProvider(data)
    this.props.setPatient(data.patientId);
    this.props.setActiveTab(activeTab)
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
    let dateArray = [];
    let len = this.state.width > '1280' ? 3 : 2;
    for(let i = len;i >= 0;i--){
       dateArray.push({
        day: moment(selectedDate).subtract(i, 'days'),
        date: moment(selectedDate).subtract(i, 'days')
      })
    }

    for(let i = 1;i <= len;i++){
      dateArray.push({
       day: moment(selectedDate).add(i, 'days'),
       date: moment(selectedDate).add(i, 'days')
     })
   }
   return dateArray;
  }

  goToServiceVisits = (data) => {
    this.props.setServiceVisitDate(moment(this.state.reportDay))
    if((data.visitStatusId === START_VISIT || data.visitStatusId === IN_PROGRESS) && this.props.isStandByModeOn.isServiceProviderInStandBy) {
      this.setState({ standByModeAlertMsg: true })
    }
    else this.props.goToServiceVisitProcessing(data)
  }

  getYears=()=>{
    let data = []
    let startMonth = moment(moment(today).format()).subtract(3, 'months')
    for(let i=0;i<=CALENDAR_DASHBOARD_LENGTH;i++){      
      let monthName = moment(moment(startMonth).format()).add(i, 'months').endOf('month').format(DATE_FORMATS.mmmyyy)
       data.push({ label: monthName, value: monthName.substring(0, 3) })
    }
    return data
  }

  getDateList = (dates,visitCount,optionChecked) => {
    return dates.map((daysMapping, i) => {
      let className = "";
      if (daysMapping.date.format() === moment(today).format()) {
        className = " toDay";
      }
      let data = visitCount.find(
        obj =>
          obj.visitDate === daysMapping.date.format(DATE_FORMATS.yyyy_mm_dd) + "T00:00:00"
      )
        ? visitCount.find(
          obj =>
            obj.visitDate ===
            daysMapping.date.format(DATE_FORMATS.yyyy_mm_dd) + "T00:00:00"
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
            <ShowIndicator count={data <= 2 ? data : 3} />
          </div>
        </div>
      );
    });
  }

  getVisitData = (serviceVisit)=> {
    let visitLength =  this.props.serviceVist && this.props.serviceVist.length
    let serviceVisits = <ServiceCalendarList
    onClickConversation={data => this.onClickConversation(data)}
    onClickVideoConference={data => this.onClickVideoConference(data)}
    Servicelist={serviceVisit}
    togglePersonalDetails={this.togglePersonalDetails}
    handleClick={this.handleClick}
    onClick={link => this.navigateProfileHeader(link)}
    goToPatientProfile={this.handleClick}
    goToESPProfile={
      data => {
        this.props.setESP(data);
        this.props.goToESPProfile();
      }
    }
    handlePhoneNumber={this.handlePhoneNumber}
    goToServiceVisits = {this.goToServiceVisits}
  />
    return this.props.isServiceVisitLoading ?<Preloader/>: visitLength > 0 ? (
      visitLength > 10 ? serviceVisits : 
      <Fragment> 
          {serviceVisits} 
          <ServiceVisitsDefault count={(10 - visitLength)}/> 
      </Fragment> 
      ):<CalendarDefault/>
  }

  render() {
    const visitCount = this.props.serviceVistCount;
    let dates = this.getDates(this.state.startDate)
    let optionChecked = this.state.reportDay
    let count = this.state.width > '1280' ? 7 : 5

    let monthList = this.getYears();

    let dateList = this.getDateList(dates,visitCount,optionChecked);

    let serviceVist = this.props.serviceVist;

    let start_day_month = parseInt(dates[0].date.format('MM'), 10)
    let end_day_month = parseInt(dates[(count - 1)].date.format('MM'), 10)
    let selectedMonth = parseInt(this.state.selectedMonths, 10)
    let visitData = this.getVisitData(serviceVist) 
    

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
          <div className="topPalette theme-primary">
            <div className="monthPalette">
            <span>From :</span>
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
            <div className="todayPalette theme-primary">
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
          {this.props.isServiceVisitLoading && <Preloader/>}
            <ul className="list-group ProfileServicesVisitList">
              {visitData}
              {(!this.props.disableShowMore && this.props.serviceVist.length > 0) && <li
              className="list-group-item ProfileShowMore theme-primary-light"
              onClick={this.clickShowMore}
              >
                Show more <i className="ProfileIconShowMore" />
              </li> }
            </ul>
          </Scrollbars>
        </div>
        
        <ModalPopup
          isOpen={this.state.editPersonalDetailModal}
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
              editPersonalDetailModal: false
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
        <ModalPopup
            isOpen={this.state.standByModeAlertMsg}
            ModalBody={<span>{STANDBY_MODE_MSG}</span>}
            btn1='OK'
            className='modal-sm'
            headerFooter='d-none'
            footer='d-none'
            centered='centered'
            onConfirm={() =>
              this.setState({
                standByModeAlertMsg: false
              })}
          />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getServiceProviderVists: (data,pageNumber,flag) => dispatch(getServiceProviderVists(data,pageNumber,flag)),
    getServiceVisitCount: data => dispatch(getServiceVisitCount(data)),
    getEntityServiceProviderList: () =>
      dispatch(getEntityServiceProviderList()),
    updateEntityServiceVisit: data => dispatch(updateEntityServiceVisit(data, 1)),
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
    saveContextData: (data) => dispatch(saveContextData(data)),
    goToServiceVisitProcessing: data => dispatch(goToServiceVisitProcessing(data)),
    setActiveTab: data => dispatch(setActiveTab(data))
  };
}

export function mapStateToProps(state) {
  return {
    serviceVist: state.dashboardState.dashboardState.serviceVist,
    serviceVistCount: state.dashboardState.dashboardState.serviceVistCount,
    serviceProviderList:
      state.dashboardState.dashboardState.serviceProviderList,
    loggedInUser: state.authState.userState.userData.userInfo,
    serviceVisitDate: state.dashboardState.dashboardState.serviceVisitDate,
    isServiceVisitLoading: state.dashboardState.dashboardState.isServiceVisitLoading,
    isStandByModeOn: state.profileState.PersonalDetailState.spBusyInVisit,    
    disableShowMore: state.dashboardState.dashboardState.disableShowMore
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServiceCalendar)
);
