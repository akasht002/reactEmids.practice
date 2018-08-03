import React from 'react'
import { Input } from "../../../components";
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { required, checkNotStartWithNumber} from '../../../utils/reduxValidations';
import { renderField, renderPhoneNumber, renderSelectField, renderTextField } from '../../../utils/renderFields';

let datas = {};

let PersonalDetailForm = (props) => {
    console.log(props.personalDetailData);
    const { handleSubmit, pristine, reset, submitting, invalid, personalDetailData } = props
    console.log(personalDetailData);
    datas = personalDetailData;
    return (
        <form initialValues={{ CertificationName: "US" }} className="form my-2 my-lg-0" onSubmit={handleSubmit}>
            <div className="row">
                <div className='col-md-12'>
                    <h4 className='primaryColor text-left editProfileHeader'>Introduction</h4>
                </div>
                <div className="col-md-4 mb-2 editProfileImageContainer">
                    <div className='profileImage'>
                    </div>
                </div>
                <div className="col-md-8 mb-2 editProfileDetailsContainer">
                    <div className='row'>
                        <div className='col-md-6 mb-2'>
                            <Field name="firstName"
                                type="text"
                                component={renderField}
                                label="First Name"
                                textVal={personalDetailData.firstName}
                                validate={[required, checkNotStartWithNumber]}
                            />
                        </div>
                        <div className='col-md-6 mb-2'>
                            <Field name="lastName"
                                type="text"
                                component={renderField}
                                label="Last Name"
                                validate={[required, checkNotStartWithNumber]}
                            />
                        </div>
                         <div className='col-md-6 mb-2'>
                            <div className="form-group">
                                <Field name="gender" options={[
                                    { label: "Female", value: '1' },
                                    { label: "Male", value: '2' },
                                ]}
                                    placeholder='Select your Gender'
                                    component={renderSelectField}
                                    label="Gender" />
                            </div>
                        </div>
                        <div className='col-md-6 mb-2'>
                            <Field name="age"
                                type="number"
                                component={renderField}
                                label="Age"
                                // // validate={[required, number,minValue18]}
                                // warn={tooOld}
                            />
                        </div>
                        <div className='col-md-6 mb-2'>
                            <Field name="yearOfExperience"
                                type="number"
                                component={renderField}
                                label="Years of Experience"
                                // validate={[required, number]}
                            />
                        </div> 
                    </div>
                </div>
                <div className='col-md-12 mb-2'>
                    <div className="form-group">
                        <label>Affiliation</label>
                        <Field name="Organization" options={[
                            { label: "AABB (formerly American Association of Blood Banks)", value: '1' },
                            { label: "Academy of International Business (AIB)", value: '2' },
                            { label: "Academy of Management (AOM)", value: '3' },
                            { label: "Association for the Advancement of Cost Engineering (AACE International)", value: '4' },
                            { label: "Association for Volunteer Administration (AVA)", value: '5' },
                            { label: "Association of Information Technology Professionals (AITP)", value: '6' },
                            { label: "Chartered Global Management Accountant (CGMA)", value: '7' },
                        ]}
                            placeholder='Select the Organization'
                            component={renderSelectField}
                            label="Certified member of organization(s)" />

                    </div>
                </div>
                <div className='col-md-12 mb-2'>
                    <Field name="description"
                        type="textarea"
                        rows='5'
                        component={renderTextField}
                        placeholder='I am a 34 year enthusiast who is ready to serve the people in need. I have a total of 7 years of experience in providing home care to the patients. I also help in transportation, generally on the weekends. I hope I will be a great help to you.'
                        label="Description"
                        // validate={[required]}
                    />
                </div>
                <div className='col-md-4'>
                    <Field name="hourlyRate"
                        type="number"
                        component={renderField}
                        label="Hourly Rate ($/hr)"
                        // validate={[required, number]}
                    />
                </div>
                <div className='hrLine' />
                <div className='col-md-12 mb-2'>
                    <div className="row">
                        <div className='col-md-12'>
                            <h4 className='primaryColor text-left editProfileHeader'>Address</h4>
                        </div>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className='col-md-6 mb-2'>
                                    <Field name="state" options={[
                                        { label: "Female", value: '1' },
                                        { label: "Male", value: '2' },
                                    ]}
                                        placeholder='Select your state'
                                        component={renderSelectField}
                                        // validate={[requiredSelect]}
                                        label="State" />
                                </div>
                                <div className='col-md-6 mb-2'>
                                    <Field name="City" options={[
                                        { label: "Alabama", value: '1' },
                                        { label: "Alaska", value: '2' },
                                        { label: "Arizona", value: '3' },
                                        { label: "Arkansas", value: '4' },
                                        { label: "California", value: '5' },
                                        { label: "Colorado", value: '6' },
                                        { label: "Connecticut", value: '7' },
                                        { label: "Delaware", value: '8' },
                                        { label: "Florida", value: '9' },
                                        { label: "Georgia", value: '10' }
                                    ]}
                                        placeholder='Select your City'
                                        component={renderSelectField}
                                        // validate={[requiredSelect]}
                                        label="city" />
                                </div>
                                <div className='col-md-6 mb-2'>
                                    <Field name="Street"
                                        type="text"
                                        component={renderField}
                                        label="Street"
                                        // validate={[required]}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <Field name="Zip"
                                        type="text"
                                        component={renderField}
                                        label="Zip"
                                        // validate={[required, number]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hrLine' />
                <div className='col-md-12 mb-2'>
                    <div className="row">
                        <div className='col-md-12'>
                            <h4 className='primaryColor text-left editProfileHeader'>Phone</h4>
                        </div>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className='col-md-6 mb-2'>
                                    <Field
                                        name="phoneNumber"
                                        component={renderPhoneNumber}
                                        type="text"
                                        label="Phone Number"
                                        placeholder="Phone Number 999-999-9999"
                                        // validate={[required]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button className='btn btn-primary ml-auto mt-3 mr-3' type="submit" disabled={submitting || invalid}>Submit</button>
            </div>
        </form>
    )
}


PersonalDetailForm = reduxForm({
    form: 'personalDetailForm',
    enableReinitialize: true,
})(PersonalDetailForm)

PersonalDetailForm = connect(
    state => ({
        initialValues: datas
    })
)(PersonalDetailForm)

export default PersonalDetailForm