import React, { Component } from "react";
import Slider from "react-slick";

import { Input } from "../../../components/Base";
import { Locationsettings } from "../../../constants/config"
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Select, Item } from '@zendeskgarden/react-select';

let elem1 = ''; let elem2 = '';

export class PointOfService extends Component {

    cancelScrollEvent = (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.returnValue = false;
        return false;
    }

    startScrollEvent = (e) => {
        e.returnValue = true;
        return true;
    }

    scrollLock = () => {
        elem1 = document.getElementsByClassName('scrollarea-content')[0];
        elem2 = document.getElementsByClassName('hVQFbW')[0];
        elem1.addEventListener('wheel', this.cancelScrollEvent, false);
        elem2.addEventListener('wheel', this.startScrollEvent, false);
    }

    scrollRelease = () => {
        elem1 = document.getElementsByClassName('scrollarea-content')[0];
        elem1.removeEventListener('wheel', this.cancelScrollEvent, false);
    }

    render() {
        let AddresTemplate = this.props.patientAddressList && this.props.patientAddressList.map((address, index) => {
            let catNum = index + 1;
            return (
                <div className="form-radio AddressCardWidget" key={catNum}>
                    <input
                        className="form-radio-input"
                        name="AddressPOS"
                        id={"AddressPOS" + catNum}
                        type="radio"
                        value={address.addressId}
                        onChange={(e) => {
                            this.props.handlePatientAddress(address)
                        }}       
                        checked={this.props.selectedPOS === address.addressId}                     
                    />
                    <label className="form-radio-label AddressPOS"
                        htmlFor={"AddressPOS" + catNum}>
                        {address.addressTypeId && <span className='POSAddress'><i>Address Type</i>{address.addressTypeId}</span>}
                        <div className='POSAddress updateBigAddress'><i>Street</i><div>{address.street}</div></div>
                        <span className='POSAddress'><i>City</i>{address.city}</span>
                        <span className='POSAddress'><i>State</i>{address.stateName}</span>
                        <span className='POSAddress'><i>Zip</i>{address.zip}</span>
                        <span className="RadioBoxIcon" />
                    </label>
                </div>
            )
        });

        let selectState = this.props.stateList.map(function (type) {
            return <Item className='ListItem CTDashboard' key={type.id}>{type.name}</Item>;
        });
        let CustomPOSAddress = '';
        if (this.props.selectedPOS === '0') {
            CustomPOSAddress = <div className='CustomPOS'>
                <h6>Enter a new location</h6>
                <div className={'row'}>
                    <div className={'col-md-4 mb-2 padding-less-10'}>
                        <Input
                            name="addressType"
                            label="Address Type"
                            autoComplete="off"
                            type="text"
                            placeholder="Enter Address Type"
                            maxlength={15}
                            value={this.props.addressType}
                            textChange={this.props.handelNewAddress}
                            className={
                                'form-control '
                            }
                        />
                    </div>

                    <div className={'col-md-8 mb-2'}>
                        <Input
                            name="street"
                            label="Street"
                            autoComplete="off"
                            maxlength={500}
                            type="text"
                            placeholder="Enter Street"
                            value={this.props.street}
                            textChange={this.props.handelNewAddress}
                            className={
                                'form-control ' +
                                (!this.props.street && this.props.onClickSave &&
                                    'inputFailure')
                            }
                        />
                        {!this.props.street && this.props.onClickSave &&
                            <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                Please enter Street
                            </span>}
                    </div>
                    <div className={'col-md-4 mb-2'}>
                        <Input
                            name="city"
                            label="City"
                            autoComplete="off"
                            type="text"
                            placeholder="Enter City"
                            value={this.props.city}
                            textChange={this.props.handelNewAddress}
                            className={
                                'form-control ' +
                                (!this.props.city && this.props.onClickSave &&
                                    'inputFailure')
                            }
                        />
                       {!this.props.city && this.props.onClickSave &&
                            <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                                Please enter City
                            </span>}
                    </div>
                    <div className={'col-md-4 mb-2 padding-less-10'}>
                        <div className='form-group'>
                            <label className='m-0'>State</label>
                            <ThemeProvider>
                                <SelectField>
                                    <Select
                                        placement="bottom"
                                        options={selectState}
                                        onChange={this.props.statehandleChange}
                                        selectedValue={this.props.selectedStateId}
                                        className=
                                        {
                                            'onBoardingSelect ' +
                                            (this.props.onClickSave &&
                                                !this.props.selectedStateName &&
                                                'inputFailure')
                                        }
                                    >
                                        {this.props.selectedStateName ? this.props.selectedStateName : <span className="Select-placeholder pl-0">Select State</span>}
                                    </Select>
                                </SelectField>
                            </ThemeProvider>


                           
                        </div>
                        {this.props.onClickSave && (!this.props.selectedStateName) &&
                                <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">
                                    Please select State
                                </span>}
                    </div>
                    <div className={'col-md-4 mb-2'}>
                        <Input
                            name="zip"
                            label="Zip"
                            autoComplete="off"
                            maxlength={5}
                            type="text"
                            placeholder="Enter Zip"
                            value={(this.props.zip)}
                            textChange={this.props.handelNewAddress}
                            className={
                                'form-control ' +
                                (this.props.nextClicked &&
                                    !this.props.zip &&
                                    'inputFailure')
                            }
                        />
                        {this.props.onClickSave && (!this.props.zip || this.props.zip.length !== 5) &&
                            <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">
                                Please enter valid Zip
                            </span>}
                    </div>
                </div>
            </div>;
        }

        return (

            <div className='ServiceType WhiteBG'>
                <Slider {...Locationsettings} className="POSAddressSlider">
                    <div className="form-radio AddressCardWidget">
                        <input
                            className="form-radio-input"
                            name="AddressPOS"
                            id="AddressPOS0"
                            type="radio"
                            value='0'
                            onClick={(e) => this.props.handlePOSAddress(e)}
                            defaultChecked={false}
                            checked={this.props.selectedPOS === '0'}
                        />
                        <label className="form-radio-label AddressPOS" htmlFor="AddressPOS0">
                            <span className='POSTitle'>New Address</span>
                            <span className='POSAddress'>Enter a new location</span>
                            <span className="RadioBoxIcon" />
                        </label>
                    </div>

                    {AddresTemplate}
                </Slider>
                {CustomPOSAddress}
                <div className='posAddressValidationError'>{this.props.isPosAddressValid && this.props.posErrorMessage}</div>
                <div id="DropDownZendeskGarden" onMouseOver={this.scrollLock} onMouseLeave={this.scrollRelease} />
            </div>

        )
    }
}

export default PointOfService;