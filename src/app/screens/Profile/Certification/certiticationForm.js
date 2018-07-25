import React from 'react'
import { Input } from "../../../components";
import { Field, reduxForm } from 'redux-form'

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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="col-md-12 mb-2">
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}

    </div>
)

const SyncValidationForm = (props) => {
    const { handleSubmit, pristine, reset, submitting,invalid } = props
    return (
        <form className="form my-2 my-lg-0" onSubmit={handleSubmit}>
            <div className="row">
                <Field name="certificationName" type="text" component={renderField} label="Certification" />
                <Field name="certificationAuthority" type="text" component={renderField} label="Certification Authority" />
                <Field name="certificateLicenceNumber" type="text" component={renderField} label="Certificate / License Number" />
                <button type="submit" disabled={submitting||invalid}>Submit</button>
            </div>
        </form>
    )
}






// const CertificationModalContent = <form className="form my-2 my-lg-0">
//             <div className="row">
//                 <div className="col-md-12 mb-2">
//                     <Input
//                         name="Certification"
//                         label="Certification"
//                         autoComplete="off"
//                         type="text"
//                         placeholder="e.g. Home Care Aide Organization"
//                         className={"form-control " + (!this.state.isValid && !this.state.CertificationName && 'inputFailure')}
//                         value={this.state.CertificationName}
//                         maxlength={'500'}
//                         textChange={(e) => this.setState({
//                             CertificationName: e.target.value,
//                         })}
//                     />
//                 </div>
//                 <div className="col-md-12 mb-2">
//                     <Input
//                         name="CertificationAuthority"
//                         label="Certification Authority"
//                         autoComplete="off"
//                         type="text"
//                         placeholder="e.g. California Associaion"
//                         className={"form-control " + (!this.state.isValid && !this.state.CertificationAuthority && 'inputFailure')}
//                         value={this.state.CertificationAuthority}
//                         maxlength={'500'}
//                         textChange={(e) => this.setState({
//                             CertificationAuthority: e.target.value,
//                         })}
//                     />
//                 </div>
//                 <div className="col-md-12 mb-2">
//                     <Input
//                         name="CertificateLicenceNum"
//                         label="Certificate / License Number"
//                         autoComplete="off"
//                         type="text"
//                         placeholder="e.g. HCA7521698432"
//                         className={"form-control"}
//                         value={this.state.CertificateLicenceNumber}
//                         maxlength={'50'}
//                         textChange={(e) => this.setState({
//                             CertificateLicenceNumber: e.target.value,
//                         })}
//                     />
//                 </div>
//                 <div className="col-md-12 mb-2">
//                     {!this.state.isValid && (!this.state.CertificationName || !this.state.CertificationAuthority) && <span className="text-danger d-block ml-30 mt-4 mb-2 MsgWithIcon MsgWrongIcon">Please enter {this.state.CertificationName === '' && ' Certification'} {(this.state.CertificationAuthority === '' && this.state.CertificationName === '') ? '&' : ''} {this.state.CertificationAuthority === '' && 'Certification Authority'}</span>}
//                 </div>
//             </div>
//         </form>;

export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form
})(SyncValidationForm)