import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import { Scrollbars, AlertPopup } from '../../components';
import { PlanType } from './Components/PlanType';
import ServiceCategory from './Components/ServiceCategory';
import ServiceTypes from './Components/ServiceTypes';
import PointOfService from './Components/PointOfService';
import { AssignServiceProvider } from './Components/AssignServiceProvider';
import { AdditionalInformation } from './Components/AdditionalInformation';
import { ScheduleType } from './Components/ScheduleType';
import { validateCoordinates, formattedDateChange, formattedDateMoment, checkEmpty } from "../../utils/validations";
import { checkLength, allEqual, numbersOnly } from '../../utils/arrayUtility';
import { formatPhoneNumber } from '../../utils/formatName'
import {
    getServiceCategory,
    getServiceType,
    selectOrClearAllServiceType,
    getPatientAddress,
    getStates,
    setSelectedPos,
    getValidPatientAddressSuccess,
    getValidPatientAddress,
    getEntityServiceProviderList,
    getRecurringPattern,
    getDays,
    createSchedule,
    editSchedule,
    getEntityServiceProviderListSearch,
    selectESP,
    clearESPListSchedule,
    createOrEditAssessment,
    isScheduleEdit,
    isAssessmentEdit
} from '../../redux/schedule/actions';
import { getDiffTime, getHourMin, formateMDYY } from "../../utils/dateUtility";
import './Components/styles.css'
import { PlanTypeData, ScheduleTypeData, weekRecurring } from './data/index'
import { validate } from './data/validate'
import Search from '../VisitSelection/VisitServiceList/Search'
import { Path } from '../../routes'
import { push } from '../../redux/navigation/actions'
import moment from 'moment'
import { RECURRING_PATTERN_OPTIONS, PAGE_NO, DEFAULT_PAGE_SIZE_ESP_LIST, SCHEDULE_TYPE_OPTIONS, CONTACT_NOT_FOUND, PHONE_NUMBER_TEXT, SERVICE_CATEGORY } from '../../constants/constants'

export class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedServiceCategoryId: SERVICE_CATEGORY.adl.id,
            selectedServiceType: {},
            selectedPOS: '0',
            state: '',
            startDate: '',
            endDate: '',
            startTime: null,
            endTime: null,
            durationTime: null,
            isRecurring: false,
            selectedRecurringType: RECURRING_PATTERN_OPTIONS.weekly,
            monthlyDay: '',
            monthlyMonths: '',
            selectedWeeks: '',
            selectedDays: '',
            dailyDayOccurence: '',
            weeklyDayOccurence: '',
            monthlyMonthsSecond: '',
            selectedDaysLabel: '',
            selectedWeeksLabel: '',
            planType: this.props.scheduleList && this.props.scheduleList.length > 0 ? SCHEDULE_TYPE_OPTIONS.standard : SCHEDULE_TYPE_OPTIONS.assessment, 
            serviceTypeSelected: false,
            startDateSelected: false,
            pageNumber: PAGE_NO,
            pageSize: DEFAULT_PAGE_SIZE_ESP_LIST,
            searchOpen: false,
            isModalOpen: false,
            additionalDescription: '',
            isIndividualScheduleEdit: false,
            assessmentId: 0,
            patientAddressId: 0,
            planScheduleId: 0,
            description: '',
            phoneNumberModal: false,
            phoneNumber: '',
            isAssessmentEdit: false,
            isDefaultAddress: false,
            planTypeAlertPopup: false
        }
        this.serviceTypes = [];
        this.categoryId = SERVICE_CATEGORY.adl.id;
        this.address = {}
        this.espId = '';
        this.weeklySelectedDays = [];
        this.formatedStartTime = "";
        this.formatedEndTime = "";
        this.selectedDaysLabel = "";
        this.selectedWeeksLabel = "";
        this.isDataEntered = false
    }

    componentDidMount() {
        let data = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        if (this.props.patientId) {
            this.props.getServiceCategory(this.categoryId);
            this.props.getPatientAddress(this.props.patientId);
            this.props.getStates();
            this.props.getEntityServiceProviderList(data);
            this.props.getRecurringPattern();
            this.props.getDays(this.props.individualSchedulesDetails.weekly && this.props.individualSchedulesDetails.weekly.days);
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.isIndividualScheduleEdit === true) {
            return null;
        }
        else if (props.isAssessmentEdit) {
            return null;
        }

        if (props.patientAddressList.length > 0 && !state.isDefaultAddress) {
            let validAddress;
            let address = props.patientAddressList.filter((add) => {
                return add.isPrimaryAddress;
            });

            if (address.length > 0) {
                validAddress = address[0];
                if (validateCoordinates(validAddress.latitude, validAddress.longitude)) {
                    props.getValidPatientAddressSuccess(true)
                }
            }
            else {
                validAddress = props.patientAddressList.length > 0 && props.patientAddressList[0];
            }

            return {
                addressType: validAddress.addressType,
                selectedPOS: validAddress.addressId,
                street: validAddress.street,
                city: validAddress.city,
                zip: validAddress.zip,
                state: validAddress.stateId,
                statelabel: validAddress.stateName,
                isDefaultAddress: true
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let data = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        if (this.props.isIndividualScheduleEdit === true) {
            this.setState({ isIndividualScheduleEdit: true, planType: SCHEDULE_TYPE_OPTIONS.standard })
            this.selectNew();
            this.props.getEntityServiceProviderList(data, this.props.individualSchedulesDetails.serviceProviderId);
            this.props.isScheduleEdit(false)
        } else if (this.props.isAssessmentEdit) {
            this.setState({ isAssessmentEdit: true, planType: SCHEDULE_TYPE_OPTIONS.assessment })
            this.selectForAssessment();
            this.props.getEntityServiceProviderList(data, this.props.assessmentDetails.serviceProviderId);
            this.props.assessmentEdit(false)
        }
    }

    selectForAssessment = () => {
        let data = this.props.assessmentDetails;
        this.setState({
            assessmentId: data.assessmentId,
            checkedServiceCategoryId: data.categoryId,
            startDate: data.startDate,
            endDate: data.endDate,
            startTime: moment(data.startTime, 'h:mm a'),
            endTime: moment(data.endTime, 'h:mm a'),
            duration: data.duration,
            additionalDescription: data.addInformation,
            patientAddressId: data.patientAddressId,
            addressType: '',
            selectedPOS: data.patientAddressId
        })
        this.address = {
            patientAddressId: data.patientAddressId,
            streetAddress: data && data.streetAddress,
            city: data && data.city,
            stateId: data && data.stateId,
            stateName: data && data.stateName,
            zip: data && data.zip,
            addressType: this.state.addressType,
            latitude: data.latitude,
            longitude: data.longitude
        }
        this.espId = data.serviceProviderId;
    }


    selectNew = () => {
        let data = this.props.individualSchedulesDetails;
        this.categoryId = data.categoryId;
        this.serviceTypes = data.serviceTypes;
        this.props.getServiceCategory(data.categoryId, this.serviceTypes);
        data.monthly !== null && this.handleChangeSelectedDays(data.monthly.weekDayMonth && data.monthly.weekDayMonth.day);
        data.monthly !== null && this.handleChangeSelectedWeeks(data.monthly.weekDayMonth && data.monthly.weekDayMonth.week);
        this.setState({
            selectedPOS: data.patientAddressId,
            planType: SCHEDULE_TYPE_OPTIONS.standard,
            checkedServiceCategoryId: data.categoryId,
            startDate: data.startDate,
            endDate: data.endDate,
            startTime: moment(data.startTime, 'h:mm a'),
            endTime: moment(data.endTime, 'h:mm a'),
            additionalDescription: data.description,
            patientAddressId: data.patientAddressId,
            planScheduleId: data.planScheduleId,
            isRecurring: data.isRecurring,
            weeklyDayOccurence: data.weekly && data.weekly.dayOccurence,
            dailyDayOccurence: data.daily && data.daily.dayOccurence,
            selectedRecurringType: data.schedulePattern && data.schedulePattern,
            monthlyDay: data.monthly !== null && data.monthly.dayMonth && data.monthly.dayMonth.day,
            monthlyMonths: data.monthly !== null && data.monthly.dayMonth && data.monthly.dayMonth.month,
            selectedDaysId: data.monthly !== null && data.monthly.weekDayMonth && data.monthly.weekDayMonth.day,
            selectedDaysLabel: this.selectedDaysLabel,
            selectedWeeks: data.monthly !== null && data.monthly.weekDayMonth && data.monthly.weekDayMonth.week,
            selectedWeeksLabel: this.selectedWeeksLabel,
            monthlyMonthsSecond: data.monthly !== null && data.monthly.weekDayMonth && data.monthly.weekDayMonth.month
        })
        this.weeklySelectedDays = data.weekly ? data.weekly.days : [];
        this.espId = data.serviceProviderId;
        this.address = {
            patientAddressId: data.patientAddressId,
            streetAddress: data.address && data.address.streetAddress,
            city: data.address && data.address.city,
            stateId: data.address && data.address.stateId,
            stateName: data.address && data.address.stateName,
            zip: data.address && data.address.zip,
            latitude: data.address && data.address.latitue,
            longitude: data.address && data.address.longitude,
            addressType: this.state.addressType
        }
    }

    handleChangePlanType = (id) => {
        this.setState({ planTypeId: id })
        if (this.isDataEntered) {
            this.setState({ planTypeAlertPopup: true })
        } else {
            this.setState({
                planType: id,
                planTypeAlertPopup: false,
                isRecurring: false,
                startDate: '',
                endDate: '',
                startTime: null,
                endTime: null,
                durationTime: null
            })
            this.serviceTypes = [];
            this.categoryId = SERVICE_CATEGORY.adl.id;
            this.address = {}
            this.espId = '';
        }
    }

    handelTypeChange = () => {
        this.isDataEntered = false
        this.handleChangePlanType(this.state.planTypeId);
    }

    handleServiceCategory = (id) => {
        this.categoryId = id;
        this.serviceTypes = [];
        this.props.getServiceType(id);
        this.isDataEntered = true;
        this.setState({ checkedServiceCategoryId: id, serviceTypeSelected: false })
    }

    handleServiceType = (data, e) => {
        data.selected = !data.selected

        if (data.selected) {
            this.serviceTypes.push(data)
        } else {
            this.serviceTypes.splice(this.serviceTypes.findIndex(item => {
                return item.serviceTypeId === parseInt(e.target.value, 0);
            }), 1);
        }
        this.setState({
            serviceTypeId: this.serviceTypes,
            serviceTypeSelected: false
        })
        this.isDataEntered = true;
    }

    selectAllTypes = (isSelectAll) => {
        this.props.selectOrClearAllServiceType(this.categoryId, isSelectAll)
        if (isSelectAll) {
            this.serviceTypes = this.props.serviceTypeList;
        } else {
            this.serviceTypes = [];
        }
        this.isDataEntered = true;
    }

    handlePOSAddress = (e) => {
        let currentValue = e.target.value
        this.setState({
            addressType: '',
            selectedPOS: currentValue,
            street: '',
            city: '',
            zip: '',
            statelabel: '',
            selectedOptionState: null,
            isDefaultAddress: true
        });
        this.props.setSelectedPos(e.target.value)
        if (e.target.value === '0') {
            this.props.getValidPatientAddressSuccess(false)
        }
        this.isDataEntered = true;
    }

    handlePatientAddress = (e) => {
        e.isPrimaryAddress = !e.isPrimaryAddress
        this.setState({
            patientAddressId: e.addressId,
            selectedPOS: e.addressId,
            street: e.street,
            city: e.city,
            zip: e.zip,
            statelabel: e.stateName,
            selectedOptionState: e.stateId,
            addressType: e.addressTypeId,
            latitude: e.latitude,
            longitude: e.longitude,
            state: e.stateId,
            isDefaultAddress: true
        })

        this.address = {
            patientAddressId: e.addressId,
            streetAddress: e.addressId,
            city: e.city,
            stateId: e.stateId,
            stateName: e.stateName,
            zip: e.zip
        }
        this.props.setSelectedPos(e.addressId)
        this.props.getValidPatientAddressSuccess(validateCoordinates(e.latitude, e.longitude))
        this.isDataEntered = true;
    }

    handelNewAddress = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            isDefaultAddress: true
        })
        this.address = {
            patientAddressId: 0,
            streetAddress: this.state.street,
            city: this.state.city,
            stateId: this.state.stateId,
            stateName: this.state.statelabel,
            zip: this.state.zip,
            addressType: this.state.addressType
        }
        this.isDataEntered = true;
    }

    statehandleChange = (selectedOptionState) => {
        let selectedValue = '';
        let valueData = parseInt(selectedOptionState, 10);
        this.props.stateList.map((state => {
            return state.id === valueData ? selectedValue = state.name : ''
        }))

        this.setState({
            state: selectedOptionState,
            statelabel: selectedValue,
            stateId: selectedOptionState
        });

        this.isDataEntered = true;
    }

    handleAssignServiceProvider = (id) => {
        this.espId = parseInt(id, 0);
        this.props.selectESP(id)
        this.isDataEntered = true;
    }

    handleAdditionInfo = e => {
        this.setState({ additionalDescription: e.target.value })
        this.isDataEntered = true;
    }

    handleChangeScheduleType = (data) => {
        this.setState({
            isRecurring: data,
            onClickSave: false,
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null
        })
        this.isDataEntered = true;
    }

    dateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        const formattedMDYY = formateMDYY(formattedDate)
        this.setState({
            startDate: formattedMDYY
        });
        this.isDataEntered = true;
    }

    dateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({
            startDate: formattedDate
        });
        this.isDataEntered = true;
    }

    todateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        const formattedMDYY = formateMDYY(formattedDate)
        this.setState({
            endDate: formattedMDYY
        });
        this.isDataEntered = true;
    }

    todateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({
            endDate: formattedDate
        });
        this.isDataEntered = true;
    }

    handleChangeStartTime = (event) => {
        this.formatedStartTime = getHourMin(event)
        this.setState({ startTime: event });
        this.isDataEntered = true;
    }

    handleChangeEndTime = (event) => {
        this.formatedEndTime = getHourMin(event)
        this.setState({ endTime: event });
        this.isDataEntered = true;
    }

    handleChangeRecurringPattern = (id) => {
        this.setState({
            selectedRecurringType: id,
            monthlyDay: '',
            monthlyMonths: '',
            selectedWeeks: '',
            selectedDays: '',
            dailyDayOccurence: '',
            weeklyDayOccurence: '',
            monthlyMonthsSecond: '',
            selectedDaysLabel: '',
            selectedWeeksLabel: '',
        })
        this.isDataEntered = true;
    }

    handleSelectDailyOptionField = (id) => {
        this.isDataEntered = true;
    }

    handleSelectWeeklyOptionField = (id) => {
        this.isDataEntered = true;
    }

    handleChangeDailyDayOccurence = (data) => {
        this.setState({ dailyDayOccurence: numbersOnly(data) })
        this.isDataEntered = true;
    }

    handleChangeWeeklyDayOccurence = (data) => {
        this.setState({ weeklyDayOccurence: numbersOnly(data) })
        this.isDataEntered = true;
    }

    handleChangeDaysSelection = (e) => {
        if (e.target.checked) {
            this.weeklySelectedDays.push(parseInt(e.target.id, 0))
        }
        else {
            this.weeklySelectedDays = this.weeklySelectedDays.filter(item => {
                return item !== parseInt(e.target.id, 0);
            })
        }
        this.isDataEntered = true;
    }

    handleChangeMonthlySelectionFirst = (id) => {
        this.setState({
            monthlyOptions: id,
            selectedDaysLabel: '',
            selectedWeeksLabel: '',
            selectedDaysId: '',
            selectedWeeks: ''
        })
        this.selectedDaysLabel = "";
        this.selectedWeeksLabel = "";
        this.isDataEntered = true;
    }

    handleChangeMonthlySelectionSecond = (id) => {
        this.setState({
            monthlyOptions: id,
            monthlyDay: '',
            monthlyMonths: ''
        })
        this.isDataEntered = true;
    }

    handleChangeMonthlyDay = (data) => {
        this.setState({ monthlyDay: numbersOnly(data) })
        this.isDataEntered = true;
    }

    handleChangeMonthlyMonths = (data) => {
        this.setState({ monthlyMonths: numbersOnly(data) })
        this.isDataEntered = true;
    }

    handleChangeSelectedWeeks = (selectedOptionId) => {
        let selectedValue = '';
        let valueData = parseInt(selectedOptionId, 10);
        this.props.daysList.map((item => {
            return item.id === valueData ? selectedValue = item.keyValue : ''
        }))

        this.setState({
            selectedWeeksId: parseInt(selectedOptionId, 10),
            selectedWeeksLabel: selectedValue
        });
        this.selectedWeeksLabel = selectedValue;
        this.isDataEntered = true;
    }

    handleChangeSelectedDays = (selectedOptionId) => {
        let selectedValue = '';
        let valueData = parseInt(selectedOptionId, 10);
        weekRecurring.map((item => {
            return item.id === valueData ? selectedValue = item.value : ''
        }))

        this.setState({
            selectedDaysId: parseInt(selectedOptionId, 0),
            selectedDaysLabel: selectedValue
        });
        this.selectedDaysLabel = selectedValue;
        this.isDataEntered = true;
    }

    handleChangeMonthlyMonthsSecond = (data) => {
        this.setState({ monthlyMonthsSecond: numbersOnly(data) })
        this.isDataEntered = true;
    }

    toggleSearch = () => {
        if (this.state.searchOpen) {
            this.props.clearESPListSchedule()
            let data = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            this.props.getEntityServiceProviderList(data, this.props.individualSchedulesDetails.serviceProviderId);
        }
        this.setState({
            searchOpen: !this.state.searchOpen,
            searchKeyword: '',
            pageNumber: 1,
            pageSize: 9
        })
    }

    handleSearchkeyword = e => {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    handleSearchData = (e) => {
        e.preventDefault();
        let data = {
            searchKeyword: this.state.searchKeyword,
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        this.props.getEntityServiceProviderListSearch(data)
    }

    validate = (data) => {
        let value = []
        data.map((d) => {
            let txt = d.isState ? this.state[d.key] : this[d.key]
            switch (d.validation) {
                case 'required':
                    value.push(checkEmpty(txt))
                    break;
                case 'checkLength':
                    value.push(checkLength(txt))
                    break;
                default:
            }
        })
        return allEqual(value);
    }

    checkValidAddress = () => {

        this.setState({ onClickSave: true })
        if (parseInt(this.state.planType, 10) === SCHEDULE_TYPE_OPTIONS.standard) {

            let savePlan;

            if (!this.state.isRecurring) {
                savePlan = this.validate(validate.oneTime)
            } else if (this.state.selectedRecurringType === RECURRING_PATTERN_OPTIONS.daily) {
                savePlan = this.validate(validate.recurring.daily)
            } else if (this.state.selectedRecurringType === RECURRING_PATTERN_OPTIONS.weekly) {
                savePlan = this.validate(validate.recurring.weekly)
            } else if (this.state.selectedRecurringType === RECURRING_PATTERN_OPTIONS.monthly && this.state.monthlyOptions === 1) {
                savePlan = this.validate(validate.recurring.monthly.first)
            } else if (this.state.selectedRecurringType === RECURRING_PATTERN_OPTIONS.monthly && this.state.monthlyOptions === 2) {
                savePlan = this.validate(validate.recurring.monthly.second)
            }

            if (!savePlan && this.state.latitude !== 0 && this.state.longitude !== 0) {
                this.savePlan();
            }
        } else {
            this.saveAssessment()
        }
    }

    saveAssessment = () => {

        let {
            startDate,
            endDate,
            startTime,
            endTime,
            additionalDescription,
            selectedPOS,
            latitude,
            longitude,
            assessmentId,
            duration,
            isAssessmentEdit
        } = this.state

        let data = {
            planScheduleId: 0,
            startDate: startDate,
            endDate: endDate ? endDate : startDate,
            startTime: isAssessmentEdit ? getHourMin(startTime) : this.formatedStartTime,
            endTime: isAssessmentEdit ? getHourMin(endTime) : this.formatedEndTime,
            duration: isAssessmentEdit ? duration : getDiffTime(startTime, endTime),
            additionalDescription: additionalDescription,
            serviceProviderId: this.espId ? this.espId : 0,
            patientId: this.props.patientId,
            address: this.address,
            selectedPOS: selectedPOS,
            patientAddressId: 0,
            latitude: latitude,
            longitude: longitude,
            assessmentId: assessmentId
        }

        this.props.getValidPatientAddress({ address: this.address })
        if (!(this.state.assessmentId === 0 ? this.validate(validate.assessment) : this.validate(validate.assessment_edit))) {
            this.props.createOrEditAssessment({ data, address: this.address });
        }

    }

    savePlan = () => {
        let {
            startDate,
            endDate,
            startTime,
            endTime,
            additionalDescription,
            isRecurring,
            selectedRecurringType,
            monthlyDay,
            monthlyMonths,
            selectedWeeksId,
            selectedDaysId,
            dailyDayOccurence,
            weeklyDayOccurence,
            monthlyMonthsSecond,
            isIndividualScheduleEdit
        } = this.state

        let data = {
            planScheduleId: this.state.planScheduleId,
            name: "",
            categoryId: this.categoryId,
            startDate: startDate,
            endDate: isRecurring ? endDate : startDate,
            startTime: isIndividualScheduleEdit ? getHourMin(startTime) : this.formatedStartTime,
            endTime: isIndividualScheduleEdit ? getHourMin(endTime) : this.formatedEndTime,
            duration: getDiffTime(startTime, endTime),
            description: additionalDescription,
            serviceProviderId: this.espId ? this.espId : 0,
            patientId: this.props.patientId,
            isRecurring: isRecurring,
            serviceTypes: this.serviceTypes,
            address: this.address,
            schedulePattern: isRecurring ? selectedRecurringType : 31,
            patientAddressId: this.state.patientAddressId,
            daily: (weeklyDayOccurence || monthlyDay || selectedWeeksId || !isRecurring) ? null : {
                dayOccurence: dailyDayOccurence ? dailyDayOccurence : null
            },
            weekly: (dailyDayOccurence || monthlyDay || selectedDaysId || !isRecurring) ? null : {
                dayOccurence: weeklyDayOccurence ? weeklyDayOccurence : null,
                days: this.weeklySelectedDays.length > 0 ? this.weeklySelectedDays : null
            },
            monthly: (dailyDayOccurence || weeklyDayOccurence || !isRecurring) ? null : {
                dayMonth: selectedDaysId ? null : {
                    day: monthlyDay ? monthlyDay : null,
                    month: monthlyMonths ? monthlyMonths : null
                },
                weekDayMonth: monthlyDay ? null : {
                    day: selectedDaysId ? selectedDaysId : null,
                    week: selectedWeeksId ? selectedWeeksId : null,
                    month: monthlyMonthsSecond ? monthlyMonthsSecond : null
                }
            }
        }
        if (isIndividualScheduleEdit) {
            this.props.editSchedule(data);
        } else {
            this.props.createSchedule(data);
        }
    }

    clickShowMore = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
            let data = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            this.props.getEntityServiceProviderList(data, this.props.individualSchedulesDetails.serviceProviderId)
        })
    }

    onClickCancel = () => {
        if(this.isDataEntered) {
            this.setState({ isModalOpen: true })
        }else{
            this.goToServicedetails();
        }
    }

    goToServicedetails = () => {
        this.props.clearESPListSchedule();
        this.props.goToServicedetails();
    }

    showPhoneNumber = (phoneNumber) => {
        this.setState({
            phoneNumber: formatPhoneNumber(phoneNumber),
            phoneNumberModal: !this.state.phoneNumberModal
        })
    };

    render() {
        return (
            <AsideScreenCover>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='primaryColor m-0'>Add New Schedule</h5>
                    </div>
                </div>
                <Scrollbars speed={2}
                    smoothScrolling
                    horizontal={false}
                    className='ProfileContentWidget'>
                    <div className="full-block-view">
                        <div className="Plan-typebar">
                            <PlanType
                                options={PlanTypeData}
                                planType={this.state.planType}
                                handleChangePlanType={this.handleChangePlanType}
                                isIndividualScheduleEdit={this.state.isIndividualScheduleEdit}
                                isAssessmentEdit={this.state.isAssessmentEdit}
                            />
                        </div>
                        <Fragment>
                            {
                                parseInt(this.state.planType, 10) === SCHEDULE_TYPE_OPTIONS.standard &&
                                <div className={this.state.isIndividualScheduleEdit ? 'Service-Cat-Typesblock Service-Cat-Typesblock-Edit' : "Service-Cat-Typesblock"}>
                                    <div>
                                        <h2 className='ServicesTitle'>Service Category</h2>
                                        <ServiceCategory
                                            categoryList={this.props.serviceCategoryList}
                                            handleServiceCategory={this.handleServiceCategory}
                                            checkedServiceCategoryId={this.state.checkedServiceCategoryId}
                                        />

                                    </div>
                                    <div className="Service-typesTitle">
                                        <span>
                                            <h2 className='ServicesTitle'>Service Types</h2>
                                        </span>
                                        <span>
                                            <h5 onClick={() => this.selectAllTypes(true)}>Select All</h5>
                                            <h5 onClick={() => this.selectAllTypes(false)}>Clear All</h5>
                                        </span>
                                    </div>
                                    <div className="ServiceTypesWidget PostSR">
                                        <ServiceTypes
                                            typeList={this.props.serviceTypeList}
                                            handleServiceType={this.handleServiceType}
                                            selectedServiceType={this.state.selectedServiceType}
                                            categoryId={this.state.checkedServiceCategoryId}
                                            serviceTypeSelected={this.serviceTypes}
                                            onClickSave={this.state.onClickSave}
                                        />
                                    </div>
                                </div>
                            }
                            <div className={"ServiceTypesWidget PostSR schdule-postblock " + (parseInt(this.state.planType, 10) === SCHEDULE_TYPE_OPTIONS.assessment && 'left-block1-shedule')}>
                                <h2 className='ServicesTitle'>Schedule</h2>
                                <div className="row">
                                    <ScheduleType
                                        options={ScheduleTypeData}
                                        handleChangeScheduleType={this.handleChangeScheduleType}
                                        startDate={this.state.startDate}
                                        dateChanged={this.dateChanged}
                                        dateChangedRaw={this.dateChangedRaw}
                                        todateChanged={this.todateChanged}
                                        todateChangedRaw={this.todateChangedRaw}
                                        endDate={this.state.endDate}
                                        startTime={this.state.startTime}
                                        handleChangeStartTime={this.handleChangeStartTime}
                                        endTime={this.state.endTime}
                                        handleChangeEndTime={this.handleChangeEndTime}
                                        selectedType={this.state.isRecurring}
                                        recurringPatternList={this.props.recurringPatternList}
                                        handleChangeRecurringPattern={this.handleChangeRecurringPattern}
                                        handleSelectDailyOptionField={this.handleSelectDailyOptionField}
                                        handleSelectWeeklyOptionField={this.handleSelectWeeklyOptionField}
                                        handleChangeDailyDayOccurence={this.handleChangeDailyDayOccurence}
                                        dailyDayOccurence={this.state.dailyDayOccurence}
                                        selectedRecurringType={this.state.selectedRecurringType}
                                        daysList={this.props.daysList}
                                        handleChangeDaysSelection={this.handleChangeDaysSelection}
                                        handleChangeMonthlySelectionFirst={this.handleChangeMonthlySelectionFirst}
                                        handleChangeMonthlySelectionSecond={this.handleChangeMonthlySelectionSecond}
                                        monthlyDay={this.state.monthlyDay}
                                        monthlyMonths={this.state.monthlyMonths}
                                        handleChangeMonthlyDay={this.handleChangeMonthlyDay}
                                        handleChangeMonthlyMonths={this.handleChangeMonthlyMonths}
                                        selectedWeeks={this.state.selectedWeeksId}
                                        selectedWeeksLabel={this.state.selectedWeeksLabel}
                                        selectedDays={this.state.selectedDaysId}
                                        selectedDaysLabel={this.state.selectedDaysLabel}
                                        handleChangeSelectedDays={this.handleChangeSelectedDays}
                                        handleChangeSelectedWeeks={this.handleChangeSelectedWeeks}
                                        weekRecurring={weekRecurring}
                                        handleChangeWeeklyDayOccurence={this.handleChangeWeeklyDayOccurence}
                                        weeklyDayOccurence={this.state.weeklyDayOccurence}
                                        handleChangeMonthlyMonthsSecond={this.handleChangeMonthlyMonthsSecond}
                                        monthlyMonthsSecond={this.state.monthlyMonthsSecond}
                                        startDateSelected={this.state.startDateSelected}
                                        onClickSave={this.state.onClickSave}
                                        formatedStartTime={this.formatedStartTime}
                                        weeklySelectedDays={this.weeklySelectedDays}
                                        planType={this.state.planType}
                                    />

                                </div>
                            </div>
                            <div className={"ServiceTypesWidget PostSR " + (parseInt(this.state.planType, 10) === SCHEDULE_TYPE_OPTIONS.assessment && 'right-block2-shedule')}>
                                <h2 className='ServicesTitle'>Point of Service</h2>
                                <PointOfService
                                    patientAddressList={this.props.patientAddressList}
                                    patientAddressId={this.props.individualSchedulesDetails && this.props.individualSchedulesDetails.patientAddressId}
                                    stateList={this.props.stateList}
                                    handlePatientAddress={this.handlePatientAddress}
                                    handlePOSAddress={this.handlePOSAddress}
                                    selectedPOS={this.state.selectedPOS}
                                    handelNewAddress={this.handelNewAddress}
                                    statehandleChange={this.statehandleChange}
                                    selectedStateId={this.state.state}
                                    selectedStateName={this.state.statelabel}
                                    isPosAddressValid={this.props.isPosAddressValid}
                                    posErrorMessage={this.props.posErrorMessage}
                                    onClickSave={this.state.onClickSave}
                                    street={this.state.street}
                                    city={this.state.city}
                                    zip={this.state.zip}
                                />
                            </div>
                            <div className="ServiceTypesWidget PostSR">
                                <div className="top-search-blocksp">
                                    <h2 className='ServicesTitle'>Assign Service Provider</h2>
                                    <div className="search-block_SP">
                                        <Search
                                            toggleSearch={this.toggleSearch}
                                            searchOpen={this.state.searchOpen}
                                            searchKeyword={this.state.searchKeyword}
                                            handleSearchkeyword={this.handleSearchkeyword}
                                            handleSearchData={this.handleSearchData}
                                            closeSearch={this.toggleSearch}
                                        />
                                    </div>
                                </div>
                                <AssignServiceProvider
                                    entityServiceProvidersList={this.props.entityServiceProvidersList}
                                    handleAssignServiceProvider={this.handleAssignServiceProvider}
                                    showPhoneNumber={this.showPhoneNumber}
                                />
                                {!this.props.disableShowmore &&
                                    <ul className="show-more-assignSP">
                                        <li
                                            class="list-group-item ProfileShowMore"
                                            onClick={this.clickShowMore}
                                            disabled={this.props.disableShowmore}
                                        >
                                            Show more
                                <i class="ProfileIconShowMore"></i>
                                        </li>
                                    </ul>}
                            </div>
                            <div className="ServiceTypesWidget PostSR">
                                <h2 className='ServicesTitle'>Additional Information</h2>
                                <AdditionalInformation
                                    handleAdditionInfo={this.handleAdditionInfo}
                                    additionalDescription={this.state.additionalDescription}
                                />
                            </div>

                            <div className="ServiceTypesWidget PostSR bottom-blockbtn">
                                <button onClick={this.onClickCancel} type="button" class="btn btn-outline-primary pull-left btn btn-secondary">Cancel</button>
                                <div class="ml-auto">
                                    <button onClick={this.checkValidAddress} type="button" class="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </Fragment>
                    </div>
                    <AlertPopup
                        message='Do you want to discard the changes?'
                        OkButtonTitle={'Yes'}
                        CancelButtonTitle={'No'}
                        isCancel={true}
                        isOpen={this.state.isModalOpen}
                        closePopup={() => this.setState({ isModalOpen: false })}
                        onAcceptClick={() => this.goToServicedetails()}
                    />
                    <AlertPopup
                        message={<span>{this.state.phoneNumber === null ? CONTACT_NOT_FOUND : `${PHONE_NUMBER_TEXT} ${formatPhoneNumber(this.state.phoneNumber)}`}</span>}
                        OkButtonTitle={'Ok'}
                        isOpen={this.state.phoneNumberModal}
                        onAcceptClick={() => this.setState({ phoneNumberModal: false })}
                    />
                    <AlertPopup
                        message='Do you want to discard the changes?'
                        OkButtonTitle={'Yes'}
                        CancelButtonTitle={'No'}
                        isCancel={true}
                        isOpen={this.state.planTypeAlertPopup}
                        closePopup={() => this.setState({ planTypeAlertPopup: false })}
                        onAcceptClick={() => this.handelTypeChange()}
                    />
                </Scrollbars>
            </AsideScreenCover>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getServiceCategory: (data, selectedData) => dispatch(getServiceCategory(data, selectedData)),
        getServiceType: (data, selectedData) => dispatch(getServiceType(data, selectedData)),
        getPatientAddress: (data) => dispatch(getPatientAddress(data)),
        getStates: () => dispatch(getStates()),
        setSelectedPos: (data) => dispatch(setSelectedPos(data)),
        getValidPatientAddressSuccess: (data) => dispatch(getValidPatientAddressSuccess(data)),
        getValidPatientAddress: (data) => dispatch(getValidPatientAddress(data)),
        getEntityServiceProviderList: (data, selectedESPId) => dispatch(getEntityServiceProviderList(data, selectedESPId)),
        getRecurringPattern: () => dispatch(getRecurringPattern()),
        getDays: (data) => dispatch(getDays(data)),
        createSchedule: (data) => dispatch(createSchedule(data)),
        editSchedule: (data) => dispatch(editSchedule(data)),
        goToServicedetails: () => dispatch(push(Path.visitServiceDetails)),
        getEntityServiceProviderListSearch: (data) => dispatch(getEntityServiceProviderListSearch(data)),
        selectESP: (data) => dispatch(selectESP(data)),
        clearESPListSchedule: () => dispatch(clearESPListSchedule()),
        selectOrClearAllServiceType: (data, isSelectAll) => dispatch(selectOrClearAllServiceType(data, isSelectAll)),
        createOrEditAssessment: data => dispatch(createOrEditAssessment(data)),
        isScheduleEdit: data => dispatch(isScheduleEdit(data)),
        assessmentEdit: data => dispatch(isAssessmentEdit(data))

    }
}

export function mapStateToProps(state) {
    let scheduleState = state.scheduleState
    return {
        serviceCategoryList: scheduleState.serviceCategoryList,
        serviceTypeList: scheduleState.serviceTypeList,
        patientAddressList: scheduleState.patientAddressList,
        stateList: scheduleState.stateList,
        posErrorMessage: scheduleState.posErrorMessage,
        isPosAddressValid: scheduleState.isPosAddressValid,
        entityServiceProvidersList: scheduleState.entityServiceProvidersList,
        recurringPatternList: scheduleState.recurringPatternList,
        daysList: scheduleState.daysList,
        patientId: state.patientProfileState.patientId,
        disableShowmore: scheduleState.disableShowmore,
        individualSchedulesDetails: scheduleState.individualSchedulesDetails,
        isIndividualScheduleEdit: scheduleState.isIndividualScheduleEdit,
        isAssessmentEdit: scheduleState.isAssessmentEdit,
        assessmentDetails: scheduleState.assessmentDetails,
        scheduleList: state.visitSelectionState.VisitServiceDetailsState.scheduleList
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Schedule));