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
import { validateCoordinates, formattedDateChange, formattedDateMoment, checkEmpty, formatContactNumber } from "../../utils/validations";
import { checkLength, allEqual, numbersOnly, disableZeroInFirstChar, checkLengthOfZip, unique, compareTwoParams } from '../../utils/arrayUtility';
import { formatPhoneNumber } from '../../utils/formatName'
import {
    getServiceCategory,
    getServiceType,
    selectOrClearAllServiceType,
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
    isAssessmentEdit,
    clearServiceDetails,
    setServiceTypeIds,
    checkServiceType,
    setselectedServices,
    setServiceCategoryId,
    setViewPlan
} from '../../redux/schedule/actions';
import { getDiffTime, getHourMin, getMinutes, getHours } from "../../utils/dateUtility";
import './Components/styles.css'
import { PlanTypeData, ScheduleTypeData, weekRecurring } from './data/index'
import { validate } from './data/validate'
import { setAddNewScheduledClicked } from "../../redux/visitSelection/VisitServiceDetails/actions";
import Search from '../VisitSelection/VisitServiceList/Search'
import { Path } from '../../routes'
import { push } from '../../redux/navigation/actions'
import moment from 'moment'
import { RECURRING_PATTERN_OPTIONS, PAGE_NO, DEFAULT_PAGE_SIZE_ESP_LIST, SCHEDULE_TYPE_OPTIONS, CONTACT_NOT_FOUND, PHONE_NUMBER_TEXT, SERVICE_CATEGORY, SCHEDULE_RECURRENCE_FIELD } from '../../constants/constants'
import { pushSpliceHandler } from "../../utils/stringHelper";
import { omit } from 'lodash';

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
            planTypeAlertPopup: false,
            monthlyOptions: 1,
            confirmationPopup: false
        }
        this.serviceTypes = this.props.services;
        this.categoryId = SERVICE_CATEGORY.adl.id;
        this.address = {}
        this.espId = '';
        this.weeklySelectedDays = [];
        this.formatedStartTime = "";
        this.formatedEndTime = "";
        this.selectedDaysLabel = "";
        this.selectedWeeksLabel = "";
        this.isDataEntered = false;
        this.selectedDuration = ''
    }

    async componentDidMount() {
        let data = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }

        if (this.props.patientId) {
            await this.props.getServiceCategory(this.categoryId, [], this.props.isIndividualScheduleEdit);
            await this.props.getStates();
            await this.props.getEntityServiceProviderList(data, this.props.individualSchedulesDetails.serviceProviderId);
            await this.props.getRecurringPattern();
            await this.props.getDays(this.props.individualSchedulesDetails.weekly && this.props.individualSchedulesDetails.weekly.days);
            await this.getPrimaryAddress();            
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    componentWillUnmount() {
        this.props.clearServiceDetails();
        this.props.getValidPatientAddressSuccess(false)
        this.props.setViewPlan(false)
    }

    getPrimaryAddress = () => {
        if (this.props.patientAddressList.length > 0 && !this.state.isDefaultAddress && this.props.isAddNewScheduleClicked) {
            let validAddress;
            let address = this.props.patientAddressList.filter((add) => {
                return add.isPrimaryAddress;
            });

            if (address.length > 0) {
                validAddress = address[0];
                if (validateCoordinates(validAddress.latitude, validAddress.longitude)) {
                    this.props.getValidPatientAddressSuccess(true)
                }
            }
            else {
                validAddress = this.props.patientAddressList.length > 0 && this.props.patientAddressList[0];
            }

            this.setState({
                patientAddressId: validAddress.addressId,
                addressType: validAddress.addressType,
                selectedPOS: validAddress.addressId,
                street: validAddress.street,
                city: validAddress.city,
                zip: validAddress.zip,
                state: validAddress.stateId,
                statelabel: validAddress.stateName,
                latitude: validAddress.latitude,
                longitude: validAddress.longitude,
                isDefaultAddress: true
            })
            this.address = {
                addressType: validAddress.addressType,
                streetAddress: validAddress.street,
                city: validAddress.city,
                zip: validAddress.zip,
                stateId: validAddress.stateId,
                stateName: validAddress.stateName,
                latitude: validAddress.latitude,
                longitude: validAddress.longitude,
                patientAddressId: validAddress.addressId,
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
            selectedPOS: data.patientAddressId,
            street: data && data.streetAddress,
            city: data && data.city,
            zip: data && data.zipCode,
            state: data && data.stateId,
            selectedDuration: data.duration
        })
        this.address = {
            patientAddressId: data.patientAddressId,
            streetAddress: data && data.streetAddress,
            city: data && data.city,
            stateId: data && data.stateId,
            stateName: data && data.stateName,
            zip: data && data.zipCode,
            addressType: this.state.addressType,
            latitude: data.latitude,
            longitude: data.longitude
        }
        this.espId = data.serviceProviderId;
        this.selectedDuration = data.duration
    }


    selectNew = () => {
        let data = this.props.individualSchedulesDetails;
        this.categoryId = data && data.serviceCategoryIds.length > 0 && data.serviceCategoryIds[0];
        this.serviceTypes = data.serviceTypes;
        this.props.getServiceType(this.categoryId, data.serviceTypes)
        data.monthly !== null && this.handleChangeSelectedDays(data.monthly.weekDayMonth && data.monthly.weekDayMonth.day);
        data.monthly !== null && this.handleChangeSelectedWeeks(data.monthly.weekDayMonth && data.monthly.weekDayMonth.week);
        this.setState({
            selectedPOS: data.patientAddressId,
            planType: SCHEDULE_TYPE_OPTIONS.standard,
            checkedServiceCategoryId: this.categoryId,
            startDate: data.startDate,
            endDate: data.endDate,
            street: data.address && data.address.streetAddress,
            city: data.address && data.address.city,
            zip: data.address && data.address.zip,
            state: data.address && data.address.stateId,
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
            monthlyMonthsSecond: data.monthly !== null && data.monthly.weekDayMonth && data.monthly.weekDayMonth.month,
            selectedDuration: data.duration,
            monthlyOptions: data.monthly !== null && data.monthly.dayMonth ? 1 : 2
        })
        this.weeklySelectedDays = data.weekly ? data.weekly.days : [];
        this.espId = data.serviceProviderId;
        this.selectedDuration = data.duration
        this.address = {
            patientAddressId: data.patientAddressId,
            streetAddress: data.address && data.address.streetAddress,
            city: data.address && data.address.city,
            stateId: data.address && data.address.stateId,
            stateName: data.address && data.address.stateName,
            zip: data.address && data.address.zip,
            latitude: data.address && data.address.latitude,
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
            //this.address = {}
            this.selectedDuration = ''
            this.handleAssignServiceProvider(null, true);
            this.handleServiceCategory(SERVICE_CATEGORY.adl.id, true)
            this.props.clearServiceDetails()
        }
        this.espId = ''
    }

    handelTypeChange = () => {
        this.isDataEntered = false
        this.handleChangePlanType(this.state.planTypeId);
    }

    handleServiceCategory = (id, clearServiceTypes = false) => {
        this.categoryId = id;
        this.serviceTypes = this.props.services;
        let serviceCategoryIds = pushSpliceHandler(this.props.serviceCategoryIds, id) 
        this.props.setServiceCategoryId(serviceCategoryIds)
        this.props.getServiceType(id);
        if(!clearServiceTypes){
            this.isDataEntered = true;
        }
        this.setState({ checkedServiceCategoryId: id, serviceTypeSelected: false })
    }

    handleServiceType = async (data, isChecked) => {
        data.selected = !data.selected
        let serviceTypeIds = pushSpliceHandler(this.props.serviceTypeIds, data.serviceTypeId)
        await this.props.setselectedServices(data, isChecked)
        await this.props.checkServiceType(this.props.serviceTypeList, data.serviceTypeId, isChecked)
        await this.props.setServiceTypeIds(serviceTypeIds)
        this.serviceTypes = this.props.services
        await this.setState({
            serviceTypeId: this.props.services,
            serviceTypeSelected: false
        })
        this.isDataEntered = true;
    }

    selectAllTypes = async (isSelectAll) => {
        await this.props.selectOrClearAllServiceType(this.categoryId, isSelectAll)
        this.serviceTypes = this.props.services;
        this.isDataEntered = true;
    }

    handlePOSAddress = (value) => {
        let currentValue = value
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
        this.props.setSelectedPos(value)
        if (value === '0') {
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
        let key = e.target.id
        let value = key === "zip" ? formatContactNumber(e.target.value) : e.target.value
        this.setState({
            [key]: value,
            isDefaultAddress: true
        }, () => {
            this.setAddress()
        })
        this.isDataEntered = true;
    }

    setAddress() {
        this.address = {
            patientAddressId: 0,
            streetAddress: this.state.street,
            city: this.state.city,
            stateId: this.state.stateId,
            stateName: this.state.statelabel,
            zip: this.state.zip,
            addressType: this.state.addressType
        }
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

        this.address = {
            patientAddressId: 0,
            streetAddress: this.state.street,
            city: this.state.city,
            stateId: selectedOptionState,
            stateName: selectedValue,
            zip: this.state.zip,
            addressType: this.state.addressType
        }

        this.isDataEntered = true;
    }

    handleAssignServiceProvider = (id, clearSelectedESP = false) => {
        this.espId = parseInt(id, 0);
        this.props.selectESP(id)
        if(!clearSelectedESP){
            this.isDataEntered = true;
        }
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
        this.selectedDuration = ''
        this.isDataEntered = true;
    }

    dateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({
            startDate: formattedDate
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
        this.setState({
            endDate: formattedDate
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
        let endTime = this.state.endTime
        if (endTime) {
            this.selectedDuration = getDiffTime(this.formatedStartTime, endTime);
        }
        if (this.formatedStartTime === this.formatedEndTime) {
            endTime = moment(this.state.startTime).add("minutes", 60)
            this.formatedEndTime = getHourMin(endTime)
        }
        this.setState({ startTime: event, endTime, selectedDuration: this.selectedDuration });
        this.isDataEntered = true;
    }

    handleChangeEndTime = (event) => {
        this.formatedEndTime = getHourMin(event)
        this.setState({ endTime: event });
        this.selectedDuration = getDiffTime(this.state.startTime, this.formatedEndTime);
        this.setState({
            selectedDuration: this.selectedDuration
        });
        this.isDataEntered = true;
    }

    handleChangeDuration = (selectedOption) => {
        let hours = getHours(selectedOption)
        let minutes = getMinutes(selectedOption)
        this.selectedDuration = selectedOption;
        const endTime = moment(this.state.startTime).add(hours, 'hours').add(minutes, 'minutes');
        this.formatedEndTime = getHourMin(endTime)
        this.setState({ endTime, selectedDuration: selectedOption });
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
            selectedWeeksLabel: ''
        })
        this.isDataEntered = true;
    }

    handleSelectDailyOptionField = (id) => {
        this.isDataEntered = true;
    }

    handleSelectWeeklyOptionField = (id) => {
        this.isDataEntered = true;
    }

    handleChangeOccurrenceFields = (e, fieldId) => {
        this.isDataEntered = true;
        let fieldValue;
        if (disableZeroInFirstChar(e)) {
            switch (fieldId) {
                case SCHEDULE_RECURRENCE_FIELD.dailyDay:
                    fieldValue = { dailyDayOccurence: numbersOnly(e.target.value) };
                    break;
                case SCHEDULE_RECURRENCE_FIELD.weeklyDay:
                    fieldValue = { weeklyDayOccurence: numbersOnly(e.target.value) };
                    break;
                case SCHEDULE_RECURRENCE_FIELD.monthlyDay:
                    fieldValue = { monthlyDay: numbersOnly(e.target.value) };
                    break;
                case SCHEDULE_RECURRENCE_FIELD.monthlyMonths:
                    fieldValue = { monthlyMonths: numbersOnly(e.target.value) };
                    break;
                case SCHEDULE_RECURRENCE_FIELD.monthlyMonthsSecond:
                    fieldValue = { monthlyMonthsSecond: numbersOnly(e.target.value) };
                    break;
                default:
                    return null
            }
            this.setState(fieldValue);
        }
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
            monthlyOptions: parseInt(id, 10),
            selectedDaysLabel: '',
            selectedWeeksLabel: '',
            selectedDaysId: '',
            selectedWeeks: '',
            monthlyMonthsSecond: '',

            monthlyDay: '',
            monthlyMonths: '',
        })
        this.selectedDaysLabel = "";
        this.selectedWeeksLabel = "";
        this.isDataEntered = true;
    }

    handleChangeMonthlySelectionSecond = (id) => {
        this.setState({
            monthlyOptions: parseInt(id, 10),
            monthlyDay: '',
            monthlyMonths: '',
            monthlyMonthsSecond: ''
        })
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

    toggleSearch = () => {
        if (this.state.searchOpen) {
            this.props.clearESPListSchedule()
            let data = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            this.props.getEntityServiceProviderList(data, this.espId);
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
        this.props.getEntityServiceProviderListSearch(data, this.espId)
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
                case 'checkLengthOfZip':
                    value.push(checkLengthOfZip(txt))
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
            let saveAssesment = this.state.assessmentId === 0 ? this.validate(validate.assessment) : this.validate(validate.assessment_edit)

            if (!saveAssesment && this.state.latitude !== 0 && this.state.longitude !== 0) {
                this.saveAssessment()
            }
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
            isAssessmentEdit
        } = this.state

        let data = {
            planScheduleId: 0,
            startDate: startDate,
            endDate: endDate ? endDate : startDate,
            startTime: isAssessmentEdit ? getHourMin(startTime) : this.formatedStartTime,
            endTime: isAssessmentEdit ? getHourMin(endTime) : this.formatedEndTime,
            duration: getDiffTime(startTime, endTime),
            additionalDescription: additionalDescription,
            serviceProviderId: this.espId ? this.espId : 0,
            patientId: this.props.patientId,
            address: this.address,
            selectedPOS: selectedPOS,
            patientAddressId: selectedPOS === '0' ? 0 : this.state.patientAddressId,
            latitude: latitude,
            longitude: longitude,
            assessmentId: assessmentId
        }

        this.props.getValidPatientAddress(data, (isValid) => {
            isValid && this.props.createOrEditAssessment({ data, address: this.address });
        });
    }

    savePlan = () => {
        let { isIndividualScheduleEdit } = this.state

        this.props.getValidPatientAddress(this.getSelectedData(), (isValid) => {
            isValid && (isIndividualScheduleEdit ? (this.props.services.length > 0 && this.openConfirmationPopup()) : this.props.createSchedule(this.getSelectedData()))
        });
    }

    openConfirmationPopup = async () => {
      if(this.getSelectedData().isPlanEdit) {
          await this.setState({ confirmationPopup: true})
      }
      else {
        await this.props.editSchedule(this.getSelectedData()) 
      }
    }

    getSelectedData = () => {

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
            isIndividualScheduleEdit,
            selectedPOS
        } = this.state

        let serviceTypeIds = unique(this.props.services,"serviceTypeId")
        let serviceCategoryIds = unique(this.props.services,"serviceCategoryId")
        
        let isPlanEdit = this.props.services.length > 0 && (!compareTwoParams(serviceTypeIds, this.props.editServiceTypeIds) || !compareTwoParams(serviceCategoryIds, this.props.editServiceCategoryIds))
        let serviceTypes = this.props.services.map((types) => {
            let updatedTypes = omit(types, ['serviceCategoryId']);
            return updatedTypes
        });
        let data = {
            planScheduleId: this.state.planScheduleId,
            name: "",
            serviceCategoryIds: serviceCategoryIds,
            startDate: startDate,
            endDate: isRecurring ? endDate : startDate,
            startTime: isIndividualScheduleEdit ? getHourMin(startTime) : this.formatedStartTime,
            endTime: isIndividualScheduleEdit ? getHourMin(endTime) : this.formatedEndTime,
            duration: getDiffTime(startTime, endTime),
            description: additionalDescription,
            serviceProviderId: this.espId ? this.espId : 0,
            patientId: this.props.patientId,
            isRecurring: isRecurring,
            serviceTypes: serviceTypes,
            address: this.address,
            schedulePattern: isRecurring ? selectedRecurringType : 31,
            patientAddressId: selectedPOS === '0' ? 0 : this.state.patientAddressId,
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
            },
            isPlanEdit: isIndividualScheduleEdit && isPlanEdit
        }
      return data
    }

    onAcceptConfirmationPopup = async () => {
        await this.setState({confirmationPopup: false})
        await this.props.editSchedule(this.getSelectedData())
    }

    clickShowMore = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
            let data = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            this.props.getEntityServiceProviderList(data, this.espId)
        })
    }

    onClickCancel = () => {
        if (this.isDataEntered) {
            this.setState({ isModalOpen: true })
        } else {
            this.goToServicedetails();
            this.props.setAddNewScheduledClicked(true);
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

    closeConfirmationPopup = () => {
        this.setState({ confirmationPopup: false })
    }

    render() {
        let renderBlockClass = this.props.isViewPlan ? 'view-schedule-block' : ''
        let scheduleTitle = this.state.isIndividualScheduleEdit ? (this.props.isViewPlan ? 'View Schedule' : 'Edit Schedule') : 'Add New Schedule'
        return (
            <AsideScreenCover>
                <div className='ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='theme-primary m-0'>{scheduleTitle}</h5>
                    </div>
                </div>
                <Scrollbars speed={2}
                    smoothScrolling
                    horizontal={false}
                    className='ProfileContentWidget add-new-scheduleblock'>
                    <div className={`full-block-view ${renderBlockClass}`}>
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
                                <div className={"Service-Cat-Typesblock"}>
                                    <div>
                                        <h2 className='ServicesTitle theme-primary'>Service Category (Select one or multiple)</h2>
                                        <ServiceCategory
                                            servicesTypeArray = {this.props.services}
                                            categoryList={this.props.serviceCategoryList}
                                            handleServiceCategory={this.handleServiceCategory}
                                            checkedServiceCategoryId={this.state.checkedServiceCategoryId}
                                        />

                                    </div>
                                    <div className="Service-typesTitle">
                                        <span>
                                            <h2 className='ServicesTitle theme-primary'>Service Types (Select one or multiple)</h2>
                                        </span>
                                        {!this.props.isViewPlan && <span className="theme-primary">
                                            <h5 onClick={() => this.selectAllTypes(true)}>Select All</h5>
                                            <h5 onClick={() => this.selectAllTypes(false)}>Clear All</h5>
                                        </span>}
                                    </div>
                                    <div className="ServiceTypesWidget PostSR">
                                        <ServiceTypes
                                            typeList={this.props.serviceTypeList}
                                            handleServiceType={this.handleServiceType}
                                            selectedServiceType={this.state.selectedServiceType}
                                            categoryId={this.state.checkedServiceCategoryId}
                                            serviceTypeSelected={this.props.services}
                                            onClickSave={this.state.onClickSave}
                                        />
                                    </div>
                                    {this.state.isIndividualScheduleEdit && !this.props.isViewPlan &&
                                        <span>Note: Any changes to the Service Category or Service Type will led to creation of a new plan for the individual.</span>
                                    }
                                </div>
                            }
                            <div className={"ServiceTypesWidget PostSR schdule-postblock " + (parseInt(this.state.planType, 10) === SCHEDULE_TYPE_OPTIONS.assessment && 'left-block1-shedule')}>
                                <h2 className='ServicesTitle theme-primary'>Schedule</h2>
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
                                        dailyDayOccurence={this.state.dailyDayOccurence}
                                        selectedRecurringType={this.state.selectedRecurringType}
                                        daysList={this.props.daysList}
                                        handleChangeDaysSelection={this.handleChangeDaysSelection}
                                        handleChangeMonthlySelectionFirst={this.handleChangeMonthlySelectionFirst}
                                        handleChangeMonthlySelectionSecond={this.handleChangeMonthlySelectionSecond}
                                        monthlyDay={this.state.monthlyDay}
                                        monthlyMonths={this.state.monthlyMonths}
                                        selectedWeeks={this.state.selectedWeeksId}
                                        selectedWeeksLabel={this.state.selectedWeeksLabel}
                                        selectedDays={this.state.selectedDaysId}
                                        selectedDaysLabel={this.state.selectedDaysLabel}
                                        handleChangeSelectedDays={this.handleChangeSelectedDays}
                                        handleChangeSelectedWeeks={this.handleChangeSelectedWeeks}
                                        weekRecurring={weekRecurring}
                                        weeklyDayOccurence={this.state.weeklyDayOccurence}
                                        handleChangeMonthlyMonthsSecond={this.handleChangeMonthlyMonthsSecond}
                                        monthlyMonthsSecond={this.state.monthlyMonthsSecond}
                                        startDateSelected={this.state.startDateSelected}
                                        onClickSave={this.state.onClickSave}
                                        formatedStartTime={this.formatedStartTime}
                                        weeklySelectedDays={this.weeklySelectedDays}
                                        planType={this.state.planType}
                                        handleChangeOccurrenceFields={this.handleChangeOccurrenceFields}
                                        handleChangeDuration={this.handleChangeDuration}
                                        selectedDuration={this.selectedDuration}
                                        monthlyOptions={this.state.monthlyOptions}
                                        validate={this.validate}
                                    />

                                </div>
                            </div>
                            <div className={"ServiceTypesWidget PostSR " + (parseInt(this.state.planType, 10) === SCHEDULE_TYPE_OPTIONS.assessment && 'right-block2-shedule')}>
                                <h2 className='ServicesTitle theme-primary'>Point of Service</h2>
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
                                    <h2 className='ServicesTitle theme-primary'>Assign Onboarded Service Provider</h2>
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
                                            class="list-group-item ProfileShowMore theme-primary-light"
                                            onClick={this.clickShowMore}
                                            disabled={this.props.disableShowmore}
                                        >
                                            Show more
                                <i class="ProfileIconShowMore"></i>
                                        </li>
                                    </ul>}
                            </div>
                            <div className="ServiceTypesWidget PostSR">
                                <h2 className='ServicesTitle theme-primary'>Assign Other Service Provider</h2>
                                <AdditionalInformation
                                    handleAdditionInfo={this.handleAdditionInfo}
                                    additionalDescription={this.state.additionalDescription}
                                />
                            </div>

                            <div className="ServiceTypesWidget PostSR bottom-blockbtn">
                               {!this.props.isViewPlan  && <button onClick={this.onClickCancel} type="button" class="btn btn-outline-primary pull-left btn btn-secondary">Cancel</button>}
                                <div class="ml-auto">
                                    <button onClick={this.props.isViewPlan ? this.onClickCancel : this.checkValidAddress} type="button" class="btn btn-primary return-button">{this.props.isViewPlan ? 'Return' : 'Save'}</button>
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
                    <AlertPopup
                        message='All the upcoming visit will be removed and a new revised plan will be created. Do you wish to continue?'
                        OkButtonTitle={'Yes'}
                        CancelButtonTitle={'No'}
                        isCancel={true}
                        isOpen={this.state.confirmationPopup}
                        closePopup={this.closeConfirmationPopup}
                        onAcceptClick={this.onAcceptConfirmationPopup}
                    />
                </Scrollbars>
            </AsideScreenCover>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getServiceCategory: (data, selectedData, isEditable) => dispatch(getServiceCategory(data, selectedData, isEditable)),
        getServiceType: (data, selectedData) => dispatch(getServiceType(data, selectedData)),
        getStates: () => dispatch(getStates()),
        setSelectedPos: (data) => dispatch(setSelectedPos(data)),
        getValidPatientAddressSuccess: (data) => dispatch(getValidPatientAddressSuccess(data)),
        getValidPatientAddress: (data, addressCallback) => dispatch(getValidPatientAddress(data, addressCallback)),
        getEntityServiceProviderList: (data, selectedESPId) => dispatch(getEntityServiceProviderList(data, selectedESPId)),
        getRecurringPattern: () => dispatch(getRecurringPattern()),
        getDays: (data) => dispatch(getDays(data)),
        createSchedule: (data) => dispatch(createSchedule(data)),
        editSchedule: (data) => dispatch(editSchedule(data)),
        goToServicedetails: () => dispatch(push(Path.visitServiceDetails)),
        getEntityServiceProviderListSearch: (data, selectedESPId) => dispatch(getEntityServiceProviderListSearch(data, selectedESPId)),
        selectESP: (data) => dispatch(selectESP(data)),
        clearESPListSchedule: () => dispatch(clearESPListSchedule()),
        selectOrClearAllServiceType: (data, isSelectAll) => dispatch(selectOrClearAllServiceType(data, isSelectAll)),
        createOrEditAssessment: data => dispatch(createOrEditAssessment(data)),
        isScheduleEdit: data => dispatch(isScheduleEdit(data)),
        assessmentEdit: data => dispatch(isAssessmentEdit(data)),
        clearServiceDetails: () => dispatch(clearServiceDetails()),
        setAddNewScheduledClicked: data => dispatch(setAddNewScheduledClicked(data)),
        setServiceTypeIds: data => dispatch(setServiceTypeIds(data)),
        checkServiceType: (data, id, checked) => dispatch(checkServiceType(data, id, checked)),
        setselectedServices: (data,isChecked) => dispatch(setselectedServices(data,isChecked)),
        setServiceCategoryId: data => dispatch(setServiceCategoryId(data)),
        setViewPlan: data => dispatch(setViewPlan(data)),

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
        scheduleList: state.visitSelectionState.VisitServiceDetailsState.scheduleList,
        isAddNewScheduleClicked: state.visitSelectionState.VisitServiceDetailsState.isAddNewScheduleClicked,
        serviceCategoryIds: state.scheduleState.serviceCategoryIds,
        serviceTypeIds: state.scheduleState.serviceTypeIds,
        services: state.scheduleState.services,
        isViewPlan: scheduleState.isViewPlan,
        editServiceCategoryIds: scheduleState.editServiceCategoryIds,
        editServiceTypeIds: scheduleState.editServiceTypeIds
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Schedule));