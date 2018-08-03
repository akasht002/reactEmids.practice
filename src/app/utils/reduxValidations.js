const REQUIRED = 'Please enter the  '
const VAILD = 'Please enter the valid  '
const SELECT_REQUIRED = 'Please select the  '
const MAX_AGE = 80
const NUMBER = 'Must be a number'

export const required = value => value ? undefined : REQUIRED

export const checkNotStartWithNumber = value => value && !/^[(a-zA-Z)][+(A-Za-z0-9_!@#$%^&*()'. "]{0,}$/i.test(value)
? VAILD : undefined

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? VAILD : undefined

export const requiredSelect = value => value > 0 ? undefined : SELECT_REQUIRED

export const number = value => value && isNaN(Number(value)) ? NUMBER : undefined

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength15 = maxLength(15)

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength2 = minLength(2)

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min} ` : undefined

export  const tooOld = value =>
  value && value > MAX_AGE ? 'You might be too old for this ' : undefined

export const minValue18 = minValue(18)