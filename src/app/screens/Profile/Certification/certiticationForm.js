import React from 'react'
import { Input } from "../../../components";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const validate = values => {
    const errors = {}
    if (!values.certificationName) {
        errors.certificationName = 'Please enter Certification'
    }
    if (!values.certificationAuthority) {
        errors.certificationAuthority = 'Please enter Certification Authority'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({ input, label, textVal, type, meta: { touched, error, warning } }) => (
    <div className="col-md-12 mb-2">
        <label>{label}</label>
        <input className='form-control mb-3' {...input} placeholder={label} type={type}  />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}

    </div>
)

let SyncValidationForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, invalid, data } = props
    console.log(data.CertificationName);
    return (
        <form className="form my-2 my-lg-0" onSubmit={handleSubmit}>
            <div className="row">
                <Field name="certificationName" textVal={data.CertificationName ? data.CertificationName : ''} type="text" component={renderField} label="Certification" />
                <Field name="certificationAuthority" textVal={data.CertificationAuthority ? data.CertificationAuthority : ''} type="text" component={renderField} label="Certification Authority" />
                <Field name="certificateLicenceNumber" textVal={data.CertificateLicenceNumber ? data.CertificateLicenceNumber : ''} type="text" component={renderField} label="Certificate / License Number" />
                <button className='btn btn-primary ml-auto mt-3 mr-3' type="submit" disabled={submitting || invalid}>Submit</button>
            </div>
        </form>
    )
}


SyncValidationForm =  reduxForm({
    form: 'syncValidation',  
    validate,                
    warn                     
})(SyncValidationForm)

// SyncValidationForm = connect(
//     state => ({
//       initialValues: props.data 
//     })
//   )(SyncValidationForm)

export default SyncValidationForm