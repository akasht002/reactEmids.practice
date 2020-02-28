import moment from 'moment'
import { DATE_FORMAT, DATE_FORMAT_MONTH,DATE_FORMATS, DATE_YEAR, serviceTypesImage, serviceCategoriesImage,DEFAULT_CATEGORY_IMAGE, VISIT_PROCESSING_STATUS, PATIENT_STATUS  } from '../constants/constants'
import _ from 'lodash'

const genderID = [{ Female: 1 }, { Male: 2 }]

export function checkEmail (email) {
    return  /^[^@\s]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
    .test(
    email
  )
}

export function checkPassword (password) {
  return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/.test(password)
}


export function getFieldSortBy(input, field,orderBy) {
  let sortedData =  _.orderBy(input, [field],[orderBy])
  var output = []
  for (var i = 0; i < sortedData.length; ++i) {
    if (i === sortedData.length - 1) output.push(sortedData[i][field] + '')
    else output.push(sortedData[i][field] + ', ')
  }
  return output
}

export function checkDate (date) {
  return /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/.test(date)
}

export function checkSpace (text) {
  return text.replace(/\s/g, '')
}

export function checkTrim (text) {
  return text.trim()
}

export function formattedDateMoment (date) {
  return date ? moment(new Date(date.toString())).format(DATE_FORMAT) : null
}

export function formattedDateMomentValue (date) {
  return date ? moment(new Date(date.toString()), DATE_FORMAT).format(DATE_FORMAT) : null
}

export function formattedDateChange (event) {
  if (
    event.target.value.length === 10 &&
    new Date(event.target.value) &&
    moment().isAfter(event.target.value)
  ) {
    return event.target.value ? formattedDateMoment(event.target.value) : null
  }
}

export function checkDateFormatNumber (data) {
  return /^[0-9-]+$/.test(data)
}

export function checkNumber(data) {
  return /^[0-9]+$/.test(data) || data === ''
}

export function checkFormatDate (value) {
  return (
    value.length === 10 &&
    checkDate(value) &&
    new Date(value) &&
    moment(new Date()).isSameOrBefore(value)
  )
}

export function formateStateDate (date) {
  return date ? moment(date, DATE_FORMAT) : null
}

export function formateStateDateValue (date) {
  return date ? moment(date, DATE_FORMAT) : null
}

export function formateDateValue (date) {
  return date ? moment(date, DATE_FORMAT_MONTH).format(DATE_FORMAT_MONTH) : null
}

export function formateYearDate () {
  return moment().format(DATE_YEAR)
}

export function formateDate (date, format) {
  return date ? moment(date).format(format) : null
}

export function dateDifference (startDate, endDate) {
  return moment(endDate, 'MMM DD YYYY').diff(moment(startDate, 'MMM DD YYYY'), 'days') + 1
}

export function newDate () {
  return moment(new Date())
}

export function newDateValue (date) {
  return date ? moment(new Date(date)) : null
}

export function checkLengthRemoveSpace (data) {
  return data.replace(/\s/g, '').length
}

export function getLength (data) {
  return _.size(data)
}

export function checkTextNotStartWithNumber (data) {
  return /^[a-zA-Z ][A-Za-z0-9_!@#$%^&*?~`/,;:".'()><-=+ ]*$/.test(data)
}

export function isDecimal (data) {
  return /^\d+(\.\d+)?$/.test(data)
}

export function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export const getArrayLength = data => {
  return _.size(data)
}

export const getDataValueArray = (data, split) => {
  return _.split(data, split)
}

export const getValueOfArray = (data, split) => {
  if (_.isArray(data)) {
    return getDataValueArray(data.value, '-')
  } else {
    return getDataValueArray(data, '-')
  }
}

export const getGenderID = data => {
  return genderID[data]
}

export function getFields(input, field) {
  var output = []
  for (var i = 0; i < input.length; ++i) {
    if (i === input.length - 1) output.push(input[i][field] + '')
    else output.push(input[i][field] + ', ')
  }
  return output
}


export const convertStringToDate = data => {
  let date_string = data.toString()
  let month = date_string.substring(2, 4)
  let date = date_string.substring(0, 2)
  let year = date_string.substring(4, 8)
  return year + '-' + month + '-' + date
}

export const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export const partialCompare = (value, array) => {
  array.find(obj => {
    return value === obj.visitDate.substring(0, 10) ? 1 : 2
  })
}
export function checkhourlyRate (data) {
  return /^\d*\.?\d{0,2}$/.test(data)
}

export const serviceTypeImages = {
  Bathing: 'Bathing_Purple'
}

export const isUrlValid = (userInput) =>{
  let res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  if(res == null)
      return false;
  else
      return true;
}

export const getServiceTypeImage = (serviceTypeId) => {
  return (serviceTypesImage[`${serviceTypeId}`]) ? serviceTypesImage[`${serviceTypeId}`] : 'ADL Ambulation & Mobility.svg';
}

export function getStatus(input, field, status) {
  var output = 0
  for (var i = 0; i < input.length; ++i) {
    if (input[i][field] === status) {
      output++
    }
  }
  return output
}


export function unique(arr, keyProps) {
  const kvArray = arr.map(entry => {
   const key = keyProps.map(k => entry[k]).join('|');
   return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
 }



export function format_DDMMMYYYY_Value (date) {
  return date ? moment(date).format(DATE_FORMAT_MONTH) : null
}

export function formatDateValue(date, dateFormat, outputFormat) {
  return date ? moment(date, dateFormat).format(outputFormat) : null
}


export const checkEmpty = (data) => {
  return (typeof(data) === 'undefined' || data === null || data.length === 0 || data === undefined ) ? true : false
}

export const formatContactNumber = data => {
  return data ? data.replace(/[^0-9]/g, '') : ''
}

export const formatContactNumberValue = data => {
  return data ? data.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : ''
}

export const validateCoordinates = (lat, lon) => {
  return (lat === 0 || lon === 0)
}

export const isNull = (data) => {
  return _.isNil(data)
}

export function getFieldsNoSeperater(input, field) {
  var output = []
  for (var i = 0; i < input.length; ++i) {
    if (i === input.length - 1) output.push(input[i][field] + '')
    else output.push(input[i][field])
  }
  return output
}

export const getServiceCategoryImage = (serviceCategoryId) => {
  return (serviceCategoriesImage[`${serviceCategoryId}`]) ? serviceCategoriesImage[`${serviceCategoryId}`] : DEFAULT_CATEGORY_IMAGE.ADL;
}

export function formattedTimeMoment(date) {
  return date ? moment(new Date(date.toString())).format(DATE_FORMATS.hh_mm) : null
}

export function divideIfNotZero(numerator, denominator) {
  if (denominator === 0 || isNaN(denominator)) {
        return 0;
  }
  else {
        return  Math.round(numerator / denominator *100)
  }
}

export function getEntityProcessingStatus(data) {
  if (data && data.visitStatusId === VISIT_PROCESSING_STATUS.scheduled.id)
    return 'Start Visit'
  else if (data && data.visitStatusId === VISIT_PROCESSING_STATUS.inProgress.id)
    return 'In-progress'
  else if (data && data.visitStatusId === VISIT_PROCESSING_STATUS.paymentPending.id && !data.isPaymentModeEnabled)
    return 'In-progress'
  else if (data && data.visitStatusId === VISIT_PROCESSING_STATUS.paymentPending.id && data.isPaymentModeEnabled)
    return 'Payment Pending'
  else if (data && data.visitStatusId === VISIT_PROCESSING_STATUS.completed.id)
    return 'Visit Summary'
  else if (data && data.visitStatusId === VISIT_PROCESSING_STATUS.cancelled.id)
    return 'Cancelled'
}

export const restrictSpecialChars = data => {
  return data.replace(/[*|":<>[\]{}`\\()';@&$!.]/, '')
}

export const restrictMultipleSpace = data => {
  return data.replace(/^\s+|\s+$/g, " ")
}

export const getFieldsFirstValue = (array, field) => {
  let i = 0;
  return array[i][field]
}

export const getStatusTextBasedOnStatus = (props) => {
  if((props && props.deceasedInd)) {
    return PATIENT_STATUS.deceased
  }
  else if((props && !props.isActive)) {
    return PATIENT_STATUS.inActive
  }
  else {
    return null
  }
}

export const calculateDistanceFromCoordinates =(lat1, lon1, lat2, lon2, unit) =>{
  if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
  }
  else {
      let radlat1 = Math.PI * lat1/180;
      let radlat2 = Math.PI * lat2/180;
      let theta = lon1-lon2;
      let radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515; //distance in miles
      if (unit ==="K") { dist = dist * 1.609344 } //distanse in kilometers
      if (unit ==="N") { dist = dist * 0.8684 } //distance in nautical miles
      return dist;
  }
}

export const nullCheckArray = (array,index) => {
   return array && array[index] ? array[index] : 0;
}

export const isEmpty = (val) => {
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}