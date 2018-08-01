import React from 'react';
import { Field} from 'redux-form'

import {required} from './reduxValidations';

export const renderField = ({ input, label, data, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
      <label className="m-0" htmlFor={label}>{label}</label>
      <input className="form-control" {...input} placeholder={label} type={type} maxLength="100" />
      {touched && ((error && <span className="text-danger">{error}{label}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  )
  
export const renderPhoneNumber = ({ input, label, name, type, meta: { touched, error, values, warning } }) => (
    <div className="form-group">
      <label className="m-0" htmlFor={label}>{label}</label>
      <Field
        name="phone"
        className="form-control"
        component="input"
        type="text"
        placeholder="xxx-xxx-xxxx"
        // format="sdfgsd"
        normalize={normalizePhone}
        validate={required}
      />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
  
 export  const renderSelectField = ({ input, name, placeholder, label, options, meta: { touched, error, warning } }) => (
    <div className="form-group">
      <label className="mb-3">{label}</label>
      <Field name={label} component="select" className="form-control">
        <option value="">{placeholder}</option>
        {options.map(option_val => (
          <option value={option_val.value}>{option_val.label}</option>
        ))}
      </Field>
      {touched && ((error && <span className="text-danger">{error} {label}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )

export const renderTextField = ({ input, name, placeholder, label, options, meta: { touched, error, warning } }) => (
  <div className="form-group">
  <label className="mb-3">{label}</label>
  <Field name={name} className="form-control" component="textarea" />
  {touched && ((error && <span className="text-danger">{error} {label}</span>) || (warning && <span>{warning}</span>))}
</div>
)
 const normalizePhone = value => {
    if (!value) {
      return value;
    }
  
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) {
      return onlyNums;
    }
    if (onlyNums.length <= 7) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
  };