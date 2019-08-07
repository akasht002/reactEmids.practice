import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import { Scrollbars, ModalPopup } from '../../components';
import { PlanType } from './Components/PlanType';
import ServiceCategory from './Components/ServiceCategory';
import ServiceTypes from './Components/ServiceTypes';
import PointOfService from './Components/PointOfService';
import { AssignServiceProvider } from './Components/AssignServiceProvider';
import { AdditionalInformation } from './Components/AdditionalInformation';
import { ScheduleType } from './Components/ScheduleType';
import { validateCoordinates, formattedDateChange, formattedDateMoment, checkEmpty } from "../../utils/validations";
import { checkLength, allEqual } from '../../utils/arrayUtility'
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
    createOrEditSchedule,
    getEntityServiceProviderListSearch,
    selectESP,
    clearESPList
} from '../../redux/schedule/actions';
import { getDiffTime, getHourMin, formateMDYY } from "../../utils/dateUtility";
import './Components/styles.css'
import { PlanTypeData, ScheduleTypeData, weekRecurring, monthlyOptionsData } from './data/index'
import { validate } from './data/validate'
import Search from '../VisitSelection/VisitServiceList/Search'
import { Path } from '../../routes'
import { push } from '../../redux/navigation/actions'

export class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedServiceCategoryId: 1,
            selectedServiceType: {},
            SelectedPOS: '0',
            state: '',
            startDate: '',
            endDate: '',
            startTime: null,
            endTime: null,
            durationTime: null,
            IsRecurring: false,
            selectedRecurringType: 18,
            monthlyDay: '',
            monthlyMonths: '',
            selectedWeeks: '',
            selectedDays: '',
            dailyDayOccurence: '',
            weeklyDayOccurence: '',
            monthlyMonthsSecond: '',
            selectedDaysLabel: '',
            selectedWeeksLabel: '',
            planType: 1,
            serviceTypeSelected: false,
            startDateSelected: false,
            pageNumber: 1,
            pageSize: 9,
            searchOpen: false,
            isModalOpen: false
        }
        this.serviceTypes = [];
        this.categoryId = 1;
        this.address = {}
        this.espId = '';
        this.weeklySelectedDays = [];
        this.formatedStartTime = "";
        this.formatedEndTime = "";
    }

    componentDidMount() {
        let data = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        if (this.props.patientId) {
            this.props.getServiceCategory();
            this.props.getPatientAddress();
            this.props.getStates();
            this.props.getEntityServiceProviderList(data);
            this.props.getRecurringPattern();
            this.props.getDays();
        } else {
            this.props.history.push(Path.visitServiceList)
        }
    }

    handleChangePlanType = (id) => {
        console.log('handleChangePlanType', id)
        this.setState({ planType: id })
    }

    handleServiceCategory = (id) => {
        this.categoryId = id;
        this.serviceTypes = [];
        this.props.getServiceType(id);
        this.setState({ checkedServiceCategoryId: id, serviceTypeSelected: false })
    }

    handleServiceType = (data, e) => {
        data.selected = !data.selected

        if (data.selected) {
            this.serviceTypes.push(data)
        } else {
            this.serviceTypes.splice(this.serviceTypes.findIndex(function (item) {
                return item.serviceTypeId === parseInt(e.target.value, 0);
            }), 1);
        }
        this.setState({
            serviceTypeId: this.serviceTypes,
            serviceTypeSelected: false
        })
    }

    selectAllTypes = (isSelectAll) => {
        this.props.selectOrClearAllServiceType(this.categoryId, isSelectAll)
        if (isSelectAll) {
            this.serviceTypes = this.props.serviceTypeList;
        } else {
            this.serviceTypes = [];
        }
    }

    handlePOSAddress = (e) => {
        let currentValue = e.target.value
        this.setState({
            addressType: '',
            SelectedPOS: currentValue,
            street: '',
            city: '',
            zip: '',
            statelabel: '',
            selectedOptionState: null
        });
        this.props.setSelectedPos(e.target.value)
        if (e.target.value === '0') {
            this.props.getValidPatientAddressSuccess(false)
        }
    }

    handlePatientAddress = (e) => {
        e.isPrimaryAddress = !e.isPrimaryAddress
        this.setState({
            patientAddressId: e.addressId,
            SelectedPOS: e.addressId,
            street: e.street,
            city: e.city,
            zip: e.zip,
            statelabel: e.stateName,
            selectedOptionState: e.stateId,
            addressType: e.addressTypeId,
            latitude: e.latitude,
            longitude: e.longitude,
            state: e.stateId
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
    }

    handelNewAddress = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
    }

    handleAssignServiceProvider = (id) => {
        this.espId = parseInt(id, 0);
        this.props.selectESP(id)
    }

    handleAdditionInfo = e => {
        this.setState({ additionalDescription: e.target.value })
    }

    handleChangeScheduleType = (data) => {
        this.setState({
            IsRecurring: data,
            onClickSave: false,
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null
        })
    }

    dateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        const formattedMDYY = formateMDYY(formattedDate)
        this.setState({
            startDate: formattedMDYY
        });

    }

    dateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({
            startDate: formattedDate
        });
    }

    todateChanged = (date) => {
        const formattedDate = formattedDateMoment(date);
        this.setState({
            endDate: formattedDate
        });
    }

    todateChangedRaw = (event) => {
        const formattedDate = formattedDateChange(event);
        this.setState({
            endDate: formattedDate
        });
    }

    handleChangeStartTime = (event) => {
        this.formatedStartTime = getHourMin(event)
        this.setState({ startTime: event });
    }

    handleChangeEndTime = (event) => {
        this.formatedEndTime = getHourMin(event)
        this.setState({ endTime: event });
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
    }

    handleSelectDailyOptionField = (id) => {
    }

    handleSelectWeeklyOptionField = (id) => {
    }

    handleChangeDailyDayOccurence = (data) => {
        this.setState({ dailyDayOccurence: data.replace(/[^0-9]/g, '') })
    }

    handleChangeWeeklyDayOccurence = (data) => {
        this.setState({ weeklyDayOccurence: data.replace(/[^0-9]/g, '') })
    }

    handleChangeDaysSelection = (e) => {
        if (e.target.checked) {
            this.weeklySelectedDays.push(parseInt(e.target.id, 0))
        }
        else {
            this.weeklySelectedDays.splice(this.weeklySelectedDays.findIndex(function (item, index) {
                return item.id === parseInt(e.target.id, 0);
            }), 1);
        }
    }

    handleChangeMonthlySelectionFirst = (id) => {
        this.setState({ monthlyOptions: id })
    }

    handleChangeMonthlySelectionSecond = (id) => {
        this.setState({ monthlyOptions: id })
    }

    handleChangeMonthlyDay = (data) => {
        this.setState({ monthlyDay: data.replace(/[^1-9]/g, '') })
    }

    handleChangeMonthlyMonths = (data) => {
        this.setState({ monthlyMonths: data.replace(/[^1-9]/g, '') })
    }

    handleChangeSelectedWeeks = (selectedOptionId) => {
        let selectedValue = '';
        let valueData = parseInt(selectedOptionId, 10);
        this.props.daysList.map((item => {
            return item.id === valueData ? selectedValue = item.keyValue : ''
        }))

        this.setState({
            selectedWeeksId: parseInt(selectedOptionId, 0),
            selectedWeeksLabel: selectedValue
        });
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
    }

    handleChangeMonthlyMonthsSecond = (data) => {
        this.setState({ monthlyMonthsSecond: data.replace(/[^1-9]/g, '') })
    }

    toggleSearch = () => {
        if (this.state.searchOpen) {
            this.props.clearESPList()
            let data = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            this.props.getEntityServiceProviderList(data);
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
                    checkEmpty(txt) === true ? value.push(true) : value.push(false)
                    return true;
                case 'checkLength':
                    checkLength(txt) === true ? value.push(true) : value.push(false)
                    return true;
                default:
            }
        })
        return allEqual(value);
    }

    checkValidAddress = () => {

        this.setState({ onClickSave: true })

        let savePlan;

        if (!this.state.IsRecurring) {
            savePlan = this.validate(validate.oneTime)
        } else if (this.state.selectedRecurringType === 17) {
            savePlan = this.validate(validate.recurring.daily)
        } else if (this.state.selectedRecurringType === 18) {
            savePlan = this.validate(validate.recurring.weekly)
        } else if (this.state.selectedRecurringType === 19 && this.state.monthlyOptions === 1) {
            savePlan = this.validate(validate.recurring.recurring.first)
        } else if (this.state.selectedRecurringType === 19 && this.state.monthlyOptions === 2) {
            savePlan = this.validate(validate.recurring.recurring.second)
        }

        let data = {
            address: this.address
        }
        this.props.getValidPatientAddress(data)
        if (!savePlan) {
            this.savePlan();
        }
    }

    onClickConfirm = () => {
        this.props.goToServicedetails();
    }

    savePlan = () => {
        let {
            startDate,
            endDate,
            startTime,
            endTime,
            additionalDescription,
            IsRecurring,
            selectedRecurringType,
            monthlyDay,
            monthlyMonths,
            selectedWeeksId,
            selectedDaysId,
            dailyDayOccurence,
            weeklyDayOccurence,
            monthlyMonthsSecond
        } = this.state

        let data = {
            planScheduleId: 0,
            name: "",
            categoryId: this.categoryId,
            startDate: startDate,
            endDate: endDate ? endDate : startDate,
            startTime: this.formatedStartTime,
            endTime: this.formatedEndTime,
            duration: getDiffTime(startTime, endTime),
            description: additionalDescription,
            serviceProviderId: this.espId ? this.espId : 0,
            patientId: this.props.patientId,
            IsRecurring: IsRecurring,
            serviceTypes: this.serviceTypes,
            address: this.address,
            schedulePattern: selectedRecurringType ? selectedRecurringType : 31,
            patientAddressId: 0,
            daily: (weeklyDayOccurence || monthlyDay || selectedWeeksId || !IsRecurring) ? null : {
                dayOccurence: dailyDayOccurence ? dailyDayOccurence : null
            },
            weekly: (dailyDayOccurence || monthlyDay || selectedDaysId || !IsRecurring) ? null : {
                dayOccurence: weeklyDayOccurence ? weeklyDayOccurence : null,
                days: this.weeklySelectedDays.length > 0 ? this.weeklySelectedDays : null
            },
            monthly: (dailyDayOccurence || weeklyDayOccurence || !IsRecurring) ? null : {
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
        this.props.createOrEditSchedule(data);
    }

    clickShowMore = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
            let data = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            this.props.getEntityServiceProviderList(data)
        })
    }

    onClickCancel = () => {
        this.setState({ isModalOpen: true })
    }

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
                                handleChangePlanType={this.handleChangePlanType} />
                        </div>
                        {parseInt(this.state.planType, 10) === 2 &&
                            <Fragment>
                                <div className="Service-Cat-Typesblock">
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

                                <div className={"ServiceTypesWidget PostSR schdule-postblock " + (this.state.planType === 1 && 'left-block1-shedule')}>
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
                                            selectedType={this.state.IsRecurring}
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
                                            monthlyOptionsData={monthlyOptionsData}
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
                                        />

                                    </div>
                                </div>
                                <div className={"ServiceTypesWidget PostSR " + (this.state.planType === 1 && 'right-block2-shedule')}>
                                    <h2 className='ServicesTitle'>Point of Service</h2>
                                    <PointOfService
                                        patientAddressList={this.props.patientAddressList}
                                        stateList={this.props.stateList}
                                        handlePatientAddress={this.handlePatientAddress}
                                        handlePOSAddress={this.handlePOSAddress}
                                        SelectedPOS={this.state.SelectedPOS}
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
                                    <AssignServiceProvider
                                        entityServiceProvidersList={this.props.entityServiceProvidersList}
                                        handleAssignServiceProvider={this.handleAssignServiceProvider}
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
                        }
                    </div>
                    <ModalPopup
                        isOpen={this.state.isModalOpen}
                        ModalBody={<span>Do you want to discard the changes?</span>}
                        btn1="Yes"
                        btn2="No"
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                        onConfirm={() => this.onClickConfirm()}
                        onCancel={() => this.setState({
                            isModalOpen: !this.state.isModalOpen,
                        })}
                    />
                </Scrollbars>
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServiceCategory: () => dispatch(getServiceCategory()),
        getServiceType: (data) => dispatch(getServiceType(data)),
        getPatientAddress: (data) => dispatch(getPatientAddress(data)),
        getStates: () => dispatch(getStates()),
        setSelectedPos: (data) => dispatch(setSelectedPos(data)),
        getValidPatientAddressSuccess: (data) => dispatch(getValidPatientAddressSuccess(data)),
        getValidPatientAddress: (data) => dispatch(getValidPatientAddress(data)),
        getEntityServiceProviderList: (data) => dispatch(getEntityServiceProviderList(data)),
        getRecurringPattern: () => dispatch(getRecurringPattern()),
        getDays: () => dispatch(getDays()),
        createOrEditSchedule: (data) => dispatch(createOrEditSchedule(data)),
        goToServicedetails: () => dispatch(push(Path.visitServiceDetails)),
        getEntityServiceProviderListSearch: (data) => dispatch(getEntityServiceProviderListSearch(data)),
        selectESP: (data) => dispatch(selectESP(data)),
        clearESPList: () => dispatch(clearESPList()),
        selectOrClearAllServiceType: (data, isSelectAll) => dispatch(selectOrClearAllServiceType(data, isSelectAll))
    }
}

function mapStateToProps(state) {
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
        disableShowmore: scheduleState.disableShowmore
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Schedule));