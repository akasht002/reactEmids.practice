import React from 'react'
import {Input, TextArea} from "primary_path/components/Forms";
import Select from "react-select"
import BlackoutModal from "primary_path/components/BlackoutModal";

const EditPersonalDetail = (props) =>{
    return (
        <form className="form my-2 my-lg-0">
        <div className="row">
            <div className='col-md-12'>
                <h4 className='primaryColor text-left editProfileHeader'>Introduction</h4>
            </div>
            <div className="col-md-4 mb-2 editProfileImageContainer">
                <div className='profileImage'>
                <img alt="profile-image" className={"SPdpImage"} src="http://lorempixel.com/1500/600/abstract/1" />
                    <span className='editDpImage'/>
                    <div className='uploadWidget'>
                        <button className="addImageBtn"/>
                        <input className="addImageInput" type="file"
                               onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
            <div className="col-md-8 mb-2 editProfileDetailsContainer">
                <div className='row'>
                    <div className='col-md-6 mb-2'>
                        <Input
                            name="FirstName"
                            label="First Name"
                            autoComplete="off"
                            required="required"
                            type="text"
                            value="Adam"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-6 mb-2'>
                        <Input
                            name="LastName"
                            label="Last Name"
                            autoComplete="off"
                            required="required"
                            type="text"
                            value="Gibson"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-6 mb-2'>
                        <div className="form-group">
                            <label>Select Plan</label>
                            <Select
                                id="Gender"
                                multiple={false}
                                placeholder="Select your Gender"
                                className="SelectFormControl"
                                options={[
                                    { label: "Female", value: '1'},
                                    { label: "Male", value: '2'},
                                ]}
                            />
                        </div>
                    </div>
                    <div className='col-md-6 mb-2'>
                        <Input
                            name="Age"
                            label="Age"
                            autoComplete="off"
                            required="required"
                            type="text"
                            value="34"
                            className="form-control"
                        />
                    </div>
                    <div className='col-md-6 mb-2'>
                        <Input
                            name="YearsExperience"
                            label="Years of Experience"
                            autoComplete="off"
                            required="required"
                            type="text"
                            value="7"
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
            <div className='col-md-12 mb-2'>
                <div className="form-group">
                    <label>Affiliation</label>
                    <label>Certified member of organization(s)</label>
                    <Select
                        id="Gender"
                        multiple={false}
                        className="SelectFormControl"
                        placeholder="Select the Organization"
                        options={[
                            { label: "AABB (formerly American Association of Blood Banks)", value: '1'},
                            { label: "Academy of International Business (AIB)", value: '2'},
                            { label: "Academy of Management (AOM)", value: '3'},
                            { label: "Association for the Advancement of Cost Engineering (AACE International)", value: '4'},
                            { label: "Association for Volunteer Administration (AVA)", value: '5'},
                            { label: "Association of Information Technology Professionals (AITP)", value: '6'},
                            { label: "Chartered Global Management Accountant (CGMA)", value: '7'},
                        ]}
                        value={this.state.certifiedOrganisation}
                        onChange={this.toggleAssociation.bind(this)}
                    />
                </div>

            </div>
            <div className='col-md-12 mb-2'>
                <TextArea
                    name='Description'
                    placeholder='I am a 34 year enthusiast who is ready to serve the people in need. I have a total of 7 years of experience in providing home care to the patients. I also help in transportation, generally on the weekends. I hope I will be a great help to you.'
                    className='form-control'
                    rows='5'
                    value='Description'
                />
            </div>
            <div className='col-md-4'>
                <Input
                    name="hourlyRate"
                    label="Hourly Rate ($/hr)"
                    autoComplete="off"
                    required="required"
                    type="text"
                    value="18"
                    className="form-control"
                />
            </div>
            <div className='hrLine'/>
            <div className='col-md-12 mb-2'>
                <div className="row">
                    <div className='col-md-12'>
                        <h4 className='primaryColor text-left editProfileHeader'>Address</h4>
                    </div>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6 mb-2'>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <Select
                                        id="Gender"
                                        multiple={false}
                                        placeholder="State"
                                        className="SelectFormControl"
                                        options={CityList}
                                    />
                                </div>
                            </div>
                            <div className='col-md-6 mb-2'>
                                <div className="form-group">
                                    <label>City</label>
                                    <Select
                                        id="City"
                                        multiple={false}
                                        placeholder="City"
                                        className="SelectFormControl"
                                        options={[
                                            { label: "Alabama", value: '1'},
                                            { label: "Alaska", value: '2'},
                                            { label: "Arizona", value: '3'},
                                            { label: "Arkansas", value: '4'},
                                            { label: "California", value: '5'},
                                            { label: "Colorado", value: '6'},
                                            { label: "Connecticut", value: '7'},
                                            { label: "Delaware", value: '8'},
                                            { label: "Florida", value: '9'},
                                            { label: "Georgia", value: '10'}
                                        ]}
                                    />
                                </div>


                            </div>
                            <div className='col-md-12 mb-2'>
                                <Input
                                    name="Street"
                                    label="Street"
                                    autoComplete="off"
                                    required="required"
                                    type="text"
                                    value="3343 Kooter Lane"
                                    className="form-control"
                                />
                            </div>
                            <div className='col-md-6'>
                                <Input
                                    name="Zip"
                                    label="Zip"
                                    autoComplete="off"
                                    required="required"
                                    type="text"
                                    value="26571"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hrLine'/>
            <div className='col-md-12 mb-2'>
                <div className="row">
                    <div className='col-md-12'>
                        <h4 className='primaryColor text-left editProfileHeader'>Phone</h4>
                    </div>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6 mb-2'>
                                <Input
                                    name="PhoneNumber"
                                    label="Phone Number"
                                    autoComplete="off"
                                    required="required"
                                    type="text"
                                    value="681-059-8197"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        {/* </div>
        <BlackoutModal
            isOpen={this.state.uploadImage}
            toggle={this.CloseImageUpload}
            ModalBody={modalContent}
            className="modal-lg asyncModal BlackoutModal"
            modalTitle="Edit Profile Image"
            centered="centered"
        /> */}
    </form> 
    )
}

export default EditPersonalDetail